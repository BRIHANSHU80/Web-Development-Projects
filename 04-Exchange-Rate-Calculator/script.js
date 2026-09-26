const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");

const swapBtn = document.getElementById("swapBtn");


// Convert currency
async function convertCurrency() {

    const amountValue = Number(amount.value);

    const from = fromCurrency.value;
    const to = toCurrency.value;

    const message = document.getElementById("message");
    const resultText = document.getElementById("resultText");
    const rateText = document.getElementById("rateText");

    message.textContent = "";

    if (amountValue <= 0) {

        message.textContent = "Please enter a valid amount.";

        return;
    }

    if (from === to) {

        resultText.textContent =
            `${amountValue.toFixed(2)} ${to}`;

        rateText.textContent =
            `1 ${from} = 1 ${to}`;

        return;
    }

    try {

        rateText.textContent = "Fetching exchange rate...";

        const response = await fetch(
            `https://api.frankfurter.dev/v2/rate/${from}/${to}`
        );

        if (!response.ok) {
            throw new Error("Unable to fetch exchange rate");
        }

        const data = await response.json();

        const rate = data.rate;

        const convertedAmount = amountValue * rate;

        resultText.textContent =
            `${convertedAmount.toFixed(2)} ${to}`;

        rateText.textContent =
            `1 ${from} = ${rate.toFixed(4)} ${to}`;

    } 
    catch (error) {

        message.textContent =
            "Unable to fetch exchange rate. Please try again.";

        rateText.textContent =
            "Exchange rate unavailable";

        resultText.textContent = "0";
    }
}


// Swap currencies
swapBtn.addEventListener("click", function () {

    const temp = fromCurrency.value;

    fromCurrency.value = toCurrency.value;

    toCurrency.value = temp;

});