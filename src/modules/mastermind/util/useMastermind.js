import { useEffect, useState } from "react";

const calculateMastermindSolution = (id) => {
  const solution = [];
  solution.push((id.substring(0, 4) % 6) + 1);
  solution.push((id.substring(4, 8) % 6) + 1);
  solution.push((id.substring(8, 12) % 6) + 1);
  solution.push((id.substring(12, 16) % 6) + 1);
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

  const canSubmit = () => {
    const currentGuesses = guesses[guessesSubmitted];
    return !(
      currentGuesses[0] === 0 ||
      currentGuesses[1] === 0 ||
      currentGuesses[2] === 0 ||
      currentGuesses[3] === 0
    );
  };

  const submitGuess = () => {
    if (canSubmit()) setGuessesSubmitted(guessesSubmitted + 1);
  };

  const setGuess = (index, value) => {
    setGuesses((prev) => {
      const newGuesses = [...prev];
      newGuesses[guessesSubmitted][index] = value;
      return newGuesses;
    });
  };

  useEffect(() => {
    setGuessesSubmitted(0);
    setGuesses(initialGuesses());
  }, [id]);

  return {
    id: id,
    solution: id ? calculateMastermindSolution(id) : [0, 0, 0, 0],
    guesses: guesses,
    guessesSubmitted: guessesSubmitted,
    setGuess: setGuess,
    canSubmit: canSubmit,
    submitGuess: submitGuess,
  };
};

export default useMastermind;
