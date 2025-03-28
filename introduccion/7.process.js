//proceso actual, argumentos de entradaa
// console.log(process.argv);

//controlar el proceso y su salida
// process.exit(1);

//controlar eventos del proceso

process.on("exit", () => {
  //limpiar la consola por ejemplo
  console.log("salio");
});

//recuperar el directorio actual
console.log(process.cwd());

//plataforma
console.log(process.env.Pepito);
