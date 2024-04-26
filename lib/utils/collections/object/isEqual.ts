export function isEqual(object1: any, object2: any) {
    // if (typeof object1 !== 'object' || typeof object2 !== 'object') {
    //     return object1 === object2;
    // }

    const a = JSON.stringify(object1);
    const b = JSON.stringify(object2);

    const isEqual = a === b;

    return isEqual;
}
