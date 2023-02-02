export type Measure = number | string

type Value = number
type Unit = string
type IsUnitless = boolean

type ParsedMeasure = [Value, Unit, IsUnitless]

function parseMeasure(value: Measure): ParsedMeasure | null {
  if (typeof value === 'number') {
    return [value, 'px', true]
  }
  const matchResult = value.match(/([-\d]*)([^0-9\n]+)/)
  if (!matchResult) {
    return null
  }
  const [, parsedValue, parsedUnit] = matchResult

  return [parseInt(parsedValue, 10), parsedUnit, false]
}

export default parseMeasure
