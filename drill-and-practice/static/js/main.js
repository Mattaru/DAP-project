document.addEventListener("DOMContentLoaded", () => {
    const addOptionBtn = document.getElementById("addOptionBtn");
    const submitQoptionsBtn = document.getElementById("submitQOptions");
    let qOptionsCounter = 0;

    addOptionBtn.addEventListener("click", () => {
        const optionContainer = document.getElementById("optionsContainer");
        const newOption = document.createElement("div");
        qOptionsCounter++;
        let newOptionTemplate = `
            <textarea name="option_text${qOptionsCounter}" type="text" placeholder="option text" value required></textarea>
            <input name="is_correct${qOptionsCounter}" type="checkbox"/>
        `;

        newOption.innerHTML = newOptionTemplate;
        optionContainer.appendChild(newOption);
    });
});