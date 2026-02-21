let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// ADD
function addTransaction() {
    let desc = document.getElementById("text").value;
    let amount = parseFloat(document.getElementById("amount").value);

    if (desc === "" || isNaN(amount)) {
        alert("Please enter valid details");
        return;
    }

    const transaction = {
        id: Date.now(),
        desc,
        amount
    };

    transactions.push(transaction);
    updateLocalStorage();
    render();
}

// DELETE
function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateLocalStorage();
    render();
}

// CLEAR
function clearAll() {
    if(confirm("Clear all transactions?")){
        transactions = [];
        updateLocalStorage();
        render();
    }
}

// STORAGE
function updateLocalStorage(){
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// RENDER
function render(){
    const list = document.getElementById("list");
    list.innerHTML = "";

    let balance = 0;
    let income = 0;
    let expense = 0;

    transactions.forEach(t => {
        const li = document.createElement("li");

        li.classList.add(t.amount < 0 ? "minus" : "plus");

        li.innerHTML = `
            ${t.desc}
            <span>₹${Math.abs(t.amount)}</span>
            <button class="delete-btn" onclick="deleteTransaction(${t.id})">x</button>
        `;

        list.appendChild(li);

        balance += t.amount;
        if(t.amount > 0) income += t.amount;
        else expense += t.amount;
    });

    document.getElementById("balance").textContent = `₹${balance}`;
    document.getElementById("money-plus").textContent = `₹${income}`;
    document.getElementById("money-minus").textContent = `₹${Math.abs(expense)}`;
}

// EVENTS
document.getElementById("form").addEventListener("submit", function(e){
    e.preventDefault();
    addTransaction();
});

document.getElementById("clear").addEventListener("click", clearAll);

// INIT
render();