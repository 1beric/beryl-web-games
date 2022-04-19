const ID_LENGTH = 16;

const randomInt = (min, max) => Math.round(min + (max - min) * Math.random());

const createId = () => {
  const idArray = [];
  for (let index = 0; index < ID_LENGTH; index++) {
    idArray.push(randomInt(0, 9));
  }
  return idArray.join("");
};

export default createId;
