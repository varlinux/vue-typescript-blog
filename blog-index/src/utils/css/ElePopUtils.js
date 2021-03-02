export function PopInterval(arr, ind, time) {
  // console.log(`arr : `, Array.isArray(arr), ind)
  // console.log(`arr : `, Array.isArray(arr), `arr[0] : `, arr[5])
  let timer
  if (arr.length <= 0 && ind <= 0) {
    return clearInterval(timer)
  } else {
    timer = setTimeout(() => {
      if (ind >= 0) {
        arr[ind--].style.display = 'block'
        return PopInterval(arr, ind, time)
      }
    }, time)
  }
}
