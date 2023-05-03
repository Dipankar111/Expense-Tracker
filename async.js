async function saveToLocalStorage(event) {
  event.preventDefault();
  const sellingPrice = event.target.amount.value;
  const productName = event.target.product.value;
  const category = event.target.category.value;

  const obj = {
    sellingPrice,
    productName,
    category
  };
  
  try {
    const response = await axios.post("https://crudcrud.com/api/8844319ccef04bf99534c4695cb188f7/SellerPage", obj);
    showOnScreen(response.data);
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get("https://crudcrud.com/api/8844319ccef04bf99534c4695cb188f7/SellerPage");
    for (var i = 0; i < response.data.length; i++) {
      showOnScreen(response.data[i]);
    }
  } catch (error) {
    console.log(error);
  }
});

function showOnScreen(seller) {
  document.getElementById('amt').value = "";
  document.getElementById('prd').value = "";
  document.getElementById('category').value = "";
  if (localStorage.getItem(seller.productName) !== null) {
    removeUser(seller.productName);
    // editUser(seller.productName);
  }

  const parentElement = document.getElementById("users");
  const childHTML = `<li id=${seller._id}>${seller.sellingPrice} - ${seller.productName} - ${seller.category}
        <button onClick=deleteUser('${seller._id}')>Delete User</button>
        <button onClick=editUser('${seller.sellingPrice}','${seller.productName}','${seller.category}','${seller._id}')>Edit User</button>
        </li>`;

  parentElement.innerHTML = parentElement.innerHTML + childHTML;
}

async function deleteUser(sellerId) {
  try {
    await axios.delete(`https://crudcrud.com/api/8844319ccef04bf99534c4695cb188f7/SellerPage/${sellerId}`);
    removeUser(sellerId);
  } catch (error) {
    console.log(error);
  }
}

function editUser(amount, product, category, sellerId) {
  document.getElementById('amt').value = amount;
  document.getElementById('prd').value = product;
  document.getElementById('category').value = category;
  deleteUser(sellerId);
}

function removeUser(sellerId) {
  let parentElement = document.getElementById("users");
  let childElementToBeDeleted = document.getElementById(sellerId);
  if (childElementToBeDeleted) {
    parentElement.removeChild(childElementToBeDeleted)
  }
}
