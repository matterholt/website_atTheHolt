import { calculateStartOfGestation } from "./helpers/dateFunctions";
import { storedDateActions } from "./helpers/storedDataTemplate";

const storedDates = storedDateActions([]);

const animalId = document.getElementById("animalId");
const shortDateResult = document.getElementById("shortDateResult");
const standardDateResult = document.getElementById("standardDateResult");
const longDateResult = document.getElementById("longDateResult");

const birthDateInput = document.getElementById("birthDate");
const today = new Date().toISOString().split("T")[0];

function animalSetUp() {
  let animalIdInput =
    animalId.value === ""
      ? (animalId.value = `#000${storedDates.storedCount() + 1}`)
      : animalId.value;
  let animalBirthedDate =
    birthDateInput.value === ""
      ? (birthDateInput.value = today)
      : birthDateInput.value;
  let animalBreedRange = calculateStartOfGestation(animalBirthedDate);

  breedingDatesToDom(animalBreedRange);
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
    breedDateRange: () => {
      animalBreedRange = calculateStartOfGestation(animalBirthedDate);
      return animalBreedRange;
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

function breedingDatesToDom(animalBreedRange) {
  shortDateResult.textContent = animalBreedRange?.earlyDate;
  longDateResult.textContent = animalBreedRange?.laterDate;
  standardDateResult.textContent = animalBreedRange?.standardDate;
}

// calculateButton.addEventListener("click", breedingDatesToDom());
birthDateInput.addEventListener("input", () => {
  AnimalSetup.updateBirthDate();
  breedingDatesToDom(AnimalSetup.breedDateRange());
});
animalId.addEventListener("input", () => {
  AnimalSetup.updateId();
});

// Allow Enter key to trigger calculation
document.getElementById("birthDate").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    breedingDatesToDom(AnimalSetup.breedDateRange());
  }
});

const storeDateAction = document.getElementById("storeDateAction");
storeDateAction.addEventListener("click", () => AnimalSetup.storeAnimal());
