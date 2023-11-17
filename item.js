class Item {
    constructor(imageSrc, type, name, count, price) {
        this.imageSrc = imageSrc;
        this.type = type;
        this.name = name;
        this.count = count;
        this.price = price;
    }

    getAsRow(deleteHookFunction, inputChangeHookFunction) {
        const rowDom = document.createElement("tr");
        const imageTd = this.getImageDom();

        const descriptionTd = this.getDescriptionDom();
        const countTd = this.getCountDom(inputChangeHookFunction);
        const priceTd = this.getPriceDom();
        const actionsTd = this.getActionsDom(deleteHookFunction);

        rowDom.appendChild(imageTd);
        rowDom.appendChild(descriptionTd);
        rowDom.appendChild(countTd);
        rowDom.appendChild(priceTd);
        rowDom.appendChild(actionsTd);

        return rowDom;
    }

    getImageDom() {
        const imageTd = document.createElement("td");
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("table-image-wrapper");

        const imageElement = document.createElement("img");
        imageElement.src = this.imageSrc;
        imageElement.alt = "Product";
        imageElement.width = 80;
        imageElement.classList.add("rounded");

        imageWrapper.appendChild(imageElement);
        imageTd.classList.add("ps-0");
        imageTd.appendChild(imageWrapper);

        return imageTd;
    }

    getDescriptionDom() {
        const typeTd = document.createElement("td");
        const descriptionDom = document.createElement("div");
        descriptionDom.classList.add(
            "table-description-wrapper",
            "d-flex",
            "flex-column",
            "gap-2"
        );

        const typeDom = this.getTypeDom();
        const nameDom = this.getNameDom();

        descriptionDom.appendChild(typeDom);
        descriptionDom.appendChild(nameDom);

        typeTd.appendChild(descriptionDom);
        return typeTd;
    }

    getTypeDom() {
        const typeDiv = document.createElement("div");
        typeDiv.classList.add(
            "table-description-wrapper__type",
            "text-secondary"
        );
        typeDiv.textContent = this.getTypeText();

        return typeDiv;
    }

    getTypeText() {
        return this.type;
    }

    getNameDom() {
        const nameDiv = document.createElement("div");
        nameDiv.classList.add("table-description-wrapper__name");
        nameDiv.textContent = this.getNameText();

        return nameDiv;
    }

    getNameText() {
        return this.name;
    }

    getCountDom(inputChangeHookFunction) {
        const countTd = document.createElement("td");
        const countDiv = document.createElement("div");
        countDiv.classList.add("d-flex", "table-count-wrapper");

        const removeButton = this.getButtonElement("-");
        const countInput = this.getInputElement(
            this.getCountText(),
            "amount[]",
            "number"
        );
        const addButton = this.getButtonElement("+");

        removeButton.addEventListener("click", () => {
            if (countInput.value < 1) {
                countInput.value = 0;
                this.count = 0;
            } else {
                countInput.value--;
                this.count--;
                this.handleInputChanges(inputChangeHookFunction);
            }
        });

        addButton.addEventListener("click", () => {
            countInput.value++;
            this.count++;
            this.handleInputChanges(inputChangeHookFunction);
        });

        countInput.addEventListener("change", () =>
            this.handleInputChanges(inputChangeHookFunction)
        );

        countDiv.appendChild(removeButton);
        countDiv.appendChild(countInput);
        countDiv.appendChild(addButton);
        // countDiv.textContent = this.getCountText();
        countTd.appendChild(countDiv);

        return countTd;
    }

    getCountText() {
        return this.count;
    }

    getPriceDom() {
        const priceTd = document.createElement("td");
        const priceDiv = document.createElement("div");
        priceDiv.classList.add("table-price");
        priceDiv.innerHTML = this.getPriceText();
        priceTd.appendChild(priceDiv);
        return priceTd;
    }

    getPriceText() {
        return "&euro; " + this.getPrice();
    }

    getPrice() {
        return parseFloat(this.price).toFixed(2);
    }

    getActionsDom(deleteHookFunction) {
        const actionsTd = document.createElement("td");
        const actions = document.createElement("div");
        const deleteButton = this.getHighlightedButtonElement("");

        const span = document.createElement("span");
        span.innerHTML = "&times;";
        deleteButton.appendChild(span);

        deleteButton.addEventListener("click", () =>
            this.handleDeletion(deleteHookFunction, actionsTd.parentNode)
        );

        actions.classList.add("actions", "d-flex");

        actions.appendChild(deleteButton);
        actionsTd.classList.add("pe-0");
        actionsTd.appendChild(actions);

        return actionsTd;
    }

    getInputElement(value, name, type = "number", placeholder = "Amount") {
        const inputElement = document.createElement("input");
        inputElement.value = value;
        inputElement.name = name;
        inputElement.placeholder = placeholder;
        inputElement.type = type;
        inputElement.classList.add("form-control");

        return inputElement;
    }

    getHighlightedButtonElement(text, attributeName = "Close") {
        const buttonElement = document.createElement("button");
        buttonElement.type = "button";
        buttonElement.textContent = text;
        buttonElement.setAttribute("aria-label", attributeName);
        buttonElement.classList.add(
            "close",
            "btn",
            "fs-4",
            "fw-bold",
            "ms-auto"
        );

        return buttonElement;
    }

    getButtonElement(text) {
        const buttonElement = document.createElement("button");
        buttonElement.type = "button";
        buttonElement.textContent = text;
        buttonElement.classList.add("btn", "text-primary", "fw-bold", "fs-4");

        return buttonElement;
    }

    handleDeletion(deleteHookFunction, parentNode) {
        deleteHookFunction(this);
        parentNode.remove();
    }

    handleInputChanges(inputChangeHookFunction) {
        inputChangeHookFunction();
    }
}
