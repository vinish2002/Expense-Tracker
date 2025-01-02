
const expenseForm = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const totalAmountElement = document.getElementById("total-amount");

// Initialize expenses array from localStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Function to render expenses in tabular form
function renderExpenses() {
	expenseList.innerHTML = "";
	let totalAmount = 0; // Initialize total amount 
	for (let i = 0; i < expenses.length; i++) {
		const expense = expenses[i];
		const expenseRow = document.createElement("tr");
		expenseRow.innerHTML = ` 
	<td>${expense.name}</td> 
	<td>₹${expense.amount}</td>
	<td class="delete-btn" data-id="₹{i}">Delete</td> 
	`;
		expenseList.appendChild(expenseRow);
		totalAmount += expense.amount;
	}
	totalAmountElement.textContent = totalAmount.toFixed(2);
	localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Function to add expense 
function addExpense(event) {
	event.preventDefault();
	const expenseNameInput = document.getElementById("expense-name");
	const expenseAmountInput = document.getElementById("expense-amount");
	const expenseName = expenseNameInput.value;
	const expenseAmount = parseFloat(expenseAmountInput.value);

	expenseNameInput.value = "";
	expenseAmountInput.value = "";


	if (expenseName === "" || isNaN(expenseAmount)) {
		alert("Please enter valid expense details.");
		return;
	}
	const expense = { name: expenseName, amount: expenseAmount, };
	expenses.push(expense);
	renderExpenses();
}

// Function to delete expense 
function deleteExpense(event) {
	if (event.target.classList.contains("delete-btn")) {
		const expenseIndex = parseInt(event.target.getAttribute("data-id")); // Get expense index from data-id attribute

		expenses.splice(expenseIndex, 1); // Remove expense from expenses array

		renderExpenses(); // Render expenses
	}
}

// Add event listeners 
expenseForm.addEventListener("submit", addExpense);
expenseList.addEventListener("click", deleteExpense);

renderExpenses(); // Render initial expenses on page load