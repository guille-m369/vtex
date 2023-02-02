declare module 'vtex.responsive-values' {
  interface ResponsiveValue<T> {
    tablet?: T
    phone?: T
    desktop?: T
    mobile?: T
  }

  type MaybeResponsiveValue<T> = ResponsiveValue<T> | T
  const useResponsiveValue: <T>(value: MaybeResponsiveValue<T>) => T
}
