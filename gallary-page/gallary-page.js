import { galleryImages } from './images-data.js';

const galleryContainer = document.querySelector('.gallary-cards');
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");
const closeModal = document.getElementById("closeModal");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = -1;

galleryContainer.innerHTML = galleryImages.map((image, index) => `
  <div class="images-card" data-index="${index}">
    <img src="${image.src}" alt="${image.title}" loading="lazy">
    <div class="overlay">
      <div class="image-title">${image.title}</div>
      <div class="image-description">${image.description}</div>
    </div>
  </div>
`).join('');

function openModal(index) {
  if (index < 0 || index >= galleryImages.length) return;
  currentIndex = index;
  const imgData = galleryImages[index];
  modal.style.display = "block";
  modalImg.src = imgData.src;
  modalCaption.textContent = imgData.title || "";
}

function closeModalFn() {
  modal.style.display = "none";
  currentIndex = -1;
}

function showPrev() {
  if (currentIndex > 0) openModal(currentIndex - 1);
  else openModal(galleryImages.length - 1); 
}
function showNext() {
  if (currentIndex < galleryImages.length - 1) openModal(currentIndex + 1);
  else openModal(0); 
}



galleryContainer.addEventListener('click', (e) => {
  const img = e.target.closest('img');
  if (!img) return;

  const card = e.target.closest('.images-card');
  const index = parseInt(card.getAttribute("data-index"), 10);
  openModal(index);
});

closeModal.addEventListener('click', closeModalFn);
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModalFn();
});

document.addEventListener('keydown', (e) => {
  if (modal.style.display !== "block") return;
  if (e.key === "Escape") closeModalFn();
  if (e.key === "ArrowLeft") showPrev();
  if (e.key === "ArrowRight") showNext();
});
