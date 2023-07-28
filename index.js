const userListingContainer = document.querySelector(".user-list");

// Fetch user data from the API
fetch("https://reqres.in/api/users")
    .then((response) => response.json())
    .then((data) => {
        // Generate user cards dynamically based on API data
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

    return cardDiv;
}


function openUserDetail(userData) {
    // Create the detail page HTML dynamically
    const detailPageContent = `
      <div id="user-detail">
        <img src="${userData.avatar}" alt="${userData.first_name} ${userData.last_name}">
        <h2>${userData.first_name} ${userData.last_name}</h2>
        <p>Email: ${userData.email}</p>
    </div>
        <button id="downloadButton">Download</button>
    `;

    // Create a new window/tab to display the detail page
    const detailPageWindow = window.open("", "_blank");
    detailPageWindow.document.write(detailPageContent);

    // Add the download functionality
    detailPageWindow.document.getElementById("downloadButton").addEventListener("click", function () {

        setTimeout(() => {
            
            html2canvas(detailPageWindow.document.getElementById("user-detail")).then(function (canvas) {
                const base64image = canvas.toDataURL("image/jpg", 1.0);
                var anchor = document.createElement("a");
                anchor.setAttribute("href", base64image);
                anchor.setAttribute("download", "details.jpg");
                anchor.click();
                anchor.remove();
        }, 1000);

            // Trigger the image download
            // const imageDataURL = canvas.toDataURL();
            // const downloadLink = document.createElement("a");
            // downloadLink.href = imageDataURL;
            // downloadLink.download = "user_detail.png";
            // detailPageWindow.document.body.appendChild(downloadLink);
            // downloadLink.click();
            // detailPageWindow.document.body.removeChild(downloadLink);

        });
    });
}
