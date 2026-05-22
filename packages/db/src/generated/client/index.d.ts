
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Vehicle
 * 
 */
export type Vehicle = $Result.DefaultSelection<Prisma.$VehiclePayload>
/**
 * Model UserVehicle
 * 
 */
export type UserVehicle = $Result.DefaultSelection<Prisma.$UserVehiclePayload>
/**
 * Model Booking
 * 
 */
export type Booking = $Result.DefaultSelection<Prisma.$BookingPayload>
/**
 * Model ServiceRecord
 * 
 */
export type ServiceRecord = $Result.DefaultSelection<Prisma.$ServiceRecordPayload>
/**
 * Model OtpCode
 * 
 */
export type OtpCode = $Result.DefaultSelection<Prisma.$OtpCodePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserStatus: {
  SHADOW: 'SHADOW',
  REGISTERED: 'REGISTERED'
};

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus]


export const ServiceType: {
  STO: 'STO',
  TIRE: 'TIRE'
};

export type ServiceType = (typeof ServiceType)[keyof typeof ServiceType]


export const BookingStatus: {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus]


export const OwnerType: {
  CLIENT: 'CLIENT',
  COMPANY: 'COMPANY'
};

export type OwnerType = (typeof OwnerType)[keyof typeof OwnerType]

}

export type UserStatus = $Enums.UserStatus

export const UserStatus: typeof $Enums.UserStatus

export type ServiceType = $Enums.ServiceType

export const ServiceType: typeof $Enums.ServiceType

export type BookingStatus = $Enums.BookingStatus

export const BookingStatus: typeof $Enums.BookingStatus

export type OwnerType = $Enums.OwnerType

