let blackboard = {};

function collectInputs() {
    blackboard.name = document.getElementById("name").value;
    blackboard.gold = parseInt(document.getElementById("gold").value) || 0;
    blackboard.silver = parseInt(document.getElementById("silver").value) || 0;
    blackboard.copper = parseInt(document.getElementById("copper").value) || 0;
    blackboard.maritalStatus = document.getElementById("maritalStatus").value;

    //This was to check if the input was working correctly when i inputed values 
    console.log("file is connected and running :))"); //open inspect
}

function calculateTotalWealth() {
    blackboard.total_copper = (blackboard.gold * 100) + (blackboard.silver * 10) + blackboard.copper;
    blackboard.total_gold_equivalent = blackboard.total_copper / 100;
}

function calculateTax() {
    let rate = blackboard.maritalStatus === "married" ? 0.10 : 0.2;
    blackboard.tax_due = blackboard.total_gold_equivalent * rate;
}

function displayResults() {
    const taxDiv = document.getElementById("tax_results");
    taxDiv.innerHTML = 
    `   <h2>Results for ${blackboard.name}</h2>
        <p>Total Wealth: ${blackboard.total_gold_equivalent.toFixed(2)} gold pieces</p>
        <p>Tax Due (${blackboard.maritalStatus}): ${blackboard.tax_due.toFixed(2)} gold pieces</p>`;
}

function blackboardController() {
    collectInputs();
    calculateTotalWealth();
    calculateTax();
    displayResults();
}

function runBlackboardController() {
    blackboardController();
}