type GeneralObject = Record<string | number | symbol, any>

function isObject(item: any): item is GeneralObject {
  return (
    item &&
    typeof item === 'object' &&
    !Array.isArray(item) &&
    !(item instanceof RegExp) &&
    !(item instanceof Date)
  )
}

function isMergableArray(item: any): item is any[] {
  return Array.isArray(item) && !item.some(el => typeof el !== 'object')
}

function deepmerge<T extends GeneralObject, U extends GeneralObject>(base: T, overwrite: U): T & U {
  const output: GeneralObject = { ...base }

  if (isObject(base) && isObject(overwrite)) {
    Object.keys(overwrite).forEach(key => {
      if (isObject(overwrite[key])) {
        if (!(key in base)) {
          Object.assign(output, { [key]: overwrite[key] })
        } else if (base[key] && isObject(base[key])) {
          output[key] = deepmerge(base[key], overwrite[key])
        } else {
          output[key] = overwrite[key]
        }
      } else if (isMergableArray(overwrite[key])) {
        output[key] = (Array.isArray(base[key]) ? [...base[key]] : []).concat(overwrite[key])
      } else {
        Object.assign(output, { [key]: overwrite[key] })
      }
    })
  }

  return output as T & U
}
export default deepmerge
