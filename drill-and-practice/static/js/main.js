document.addEventListener("DOMContentLoaded", () => {
    const addOptionBtn = document.getElementById("addOptionBtn");
    let qOptionsCounter = 0;

    const appendErrMsg = (element, msg) => {
        const p = document.createElement("p");
        const errMsg = document.createTextNode(msg);

        p.appendChild(errMsg);
        element.appendChild(p);
    };

    addOptionBtn.addEventListener("click", () => {
        const optionContainer = document.getElementById("optionsContainer");
        const errContainer = document.getElementById("errorsContainer");
        const newOption = document.createElement("div");

        if (qOptionsCounter === 9) {
            addOptionBtn.disabled = true;

            if (errContainer.childElementCount > 0) return;

            appendErrMsg(
                errContainer, 
                "you can add not more then 10 answer options in one time"
            );
            
            return;
        }
        qOptionsCounter++;

        let newOptionTemplate = `
            <textarea name="option_text${Math.random()}" type="text" placeholder="option text" value required></textarea>
            <label for="is_correct${Math.random()}">mark as correct</label>
            <input name="is_correct${Math.random()}" type="checkbox"/>
            <button type="button">delete</button>
        `;

        newOption.innerHTML = newOptionTemplate;
        optionContainer.appendChild(newOption);

        const deleteButton = newOption.querySelector("button");
        deleteButton.addEventListener("click", () => {
            qOptionsCounter--;
            addOptionBtn.disabled = false;
            errContainer.replaceChildren();
            newOption.remove();
        });
    });
});