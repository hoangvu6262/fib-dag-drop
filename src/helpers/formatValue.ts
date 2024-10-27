const formatString = (str: string) => str.trim().toLowerCase();

const compareStringValue = (str1: string, str2: string) =>
  formatString(str1) === formatString(str2);

export { compareStringValue };
