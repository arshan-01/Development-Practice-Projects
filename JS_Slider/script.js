const images = [
  "https://images.unsplash.com/photo-1666919643134-d97687c1826c?ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80", // Image 1
  "https://images.unsplash.com/photo-1687186735445-df877226fae9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80", // Image 2
  "https://plus.unsplash.com/premium_photo-1687201985713-e06cad0033ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60", // Image 3
  "https://images.unsplash.com/photo-1687175452114-3a4fc0664df3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60", // Image 4
];

let currentIndex = 0;
const sliderImage = document.getElementById("sliderImage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function showImage() {
  sliderImage.src = images[currentIndex];
}

prevBtn.addEventListener("click", () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }

  showImage();
});

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex > images.length - 1) {
    currentIndex = 0;
  }

  showImage();
});

// Show initial image
showImage();
