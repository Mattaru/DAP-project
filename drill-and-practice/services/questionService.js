import { executeQuery } from "../database/database.js";


const addQuestion = async (userId, topicId, questionText) => {
    await executeQuery(`INSERT INTO questions (user_id, topic_id, question_text) 
        VALUES ($userId, $topicId, $questionText);`, {
            userId: userId,
            topicId: topicId,
            questionText: questionText,
    });
};

const findAllByTopicId = async (topicId) => {
    return (await executeQuery(`SELECT * FROM questions WHERE topic_id = $topicId;`, {
        topicId: topicId,
    })).rows;
};

const removeQuestionById = async (id) => {
    await executeQuery(`DELETE FROM questions WHERE id = $id;`, {
        id: id,
    });
};

const removeQuestionsByTopicId = async (topicId) => {
    await executeQuery(`DELETE FROM questions WHERE topic_id = $topicId;`, {
        topicId: topicId,
    });
};


export { addQuestion, findAllByTopicId, removeQuestionById, removeQuestionsByTopicId };
