
export function newDateUTC (date) {
  return new Date(Date.UTC(

    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes() + date.getTimezoneOffset(),
    date.getSeconds(),
    date.getMilliseconds()
  ))
}
