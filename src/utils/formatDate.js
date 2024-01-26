export const formatExpirationDate = (isoDate) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(isoDate).toLocaleDateString("es-ES", options);
};
