//connects items with doms
let itemsMap = new Map();

let items = [
    new Item("images/greens.jpeg", "Experience", "Green travel", 1, "3.99"),
    new Item("images/sands.jpeg", "Experience", "Sands travel", 1, "39.99"),
    new Item("images/stars.jpeg", "Experience", "Stars travel", 1, "85.49"),
];

const SHIPPING_TYPES_ENUM = {
    standart: 0,
    express: 1,
    slow: 2,
};

let shippingTypes = [
    new ShippingType("Standart-Delivery", 5.0),
    new ShippingType("Expresso", 12.0),
    new ShippingType("Slow", 3.0),
];

let itemsCount = 0;
let itemsPrice = 0.0;

let tbodyDom = document.querySelector(".shop-table tbody");
let selectDom = document.querySelector("#floatingSelect");

let shoppingItemsCountDom = document.querySelector("#shopping-items-count");
let summaryItemsCountDom = document.querySelector("#count-items");
let summaryPriceCountDom = document.querySelector("#count-price");
let totalPriceDom = document.querySelector("#total-price");

insertData();

function insertData() {
    insertShipping();
    insertItems();
    updateEssentials();
}

function insertShipping() {
    let totalShippingTypes = shippingTypes.length;

    if (totalShippingTypes < 1) return;

    const startOption = shippingTypes[0].getOptionDom(0, true);
    selectDom.appendChild(startOption);

    if (totalShippingTypes < 2) return;

    for (
        let currentOption = 1;
        currentOption < totalShippingTypes;
        currentOption++
    ) {
        const startOption =
            shippingTypes[currentOption].getOptionDom(currentOption);
        selectDom.appendChild(startOption);
    }

    selectDom.addEventListener("change", function () {
        updateTotalPrice();
    });
}

function insertItems() {
    items.forEach((element, index) => {
        const rowDom = element.getAsRow(
            deleteHookFunction,
            inputChangeHookFunction
        );
        itemsMap.set(element, rowDom);
        tbodyDom.appendChild(rowDom);
    });
}

function deleteHookFunction(element) {
    itemsMap.delete(element);
    updateEssentials();
}

function inputChangeHookFunction() {
    updateEssentials();
}

function updateItemsCount() {
    let totalItems = 0;

    for (const [key, value] of itemsMap.entries()) {
        totalItems += value.getCountText();
    }

    itemsCount = totalItems;
    shoppingItemsCount.textContent = totalItems + " items";
    summaryItemsCount.textContent = "ITEMS" + totalItems;
}

function updateEssentials() {
    let totalItems = 0;
    let totalPrice = 0;

    for (const [key, value] of itemsMap.entries()) {
        const countValues = key.getCountText();
        totalItems += countValues;
        totalPrice += parseFloat(key.getPrice()) * countValues;
    }

    itemsCount = totalItems;
    itemsPrice = totalPrice;

    shoppingItemsCountDom.textContent = totalItems + " items";
    summaryItemsCountDom.textContent = "ITEMS " + totalItems;
    summaryPriceCountDom.innerHTML = formPrice(itemsPrice);

    updateTotalPrice();
}

function updateTotalPrice() {
    let shippingType = shippingTypes[selectDom.selectedIndex];
    let totalPrice = parseFloat(shippingType.getPrice()) + itemsPrice;

    totalPriceDom.innerHTML = formPrice(totalPrice);
}

function formPrice(value) {
    return "&euro;" + parseFloat(value).toFixed(2);
}
