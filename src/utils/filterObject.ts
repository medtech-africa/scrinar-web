function filterObject<Type>(obj: Type): Type {
  const filteredObj = {} as Type

  for (const key in obj) {
    if (obj?.hasOwnProperty(key)) {
      const value = obj[key]
      if (value !== null && value !== undefined && value !== '') {
        filteredObj[key] = value
      }
    }
  }

  return filteredObj
}

export default filterObject
