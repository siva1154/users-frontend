const USER_API = "https://user-backend-s3bz.onrender.com/products";

// FETCH USERS
async function getUsers() {
  try {
    const res = await fetch(USER_API);
    const data = await res.json();

    const usersContainer = document.getElementById("users");
    usersContainer.innerHTML = "";

    data.forEach(user => {
      const div = document.createElement("div");
      div.innerHTML = `
        <img src="${user.image}" alt="${user.name}">
        <p>${user.name}</p>
      `;
      usersContainer.appendChild(div);
    });
  } catch (err) {
    console.error(err);
  }
}

// INITIAL LOAD
getUsers();
