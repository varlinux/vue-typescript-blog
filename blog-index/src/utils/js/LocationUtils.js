export function checkInWindow(ele, fn, list, pageIndex, size) {
  const intersectionObserver = new IntersectionObserver(entries => {
    if (entries[0].intersectionRatio <= 0)
      return
    fn.call(this, list, pageIndex, size)
    console.log(`Loaded new items`)
  })

  intersectionObserver.observe(ele)
}
