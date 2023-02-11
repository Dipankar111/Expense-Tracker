function saveToLocalStorage(event) {
    event.preventDefault();
    const expenseAmount = event.target.amount.value;
    const descriptionChoose = event.target.description.value;
    const categeoryChoose = event.target.categeory.value;
    localStorage.setItem('expenseAmount', expenseAmount);
    localStorage.setItem('descriptionChoose', descriptionChoose);
    localStorage.setItem('categeoryChoose', categeoryChoose)

    const obj = {
        expenseAmount,
        descriptionChoose,
        categeoryChoose
    }
    localStorage.setItem(obj.descriptionChoose, JSON.stringify(obj))
    showNewExpenseOnScreen(obj)
}

window.addEventListener("DOMContentLoaded", () => {
    const localStorageObj = localStorage;
    const localstoragekeys  = Object.keys(localStorageObj)

    for(var i =0; i< localstoragekeys.length; i++){
        const key = localstoragekeys[i]
        const expenseDetailsString = localStorageObj[key];
        const expenseDetailsObj = JSON.parse(expenseDetailsString);
        showNewExpenseOnScreen(expenseDetailsObj)
    }
})

function showNewExpenseOnScreen(expense){
    document.getElementById('amt').value = '';
    document.getElementById('des').value = '';
    document.getElementById('categeory').value = '';
    const parentNode = document.getElementById('listOfUsers');
    const childHTML = `<li id=${expense.categeoryChoose}> ${expense.expenseAmount} - ${expense.categeoryChoose} - ${expense.descriptionChoose} 
                            <button onclick=deleteExpense('${expense.categeoryChoose}')> Delete Expense </button>
                            <button onclick=editExpense('${expense.expenseAmount}','${expense.descriptionChoose}','${expense.categeoryChoose}')> Edit Expense </button>
                         </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

// editExpense
function editExpense(amount,description,categeory){
    document.getElementById('amt').value = amount;
    document.getElementById('des').value = description;
    document.getElementById('categeory').value = categeory;
    deleteExpense(categeory)
}
// deleteExpense

function deleteExpense(categeory){
    console.log(categeory)
    localStorage.removeItem(categeory);
    removeExpenseFromScreen(categeory);

}

function removeExpenseFromScreen(categeory){
    const parentNode = document.getElementById('listOfUsers');
    const childNodeToBeDeleted = document.getElementById(categeory);
    parentNode.removeChild(childNodeToBeDeleted)
}
