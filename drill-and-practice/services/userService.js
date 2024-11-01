import { executeQuery } from "../database/database.js";


const addUser = async (email, password, admin=false) => {
    await executeQuery(`INSERT INTO users (email, password, admin) 
        VALUES ($email, $password, $admin);`, {
            email: email,
            password: password,
            admin: admin
    });
};

const findUser = async (email) => {
    return (await executeQuery(`SELECT * FROM users WHERE email = $email`, {
        email: email
    })).rows[0];
};


export { addUser, findUser };