const birthDatesSaved = document.getElementById("birthDatesSaved");

const birthDateSavedCollection_template = (livestock) => `
  <li>
        <div class="animal-id">${livestock.id}</div>
        <div class="date-value">${livestock.birth}</div>
        <div class="date-value">${livestock.conseption}</div>
  </li>`;

export function displayCollectionAlt(savedDates) {
  if (savedDates.length === 0) {
    birthDatesSaved.innerHTML =
      '<li class="empty-message">No sheep records available</li>';
    return;
  } else {
    birthDatesSaved.innerHTML = savedDates
      .map((keepDate) => birthDateSavedCollection_template(keepDate))
      .join("");
  }
}

export function storedDateActions(incomeing) {
  const savedDates = [...incomeing];

  return {
    add: (savedDate) => {
      savedDate.push(item);
    },
    storedCount: () => savedDates.length,
    renderDom: () => displayCollectionAlt(savedDates),
  };
}
