function pearsonCalculation(cpA, cpB, cpT) {
  const partsA = Math.abs(cpT - cpB);
  const partsB = Math.abs(cpT - cpA);
  const totalParts = partsA + partsB;
  const pctA = (partsA / totalParts) * 100;
  const pctB = (partsB / totalParts) * 100;
  const lbsA = (pctA / 100) * total;
  const lbsB = (pctB / 100) * total;
  const actualCP = (pctA / 100) * cpA + (pctB / 100) * cpB;

  return {
    lbsOfIngredientA: lbsA,
    lbsOfIngredientB: lbsB,
    actualCP,
  };
}
