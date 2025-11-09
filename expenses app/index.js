const LIMIT = 10000;
const CURRENCY = '.руб';
const STATUS_IN_LIMIT = 'всё хорошо';
const STATUS_OUT_OF_LIMIT = 'всё плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'limit_red';

const inputNode = document.querySelector('.js-expense-input');
const buttonNode = document.querySelector('.js-expense-button');
const historyNode = document.querySelector('.js-history');
const sumNode = document.querySelector('.js-sum');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');

const expenses = [];

init(expenses);

buttonNode.addEventListener('click', function() {
   // 1. Получаем информацию из поля ввода
   if (inputNode.value === '') { // (!inputNode.value)
   return; // если поле ввода пустая строка, то заверши действие - return
}

   const expense = parseInt(inputNode.value); // parsInt преобразует тип данных. Из строки в числа

   inputNode.value = ''; // сброс значения в поле ввода

   // 2. Сохраняем трату в список
   expenses.push(expense);

   // 3. Выведем новый спискок трат
   renderHistory(expenses);
   renderSum(expenses);

   // 5.Сравнение с лимитом и вывод статуса

   renderStatus(expenses);
});

// создаем функцию и записываем в неё первичные значения
function init(expenses) {
   limitNode.innreText = LIMIT;
   statusNode.innerText = STATUS_IN_LIMIT;
   sumNode.innerText = calculateExpanses(expenses);
}

function calculateExpanses(expenses) {
   // Посчитать сумму и вывести её
   let sum = 0;

   expenses.forEach(element => {
      sum  += element;
   });

   return sum;
}

function renderHistory(expenses) {
   let expensesListHTML = '';

   expenses.forEach(element => {
      expensesListHTML  += `<li>${element} ${CURRENCY}</li>`;
   });

   historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
};

function renderSum(expenses) {
   sumNode.innerText = calculateExpanses(expenses);
}

function renderStatus(sum) {
   if (sum <= LIMIT) {
      statusNode.innerText = STATUS_IN_LIMIT;
   } else {
      statusNode.innerText = STATUS_OUT_OF_LIMIT;
      statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
   }
}