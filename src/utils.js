export function convertDate (date) {
  const day = new Date(date)
  return 52 + 1.1 * 60 * (day.getHours() - 8) + day.getMinutes()
}

export function convertTime (hours, minutes) {
  let convertedMinutes
  if (minutes < 10) {
    convertedMinutes = '0' + minutes
  } else {
    convertedMinutes = minutes
  }
  return `${hours}:${convertedMinutes}`
}

export function throttle (func, ms) {
  let isThrottled = false
  let savedArgs
  let savedThis

  function wrapper () {
    if (isThrottled) {
      savedArgs = arguments
      savedThis = this
      return
    }

    func.apply(this, arguments)

    isThrottled = true

    setTimeout(function () {
      isThrottled = false
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs)
        savedArgs = savedThis = null
      }
    }, ms)
  }

  return wrapper
}

export function debounce (f, ms) {
  let timer = null

  return function (...args) {
    const onComplete = () => {
      f.apply(this, args)
      timer = null
    }

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(onComplete, ms)
  }
}
