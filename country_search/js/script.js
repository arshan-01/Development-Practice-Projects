const countryInput = document.getElementById("search-input");
const countryList = document.getElementById("countryList");
const selectPerPage = document.getElementById("itemsPerPageSelect");
const paginationContainer = document.getElementById("paginationContainer");
const countryModal = new mdb.Modal(document.getElementById("countryModal"));
let countryData;
let currentPage = 1;
let itemsPerPage = parseInt(selectPerPage.value);
const FvrtLists = document.getElementById("fvrtList");
const fvrt = JSON.parse(localStorage.getItem("fvrt")) || [];

// Set initial height for the FvrtLists element
FvrtLists.style.minHeight = "200px"; // Adjust the value as needed

selectPerPage.addEventListener("change", () => {
  itemsPerPage = parseInt(selectPerPage.value);
  currentPage = 1; // Reset to the first page when changing items per page
  showCountryList();
});
function openCountryModal(name) {
  const university = countryData.find(
    (countryItem) => countryItem.name === name
  );

  // Modify the modal content based on the selected university
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  // Update the modal title
  modalTitle.innerText = `University Details: ${university.name}`;

  // Update the modal body with university information
  modalBody.innerHTML = `
        <p><strong>University Name:</strong> ${university.name}</p>
        <p><strong>Country:</strong> ${university.country}</p>
        <p><strong>State/Province:</strong> ${university["state-province"]}</p>
      
      `;

  // Open the modal
  countryModal.show();
}
function openFvrtModal(name) {
  const university = fvrt.find((countryItem) => countryItem.name === name);

  // Modify the modal content based on the selected university
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  // Update the modal title
  modalTitle.innerText = `University Details: ${university.name}`;

  // Update the modal body with university information
  modalBody.innerHTML = `
        <p><strong>University Name:</strong> ${university.name}</p>
        <p><strong>Country:</strong> ${university.country}</p>
        <p><strong>State/Province:</strong> ${university["state-province"]}</p>
      
      `;

  // Open the modal
  countryModal.show();
}
const removeFromFvrt = (countryName) => {
  const index = fvrt.findIndex((item) => item.name === countryName);
  if (index !== -1) {
    fvrt.splice(index, 1);
    localStorage.setItem("fvrt", JSON.stringify(fvrt));
    showFvrtList();
    showCountryList();
  }
};
const moveFvrtUp = (countryName) => {
  const index = fvrt.findIndex((item) => item.name === countryName);
  if (index > 0) {
    const temp = fvrt[index - 1];
    fvrt[index - 1] = fvrt[index];
    fvrt[index] = temp;
    localStorage.setItem("fvrt", JSON.stringify(fvrt));
    showFvrtList();
  }
};

const moveFvrtDown = (countryName) => {
  const index = fvrt.findIndex((item) => item.name === countryName);
  if (index < fvrt.length - 1) {
    const temp = fvrt[index + 1];
    fvrt[index + 1] = fvrt[index];
    fvrt[index] = temp;
    localStorage.setItem("fvrt", JSON.stringify(fvrt));
    showFvrtList();
  }
};
const moveToTop = (countryName) => {
  const index = fvrt.findIndex((item) => item.name === countryName);
  if (index > 0) {
    const temp = fvrt[index];
    fvrt.splice(index, 1);
    fvrt.unshift(temp);
    localStorage.setItem("fvrt", JSON.stringify(fvrt));
    showFvrtList();
  }
};

const moveToBottom = (countryName) => {
  const index = fvrt.findIndex((item) => item.name === countryName);
  if (index < fvrt.length - 1) {
    const temp = fvrt[index];
    fvrt.splice(index, 1);
    fvrt.push(temp);
    localStorage.setItem("fvrt", JSON.stringify(fvrt));
    showFvrtList();
  }
};

