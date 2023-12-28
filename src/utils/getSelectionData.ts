const getSelectionData = () => {
  const selection = document.getSelection();
  const selectedText = selection?.toString();
  if (selectedText === " " || !selectedText || selection === null) return;
  console.log(selection);
  let parents;
  let range;
  let rec;
  const parent = selection?.anchorNode?.parentElement;
  const isOneLine = selection.anchorNode === selection.focusNode;
  console.log(isOneLine);
  console.log(selection.anchorNode);
  console.log(selection.focusNode);
  range = selection?.getRangeAt(0);
  rec = range?.getBoundingClientRect();

  return {
    rec,
    parent,
    selectedText,
  };
};

export default getSelectionData;
