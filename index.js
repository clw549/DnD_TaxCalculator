
function inputFilter() {
    return {
        name: document.getElementById('name').value,
        gold: parseFloat(document.getElementById('gold').value),
        silver: parseFloat(document.getElementById('silver').value),
        copper: parseFloat(document.getElementById('copper').value),
        marital_status: document.getElementById('marital_status').value
    };
}

function validateFilter(data) {
    if (isNaN(data.name)) {
        throw new Error("Invalid character name");
    }
    if (isNaN(data.gold) || data.gold < 0) {
        throw new Error("Invalid gold amount");
    }
    if (isNaN(data.silver) || data.silver < 0) {
        throw new Error("Invalid silver amount");
    }
    if (isNaN(data.copper) || data.copper < 0) {
        throw new Error("Invalid copper amount");
    }
    return data;
}

function wealthCalculationFilter(data) {
    data.totalWealth = data.gold * 100 + data.silver * 10 + data.copper;
    return data;
}

function taxCalculationFilter(data) {
    const taxRates = {
        single: 0.2,
        married: 0.1
    };
    data.taxedWealth = data.totalWealth * (taxRates[data.marital_status]);
    return data;
}

function denominationFilter(data) {
    data.taxedGold = Math.round(data.taxedWealth / 100);
    data.taxedSilver = Math.round((data.taxedWealth % 100) / 10);
    data.taxedCopper = Math.rounc(data.taxedWealth % 10);
    return data;
}

function formatFilter(data) {
    return `${data.name}, who is ${data.marital_status}, owes ${data.taxedGold} gold, ${data.taxedSilver} silver, and ${data.taxedCopper} copper in taxes.`;
}

function outputFilter(resultText) {
    document.getElementById('result').innerText = resultText;
}


function runPipeline() {
    try {
        const result = [inputFilter, validateFilter, wealthCalculationFilter, taxCalculationFilter, denominationFilter, formatFilter]
        .reduce((data, filter) => filter(data), null);
        outputFilter(result);
    } catch (err) {
        outputFilter("Error: " + err.message);
    }
}