export function formatDate(date: Date = new Date()) {

  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()

  let monthResult = month.toString()
  let dayResult = day.toString()

  if (month < 10) monthResult = '0' + month.toString()
  if (day < 10) dayResult = '0' + day.toString()

  return year + '-' + monthResult + '-' + dayResult
}
