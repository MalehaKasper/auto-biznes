const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export interface CatalogListing {
  id: string;
  type: "SALE" | "WANTED";
  make: string;
  model: string;
  year: number;
  yearMax: number | null;
  mileage: number | null;
  mileageMax: number | null;
  price: string | null;
  bargainEnabled: boolean;
  description: string;
  photos: string[];
  status: "AVAILABLE" | "RESERVED" | "SOLD" | "CLOSED";
  vehicleId: string | null;
  createdAt: string;
  updatedAt: string;
}

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (res.status === 401 && accessToken) {
    const refreshed = await tryRefresh();
    if (refreshed) {
      headers["Authorization"] = `Bearer ${accessToken}`;
      return request<T>(path, options);
    }
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw Object.assign(new Error(body.message ?? "API error"), {
      status: res.status,
      body,
    });
  }

  return res.json() as Promise<T>;
}

async function tryRefresh(): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { accessToken: string };
    accessToken = data.accessToken;
    return true;
  } catch {
    return false;
  }
}

export const api = {
  auth: {
    requestOtp: (phone: string) =>
      request<{ retryAfter: number }>("/auth/otp/request", {
        method: "POST",
        body: JSON.stringify({ phone }),
      }),

    verifyOtp: (phone: string, code: string) =>
      request<{ accessToken: string; isFirstLogin: boolean }>(
        "/auth/otp/verify",
        { method: "POST", body: JSON.stringify({ phone, code }) }
      ),

    getProfile: () =>
      request<{
        phone: string;
        name: string | null;
        email: string | null;
        bookings: Array<{
          id: string;
          serviceType: string;
          status: string;
          scheduledAt: string | null;
          createdAt: string;
        }>;
      }>("/auth/profile"),

    updateProfile: (name: string, email?: string) =>
      request<{ success: boolean }>("/auth/profile", {
        method: "PATCH",
        body: JSON.stringify({ name, email }),
      }),

    logout: () =>
      request<{ success: boolean }>("/auth/logout", { method: "POST" }),
  },

  bookings: {
    create: (data: Record<string, unknown>) =>
      request<{ bookingId: string; status: string }>("/bookings", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    getSlots: (serviceType: string, date: string) =>
      request<string[]>(`/bookings/slots?serviceType=${serviceType}&date=${date}`),

    getStatus: (id: string) =>
      request<{
        status: string;
        serviceType: string;
        scheduledAt: string | null;
        vehiclePlate: string | null;
      }>(`/bookings/${id}/status`),
  },

  catalog: {
    list: (params?: {
      type?: "sale" | "wanted";
      cursor?: string;
      limit?: number;
      make?: string;
      priceMin?: number;
      priceMax?: number;
      yearMin?: number;
      yearMax?: number;
    }) => {
      const qs = new URLSearchParams();
      if (params?.type) qs.set("type", params.type);
      if (params?.cursor) qs.set("cursor", params.cursor);
      if (params?.limit) qs.set("limit", String(params.limit));
      if (params?.make) qs.set("make", params.make);
      if (params?.priceMin !== undefined) qs.set("priceMin", String(params.priceMin));
      if (params?.priceMax !== undefined) qs.set("priceMax", String(params.priceMax));
      if (params?.yearMin !== undefined) qs.set("yearMin", String(params.yearMin));
      if (params?.yearMax !== undefined) qs.set("yearMax", String(params.yearMax));
      const query = qs.toString();
      return request<{
        listings: CatalogListing[];
        nextCursor: string | null;
      }>(`/catalog${query ? `?${query}` : ""}`);
    },

    getById: (id: string) =>
      request<CatalogListing>(`/catalog/${id}`),

    createInquiry: (data: Record<string, unknown>) =>
      request<{ id: string; status: string }>("/catalog/inquiries", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },

  garage: {
    getVehicles: (archived = false) =>
      request<unknown[]>(`/garage/vehicles${archived ? "?archived=true" : ""}`),

    getVehicle: (id: string) =>
      request<unknown>(`/garage/vehicles/${id}`),

    addVehicle: (data: Record<string, unknown>) =>
      request<unknown>("/garage/vehicles", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    updateVehicle: (id: string, data: Record<string, unknown>) =>
      request<unknown>(`/garage/vehicles/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),

    hideVehicle: (id: string) =>
      request<void>(`/garage/vehicles/${id}/hide`, { method: "PATCH" }),
  },
};
