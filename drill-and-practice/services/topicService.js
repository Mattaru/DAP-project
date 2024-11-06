import { executeQuery } from "../database/database.js";


export const addTopic = async (userId, name) => {
    await executeQuery(`INSERT INTO topics (user_id, name) VALUES ($userId, $name);`, {
        userId: userId,
        name: name,
    });
};

export const getTopicsCount = async () => {
    return (await executeQuery(`SELECT COUNT(*) FROM topics;`)).rows[0].count;
};

export const removeTopic = async (id) => {
    await executeQuery(`DELETE FROM topics WHERE id = $id;`, {
        id: id,
    });
};

export const findAll = async () => {
    return (await executeQuery(`SELECT * FROM topics ORDER BY name ASC;`)).rows;
};

export const findTopic = async (name) => {
    return (await executeQuery(`SELECT * FROM topics WHERE name = $name;`, {
        name: name,
    })).rows[0];
};

export const findTopicById = async (id) => {
    return (await executeQuery(`SELECT * FROM topics WHERE id = $id;`, {
        id: id,
    })).rows[0];
};
