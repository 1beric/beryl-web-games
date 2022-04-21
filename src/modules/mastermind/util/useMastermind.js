import { useEffect, useState } from "react";

const sum = (result, current) => result + current;

const stringToInt = (val) => {
  return val
    .split("")
    .map((char) => char.charCodeAt(0))
    .reduce(sum, 0);
};

const calculateMastermindSolution = (id) => {
  const solution = [];
  solution.push((stringToInt(id.substring(0, 4)) % 6) + 1);
  solution.push((stringToInt(id.substring(4, 8)) % 6) + 1);
  solution.push((stringToInt(id.substring(8, 12)) % 6) + 1);
  solution.push((stringToInt(id.substring(12, 16)) % 6) + 1);
  return solution;
};
const initialGuesses = () => [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];
const useMastermind = (id) => {
  const [guesses, setGuesses] = useState(initialGuesses());
  const [guessesSubmitted, setGuessesSubmitted] = useState(0);
  const [correctSubmission, setCorrectSubmission] = useState(false);

  const solution = id ? calculateMastermindSolution(id) : [0, 0, 0, 0];

  const canSubmit = () => {
    const currentGuesses = guesses[guessesSubmitted];
    return !(
      currentGuesses[0] === 0 ||
      currentGuesses[1] === 0 ||
      currentGuesses[2] === 0 ||
      currentGuesses[3] === 0
    );
  };

  const isCorrect = () => {
    const values = guesses[guessesSubmitted];
    for (let index = 0; index < solution.length; index++) {
      if (solution[index] !== values[index]) {
        return false;
      }
    }
    return true;
  };

  const submitGuess = () => {
    if (canSubmit()) {
      setCorrectSubmission(isCorrect());
      setGuessesSubmitted(guessesSubmitted + 1);
    }
  };

  const setGuess = (index, value) => {
    setGuesses((prev) => {
      const newGuesses = [...prev];
      newGuesses[guessesSubmitted][index] = value;
      return newGuesses;
    });
  };

  const setNextGuess = (value) => {
    setGuesses((prev) => {
      const newGuesses = [...prev];
      const newGuessRow = newGuesses[guessesSubmitted];
      const index = newGuessRow.indexOf(0);
      if (index !== -1) newGuessRow[index] = value;
      return newGuesses;
    });
  };

  useEffect(() => {
    setGuessesSubmitted(0);
    setGuesses(initialGuesses());
    setCorrectSubmission(false);
  }, [id]);

  return {
    id: id,
    solution: solution,
    guesses: guesses,
    guessesSubmitted: guessesSubmitted,
    setGuess: setGuess,
    canSubmit: canSubmit,
    submitGuess: submitGuess,
    correctSubmission: correctSubmission,
    setNextGuess: setNextGuess,
  };
};

export default useMastermind;
