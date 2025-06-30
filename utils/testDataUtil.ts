export function mergeTestData(base: any, override: any): any {
  return {
    ...base,
    ...override,
    dob: {
      ...base.dob,
      ...(override?.dob || {})
    }
  };
}
