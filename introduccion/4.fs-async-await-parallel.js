//El codigo comentado es un ejemplo de como convertir callbacks a promesas
//siempre y cuando el modulo que requiramos no tenga promesas nativas
// const { promisify } = require("util");
// const readFile = promisify(fs.readFile);
const { readFile } = require("node:fs/promises");

Promise.all([
  readFile("./archivo.txt", "utf-8"),
  readFile("./archivo2.txt", "utf-8"),
]).then(([text, secondText]) => {
  console.log("primer texto:", text);
  console.log("segundo texto:", secondText);
});
