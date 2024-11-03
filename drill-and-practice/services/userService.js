import { executeQuery } from "../database/database.js";


export const addUser = async (email, password, admin=false) => {
    await executeQuery(`INSERT INTO users (email, password, admin) 
        VALUES ($email, $password, $admin);`, {
            email: email,
            password: password,
            admin: admin
    });
};

export const findUser = async (email) => {
    return (await executeQuery(`SELECT * FROM users WHERE email = $email`, {
        email: email
    })).rows[0];
};
