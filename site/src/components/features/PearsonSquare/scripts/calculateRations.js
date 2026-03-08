function calculate() {
  const cpA = parseFloat(document.getElementById("cpA").value);
  const cpB = parseFloat(document.getElementById("cpB").value);
  const cpT = parseFloat(document.getElementById("cpTarget").value);
  const total = parseFloat(document.getElementById("totalLbs").value);

  console.log({
    cpA,
    cpB,
    cpT,
    total,
  });
}

document.querySelectorAll(".ingredient-name-input").forEach((el) => {
  el.addEventListener("input", calculate);
});
document.querySelectorAll(".input-row").forEach((el) => {
  el.addEventListener("input", calculate);
});
