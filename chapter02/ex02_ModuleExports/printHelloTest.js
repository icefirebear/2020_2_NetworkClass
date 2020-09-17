const readline = require("readline");
const printHello = require("./printHello");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  printHello(input);
  rl.close();
}).on("close", () => {
  process.exit();
});
