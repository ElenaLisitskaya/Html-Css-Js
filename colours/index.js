const columns = document.querySelectorAll('.column');

// обновление цвета при нажатии пробела
document.addEventListener('keydown', (event) => {
   event.preventDefault(); // отменить дефолтное поведение - при нажатии пробела и изменении цветов замочек не меняется
   if (event.code.toLowerCase() === 'space') {
      setRandomColors();
   }
})

// клик по иконке - открытый/закрытый замок - происходит смена классов
document.addEventListener('click', (event) => {
   const type = event.target.dataset.type;

   if (type === 'lock') {
      const node = 
      event.target.tagName.toLowerCase() === 'i'
      ? event.target
      : event.target.children[0]; // для получения иконки при клике и на иконку, и на кнопку

      node.classList.toggle('fa-lock-open');
      node.classList.toggle('fa-lock');
   } else if (type === 'copy') {
      copyToClickboard(event.target.textContent);
   }
})

// функция, дающая случайный цвет
function generateRandomColor() {
   const hexCodes = '0123456789ABCDEF';
   let color = '';
   for (let i = 0; i < 6; i++) {
      color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
   };
   return '#' + color;
}

// чтобы текст копировался при клике на его название
// создали метод (функцию) и потом в 'click' её обработали через else if
function copyToClickboard(text) {
   return navigator.clipboard.writeText(text);
}


function setRandomColors(isInitial) {
   const colors = isInitial ? getColorsFromHash() : [];

   columns.forEach((column, index) => {
      const isLocked = column.querySelector('i').classList.contains('fa-lock');
      const text = column.querySelector('h2');
      const button = column.querySelector('button');

      if (isLocked) { // если кнопка заблокирована, то цвет не меняется
         colors.push(text.textContent);
         return
      }

      // generateRandomColor() - генератор цвета
      const color = isInitial 
         ? colors[index] 
            ? colors[index]
            : chroma.random()
         : chroma.random();
      // Если это первичная загрузка, то нам нужно получить значение из массива colors
      // в другом случае использовать рандомную генерацию цвета chroma.random()

      if(!isInitial) { // выполнять (складывать цвет), если это не первоначальная загрузка
         colors.push(color);
      } 

      text.textContent = color;
      column.style.background = color;

      setTextColor(text, color);
      setTextColor(button, color);
   })

   updateColorsHash(colors);
};

function setTextColor(text, color) {
   const luminance = chroma(color).luminance();

   text.style.color = luminance > 0.5 ? 'black' : 'white'; // если цвет светлый, то писать черным шрифтом
}

// функция для приведения url с выбранными цветами к нормальному виду
function updateColorsHash(colors = []) {
   document.location.hash = colors
      .map((column) => {
         return column.toString().substring(1)
         })
         .join('-')
};

// функция для передачи в url выбранной палитры (чтобы она не менялась)
function getColorsFromHash() {
   if (document.location.hash.length > 1) { // вернет список всех цветов в массиве, но без первой решетки
      return document.location.hash
         .substring(1)
         .split('-')
         .map(color => '#' + color) 
   }
   return [];
}

setRandomColors(true);

