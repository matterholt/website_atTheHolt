import { pearsonCalculation } from "./helpers/pearsonCalculation";

function updateToTotalRatons(calculatedResults) {
  const { lbsOfIngredientA, lbsOfIngredientB } = calculatedResults;

  document.getElementById("qtyA").textContent =
    lbsOfIngredientA.toFixed(1) + " lbs";
  document.getElementById("qtyB").textContent =
    lbsOfIngredientB.toFixed(1) + " lbs";
}

function updateLabelIngredient() {
  const nameA = document.getElementById("itemA").value || "Ingredient A";
  const nameB = document.getElementById("itemB").value || "Ingredient B";
  document.getElementById("resLabelA").textContent = nameA;
  document.getElementById("resLabelB").textContent = nameB;
  document.getElementById("qtyLabelA").textContent = nameA;
  document.getElementById("qtyLabelB").textContent = nameB;
}

function updateRationsResults(results) {
  const {
    partsA,
    partsB,
    ingredientAPart,
    lbsOfIngredientA,
    ingredientBPart,
    actualCP,
    lbsOfIngredientB,
  } = results;

  document.getElementById("resPctA").textContent =
    ingredientAPart.toFixed(1) + "%";
  document.getElementById("resPctB").textContent =
    ingredientBPart.toFixed(1) + "%";

  document.getElementById("resParts").textContent =
    partsA.toFixed(1) + " : " + partsB.toFixed(1);
  document.getElementById("resActual").textContent =
    actualCP.toFixed(2) + "% CP";

  document.getElementById("qtyA").textContent =
    lbsOfIngredientA.toFixed(1) + " lbs";
  document.getElementById("qtyB").textContent =
    lbsOfIngredientB.toFixed(1) + " lbs";
}

function updateBarGraph() {}

function pearsonCalculations() {
  const cpIngredientA = parseFloat(document.getElementById("cpA").value);
  const cpIngredientB = parseFloat(document.getElementById("cpB").value);
  const cpTarget = parseFloat(document.getElementById("cpTarget").value);
  const totalRation = parseFloat(document.getElementById("totalLbs").value);

  updateLabelIngredient();

  const results = pearsonCalculation(
    cpIngredientA,
    cpIngredientB,
    cpTarget,
    totalRation,
  );

  updateToTotalRatons(results);
  updateRationsResults(results);
}

document.querySelectorAll(".ingredient-name-input").forEach((el) => {
  el.addEventListener("input", pearsonCalculations);
});
document.querySelectorAll(".input-row").forEach((el) => {
  el.addEventListener("input", pearsonCalculations);
});
