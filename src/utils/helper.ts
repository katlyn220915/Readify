const decode = (href: string) => {
  return decodeURIComponent(href)
    .replaceAll(" ", "")
    .replaceAll("/", "")
    .replace(/\.(xhtml|html).*/, "");
};

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

function scrollIntoScreen(target: HTMLElement, position: "center" | "start") {
  target.scrollIntoView({
    behavior: "smooth",
    block: position,
    inline: "center",
  });
}

function getElementPositionY(
  rootElementId: string,
  currentElement: HTMLElement
) {
  const rootRect = document
    .getElementById(rootElementId)
    ?.getBoundingClientRect();
  const currentElementRect = currentElement.getBoundingClientRect();
  if (rootRect && currentElementRect) {
    return {
      height: currentElementRect.height,
      positionY: currentElementRect.top - rootRect.top,
    };
  } else {
    return {
      height: undefined,
      positionY: undefined,
    };
  }
}

export { decode, findChapterElement, scrollIntoScreen, getElementPositionY };
