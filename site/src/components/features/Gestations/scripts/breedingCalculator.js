import { inputSanitize, isValidateDate } from "./helpers/validators";
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
      : inputSanitize(animalId.value);
  let animalBirthedDate =
    birthDateInput.value !== "" || isValidateDate(birthDateInput.value)
      ? birthDateInput.value
      : (birthDateInput.value = today);
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
      animalIdInput = inputSanitize(animalId.value);
    },
    updateBirthDate: () => {
      // added errors when date is wrong
      animalBirthedDate = isValidateDate(birthDateInput.value) ?? "";
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
document.birthDateInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    breedingDatesToDom(AnimalSetup.breedDateRange());
  }
});

const storeDateAction = document.getElementById("storeDateAction");
storeDateAction.addEventListener("click", () => AnimalSetup.storeAnimal());
