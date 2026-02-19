import { calculateDueDate } from "./helpers/dateFunctions";
import {
  storedDateActions,
  displayCollectionAlt,
} from "./helpers/storedDataTemplate";

const storedDates = storedDateActions({
  id: "testing",
  birth: "2023-01-01",
  conseption: "2023-01-01",
});

const animalId = document.getElementById("animalId");
const shortDateResult = document.getElementById("shortDateResult");
let standardDateResult = document.getElementById("standardDateResult");
let longDateResult = document.getElementById("longDateResult");

const birthDateInput = document.getElementById("birthDate");

const today = new Date().toISOString().split("T")[0];

(function setBirthDate() {
  const initialBirthDate = birthDateInput.value;
  const initialAnimalId = animalId.value;
  if (initialAnimalId === "") {
    animalId.value = `#000${storedDates.storedCount() + 1}`;
  }
  if (initialBirthDate === "") {
    birthDateInput.value = today;
    calculateBreedingDate();
  } else {
    birthDateInput.value = initialBirthDate;
  }
})();

function calculateBreedingDate() {
  const birthDateInput = document.getElementById("birthDate").value;
  const birthDate = new Date(birthDateInput);
  const birthingRange = calculateDueDate(birthDate);
  storedDates.add({
    id: animalId.value,
    dirth: birthDateInput,
    conseption: birthingRange.standardDate,
  });

  shortDateResult.textContent = birthingRange.earlyDate;
  longDateResult.textContent = birthingRange.laterDate;
  standardDateResult.textContent = birthingRange.standardDate;
}

// calculateButton.addEventListener("click", calculateBreedingDate());
birthDateInput.addEventListener("input", calculateBreedingDate);

// Allow Enter key to trigger calculation
document.getElementById("birthDate").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    calculateBreedingDate();
  }
});

const storeDateAction = document.getElementById("storeDateAction");
storeDateAction.addEventListener("click", () => storedDates.renderDom());