export const OwnerType: typeof $Enums.OwnerType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vehicle`: Exposes CRUD operations for the **Vehicle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vehicles
    * const vehicles = await prisma.vehicle.findMany()
    * ```
    */
  get vehicle(): Prisma.VehicleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userVehicle`: Exposes CRUD operations for the **UserVehicle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserVehicles
    * const userVehicles = await prisma.userVehicle.findMany()
    * ```
    */
  get userVehicle(): Prisma.UserVehicleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.booking`: Exposes CRUD operations for the **Booking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookings
    * const bookings = await prisma.booking.findMany()
    * ```
    */
  get booking(): Prisma.BookingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.serviceRecord`: Exposes CRUD operations for the **ServiceRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServiceRecords
    * const serviceRecords = await prisma.serviceRecord.findMany()
    * ```
    */
  get serviceRecord(): Prisma.ServiceRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.otpCode`: Exposes CRUD operations for the **OtpCode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OtpCodes
    * const otpCodes = await prisma.otpCode.findMany()
    * ```
    */
  get otpCode(): Prisma.OtpCodeDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Vehicle: 'Vehicle',
    UserVehicle: 'UserVehicle',
    Booking: 'Booking',
    ServiceRecord: 'ServiceRecord',
    OtpCode: 'OtpCode'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "vehicle" | "userVehicle" | "booking" | "serviceRecord" | "otpCode"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Vehicle: {
        payload: Prisma.$VehiclePayload<ExtArgs>
        fields: Prisma.VehicleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VehicleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VehicleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          findFirst: {
            args: Prisma.VehicleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VehicleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          findMany: {
            args: Prisma.VehicleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          create: {
            args: Prisma.VehicleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          createMany: {
            args: Prisma.VehicleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VehicleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          delete: {
            args: Prisma.VehicleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          update: {
            args: Prisma.VehicleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          deleteMany: {
            args: Prisma.VehicleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VehicleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VehicleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          upsert: {
            args: Prisma.VehicleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          aggregate: {
            args: Prisma.VehicleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVehicle>
          }
          groupBy: {
            args: Prisma.VehicleGroupByArgs<ExtArgs>
            result: $Utils.Optional<VehicleGroupByOutputType>[]
          }
          count: {
            args: Prisma.VehicleCountArgs<ExtArgs>
            result: $Utils.Optional<VehicleCountAggregateOutputType> | number
          }
        }
      }
      UserVehicle: {
        payload: Prisma.$UserVehiclePayload<ExtArgs>
        fields: Prisma.UserVehicleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserVehicleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVehiclePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserVehicleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVehiclePayload>
          }
          findFirst: {
            args: Prisma.UserVehicleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVehiclePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserVehicleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVehiclePayload>
          }
          findMany: {
            args: Prisma.UserVehicleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVehiclePayload>[]
          }
          create: {
            args: Prisma.UserVehicleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVehiclePayload>
          }
          createMany: {
            args: Prisma.UserVehicleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserVehicleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVehiclePayload>[]
          }
          delete: {
            args: Prisma.UserVehicleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVehiclePayload>
          }
          update: {
            args: Prisma.UserVehicleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVehiclePayload>
          }
          deleteMany: {
            args: Prisma.UserVehicleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserVehicleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserVehicleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVehiclePayload>[]
          }
          upsert: {
            args: Prisma.UserVehicleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVehiclePayload>
          }
          aggregate: {
            args: Prisma.UserVehicleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserVehicle>
          }
          groupBy: {
            args: Prisma.UserVehicleGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserVehicleGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserVehicleCountArgs<ExtArgs>
            result: $Utils.Optional<UserVehicleCountAggregateOutputType> | number
          }
        }
      }
      Booking: {
        payload: Prisma.$BookingPayload<ExtArgs>
        fields: Prisma.BookingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findFirst: {
            args: Prisma.BookingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findMany: {
            args: Prisma.BookingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          create: {
            args: Prisma.BookingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          createMany: {
            args: Prisma.BookingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          delete: {
            args: Prisma.BookingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          update: {
            args: Prisma.BookingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          deleteMany: {
            args: Prisma.BookingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BookingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          upsert: {
            args: Prisma.BookingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          aggregate: {
            args: Prisma.BookingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBooking>
          }
          groupBy: {
            args: Prisma.BookingGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookingGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookingCountArgs<ExtArgs>
            result: $Utils.Optional<BookingCountAggregateOutputType> | number
          }
        }
      }
      ServiceRecord: {
        payload: Prisma.$ServiceRecordPayload<ExtArgs>
        fields: Prisma.ServiceRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRecordPayload>
          }
          findFirst: {
            args: Prisma.ServiceRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRecordPayload>
          }
          findMany: {
            args: Prisma.ServiceRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRecordPayload>[]
          }
          create: {
            args: Prisma.ServiceRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRecordPayload>
          }
          createMany: {
            args: Prisma.ServiceRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRecordPayload>[]
          }
          delete: {
            args: Prisma.ServiceRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRecordPayload>
          }
          update: {
            args: Prisma.ServiceRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRecordPayload>
          }
          deleteMany: {
            args: Prisma.ServiceRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRecordPayload>[]
          }
          upsert: {
            args: Prisma.ServiceRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRecordPayload>
          }
          aggregate: {
            args: Prisma.ServiceRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServiceRecord>
          }
          groupBy: {
            args: Prisma.ServiceRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceRecordCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceRecordCountAggregateOutputType> | number
          }
        }
      }
      OtpCode: {
        payload: Prisma.$OtpCodePayload<ExtArgs>
        fields: Prisma.OtpCodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OtpCodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OtpCodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>
          }
          findFirst: {
            args: Prisma.OtpCodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OtpCodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>
          }
          findMany: {
            args: Prisma.OtpCodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>[]
          }
          create: {
            args: Prisma.OtpCodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>
          }
          createMany: {
            args: Prisma.OtpCodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OtpCodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>[]
          }
          delete: {
            args: Prisma.OtpCodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>
          }
          update: {
            args: Prisma.OtpCodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>
          }
          deleteMany: {
            args: Prisma.OtpCodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OtpCodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OtpCodeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>[]
          }
          upsert: {
            args: Prisma.OtpCodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>
          }
          aggregate: {
            args: Prisma.OtpCodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOtpCode>
          }
          groupBy: {
            args: Prisma.OtpCodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<OtpCodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.OtpCodeCountArgs<ExtArgs>
            result: $Utils.Optional<OtpCodeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    vehicle?: VehicleOmit
    userVehicle?: UserVehicleOmit
    booking?: BookingOmit
    serviceRecord?: ServiceRecordOmit
    otpCode?: OtpCodeOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    vehicles: number
    bookings: number
    serviceRecords: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicles?: boolean | UserCountOutputTypeCountVehiclesArgs
    bookings?: boolean | UserCountOutputTypeCountBookingsArgs
    serviceRecords?: boolean | UserCountOutputTypeCountServiceRecordsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountVehiclesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserVehicleWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountServiceRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceRecordWhereInput
  }


  /**
   * Count Type VehicleCountOutputType
   */

  export type VehicleCountOutputType = {
    owners: number
    bookings: number
    serviceRecords: number
  }

  export type VehicleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owners?: boolean | VehicleCountOutputTypeCountOwnersArgs
    bookings?: boolean | VehicleCountOutputTypeCountBookingsArgs
    serviceRecords?: boolean | VehicleCountOutputTypeCountServiceRecordsArgs
  }

  // Custom InputTypes
  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleCountOutputType
     */
    select?: VehicleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeCountOwnersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserVehicleWhereInput
  }

  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }

  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeCountServiceRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceRecordWhereInput
  }


  /**
   * Count Type BookingCountOutputType
   */

  export type BookingCountOutputType = {
    serviceRecords: number
  }

  export type BookingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    serviceRecords?: boolean | BookingCountOutputTypeCountServiceRecordsArgs
  }

  // Custom InputTypes
  /**
   * BookingCountOutputType without action
   */
  export type BookingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingCountOutputType
     */
    select?: BookingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BookingCountOutputType without action
   */
  export type BookingCountOutputTypeCountServiceRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceRecordWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    phone: string | null
    name: string | null
    email: string | null
    status: $Enums.UserStatus | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    phone: string | null
    name: string | null
    email: string | null
    status: $Enums.UserStatus | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    phone: number
    name: number
    email: number
    status: number
    passwordHash: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    phone?: true
    name?: true
    email?: true
    status?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    phone?: true
    name?: true
    email?: true
    status?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    phone?: true
    name?: true
    email?: true
    status?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    phone: string
    name: string | null
    email: string | null
    status: $Enums.UserStatus
    passwordHash: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phone?: boolean
    name?: boolean
    email?: boolean
    status?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    vehicles?: boolean | User$vehiclesArgs<ExtArgs>
    bookings?: boolean | User$bookingsArgs<ExtArgs>
    serviceRecords?: boolean | User$serviceRecordsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phone?: boolean
    name?: boolean
    email?: boolean
    status?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phone?: boolean
    name?: boolean
    email?: boolean
    status?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    phone?: boolean
    name?: boolean
    email?: boolean
    status?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "phone" | "name" | "email" | "status" | "passwordHash" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicles?: boolean | User$vehiclesArgs<ExtArgs>
    bookings?: boolean | User$bookingsArgs<ExtArgs>
    serviceRecords?: boolean | User$serviceRecordsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      vehicles: Prisma.$UserVehiclePayload<ExtArgs>[]
      bookings: Prisma.$BookingPayload<ExtArgs>[]
      serviceRecords: Prisma.$ServiceRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      phone: string
      name: string | null
      email: string | null
      status: $Enums.UserStatus
      passwordHash: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vehicles<T extends User$vehiclesArgs<ExtArgs> = {}>(args?: Subset<T, User$vehiclesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserVehiclePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bookings<T extends User$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, User$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    serviceRecords<T extends User$serviceRecordsArgs<ExtArgs> = {}>(args?: Subset<T, User$serviceRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly status: FieldRef<"User", 'UserStatus'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.vehicles
   */
  export type User$vehiclesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVehicle
     */
    select?: UserVehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVehicle
     */
    omit?: UserVehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVehicleInclude<ExtArgs> | null
    where?: UserVehicleWhereInput
    orderBy?: UserVehicleOrderByWithRelationInput | UserVehicleOrderByWithRelationInput[]
    cursor?: UserVehicleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserVehicleScalarFieldEnum | UserVehicleScalarFieldEnum[]
  }

  /**
   * User.bookings
   */
  export type User$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * User.serviceRecords
   */
  export type User$serviceRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRecord
     */
    select?: ServiceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRecord
     */
    omit?: ServiceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRecordInclude<ExtArgs> | null
    where?: ServiceRecordWhereInput
    orderBy?: ServiceRecordOrderByWithRelationInput | ServiceRecordOrderByWithRelationInput[]
    cursor?: ServiceRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceRecordScalarFieldEnum | ServiceRecordScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Vehicle
   */

  export type AggregateVehicle = {
    _count: VehicleCountAggregateOutputType | null
    _avg: VehicleAvgAggregateOutputType | null
    _sum: VehicleSumAggregateOutputType | null
    _min: VehicleMinAggregateOutputType | null
    _max: VehicleMaxAggregateOutputType | null
  }

  export type VehicleAvgAggregateOutputType = {
    year: number | null
  }

  export type VehicleSumAggregateOutputType = {
    year: number | null
  }

  export type VehicleMinAggregateOutputType = {
    id: string | null
    plate: string | null
    vin: string | null
    make: string | null
    model: string | null
    year: number | null
    color: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VehicleMaxAggregateOutputType = {
    id: string | null
    plate: string | null
    vin: string | null
    make: string | null
    model: string | null
    year: number | null
    color: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VehicleCountAggregateOutputType = {
    id: number
    plate: number
    vin: number
    make: number
    model: number
    year: number
    color: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VehicleAvgAggregateInputType = {
    year?: true
  }

  export type VehicleSumAggregateInputType = {
    year?: true
  }

  export type VehicleMinAggregateInputType = {
    id?: true
    plate?: true
    vin?: true
    make?: true
    model?: true
    year?: true
    color?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VehicleMaxAggregateInputType = {
    id?: true
    plate?: true
    vin?: true
    make?: true
    model?: true
    year?: true
    color?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VehicleCountAggregateInputType = {
    id?: true
    plate?: true
    vin?: true
    make?: true
    model?: true
    year?: true
    color?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VehicleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vehicle to aggregate.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vehicles
    **/
    _count?: true | VehicleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VehicleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VehicleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VehicleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VehicleMaxAggregateInputType
  }

  export type GetVehicleAggregateType<T extends VehicleAggregateArgs> = {
        [P in keyof T & keyof AggregateVehicle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVehicle[P]>
      : GetScalarType<T[P], AggregateVehicle[P]>
  }




  export type VehicleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleWhereInput
    orderBy?: VehicleOrderByWithAggregationInput | VehicleOrderByWithAggregationInput[]
    by: VehicleScalarFieldEnum[] | VehicleScalarFieldEnum
    having?: VehicleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VehicleCountAggregateInputType | true
    _avg?: VehicleAvgAggregateInputType
    _sum?: VehicleSumAggregateInputType
    _min?: VehicleMinAggregateInputType
    _max?: VehicleMaxAggregateInputType
  }

  export type VehicleGroupByOutputType = {
    id: string
    plate: string | null
    vin: string | null
    make: string | null
    model: string | null
    year: number | null
    color: string | null
    createdAt: Date
    updatedAt: Date
    _count: VehicleCountAggregateOutputType | null
    _avg: VehicleAvgAggregateOutputType | null
    _sum: VehicleSumAggregateOutputType | null
    _min: VehicleMinAggregateOutputType | null
    _max: VehicleMaxAggregateOutputType | null
  }

  type GetVehicleGroupByPayload<T extends VehicleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VehicleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VehicleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VehicleGroupByOutputType[P]>
            : GetScalarType<T[P], VehicleGroupByOutputType[P]>
        }
      >
    >


  export type VehicleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    plate?: boolean
    vin?: boolean
    make?: boolean
    model?: boolean
    year?: boolean
    color?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owners?: boolean | Vehicle$ownersArgs<ExtArgs>
    bookings?: boolean | Vehicle$bookingsArgs<ExtArgs>
    serviceRecords?: boolean | Vehicle$serviceRecordsArgs<ExtArgs>
    _count?: boolean | VehicleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    plate?: boolean
    vin?: boolean
    make?: boolean
    model?: boolean
    year?: boolean
    color?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    plate?: boolean
    vin?: boolean
    make?: boolean
    model?: boolean
    year?: boolean
    color?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectScalar = {
    id?: boolean
    plate?: boolean
    vin?: boolean
    make?: boolean
    model?: boolean
    year?: boolean
    color?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VehicleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "plate" | "vin" | "make" | "model" | "year" | "color" | "createdAt" | "updatedAt", ExtArgs["result"]["vehicle"]>
  export type VehicleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owners?: boolean | Vehicle$ownersArgs<ExtArgs>
    bookings?: boolean | Vehicle$bookingsArgs<ExtArgs>
    serviceRecords?: boolean | Vehicle$serviceRecordsArgs<ExtArgs>
    _count?: boolean | VehicleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VehicleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type VehicleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $VehiclePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vehicle"
    objects: {
      owners: Prisma.$UserVehiclePayload<ExtArgs>[]
      bookings: Prisma.$BookingPayload<ExtArgs>[]
      serviceRecords: Prisma.$ServiceRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      plate: string | null
      vin: string | null
      make: string | null
      model: string | null
      year: number | null
      color: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["vehicle"]>
    composites: {}
  }

  type VehicleGetPayload<S extends boolean | null | undefined | VehicleDefaultArgs> = $Result.GetResult<Prisma.$VehiclePayload, S>

  type VehicleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VehicleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VehicleCountAggregateInputType | true
    }

  export interface VehicleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vehicle'], meta: { name: 'Vehicle' } }
    /**
     * Find zero or one Vehicle that matches the filter.
     * @param {VehicleFindUniqueArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VehicleFindUniqueArgs>(args: SelectSubset<T, VehicleFindUniqueArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vehicle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VehicleFindUniqueOrThrowArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VehicleFindUniqueOrThrowArgs>(args: SelectSubset<T, VehicleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vehicle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindFirstArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VehicleFindFirstArgs>(args?: SelectSubset<T, VehicleFindFirstArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vehicle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindFirstOrThrowArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VehicleFindFirstOrThrowArgs>(args?: SelectSubset<T, VehicleFindFirstOrThrowArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vehicles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vehicles
     * const vehicles = await prisma.vehicle.findMany()
     * 
     * // Get first 10 Vehicles
     * const vehicles = await prisma.vehicle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VehicleFindManyArgs>(args?: SelectSubset<T, VehicleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vehicle.
     * @param {VehicleCreateArgs} args - Arguments to create a Vehicle.
     * @example
     * // Create one Vehicle
     * const Vehicle = await prisma.vehicle.create({
     *   data: {
     *     // ... data to create a Vehicle
     *   }
     * })
     * 
     */
    create<T extends VehicleCreateArgs>(args: SelectSubset<T, VehicleCreateArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Vehicles.
     * @param {VehicleCreateManyArgs} args - Arguments to create many Vehicles.
     * @example
     * // Create many Vehicles
     * const vehicle = await prisma.vehicle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VehicleCreateManyArgs>(args?: SelectSubset<T, VehicleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vehicles and returns the data saved in the database.
     * @param {VehicleCreateManyAndReturnArgs} args - Arguments to create many Vehicles.
     * @example
     * // Create many Vehicles
     * const vehicle = await prisma.vehicle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vehicles and only return the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VehicleCreateManyAndReturnArgs>(args?: SelectSubset<T, VehicleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Vehicle.
     * @param {VehicleDeleteArgs} args - Arguments to delete one Vehicle.
     * @example
     * // Delete one Vehicle
     * const Vehicle = await prisma.vehicle.delete({
     *   where: {
     *     // ... filter to delete one Vehicle
     *   }
     * })
     * 
     */
    delete<T extends VehicleDeleteArgs>(args: SelectSubset<T, VehicleDeleteArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vehicle.
     * @param {VehicleUpdateArgs} args - Arguments to update one Vehicle.
     * @example
     * // Update one Vehicle
     * const vehicle = await prisma.vehicle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VehicleUpdateArgs>(args: SelectSubset<T, VehicleUpdateArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Vehicles.
     * @param {VehicleDeleteManyArgs} args - Arguments to filter Vehicles to delete.
     * @example
     * // Delete a few Vehicles
     * const { count } = await prisma.vehicle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VehicleDeleteManyArgs>(args?: SelectSubset<T, VehicleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vehicles
     * const vehicle = await prisma.vehicle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VehicleUpdateManyArgs>(args: SelectSubset<T, VehicleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vehicles and returns the data updated in the database.
     * @param {VehicleUpdateManyAndReturnArgs} args - Arguments to update many Vehicles.
     * @example
     * // Update many Vehicles
     * const vehicle = await prisma.vehicle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Vehicles and only return the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VehicleUpdateManyAndReturnArgs>(args: SelectSubset<T, VehicleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Vehicle.
     * @param {VehicleUpsertArgs} args - Arguments to update or create a Vehicle.
     * @example
     * // Update or create a Vehicle
     * const vehicle = await prisma.vehicle.upsert({
     *   create: {
     *     // ... data to create a Vehicle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vehicle we want to update
     *   }
     * })
     */
    upsert<T extends VehicleUpsertArgs>(args: SelectSubset<T, VehicleUpsertArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Vehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleCountArgs} args - Arguments to filter Vehicles to count.
     * @example
     * // Count the number of Vehicles
     * const count = await prisma.vehicle.count({
     *   where: {
     *     // ... the filter for the Vehicles we want to count
     *   }
     * })
    **/
    count<T extends VehicleCountArgs>(
      args?: Subset<T, VehicleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VehicleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VehicleAggregateArgs>(args: Subset<T, VehicleAggregateArgs>): Prisma.PrismaPromise<GetVehicleAggregateType<T>>

    /**
     * Group by Vehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VehicleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VehicleGroupByArgs['orderBy'] }
        : { orderBy?: VehicleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VehicleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVehicleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vehicle model
   */
  readonly fields: VehicleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vehicle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VehicleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owners<T extends Vehicle$ownersArgs<ExtArgs> = {}>(args?: Subset<T, Vehicle$ownersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserVehiclePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bookings<T extends Vehicle$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, Vehicle$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    serviceRecords<T extends Vehicle$serviceRecordsArgs<ExtArgs> = {}>(args?: Subset<T, Vehicle$serviceRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Vehicle model
   */
  interface VehicleFieldRefs {
    readonly id: FieldRef<"Vehicle", 'String'>
    readonly plate: FieldRef<"Vehicle", 'String'>
    readonly vin: FieldRef<"Vehicle", 'String'>
    readonly make: FieldRef<"Vehicle", 'String'>
    readonly model: FieldRef<"Vehicle", 'String'>
    readonly year: FieldRef<"Vehicle", 'Int'>
    readonly color: FieldRef<"Vehicle", 'String'>
    readonly createdAt: FieldRef<"Vehicle", 'DateTime'>
    readonly updatedAt: FieldRef<"Vehicle", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Vehicle findUnique
   */
  export type VehicleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle findUniqueOrThrow
   */
  export type VehicleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle findFirst
   */
  export type VehicleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle findFirstOrThrow
   */
  export type VehicleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle findMany
   */
  export type VehicleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicles to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle create
   */
  export type VehicleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The data needed to create a Vehicle.
     */
    data: XOR<VehicleCreateInput, VehicleUncheckedCreateInput>
  }

  /**
   * Vehicle createMany
   */
  export type VehicleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vehicles.
     */
    data: VehicleCreateManyInput | VehicleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vehicle createManyAndReturn
   */
  export type VehicleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * The data used to create many Vehicles.
     */
    data: VehicleCreateManyInput | VehicleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vehicle update
   */
  export type VehicleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The data needed to update a Vehicle.
     */
    data: XOR<VehicleUpdateInput, VehicleUncheckedUpdateInput>
    /**
     * Choose, which Vehicle to update.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle updateMany
   */
  export type VehicleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vehicles.
     */
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyInput>
    /**
     * Filter which Vehicles to update
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to update.
     */
    limit?: number
  }

  /**
   * Vehicle updateManyAndReturn
   */
  export type VehicleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * The data used to update Vehicles.
     */
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyInput>
    /**
     * Filter which Vehicles to update
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to update.
     */
    limit?: number
  }

  /**
   * Vehicle upsert
   */
  export type VehicleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The filter to search for the Vehicle to update in case it exists.
     */
    where: VehicleWhereUniqueInput
    /**
     * In case the Vehicle found by the `where` argument doesn't exist, create a new Vehicle with this data.
     */
    create: XOR<VehicleCreateInput, VehicleUncheckedCreateInput>
    /**
     * In case the Vehicle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VehicleUpdateInput, VehicleUncheckedUpdateInput>
  }

  /**
   * Vehicle delete
   */
  export type VehicleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter which Vehicle to delete.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle deleteMany
   */
  export type VehicleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vehicles to delete
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to delete.
     */
    limit?: number
  }

  /**
   * Vehicle.owners
   */
  export type Vehicle$ownersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVehicle
     */
    select?: UserVehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVehicle
     */
    omit?: UserVehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVehicleInclude<ExtArgs> | null
    where?: UserVehicleWhereInput
    orderBy?: UserVehicleOrderByWithRelationInput | UserVehicleOrderByWithRelationInput[]
    cursor?: UserVehicleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserVehicleScalarFieldEnum | UserVehicleScalarFieldEnum[]
  }

  /**
   * Vehicle.bookings
   */
  export type Vehicle$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Vehicle.serviceRecords
   */
  export type Vehicle$serviceRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRecord
     */
    select?: ServiceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRecord
     */
    omit?: ServiceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRecordInclude<ExtArgs> | null
    where?: ServiceRecordWhereInput
    orderBy?: ServiceRecordOrderByWithRelationInput | ServiceRecordOrderByWithRelationInput[]
    cursor?: ServiceRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceRecordScalarFieldEnum | ServiceRecordScalarFieldEnum[]
  }

  /**
   * Vehicle without action
   */
  export type VehicleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
  }


  /**
   * Model UserVehicle
   */

  export type AggregateUserVehicle = {
    _count: UserVehicleCountAggregateOutputType | null
    _min: UserVehicleMinAggregateOutputType | null
    _max: UserVehicleMaxAggregateOutputType | null
  }

  export type UserVehicleMinAggregateOutputType = {
    id: string | null
    userId: string | null
    vehicleId: string | null
    isHidden: boolean | null
    ownedSince: Date | null
    ownedUntil: Date | null
  }

  export type UserVehicleMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    vehicleId: string | null
    isHidden: boolean | null
    ownedSince: Date | null
    ownedUntil: Date | null
  }

  export type UserVehicleCountAggregateOutputType = {
    id: number
    userId: number
    vehicleId: number
    isHidden: number
    ownedSince: number
    ownedUntil: number
    _all: number
  }


  export type UserVehicleMinAggregateInputType = {
    id?: true
    userId?: true
    vehicleId?: true
    isHidden?: true
    ownedSince?: true
    ownedUntil?: true
  }

  export type UserVehicleMaxAggregateInputType = {
    id?: true
    userId?: true
    vehicleId?: true
    isHidden?: true
    ownedSince?: true
    ownedUntil?: true
  }

  export type UserVehicleCountAggregateInputType = {
    id?: true
    userId?: true
    vehicleId?: true
    isHidden?: true
    ownedSince?: true
    ownedUntil?: true
    _all?: true
  }

  export type UserVehicleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserVehicle to aggregate.
     */
    where?: UserVehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserVehicles to fetch.
     */
    orderBy?: UserVehicleOrderByWithRelationInput | UserVehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserVehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserVehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserVehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserVehicles
    **/
    _count?: true | UserVehicleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserVehicleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserVehicleMaxAggregateInputType
  }

  export type GetUserVehicleAggregateType<T extends UserVehicleAggregateArgs> = {
        [P in keyof T & keyof AggregateUserVehicle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserVehicle[P]>
      : GetScalarType<T[P], AggregateUserVehicle[P]>
  }




  export type UserVehicleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserVehicleWhereInput
    orderBy?: UserVehicleOrderByWithAggregationInput | UserVehicleOrderByWithAggregationInput[]
    by: UserVehicleScalarFieldEnum[] | UserVehicleScalarFieldEnum
    having?: UserVehicleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserVehicleCountAggregateInputType | true
    _min?: UserVehicleMinAggregateInputType
    _max?: UserVehicleMaxAggregateInputType
  }

  export type UserVehicleGroupByOutputType = {
    id: string
    userId: string
    vehicleId: string
    isHidden: boolean
    ownedSince: Date
    ownedUntil: Date | null
    _count: UserVehicleCountAggregateOutputType | null
    _min: UserVehicleMinAggregateOutputType | null
    _max: UserVehicleMaxAggregateOutputType | null
  }

  type GetUserVehicleGroupByPayload<T extends UserVehicleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserVehicleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserVehicleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserVehicleGroupByOutputType[P]>
            : GetScalarType<T[P], UserVehicleGroupByOutputType[P]>
        }
      >
    >


  export type UserVehicleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    vehicleId?: boolean
    isHidden?: boolean
    ownedSince?: boolean
    ownedUntil?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userVehicle"]>

  export type UserVehicleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    vehicleId?: boolean
    isHidden?: boolean
    ownedSince?: boolean
    ownedUntil?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userVehicle"]>

  export type UserVehicleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    vehicleId?: boolean
    isHidden?: boolean
    ownedSince?: boolean
    ownedUntil?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userVehicle"]>

  export type UserVehicleSelectScalar = {
    id?: boolean
    userId?: boolean
    vehicleId?: boolean
    isHidden?: boolean
    ownedSince?: boolean
    ownedUntil?: boolean
  }

  export type UserVehicleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "vehicleId" | "isHidden" | "ownedSince" | "ownedUntil", ExtArgs["result"]["userVehicle"]>
  export type UserVehicleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }
  export type UserVehicleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }
  export type UserVehicleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }

  export type $UserVehiclePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserVehicle"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      vehicle: Prisma.$VehiclePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      vehicleId: string
      isHidden: boolean
      ownedSince: Date
      ownedUntil: Date | null
    }, ExtArgs["result"]["userVehicle"]>
    composites: {}
  }

  type UserVehicleGetPayload<S extends boolean | null | undefined | UserVehicleDefaultArgs> = $Result.GetResult<Prisma.$UserVehiclePayload, S>

  type UserVehicleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserVehicleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserVehicleCountAggregateInputType | true
    }

  export interface UserVehicleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserVehicle'], meta: { name: 'UserVehicle' } }
    /**
     * Find zero or one UserVehicle that matches the filter.
     * @param {UserVehicleFindUniqueArgs} args - Arguments to find a UserVehicle
     * @example
     * // Get one UserVehicle
     * const userVehicle = await prisma.userVehicle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserVehicleFindUniqueArgs>(args: SelectSubset<T, UserVehicleFindUniqueArgs<ExtArgs>>): Prisma__UserVehicleClient<$Result.GetResult<Prisma.$UserVehiclePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserVehicle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserVehicleFindUniqueOrThrowArgs} args - Arguments to find a UserVehicle
     * @example
     * // Get one UserVehicle
     * const userVehicle = await prisma.userVehicle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserVehicleFindUniqueOrThrowArgs>(args: SelectSubset<T, UserVehicleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserVehicleClient<$Result.GetResult<Prisma.$UserVehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserVehicle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserVehicleFindFirstArgs} args - Arguments to find a UserVehicle
     * @example
     * // Get one UserVehicle
     * const userVehicle = await prisma.userVehicle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserVehicleFindFirstArgs>(args?: SelectSubset<T, UserVehicleFindFirstArgs<ExtArgs>>): Prisma__UserVehicleClient<$Result.GetResult<Prisma.$UserVehiclePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserVehicle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserVehicleFindFirstOrThrowArgs} args - Arguments to find a UserVehicle
     * @example
     * // Get one UserVehicle
     * const userVehicle = await prisma.userVehicle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserVehicleFindFirstOrThrowArgs>(args?: SelectSubset<T, UserVehicleFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserVehicleClient<$Result.GetResult<Prisma.$UserVehiclePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserVehicles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserVehicleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserVehicles
     * const userVehicles = await prisma.userVehicle.findMany()
     * 
     * // Get first 10 UserVehicles
     * const userVehicles = await prisma.userVehicle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userVehicleWithIdOnly = await prisma.userVehicle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserVehicleFindManyArgs>(args?: SelectSubset<T, UserVehicleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserVehiclePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserVehicle.
     * @param {UserVehicleCreateArgs} args - Arguments to create a UserVehicle.
     * @example
     * // Create one UserVehicle
     * const UserVehicle = await prisma.userVehicle.create({
     *   data: {
     *     // ... data to create a UserVehicle
     *   }
     * })
     * 
     */
    create<T extends UserVehicleCreateArgs>(args: SelectSubset<T, UserVehicleCreateArgs<ExtArgs>>): Prisma__UserVehicleClient<$Result.GetResult<Prisma.$UserVehiclePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserVehicles.
     * @param {UserVehicleCreateManyArgs} args - Arguments to create many UserVehicles.
     * @example
     * // Create many UserVehicles
     * const userVehicle = await prisma.userVehicle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserVehicleCreateManyArgs>(args?: SelectSubset<T, UserVehicleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserVehicles and returns the data saved in the database.
     * @param {UserVehicleCreateManyAndReturnArgs} args - Arguments to create many UserVehicles.
     * @example
     * // Create many UserVehicles
     * const userVehicle = await prisma.userVehicle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserVehicles and only return the `id`
     * const userVehicleWithIdOnly = await prisma.userVehicle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserVehicleCreateManyAndReturnArgs>(args?: SelectSubset<T, UserVehicleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserVehiclePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserVehicle.
     * @param {UserVehicleDeleteArgs} args - Arguments to delete one UserVehicle.
     * @example
     * // Delete one UserVehicle
     * const UserVehicle = await prisma.userVehicle.delete({
     *   where: {
     *     // ... filter to delete one UserVehicle
     *   }
     * })
     * 
     */
    delete<T extends UserVehicleDeleteArgs>(args: SelectSubset<T, UserVehicleDeleteArgs<ExtArgs>>): Prisma__UserVehicleClient<$Result.GetResult<Prisma.$UserVehiclePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserVehicle.
     * @param {UserVehicleUpdateArgs} args - Arguments to update one UserVehicle.
     * @example
     * // Update one UserVehicle
     * const userVehicle = await prisma.userVehicle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserVehicleUpdateArgs>(args: SelectSubset<T, UserVehicleUpdateArgs<ExtArgs>>): Prisma__UserVehicleClient<$Result.GetResult<Prisma.$UserVehiclePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserVehicles.
     * @param {UserVehicleDeleteManyArgs} args - Arguments to filter UserVehicles to delete.
     * @example
     * // Delete a few UserVehicles
     * const { count } = await prisma.userVehicle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserVehicleDeleteManyArgs>(args?: SelectSubset<T, UserVehicleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserVehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserVehicleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserVehicles
     * const userVehicle = await prisma.userVehicle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserVehicleUpdateManyArgs>(args: SelectSubset<T, UserVehicleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserVehicles and returns the data updated in the database.
     * @param {UserVehicleUpdateManyAndReturnArgs} args - Arguments to update many UserVehicles.
     * @example
     * // Update many UserVehicles
     * const userVehicle = await prisma.userVehicle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserVehicles and only return the `id`
     * const userVehicleWithIdOnly = await prisma.userVehicle.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserVehicleUpdateManyAndReturnArgs>(args: SelectSubset<T, UserVehicleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserVehiclePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserVehicle.
     * @param {UserVehicleUpsertArgs} args - Arguments to update or create a UserVehicle.
     * @example
     * // Update or create a UserVehicle
     * const userVehicle = await prisma.userVehicle.upsert({
     *   create: {
     *     // ... data to create a UserVehicle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserVehicle we want to update
     *   }
     * })
     */
    upsert<T extends UserVehicleUpsertArgs>(args: SelectSubset<T, UserVehicleUpsertArgs<ExtArgs>>): Prisma__UserVehicleClient<$Result.GetResult<Prisma.$UserVehiclePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserVehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserVehicleCountArgs} args - Arguments to filter UserVehicles to count.
     * @example
     * // Count the number of UserVehicles
     * const count = await prisma.userVehicle.count({
     *   where: {
     *     // ... the filter for the UserVehicles we want to count
     *   }
     * })
    **/
    count<T extends UserVehicleCountArgs>(
      args?: Subset<T, UserVehicleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserVehicleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserVehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserVehicleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserVehicleAggregateArgs>(args: Subset<T, UserVehicleAggregateArgs>): Prisma.PrismaPromise<GetUserVehicleAggregateType<T>>

    /**
     * Group by UserVehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserVehicleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserVehicleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserVehicleGroupByArgs['orderBy'] }
        : { orderBy?: UserVehicleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserVehicleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserVehicleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserVehicle model
   */
  readonly fields: UserVehicleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserVehicle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserVehicleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    vehicle<T extends VehicleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VehicleDefaultArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserVehicle model
   */
  interface UserVehicleFieldRefs {
    readonly id: FieldRef<"UserVehicle", 'String'>
    readonly userId: FieldRef<"UserVehicle", 'String'>
    readonly vehicleId: FieldRef<"UserVehicle", 'String'>
    readonly isHidden: FieldRef<"UserVehicle", 'Boolean'>
    readonly ownedSince: FieldRef<"UserVehicle", 'DateTime'>
    readonly ownedUntil: FieldRef<"UserVehicle", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserVehicle findUnique
   */
  export type UserVehicleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVehicle
     */
    select?: UserVehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVehicle
     */
    omit?: UserVehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVehicleInclude<ExtArgs> | null
    /**
     * Filter, which UserVehicle to fetch.
     */
    where: UserVehicleWhereUniqueInput
  }

  /**
   * UserVehicle findUniqueOrThrow
   */
  export type UserVehicleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVehicle
     */
    select?: UserVehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVehicle
     */
    omit?: UserVehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVehicleInclude<ExtArgs> | null
    /**
     * Filter, which UserVehicle to fetch.
     */
    where: UserVehicleWhereUniqueInput
  }

  /**
   * UserVehicle findFirst
   */
  export type UserVehicleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVehicle
     */
    select?: UserVehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVehicle
     */
    omit?: UserVehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVehicleInclude<ExtArgs> | null
    /**
     * Filter, which UserVehicle to fetch.
     */
    where?: UserVehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserVehicles to fetch.
     */
    orderBy?: UserVehicleOrderByWithRelationInput | UserVehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserVehicles.
     */
    cursor?: UserVehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserVehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserVehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserVehicles.
     */
    distinct?: UserVehicleScalarFieldEnum | UserVehicleScalarFieldEnum[]
  }

  /**
   * UserVehicle findFirstOrThrow
   */
  export type UserVehicleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVehicle
     */
    select?: UserVehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVehicle
     */
    omit?: UserVehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVehicleInclude<ExtArgs> | null
    /**
     * Filter, which UserVehicle to fetch.
     */
    where?: UserVehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserVehicles to fetch.
     */
    orderBy?: UserVehicleOrderByWithRelationInput | UserVehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserVehicles.
     */
    cursor?: UserVehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserVehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserVehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserVehicles.
     */
    distinct?: UserVehicleScalarFieldEnum | UserVehicleScalarFieldEnum[]
  }

  /**
   * UserVehicle findMany
   */
  export type UserVehicleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVehicle
     */
    select?: UserVehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVehicle
     */
    omit?: UserVehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVehicleInclude<ExtArgs> | null
    /**
     * Filter, which UserVehicles to fetch.
     */
    where?: UserVehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserVehicles to fetch.
     */
    orderBy?: UserVehicleOrderByWithRelationInput | UserVehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserVehicles.
     */
    cursor?: UserVehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserVehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserVehicles.
     */
    skip?: number
    distinct?: UserVehicleScalarFieldEnum | UserVehicleScalarFieldEnum[]
  }

  /**
   * UserVehicle create
   */
  export type UserVehicleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVehicle
     */
    select?: UserVehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVehicle
     */
    omit?: UserVehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVehicleInclude<ExtArgs> | null
    /**
     * The data needed to create a UserVehicle.
     */
    data: XOR<UserVehicleCreateInput, UserVehicleUncheckedCreateInput>
  }

  /**
   * UserVehicle createMany
   */
  export type UserVehicleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserVehicles.
     */
    data: UserVehicleCreateManyInput | UserVehicleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserVehicle createManyAndReturn
   */
  export type UserVehicleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVehicle
     */
    select?: UserVehicleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserVehicle
     */
    omit?: UserVehicleOmit<ExtArgs> | null
    /**
     * The data used to create many UserVehicles.
     */
    data: UserVehicleCreateManyInput | UserVehicleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVehicleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserVehicle update
   */
  export type UserVehicleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVehicle
     */
    select?: UserVehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVehicle
     */
    omit?: UserVehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVehicleInclude<ExtArgs> | null
    /**
     * The data needed to update a UserVehicle.
     */
    data: XOR<UserVehicleUpdateInput, UserVehicleUncheckedUpdateInput>
    /**
     * Choose, which UserVehicle to update.
     */
    where: UserVehicleWhereUniqueInput
  }

  /**
   * UserVehicle updateMany
   */
  export type UserVehicleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserVehicles.
     */
    data: XOR<UserVehicleUpdateManyMutationInput, UserVehicleUncheckedUpdateManyInput>
    /**
     * Filter which UserVehicles to update
     */
    where?: UserVehicleWhereInput
    /**
     * Limit how many UserVehicles to update.
     */
    limit?: number
  }

  /**
   * UserVehicle updateManyAndReturn
   */
  export type UserVehicleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVehicle
     */
    select?: UserVehicleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserVehicle
     */
    omit?: UserVehicleOmit<ExtArgs> | null
    /**
     * The data used to update UserVehicles.
     */
    data: XOR<UserVehicleUpdateManyMutationInput, UserVehicleUncheckedUpdateManyInput>
    /**
     * Filter which UserVehicles to update
     */
    where?: UserVehicleWhereInput
    /**
     * Limit how many UserVehicles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVehicleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserVehicle upsert
   */
  export type UserVehicleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVehicle
     */
    select?: UserVehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVehicle
     */
    omit?: UserVehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVehicleInclude<ExtArgs> | null
    /**
     * The filter to search for the UserVehicle to update in case it exists.
     */
    where: UserVehicleWhereUniqueInput
    /**
     * In case the UserVehicle found by the `where` argument doesn't exist, create a new UserVehicle with this data.
     */
    create: XOR<UserVehicleCreateInput, UserVehicleUncheckedCreateInput>
    /**
     * In case the UserVehicle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserVehicleUpdateInput, UserVehicleUncheckedUpdateInput>
  }

  /**
   * UserVehicle delete
   */
  export type UserVehicleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVehicle
     */
    select?: UserVehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVehicle
     */
    omit?: UserVehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVehicleInclude<ExtArgs> | null
    /**
     * Filter which UserVehicle to delete.
     */
    where: UserVehicleWhereUniqueInput
  }

  /**
   * UserVehicle deleteMany
   */
  export type UserVehicleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserVehicles to delete
     */
    where?: UserVehicleWhereInput
    /**
     * Limit how many UserVehicles to delete.
     */
    limit?: number
  }

  /**
   * UserVehicle without action
   */
  export type UserVehicleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVehicle
     */
    select?: UserVehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVehicle
     */
    omit?: UserVehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVehicleInclude<ExtArgs> | null
  }


  /**
   * Model Booking
   */

  export type AggregateBooking = {
    _count: BookingCountAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  export type BookingMinAggregateOutputType = {
    id: string | null
    userId: string | null
    vehicleId: string | null
    serviceType: $Enums.ServiceType | null
    status: $Enums.BookingStatus | null
    scheduledAt: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookingMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    vehicleId: string | null
    serviceType: $Enums.ServiceType | null
    status: $Enums.BookingStatus | null
    scheduledAt: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookingCountAggregateOutputType = {
    id: number
    userId: number
    vehicleId: number
    serviceType: number
    status: number
    scheduledAt: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BookingMinAggregateInputType = {
    id?: true
    userId?: true
    vehicleId?: true
    serviceType?: true
    status?: true
    scheduledAt?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookingMaxAggregateInputType = {
    id?: true
    userId?: true
    vehicleId?: true
    serviceType?: true
    status?: true
    scheduledAt?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookingCountAggregateInputType = {
    id?: true
    userId?: true
    vehicleId?: true
    serviceType?: true
    status?: true
    scheduledAt?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BookingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Booking to aggregate.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bookings
    **/
    _count?: true | BookingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookingMaxAggregateInputType
  }

  export type GetBookingAggregateType<T extends BookingAggregateArgs> = {
        [P in keyof T & keyof AggregateBooking]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBooking[P]>
      : GetScalarType<T[P], AggregateBooking[P]>
  }




  export type BookingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithAggregationInput | BookingOrderByWithAggregationInput[]
    by: BookingScalarFieldEnum[] | BookingScalarFieldEnum
    having?: BookingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookingCountAggregateInputType | true
    _min?: BookingMinAggregateInputType
    _max?: BookingMaxAggregateInputType
  }

  export type BookingGroupByOutputType = {
    id: string
    userId: string
    vehicleId: string
    serviceType: $Enums.ServiceType
    status: $Enums.BookingStatus
    scheduledAt: Date | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: BookingCountAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  type GetBookingGroupByPayload<T extends BookingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookingGroupByOutputType[P]>
            : GetScalarType<T[P], BookingGroupByOutputType[P]>
        }
      >
    >


  export type BookingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    vehicleId?: boolean
    serviceType?: boolean
    status?: boolean
    scheduledAt?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    serviceRecords?: boolean | Booking$serviceRecordsArgs<ExtArgs>
    _count?: boolean | BookingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    vehicleId?: boolean
    serviceType?: boolean
    status?: boolean
    scheduledAt?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    vehicleId?: boolean
    serviceType?: boolean
    status?: boolean
    scheduledAt?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectScalar = {
    id?: boolean
    userId?: boolean
    vehicleId?: boolean
    serviceType?: boolean
    status?: boolean
    scheduledAt?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BookingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "vehicleId" | "serviceType" | "status" | "scheduledAt" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["booking"]>
  export type BookingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    serviceRecords?: boolean | Booking$serviceRecordsArgs<ExtArgs>
    _count?: boolean | BookingCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BookingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }
  export type BookingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }

  export type $BookingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Booking"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      vehicle: Prisma.$VehiclePayload<ExtArgs>
      serviceRecords: Prisma.$ServiceRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      vehicleId: string
      serviceType: $Enums.ServiceType
      status: $Enums.BookingStatus
      scheduledAt: Date | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["booking"]>
    composites: {}
  }

  type BookingGetPayload<S extends boolean | null | undefined | BookingDefaultArgs> = $Result.GetResult<Prisma.$BookingPayload, S>

  type BookingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookingCountAggregateInputType | true
    }

  export interface BookingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Booking'], meta: { name: 'Booking' } }
    /**
     * Find zero or one Booking that matches the filter.
     * @param {BookingFindUniqueArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookingFindUniqueArgs>(args: SelectSubset<T, BookingFindUniqueArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Booking that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookingFindUniqueOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookingFindUniqueOrThrowArgs>(args: SelectSubset<T, BookingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Booking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookingFindFirstArgs>(args?: SelectSubset<T, BookingFindFirstArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Booking that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookingFindFirstOrThrowArgs>(args?: SelectSubset<T, BookingFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bookings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bookings
     * const bookings = await prisma.booking.findMany()
     * 
     * // Get first 10 Bookings
     * const bookings = await prisma.booking.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookingWithIdOnly = await prisma.booking.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookingFindManyArgs>(args?: SelectSubset<T, BookingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Booking.
     * @param {BookingCreateArgs} args - Arguments to create a Booking.
     * @example
     * // Create one Booking
     * const Booking = await prisma.booking.create({
     *   data: {
     *     // ... data to create a Booking
     *   }
     * })
     * 
     */
    create<T extends BookingCreateArgs>(args: SelectSubset<T, BookingCreateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bookings.
     * @param {BookingCreateManyArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookingCreateManyArgs>(args?: SelectSubset<T, BookingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bookings and returns the data saved in the database.
     * @param {BookingCreateManyAndReturnArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bookings and only return the `id`
     * const bookingWithIdOnly = await prisma.booking.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookingCreateManyAndReturnArgs>(args?: SelectSubset<T, BookingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Booking.
     * @param {BookingDeleteArgs} args - Arguments to delete one Booking.
     * @example
     * // Delete one Booking
     * const Booking = await prisma.booking.delete({
     *   where: {
     *     // ... filter to delete one Booking
     *   }
     * })
     * 
     */
    delete<T extends BookingDeleteArgs>(args: SelectSubset<T, BookingDeleteArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Booking.
     * @param {BookingUpdateArgs} args - Arguments to update one Booking.
     * @example
     * // Update one Booking
     * const booking = await prisma.booking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookingUpdateArgs>(args: SelectSubset<T, BookingUpdateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bookings.
     * @param {BookingDeleteManyArgs} args - Arguments to filter Bookings to delete.
     * @example
     * // Delete a few Bookings
     * const { count } = await prisma.booking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookingDeleteManyArgs>(args?: SelectSubset<T, BookingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookingUpdateManyArgs>(args: SelectSubset<T, BookingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings and returns the data updated in the database.
     * @param {BookingUpdateManyAndReturnArgs} args - Arguments to update many Bookings.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bookings and only return the `id`
     * const bookingWithIdOnly = await prisma.booking.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BookingUpdateManyAndReturnArgs>(args: SelectSubset<T, BookingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Booking.
     * @param {BookingUpsertArgs} args - Arguments to update or create a Booking.
     * @example
     * // Update or create a Booking
     * const booking = await prisma.booking.upsert({
     *   create: {
     *     // ... data to create a Booking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Booking we want to update
     *   }
     * })
     */
    upsert<T extends BookingUpsertArgs>(args: SelectSubset<T, BookingUpsertArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingCountArgs} args - Arguments to filter Bookings to count.
     * @example
     * // Count the number of Bookings
     * const count = await prisma.booking.count({
     *   where: {
     *     // ... the filter for the Bookings we want to count
     *   }
     * })
    **/
    count<T extends BookingCountArgs>(
      args?: Subset<T, BookingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookingAggregateArgs>(args: Subset<T, BookingAggregateArgs>): Prisma.PrismaPromise<GetBookingAggregateType<T>>

    /**
     * Group by Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookingGroupByArgs['orderBy'] }
        : { orderBy?: BookingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Booking model
   */
  readonly fields: BookingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Booking.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    vehicle<T extends VehicleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VehicleDefaultArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    serviceRecords<T extends Booking$serviceRecordsArgs<ExtArgs> = {}>(args?: Subset<T, Booking$serviceRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Booking model
   */
  interface BookingFieldRefs {
    readonly id: FieldRef<"Booking", 'String'>
    readonly userId: FieldRef<"Booking", 'String'>
    readonly vehicleId: FieldRef<"Booking", 'String'>
    readonly serviceType: FieldRef<"Booking", 'ServiceType'>
    readonly status: FieldRef<"Booking", 'BookingStatus'>
    readonly scheduledAt: FieldRef<"Booking", 'DateTime'>
    readonly notes: FieldRef<"Booking", 'String'>
    readonly createdAt: FieldRef<"Booking", 'DateTime'>
    readonly updatedAt: FieldRef<"Booking", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Booking findUnique
   */
  export type BookingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findUniqueOrThrow
   */
  export type BookingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findFirst
   */
  export type BookingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findFirstOrThrow
   */
  export type BookingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findMany
   */
  export type BookingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Bookings to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking create
   */
  export type BookingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to create a Booking.
     */
    data: XOR<BookingCreateInput, BookingUncheckedCreateInput>
  }

  /**
   * Booking createMany
   */
  export type BookingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Booking createManyAndReturn
   */
  export type BookingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Booking update
   */
  export type BookingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to update a Booking.
     */
    data: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
    /**
     * Choose, which Booking to update.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking updateMany
   */
  export type BookingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bookings.
     */
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to update.
     */
    limit?: number
  }

  /**
   * Booking updateManyAndReturn
   */
  export type BookingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * The data used to update Bookings.
     */
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Booking upsert
   */
  export type BookingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The filter to search for the Booking to update in case it exists.
     */
    where: BookingWhereUniqueInput
    /**
     * In case the Booking found by the `where` argument doesn't exist, create a new Booking with this data.
     */
    create: XOR<BookingCreateInput, BookingUncheckedCreateInput>
    /**
     * In case the Booking was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
  }

  /**
   * Booking delete
   */
  export type BookingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter which Booking to delete.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking deleteMany
   */
  export type BookingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bookings to delete
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to delete.
     */
    limit?: number
  }

  /**
   * Booking.serviceRecords
   */
  export type Booking$serviceRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRecord
     */
    select?: ServiceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRecord
     */
    omit?: ServiceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRecordInclude<ExtArgs> | null
    where?: ServiceRecordWhereInput
    orderBy?: ServiceRecordOrderByWithRelationInput | ServiceRecordOrderByWithRelationInput[]
    cursor?: ServiceRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceRecordScalarFieldEnum | ServiceRecordScalarFieldEnum[]
  }

  /**
   * Booking without action
   */
  export type BookingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
  }


  /**
   * Model ServiceRecord
   */

  export type AggregateServiceRecord = {
    _count: ServiceRecordCountAggregateOutputType | null
    _avg: ServiceRecordAvgAggregateOutputType | null
    _sum: ServiceRecordSumAggregateOutputType | null
    _min: ServiceRecordMinAggregateOutputType | null
    _max: ServiceRecordMaxAggregateOutputType | null
  }

  export type ServiceRecordAvgAggregateOutputType = {
    mileage: number | null
    cost: Decimal | null
  }

  export type ServiceRecordSumAggregateOutputType = {
    mileage: number | null
    cost: Decimal | null
  }

  export type ServiceRecordMinAggregateOutputType = {
    id: string | null
    vehicleId: string | null
    bookingId: string | null
    ownerUserId: string | null
    ownerType: $Enums.OwnerType | null
    serviceType: string | null
    description: string | null
    mileage: number | null
    cost: Decimal | null
    performedAt: Date | null
    createdAt: Date | null
  }

  export type ServiceRecordMaxAggregateOutputType = {
    id: string | null
    vehicleId: string | null
    bookingId: string | null
    ownerUserId: string | null
    ownerType: $Enums.OwnerType | null
    serviceType: string | null
    description: string | null
    mileage: number | null
    cost: Decimal | null
    performedAt: Date | null
    createdAt: Date | null
  }

  export type ServiceRecordCountAggregateOutputType = {
    id: number
    vehicleId: number
    bookingId: number
    ownerUserId: number
    ownerType: number
    serviceType: number
    description: number
    mileage: number
    cost: number
    performedAt: number
    createdAt: number
    _all: number
  }


  export type ServiceRecordAvgAggregateInputType = {
    mileage?: true
    cost?: true
  }

  export type ServiceRecordSumAggregateInputType = {
    mileage?: true
    cost?: true
  }

  export type ServiceRecordMinAggregateInputType = {
    id?: true
    vehicleId?: true
    bookingId?: true
    ownerUserId?: true
    ownerType?: true
    serviceType?: true
    description?: true
    mileage?: true
    cost?: true
    performedAt?: true
    createdAt?: true
  }

  export type ServiceRecordMaxAggregateInputType = {
    id?: true
    vehicleId?: true
    bookingId?: true
    ownerUserId?: true
    ownerType?: true
    serviceType?: true
    description?: true
    mileage?: true
    cost?: true
    performedAt?: true
    createdAt?: true
  }

  export type ServiceRecordCountAggregateInputType = {
    id?: true
    vehicleId?: true
    bookingId?: true
    ownerUserId?: true
    ownerType?: true
    serviceType?: true
    description?: true
    mileage?: true
    cost?: true
    performedAt?: true
    createdAt?: true
    _all?: true
  }

  export type ServiceRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceRecord to aggregate.
     */
    where?: ServiceRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceRecords to fetch.
     */
    orderBy?: ServiceRecordOrderByWithRelationInput | ServiceRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServiceRecords
    **/
    _count?: true | ServiceRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceRecordMaxAggregateInputType
  }

  export type GetServiceRecordAggregateType<T extends ServiceRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateServiceRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServiceRecord[P]>
      : GetScalarType<T[P], AggregateServiceRecord[P]>
  }




  export type ServiceRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceRecordWhereInput
    orderBy?: ServiceRecordOrderByWithAggregationInput | ServiceRecordOrderByWithAggregationInput[]
    by: ServiceRecordScalarFieldEnum[] | ServiceRecordScalarFieldEnum
    having?: ServiceRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceRecordCountAggregateInputType | true
    _avg?: ServiceRecordAvgAggregateInputType
    _sum?: ServiceRecordSumAggregateInputType
    _min?: ServiceRecordMinAggregateInputType
    _max?: ServiceRecordMaxAggregateInputType
  }

  export type ServiceRecordGroupByOutputType = {
    id: string
    vehicleId: string
    bookingId: string | null
    ownerUserId: string | null
    ownerType: $Enums.OwnerType
    serviceType: string
    description: string
    mileage: number | null
    cost: Decimal | null
    performedAt: Date
    createdAt: Date
    _count: ServiceRecordCountAggregateOutputType | null
    _avg: ServiceRecordAvgAggregateOutputType | null
    _sum: ServiceRecordSumAggregateOutputType | null
    _min: ServiceRecordMinAggregateOutputType | null
    _max: ServiceRecordMaxAggregateOutputType | null
  }

  type GetServiceRecordGroupByPayload<T extends ServiceRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceRecordGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceRecordGroupByOutputType[P]>
        }
      >
    >


  export type ServiceRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    bookingId?: boolean
    ownerUserId?: boolean
    ownerType?: boolean
    serviceType?: boolean
    description?: boolean
    mileage?: boolean
    cost?: boolean
    performedAt?: boolean
    createdAt?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    booking?: boolean | ServiceRecord$bookingArgs<ExtArgs>
    owner?: boolean | ServiceRecord$ownerArgs<ExtArgs>
  }, ExtArgs["result"]["serviceRecord"]>

  export type ServiceRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    bookingId?: boolean
    ownerUserId?: boolean
    ownerType?: boolean
    serviceType?: boolean
    description?: boolean
    mileage?: boolean
    cost?: boolean
    performedAt?: boolean
    createdAt?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    booking?: boolean | ServiceRecord$bookingArgs<ExtArgs>
    owner?: boolean | ServiceRecord$ownerArgs<ExtArgs>
  }, ExtArgs["result"]["serviceRecord"]>

  export type ServiceRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    bookingId?: boolean
    ownerUserId?: boolean
    ownerType?: boolean
    serviceType?: boolean
    description?: boolean
    mileage?: boolean
    cost?: boolean
    performedAt?: boolean
    createdAt?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    booking?: boolean | ServiceRecord$bookingArgs<ExtArgs>
    owner?: boolean | ServiceRecord$ownerArgs<ExtArgs>
  }, ExtArgs["result"]["serviceRecord"]>

  export type ServiceRecordSelectScalar = {
    id?: boolean
    vehicleId?: boolean
    bookingId?: boolean
    ownerUserId?: boolean
    ownerType?: boolean
    serviceType?: boolean
    description?: boolean
    mileage?: boolean
    cost?: boolean
    performedAt?: boolean
    createdAt?: boolean
  }

  export type ServiceRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "vehicleId" | "bookingId" | "ownerUserId" | "ownerType" | "serviceType" | "description" | "mileage" | "cost" | "performedAt" | "createdAt", ExtArgs["result"]["serviceRecord"]>
  export type ServiceRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    booking?: boolean | ServiceRecord$bookingArgs<ExtArgs>
    owner?: boolean | ServiceRecord$ownerArgs<ExtArgs>
  }
  export type ServiceRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    booking?: boolean | ServiceRecord$bookingArgs<ExtArgs>
    owner?: boolean | ServiceRecord$ownerArgs<ExtArgs>
  }
  export type ServiceRecordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    booking?: boolean | ServiceRecord$bookingArgs<ExtArgs>
    owner?: boolean | ServiceRecord$ownerArgs<ExtArgs>
  }

  export type $ServiceRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServiceRecord"
    objects: {
      vehicle: Prisma.$VehiclePayload<ExtArgs>
      booking: Prisma.$BookingPayload<ExtArgs> | null
      owner: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      vehicleId: string
      bookingId: string | null
      ownerUserId: string | null
      ownerType: $Enums.OwnerType
      serviceType: string
      description: string
      mileage: number | null
      cost: Prisma.Decimal | null
      performedAt: Date
      createdAt: Date
    }, ExtArgs["result"]["serviceRecord"]>
    composites: {}
  }

  type ServiceRecordGetPayload<S extends boolean | null | undefined | ServiceRecordDefaultArgs> = $Result.GetResult<Prisma.$ServiceRecordPayload, S>

  type ServiceRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceRecordCountAggregateInputType | true
    }

  export interface ServiceRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServiceRecord'], meta: { name: 'ServiceRecord' } }
    /**
     * Find zero or one ServiceRecord that matches the filter.
     * @param {ServiceRecordFindUniqueArgs} args - Arguments to find a ServiceRecord
     * @example
     * // Get one ServiceRecord
     * const serviceRecord = await prisma.serviceRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceRecordFindUniqueArgs>(args: SelectSubset<T, ServiceRecordFindUniqueArgs<ExtArgs>>): Prisma__ServiceRecordClient<$Result.GetResult<Prisma.$ServiceRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ServiceRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceRecordFindUniqueOrThrowArgs} args - Arguments to find a ServiceRecord
     * @example
     * // Get one ServiceRecord
     * const serviceRecord = await prisma.serviceRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceRecordClient<$Result.GetResult<Prisma.$ServiceRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceRecordFindFirstArgs} args - Arguments to find a ServiceRecord
     * @example
     * // Get one ServiceRecord
     * const serviceRecord = await prisma.serviceRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceRecordFindFirstArgs>(args?: SelectSubset<T, ServiceRecordFindFirstArgs<ExtArgs>>): Prisma__ServiceRecordClient<$Result.GetResult<Prisma.$ServiceRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceRecordFindFirstOrThrowArgs} args - Arguments to find a ServiceRecord
     * @example
     * // Get one ServiceRecord
     * const serviceRecord = await prisma.serviceRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceRecordClient<$Result.GetResult<Prisma.$ServiceRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ServiceRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServiceRecords
     * const serviceRecords = await prisma.serviceRecord.findMany()
     * 
     * // Get first 10 ServiceRecords
     * const serviceRecords = await prisma.serviceRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceRecordWithIdOnly = await prisma.serviceRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceRecordFindManyArgs>(args?: SelectSubset<T, ServiceRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ServiceRecord.
     * @param {ServiceRecordCreateArgs} args - Arguments to create a ServiceRecord.
     * @example
     * // Create one ServiceRecord
     * const ServiceRecord = await prisma.serviceRecord.create({
     *   data: {
     *     // ... data to create a ServiceRecord
     *   }
     * })
     * 
     */
    create<T extends ServiceRecordCreateArgs>(args: SelectSubset<T, ServiceRecordCreateArgs<ExtArgs>>): Prisma__ServiceRecordClient<$Result.GetResult<Prisma.$ServiceRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ServiceRecords.
     * @param {ServiceRecordCreateManyArgs} args - Arguments to create many ServiceRecords.
     * @example
     * // Create many ServiceRecords
     * const serviceRecord = await prisma.serviceRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceRecordCreateManyArgs>(args?: SelectSubset<T, ServiceRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ServiceRecords and returns the data saved in the database.
     * @param {ServiceRecordCreateManyAndReturnArgs} args - Arguments to create many ServiceRecords.
     * @example
     * // Create many ServiceRecords
     * const serviceRecord = await prisma.serviceRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ServiceRecords and only return the `id`
     * const serviceRecordWithIdOnly = await prisma.serviceRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ServiceRecord.
     * @param {ServiceRecordDeleteArgs} args - Arguments to delete one ServiceRecord.
     * @example
     * // Delete one ServiceRecord
     * const ServiceRecord = await prisma.serviceRecord.delete({
     *   where: {
     *     // ... filter to delete one ServiceRecord
     *   }
     * })
     * 
     */
    delete<T extends ServiceRecordDeleteArgs>(args: SelectSubset<T, ServiceRecordDeleteArgs<ExtArgs>>): Prisma__ServiceRecordClient<$Result.GetResult<Prisma.$ServiceRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ServiceRecord.
     * @param {ServiceRecordUpdateArgs} args - Arguments to update one ServiceRecord.
     * @example
     * // Update one ServiceRecord
     * const serviceRecord = await prisma.serviceRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceRecordUpdateArgs>(args: SelectSubset<T, ServiceRecordUpdateArgs<ExtArgs>>): Prisma__ServiceRecordClient<$Result.GetResult<Prisma.$ServiceRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ServiceRecords.
     * @param {ServiceRecordDeleteManyArgs} args - Arguments to filter ServiceRecords to delete.
     * @example
     * // Delete a few ServiceRecords
     * const { count } = await prisma.serviceRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceRecordDeleteManyArgs>(args?: SelectSubset<T, ServiceRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServiceRecords
     * const serviceRecord = await prisma.serviceRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceRecordUpdateManyArgs>(args: SelectSubset<T, ServiceRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceRecords and returns the data updated in the database.
     * @param {ServiceRecordUpdateManyAndReturnArgs} args - Arguments to update many ServiceRecords.
     * @example
     * // Update many ServiceRecords
     * const serviceRecord = await prisma.serviceRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ServiceRecords and only return the `id`
     * const serviceRecordWithIdOnly = await prisma.serviceRecord.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServiceRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ServiceRecord.
     * @param {ServiceRecordUpsertArgs} args - Arguments to update or create a ServiceRecord.
     * @example
     * // Update or create a ServiceRecord
     * const serviceRecord = await prisma.serviceRecord.upsert({
     *   create: {
     *     // ... data to create a ServiceRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServiceRecord we want to update
     *   }
     * })
     */
    upsert<T extends ServiceRecordUpsertArgs>(args: SelectSubset<T, ServiceRecordUpsertArgs<ExtArgs>>): Prisma__ServiceRecordClient<$Result.GetResult<Prisma.$ServiceRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ServiceRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceRecordCountArgs} args - Arguments to filter ServiceRecords to count.
     * @example
     * // Count the number of ServiceRecords
     * const count = await prisma.serviceRecord.count({
     *   where: {
     *     // ... the filter for the ServiceRecords we want to count
     *   }
     * })
    **/
    count<T extends ServiceRecordCountArgs>(
      args?: Subset<T, ServiceRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServiceRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiceRecordAggregateArgs>(args: Subset<T, ServiceRecordAggregateArgs>): Prisma.PrismaPromise<GetServiceRecordAggregateType<T>>

    /**
     * Group by ServiceRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiceRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceRecordGroupByArgs['orderBy'] }
        : { orderBy?: ServiceRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiceRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServiceRecord model
   */
  readonly fields: ServiceRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServiceRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vehicle<T extends VehicleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VehicleDefaultArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    booking<T extends ServiceRecord$bookingArgs<ExtArgs> = {}>(args?: Subset<T, ServiceRecord$bookingArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    owner<T extends ServiceRecord$ownerArgs<ExtArgs> = {}>(args?: Subset<T, ServiceRecord$ownerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ServiceRecord model
   */
  interface ServiceRecordFieldRefs {
    readonly id: FieldRef<"ServiceRecord", 'String'>
    readonly vehicleId: FieldRef<"ServiceRecord", 'String'>
    readonly bookingId: FieldRef<"ServiceRecord", 'String'>
    readonly ownerUserId: FieldRef<"ServiceRecord", 'String'>
    readonly ownerType: FieldRef<"ServiceRecord", 'OwnerType'>
    readonly serviceType: FieldRef<"ServiceRecord", 'String'>
    readonly description: FieldRef<"ServiceRecord", 'String'>
    readonly mileage: FieldRef<"ServiceRecord", 'Int'>
    readonly cost: FieldRef<"ServiceRecord", 'Decimal'>
    readonly performedAt: FieldRef<"ServiceRecord", 'DateTime'>
    readonly createdAt: FieldRef<"ServiceRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ServiceRecord findUnique
   */
  export type ServiceRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRecord
     */
    select?: ServiceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRecord
     */
    omit?: ServiceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRecordInclude<ExtArgs> | null
    /**
     * Filter, which ServiceRecord to fetch.
     */
    where: ServiceRecordWhereUniqueInput
  }

  /**
   * ServiceRecord findUniqueOrThrow
   */
  export type ServiceRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRecord
     */
    select?: ServiceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRecord
     */
    omit?: ServiceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRecordInclude<ExtArgs> | null
    /**
     * Filter, which ServiceRecord to fetch.
     */
    where: ServiceRecordWhereUniqueInput
  }

  /**
   * ServiceRecord findFirst
   */
  export type ServiceRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRecord
     */
    select?: ServiceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRecord
     */
    omit?: ServiceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRecordInclude<ExtArgs> | null
    /**
     * Filter, which ServiceRecord to fetch.
     */
    where?: ServiceRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceRecords to fetch.
     */
    orderBy?: ServiceRecordOrderByWithRelationInput | ServiceRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceRecords.
     */
    cursor?: ServiceRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceRecords.
     */
    distinct?: ServiceRecordScalarFieldEnum | ServiceRecordScalarFieldEnum[]
  }

  /**
   * ServiceRecord findFirstOrThrow
   */
  export type ServiceRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRecord
     */
    select?: ServiceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRecord
     */
    omit?: ServiceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRecordInclude<ExtArgs> | null
    /**
     * Filter, which ServiceRecord to fetch.
     */
    where?: ServiceRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceRecords to fetch.
     */
    orderBy?: ServiceRecordOrderByWithRelationInput | ServiceRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceRecords.
     */
    cursor?: ServiceRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceRecords.
     */
    distinct?: ServiceRecordScalarFieldEnum | ServiceRecordScalarFieldEnum[]
  }

  /**
   * ServiceRecord findMany
   */
  export type ServiceRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRecord
     */
    select?: ServiceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRecord
     */
    omit?: ServiceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRecordInclude<ExtArgs> | null
    /**
     * Filter, which ServiceRecords to fetch.
     */
    where?: ServiceRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceRecords to fetch.
     */
    orderBy?: ServiceRecordOrderByWithRelationInput | ServiceRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServiceRecords.
     */
    cursor?: ServiceRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceRecords.
     */
    skip?: number
    distinct?: ServiceRecordScalarFieldEnum | ServiceRecordScalarFieldEnum[]
  }

  /**
   * ServiceRecord create
   */
  export type ServiceRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRecord
     */
    select?: ServiceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRecord
     */
    omit?: ServiceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a ServiceRecord.
     */
    data: XOR<ServiceRecordCreateInput, ServiceRecordUncheckedCreateInput>
  }

  /**
   * ServiceRecord createMany
   */
  export type ServiceRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServiceRecords.
     */
    data: ServiceRecordCreateManyInput | ServiceRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServiceRecord createManyAndReturn
   */
  export type ServiceRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRecord
     */
    select?: ServiceRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRecord
     */
    omit?: ServiceRecordOmit<ExtArgs> | null
    /**
     * The data used to create many ServiceRecords.
     */
    data: ServiceRecordCreateManyInput | ServiceRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServiceRecord update
   */
  export type ServiceRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRecord
     */
    select?: ServiceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRecord
     */
    omit?: ServiceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a ServiceRecord.
     */
    data: XOR<ServiceRecordUpdateInput, ServiceRecordUncheckedUpdateInput>
    /**
     * Choose, which ServiceRecord to update.
     */
    where: ServiceRecordWhereUniqueInput
  }

  /**
   * ServiceRecord updateMany
   */
  export type ServiceRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServiceRecords.
     */
    data: XOR<ServiceRecordUpdateManyMutationInput, ServiceRecordUncheckedUpdateManyInput>
    /**
     * Filter which ServiceRecords to update
     */
    where?: ServiceRecordWhereInput
    /**
     * Limit how many ServiceRecords to update.
     */
    limit?: number
  }

  /**
   * ServiceRecord updateManyAndReturn
   */
  export type ServiceRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRecord
     */
    select?: ServiceRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRecord
     */
    omit?: ServiceRecordOmit<ExtArgs> | null
    /**
     * The data used to update ServiceRecords.
     */
    data: XOR<ServiceRecordUpdateManyMutationInput, ServiceRecordUncheckedUpdateManyInput>
    /**
     * Filter which ServiceRecords to update
     */
    where?: ServiceRecordWhereInput
    /**
     * Limit how many ServiceRecords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRecordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServiceRecord upsert
   */
  export type ServiceRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRecord
     */
    select?: ServiceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRecord
     */
    omit?: ServiceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the ServiceRecord to update in case it exists.
     */
    where: ServiceRecordWhereUniqueInput
    /**
     * In case the ServiceRecord found by the `where` argument doesn't exist, create a new ServiceRecord with this data.
     */
    create: XOR<ServiceRecordCreateInput, ServiceRecordUncheckedCreateInput>
    /**
     * In case the ServiceRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceRecordUpdateInput, ServiceRecordUncheckedUpdateInput>
  }

  /**
   * ServiceRecord delete
   */
  export type ServiceRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRecord
     */
    select?: ServiceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRecord
     */
    omit?: ServiceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRecordInclude<ExtArgs> | null
    /**
     * Filter which ServiceRecord to delete.
     */
    where: ServiceRecordWhereUniqueInput
  }

  /**
   * ServiceRecord deleteMany
   */
  export type ServiceRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceRecords to delete
     */
    where?: ServiceRecordWhereInput
    /**
     * Limit how many ServiceRecords to delete.
     */
    limit?: number
  }

  /**
   * ServiceRecord.booking
   */
  export type ServiceRecord$bookingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
  }

  /**
   * ServiceRecord.owner
   */
  export type ServiceRecord$ownerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * ServiceRecord without action
   */
  export type ServiceRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRecord
     */
    select?: ServiceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRecord
     */
    omit?: ServiceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRecordInclude<ExtArgs> | null
  }


  /**
   * Model OtpCode
   */

  export type AggregateOtpCode = {
    _count: OtpCodeCountAggregateOutputType | null
    _min: OtpCodeMinAggregateOutputType | null
    _max: OtpCodeMaxAggregateOutputType | null
  }

  export type OtpCodeMinAggregateOutputType = {
    id: string | null
    phone: string | null
    code: string | null
    expiresAt: Date | null
    usedAt: Date | null
    createdAt: Date | null
  }

  export type OtpCodeMaxAggregateOutputType = {
    id: string | null
    phone: string | null
    code: string | null
    expiresAt: Date | null
    usedAt: Date | null
    createdAt: Date | null
  }

  export type OtpCodeCountAggregateOutputType = {
    id: number
    phone: number
    code: number
    expiresAt: number
    usedAt: number
    createdAt: number
    _all: number
  }


  export type OtpCodeMinAggregateInputType = {
    id?: true
    phone?: true
    code?: true
    expiresAt?: true
    usedAt?: true
    createdAt?: true
  }

  export type OtpCodeMaxAggregateInputType = {
    id?: true
    phone?: true
    code?: true
    expiresAt?: true
    usedAt?: true
    createdAt?: true
  }

  export type OtpCodeCountAggregateInputType = {
    id?: true
    phone?: true
    code?: true
    expiresAt?: true
    usedAt?: true
    createdAt?: true
    _all?: true
  }

  export type OtpCodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OtpCode to aggregate.
     */
    where?: OtpCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpCodes to fetch.
     */
    orderBy?: OtpCodeOrderByWithRelationInput | OtpCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OtpCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OtpCodes
    **/
    _count?: true | OtpCodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OtpCodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OtpCodeMaxAggregateInputType
  }

  export type GetOtpCodeAggregateType<T extends OtpCodeAggregateArgs> = {
        [P in keyof T & keyof AggregateOtpCode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOtpCode[P]>
      : GetScalarType<T[P], AggregateOtpCode[P]>
  }




  export type OtpCodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OtpCodeWhereInput
    orderBy?: OtpCodeOrderByWithAggregationInput | OtpCodeOrderByWithAggregationInput[]
    by: OtpCodeScalarFieldEnum[] | OtpCodeScalarFieldEnum
    having?: OtpCodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OtpCodeCountAggregateInputType | true
    _min?: OtpCodeMinAggregateInputType
    _max?: OtpCodeMaxAggregateInputType
  }

  export type OtpCodeGroupByOutputType = {
    id: string
    phone: string
    code: string
    expiresAt: Date
    usedAt: Date | null
    createdAt: Date
    _count: OtpCodeCountAggregateOutputType | null
    _min: OtpCodeMinAggregateOutputType | null
    _max: OtpCodeMaxAggregateOutputType | null
  }

  type GetOtpCodeGroupByPayload<T extends OtpCodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OtpCodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OtpCodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OtpCodeGroupByOutputType[P]>
            : GetScalarType<T[P], OtpCodeGroupByOutputType[P]>
        }
      >
    >


  export type OtpCodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phone?: boolean
    code?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["otpCode"]>

  export type OtpCodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phone?: boolean
    code?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["otpCode"]>

  export type OtpCodeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phone?: boolean
    code?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["otpCode"]>

  export type OtpCodeSelectScalar = {
    id?: boolean
    phone?: boolean
    code?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
  }

  export type OtpCodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "phone" | "code" | "expiresAt" | "usedAt" | "createdAt", ExtArgs["result"]["otpCode"]>

  export type $OtpCodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OtpCode"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      phone: string
      code: string
      expiresAt: Date
      usedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["otpCode"]>
    composites: {}
  }

  type OtpCodeGetPayload<S extends boolean | null | undefined | OtpCodeDefaultArgs> = $Result.GetResult<Prisma.$OtpCodePayload, S>

  type OtpCodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OtpCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OtpCodeCountAggregateInputType | true
    }

  export interface OtpCodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OtpCode'], meta: { name: 'OtpCode' } }
    /**
     * Find zero or one OtpCode that matches the filter.
     * @param {OtpCodeFindUniqueArgs} args - Arguments to find a OtpCode
     * @example
     * // Get one OtpCode
     * const otpCode = await prisma.otpCode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OtpCodeFindUniqueArgs>(args: SelectSubset<T, OtpCodeFindUniqueArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OtpCode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OtpCodeFindUniqueOrThrowArgs} args - Arguments to find a OtpCode
     * @example
     * // Get one OtpCode
     * const otpCode = await prisma.otpCode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OtpCodeFindUniqueOrThrowArgs>(args: SelectSubset<T, OtpCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OtpCode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeFindFirstArgs} args - Arguments to find a OtpCode
     * @example
     * // Get one OtpCode
     * const otpCode = await prisma.otpCode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OtpCodeFindFirstArgs>(args?: SelectSubset<T, OtpCodeFindFirstArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OtpCode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeFindFirstOrThrowArgs} args - Arguments to find a OtpCode
     * @example
     * // Get one OtpCode
     * const otpCode = await prisma.otpCode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OtpCodeFindFirstOrThrowArgs>(args?: SelectSubset<T, OtpCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OtpCodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OtpCodes
     * const otpCodes = await prisma.otpCode.findMany()
     * 
     * // Get first 10 OtpCodes
     * const otpCodes = await prisma.otpCode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const otpCodeWithIdOnly = await prisma.otpCode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OtpCodeFindManyArgs>(args?: SelectSubset<T, OtpCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OtpCode.
     * @param {OtpCodeCreateArgs} args - Arguments to create a OtpCode.
     * @example
     * // Create one OtpCode
     * const OtpCode = await prisma.otpCode.create({
     *   data: {
     *     // ... data to create a OtpCode
     *   }
     * })
     * 
     */
    create<T extends OtpCodeCreateArgs>(args: SelectSubset<T, OtpCodeCreateArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OtpCodes.
     * @param {OtpCodeCreateManyArgs} args - Arguments to create many OtpCodes.
     * @example
     * // Create many OtpCodes
     * const otpCode = await prisma.otpCode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OtpCodeCreateManyArgs>(args?: SelectSubset<T, OtpCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OtpCodes and returns the data saved in the database.
     * @param {OtpCodeCreateManyAndReturnArgs} args - Arguments to create many OtpCodes.
     * @example
     * // Create many OtpCodes
     * const otpCode = await prisma.otpCode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OtpCodes and only return the `id`
     * const otpCodeWithIdOnly = await prisma.otpCode.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OtpCodeCreateManyAndReturnArgs>(args?: SelectSubset<T, OtpCodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OtpCode.
     * @param {OtpCodeDeleteArgs} args - Arguments to delete one OtpCode.
     * @example
     * // Delete one OtpCode
     * const OtpCode = await prisma.otpCode.delete({
     *   where: {
     *     // ... filter to delete one OtpCode
     *   }
     * })
     * 
     */
    delete<T extends OtpCodeDeleteArgs>(args: SelectSubset<T, OtpCodeDeleteArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OtpCode.
     * @param {OtpCodeUpdateArgs} args - Arguments to update one OtpCode.
     * @example
     * // Update one OtpCode
     * const otpCode = await prisma.otpCode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OtpCodeUpdateArgs>(args: SelectSubset<T, OtpCodeUpdateArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OtpCodes.
     * @param {OtpCodeDeleteManyArgs} args - Arguments to filter OtpCodes to delete.
     * @example
     * // Delete a few OtpCodes
     * const { count } = await prisma.otpCode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OtpCodeDeleteManyArgs>(args?: SelectSubset<T, OtpCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OtpCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OtpCodes
     * const otpCode = await prisma.otpCode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OtpCodeUpdateManyArgs>(args: SelectSubset<T, OtpCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OtpCodes and returns the data updated in the database.
     * @param {OtpCodeUpdateManyAndReturnArgs} args - Arguments to update many OtpCodes.
     * @example
     * // Update many OtpCodes
     * const otpCode = await prisma.otpCode.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OtpCodes and only return the `id`
     * const otpCodeWithIdOnly = await prisma.otpCode.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OtpCodeUpdateManyAndReturnArgs>(args: SelectSubset<T, OtpCodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OtpCode.
     * @param {OtpCodeUpsertArgs} args - Arguments to update or create a OtpCode.
     * @example
     * // Update or create a OtpCode
     * const otpCode = await prisma.otpCode.upsert({
     *   create: {
     *     // ... data to create a OtpCode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OtpCode we want to update
     *   }
     * })
     */
    upsert<T extends OtpCodeUpsertArgs>(args: SelectSubset<T, OtpCodeUpsertArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OtpCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeCountArgs} args - Arguments to filter OtpCodes to count.
     * @example
     * // Count the number of OtpCodes
     * const count = await prisma.otpCode.count({
     *   where: {
     *     // ... the filter for the OtpCodes we want to count
     *   }
     * })
    **/
    count<T extends OtpCodeCountArgs>(
      args?: Subset<T, OtpCodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OtpCodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OtpCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OtpCodeAggregateArgs>(args: Subset<T, OtpCodeAggregateArgs>): Prisma.PrismaPromise<GetOtpCodeAggregateType<T>>

    /**
     * Group by OtpCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OtpCodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OtpCodeGroupByArgs['orderBy'] }
        : { orderBy?: OtpCodeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OtpCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOtpCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OtpCode model
   */
  readonly fields: OtpCodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OtpCode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OtpCodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OtpCode model
   */
  interface OtpCodeFieldRefs {
    readonly id: FieldRef<"OtpCode", 'String'>
    readonly phone: FieldRef<"OtpCode", 'String'>
    readonly code: FieldRef<"OtpCode", 'String'>
    readonly expiresAt: FieldRef<"OtpCode", 'DateTime'>
    readonly usedAt: FieldRef<"OtpCode", 'DateTime'>
    readonly createdAt: FieldRef<"OtpCode", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OtpCode findUnique
   */
  export type OtpCodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Filter, which OtpCode to fetch.
     */
    where: OtpCodeWhereUniqueInput
  }

  /**
   * OtpCode findUniqueOrThrow
   */
  export type OtpCodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Filter, which OtpCode to fetch.
     */
    where: OtpCodeWhereUniqueInput
  }

  /**
   * OtpCode findFirst
   */
  export type OtpCodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Filter, which OtpCode to fetch.
     */
    where?: OtpCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpCodes to fetch.
     */
    orderBy?: OtpCodeOrderByWithRelationInput | OtpCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OtpCodes.
     */
    cursor?: OtpCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OtpCodes.
     */
    distinct?: OtpCodeScalarFieldEnum | OtpCodeScalarFieldEnum[]
  }

  /**
   * OtpCode findFirstOrThrow
   */
  export type OtpCodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Filter, which OtpCode to fetch.
     */
    where?: OtpCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpCodes to fetch.
     */
    orderBy?: OtpCodeOrderByWithRelationInput | OtpCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OtpCodes.
     */
    cursor?: OtpCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OtpCodes.
     */
    distinct?: OtpCodeScalarFieldEnum | OtpCodeScalarFieldEnum[]
  }

  /**
   * OtpCode findMany
   */
  export type OtpCodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Filter, which OtpCodes to fetch.
     */
    where?: OtpCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpCodes to fetch.
     */
    orderBy?: OtpCodeOrderByWithRelationInput | OtpCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OtpCodes.
     */
    cursor?: OtpCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpCodes.
     */
    skip?: number
    distinct?: OtpCodeScalarFieldEnum | OtpCodeScalarFieldEnum[]
  }

  /**
   * OtpCode create
   */
  export type OtpCodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * The data needed to create a OtpCode.
     */
    data: XOR<OtpCodeCreateInput, OtpCodeUncheckedCreateInput>
  }

  /**
   * OtpCode createMany
   */
  export type OtpCodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OtpCodes.
     */
    data: OtpCodeCreateManyInput | OtpCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OtpCode createManyAndReturn
   */
  export type OtpCodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * The data used to create many OtpCodes.
     */
    data: OtpCodeCreateManyInput | OtpCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OtpCode update
   */
  export type OtpCodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * The data needed to update a OtpCode.
     */
    data: XOR<OtpCodeUpdateInput, OtpCodeUncheckedUpdateInput>
    /**
     * Choose, which OtpCode to update.
     */
    where: OtpCodeWhereUniqueInput
  }

  /**
   * OtpCode updateMany
   */
  export type OtpCodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OtpCodes.
     */
    data: XOR<OtpCodeUpdateManyMutationInput, OtpCodeUncheckedUpdateManyInput>
    /**
     * Filter which OtpCodes to update
     */
    where?: OtpCodeWhereInput
    /**
     * Limit how many OtpCodes to update.
     */
    limit?: number
  }

  /**
   * OtpCode updateManyAndReturn
   */
  export type OtpCodeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * The data used to update OtpCodes.
     */
    data: XOR<OtpCodeUpdateManyMutationInput, OtpCodeUncheckedUpdateManyInput>
    /**
     * Filter which OtpCodes to update
     */
    where?: OtpCodeWhereInput
    /**
     * Limit how many OtpCodes to update.
     */
    limit?: number
  }

  /**
   * OtpCode upsert
   */
  export type OtpCodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * The filter to search for the OtpCode to update in case it exists.
     */
    where: OtpCodeWhereUniqueInput
    /**
     * In case the OtpCode found by the `where` argument doesn't exist, create a new OtpCode with this data.
     */
    create: XOR<OtpCodeCreateInput, OtpCodeUncheckedCreateInput>
    /**
     * In case the OtpCode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OtpCodeUpdateInput, OtpCodeUncheckedUpdateInput>
  }

  /**
   * OtpCode delete
   */
  export type OtpCodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Filter which OtpCode to delete.
     */
    where: OtpCodeWhereUniqueInput
  }

  /**
   * OtpCode deleteMany
   */
  export type OtpCodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OtpCodes to delete
     */
    where?: OtpCodeWhereInput
    /**
     * Limit how many OtpCodes to delete.
     */
    limit?: number
  }

  /**
   * OtpCode without action
   */
  export type OtpCodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    phone: 'phone',
    name: 'name',
    email: 'email',
    status: 'status',
    passwordHash: 'passwordHash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const VehicleScalarFieldEnum: {
    id: 'id',
    plate: 'plate',
    vin: 'vin',
    make: 'make',
    model: 'model',
    year: 'year',
    color: 'color',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VehicleScalarFieldEnum = (typeof VehicleScalarFieldEnum)[keyof typeof VehicleScalarFieldEnum]


  export const UserVehicleScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    vehicleId: 'vehicleId',
    isHidden: 'isHidden',
    ownedSince: 'ownedSince',
    ownedUntil: 'ownedUntil'
  };

  export type UserVehicleScalarFieldEnum = (typeof UserVehicleScalarFieldEnum)[keyof typeof UserVehicleScalarFieldEnum]


  export const BookingScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    vehicleId: 'vehicleId',
    serviceType: 'serviceType',
    status: 'status',
    scheduledAt: 'scheduledAt',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BookingScalarFieldEnum = (typeof BookingScalarFieldEnum)[keyof typeof BookingScalarFieldEnum]


  export const ServiceRecordScalarFieldEnum: {
    id: 'id',
    vehicleId: 'vehicleId',
    bookingId: 'bookingId',
    ownerUserId: 'ownerUserId',
    ownerType: 'ownerType',
    serviceType: 'serviceType',
    description: 'description',
    mileage: 'mileage',
    cost: 'cost',
    performedAt: 'performedAt',
    createdAt: 'createdAt'
  };

  export type ServiceRecordScalarFieldEnum = (typeof ServiceRecordScalarFieldEnum)[keyof typeof ServiceRecordScalarFieldEnum]


  export const OtpCodeScalarFieldEnum: {
    id: 'id',
    phone: 'phone',
    code: 'code',
    expiresAt: 'expiresAt',
    usedAt: 'usedAt',
    createdAt: 'createdAt'
  };

  export type OtpCodeScalarFieldEnum = (typeof OtpCodeScalarFieldEnum)[keyof typeof OtpCodeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserStatus'
   */
  export type EnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus'>
    


  /**
   * Reference to a field of type 'UserStatus[]'
   */
  export type ListEnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'ServiceType'
   */
  export type EnumServiceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceType'>
    


  /**
   * Reference to a field of type 'ServiceType[]'
   */
  export type ListEnumServiceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceType[]'>
    


  /**
   * Reference to a field of type 'BookingStatus'
   */
  export type EnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus'>
    


  /**
   * Reference to a field of type 'BookingStatus[]'
   */
  export type ListEnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus[]'>
    


  /**
   * Reference to a field of type 'OwnerType'
   */
  export type EnumOwnerTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OwnerType'>
    


  /**
   * Reference to a field of type 'OwnerType[]'
   */
  export type ListEnumOwnerTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OwnerType[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    phone?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    status?: EnumUserStatusFilter<"User"> | $Enums.UserStatus
    passwordHash?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    vehicles?: UserVehicleListRelationFilter
    bookings?: BookingListRelationFilter
    serviceRecords?: ServiceRecordListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    phone?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    status?: SortOrder
    passwordHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    vehicles?: UserVehicleOrderByRelationAggregateInput
    bookings?: BookingOrderByRelationAggregateInput
    serviceRecords?: ServiceRecordOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    phone?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    status?: EnumUserStatusFilter<"User"> | $Enums.UserStatus
    passwordHash?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    vehicles?: UserVehicleListRelationFilter
    bookings?: BookingListRelationFilter
    serviceRecords?: ServiceRecordListRelationFilter
  }, "id" | "phone" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    phone?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    status?: SortOrder
    passwordHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    phone?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    status?: EnumUserStatusWithAggregatesFilter<"User"> | $Enums.UserStatus
    passwordHash?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type VehicleWhereInput = {
    AND?: VehicleWhereInput | VehicleWhereInput[]
    OR?: VehicleWhereInput[]
    NOT?: VehicleWhereInput | VehicleWhereInput[]
    id?: StringFilter<"Vehicle"> | string
    plate?: StringNullableFilter<"Vehicle"> | string | null
    vin?: StringNullableFilter<"Vehicle"> | string | null
    make?: StringNullableFilter<"Vehicle"> | string | null
    model?: StringNullableFilter<"Vehicle"> | string | null
    year?: IntNullableFilter<"Vehicle"> | number | null
    color?: StringNullableFilter<"Vehicle"> | string | null
    createdAt?: DateTimeFilter<"Vehicle"> | Date | string
    updatedAt?: DateTimeFilter<"Vehicle"> | Date | string
    owners?: UserVehicleListRelationFilter
    bookings?: BookingListRelationFilter
    serviceRecords?: ServiceRecordListRelationFilter
  }

  export type VehicleOrderByWithRelationInput = {
    id?: SortOrder
    plate?: SortOrderInput | SortOrder
    vin?: SortOrderInput | SortOrder
    make?: SortOrderInput | SortOrder
    model?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    owners?: UserVehicleOrderByRelationAggregateInput
    bookings?: BookingOrderByRelationAggregateInput
    serviceRecords?: ServiceRecordOrderByRelationAggregateInput
  }

  export type VehicleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    vin?: string
    AND?: VehicleWhereInput | VehicleWhereInput[]
    OR?: VehicleWhereInput[]
    NOT?: VehicleWhereInput | VehicleWhereInput[]
    plate?: StringNullableFilter<"Vehicle"> | string | null
    make?: StringNullableFilter<"Vehicle"> | string | null
    model?: StringNullableFilter<"Vehicle"> | string | null
    year?: IntNullableFilter<"Vehicle"> | number | null
    color?: StringNullableFilter<"Vehicle"> | string | null
    createdAt?: DateTimeFilter<"Vehicle"> | Date | string
    updatedAt?: DateTimeFilter<"Vehicle"> | Date | string
    owners?: UserVehicleListRelationFilter
    bookings?: BookingListRelationFilter
    serviceRecords?: ServiceRecordListRelationFilter
  }, "id" | "vin">

  export type VehicleOrderByWithAggregationInput = {
    id?: SortOrder
    plate?: SortOrderInput | SortOrder
    vin?: SortOrderInput | SortOrder
    make?: SortOrderInput | SortOrder
    model?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VehicleCountOrderByAggregateInput
    _avg?: VehicleAvgOrderByAggregateInput
    _max?: VehicleMaxOrderByAggregateInput
    _min?: VehicleMinOrderByAggregateInput
    _sum?: VehicleSumOrderByAggregateInput
  }

  export type VehicleScalarWhereWithAggregatesInput = {
    AND?: VehicleScalarWhereWithAggregatesInput | VehicleScalarWhereWithAggregatesInput[]
    OR?: VehicleScalarWhereWithAggregatesInput[]
    NOT?: VehicleScalarWhereWithAggregatesInput | VehicleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Vehicle"> | string
    plate?: StringNullableWithAggregatesFilter<"Vehicle"> | string | null
    vin?: StringNullableWithAggregatesFilter<"Vehicle"> | string | null
    make?: StringNullableWithAggregatesFilter<"Vehicle"> | string | null
    model?: StringNullableWithAggregatesFilter<"Vehicle"> | string | null
    year?: IntNullableWithAggregatesFilter<"Vehicle"> | number | null
    color?: StringNullableWithAggregatesFilter<"Vehicle"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Vehicle"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Vehicle"> | Date | string
  }

  export type UserVehicleWhereInput = {
    AND?: UserVehicleWhereInput | UserVehicleWhereInput[]
    OR?: UserVehicleWhereInput[]
    NOT?: UserVehicleWhereInput | UserVehicleWhereInput[]
    id?: StringFilter<"UserVehicle"> | string
    userId?: StringFilter<"UserVehicle"> | string
    vehicleId?: StringFilter<"UserVehicle"> | string
    isHidden?: BoolFilter<"UserVehicle"> | boolean
    ownedSince?: DateTimeFilter<"UserVehicle"> | Date | string
    ownedUntil?: DateTimeNullableFilter<"UserVehicle"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
  }

  export type UserVehicleOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    vehicleId?: SortOrder
    isHidden?: SortOrder
    ownedSince?: SortOrder
    ownedUntil?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    vehicle?: VehicleOrderByWithRelationInput
  }

  export type UserVehicleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_vehicleId?: UserVehicleUserIdVehicleIdCompoundUniqueInput
    AND?: UserVehicleWhereInput | UserVehicleWhereInput[]
    OR?: UserVehicleWhereInput[]
    NOT?: UserVehicleWhereInput | UserVehicleWhereInput[]
    userId?: StringFilter<"UserVehicle"> | string
    vehicleId?: StringFilter<"UserVehicle"> | string
    isHidden?: BoolFilter<"UserVehicle"> | boolean
    ownedSince?: DateTimeFilter<"UserVehicle"> | Date | string
    ownedUntil?: DateTimeNullableFilter<"UserVehicle"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
  }, "id" | "userId_vehicleId">

  export type UserVehicleOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    vehicleId?: SortOrder
    isHidden?: SortOrder
    ownedSince?: SortOrder
    ownedUntil?: SortOrderInput | SortOrder
    _count?: UserVehicleCountOrderByAggregateInput
    _max?: UserVehicleMaxOrderByAggregateInput
    _min?: UserVehicleMinOrderByAggregateInput
  }

  export type UserVehicleScalarWhereWithAggregatesInput = {
    AND?: UserVehicleScalarWhereWithAggregatesInput | UserVehicleScalarWhereWithAggregatesInput[]
    OR?: UserVehicleScalarWhereWithAggregatesInput[]
    NOT?: UserVehicleScalarWhereWithAggregatesInput | UserVehicleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserVehicle"> | string
    userId?: StringWithAggregatesFilter<"UserVehicle"> | string
    vehicleId?: StringWithAggregatesFilter<"UserVehicle"> | string
    isHidden?: BoolWithAggregatesFilter<"UserVehicle"> | boolean
    ownedSince?: DateTimeWithAggregatesFilter<"UserVehicle"> | Date | string
    ownedUntil?: DateTimeNullableWithAggregatesFilter<"UserVehicle"> | Date | string | null
  }

  export type BookingWhereInput = {
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    id?: StringFilter<"Booking"> | string
    userId?: StringFilter<"Booking"> | string
    vehicleId?: StringFilter<"Booking"> | string
    serviceType?: EnumServiceTypeFilter<"Booking"> | $Enums.ServiceType
    status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    scheduledAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    notes?: StringNullableFilter<"Booking"> | string | null
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
    serviceRecords?: ServiceRecordListRelationFilter
  }

  export type BookingOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    vehicleId?: SortOrder
    serviceType?: SortOrder
    status?: SortOrder
    scheduledAt?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    vehicle?: VehicleOrderByWithRelationInput
    serviceRecords?: ServiceRecordOrderByRelationAggregateInput
  }

  export type BookingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    userId?: StringFilter<"Booking"> | string
    vehicleId?: StringFilter<"Booking"> | string
    serviceType?: EnumServiceTypeFilter<"Booking"> | $Enums.ServiceType
    status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    scheduledAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    notes?: StringNullableFilter<"Booking"> | string | null
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
    serviceRecords?: ServiceRecordListRelationFilter
  }, "id">

  export type BookingOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    vehicleId?: SortOrder
    serviceType?: SortOrder
    status?: SortOrder
    scheduledAt?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BookingCountOrderByAggregateInput
    _max?: BookingMaxOrderByAggregateInput
    _min?: BookingMinOrderByAggregateInput
  }

  export type BookingScalarWhereWithAggregatesInput = {
    AND?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    OR?: BookingScalarWhereWithAggregatesInput[]
    NOT?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Booking"> | string
    userId?: StringWithAggregatesFilter<"Booking"> | string
    vehicleId?: StringWithAggregatesFilter<"Booking"> | string
    serviceType?: EnumServiceTypeWithAggregatesFilter<"Booking"> | $Enums.ServiceType
    status?: EnumBookingStatusWithAggregatesFilter<"Booking"> | $Enums.BookingStatus
    scheduledAt?: DateTimeNullableWithAggregatesFilter<"Booking"> | Date | string | null
    notes?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
  }

  export type ServiceRecordWhereInput = {
    AND?: ServiceRecordWhereInput | ServiceRecordWhereInput[]
    OR?: ServiceRecordWhereInput[]
    NOT?: ServiceRecordWhereInput | ServiceRecordWhereInput[]
    id?: StringFilter<"ServiceRecord"> | string
    vehicleId?: StringFilter<"ServiceRecord"> | string
    bookingId?: StringNullableFilter<"ServiceRecord"> | string | null
    ownerUserId?: StringNullableFilter<"ServiceRecord"> | string | null
    ownerType?: EnumOwnerTypeFilter<"ServiceRecord"> | $Enums.OwnerType
    serviceType?: StringFilter<"ServiceRecord"> | string
    description?: StringFilter<"ServiceRecord"> | string
    mileage?: IntNullableFilter<"ServiceRecord"> | number | null
    cost?: DecimalNullableFilter<"ServiceRecord"> | Decimal | DecimalJsLike | number | string | null
    performedAt?: DateTimeFilter<"ServiceRecord"> | Date | string
    createdAt?: DateTimeFilter<"ServiceRecord"> | Date | string
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
    booking?: XOR<BookingNullableScalarRelationFilter, BookingWhereInput> | null
    owner?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type ServiceRecordOrderByWithRelationInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    bookingId?: SortOrderInput | SortOrder
    ownerUserId?: SortOrderInput | SortOrder
    ownerType?: SortOrder
    serviceType?: SortOrder
    description?: SortOrder
    mileage?: SortOrderInput | SortOrder
    cost?: SortOrderInput | SortOrder
    performedAt?: SortOrder
    createdAt?: SortOrder
    vehicle?: VehicleOrderByWithRelationInput
    booking?: BookingOrderByWithRelationInput
    owner?: UserOrderByWithRelationInput
  }

  export type ServiceRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ServiceRecordWhereInput | ServiceRecordWhereInput[]
    OR?: ServiceRecordWhereInput[]
    NOT?: ServiceRecordWhereInput | ServiceRecordWhereInput[]
    vehicleId?: StringFilter<"ServiceRecord"> | string
    bookingId?: StringNullableFilter<"ServiceRecord"> | string | null
    ownerUserId?: StringNullableFilter<"ServiceRecord"> | string | null
    ownerType?: EnumOwnerTypeFilter<"ServiceRecord"> | $Enums.OwnerType
    serviceType?: StringFilter<"ServiceRecord"> | string
    description?: StringFilter<"ServiceRecord"> | string
    mileage?: IntNullableFilter<"ServiceRecord"> | number | null
    cost?: DecimalNullableFilter<"ServiceRecord"> | Decimal | DecimalJsLike | number | string | null
    performedAt?: DateTimeFilter<"ServiceRecord"> | Date | string
    createdAt?: DateTimeFilter<"ServiceRecord"> | Date | string
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
    booking?: XOR<BookingNullableScalarRelationFilter, BookingWhereInput> | null
    owner?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type ServiceRecordOrderByWithAggregationInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    bookingId?: SortOrderInput | SortOrder
    ownerUserId?: SortOrderInput | SortOrder
    ownerType?: SortOrder
    serviceType?: SortOrder
    description?: SortOrder
    mileage?: SortOrderInput | SortOrder
    cost?: SortOrderInput | SortOrder
    performedAt?: SortOrder
    createdAt?: SortOrder
    _count?: ServiceRecordCountOrderByAggregateInput
    _avg?: ServiceRecordAvgOrderByAggregateInput
    _max?: ServiceRecordMaxOrderByAggregateInput
    _min?: ServiceRecordMinOrderByAggregateInput
    _sum?: ServiceRecordSumOrderByAggregateInput
  }

  export type ServiceRecordScalarWhereWithAggregatesInput = {
    AND?: ServiceRecordScalarWhereWithAggregatesInput | ServiceRecordScalarWhereWithAggregatesInput[]
    OR?: ServiceRecordScalarWhereWithAggregatesInput[]
    NOT?: ServiceRecordScalarWhereWithAggregatesInput | ServiceRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ServiceRecord"> | string
    vehicleId?: StringWithAggregatesFilter<"ServiceRecord"> | string
    bookingId?: StringNullableWithAggregatesFilter<"ServiceRecord"> | string | null
    ownerUserId?: StringNullableWithAggregatesFilter<"ServiceRecord"> | string | null
    ownerType?: EnumOwnerTypeWithAggregatesFilter<"ServiceRecord"> | $Enums.OwnerType
    serviceType?: StringWithAggregatesFilter<"ServiceRecord"> | string
    description?: StringWithAggregatesFilter<"ServiceRecord"> | string
    mileage?: IntNullableWithAggregatesFilter<"ServiceRecord"> | number | null
    cost?: DecimalNullableWithAggregatesFilter<"ServiceRecord"> | Decimal | DecimalJsLike | number | string | null
    performedAt?: DateTimeWithAggregatesFilter<"ServiceRecord"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"ServiceRecord"> | Date | string
  }

  export type OtpCodeWhereInput = {
    AND?: OtpCodeWhereInput | OtpCodeWhereInput[]
    OR?: OtpCodeWhereInput[]
    NOT?: OtpCodeWhereInput | OtpCodeWhereInput[]
    id?: StringFilter<"OtpCode"> | string
    phone?: StringFilter<"OtpCode"> | string
    code?: StringFilter<"OtpCode"> | string
    expiresAt?: DateTimeFilter<"OtpCode"> | Date | string
    usedAt?: DateTimeNullableFilter<"OtpCode"> | Date | string | null
    createdAt?: DateTimeFilter<"OtpCode"> | Date | string
  }

  export type OtpCodeOrderByWithRelationInput = {
    id?: SortOrder
    phone?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type OtpCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OtpCodeWhereInput | OtpCodeWhereInput[]
    OR?: OtpCodeWhereInput[]
    NOT?: OtpCodeWhereInput | OtpCodeWhereInput[]
    phone?: StringFilter<"OtpCode"> | string
    code?: StringFilter<"OtpCode"> | string
    expiresAt?: DateTimeFilter<"OtpCode"> | Date | string
    usedAt?: DateTimeNullableFilter<"OtpCode"> | Date | string | null
    createdAt?: DateTimeFilter<"OtpCode"> | Date | string
  }, "id">

  export type OtpCodeOrderByWithAggregationInput = {
    id?: SortOrder
    phone?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: OtpCodeCountOrderByAggregateInput
    _max?: OtpCodeMaxOrderByAggregateInput
    _min?: OtpCodeMinOrderByAggregateInput
  }

  export type OtpCodeScalarWhereWithAggregatesInput = {
    AND?: OtpCodeScalarWhereWithAggregatesInput | OtpCodeScalarWhereWithAggregatesInput[]
    OR?: OtpCodeScalarWhereWithAggregatesInput[]
    NOT?: OtpCodeScalarWhereWithAggregatesInput | OtpCodeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OtpCode"> | string
    phone?: StringWithAggregatesFilter<"OtpCode"> | string
    code?: StringWithAggregatesFilter<"OtpCode"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"OtpCode"> | Date | string
    usedAt?: DateTimeNullableWithAggregatesFilter<"OtpCode"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"OtpCode"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    phone: string
    name?: string | null
    email?: string | null
    status?: $Enums.UserStatus
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vehicles?: UserVehicleCreateNestedManyWithoutUserInput
    bookings?: BookingCreateNestedManyWithoutUserInput
    serviceRecords?: ServiceRecordCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    phone: string
    name?: string | null
    email?: string | null
    status?: $Enums.UserStatus
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vehicles?: UserVehicleUncheckedCreateNestedManyWithoutUserInput
    bookings?: BookingUncheckedCreateNestedManyWithoutUserInput
    serviceRecords?: ServiceRecordUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicles?: UserVehicleUpdateManyWithoutUserNestedInput
    bookings?: BookingUpdateManyWithoutUserNestedInput
    serviceRecords?: ServiceRecordUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicles?: UserVehicleUncheckedUpdateManyWithoutUserNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutUserNestedInput
    serviceRecords?: ServiceRecordUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    phone: string
    name?: string | null
    email?: string | null
    status?: $Enums.UserStatus
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleCreateInput = {
    id?: string
    plate?: string | null
    vin?: string | null
    make?: string | null
    model?: string | null
    year?: number | null
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owners?: UserVehicleCreateNestedManyWithoutVehicleInput
    bookings?: BookingCreateNestedManyWithoutVehicleInput
    serviceRecords?: ServiceRecordCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateInput = {
    id?: string
    plate?: string | null
    vin?: string | null
    make?: string | null
    model?: string | null
    year?: number | null
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owners?: UserVehicleUncheckedCreateNestedManyWithoutVehicleInput
    bookings?: BookingUncheckedCreateNestedManyWithoutVehicleInput
    serviceRecords?: ServiceRecordUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    plate?: NullableStringFieldUpdateOperationsInput | string | null
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    make?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owners?: UserVehicleUpdateManyWithoutVehicleNestedInput
    bookings?: BookingUpdateManyWithoutVehicleNestedInput
    serviceRecords?: ServiceRecordUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    plate?: NullableStringFieldUpdateOperationsInput | string | null
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    make?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owners?: UserVehicleUncheckedUpdateManyWithoutVehicleNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutVehicleNestedInput
    serviceRecords?: ServiceRecordUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleCreateManyInput = {
    id?: string
    plate?: string | null
    vin?: string | null
    make?: string | null
    model?: string | null
    year?: number | null
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VehicleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    plate?: NullableStringFieldUpdateOperationsInput | string | null
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    make?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    plate?: NullableStringFieldUpdateOperationsInput | string | null
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    make?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserVehicleCreateInput = {
    id?: string
    isHidden?: boolean
    ownedSince?: Date | string
    ownedUntil?: Date | string | null
    user: UserCreateNestedOneWithoutVehiclesInput
    vehicle: VehicleCreateNestedOneWithoutOwnersInput
  }

  export type UserVehicleUncheckedCreateInput = {
    id?: string
    userId: string
    vehicleId: string
    isHidden?: boolean
    ownedSince?: Date | string
    ownedUntil?: Date | string | null
  }

  export type UserVehicleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    ownedSince?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutVehiclesNestedInput
    vehicle?: VehicleUpdateOneRequiredWithoutOwnersNestedInput
  }

  export type UserVehicleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    ownedSince?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserVehicleCreateManyInput = {
    id?: string
    userId: string
    vehicleId: string
    isHidden?: boolean
    ownedSince?: Date | string
    ownedUntil?: Date | string | null
  }

  export type UserVehicleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    ownedSince?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserVehicleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    ownedSince?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BookingCreateInput = {
    id?: string
    serviceType: $Enums.ServiceType
    status?: $Enums.BookingStatus
    scheduledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutBookingsInput
    vehicle: VehicleCreateNestedOneWithoutBookingsInput
    serviceRecords?: ServiceRecordCreateNestedManyWithoutBookingInput
  }

  export type BookingUncheckedCreateInput = {
    id?: string
    userId: string
    vehicleId: string
    serviceType: $Enums.ServiceType
    status?: $Enums.BookingStatus
    scheduledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    serviceRecords?: ServiceRecordUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBookingsNestedInput
    vehicle?: VehicleUpdateOneRequiredWithoutBookingsNestedInput
    serviceRecords?: ServiceRecordUpdateManyWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    serviceRecords?: ServiceRecordUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type BookingCreateManyInput = {
    id?: string
    userId: string
    vehicleId: string
    serviceType: $Enums.ServiceType
    status?: $Enums.BookingStatus
    scheduledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceRecordCreateInput = {
    id?: string
    ownerType?: $Enums.OwnerType
    serviceType: string
    description: string
    mileage?: number | null
    cost?: Decimal | DecimalJsLike | number | string | null
    performedAt: Date | string
    createdAt?: Date | string
    vehicle: VehicleCreateNestedOneWithoutServiceRecordsInput
    booking?: BookingCreateNestedOneWithoutServiceRecordsInput
    owner?: UserCreateNestedOneWithoutServiceRecordsInput
  }

  export type ServiceRecordUncheckedCreateInput = {
    id?: string
    vehicleId: string
    bookingId?: string | null
    ownerUserId?: string | null
    ownerType?: $Enums.OwnerType
    serviceType: string
    description: string
    mileage?: number | null
    cost?: Decimal | DecimalJsLike | number | string | null
    performedAt: Date | string
    createdAt?: Date | string
  }

  export type ServiceRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerType?: EnumOwnerTypeFieldUpdateOperationsInput | $Enums.OwnerType
    serviceType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    mileage?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    performedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicle?: VehicleUpdateOneRequiredWithoutServiceRecordsNestedInput
    booking?: BookingUpdateOneWithoutServiceRecordsNestedInput
    owner?: UserUpdateOneWithoutServiceRecordsNestedInput
  }

  export type ServiceRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerType?: EnumOwnerTypeFieldUpdateOperationsInput | $Enums.OwnerType
    serviceType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    mileage?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    performedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceRecordCreateManyInput = {
    id?: string
    vehicleId: string
    bookingId?: string | null
    ownerUserId?: string | null
    ownerType?: $Enums.OwnerType
    serviceType: string
    description: string
    mileage?: number | null
    cost?: Decimal | DecimalJsLike | number | string | null
    performedAt: Date | string
    createdAt?: Date | string
  }

  export type ServiceRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerType?: EnumOwnerTypeFieldUpdateOperationsInput | $Enums.OwnerType
    serviceType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    mileage?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    performedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerType?: EnumOwnerTypeFieldUpdateOperationsInput | $Enums.OwnerType
    serviceType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    mileage?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    performedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpCodeCreateInput = {
    id?: string
    phone: string
    code: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type OtpCodeUncheckedCreateInput = {
    id?: string
    phone: string
    code: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type OtpCodeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpCodeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpCodeCreateManyInput = {
    id?: string
    phone: string
    code: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type OtpCodeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpCodeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserVehicleListRelationFilter = {
    every?: UserVehicleWhereInput
    some?: UserVehicleWhereInput
    none?: UserVehicleWhereInput
  }

  export type BookingListRelationFilter = {
    every?: BookingWhereInput
    some?: BookingWhereInput
    none?: BookingWhereInput
  }

  export type ServiceRecordListRelationFilter = {
    every?: ServiceRecordWhereInput
    some?: ServiceRecordWhereInput
    none?: ServiceRecordWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserVehicleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BookingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    phone?: SortOrder
    name?: SortOrder
    email?: SortOrder
    status?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    phone?: SortOrder
    name?: SortOrder
    email?: SortOrder
    status?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    phone?: SortOrder
    name?: SortOrder
    email?: SortOrder
    status?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserStatusFilter<$PrismaModel>
    _max?: NestedEnumUserStatusFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type VehicleCountOrderByAggregateInput = {
    id?: SortOrder
    plate?: SortOrder
    vin?: SortOrder
    make?: SortOrder
    model?: SortOrder
    year?: SortOrder
    color?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VehicleAvgOrderByAggregateInput = {
    year?: SortOrder
  }

  export type VehicleMaxOrderByAggregateInput = {
    id?: SortOrder
    plate?: SortOrder
    vin?: SortOrder
    make?: SortOrder
    model?: SortOrder
    year?: SortOrder
    color?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VehicleMinOrderByAggregateInput = {
    id?: SortOrder
    plate?: SortOrder
    vin?: SortOrder
    make?: SortOrder
    model?: SortOrder
    year?: SortOrder
    color?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VehicleSumOrderByAggregateInput = {
    year?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type VehicleScalarRelationFilter = {
    is?: VehicleWhereInput
    isNot?: VehicleWhereInput
  }

  export type UserVehicleUserIdVehicleIdCompoundUniqueInput = {
    userId: string
    vehicleId: string
  }

  export type UserVehicleCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    vehicleId?: SortOrder
    isHidden?: SortOrder
    ownedSince?: SortOrder
    ownedUntil?: SortOrder
  }

  export type UserVehicleMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    vehicleId?: SortOrder
    isHidden?: SortOrder
    ownedSince?: SortOrder
    ownedUntil?: SortOrder
  }

  export type UserVehicleMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    vehicleId?: SortOrder
    isHidden?: SortOrder
    ownedSince?: SortOrder
    ownedUntil?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumServiceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceType | EnumServiceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceTypeFilter<$PrismaModel> | $Enums.ServiceType
  }

  export type EnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus
  }

  export type BookingCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    vehicleId?: SortOrder
    serviceType?: SortOrder
    status?: SortOrder
    scheduledAt?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    vehicleId?: SortOrder
    serviceType?: SortOrder
    status?: SortOrder
    scheduledAt?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    vehicleId?: SortOrder
    serviceType?: SortOrder
    status?: SortOrder
    scheduledAt?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumServiceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceType | EnumServiceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceTypeWithAggregatesFilter<$PrismaModel> | $Enums.ServiceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceTypeFilter<$PrismaModel>
    _max?: NestedEnumServiceTypeFilter<$PrismaModel>
  }

  export type EnumBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingStatusFilter<$PrismaModel>
    _max?: NestedEnumBookingStatusFilter<$PrismaModel>
  }

  export type EnumOwnerTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.OwnerType | EnumOwnerTypeFieldRefInput<$PrismaModel>
    in?: $Enums.OwnerType[] | ListEnumOwnerTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OwnerType[] | ListEnumOwnerTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumOwnerTypeFilter<$PrismaModel> | $Enums.OwnerType
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type BookingNullableScalarRelationFilter = {
    is?: BookingWhereInput | null
    isNot?: BookingWhereInput | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type ServiceRecordCountOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    bookingId?: SortOrder
    ownerUserId?: SortOrder
    ownerType?: SortOrder
    serviceType?: SortOrder
    description?: SortOrder
    mileage?: SortOrder
    cost?: SortOrder
    performedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ServiceRecordAvgOrderByAggregateInput = {
    mileage?: SortOrder
    cost?: SortOrder
  }

  export type ServiceRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    bookingId?: SortOrder
    ownerUserId?: SortOrder
    ownerType?: SortOrder
    serviceType?: SortOrder
    description?: SortOrder
    mileage?: SortOrder
    cost?: SortOrder
    performedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ServiceRecordMinOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    bookingId?: SortOrder
    ownerUserId?: SortOrder
    ownerType?: SortOrder
    serviceType?: SortOrder
    description?: SortOrder
    mileage?: SortOrder
    cost?: SortOrder
    performedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ServiceRecordSumOrderByAggregateInput = {
    mileage?: SortOrder
    cost?: SortOrder
  }

  export type EnumOwnerTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OwnerType | EnumOwnerTypeFieldRefInput<$PrismaModel>
    in?: $Enums.OwnerType[] | ListEnumOwnerTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OwnerType[] | ListEnumOwnerTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumOwnerTypeWithAggregatesFilter<$PrismaModel> | $Enums.OwnerType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOwnerTypeFilter<$PrismaModel>
    _max?: NestedEnumOwnerTypeFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type OtpCodeCountOrderByAggregateInput = {
    id?: SortOrder
    phone?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type OtpCodeMaxOrderByAggregateInput = {
    id?: SortOrder
    phone?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type OtpCodeMinOrderByAggregateInput = {
    id?: SortOrder
    phone?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type UserVehicleCreateNestedManyWithoutUserInput = {
    create?: XOR<UserVehicleCreateWithoutUserInput, UserVehicleUncheckedCreateWithoutUserInput> | UserVehicleCreateWithoutUserInput[] | UserVehicleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserVehicleCreateOrConnectWithoutUserInput | UserVehicleCreateOrConnectWithoutUserInput[]
    createMany?: UserVehicleCreateManyUserInputEnvelope
    connect?: UserVehicleWhereUniqueInput | UserVehicleWhereUniqueInput[]
  }

  export type BookingCreateNestedManyWithoutUserInput = {
    create?: XOR<BookingCreateWithoutUserInput, BookingUncheckedCreateWithoutUserInput> | BookingCreateWithoutUserInput[] | BookingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutUserInput | BookingCreateOrConnectWithoutUserInput[]
    createMany?: BookingCreateManyUserInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type ServiceRecordCreateNestedManyWithoutOwnerInput = {
    create?: XOR<ServiceRecordCreateWithoutOwnerInput, ServiceRecordUncheckedCreateWithoutOwnerInput> | ServiceRecordCreateWithoutOwnerInput[] | ServiceRecordUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ServiceRecordCreateOrConnectWithoutOwnerInput | ServiceRecordCreateOrConnectWithoutOwnerInput[]
    createMany?: ServiceRecordCreateManyOwnerInputEnvelope
    connect?: ServiceRecordWhereUniqueInput | ServiceRecordWhereUniqueInput[]
  }

  export type UserVehicleUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserVehicleCreateWithoutUserInput, UserVehicleUncheckedCreateWithoutUserInput> | UserVehicleCreateWithoutUserInput[] | UserVehicleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserVehicleCreateOrConnectWithoutUserInput | UserVehicleCreateOrConnectWithoutUserInput[]
    createMany?: UserVehicleCreateManyUserInputEnvelope
    connect?: UserVehicleWhereUniqueInput | UserVehicleWhereUniqueInput[]
  }

  export type BookingUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BookingCreateWithoutUserInput, BookingUncheckedCreateWithoutUserInput> | BookingCreateWithoutUserInput[] | BookingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutUserInput | BookingCreateOrConnectWithoutUserInput[]
    createMany?: BookingCreateManyUserInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type ServiceRecordUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<ServiceRecordCreateWithoutOwnerInput, ServiceRecordUncheckedCreateWithoutOwnerInput> | ServiceRecordCreateWithoutOwnerInput[] | ServiceRecordUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ServiceRecordCreateOrConnectWithoutOwnerInput | ServiceRecordCreateOrConnectWithoutOwnerInput[]
    createMany?: ServiceRecordCreateManyOwnerInputEnvelope
    connect?: ServiceRecordWhereUniqueInput | ServiceRecordWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserStatusFieldUpdateOperationsInput = {
    set?: $Enums.UserStatus
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserVehicleUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserVehicleCreateWithoutUserInput, UserVehicleUncheckedCreateWithoutUserInput> | UserVehicleCreateWithoutUserInput[] | UserVehicleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserVehicleCreateOrConnectWithoutUserInput | UserVehicleCreateOrConnectWithoutUserInput[]
    upsert?: UserVehicleUpsertWithWhereUniqueWithoutUserInput | UserVehicleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserVehicleCreateManyUserInputEnvelope
    set?: UserVehicleWhereUniqueInput | UserVehicleWhereUniqueInput[]
    disconnect?: UserVehicleWhereUniqueInput | UserVehicleWhereUniqueInput[]
    delete?: UserVehicleWhereUniqueInput | UserVehicleWhereUniqueInput[]
    connect?: UserVehicleWhereUniqueInput | UserVehicleWhereUniqueInput[]
    update?: UserVehicleUpdateWithWhereUniqueWithoutUserInput | UserVehicleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserVehicleUpdateManyWithWhereWithoutUserInput | UserVehicleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserVehicleScalarWhereInput | UserVehicleScalarWhereInput[]
  }

  export type BookingUpdateManyWithoutUserNestedInput = {
    create?: XOR<BookingCreateWithoutUserInput, BookingUncheckedCreateWithoutUserInput> | BookingCreateWithoutUserInput[] | BookingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutUserInput | BookingCreateOrConnectWithoutUserInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutUserInput | BookingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BookingCreateManyUserInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutUserInput | BookingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutUserInput | BookingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type ServiceRecordUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<ServiceRecordCreateWithoutOwnerInput, ServiceRecordUncheckedCreateWithoutOwnerInput> | ServiceRecordCreateWithoutOwnerInput[] | ServiceRecordUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ServiceRecordCreateOrConnectWithoutOwnerInput | ServiceRecordCreateOrConnectWithoutOwnerInput[]
    upsert?: ServiceRecordUpsertWithWhereUniqueWithoutOwnerInput | ServiceRecordUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: ServiceRecordCreateManyOwnerInputEnvelope
    set?: ServiceRecordWhereUniqueInput | ServiceRecordWhereUniqueInput[]
    disconnect?: ServiceRecordWhereUniqueInput | ServiceRecordWhereUniqueInput[]
    delete?: ServiceRecordWhereUniqueInput | ServiceRecordWhereUniqueInput[]
    connect?: ServiceRecordWhereUniqueInput | ServiceRecordWhereUniqueInput[]
    update?: ServiceRecordUpdateWithWhereUniqueWithoutOwnerInput | ServiceRecordUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: ServiceRecordUpdateManyWithWhereWithoutOwnerInput | ServiceRecordUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: ServiceRecordScalarWhereInput | ServiceRecordScalarWhereInput[]
  }

  export type UserVehicleUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserVehicleCreateWithoutUserInput, UserVehicleUncheckedCreateWithoutUserInput> | UserVehicleCreateWithoutUserInput[] | UserVehicleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserVehicleCreateOrConnectWithoutUserInput | UserVehicleCreateOrConnectWithoutUserInput[]
    upsert?: UserVehicleUpsertWithWhereUniqueWithoutUserInput | UserVehicleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserVehicleCreateManyUserInputEnvelope
    set?: UserVehicleWhereUniqueInput | UserVehicleWhereUniqueInput[]
    disconnect?: UserVehicleWhereUniqueInput | UserVehicleWhereUniqueInput[]
    delete?: UserVehicleWhereUniqueInput | UserVehicleWhereUniqueInput[]
    connect?: UserVehicleWhereUniqueInput | UserVehicleWhereUniqueInput[]
    update?: UserVehicleUpdateWithWhereUniqueWithoutUserInput | UserVehicleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserVehicleUpdateManyWithWhereWithoutUserInput | UserVehicleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserVehicleScalarWhereInput | UserVehicleScalarWhereInput[]
  }

  export type BookingUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BookingCreateWithoutUserInput, BookingUncheckedCreateWithoutUserInput> | BookingCreateWithoutUserInput[] | BookingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutUserInput | BookingCreateOrConnectWithoutUserInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutUserInput | BookingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BookingCreateManyUserInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutUserInput | BookingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutUserInput | BookingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type ServiceRecordUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<ServiceRecordCreateWithoutOwnerInput, ServiceRecordUncheckedCreateWithoutOwnerInput> | ServiceRecordCreateWithoutOwnerInput[] | ServiceRecordUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ServiceRecordCreateOrConnectWithoutOwnerInput | ServiceRecordCreateOrConnectWithoutOwnerInput[]
    upsert?: ServiceRecordUpsertWithWhereUniqueWithoutOwnerInput | ServiceRecordUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: ServiceRecordCreateManyOwnerInputEnvelope
    set?: ServiceRecordWhereUniqueInput | ServiceRecordWhereUniqueInput[]
    disconnect?: ServiceRecordWhereUniqueInput | ServiceRecordWhereUniqueInput[]
    delete?: ServiceRecordWhereUniqueInput | ServiceRecordWhereUniqueInput[]
    connect?: ServiceRecordWhereUniqueInput | ServiceRecordWhereUniqueInput[]
    update?: ServiceRecordUpdateWithWhereUniqueWithoutOwnerInput | ServiceRecordUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: ServiceRecordUpdateManyWithWhereWithoutOwnerInput | ServiceRecordUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: ServiceRecordScalarWhereInput | ServiceRecordScalarWhereInput[]
  }

  export type UserVehicleCreateNestedManyWithoutVehicleInput = {
    create?: XOR<UserVehicleCreateWithoutVehicleInput, UserVehicleUncheckedCreateWithoutVehicleInput> | UserVehicleCreateWithoutVehicleInput[] | UserVehicleUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: UserVehicleCreateOrConnectWithoutVehicleInput | UserVehicleCreateOrConnectWithoutVehicleInput[]
    createMany?: UserVehicleCreateManyVehicleInputEnvelope
    connect?: UserVehicleWhereUniqueInput | UserVehicleWhereUniqueInput[]
  }

  export type BookingCreateNestedManyWithoutVehicleInput = {
    create?: XOR<BookingCreateWithoutVehicleInput, BookingUncheckedCreateWithoutVehicleInput> | BookingCreateWithoutVehicleInput[] | BookingUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutVehicleInput | BookingCreateOrConnectWithoutVehicleInput[]
    createMany?: BookingCreateManyVehicleInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type ServiceRecordCreateNestedManyWithoutVehicleInput = {
    create?: XOR<ServiceRecordCreateWithoutVehicleInput, ServiceRecordUncheckedCreateWithoutVehicleInput> | ServiceRecordCreateWithoutVehicleInput[] | ServiceRecordUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: ServiceRecordCreateOrConnectWithoutVehicleInput | ServiceRecordCreateOrConnectWithoutVehicleInput[]
    createMany?: ServiceRecordCreateManyVehicleInputEnvelope
    connect?: ServiceRecordWhereUniqueInput | ServiceRecordWhereUniqueInput[]
  }

  export type UserVehicleUncheckedCreateNestedManyWithoutVehicleInput = {
    create?: XOR<UserVehicleCreateWithoutVehicleInput, UserVehicleUncheckedCreateWithoutVehicleInput> | UserVehicleCreateWithoutVehicleInput[] | UserVehicleUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: UserVehicleCreateOrConnectWithoutVehicleInput | UserVehicleCreateOrConnectWithoutVehicleInput[]
    createMany?: UserVehicleCreateManyVehicleInputEnvelope
    connect?: UserVehicleWhereUniqueInput | UserVehicleWhereUniqueInput[]
  }

  export type BookingUncheckedCreateNestedManyWithoutVehicleInput = {
    create?: XOR<BookingCreateWithoutVehicleInput, BookingUncheckedCreateWithoutVehicleInput> | BookingCreateWithoutVehicleInput[] | BookingUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutVehicleInput | BookingCreateOrConnectWithoutVehicleInput[]
    createMany?: BookingCreateManyVehicleInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type ServiceRecordUncheckedCreateNestedManyWithoutVehicleInput = {
    create?: XOR<ServiceRecordCreateWithoutVehicleInput, ServiceRecordUncheckedCreateWithoutVehicleInput> | ServiceRecordCreateWithoutVehicleInput[] | ServiceRecordUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: ServiceRecordCreateOrConnectWithoutVehicleInput | ServiceRecordCreateOrConnectWithoutVehicleInput[]
    createMany?: ServiceRecordCreateManyVehicleInputEnvelope
    connect?: ServiceRecordWhereUniqueInput | ServiceRecordWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserVehicleUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<UserVehicleCreateWithoutVehicleInput, UserVehicleUncheckedCreateWithoutVehicleInput> | UserVehicleCreateWithoutVehicleInput[] | UserVehicleUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: UserVehicleCreateOrConnectWithoutVehicleInput | UserVehicleCreateOrConnectWithoutVehicleInput[]
    upsert?: UserVehicleUpsertWithWhereUniqueWithoutVehicleInput | UserVehicleUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: UserVehicleCreateManyVehicleInputEnvelope
    set?: UserVehicleWhereUniqueInput | UserVehicleWhereUniqueInput[]
    disconnect?: UserVehicleWhereUniqueInput | UserVehicleWhereUniqueInput[]
    delete?: UserVehicleWhereUniqueInput | UserVehicleWhereUniqueInput[]
    connect?: UserVehicleWhereUniqueInput | UserVehicleWhereUniqueInput[]
    update?: UserVehicleUpdateWithWhereUniqueWithoutVehicleInput | UserVehicleUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: UserVehicleUpdateManyWithWhereWithoutVehicleInput | UserVehicleUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: UserVehicleScalarWhereInput | UserVehicleScalarWhereInput[]
  }

  export type BookingUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<BookingCreateWithoutVehicleInput, BookingUncheckedCreateWithoutVehicleInput> | BookingCreateWithoutVehicleInput[] | BookingUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutVehicleInput | BookingCreateOrConnectWithoutVehicleInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutVehicleInput | BookingUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: BookingCreateManyVehicleInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutVehicleInput | BookingUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutVehicleInput | BookingUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type ServiceRecordUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<ServiceRecordCreateWithoutVehicleInput, ServiceRecordUncheckedCreateWithoutVehicleInput> | ServiceRecordCreateWithoutVehicleInput[] | ServiceRecordUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: ServiceRecordCreateOrConnectWithoutVehicleInput | ServiceRecordCreateOrConnectWithoutVehicleInput[]
    upsert?: ServiceRecordUpsertWithWhereUniqueWithoutVehicleInput | ServiceRecordUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: ServiceRecordCreateManyVehicleInputEnvelope
    set?: ServiceRecordWhereUniqueInput | ServiceRecordWhereUniqueInput[]
    disconnect?: ServiceRecordWhereUniqueInput | ServiceRecordWhereUniqueInput[]
    delete?: ServiceRecordWhereUniqueInput | ServiceRecordWhereUniqueInput[]
    connect?: ServiceRecordWhereUniqueInput | ServiceRecordWhereUniqueInput[]
    update?: ServiceRecordUpdateWithWhereUniqueWithoutVehicleInput | ServiceRecordUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: ServiceRecordUpdateManyWithWhereWithoutVehicleInput | ServiceRecordUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: ServiceRecordScalarWhereInput | ServiceRecordScalarWhereInput[]
  }

  export type UserVehicleUncheckedUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<UserVehicleCreateWithoutVehicleInput, UserVehicleUncheckedCreateWithoutVehicleInput> | UserVehicleCreateWithoutVehicleInput[] | UserVehicleUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: UserVehicleCreateOrConnectWithoutVehicleInput | UserVehicleCreateOrConnectWithoutVehicleInput[]
    upsert?: UserVehicleUpsertWithWhereUniqueWithoutVehicleInput | UserVehicleUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: UserVehicleCreateManyVehicleInputEnvelope
    set?: UserVehicleWhereUniqueInput | UserVehicleWhereUniqueInput[]
    disconnect?: UserVehicleWhereUniqueInput | UserVehicleWhereUniqueInput[]
    delete?: UserVehicleWhereUniqueInput | UserVehicleWhereUniqueInput[]
    connect?: UserVehicleWhereUniqueInput | UserVehicleWhereUniqueInput[]
    update?: UserVehicleUpdateWithWhereUniqueWithoutVehicleInput | UserVehicleUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: UserVehicleUpdateManyWithWhereWithoutVehicleInput | UserVehicleUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: UserVehicleScalarWhereInput | UserVehicleScalarWhereInput[]
  }

  export type BookingUncheckedUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<BookingCreateWithoutVehicleInput, BookingUncheckedCreateWithoutVehicleInput> | BookingCreateWithoutVehicleInput[] | BookingUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutVehicleInput | BookingCreateOrConnectWithoutVehicleInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutVehicleInput | BookingUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: BookingCreateManyVehicleInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutVehicleInput | BookingUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutVehicleInput | BookingUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type ServiceRecordUncheckedUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<ServiceRecordCreateWithoutVehicleInput, ServiceRecordUncheckedCreateWithoutVehicleInput> | ServiceRecordCreateWithoutVehicleInput[] | ServiceRecordUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: ServiceRecordCreateOrConnectWithoutVehicleInput | ServiceRecordCreateOrConnectWithoutVehicleInput[]
    upsert?: ServiceRecordUpsertWithWhereUniqueWithoutVehicleInput | ServiceRecordUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: ServiceRecordCreateManyVehicleInputEnvelope
    set?: ServiceRecordWhereUniqueInput | ServiceRecordWhereUniqueInput[]
    disconnect?: ServiceRecordWhereUniqueInput | ServiceRecordWhereUniqueInput[]
    delete?: ServiceRecordWhereUniqueInput | ServiceRecordWhereUniqueInput[]
    connect?: ServiceRecordWhereUniqueInput | ServiceRecordWhereUniqueInput[]
    update?: ServiceRecordUpdateWithWhereUniqueWithoutVehicleInput | ServiceRecordUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: ServiceRecordUpdateManyWithWhereWithoutVehicleInput | ServiceRecordUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: ServiceRecordScalarWhereInput | ServiceRecordScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutVehiclesInput = {
    create?: XOR<UserCreateWithoutVehiclesInput, UserUncheckedCreateWithoutVehiclesInput>
    connectOrCreate?: UserCreateOrConnectWithoutVehiclesInput
    connect?: UserWhereUniqueInput
  }

  export type VehicleCreateNestedOneWithoutOwnersInput = {
    create?: XOR<VehicleCreateWithoutOwnersInput, VehicleUncheckedCreateWithoutOwnersInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutOwnersInput
    connect?: VehicleWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutVehiclesNestedInput = {
    create?: XOR<UserCreateWithoutVehiclesInput, UserUncheckedCreateWithoutVehiclesInput>
    connectOrCreate?: UserCreateOrConnectWithoutVehiclesInput
    upsert?: UserUpsertWithoutVehiclesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutVehiclesInput, UserUpdateWithoutVehiclesInput>, UserUncheckedUpdateWithoutVehiclesInput>
  }

  export type VehicleUpdateOneRequiredWithoutOwnersNestedInput = {
    create?: XOR<VehicleCreateWithoutOwnersInput, VehicleUncheckedCreateWithoutOwnersInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutOwnersInput
    upsert?: VehicleUpsertWithoutOwnersInput
    connect?: VehicleWhereUniqueInput
    update?: XOR<XOR<VehicleUpdateToOneWithWhereWithoutOwnersInput, VehicleUpdateWithoutOwnersInput>, VehicleUncheckedUpdateWithoutOwnersInput>
  }

  export type UserCreateNestedOneWithoutBookingsInput = {
    create?: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookingsInput
    connect?: UserWhereUniqueInput
  }

  export type VehicleCreateNestedOneWithoutBookingsInput = {
    create?: XOR<VehicleCreateWithoutBookingsInput, VehicleUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutBookingsInput
    connect?: VehicleWhereUniqueInput
  }

  export type ServiceRecordCreateNestedManyWithoutBookingInput = {
    create?: XOR<ServiceRecordCreateWithoutBookingInput, ServiceRecordUncheckedCreateWithoutBookingInput> | ServiceRecordCreateWithoutBookingInput[] | ServiceRecordUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: ServiceRecordCreateOrConnectWithoutBookingInput | ServiceRecordCreateOrConnectWithoutBookingInput[]
    createMany?: ServiceRecordCreateManyBookingInputEnvelope
    connect?: ServiceRecordWhereUniqueInput | ServiceRecordWhereUniqueInput[]
  }

  export type ServiceRecordUncheckedCreateNestedManyWithoutBookingInput = {
    create?: XOR<ServiceRecordCreateWithoutBookingInput, ServiceRecordUncheckedCreateWithoutBookingInput> | ServiceRecordCreateWithoutBookingInput[] | ServiceRecordUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: ServiceRecordCreateOrConnectWithoutBookingInput | ServiceRecordCreateOrConnectWithoutBookingInput[]
    createMany?: ServiceRecordCreateManyBookingInputEnvelope
    connect?: ServiceRecordWhereUniqueInput | ServiceRecordWhereUniqueInput[]
  }

  export type EnumServiceTypeFieldUpdateOperationsInput = {
    set?: $Enums.ServiceType
  }

  export type EnumBookingStatusFieldUpdateOperationsInput = {
    set?: $Enums.BookingStatus
  }

  export type UserUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookingsInput
    upsert?: UserUpsertWithoutBookingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBookingsInput, UserUpdateWithoutBookingsInput>, UserUncheckedUpdateWithoutBookingsInput>
  }

  export type VehicleUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<VehicleCreateWithoutBookingsInput, VehicleUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutBookingsInput
    upsert?: VehicleUpsertWithoutBookingsInput
    connect?: VehicleWhereUniqueInput
    update?: XOR<XOR<VehicleUpdateToOneWithWhereWithoutBookingsInput, VehicleUpdateWithoutBookingsInput>, VehicleUncheckedUpdateWithoutBookingsInput>
  }

  export type ServiceRecordUpdateManyWithoutBookingNestedInput = {
    create?: XOR<ServiceRecordCreateWithoutBookingInput, ServiceRecordUncheckedCreateWithoutBookingInput> | ServiceRecordCreateWithoutBookingInput[] | ServiceRecordUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: ServiceRecordCreateOrConnectWithoutBookingInput | ServiceRecordCreateOrConnectWithoutBookingInput[]
    upsert?: ServiceRecordUpsertWithWhereUniqueWithoutBookingInput | ServiceRecordUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: ServiceRecordCreateManyBookingInputEnvelope
    set?: ServiceRecordWhereUniqueInput | ServiceRecordWhereUniqueInput[]
    disconnect?: ServiceRecordWhereUniqueInput | ServiceRecordWhereUniqueInput[]
    delete?: ServiceRecordWhereUniqueInput | ServiceRecordWhereUniqueInput[]
    connect?: ServiceRecordWhereUniqueInput | ServiceRecordWhereUniqueInput[]
    update?: ServiceRecordUpdateWithWhereUniqueWithoutBookingInput | ServiceRecordUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: ServiceRecordUpdateManyWithWhereWithoutBookingInput | ServiceRecordUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: ServiceRecordScalarWhereInput | ServiceRecordScalarWhereInput[]
  }

  export type ServiceRecordUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: XOR<ServiceRecordCreateWithoutBookingInput, ServiceRecordUncheckedCreateWithoutBookingInput> | ServiceRecordCreateWithoutBookingInput[] | ServiceRecordUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: ServiceRecordCreateOrConnectWithoutBookingInput | ServiceRecordCreateOrConnectWithoutBookingInput[]
    upsert?: ServiceRecordUpsertWithWhereUniqueWithoutBookingInput | ServiceRecordUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: ServiceRecordCreateManyBookingInputEnvelope
    set?: ServiceRecordWhereUniqueInput | ServiceRecordWhereUniqueInput[]
    disconnect?: ServiceRecordWhereUniqueInput | ServiceRecordWhereUniqueInput[]
    delete?: ServiceRecordWhereUniqueInput | ServiceRecordWhereUniqueInput[]
    connect?: ServiceRecordWhereUniqueInput | ServiceRecordWhereUniqueInput[]
    update?: ServiceRecordUpdateWithWhereUniqueWithoutBookingInput | ServiceRecordUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: ServiceRecordUpdateManyWithWhereWithoutBookingInput | ServiceRecordUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: ServiceRecordScalarWhereInput | ServiceRecordScalarWhereInput[]
  }

  export type VehicleCreateNestedOneWithoutServiceRecordsInput = {
    create?: XOR<VehicleCreateWithoutServiceRecordsInput, VehicleUncheckedCreateWithoutServiceRecordsInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutServiceRecordsInput
    connect?: VehicleWhereUniqueInput
  }

  export type BookingCreateNestedOneWithoutServiceRecordsInput = {
    create?: XOR<BookingCreateWithoutServiceRecordsInput, BookingUncheckedCreateWithoutServiceRecordsInput>
    connectOrCreate?: BookingCreateOrConnectWithoutServiceRecordsInput
    connect?: BookingWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutServiceRecordsInput = {
    create?: XOR<UserCreateWithoutServiceRecordsInput, UserUncheckedCreateWithoutServiceRecordsInput>
    connectOrCreate?: UserCreateOrConnectWithoutServiceRecordsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumOwnerTypeFieldUpdateOperationsInput = {
    set?: $Enums.OwnerType
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type VehicleUpdateOneRequiredWithoutServiceRecordsNestedInput = {
    create?: XOR<VehicleCreateWithoutServiceRecordsInput, VehicleUncheckedCreateWithoutServiceRecordsInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutServiceRecordsInput
    upsert?: VehicleUpsertWithoutServiceRecordsInput
    connect?: VehicleWhereUniqueInput
    update?: XOR<XOR<VehicleUpdateToOneWithWhereWithoutServiceRecordsInput, VehicleUpdateWithoutServiceRecordsInput>, VehicleUncheckedUpdateWithoutServiceRecordsInput>
  }

  export type BookingUpdateOneWithoutServiceRecordsNestedInput = {
    create?: XOR<BookingCreateWithoutServiceRecordsInput, BookingUncheckedCreateWithoutServiceRecordsInput>
    connectOrCreate?: BookingCreateOrConnectWithoutServiceRecordsInput
    upsert?: BookingUpsertWithoutServiceRecordsInput
    disconnect?: BookingWhereInput | boolean
    delete?: BookingWhereInput | boolean
    connect?: BookingWhereUniqueInput
    update?: XOR<XOR<BookingUpdateToOneWithWhereWithoutServiceRecordsInput, BookingUpdateWithoutServiceRecordsInput>, BookingUncheckedUpdateWithoutServiceRecordsInput>
  }

  export type UserUpdateOneWithoutServiceRecordsNestedInput = {
    create?: XOR<UserCreateWithoutServiceRecordsInput, UserUncheckedCreateWithoutServiceRecordsInput>
    connectOrCreate?: UserCreateOrConnectWithoutServiceRecordsInput
    upsert?: UserUpsertWithoutServiceRecordsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutServiceRecordsInput, UserUpdateWithoutServiceRecordsInput>, UserUncheckedUpdateWithoutServiceRecordsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserStatusFilter<$PrismaModel>
    _max?: NestedEnumUserStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumServiceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceType | EnumServiceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceTypeFilter<$PrismaModel> | $Enums.ServiceType
  }

  export type NestedEnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus
  }

  export type NestedEnumServiceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceType | EnumServiceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceTypeWithAggregatesFilter<$PrismaModel> | $Enums.ServiceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceTypeFilter<$PrismaModel>
    _max?: NestedEnumServiceTypeFilter<$PrismaModel>
  }

  export type NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingStatusFilter<$PrismaModel>
    _max?: NestedEnumBookingStatusFilter<$PrismaModel>
  }

  export type NestedEnumOwnerTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.OwnerType | EnumOwnerTypeFieldRefInput<$PrismaModel>
    in?: $Enums.OwnerType[] | ListEnumOwnerTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OwnerType[] | ListEnumOwnerTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumOwnerTypeFilter<$PrismaModel> | $Enums.OwnerType
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedEnumOwnerTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OwnerType | EnumOwnerTypeFieldRefInput<$PrismaModel>
    in?: $Enums.OwnerType[] | ListEnumOwnerTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OwnerType[] | ListEnumOwnerTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumOwnerTypeWithAggregatesFilter<$PrismaModel> | $Enums.OwnerType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOwnerTypeFilter<$PrismaModel>
    _max?: NestedEnumOwnerTypeFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type UserVehicleCreateWithoutUserInput = {
    id?: string
    isHidden?: boolean
    ownedSince?: Date | string
    ownedUntil?: Date | string | null
    vehicle: VehicleCreateNestedOneWithoutOwnersInput
  }

  export type UserVehicleUncheckedCreateWithoutUserInput = {
    id?: string
    vehicleId: string
    isHidden?: boolean
    ownedSince?: Date | string
    ownedUntil?: Date | string | null
  }

  export type UserVehicleCreateOrConnectWithoutUserInput = {
    where: UserVehicleWhereUniqueInput
    create: XOR<UserVehicleCreateWithoutUserInput, UserVehicleUncheckedCreateWithoutUserInput>
  }

  export type UserVehicleCreateManyUserInputEnvelope = {
    data: UserVehicleCreateManyUserInput | UserVehicleCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BookingCreateWithoutUserInput = {
    id?: string
    serviceType: $Enums.ServiceType
    status?: $Enums.BookingStatus
    scheduledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vehicle: VehicleCreateNestedOneWithoutBookingsInput
    serviceRecords?: ServiceRecordCreateNestedManyWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutUserInput = {
    id?: string
    vehicleId: string
    serviceType: $Enums.ServiceType
    status?: $Enums.BookingStatus
    scheduledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    serviceRecords?: ServiceRecordUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutUserInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutUserInput, BookingUncheckedCreateWithoutUserInput>
  }

  export type BookingCreateManyUserInputEnvelope = {
    data: BookingCreateManyUserInput | BookingCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ServiceRecordCreateWithoutOwnerInput = {
    id?: string
    ownerType?: $Enums.OwnerType
    serviceType: string
    description: string
    mileage?: number | null
    cost?: Decimal | DecimalJsLike | number | string | null
    performedAt: Date | string
    createdAt?: Date | string
    vehicle: VehicleCreateNestedOneWithoutServiceRecordsInput
    booking?: BookingCreateNestedOneWithoutServiceRecordsInput
  }

  export type ServiceRecordUncheckedCreateWithoutOwnerInput = {
    id?: string
    vehicleId: string
    bookingId?: string | null
    ownerType?: $Enums.OwnerType
    serviceType: string
    description: string
    mileage?: number | null
    cost?: Decimal | DecimalJsLike | number | string | null
    performedAt: Date | string
    createdAt?: Date | string
  }

  export type ServiceRecordCreateOrConnectWithoutOwnerInput = {
    where: ServiceRecordWhereUniqueInput
    create: XOR<ServiceRecordCreateWithoutOwnerInput, ServiceRecordUncheckedCreateWithoutOwnerInput>
  }

  export type ServiceRecordCreateManyOwnerInputEnvelope = {
    data: ServiceRecordCreateManyOwnerInput | ServiceRecordCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type UserVehicleUpsertWithWhereUniqueWithoutUserInput = {
    where: UserVehicleWhereUniqueInput
    update: XOR<UserVehicleUpdateWithoutUserInput, UserVehicleUncheckedUpdateWithoutUserInput>
    create: XOR<UserVehicleCreateWithoutUserInput, UserVehicleUncheckedCreateWithoutUserInput>
  }

  export type UserVehicleUpdateWithWhereUniqueWithoutUserInput = {
    where: UserVehicleWhereUniqueInput
    data: XOR<UserVehicleUpdateWithoutUserInput, UserVehicleUncheckedUpdateWithoutUserInput>
  }

  export type UserVehicleUpdateManyWithWhereWithoutUserInput = {
    where: UserVehicleScalarWhereInput
    data: XOR<UserVehicleUpdateManyMutationInput, UserVehicleUncheckedUpdateManyWithoutUserInput>
  }

  export type UserVehicleScalarWhereInput = {
    AND?: UserVehicleScalarWhereInput | UserVehicleScalarWhereInput[]
    OR?: UserVehicleScalarWhereInput[]
    NOT?: UserVehicleScalarWhereInput | UserVehicleScalarWhereInput[]
    id?: StringFilter<"UserVehicle"> | string
    userId?: StringFilter<"UserVehicle"> | string
    vehicleId?: StringFilter<"UserVehicle"> | string
    isHidden?: BoolFilter<"UserVehicle"> | boolean
    ownedSince?: DateTimeFilter<"UserVehicle"> | Date | string
    ownedUntil?: DateTimeNullableFilter<"UserVehicle"> | Date | string | null
  }

  export type BookingUpsertWithWhereUniqueWithoutUserInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutUserInput, BookingUncheckedUpdateWithoutUserInput>
    create: XOR<BookingCreateWithoutUserInput, BookingUncheckedCreateWithoutUserInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutUserInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutUserInput, BookingUncheckedUpdateWithoutUserInput>
  }

  export type BookingUpdateManyWithWhereWithoutUserInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutUserInput>
  }

  export type BookingScalarWhereInput = {
    AND?: BookingScalarWhereInput | BookingScalarWhereInput[]
    OR?: BookingScalarWhereInput[]
    NOT?: BookingScalarWhereInput | BookingScalarWhereInput[]
    id?: StringFilter<"Booking"> | string
    userId?: StringFilter<"Booking"> | string
    vehicleId?: StringFilter<"Booking"> | string
    serviceType?: EnumServiceTypeFilter<"Booking"> | $Enums.ServiceType
    status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    scheduledAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    notes?: StringNullableFilter<"Booking"> | string | null
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
  }

  export type ServiceRecordUpsertWithWhereUniqueWithoutOwnerInput = {
    where: ServiceRecordWhereUniqueInput
    update: XOR<ServiceRecordUpdateWithoutOwnerInput, ServiceRecordUncheckedUpdateWithoutOwnerInput>
    create: XOR<ServiceRecordCreateWithoutOwnerInput, ServiceRecordUncheckedCreateWithoutOwnerInput>
  }

  export type ServiceRecordUpdateWithWhereUniqueWithoutOwnerInput = {
    where: ServiceRecordWhereUniqueInput
    data: XOR<ServiceRecordUpdateWithoutOwnerInput, ServiceRecordUncheckedUpdateWithoutOwnerInput>
  }

  export type ServiceRecordUpdateManyWithWhereWithoutOwnerInput = {
    where: ServiceRecordScalarWhereInput
    data: XOR<ServiceRecordUpdateManyMutationInput, ServiceRecordUncheckedUpdateManyWithoutOwnerInput>
  }

  export type ServiceRecordScalarWhereInput = {
    AND?: ServiceRecordScalarWhereInput | ServiceRecordScalarWhereInput[]
    OR?: ServiceRecordScalarWhereInput[]
    NOT?: ServiceRecordScalarWhereInput | ServiceRecordScalarWhereInput[]
    id?: StringFilter<"ServiceRecord"> | string
    vehicleId?: StringFilter<"ServiceRecord"> | string
    bookingId?: StringNullableFilter<"ServiceRecord"> | string | null
    ownerUserId?: StringNullableFilter<"ServiceRecord"> | string | null
    ownerType?: EnumOwnerTypeFilter<"ServiceRecord"> | $Enums.OwnerType
    serviceType?: StringFilter<"ServiceRecord"> | string
    description?: StringFilter<"ServiceRecord"> | string
    mileage?: IntNullableFilter<"ServiceRecord"> | number | null
    cost?: DecimalNullableFilter<"ServiceRecord"> | Decimal | DecimalJsLike | number | string | null
    performedAt?: DateTimeFilter<"ServiceRecord"> | Date | string
    createdAt?: DateTimeFilter<"ServiceRecord"> | Date | string
  }

  export type UserVehicleCreateWithoutVehicleInput = {
    id?: string
    isHidden?: boolean
    ownedSince?: Date | string
    ownedUntil?: Date | string | null
    user: UserCreateNestedOneWithoutVehiclesInput
  }

  export type UserVehicleUncheckedCreateWithoutVehicleInput = {
    id?: string
    userId: string
    isHidden?: boolean
    ownedSince?: Date | string
    ownedUntil?: Date | string | null
  }

  export type UserVehicleCreateOrConnectWithoutVehicleInput = {
    where: UserVehicleWhereUniqueInput
    create: XOR<UserVehicleCreateWithoutVehicleInput, UserVehicleUncheckedCreateWithoutVehicleInput>
  }

  export type UserVehicleCreateManyVehicleInputEnvelope = {
    data: UserVehicleCreateManyVehicleInput | UserVehicleCreateManyVehicleInput[]
    skipDuplicates?: boolean
  }

  export type BookingCreateWithoutVehicleInput = {
    id?: string
    serviceType: $Enums.ServiceType
    status?: $Enums.BookingStatus
    scheduledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutBookingsInput
    serviceRecords?: ServiceRecordCreateNestedManyWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutVehicleInput = {
    id?: string
    userId: string
    serviceType: $Enums.ServiceType
    status?: $Enums.BookingStatus
    scheduledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    serviceRecords?: ServiceRecordUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutVehicleInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutVehicleInput, BookingUncheckedCreateWithoutVehicleInput>
  }

  export type BookingCreateManyVehicleInputEnvelope = {
    data: BookingCreateManyVehicleInput | BookingCreateManyVehicleInput[]
    skipDuplicates?: boolean
  }

  export type ServiceRecordCreateWithoutVehicleInput = {
    id?: string
    ownerType?: $Enums.OwnerType
    serviceType: string
    description: string
    mileage?: number | null
    cost?: Decimal | DecimalJsLike | number | string | null
    performedAt: Date | string
    createdAt?: Date | string
    booking?: BookingCreateNestedOneWithoutServiceRecordsInput
    owner?: UserCreateNestedOneWithoutServiceRecordsInput
  }

  export type ServiceRecordUncheckedCreateWithoutVehicleInput = {
    id?: string
    bookingId?: string | null
    ownerUserId?: string | null
    ownerType?: $Enums.OwnerType
    serviceType: string
    description: string
    mileage?: number | null
    cost?: Decimal | DecimalJsLike | number | string | null
    performedAt: Date | string
    createdAt?: Date | string
  }

  export type ServiceRecordCreateOrConnectWithoutVehicleInput = {
    where: ServiceRecordWhereUniqueInput
    create: XOR<ServiceRecordCreateWithoutVehicleInput, ServiceRecordUncheckedCreateWithoutVehicleInput>
  }

  export type ServiceRecordCreateManyVehicleInputEnvelope = {
    data: ServiceRecordCreateManyVehicleInput | ServiceRecordCreateManyVehicleInput[]
    skipDuplicates?: boolean
  }

  export type UserVehicleUpsertWithWhereUniqueWithoutVehicleInput = {
    where: UserVehicleWhereUniqueInput
    update: XOR<UserVehicleUpdateWithoutVehicleInput, UserVehicleUncheckedUpdateWithoutVehicleInput>
    create: XOR<UserVehicleCreateWithoutVehicleInput, UserVehicleUncheckedCreateWithoutVehicleInput>
  }

  export type UserVehicleUpdateWithWhereUniqueWithoutVehicleInput = {
    where: UserVehicleWhereUniqueInput
    data: XOR<UserVehicleUpdateWithoutVehicleInput, UserVehicleUncheckedUpdateWithoutVehicleInput>
  }

  export type UserVehicleUpdateManyWithWhereWithoutVehicleInput = {
    where: UserVehicleScalarWhereInput
    data: XOR<UserVehicleUpdateManyMutationInput, UserVehicleUncheckedUpdateManyWithoutVehicleInput>
  }

  export type BookingUpsertWithWhereUniqueWithoutVehicleInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutVehicleInput, BookingUncheckedUpdateWithoutVehicleInput>
    create: XOR<BookingCreateWithoutVehicleInput, BookingUncheckedCreateWithoutVehicleInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutVehicleInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutVehicleInput, BookingUncheckedUpdateWithoutVehicleInput>
  }

  export type BookingUpdateManyWithWhereWithoutVehicleInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutVehicleInput>
  }

  export type ServiceRecordUpsertWithWhereUniqueWithoutVehicleInput = {
    where: ServiceRecordWhereUniqueInput
    update: XOR<ServiceRecordUpdateWithoutVehicleInput, ServiceRecordUncheckedUpdateWithoutVehicleInput>
    create: XOR<ServiceRecordCreateWithoutVehicleInput, ServiceRecordUncheckedCreateWithoutVehicleInput>
  }

  export type ServiceRecordUpdateWithWhereUniqueWithoutVehicleInput = {
    where: ServiceRecordWhereUniqueInput
    data: XOR<ServiceRecordUpdateWithoutVehicleInput, ServiceRecordUncheckedUpdateWithoutVehicleInput>
  }

  export type ServiceRecordUpdateManyWithWhereWithoutVehicleInput = {
    where: ServiceRecordScalarWhereInput
    data: XOR<ServiceRecordUpdateManyMutationInput, ServiceRecordUncheckedUpdateManyWithoutVehicleInput>
  }

  export type UserCreateWithoutVehiclesInput = {
    id?: string
    phone: string
    name?: string | null
    email?: string | null
    status?: $Enums.UserStatus
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingCreateNestedManyWithoutUserInput
    serviceRecords?: ServiceRecordCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutVehiclesInput = {
    id?: string
    phone: string
    name?: string | null
    email?: string | null
    status?: $Enums.UserStatus
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutUserInput
    serviceRecords?: ServiceRecordUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutVehiclesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutVehiclesInput, UserUncheckedCreateWithoutVehiclesInput>
  }

  export type VehicleCreateWithoutOwnersInput = {
    id?: string
    plate?: string | null
    vin?: string | null
    make?: string | null
    model?: string | null
    year?: number | null
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingCreateNestedManyWithoutVehicleInput
    serviceRecords?: ServiceRecordCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateWithoutOwnersInput = {
    id?: string
    plate?: string | null
    vin?: string | null
    make?: string | null
    model?: string | null
    year?: number | null
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutVehicleInput
    serviceRecords?: ServiceRecordUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleCreateOrConnectWithoutOwnersInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutOwnersInput, VehicleUncheckedCreateWithoutOwnersInput>
  }

  export type UserUpsertWithoutVehiclesInput = {
    update: XOR<UserUpdateWithoutVehiclesInput, UserUncheckedUpdateWithoutVehiclesInput>
    create: XOR<UserCreateWithoutVehiclesInput, UserUncheckedCreateWithoutVehiclesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutVehiclesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutVehiclesInput, UserUncheckedUpdateWithoutVehiclesInput>
  }

  export type UserUpdateWithoutVehiclesInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUpdateManyWithoutUserNestedInput
    serviceRecords?: ServiceRecordUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutVehiclesInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutUserNestedInput
    serviceRecords?: ServiceRecordUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type VehicleUpsertWithoutOwnersInput = {
    update: XOR<VehicleUpdateWithoutOwnersInput, VehicleUncheckedUpdateWithoutOwnersInput>
    create: XOR<VehicleCreateWithoutOwnersInput, VehicleUncheckedCreateWithoutOwnersInput>
    where?: VehicleWhereInput
  }

  export type VehicleUpdateToOneWithWhereWithoutOwnersInput = {
    where?: VehicleWhereInput
    data: XOR<VehicleUpdateWithoutOwnersInput, VehicleUncheckedUpdateWithoutOwnersInput>
  }

  export type VehicleUpdateWithoutOwnersInput = {
    id?: StringFieldUpdateOperationsInput | string
    plate?: NullableStringFieldUpdateOperationsInput | string | null
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    make?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUpdateManyWithoutVehicleNestedInput
    serviceRecords?: ServiceRecordUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateWithoutOwnersInput = {
    id?: StringFieldUpdateOperationsInput | string
    plate?: NullableStringFieldUpdateOperationsInput | string | null
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    make?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutVehicleNestedInput
    serviceRecords?: ServiceRecordUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type UserCreateWithoutBookingsInput = {
    id?: string
    phone: string
    name?: string | null
    email?: string | null
    status?: $Enums.UserStatus
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vehicles?: UserVehicleCreateNestedManyWithoutUserInput
    serviceRecords?: ServiceRecordCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutBookingsInput = {
    id?: string
    phone: string
    name?: string | null
    email?: string | null
    status?: $Enums.UserStatus
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vehicles?: UserVehicleUncheckedCreateNestedManyWithoutUserInput
    serviceRecords?: ServiceRecordUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutBookingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
  }

  export type VehicleCreateWithoutBookingsInput = {
    id?: string
    plate?: string | null
    vin?: string | null
    make?: string | null
    model?: string | null
    year?: number | null
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owners?: UserVehicleCreateNestedManyWithoutVehicleInput
    serviceRecords?: ServiceRecordCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateWithoutBookingsInput = {
    id?: string
    plate?: string | null
    vin?: string | null
    make?: string | null
    model?: string | null
    year?: number | null
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owners?: UserVehicleUncheckedCreateNestedManyWithoutVehicleInput
    serviceRecords?: ServiceRecordUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleCreateOrConnectWithoutBookingsInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutBookingsInput, VehicleUncheckedCreateWithoutBookingsInput>
  }

  export type ServiceRecordCreateWithoutBookingInput = {
    id?: string
    ownerType?: $Enums.OwnerType
    serviceType: string
    description: string
    mileage?: number | null
    cost?: Decimal | DecimalJsLike | number | string | null
    performedAt: Date | string
    createdAt?: Date | string
    vehicle: VehicleCreateNestedOneWithoutServiceRecordsInput
    owner?: UserCreateNestedOneWithoutServiceRecordsInput
  }

  export type ServiceRecordUncheckedCreateWithoutBookingInput = {
    id?: string
    vehicleId: string
    ownerUserId?: string | null
    ownerType?: $Enums.OwnerType
    serviceType: string
    description: string
    mileage?: number | null
    cost?: Decimal | DecimalJsLike | number | string | null
    performedAt: Date | string
    createdAt?: Date | string
  }

  export type ServiceRecordCreateOrConnectWithoutBookingInput = {
    where: ServiceRecordWhereUniqueInput
    create: XOR<ServiceRecordCreateWithoutBookingInput, ServiceRecordUncheckedCreateWithoutBookingInput>
  }

  export type ServiceRecordCreateManyBookingInputEnvelope = {
    data: ServiceRecordCreateManyBookingInput | ServiceRecordCreateManyBookingInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutBookingsInput = {
    update: XOR<UserUpdateWithoutBookingsInput, UserUncheckedUpdateWithoutBookingsInput>
    create: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBookingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBookingsInput, UserUncheckedUpdateWithoutBookingsInput>
  }

  export type UserUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicles?: UserVehicleUpdateManyWithoutUserNestedInput
    serviceRecords?: ServiceRecordUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicles?: UserVehicleUncheckedUpdateManyWithoutUserNestedInput
    serviceRecords?: ServiceRecordUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type VehicleUpsertWithoutBookingsInput = {
    update: XOR<VehicleUpdateWithoutBookingsInput, VehicleUncheckedUpdateWithoutBookingsInput>
    create: XOR<VehicleCreateWithoutBookingsInput, VehicleUncheckedCreateWithoutBookingsInput>
    where?: VehicleWhereInput
  }

  export type VehicleUpdateToOneWithWhereWithoutBookingsInput = {
    where?: VehicleWhereInput
    data: XOR<VehicleUpdateWithoutBookingsInput, VehicleUncheckedUpdateWithoutBookingsInput>
  }

  export type VehicleUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    plate?: NullableStringFieldUpdateOperationsInput | string | null
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    make?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owners?: UserVehicleUpdateManyWithoutVehicleNestedInput
    serviceRecords?: ServiceRecordUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    plate?: NullableStringFieldUpdateOperationsInput | string | null
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    make?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owners?: UserVehicleUncheckedUpdateManyWithoutVehicleNestedInput
    serviceRecords?: ServiceRecordUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type ServiceRecordUpsertWithWhereUniqueWithoutBookingInput = {
    where: ServiceRecordWhereUniqueInput
    update: XOR<ServiceRecordUpdateWithoutBookingInput, ServiceRecordUncheckedUpdateWithoutBookingInput>
    create: XOR<ServiceRecordCreateWithoutBookingInput, ServiceRecordUncheckedCreateWithoutBookingInput>
  }

  export type ServiceRecordUpdateWithWhereUniqueWithoutBookingInput = {
    where: ServiceRecordWhereUniqueInput
    data: XOR<ServiceRecordUpdateWithoutBookingInput, ServiceRecordUncheckedUpdateWithoutBookingInput>
  }

  export type ServiceRecordUpdateManyWithWhereWithoutBookingInput = {
    where: ServiceRecordScalarWhereInput
    data: XOR<ServiceRecordUpdateManyMutationInput, ServiceRecordUncheckedUpdateManyWithoutBookingInput>
  }

  export type VehicleCreateWithoutServiceRecordsInput = {
    id?: string
    plate?: string | null
    vin?: string | null
    make?: string | null
    model?: string | null
    year?: number | null
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owners?: UserVehicleCreateNestedManyWithoutVehicleInput
    bookings?: BookingCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateWithoutServiceRecordsInput = {
    id?: string
    plate?: string | null
    vin?: string | null
    make?: string | null
    model?: string | null
    year?: number | null
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owners?: UserVehicleUncheckedCreateNestedManyWithoutVehicleInput
    bookings?: BookingUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleCreateOrConnectWithoutServiceRecordsInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutServiceRecordsInput, VehicleUncheckedCreateWithoutServiceRecordsInput>
  }

  export type BookingCreateWithoutServiceRecordsInput = {
    id?: string
    serviceType: $Enums.ServiceType
    status?: $Enums.BookingStatus
    scheduledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutBookingsInput
    vehicle: VehicleCreateNestedOneWithoutBookingsInput
  }

  export type BookingUncheckedCreateWithoutServiceRecordsInput = {
    id?: string
    userId: string
    vehicleId: string
    serviceType: $Enums.ServiceType
    status?: $Enums.BookingStatus
    scheduledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingCreateOrConnectWithoutServiceRecordsInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutServiceRecordsInput, BookingUncheckedCreateWithoutServiceRecordsInput>
  }

  export type UserCreateWithoutServiceRecordsInput = {
    id?: string
    phone: string
    name?: string | null
    email?: string | null
    status?: $Enums.UserStatus
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vehicles?: UserVehicleCreateNestedManyWithoutUserInput
    bookings?: BookingCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutServiceRecordsInput = {
    id?: string
    phone: string
    name?: string | null
    email?: string | null
    status?: $Enums.UserStatus
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vehicles?: UserVehicleUncheckedCreateNestedManyWithoutUserInput
    bookings?: BookingUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutServiceRecordsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutServiceRecordsInput, UserUncheckedCreateWithoutServiceRecordsInput>
  }

  export type VehicleUpsertWithoutServiceRecordsInput = {
    update: XOR<VehicleUpdateWithoutServiceRecordsInput, VehicleUncheckedUpdateWithoutServiceRecordsInput>
    create: XOR<VehicleCreateWithoutServiceRecordsInput, VehicleUncheckedCreateWithoutServiceRecordsInput>
    where?: VehicleWhereInput
  }

  export type VehicleUpdateToOneWithWhereWithoutServiceRecordsInput = {
    where?: VehicleWhereInput
    data: XOR<VehicleUpdateWithoutServiceRecordsInput, VehicleUncheckedUpdateWithoutServiceRecordsInput>
  }

  export type VehicleUpdateWithoutServiceRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    plate?: NullableStringFieldUpdateOperationsInput | string | null
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    make?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owners?: UserVehicleUpdateManyWithoutVehicleNestedInput
    bookings?: BookingUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateWithoutServiceRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    plate?: NullableStringFieldUpdateOperationsInput | string | null
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    make?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owners?: UserVehicleUncheckedUpdateManyWithoutVehicleNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type BookingUpsertWithoutServiceRecordsInput = {
    update: XOR<BookingUpdateWithoutServiceRecordsInput, BookingUncheckedUpdateWithoutServiceRecordsInput>
    create: XOR<BookingCreateWithoutServiceRecordsInput, BookingUncheckedCreateWithoutServiceRecordsInput>
    where?: BookingWhereInput
  }

  export type BookingUpdateToOneWithWhereWithoutServiceRecordsInput = {
    where?: BookingWhereInput
    data: XOR<BookingUpdateWithoutServiceRecordsInput, BookingUncheckedUpdateWithoutServiceRecordsInput>
  }

  export type BookingUpdateWithoutServiceRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBookingsNestedInput
    vehicle?: VehicleUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type BookingUncheckedUpdateWithoutServiceRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutServiceRecordsInput = {
    update: XOR<UserUpdateWithoutServiceRecordsInput, UserUncheckedUpdateWithoutServiceRecordsInput>
    create: XOR<UserCreateWithoutServiceRecordsInput, UserUncheckedCreateWithoutServiceRecordsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutServiceRecordsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutServiceRecordsInput, UserUncheckedUpdateWithoutServiceRecordsInput>
  }

  export type UserUpdateWithoutServiceRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicles?: UserVehicleUpdateManyWithoutUserNestedInput
    bookings?: BookingUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutServiceRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicles?: UserVehicleUncheckedUpdateManyWithoutUserNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserVehicleCreateManyUserInput = {
    id?: string
    vehicleId: string
    isHidden?: boolean
    ownedSince?: Date | string
    ownedUntil?: Date | string | null
  }

  export type BookingCreateManyUserInput = {
    id?: string
    vehicleId: string
    serviceType: $Enums.ServiceType
    status?: $Enums.BookingStatus
    scheduledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceRecordCreateManyOwnerInput = {
    id?: string
    vehicleId: string
    bookingId?: string | null
    ownerType?: $Enums.OwnerType
    serviceType: string
    description: string
    mileage?: number | null
    cost?: Decimal | DecimalJsLike | number | string | null
    performedAt: Date | string
    createdAt?: Date | string
  }

  export type UserVehicleUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    ownedSince?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vehicle?: VehicleUpdateOneRequiredWithoutOwnersNestedInput
  }

  export type UserVehicleUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    ownedSince?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserVehicleUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    ownedSince?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BookingUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicle?: VehicleUpdateOneRequiredWithoutBookingsNestedInput
    serviceRecords?: ServiceRecordUpdateManyWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    serviceRecords?: ServiceRecordUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceRecordUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerType?: EnumOwnerTypeFieldUpdateOperationsInput | $Enums.OwnerType
    serviceType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    mileage?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    performedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicle?: VehicleUpdateOneRequiredWithoutServiceRecordsNestedInput
    booking?: BookingUpdateOneWithoutServiceRecordsNestedInput
  }

  export type ServiceRecordUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerType?: EnumOwnerTypeFieldUpdateOperationsInput | $Enums.OwnerType
    serviceType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    mileage?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    performedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceRecordUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerType?: EnumOwnerTypeFieldUpdateOperationsInput | $Enums.OwnerType
    serviceType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    mileage?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    performedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserVehicleCreateManyVehicleInput = {
    id?: string
    userId: string
    isHidden?: boolean
    ownedSince?: Date | string
    ownedUntil?: Date | string | null
  }

  export type BookingCreateManyVehicleInput = {
    id?: string
    userId: string
    serviceType: $Enums.ServiceType
    status?: $Enums.BookingStatus
    scheduledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceRecordCreateManyVehicleInput = {
    id?: string
    bookingId?: string | null
    ownerUserId?: string | null
    ownerType?: $Enums.OwnerType
    serviceType: string
    description: string
    mileage?: number | null
    cost?: Decimal | DecimalJsLike | number | string | null
    performedAt: Date | string
    createdAt?: Date | string
  }

  export type UserVehicleUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    ownedSince?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutVehiclesNestedInput
  }

  export type UserVehicleUncheckedUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    ownedSince?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserVehicleUncheckedUpdateManyWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    ownedSince?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BookingUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBookingsNestedInput
    serviceRecords?: ServiceRecordUpdateManyWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    serviceRecords?: ServiceRecordUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateManyWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceRecordUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerType?: EnumOwnerTypeFieldUpdateOperationsInput | $Enums.OwnerType
    serviceType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    mileage?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    performedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingUpdateOneWithoutServiceRecordsNestedInput
    owner?: UserUpdateOneWithoutServiceRecordsNestedInput
  }

  export type ServiceRecordUncheckedUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerType?: EnumOwnerTypeFieldUpdateOperationsInput | $Enums.OwnerType
    serviceType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    mileage?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    performedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceRecordUncheckedUpdateManyWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerType?: EnumOwnerTypeFieldUpdateOperationsInput | $Enums.OwnerType
    serviceType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    mileage?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    performedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceRecordCreateManyBookingInput = {
    id?: string
    vehicleId: string
    ownerUserId?: string | null
    ownerType?: $Enums.OwnerType
    serviceType: string
    description: string
    mileage?: number | null
    cost?: Decimal | DecimalJsLike | number | string | null
    performedAt: Date | string
    createdAt?: Date | string
  }

  export type ServiceRecordUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerType?: EnumOwnerTypeFieldUpdateOperationsInput | $Enums.OwnerType
    serviceType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    mileage?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    performedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicle?: VehicleUpdateOneRequiredWithoutServiceRecordsNestedInput
    owner?: UserUpdateOneWithoutServiceRecordsNestedInput
  }

  export type ServiceRecordUncheckedUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerType?: EnumOwnerTypeFieldUpdateOperationsInput | $Enums.OwnerType
    serviceType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    mileage?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    performedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceRecordUncheckedUpdateManyWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerType?: EnumOwnerTypeFieldUpdateOperationsInput | $Enums.OwnerType
    serviceType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    mileage?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    performedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}