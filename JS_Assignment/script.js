const constructionCompanyInfo = [
  {
    img: "https://images.unsplash.com/photo-1666919643134-d97687c1826c?ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
    heading: "Reliable Building & Construction Company",
    text: "We are a construction company that excels in the construction of commercial and residential buildings based on the latest construction technologies and the use of high-quality materials.",
  },
  {
    img: "https://images.unsplash.com/photo-1687186735445-df877226fae9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    heading: "Excellence in Commercial and Residential Building Construction",
    text: "Our expertise lies in the construction of commercial and residential buildings. We strive for excellence in every project, ensuring top-notch quality and customer satisfaction.",
  },
  {
    img: "https://images.unsplash.com/photo-1687175452114-3a4fc0664df3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    heading:
      "Utilizing Latest Construction Technologies and High-Quality Materials",
    text: "At our construction company, we leverage the latest construction technologies and employ high-quality materials to deliver durable and sustainable buildings that meet the highest industry standards.",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1687201985713-e06cad0033ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    heading: "Customized Solutions for Construction Projects",
    text: "We offer customized solutions tailored to meet the unique requirements of each construction project. Our team of experts ensures efficient project management and timely completion.",
  },
];

let currentIndex = 0;
const heroSection = document.getElementsByClassName("hero")[0];
const rightHero = document.getElementsByClassName("right-hero")[0];
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const constructionHeading = document.getElementById("constructionHeading");
const constructionText = document.getElementById("constructionText");

function showImage() {
  console.log(constructionCompanyInfo[currentIndex]);
  heroSection.style.backgroundImage = `url(${constructionCompanyInfo[currentIndex].img})`;
  constructionHeading.innerHTML = constructionCompanyInfo[currentIndex].heading;
  constructionText.innerHTML = constructionCompanyInfo[currentIndex].text;
}

prevBtn.addEventListener("click", () => {
  heroSection.classList.remove("fade-in");
  rightHero.style.display = "none";
  currentIndex--;
  console.log(currentIndex);
  if (currentIndex < 0) {
    currentIndex = constructionCompanyInfo.length - 1;
  }

  setTimeout(() => {
    heroSection.classList.add("fade-in");
    showImage();
  }, 100);
  // right will display block after 1 sec of page refresh
  setTimeout(() => {
    rightHero.style.display = "block";
  }, 1000);
});

nextBtn.addEventListener("click", () => {
  rightHero.style.display = "none";
  heroSection.classList.remove("fade-in");
  currentIndex++;

  if (currentIndex > constructionCompanyInfo.length - 1) {
    currentIndex = 0;
  }

  setTimeout(() => {
    heroSection.classList.add("fade-in");
    showImage();
  }, 100);
  // right will display block after 1 sec of page refresh
  setTimeout(() => {
    rightHero.style.display = "block";
  }, 1000);
});

// Show initial image
showImage();

// right will display block after 1 sec of page refresh
setTimeout(() => {
  rightHero.style.display = "block";
}, 1000);

//  Slider Testimonial\
const prev_Btn = document.getElementById("prev_Btn");
const next_Btn = document.getElementById("next_Btn");
const testi = document.getElementById("testi");
const testiPerson = document.getElementById("testi-person");
let textiCurrentIndex = 0;
const loremIpsumTexts = [
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    name: "John Doe",
  },
  {
    text: "Sed do eiusmod tempor incididunt ut quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat labore et dolore magna aliqua.",
    name: "Jane Smith",
  },
  {
    text: "Ut enim ad minim veniam, quis nostrud exercitation quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    name: "David Johnson",
  },
  {
    text: "Duis aute irure dolor in quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    name: "Emily Williams",
  },
];

function showTesti() {
  testi.innerHTML = loremIpsumTexts[textiCurrentIndex].text;
  testiPerson.innerHTML = loremIpsumTexts[textiCurrentIndex].name;
}

prev_Btn.addEventListener("click", () => {
  textiCurrentIndex--;

  if (textiCurrentIndex < 0) {
    textiCurrentIndex = loremIpsumTexts.length - 1;
  }
  showTesti();
});
next_Btn.addEventListener("click", () => {
  textiCurrentIndex++;
  if (textiCurrentIndex > loremIpsumTexts.length - 1) {
    textiCurrentIndex = 0;
  }
  showTesti();
});

// setTimeout(() => {
//   setInterval(() => {
//     textiCurrentIndex++;

//     if (textiCurrentIndex > images.length - 1) {
//       textiCurrentIndex = 0;
//     }
//     showTesti();
//   }, 2000);
// }, 1000);
showTesti();
