let selectedGestationDays = 147;
document.getElementById("calculateButton").onclick = () => {
  calculateBreedingDate();
};
// Handle gestation period selection
document.querySelectorAll(".gestation-option").forEach((option) => {
  option.addEventListener("click", function () {
    document.querySelectorAll(".gestation-option").forEach((opt) => {
      opt.classList.remove("active");
    });
    this.classList.add("active");
    selectedGestationDays = parseInt(this.dataset.days);
  });
});

// Set max date to today
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
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedBreedingDate = breedingDate.toLocaleDateString(
    "en-US",
    options,
  );

  // Calculate date range (±2 days)
  const earliestDate = new Date(breedingDate);
  earliestDate.setDate(earliestDate.getDate() - 2);
  const latestDate = new Date(breedingDate);
  latestDate.setDate(latestDate.getDate() + 2);

  const earliestFormatted = earliestDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const latestFormatted = latestDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  // Display results
  document.getElementById("breedingDate").textContent = formattedBreedingDate;
  document.getElementById("details").innerHTML = `
             <strong>Gestation period used:</strong> ${selectedGestationDays} days<br>
             <strong>Likely breeding window:</strong> ${earliestFormatted} - ${latestFormatted}<br>
             <br>
             The ram likely bred the ewe around this date, give or take a few days.
         `;

  document.getElementById("result").classList.add("show");
}

// Allow Enter key to trigger calculation
document.getElementById("birthDate").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    calculateBreedingDate();
  }
});
