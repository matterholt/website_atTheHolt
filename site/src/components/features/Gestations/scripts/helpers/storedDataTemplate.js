const birthDatesSaved = document.getElementById("birthDatesSaved");

const birthDateSavedCollection_template = (livestock) => `
  <li>
        <div class="animal-id">${livestock.id}</div>
        <div class="date-value">${livestock.birth}</div>
        <div class="date-value">${livestock.conseption}</div>
    </li>`;

export function displayCollectionAlt(savedDates) {
  console.log("GEETT", savedDates);
  if (savedDates.length === 0) {
    birthDatesSaved.innerHTML =
      '<li class="empty-message">No sheep records available</li>';
    return;
  }

  birthDatesSaved.innerHTML = savedDates
    .map((keepDate) => birthDateSavedCollection_template(keepDate))
    .join("");
}

export function storedDateActions(incomeing) {
  const temp = [incomeing];

  return {
    add: (item) => {
      temp.push(item);
    },
    print: () => {
      console.log(temp);
    },
    renderDom: () => displayCollectionAlt(temp),
  };
}
