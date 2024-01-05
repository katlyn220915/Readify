function findChapterElement(element: any) {
  let chapterDiv;
  let currentElement = element;

  while (currentElement.parentNode) {
    currentElement = currentElement.parentNode;
    if (currentElement.className === "epub_document_content") {
      chapterDiv = currentElement;
      break;
    }
  }

  return {
    chapterID: chapterDiv.id,
  };
}

export default findChapterElement;
