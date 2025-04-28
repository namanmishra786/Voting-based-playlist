const pollingIntervals = {}

export const startPolling = (key, callback, interval = 5000) => {
  // Clear any existing polling with this key
  stopPolling(key)

  // Start a new polling interval
  pollingIntervals[key] = setInterval(callback, interval)

  return () => stopPolling(key)
}

export const stopPolling = (key) => {
  if (pollingIntervals[key]) {
    clearInterval(pollingIntervals[key])
    delete pollingIntervals[key]
  }
}

export const stopAllPolling = () => {
  Object.keys(pollingIntervals).forEach((key) => {
    clearInterval(pollingIntervals[key])
    delete pollingIntervals[key]
  })
}

