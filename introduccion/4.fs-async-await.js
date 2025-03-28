//El codigo comentado es un ejemplo de como convertir callbacks a promesas
//siempre y cuando el modulo que requiramos no tenga promesas nativas
// const { promisify } = require("util");
// const readFile = promisify(fs.readFile);
const { readFile } = require("node:fs/promises");

(async () => {
  console.log("leyendo el primer archivo...");
  const text = await readFile("./archivo.txt", "utf-8");
  console.log("primer texto:", text);

  console.log("haciendo otras cosas mientras se lee el archivo");
  console.log("leyendo el segundo archivos...");
  const text2 = await readFile("./archivo2.txt", "utf-8");
  console.log("segundo texto:", text);
})();