//
const showFvrtList = () => {
  FvrtLists.innerHTML =
    fvrt && fvrt.length > 0
      ? fvrt
          .map(
            (fvrtItem, index) => `
        <li class="list-group-item px-3">
          <span class="fw-bold cursor-pointer">${fvrtItem.name} </span>
          <br />
          <br />
          <div class="d-flex justify-content-between">
            <button type="button" class="btn btn-danger" onclick="removeFromFvrt('${
              fvrtItem.name
            }')">
              <i class="fas fa-trash"></i> Remove
            </button>
            <div>
              ${
                index !== 0
                  ? `<button type="button" class="btn btn-secondary" onclick="moveFvrtUp('${fvrtItem.name}')">
                      <i class="fas fa-arrow-up"></i>
                    </button>`
                  : ""
              }
              ${
                index !== fvrt.length - 1
                  ? `<button type="button" class="btn btn-secondary" onclick="moveFvrtDown('${fvrtItem.name}')">
                      <i class="fas fa-arrow-down"></i>
                    </button>`
                  : ""
              }
              ${
                index !== 0
                  ? `<button type="button" class="btn btn-secondary" onclick="moveToTop('${fvrtItem.name}')">
                      Top
                    </button>`
                  : ""
              }
              ${
                index !== fvrt.length - 1
                  ? `<button type="button" class="btn btn-secondary" onclick="moveToBottom('${fvrtItem.name}')">
                      Bottom
                    </button>`
                  : ""
              }
              <button type="button" class="btn btn-success" onclick="openFvrtModal('${
                fvrtItem.name
              }')">
                <i class="fas fa-info-circle"></i> Details
              </button>
            </div>
          </div>
        </li>
      `
          )
          .join("")
      : "Wishlist is empty";

  // Reset the initial height if the wishlist is not empty
  if (fvrt && fvrt.length > 0) {
    FvrtLists.style.minHeight = "auto";
  }
};

showFvrtList();

// Event listener for the "Next" button
document.getElementById("nextBtn").addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    showCountryList();
  }
});

// Event listener for the "Previous" button
document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    showCountryList();
  }
});

const getUniversity = async () => {
  try {
    const response = await fetch(
      `http://universities.hipolabs.com/search?country=${countryInput.value}`
    );
    countryData = await response.json();

    if (countryData.length === 0) {
      showNoUniversitiesMessage();
    } else {
      // Reset pagination and currentPage when making a new search
      paginationContainer.innerHTML = "";
      currentPage = 1;
      showCountryList();
    }
  } catch (error) {
    console.error("Error fetching universities:", error);
  }
};
const isInFavorites = (countryName) => {
  return fvrt.some((fvrtItem) => fvrtItem.name === countryName);
};
const AddToFvrt = (countryItem) => {
  const fvrtList = fvrt.find((fvrtItem) => fvrtItem.name === countryItem);
  if (fvrtList) {
    alert("Already added to favorites");
  } else {
    fvrt.push(countryData.find((item) => item.name === countryItem));
    localStorage.setItem("fvrt", JSON.stringify(fvrt));
    showFvrtList();
    showCountryList();
  }
};

const showNoUniversitiesMessage = () => {
  countryList.innerHTML = `<li class="list-group-item">No universities found for the provided country.</li>`;
  paginationContainer.innerHTML = ""; // Clear pagination when no universities found
};

const showCountryList = () => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const universitiesToShow = countryData.slice(startIndex, endIndex);

  countryList.innerHTML = universitiesToShow
    .map(
      (countryItem) => `
        <li class="list-group-item px-3 d-flex justify-content-between align-items-center">
          <span class="fw-bold cursor-pointer" onclick="openCountryModal('${
            countryItem.name
          }')">${countryItem.name} in</span>
          <i class="far fa-heart cursor-pointer ${
            isInFavorites(countryItem.name) ? "fav-heart" : ""
          }" onclick="${
        isInFavorites(countryItem.name)
          ? `removeFromFvrt('${countryItem.name}')`
          : `AddToFvrt('${countryItem.name}')`
      }"></i>

        </li>
      `
    )
    .join("");

  // Remove existing pagination and create new one
  paginationContainer.innerHTML = createPagination();
};

const createPagination = () => {
  const totalPages = Math.ceil(countryData.length / itemsPerPage);

  return `
    ${currentPage > 1 ? createPaginationItem("Previous", currentPage - 1) : ""}
    ${
      currentPage < totalPages
        ? createPaginationItem("Next", currentPage + 1)
        : ""
    }
  `;
};

const createPaginationItem = (label, page) => {
  return `
    <a href="#" class="page-link" onclick="setCurrentPage(${page})">${label}</a>
  `;
};

const setCurrentPage = (page) => {
  currentPage = page;
  showCountryList();
};
