// Given an array of questions and an ID, this method will find the first question with the specified ID
export const getQuestionById = function(questions, questionId) {
    let filteredQuestions = questions.filter((question) => {
        return question.id === questionId;
    });
    if (filteredQuestions.length === 0) {
        throw new Error(`Question with id ${questionId} not found`);
    }
    return filteredQuestions[0];
};
