function findIndexOfParentElement(parentElement: any) {
  let chapterDiv;
  let currentElement = parentElement;
  let indexOfParentElement;

  while (currentElement.parentNode) {
    currentElement = currentElement.parentNode;
    if (currentElement.className === "epub_document_content") {
      chapterDiv = currentElement;
      break;
    }
  }
  if (chapterDiv) {
    const elementsOfCertainTag = chapterDiv.querySelectorAll(
      parentElement.tagName
    );
    indexOfParentElement =
      Array.from(elementsOfCertainTag).indexOf(parentElement);
  } else {
    return {
      chapterID: null,
      indexOfParentElement: undefined,
    };
  }

  return {
    chapterID: chapterDiv.id,
    indexOfParentElement,
  };
}

export default findIndexOfParentElement;
