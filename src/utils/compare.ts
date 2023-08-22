// import { CartItemInterface } from "@/types/cart";

export const compareArraysByObjectID = (arr1: any[], arr2: any[]) => {
    // Step 1: Check if lengths are equal
    if (arr1.length !== arr2.length) {
      return false;
    }
  
    // Step 2: Sort both arrays based on the 'id' property
    const sortedArr1 = arr1.slice().sort((a, b) => a._id.localeCompare(b._id));
    const sortedArr2 = arr2.slice().sort((a, b) => a._id.localeCompare(b._id));
  
    // Step 3: Compare each object's 'id' and 'count' properties
    for (let i = 0; i < sortedArr1.length; i++) {
      const obj1 = sortedArr1[i];
      const obj2 = sortedArr2[i];
  
      if (obj1._id !== obj2._id || obj1.count !== obj2.count) {
        return false;
      }
    }
  
    // Step 4: Arrays are equal
    return true;
  }

  export const stringArrayComparison = (arr1: string[], arr2: string[]) => {
    // Step 1: Check if arrays have the same length
    if (arr1.length !== arr2.length) {
      return false;
    }
  
    // Step 2: Compare each element
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
  
    // If all elements are equal, return true
    return true;
  }


  export function compareObjects(object1: any, object2: any) {
    if (object1 === null || object2 === null) {
      return false
    }

    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (const key of keys1) {
      const val1 = object1[key];
      const val2 = object2[key];
      const areObjects = isObject(val1) && isObject(val2);
      if (
        areObjects && !compareObjects(val1, val2) ||
        !areObjects && val1 !== val2
      ) {
        return false;
      }
    }
  
    return true;
  }
  
  function isObject(object: any) {
    return object != null && typeof object === 'object';
  }