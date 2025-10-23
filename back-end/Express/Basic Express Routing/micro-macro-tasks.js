console.log("Start");

setTimeout(() => {
  console.log("Macrotask: Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Microtask: Promise");
});

console.log("End");
console.log("End");
console.log("End");
console.log("End");
console.log("End");
