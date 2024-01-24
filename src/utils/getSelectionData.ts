const getSelectionData = () => {
  const selection = document.getSelection();
  const selectedText = selection?.toString();
  if (selectedText === " " || !selectedText || selection === null) return;
  let range;
  let rec;
  const parent = selection?.anchorNode?.parentElement;
  range = selection?.getRangeAt(0);
  rec = range?.getBoundingClientRect();

  // console.log("selection:", selection);
  // console.log("range:", range);

  return {
    rec,
    parent,
    range,
    startContainer: range.startContainer,
    endContainer: range.endContainer,
    anchorNode: selection.anchorNode,
    focusNode: selection.focusNode,
    startOffset: selection.anchorOffset,
    endOffset: selection.focusOffset,
    selectedText,
    commonAncestorContainer: range.commonAncestorContainer as HTMLElement,
  };
};

export default getSelectionData;
