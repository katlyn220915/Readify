const highlightHelper = () => {
  const highlightText = (
    startContainer: Node,
    endContainer: Node,
    startOffset: number,
    endOffset: number,
    highlightId: string,
    markerColor: string,
    commonParent?: HTMLElement
  ) => {
    if (startContainer === endContainer) {
      setRange(
        startContainer,
        startOffset,
        endContainer,
        endOffset,
        highlightId,
        markerColor
      );
    } else if (
      startContainer.parentElement === endContainer.parentElement &&
      startContainer.parentElement
    ) {
      //找出來所有這個元素的所有文字節點，再進行畫記
      findElementAllTextNodes(
        startContainer,
        startOffset,
        endContainer,
        endOffset,
        startContainer.parentElement,
        highlightId,
        markerColor
      );
    } else if (
      startContainer.parentElement !== endContainer.parentElement &&
      startContainer.nodeType === 3 &&
      endContainer.nodeType === 3
    ) {
      let currentElement: any = startContainer.parentElement;
      let isEndNodeFound = false;
      while (
        currentElement !== null &&
        currentElement !== undefined &&
        !isEndNodeFound
      ) {
        isEndNodeFound = findElementAllTextNodes(
          startContainer,
          startOffset,
          endContainer,
          endOffset,
          currentElement,
          highlightId,
          markerColor
        );
        if (isEndNodeFound) {
          break;
        } else if (currentElement.nextElementSibling) {
          currentElement = currentElement.nextElementSibling as HTMLElement;
        } else if (
          !currentElement.nextElementSibling &&
          !isEndNodeFound &&
          currentElement.parentElement
        ) {
          if (currentElement.parentElement.tagName.toLowerCase() !== "div") {
            currentElement = currentElement.parentElement;
          } else if (currentElement.parentElement.nextSibling) {
            currentElement = currentElement.parentElement
              .nextElementSibling as HTMLElement;
          } else if (
            currentElement.parentElement.parentElement?.nextElementSibling &&
            currentElement.parentElement.parentElement.nextElementSibling
              .tagName === "P"
          ) {
            currentElement = currentElement.parentElement.parentElement
              .nextElementSibling as HTMLElement;
          } else {
            currentElement = null;
          }
        }
      }
    }
  };
  const findElementAllTextNodes = (
    startNode: Node,
    startOffset: number,
    endNode: Node,
    endOffset: number,
    currentElement: HTMLElement,
    highlightId: string,
    markerColor: string
  ) => {
    //目的：找到參數元素內的所有節點，並且在找到後都加上標記標前，如果過程中遇到元素則再呼叫自己
    const textNodeArray: any[] = [];
    let isEndNodeFound = false;
    try {
      if (currentElement.childNodes.length > 0) {
        currentElement.childNodes.forEach((node: any) => {
          if (node.nodeType === 3 && node.textContent.length > 0) {
            textNodeArray.push(node);
          } else if (
            node.nodeType === 1 &&
            node.className !== "epub_highlight"
          ) {
            isEndNodeFound = findElementAllTextNodes(
              startNode,
              startOffset,
              endNode,
              endOffset,
              node,
              highlightId,
              markerColor
            );
          } else if (
            node.nodeType === 1 &&
            node.className === "epub_highlight"
          ) {
          }
        });
      }
      isEndNodeFound = highlightTextNodes(
        textNodeArray,
        startNode,
        startOffset,
        highlightId,
        endNode,
        endOffset,
        isEndNodeFound,
        markerColor
      );
    } catch (e) {
      console.error("在highlight過程中有誤", e);
      isEndNodeFound = true;
    } finally {
      return isEndNodeFound;
    }
  };

  const setRange = (
    startNode: any,
    startOffset: number,
    endNode: any,
    endOffset: number,
    highlightId: string,
    markerColor: string
  ) => {
    const range = document.createRange();
    range.setStart(startNode, startOffset);
    if (endOffset > endNode.length) {
      range.setEnd(endNode, endNode.length);
    } else {
      range.setEnd(endNode, endOffset);
    }
    const spanElement = document.createElement("span");
    spanElement.className = "epub_highlight";
    spanElement.setAttribute("data-highlight-id", highlightId);
    spanElement.setAttribute(
      "style",
      `background-color:  var(--color-${markerColor})`
    );
    range.surroundContents(spanElement);
  };

  const highlightTextNodes = (
    textNodeArray: any[],
    startNode: Node,
    startOffset: number,
    highlightId: string,
    endNode: Node,
    endOffset: number,
    isEndNodeFound: boolean,
    markerColor: string
  ) => {
    try {
      for (let i = 0; i < textNodeArray.length; i++) {
        if (textNodeArray[i] === startNode && startNode.textContent) {
          setRange(
            startNode,
            startOffset,
            startNode,
            startNode.textContent.length,
            highlightId,
            markerColor
          );
        } else if (
          textNodeArray[i] === startNode &&
          textNodeArray[i] === endNode
        ) {
          setRange(
            startNode,
            startOffset,
            endNode,
            endOffset,
            highlightId,
            markerColor
          );
        } else if (textNodeArray[i] === endNode) {
          setRange(endNode, 0, endNode, endOffset, highlightId, markerColor);
          isEndNodeFound = true;
          break;
        } else {
          setRange(
            textNodeArray[i],
            0,
            textNodeArray[i],
            textNodeArray[i].textContent.length,
            highlightId,
            markerColor
          );
        }
      }
    } catch (e) {
      isEndNodeFound = true;
    } finally {
      return isEndNodeFound;
    }
  };

  const deleteHighlight = (id: string) => {
    const deleteTargets = document.querySelectorAll(
      `[data-highlight-id="${id}"]`
    );
    deleteTargets.forEach((el) => {
      if (el && el.textContent) {
        const newNode = document.createTextNode(el.textContent);
        const parent = el.parentElement;
        parent?.insertBefore(newNode, el);
        parent?.removeChild(el);
      }
    });
  };

  const findCertainNodes = (startXpath: string, endXpath: string) => {
    let startPathArr;
    let endPathArr;
    let startNode;
    let endNode;

    startPathArr = startXpath
      .split("/")
      .filter((cur) => cur !== "/" && cur !== "" && cur !== "");
    if (startXpath === endXpath) {
      startNode = getNode(startPathArr);
      endNode = startNode;
    } else {
      endPathArr = endXpath
        .split("/")
        .filter((cur) => cur !== "/" && cur !== "" && cur !== "");
      startNode = getNode(startPathArr);
      endNode = getNode(endPathArr);
    }
    return { startNode, endNode };
  };

  const getNode = (arr: any[]) => {
    let root = document.querySelectorAll(".epub_document");
    let node: any;
    arr.map((cur: any, i: number) => {
      let [element, index] = cur.split(/\[(\d+)\]/);
      index = parseInt(index);
      element = element.replaceAll("()", "");
      if (element === "text" && node !== undefined) {
        let tempList: any[] = [];
        Array.from(node.childNodes).forEach((n: any) => {
          if (n.nodeType === 3) tempList.push(n);
        });

        if (tempList[index - 1] === undefined) {
          node = tempList[0];
        } else {
          node = tempList[index - 1];
        }
      } else if (i === 0) {
        node = root[index - 1];
      } else if (node !== undefined) {
        let tempList: any[] = [];
        Array.from(node.children).forEach((n: any) => {
          if (n.nodeName === element.toUpperCase()) tempList.push(n);
        });
        node = tempList[index - 1];
      }
    });
    return node;
  };

  return {
    highlightText,
    findElementAllTextNodes,
    setRange,
    deleteHighlight,
    findCertainNodes,
  };
};

export default highlightHelper;
