// Получает слово и возвращает это же слова с заглавной первой буквой
export const capFirstLetter = (item) => (typeof item !== `string`) ? item : item[0].toUpperCase() + item.slice(1);

export const nextId = (arr) => {
  const maxId = arr.reduce((total, amount) => Math.max(total, amount.id), -1);
  return maxId + 1;
};
