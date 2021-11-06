// ПЕРВАЯ ЗАГЛАВНАЯ БУКВА
// Получает слово и возвращает это же слова с заглавной первой буквой
export const capFirstLetter = (item) => (typeof item !== `string`) ? item : item[0].toUpperCase() + item.slice(1);

// Получает массив и возвращает наибольший (id + 1)
const nextId = (arr) => {
  const maxId = arr.reduce((total, amount) => Math.max(total, amount.id), -1);
  return maxId + 1;
};

// СОЗДАЕТ НОВЫЙ ОБЪЕКТ
// Получает массив из ключей userControls типа [`title`, `age`, и т.д]
// и массив объектов типа [{id: 0, title: '', age: ''}]
// Возвращает объект типа {id: maxID, title: '', age: ''}
export const createEntry = (names, arr = null) => (
  {
    id: arr ? nextId(arr) : 0,
    ...Object.fromEntries(names.map((name) => [name, ``]))
  }
);

// В ИНПУТЕ ТОЛЬКО БУКВЫ И ПРОБЕЛ
// Получает строковые данные name, value, id и коллбэк.
//    Сам коллбэк - это любое событие onChange в input
//    value - это имя и фамилия пользователя
// Проверяем value на соотвествие re. Это должны быть только буквы и/или пробел
// Если это так, тогда
//    переводим первую букву каждого слова в верхний регистр
//    и вызываем коллбэк
export const inputValidation = (name, value, id, onChange) => {
  const regexp = /^[a-zA-Zа-яёА-ЯЁ\s]*$/;
  if(value.match(regexp)) {
    value = value.replace(/(^|\s)\S/g, (str) => str.toUpperCase());
    onChange(name, value, id);
  }
};

// СРАВНИВАЕТ ДВА ОБЪЕКТА
// Получает два объекта и возвращает результат их сравнения как true/false
const isObjectsEqual = (o1, o2) =>
  typeof o1 === 'object' && Object.keys(o1).length > 0
    ? Object.keys(o1).length === Object.keys(o2).length
      && Object.keys(o1).every(p => isObjectsEqual(o1[p], o2[p]))
    : o1 === o2;

// СРАВНИВАЕТ ДВА МАССИВА ОБЪЕКТОВ
// Получает два массива объектов и возвращает результат их сравнения как true/false
export const isArraysEqual = (a1, a2) =>
  a1.length === a2.length && a1.every((o, idx) => isObjectsEqual(o, a2[idx]));
