export function formatDate(date) {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export function calculateDueDate(birthDate) {
  let selectedGestationDays = 147;

  const breedingDate = new Date(birthDate);
  breedingDate.setDate(breedingDate.getDate() - selectedGestationDays);

  const earliestDate = new Date(breedingDate);
  earliestDate.setDate(earliestDate.getDate() - 2);

  const latestDate = new Date(breedingDate);
  latestDate.setDate(latestDate.getDate() + 2);

  const earliestFormatted = formatDate(earliestDate);
  const latestFormatted = formatDate(latestDate);
  const standardDateFormated = formatDate(breedingDate);

  return {
    earlyDate: earliestFormatted,
    standardDate: standardDateFormated,
    laterDate: latestFormatted,
  };
}

export function dateCollection() {
  const collection = [
    {
      animalId: "#0001",
      dates: {
        earlyDate: "9/32/2024",
        standardDate: "9/32/2024",
        laterDate: "9/32/2024",
      },
      lambDate: "02/18/2026",
    },
  ];

  return {
    display: collection,
    add: "",
    remove: "",
    clear: "",
  };
}
