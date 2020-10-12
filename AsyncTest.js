// //1. 동기 함수
// function add(a, b) {
//   return a + b;
// }

// console.log("before");
// var result = add(3, 4);
// console.log("after");
// console.log(result);

//2. 비동기 함수
async function addAsync(a, b, callback) {
  setTimeout(() => {
    callback(a + b);
  }, 2000);
}

console.log("before");
var result = addAsync(3, 4, (result) => {
  console.log(result);
});
console.log("after");
console.log(result);
