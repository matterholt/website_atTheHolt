// Name inputs
document.querySelectorAll(".ingredient-name-input").forEach((el) => {
  el.addEventListener("input", calculate);
});

function calculate() {
  const cpA = parseFloat(document.getElementById("cpA").value);
  const cpB = parseFloat(document.getElementById("cpB").value);
  const cpT = parseFloat(document.getElementById("cpTarget").value);
  const total = parseFloat(document.getElementById("totalLbs").value);
  const nameA = document.getElementById("nameA").value || "Ingredient A";
  const nameB = document.getElementById("nameB").value || "Ingredient B";

  const errMsg = document.getElementById("errorMsg");
  const valid = (cpA < cpT && cpT < cpB) || (cpB < cpT && cpT < cpA);

  if (!valid) {
    errMsg.style.display = "block";
    clearResults();
    drawSquare(cpA, cpB, cpT, nameA, nameB, null, null, false);
    return;
  }

  errMsg.style.display = "none";

  // Pearson: parts of A = |cpT - cpB|, parts of B = |cpT - cpA|
  const partsA = Math.abs(cpT - cpB);
  const partsB = Math.abs(cpT - cpA);
  const totalParts = partsA + partsB;
  const pctA = (partsA / totalParts) * 100;
  const pctB = (partsB / totalParts) * 100;
  const lbsA = (pctA / 100) * total;
  const lbsB = (pctB / 100) * total;
  const actualCP = (pctA / 100) * cpA + (pctB / 100) * cpB;

  // Update result labels
  document.getElementById("resLabelA").textContent = nameA;
  document.getElementById("resLabelB").textContent = nameB;
  document.getElementById("qtyLabelA").textContent = nameA;
  document.getElementById("qtyLabelB").textContent = nameB;

  document.getElementById("resPctA").textContent = pctA.toFixed(1) + "%";
  document.getElementById("resPctB").textContent = pctB.toFixed(1) + "%";
  document.getElementById("resParts").textContent =
    partsA.toFixed(1) + " : " + partsB.toFixed(1);
  document.getElementById("resActual").textContent =
    actualCP.toFixed(2) + "% CP";

  document.getElementById("qtyA").textContent = lbsA.toFixed(1) + " lbs";
  document.getElementById("qtyB").textContent = lbsB.toFixed(1) + " lbs";

  // Bars
  const barA = document.getElementById("barA");
  const barB = document.getElementById("barB");
  barA.style.width = pctA.toFixed(1) + "%";
  barB.style.width = pctB.toFixed(1) + "%";
  barA.textContent =
    pctA >= 12 ? nameA.substring(0, 8) + " " + pctA.toFixed(0) + "%" : "";
  barB.textContent =
    pctB >= 12 ? nameB.substring(0, 8) + " " + pctB.toFixed(0) + "%" : "";

  drawSquare(cpA, cpB, cpT, nameA, nameB, partsA, partsB, true);
}

function clearResults() {
  ["resPctA", "resPctB", "resParts", "resActual", "qtyA", "qtyB"].forEach(
    (id) => (document.getElementById(id).textContent = "—"),
  );
  document.getElementById("barA").style.width = "50%";
  document.getElementById("barB").style.width = "50%";
  document.getElementById("barA").textContent = "";
  document.getElementById("barB").textContent = "";
}

function drawSquare(cpA, cpB, cpT, nameA, nameB, partsA, partsB, valid) {
  const canvas = document.getElementById("squareCanvas");
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.scale(dpr, dpr);

  ctx.clearRect(0, 0, w, h);

  const pad = 24;
  const sqX = pad + 60;
  const sqY = pad + 14;
  const sqW = w - sqX - pad - 60;
  const sqH = h - sqY - pad - 14;

  const green = "#3d6b2a";
  const rust = "#b84c1a";
  const amber = "#d4832a";
  const brown = "#6b3d1e";
  const textCol = "#1e1208";

  // Draw square border
  ctx.strokeStyle = valid ? brown : "#ccc";
  ctx.lineWidth = 2;
  ctx.strokeRect(sqX, sqY, sqW, sqH);

  // Diagonals
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 3]);

  ctx.strokeStyle = green;
  ctx.beginPath();
  ctx.moveTo(sqX, sqY);
  ctx.lineTo(sqX + sqW, sqY + sqH / 2);
  ctx.stroke();

  ctx.strokeStyle = rust;
  ctx.beginPath();
  ctx.moveTo(sqX, sqY + sqH);
  ctx.lineTo(sqX + sqW, sqY + sqH / 2);
  ctx.stroke();

  ctx.setLineDash([]);

  const font = `'Source Code Pro', monospace`;

  // Corner A (top-left)
  ctx.fillStyle = green;
  ctx.font = `bold 11px ${font}`;
  ctx.textAlign = "right";
  ctx.fillText(nameA.substring(0, 12), sqX - 6, sqY + 5);
  ctx.font = `12px ${font}`;
  ctx.fillText(cpA.toFixed(1) + "%", sqX - 6, sqY + 18);

  // Corner B (bottom-left)
  ctx.fillStyle = rust;
  ctx.font = `bold 11px ${font}`;
  ctx.fillText(nameB.substring(0, 12), sqX - 6, sqY + sqH - 12);
  ctx.font = `12px ${font}`;
  ctx.fillText(cpB.toFixed(1) + "%", sqX - 6, sqY + sqH + 2);

  // Center target
  const cx = sqX + sqW / 2;
  const cy = sqY + sqH / 2;
  ctx.fillStyle = amber;
  ctx.beginPath();
  ctx.arc(cx, cy, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = textCol;
  ctx.font = `bold 12px ${font}`;
  ctx.textAlign = "center";
  ctx.fillText(cpT.toFixed(1) + "%", cx, cy - 10);
  ctx.font = `10px ${font}`;
  ctx.fillStyle = "#7a5c3a";
  ctx.fillText("TARGET", cx, cy - 22);

  // Right corners - parts
  if (valid) {
    ctx.textAlign = "left";

    // Parts B → top-right (diagonal from B gives parts for A position)
    ctx.fillStyle = rust;
    ctx.font = `bold 12px ${font}`;
    ctx.fillText(partsA.toFixed(1) + " pts", sqX + sqW + 6, sqY + 6);
    ctx.font = `9px ${font}`;
    ctx.fillStyle = "#7a5c3a";
    ctx.fillText(
      "(parts " + nameA.substring(0, 6) + ")",
      sqX + sqW + 6,
      sqY + 18,
    );

    ctx.fillStyle = green;
    ctx.font = `bold 12px ${font}`;
    ctx.fillText(partsB.toFixed(1) + " pts", sqX + sqW + 6, sqY + sqH - 6);
    ctx.font = `9px ${font}`;
    ctx.fillStyle = "#7a5c3a";
    ctx.fillText(
      "(parts " + nameB.substring(0, 6) + ")",
      sqX + sqW + 6,
      sqY + sqH + 6,
    );

    // Mid point dot
    ctx.fillStyle = amber;
    ctx.beginPath();
    ctx.arc(sqX + sqW, sqY + sqH / 2, 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

window.addEventListener("resize", calculate);
calculate();
