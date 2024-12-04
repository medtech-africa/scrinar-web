export function deepMergeOld(obj1:any, obj2:any) {
  for (const key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (obj2[key] instanceof Object && obj1[key] instanceof Object) {
        obj1[key] = deepMerge(obj1[key], obj2[key]);
      } else {
        obj1[key] = obj2[key];
      }
    }
  }
  return obj1;
}

type TargetObj = Record<string, Array<string> | string | number | Record<string, any>>
export function deepMerge(
  target: TargetObj,
  source: TargetObj
) {
  for (const key in source) {
    if (Array.isArray(source[key])) {
      // Handle array concatenation
      if (Array.isArray(target[key])) {
        target[key] = removeDuplicates([...(target[key] as any[]), ...(source[key] as any[])] as any[])
      } else {
        target[key] = source[key]
      }
      // target[key] = Array.isArray(target[key])
      //   ? [...new Set([...target[key], ...source[key]])]
      //   : source[key];
      
    } else if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key])
    ) {
      // Handle nested objects
      if (!target[key]) {
        target[key] = {}
      }
      deepMerge(target[key] as TargetObj, source[key] as TargetObj)
    } else {
      // Handle primitive values
      target[key] = source[key]
    }
  }
  return target
}

function removeDuplicates(array: any[] = []): any[] {
  const uniqueValues: Record<string, any> = {};
  array?.forEach((value) => {
    if (!uniqueValues[value]) {
      uniqueValues[value] = true;
    }
  });
  return Object.keys(uniqueValues);
}