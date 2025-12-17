const PRODUCT_API = "https://user-backend-s3bz.onrender.com/products";

// FETCH PRODUCTS
async function getProducts() {
  try {
    const res = await fetch(PRODUCT_API);
    const data = await res.json();

    const list = document.getElementById("list");
    list.innerHTML = "";

    data.forEach(p => {
      const div = document.createElement("div");
      div.innerHTML = `
        <p><strong>ID:</strong> ${p.id} | <strong>Name:</strong> ${p.name}</p>
      `;

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.onclick = () => editProduct(p.id, p.name, p.image);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = () => deleteProduct(p.id);

      div.appendChild(editBtn);
      div.appendChild(deleteBtn);
      div.appendChild(document.createElement("hr"));

      list.appendChild(div);
    });
  } catch (err) {
    console.error(err);
  }
}

// ADD PRODUCT
async function addProduct(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const image = document.getElementById("image").value;

  await fetch(PRODUCT_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, image })
  });

  alert("Product added successfully!");
  event.target.reset();
  getProducts();
}

// DELETE PRODUCT
async function deleteProduct(id) {
  await fetch(`${PRODUCT_API}/${id}`, { method: "DELETE" });
  alert("Product deleted");
  getProducts();
}

// EDIT PRODUCT
async function editProduct(id, oldName, oldImage) {
  const newName = prompt("Edit product name:", oldName);
  if (!newName) return;

  const newImage = prompt("Edit image URL:", oldImage);
  if (!newImage) return;

  await fetch(`${PRODUCT_API}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newName, image: newImage })
  });

  alert("Product updated");
  getProducts();
}

// INITIAL LOAD
getProducts();
