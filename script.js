let balance = 0;

function addTransaction() {

    let desc = document.getElementById("desc").value;
    let amount = parseFloat(document.getElementById("amount").value);

    if (desc === "" || isNaN(amount)) {
        alert("Please enter valid details");
        return;
    }

    balance += amount;

    let li = document.createElement("li");
    li.textContent = desc + " : ₹ " + amount;

    document.getElementById("list").appendChild(li);

    document.getElementById("balance").textContent = balance;

    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
}
