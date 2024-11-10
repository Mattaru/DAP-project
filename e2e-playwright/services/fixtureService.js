import { executeQuery } from "../database/database.js";


export const createTopic = async (name, userId) => {
    await executeQuery(`INSERT INTO topics (name, user_id) 
        VALUES ($name, $userId);`, {
            name: name,
            userId: userId,
    });
};

export const createUser = async (email, password, admin=false) => {
    await executeQuery(`INSERT INTO users (email, password, admin) 
        VALUES ($email, $password, $admin)`, {
            email: email,
            password: password,
            admin: admin,
    });
}

export const deleteTopic = async (userId) => {
    await executeQuery(`DELETE FROM topics WHERE user_id = $userId;`, {
        userId: userId,
    });
}

export const deleteUser = async (userId) => {
    await executeQuery(`DELETE FROM users WHERE user_id = $userId;`, {
        userId: userId,
    });
}
