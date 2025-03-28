//El codigo comentado es un ejemplo de como convertir callbacks a promesas
//siempre y cuando el modulo que requiramos no tenga promesas nativas
// const { promisify } = require("util");
// const readFile = promisify(fs.readFile);



const fs = require("node:fs/promises");
console.log("leyendo el primer archivo...");
fs.readFile("./archivo.txt", "utf-8").then((text) => {
  console.log(text);
});

console.log("haciendo otras cosas mientras se lee el archivo");
console.log("leyendo el segundo archivos...");
const text2 = fs.readFile("./archivo2.txt", "utf-8").then((text) => {
  console.log(text);
});
// console.log(text2);
