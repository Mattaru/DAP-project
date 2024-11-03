import { executeQuery } from "../database/database.js";


export const addQuestion = async (userId, topicId, questionText) => {
    await executeQuery(`INSERT INTO questions (user_id, topic_id, question_text) 
        VALUES ($userId, $topicId, $questionText);`, {
            userId: userId,
            topicId: topicId,
            questionText: questionText,
    });
};

export const findAllQuestinsByTopicId = async (topicId) => {
    return (await executeQuery(`SELECT * FROM questions WHERE topic_id = $topicId;`, {
        topicId: topicId,
    })).rows;
};

export const findQuestionById = async (id) => {
    return (await executeQuery(`SELECT * FROM questions WHERE id = $id;`, {
        id: id,
    })).rows[0];
};

export const removeQuestionById = async (id) => {
    await executeQuery(`DELETE FROM questions WHERE id = $id;`, {
        id: id,
    });
};

export const removeQuestionsByTopicId = async (topicId) => {
    await executeQuery(`DELETE FROM questions WHERE topic_id = $topicId;`, {
        topicId: topicId,
    });
};
