function findIndexOfParentElement(parentElement: any) {
  let chapterDiv;

  let currentElement = parentElement;

  while (currentElement.parentNode) {
    currentElement = currentElement.parentNode;
    if (currentElement.className === "epub_document_content") {
      chapterDiv = currentElement;
      break;
    }
  }
  const elementsOfCertainTag = chapterDiv.querySelectorAll(
    parentElement.tagName
  );
  const indexOfParentElement =
    Array.from(elementsOfCertainTag).indexOf(parentElement);

  return {
    chapterID: chapterDiv.id,
    indexOfParentElement,
  };
}

export default findIndexOfParentElement;
