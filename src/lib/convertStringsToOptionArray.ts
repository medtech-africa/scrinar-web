// covnert string[] to array of {value, label}
export const convertStringsToOptionArray = (values: string[] = []) => {
  return values.map((value) => ({
    value,
    label: value,
  }));
};
export const convertStringToOption = (value = '') => {
  return ({
    value,
    label: value,
  });
};