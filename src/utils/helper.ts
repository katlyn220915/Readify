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

export { decode, findChapterElement, scrollIntoScreen };
