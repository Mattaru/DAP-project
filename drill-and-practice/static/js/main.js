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

    submitQoptionsBtn.addEventListener("click", () => {
        const options = document.querySelectorAll('[id^="text"]');
        let errors = false;

        options.forEach((option) => {
            if (option.value.lenght < 1) errors = true;
        });

        if (errors) {
            const errorsContainer = document.getElementById("errorsMsg");
            const errorMsg = documeent.createTextNode("option text shuld have more then one symbol");

            errorsContainer.appendChild(errorMsg);
        }
    });
});