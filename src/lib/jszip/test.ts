import JSZip from "jszip";
import ePub from "epubjs";

const epubFilePath = "src/data/1701483198064.epub";

function parse() {
  const zip = new JSZip();
  zip
    .loadAsync(epubFilePath)
    .then((zip) => {
      const opfFilePath = zip.file(/.*\.opf/)[0].name;
      return zip.file(opfFilePath)?.async("string");
    })
    .then((opfContent) => {
      return ePub.opf(opfContent);
    })
    .then((book) => {
      const spineItems = book.spine.items;

      const chaptersDiv = spineItems.map((item: any, index: number) => {
        const chapterContent = book.getChapter(item.idref);
        console.log(chapterContent);
      });
    });
}

export default parse;
