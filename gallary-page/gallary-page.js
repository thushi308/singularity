import { galleryImages } from './images-data.js';

const categoryNav = document.querySelectorAll('.category-nav li');
const yearDropdowns = document.querySelectorAll('.year-dropdown');
const galleryContainer = document.getElementById('galleryContainer');

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");
const closeModal = document.getElementById("closeModal");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentCategory = 'astrophotography';
let currentYear = null;
let currentIndex = -1;
let currentImages = [];




// ----------
function populateYearDropdowns() {
  const categories = [...new Set(galleryImages.map(img => img.category))];
  categories.forEach(category => {
    const years = [...new Set(
      galleryImages.filter(img => img.category === category).map(img => img.year)
    )].sort((a, b) => b - a); // newest first

    const li = document.querySelector(`.category-nav li[data-category="${category}"]`);
    const dropdown = li.querySelector('.year-dropdown');

    dropdown.innerHTML = `<option value="all">All Time</option>`;
    years.forEach(year => {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      dropdown.appendChild(option);
    });
  });
}

// ---------
function renderGallery() {
  galleryContainer.classList.add('fade-out');

  setTimeout(() => {
    let images = galleryImages.filter(img => img.category === currentCategory);
    if (currentYear) images = images.filter(img => img.year === currentYear);

    galleryContainer.innerHTML = images.map((img, index) => `
      <div class="images-card" data-index="${index}">
        <img src="${img.src}" alt="${img.title}" loading="lazy">
        <div class="image-hover-caption">
          <span class="title">${img.title}</span>
          <span class="description">${img.description}</span>
        </div>
      </div>
    `).join('');

    document.querySelectorAll('.images-card img').forEach((imgEl, i) => {
      imgEl.addEventListener('click', () => openModal(i, images));
    });

    galleryContainer.classList.remove('fade-out');
    galleryContainer.classList.add('fade-in');

    setTimeout(() => galleryContainer.classList.remove('fade-in'), 400);
  }, 200);
}


// ----------
function openModal(index, images) {
  currentIndex = index;
  const imgData = images[index];
  modal.classList.add('show');
  modal.style.display = 'flex';
  modalImg.src = imgData.src;
  modalCaption.textContent = imgData.title + " — " + imgData.description;
  currentImages = images;
}

function closeModalFn() {
  modal.classList.remove('show');
  setTimeout(() => { modal.style.display = "none"; }, 400);
  currentIndex = -1;
}

function showPrev() {
  if (currentIndex > 0) openModal(currentIndex - 1, currentImages);
  else openModal(currentImages.length - 1, currentImages);
}

function showNext() {
  if (currentIndex < currentImages.length - 1) openModal(currentIndex + 1, currentImages);
  else openModal(0, currentImages);
}


// ------------
closeModal.addEventListener('click', closeModalFn);
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);
modal.addEventListener('click', e => { if (e.target === modal) closeModalFn(); });
document.addEventListener('keydown', e => {
  if (!modal.classList.contains('show')) return;
  if (e.key === "Escape") closeModalFn();
  if (e.key === "ArrowLeft") showPrev();
  if (e.key === "ArrowRight") showNext();
});

categoryNav.forEach(li => {
  li.addEventListener('click', () => {
    categoryNav.forEach(el => el.classList.remove('active'));
    li.classList.add('active');
    currentCategory = li.dataset.category;

    const dropdown = li.querySelector('.year-dropdown');
    currentYear = dropdown.value === 'all' ? null : parseInt(dropdown.value);

    renderGallery();
  });
});


yearDropdowns.forEach(dropdown => {
  dropdown.addEventListener('change', (e) => {
    const parentLi = e.target.closest('li');
    currentCategory = parentLi.dataset.category;
    categoryNav.forEach(el => el.classList.remove('active'));

    parentLi.classList.add('active');
    currentYear = e.target.value === 'all' ? null : parseInt(e.target.value);
    renderGallery();
  });
});



populateYearDropdowns();
renderGallery(); 

