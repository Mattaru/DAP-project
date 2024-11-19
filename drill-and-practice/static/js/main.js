document.addEventListener("DOMContentLoaded", () => {
    const addOptionBtn = document.getElementById("addOptionBtn");
    const optionsContainer = document.getElementById("optionsContainer");
    const childrenWithClass = optionsContainer.querySelectorAll(".form-check");
    let qOptionsCounter = childrenWithClass.length;

    const appendErrMsg = (element, msg) => {
        const div = document.createElement("div");
        const p = document.createElement("p");
        const errMsg = document.createTextNode(msg);

        div.classList.add("alert");
        div.classList.add("alert-danger");

        p.appendChild(errMsg);
        div.appendChild(p);
        element.appendChild(div);
    };

    addOptionBtn.addEventListener("click", () => {
        const errContainer = document.getElementById("errorsContainer");
        const newOption = document.createElement("div");

        if (qOptionsCounter === 10) {
            addOptionBtn.disabled = true;

            if (errContainer.childElementCount > 0) return;

            appendErrMsg(
                errContainer, 
                "you can add not more then 10 answer options in one time"
            );
            
            return;
        }
        qOptionsCounter++;

        const newOptionTemplate = `
            <div class="mb-3">
                <label for="option_text${Math.random()}" class="form-label">Option Text</label>
                <textarea id="option_text" name="option_text${Math.random()}" class="form-control" placeholder="Enter option text"></textarea>
            </div>
            <div class="form-check mb-3">
                <input id="is_correct" name="is_correct${Math.random()}" type="checkbox" class="form-check-input">
                <label for="is_correct${Math.random()}" class="form-check-label">Mark as Correct</label>
            </div>
            <div class="mb-3">
                <button type="button" class="btn btn-danger btn-sm">remove option</button>
            </div>
        `;

        newOption.innerHTML = newOptionTemplate;
        optionsContainer.appendChild(newOption);

        const deleteButton = newOption.querySelector("button");
        deleteButton.addEventListener("click", () => {
            qOptionsCounter--;
            addOptionBtn.disabled = false;
            errContainer.replaceChildren();
            newOption.remove();
        });
    });
});