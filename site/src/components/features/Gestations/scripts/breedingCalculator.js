import { calculateDueDate } from "./helpers/dateFunctions";
import {
  storedDateActions,
  displayCollectionAlt,
} from "./helpers/storedDataTemplate";

const storedDates = storedDateActions([]);

const animalId = document.getElementById("animalId");
const shortDateResult = document.getElementById("shortDateResult");
const standardDateResult = document.getElementById("standardDateResult");
const longDateResult = document.getElementById("longDateResult");

const birthDateInput = document.getElementById("birthDate");
const today = new Date().toISOString().split("T")[0];

const initialBirthDate =
  birthDateInput.value === ""
    ? (birthDateInput.value = today)
    : birthDateInput.value;
const initialAnimalId =
  animalId.value === ""
    ? (animalId.value = `#000${storedDates.storedCount() + 1}`)
    : animalId.value;

function animalSetUp() {
  let animalIdInput = initialAnimalId;
  let animalBirthedDate = initialBirthDate;
  let animalBreedRange = calculateDueDate(animalBirthedDate);
  calculateBreedingDate(animalBreedRange);

  // when any data change on form , this needs to get called
  return {
    getDisplayContent: {
      animalIdInput,
      animalBirthedDate,
      animalBreedRange,
    },

    updateId: () => {
      animalIdInput = animalId.value;
    },
    updateBirthDate: () => {
      animalBirthedDate = birthDateInput.value;
    },
    storeAnimal: () => {
      storedDates.add({
        id: animalIdInput,
        birth: animalBirthedDate,
        conseption: animalBreedRange.standardDate,
      });
      storedDates.renderToDom();
    },
  };
}
const AnimalSetup = animalSetUp();
function calculateBreedingDate(animalBreedRange) {
  shortDateResult.textContent = animalBreedRange.earlyDate;
  longDateResult.textContent = animalBreedRange.laterDate;
  standardDateResult.textContent = animalBreedRange.standardDate;
}

// calculateButton.addEventListener("click", calculateBreedingDate());
birthDateInput.addEventListener("input", () => {
  AnimalSetup.updateBirthDate();
  calculateBreedingDate;
});
animalId.addEventListener("input", () => {
  AnimalSetup.updateId();
});

// Allow Enter key to trigger calculation
document.getElementById("birthDate").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    calculateBreedingDate();
  }
});

const storeDateAction = document.getElementById("storeDateAction");
storeDateAction.addEventListener("click", () => AnimalSetup.storeAnimal());
