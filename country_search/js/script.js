const countryInput = document.getElementById("search-input");
const countryList = document.getElementById("countryList");
const selectPerPage = document.getElementById("itemsPerPageSelect");
const paginationContainer = document.getElementById("paginationContainer");
const countryModal = new mdb.Modal(document.getElementById("countryModal"));
let countryData;
let currentPage = 1;
let itemsPerPage = parseInt(selectPerPage.value);

selectPerPage.addEventListener("change", () => {
  itemsPerPage = parseInt(selectPerPage.value);
  currentPage = 1; // Reset to the first page when changing items per page
  showCountryList();
});

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
          <span class="fw-bold cursor-pointer" onclick="openCountryModal('${countryItem.name}')">${countryItem.name} in</span>
          <i class="far fa-heart cursor-pointer"></i>
        </li>
      `
    )
    .join("");

  // Remove existing pagination and create new one
  paginationContainer.innerHTML = createPagination();
};

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
