const modal = document.querySelector(".form_parent");
const showModal = () => {
  console.log("show modal");

  modal.classList.add("showModal");
};

const hideModal = () => {
  console.log("hide modal");

  modal.classList.remove("showModal");
};
