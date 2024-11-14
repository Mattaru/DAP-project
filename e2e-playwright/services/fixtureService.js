import { executeQuery } from "../database/database.js";


export const createTopic = async (name, userId) => {
    await executeQuery("INSERT INTO topics (name, user_id) VALUES ($1, $2);", 
        [name, userId]);
};

export const createUser = async (email, password, admin=false) => {
    await executeQuery("INSERT INTO users (email, password, admin) VALUES ($1, $2, $3);", 
        [email, password, admin]);
};

export const createQuestion = async (userId, topicId, text) => {
    await executeQuery(`INSERT INTO questions (user_id, topic_id, question_text)
        VALUES ($1, $2, $3);`, 
            [userId, topicId, text]);
};

export const deleteTopicByUserId = async (userId) => {
    await executeQuery("DELETE FROM topics WHERE user_id = $1;", 
        [userId]);
};

export const deleteTopicByNmae = async (topicName) => {
    await executeQuery("DELETE FROM topics WHERE name = $1;", 
        [topicName]);
};

export const deleteUserByEmail = async (email) => {
    await executeQuery("DELETE FROM users WHERE email = $1;", 
        [email]);
};

export const getUserByEmail = async (email) => {
    return (await executeQuery("SELECT * FROM users WHERE email = $1;", 
        [email])).rows[0];
};

export const getTopicByName = async (topicNmae) => {
    return (await executeQuery("SELECT * FROM topics WHERE name = $1;", 
        [topicNmae])).rows[0];
};

export const getQuestionByText = async (questionText) => {
    return (await executeQuery("SELECT * FROM questions WHERE question_text = $1;", 
        [questionText])).rows[0];
};
