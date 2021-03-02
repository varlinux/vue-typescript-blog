export function mapArray(keyArr, objArr) {
  const arr = []
  keyArr.forEach(id => {
    arr.push(objArr.filter(item => item.tag_id === id))
  })
  return arr.flat()
}
