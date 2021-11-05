import {userInputNamesList} from "../context/user/userInputNamesList";

// Получает слово и возвращает это же слова с заглавной первой буквой
export const capFirstLetter = (item) => (typeof item !== `string`) ? item : item[0].toUpperCase() + item.slice(1);

// Получает массив и возвращает наибольший (id + 1)
const nextId = (arr) => {
  const maxId = arr.reduce((total, amount) => Math.max(total, amount.id), -1);
  return maxId + 1;
};

// Возвращает объект типа
// id: 0 || maxID, userInputNamesList: ``
export const createEntry = (arr = null) => (
  {
    id: arr ? nextId(arr) : 0,
    ...Object.fromEntries(userInputNamesList.map((inputName) => [inputName, ``]))
  }
);

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
