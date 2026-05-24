"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePhoneAuth } from "../../context/PhoneAuthModal";
import { Step1Phone } from "./Step1Phone";
import { Step2Vehicle } from "./Step2Vehicle";
import { Step3Service } from "./Step3Service";
import { Step4DateTime } from "./Step4DateTime";

export interface VehicleData {
  vehicleId?: string;
  make?: string;
  model?: string;
  year?: number;
  plate?: string;
}

type Step = 1 | 2 | 3 | 4 | "done";

const STEP_LABELS = ["Телефон", "Авто", "Послуга", "Дата та час"];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
};

export function BookingWidget({ initialService }: { initialService?: string }) {
  const { phone: authPhone } = usePhoneAuth();

  const [step, setStep] = useState<Step>(authPhone ? 2 : 1);
  const [direction, setDirection] = useState(1);
  const [phone, setPhone] = useState(authPhone ?? "");
  const [vehicle, setVehicle] = useState<VehicleData>({});
  const [serviceType, setServiceType] = useState(initialService ?? "");
  const [bookingId, setBookingId] = useState("");

  const advance = (nextStep: Step) => {
    setDirection(1);
    setStep(nextStep);
  };

  const handlePhoneDone = (p: string) => {
    setPhone(p);
    advance(2);
  };

  const handleVehicleDone = (v: VehicleData) => {
    setVehicle(v);
    advance(3);
  };

  const handleServiceDone = (svc: string) => {
    setServiceType(svc);
    advance(4);
  };

  const handleBookingDone = (id: string) => {
    setBookingId(id);
    advance("done");
  };

  if (step === "done") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-zinc-950">
        <div className="max-w-md w-full text-center border border-zinc-800 p-10">
          <div className="text-accent text-5xl mb-6">✓</div>
          <h2 className="font-heading text-2xl text-zinc-100 mb-3">Запис підтверджено!</h2>
          <p className="text-zinc-400 text-sm font-body normal-case mb-2">
            Номер вашого запису:
          </p>
          <p className="font-heading text-accent text-lg tracking-widest mb-8">
            {bookingId}
          </p>
          <p className="text-zinc-500 text-xs font-body normal-case">
            SMS-підтвердження надійде на {phone}
          </p>
        </div>
      </div>
    );
  }

  const currentStep = step as number;

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-12">
      <div className="max-w-xl mx-auto">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-0 mb-12">
          {STEP_LABELS.map((label, i) => {
            const stepNum = i + 1;
            const isActive = stepNum === currentStep;
            const isDone = stepNum < currentStep;
            return (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 flex items-center justify-center text-xs font-heading border-2 transition-colors ${
                      isActive
                        ? "border-accent bg-accent text-zinc-950"
                        : isDone
                        ? "border-zinc-600 bg-zinc-800 text-zinc-400"
                        : "border-zinc-800 text-zinc-600"
                    }`}
                  >
                    {isDone ? "✓" : stepNum}
                  </div>
                  <span
                    className={`mt-1 text-[10px] font-heading tracking-wider uppercase ${
                      isActive ? "text-accent" : "text-zinc-600"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {i < STEP_LABELS.length - 1 && (
                  <div
                    className={`w-12 h-px mb-5 transition-colors ${
                      isDone ? "bg-zinc-600" : "bg-zinc-800"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Step content */}
        <div className="border border-zinc-800 p-6 md:p-8 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {step === 1 && <Step1Phone onDone={handlePhoneDone} />}
              {step === 2 && <Step2Vehicle phone={phone} onDone={handleVehicleDone} />}
              {step === 3 && <Step3Service onDone={handleServiceDone} />}
              {step === 4 && (
                <Step4DateTime
                  phone={phone}
                  vehicle={vehicle}
                  serviceType={serviceType}
                  onDone={handleBookingDone}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
