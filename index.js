const userListingContainer = document.querySelector(".user-list");


fetch("https://reqres.in/api/users")
    .then((response) => response.json())
    .then((data) => {

        data.data.forEach((user) => {
            const userCard = createUserCard(user);
            userListingContainer.appendChild(userCard);
        });
    })
    .catch((error) => console.error("Error fetching user data:", error));

function createUserCard(userData) {


    const cardDiv = document.createElement("div");
    cardDiv.className = "user-card";
    cardDiv.onclick = () => openUserDetail(userData);

    const img = document.createElement("img");
    img.src = userData.avatar;
    img.alt = `${userData.first_name} ${userData.last_name}`;

    const right_side = document.createElement("div");
    right_side.className = "info";

    const h2 = document.createElement("h2");
    h2.textContent = `${userData.first_name} ${userData.last_name}`;

    const p = document.createElement("p");
    p.textContent = `Email: ${userData.email}`;

    cardDiv.appendChild(img);
    right_side.appendChild(h2);
    right_side.appendChild(p);
    cardDiv.appendChild(right_side);

    console.log(userData.avatar)

    return cardDiv;
}


async function openUserDetail(userData) {

    const detailPageContent = `
      <div id="user-detail">
        <img src="${userData.avatar}" alt="${userData.first_name}">
        <h2>${userData.first_name} ${userData.last_name}</h2>
        <p>Email: ${userData.email}</p>
    </div>
        <button id="downloadButton">Download</button>
    `;


    const detailPageWindow = window.open("", "_blank");
    detailPageWindow.document.write(detailPageContent);


    detailPageWindow.document.getElementById("downloadButton").addEventListener("click", function () {

            const container=detailPageWindow.document.getElementById("user-detail");


            html2canvas(container,{useCORS:true}).then((canvas) => {
                const imageDataURL = canvas.toDataURL('image/jpeg');
          
                
                const link = document.createElement('a');
                link.href = imageDataURL;
                link.download = 'page_image.jpeg';
                link.click();
              });

    });
}
