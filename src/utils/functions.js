import {userInputNamesList} from "../context/user/userInputNamesList";

// Получает слово и возвращает это же слова с заглавной первой буквой
export const capFirstLetter = (item) => (typeof item !== `string`) ? item : item[0].toUpperCase() + item.slice(1);

// Получает массив и возвращает наибольший (id + 1)
const nextId = (arr) => {
  const maxId = arr.reduce((total, amount) => Math.max(total, amount.id), -1);
  return maxId + 1;
};

// Возвращает объект состоящий из
// 1. id = 0 или, если передан массив, наибольшему в нем id
// 2. полей userInputNamesList = ``
export const createEntry = (arr = null) => (
  {
    id: arr ? nextId(arr) : 0,
    ...Object.fromEntries(userInputNamesList.map((inputName) => [inputName, ``]))
  }
);
