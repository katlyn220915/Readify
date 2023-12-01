const fs = require("fs");
const path = require("path");

function writeFileToLocal(
  data: any,
  fileName: string,
  uuid: string,
  callback: (success: boolean) => void
) {
  const folderPath = path.join("src/data", uuid);

  fs.mkdir(folderPath, { recursive: true }, (mkdirError: any) => {
    if (mkdirError) {
      console.error("Write file into local fail:", mkdirError);
      callback(false);
      return;
    }

    fs.writeFile(
      path.join(folderPath, `${fileName}.epub`),
      data,
      (writeError: any) => {
        if (writeError) {
          console.error("Write file into local fail:", writeError);
          callback(false);
          return;
        }
        console.log("Write file into local successful");
        callback(true);
      }
    );
  });
}

export default writeFileToLocal;
