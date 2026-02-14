let selectedGestationDays = 147;
let shortDateResult = document.getElementById("shortDateResult");
let standardDateResult = document.getElementById("standardDateResult");
let longDateResult = document.getElementById("longDateResult");

document.getElementById("calculateButton").onclick = () => {
  calculateBreedingDate();
};

const today = new Date().toISOString().split("T")[0];
document.getElementById("birthDate").setAttribute("max", today);

function calculateBreedingDate() {
  const birthDateInput = document.getElementById("birthDate").value;

  if (!birthDateInput) {
    alert("Please enter the lamb's birth date");
    return;
  }

  const birthDate = new Date(birthDateInput);

  // Calculate breeding date by subtracting gestation period
  const breedingDate = new Date(birthDate);
  breedingDate.setDate(breedingDate.getDate() - selectedGestationDays);

  // Format the breeding date
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  // Calculate date range (±2 days)
  const earliestDate = new Date(breedingDate);
  earliestDate.setDate(earliestDate.getDate() - 2);

  const latestDate = new Date(breedingDate);
  latestDate.setDate(latestDate.getDate() + 2);

  const earliestFormatted = earliestDate.toLocaleDateString("en-US", options);
  const latestFormatted = latestDate.toLocaleDateString("en-US", options);
  const standardDateFormated = breedingDate.toLocaleDateString(
    "en-US",
    options,
  );

  document.getElementById("shortDateResult").textContent =
    `${earliestFormatted}`;
  document.getElementById("longDateResult").textContent = `${latestFormatted}`;
  document.getElementById("standardDateResult").textContent =
    `${standardDateFormated}`;
}

// Allow Enter key to trigger calculation
document.getElementById("birthDate").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    calculateBreedingDate();
  }
});
