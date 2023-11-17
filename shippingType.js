class ShippingType {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    getOptionDom(value, isDefault = false) {
        const option = document.createElement("option");
        option.value = value;
        option.innerHTML = this.getFullName();
        option.selected = isDefault;

        return option;
    }

    getFullName() {
        return this.name + "-" + "&euro;" + this.getPrice();
    }

    getPrice() {
        return parseFloat(this.price).toFixed(2);
    }
}
