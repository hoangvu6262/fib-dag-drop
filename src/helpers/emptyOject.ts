const isEmptyObject = (object: object): boolean => {
  return Object.keys(object).length === 0;
};

export { isEmptyObject };
