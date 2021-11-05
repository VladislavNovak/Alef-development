export const TITLE = `title`;
export const AGE = `age`;

export const userInputList = {
  [TITLE]: {
    ru: `имя`,
    type: `text`,
  },
  [AGE]: {
    ru: `возраст`,
    type: `number`,
  },
};

export const userInputNamesList = Object.keys(userInputList);
