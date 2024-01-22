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
    console.log("開始畫記");
    if (startContainer === endContainer) {
      console.log("開始與結束的文本節點相同，直接進行同行畫記");
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
      console.log("初始節點與結束節點不同，但父層容器相同");
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
      console.log("開始節點與結束節點的文本節點父層容器不同");
      console.log("開始節點的父層元素為 ：", startContainer.parentElement);
      console.log("結束節點的父層元素為：", endContainer.parentElement);
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
          console.log("已經找到結束節點了");
          break;
        } else if (currentElement.nextElementSibling) {
          console.log(
            currentElement,
            "的兄弟元素為：",
            currentElement.nextElementSibling
          );
          currentElement = currentElement.nextElementSibling as HTMLElement;
        } else if (
          !currentElement.nextElementSibling &&
          !isEndNodeFound &&
          currentElement.parentElement
        ) {
          console.log(currentElement, "沒有兄弟元素了");
          if (currentElement.parentElement.tagName.toLowerCase() !== "div") {
            console.log(
              currentElement,
              "有父層元素，並且不是章節div，指派當前元素為",
              currentElement.parentElement
            );
            currentElement = currentElement.parentElement;
          } else if (currentElement.parentElement.nextSibling) {
            console.log(
              currentElement,
              "的父層元素有下一個元素，指派當前元素為：",
              currentElement.parentElement
            );
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
            console.log(
              "在",
              currentElement,
              "找到一個文本節點: ",
              node.textContent
            );
            textNodeArray.push(node);
          } else if (
            node.nodeType === 1 &&
            node.className !== "epub_highlight"
          ) {
            console.log(
              "在",
              currentElement,
              "找到一個元素節點",
              "並且此元素沒有畫記過",
              node,
              "準備呼叫此函式"
            );
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
            console.log("找到畫記過的元素，不處理。");
          }
        });
      }
      console.log("這是", currentElement, "元素的所有文本節點", textNodeArray);
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
          console.log("初始節點與結束節點為同一個文本節點裡");
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
          console.log(
            `目前節點為`,
            textNodeArray[i],
            `，不是初始點也不是結束點`
          );
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
      console.log("有沒有找到結束節點：", isEndNodeFound);
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
    console.log("刪除的highlight列表: ", deleteTargets);
    deleteTargets.forEach((el) => {
      console.log("目前正在刪除", el, "元素");
      if (el && el.textContent) {
        const newNode = document.createTextNode(el.textContent);
        const parent = el.parentElement;
        parent?.insertBefore(newNode, el);
        parent?.removeChild(el);
      }
    });
  };

  const findCertainNodes = (startXpath: string, endXpath: string) => {
    console.log("解析", startXpath, "字串");
    console.log("解析", endXpath, "字串");
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
      console.log("目前是在目標陣列的第", i, "個位置上，目前父層為", node);
      let [element, index] = cur.split(/\[(\d+)\]/);
      index = parseInt(index);
      element = element.replaceAll("()", "");
      console.log(
        "已經切割字串完成，元素為：",
        element,
        "在父層的第",
        index,
        "個位置"
      );
      if (element === "text" && node !== undefined) {
        console.log(
          "目標陣列的最後一個節點，正開始尋找文本節點：",
          node.childNodes
        );
        let tempList: any[] = [];
        Array.from(node.childNodes).forEach((n: any) => {
          if (n.nodeType === 3) tempList.push(n);
        });

        if (tempList[index - 1] === undefined) {
          node = tempList[0];
        } else {
          node = tempList[index - 1];
        }
        console.log("找到文本節點 :", node);
      } else if (i === 0) {
        console.log("第一個層章節元素：在第", index - 1, "個章節");
        node = root[index - 1];
      } else if (node !== undefined) {
        console.log("父層元素的child Elements", node.children);
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
