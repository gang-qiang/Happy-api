export const Middleware = (middleware, index = 0) => (target, key, descriptor) => {
  const obj = key ? target[key] : target

  obj.__middleware__ = obj.__middleware__ || []

  obj.__middleware__.push({
    value: middleware,
    index,
  })
  return descriptor
}
