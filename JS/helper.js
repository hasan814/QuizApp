export const formatData = (questionData) => {
  return questionData.map((item) => {
    const correctAnswerIndex = Math.floor(Math.random() * 4);
    const answers = [
      ...item.incorrect_answers.slice(0, correctAnswerIndex),
      item.correct_answer,
      ...item.incorrect_answers.slice(correctAnswerIndex),
    ];
    return {
      question: item.question,
      correctAnswerIndex,
      answers,
    };
  });
};

export const checkAnswer = () => {};
