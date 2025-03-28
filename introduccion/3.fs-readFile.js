const fs = require("node:fs");



console.log("leyendo el primer archivo...");
fs.readFile("./archivo.txt", "utf-8", (err, text) => {
  console.log(text);
});

console.log("haciendo otras cosas mientras se lee el archivo");
console.log("leyendo el segundo archivos...");
const text2 = fs.readFileSync("./archivo2.txt", "utf-8");
console.log(text2);
