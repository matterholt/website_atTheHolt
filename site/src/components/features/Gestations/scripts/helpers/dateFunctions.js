export function formatDate(date) {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export function calculateStartOfGestation(birthDate) {
  let selectedGestationDays = 147;

  const breedingDate = new Date(birthDate);
  breedingDate.setDate(breedingDate.getDate() - selectedGestationDays);

  const earliestDate = new Date(breedingDate);
  earliestDate.setDate(earliestDate.getDate() - 2);

  const latestDate = new Date(breedingDate);
  latestDate.setDate(latestDate.getDate() + 2);

  return {
    earlyDate: formatDate(earliestDate),
    standardDate: formatDate(latestDate),
    laterDate: formatDate(breedingDate),
  };
}
