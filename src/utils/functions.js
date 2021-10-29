// Получает слово и возвращает это же слова с заглавной первой буквой
export const capFirstLetter = (item) => (typeof item !== `string`) ? item : item[0].toUpperCase() + item.slice(1);
