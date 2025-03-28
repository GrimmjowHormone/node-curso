const path = require("node:path");

//barra separadora de carpetas segun so
console.log(path.sep);

//unir rutas con path.join
const filepath = path.join("content", "subfolder", "test.txt");
console.log(filepath);

//obtiene el nombre del fichero
const base = path.basename("/tmp/grim/secret-files/pass.txt", ".txt");
console.log(base);

const extension = path.extname("image.jpg");
console.log(extension);
