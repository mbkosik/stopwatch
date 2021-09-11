const infoBtn = document.querySelector(".fa-question");
const modalCloseBtn = document.querySelector(".modal__close");
const modal = document.querySelector(".shadow__modal");

const showModal = (e) => {
    if (e.target === infoBtn) {
        modal.classList.add("active");
    } else if (e.target === modalCloseBtn) {
        modal.classList.remove("active");
    }
}

window.addEventListener("click", showModal);