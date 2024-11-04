import { executeQuery } from "../database/database.js";


export const addQuestionOption = async (questionId, optionText, isCorrect) => {
    await executeQuery(`INSERT INTO question_answer_options (question_id, option_text, is_correct)
        VALUES ($questionId, $optionText, $isCorrect);`, {
            questionId: questionId,
            optionText: optionText,
            isCorrect: isCorrect,
        });
};

export const addMultipleQuestionOptions = async (questionId, options) => {
    const values = [];

    const placeholders = options
        .map((opt, index) => {
            const baseIndex = index * 3;
            values.push(
                questionId,
                opt.option_text,
                opt.is_correct ? true : false,
            );
            return `($${baseIndex + 1}, $${baseIndex + 2}, $${baseIndex + 3})`;
        })
        .join(", ");

    const query = `
        INSERT INTO question_answer_options (question_id, option_text, is_correct)
        VALUES ${placeholders};
    `;

    return await executeQuery(query, values);
};

export const findAllByQuestionId = async (questionId) => {
    return (await executeQuery(`SELECT * FROM question_answer_options 
        WHERE question_id = $questionId;`, {
            questionId: questionId,
    })).rows;
};

export const removeAllByQuestionid = async (questionId) => {
    await executeQuery(`DELETE FROM question_answer_options 
        WHERE question_id = $questionId;`, {
            questionId: questionId,
    });
};

export const removeById = async (id) => {
    await executeQuery(`DELETE FROM question_answer_options WHERE id = $id;`, {
        id: id,
    });
}
