export class ObjectToArrayValueConverter {
  toView(obj) {
    if (Array.isArray(obj)) {
      return obj;
    }
    return Object.keys(obj).map(key => obj[key]);
  }
}