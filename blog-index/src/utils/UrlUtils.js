export function json2parameter (obj) {
  let result = ''
  for (const key in obj) {
    if (obj.hasOwnProperty(key))
      result += key + '=' + obj[key] + '&'
  }
  return result.slice(0, result.length - 1)
}
