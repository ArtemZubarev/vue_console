const cleanObject = (obj: {[index: string]: number}) => {
  for (const propName in obj) {
    if (!obj[propName]) {
      delete obj[propName]
    }
  }
  return obj
}

export default cleanObject
