export const iDateHelper = (str: string) => {
  return str.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3-$2-$1");
};
