export function pearsonCalculation(
  crudeProteinIngredientA,
  crudeProteinIngredientB,
  crudeProteinTarget,
  totalRationSize,
) {
  const partsA = Math.abs(crudeProteinTarget - crudeProteinIngredientB);
  const partsB = Math.abs(crudeProteinTarget - crudeProteinIngredientA);
  const totalParts = partsA + partsB;
  const pctA = (partsA / totalParts) * 100;
  const pctB = (partsB / totalParts) * 100;
  const lbsA = (pctA / 100) * totalRationSize;
  const lbsB = (pctB / 100) * totalRationSize;
  const actualCP =
    (pctA / 100) * crudeProteinIngredientA +
    (pctB / 100) * crudeProteinIngredientB;

  return {
    lbsOfIngredientA: lbsA,
    lbsOfIngredientB: lbsB,
    actualCP,
  };
}
