import { executeQuery } from "../database/database.js";


const addTopic = async (userId, name) => {
    await executeQuery(`INSERT INTO topics (user_id, name) VALUES ($userId, $name);`, {
        userId: userId,
        name: name,
    });
};

const removeTopic = async (id) => {
    await executeQuery(`DELETE FROM topics WHERE id = $id;`, {
        id: id,
    });
};

const findAll = async () => {
    return (await executeQuery(`SELECT * FROM topics ORDER BY name ASC;`)).rows;
};

const findTopic = async (name) => {
    return (await executeQuery(`SELECT * FROM topics WHERE name = $name;`, {
        name: name,
    })).rows[0];
};

const findTopicById = async (id) => {
    return (await executeQuery(`SELECT * FROM topics WHERE id = $id;`, {
        id: id,
    })).rows[0];
};


export { addTopic, removeTopic, findAll, findTopic, findTopicById };