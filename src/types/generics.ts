export type KeyFromReducerType<T> = T extends `Set${infer A}`
  ? A extends `${infer B}${infer Rest}`
    ? `${Lowercase<B>}${Rest}`
    : never
  : never

export type SavedResult<T> = {
  date: number
  computedHeatload: number
  computedHorsePower: number
  isHpMatched?: boolean
} & T
