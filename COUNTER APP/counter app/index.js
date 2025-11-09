const counterEl = document.querySelector('[data-find="counterValue"]');
const addOnePoolButton = document.getElementById("addOnePoolButton");
const addTwoPoolButton = document.getElementById("addTwoPoolButton");
const resetButton = document.getElementById("resetButton");
// counterEl = 1;

console.log(counterEl.dataset);

const COUNTER_INITIAL_VALUE = 0;

let counter = COUNTER_INITIAL_VALUE;

addOnePoolButton.addEventListener("click", function () {
   counter = counter + parseInt(addOnePoolButton.dataset.pools);
   console.log(counter, addOnePoolButton.dataset.pools);
   counterEl.innerText = counter;
})

addTwoPoolButton.addEventListener("click", function () {
   counter = counter + parseInt(addTwoPoolButton.dataset.pools);
   console.log(counter, addTwoPoolButton.dataset.pools);
   counterEl.innerText = counter;
})

resetButton.addEventListener("click", function() {
   counter = COUNTER_INITIAL_VALUE;
   counterEl.innerText = counter;
})

