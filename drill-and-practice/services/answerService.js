import { executeQuery } from "../database/database.js";


export const addAnswer = async (userId, questionId, optionsIds)  => {
    await executeQuery(`INSERT INTO question_answers (user_id, question_id, question_answer_option_ids)
        VALUES ($userId, $questionId, $optionsIds);`, {
        userId: userId,
        questionId: questionId,
        optionsIds: optionsIds,
    });
};

export const getAnswersCount = async () => {
    return (await executeQuery(`SELECT COUNT(*) FROM question_answers;`)).rows[0].count;
};
