import { executeQuery } from "../database/database.js";


export const createTopic = async (name, userId) => {
    await executeQuery("INSERT INTO topics (name, user_id) VALUES ($1, $2);", 
        [name, userId]);
};

export const createUser = async (email, password, admin=false) => {
    await executeQuery("INSERT INTO users (email, password, admin) VALUES ($1, $2, $3);", 
        [email, password, admin]);
}

export const deleteTopic = async (userId) => {
    await executeQuery("DELETE FROM topics WHERE user_id = $1;", 
        [userId]);
}

export const deleteUserByEmail = async (email) => {
    await executeQuery("DELETE FROM users WHERE email = $1;", 
        [email]);
}

export const getUserByEmail = async (email) => {
    return (await executeQuery("SELECT * FROM users WHERE email = $1;", 
        [email])).rows[0];
};

export const getTopicById = async (topicId) => {
    return (await executeQuery("SELECT * FROM topics WHERE id = $1;", 
        [topicId])).rows[0];
};
