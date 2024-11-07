import { executeQuery } from "../database/database.js";


export const addQuestion = async (userId, topicId, questionText) => {
    await executeQuery(`INSERT INTO questions (user_id, topic_id, question_text) 
        VALUES ($userId, $topicId, $questionText);`, {
            userId: userId,
            topicId: topicId,
            questionText: questionText,
    });
};

export const getQuestionsCount = async () => {
    return (await executeQuery(`SELECT COUNT(*) FROM questions;`)).rows[0].count;
};

export const getRandomQuestion = async () => {
    return (await executeQuery(`WITH random_question AS (
        SELECT *
        FROM questions
        ORDER BY RANDOM()
        LIMIT 1
    )
    SELECT 
        rq.id as questionId,
        rq.question_text as questionText,
        json_agg(json_build_object(
            'optionId', qo.id,
            'optionText', qo.option_text
        )) AS answerOptions
    FROM random_question rq
    JOIN question_answer_options qo ON rq.id = qo.question_id
    GROUP BY rq.id, rq.question_text;`)).rows[0];
};

export const getRandomQuestionByTopicId = async (topicId) => {
    return (await executeQuery(`SELECT * FROM questions WHERE topic_id = $topicId 
        ORDER BY RANDOM() LIMIT 1;`, {
            topicId: topicId,
        })).rows[0];
}; 

export const getQuestionWithOptionsById = async (id) => {
    return (await executeQuery(`WITH random_question AS (
            SELECT *
            FROM questions
            WHERE id = $id
            ORDER BY RANDOM()
            LIMIT 1
        )
        SELECT 
            rq.id,
            rq.topic_id,
            rq.question_text,
            json_agg(json_build_object(
                'id', qo.id,
                'option_text', qo.option_text,
                'is_correct', qo.is_correct
            )) AS options
        FROM random_question rq
        JOIN question_answer_options qo ON rq.id = qo.question_id
        GROUP BY rq.id, rq.topic_id, rq.question_text;`, {
            id: id,
        })).rows[0];
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
