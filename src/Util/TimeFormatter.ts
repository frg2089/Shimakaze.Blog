
export default ($this: Date, format: string) => {
  const year = $this.getFullYear()
  const month = $this.getMonth()
  const date = $this.getDate()
  const hour = $this.getHours()
  const minute = $this.getMinutes()
  const second = $this.getSeconds()
  const day = $this.getDay()
  // const ms= $this.getMilliseconds()

  const c_year = countChar(format, 'y')
  const c_month = countChar(format, 'M')
  const c_date = countChar(format, 'd')
  const c_hour = countChar(format, 'H')
  const c_minute = countChar(format, 'm')
  const c_second = countChar(format, 's')
  const c_day = countChar(format, 'D')
  // const c_ms = countChar(format, 'f')

  const s_year = strFormat(year.toString(), c_year)
  const s_month = strFormat(month.toString(), c_month)
  const s_date = strFormat(date.toString(), c_date)
  const s_hour = strFormat(hour.toString(), c_hour)
  const s_minute = strFormat(minute.toString(), c_minute)
  const s_second = strFormat(second.toString(), c_second)
  const s_day = strFormat(day.toString(), c_day)
  // const s_ms = strFormat(ms.toString(), c_ms)

  let result = format
    .replace(newString('y', c_year), s_year)
    .replace(newString('M', c_month), s_month)
    .replace(newString('d', c_date), s_date)
    .replace(newString('H', c_hour), s_hour)
    .replace(newString('m', c_minute), s_minute)
    .replace(newString('s', c_second), s_second)
    .replace(newString('D', c_day), s_day)
  // .replace(newString('f', c_ms), s_ms)

  return result
}

function countChar(str: string, char: string) {
  let count = 0
  for (let i = str.indexOf(char); str[i++] === char; count++)
    continue
  return count
}

function strFormat(source: string, length: number) {
  return source.substring(source.length - length).padStart(length, '0')
}

function newString(char: string, count: number) {
  let result = ''
  for (let i = 0; i < count; i++)
    result += char
  return result
}