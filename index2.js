// Constants
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

// DOM Elements
const imageContainer = document.getElementById('dog-image-container');
const breedList = document.getElementById('dog-breeds');

// Fetch and display dog images
function fetchDogImages() {
  fetch(imgUrl)
    .then(response => response.json())
    .then(data => {
      data.message.forEach(imageUrl => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Random dog';
        img.style.width = '200px';  // Optional: set a fixed width
        imageContainer.appendChild(img);
      });
    })
    .catch(error => console.error('Error fetching dog images:', error));
}

// Fetch and display dog breeds
function fetchDogBreeds() {
  fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
      const breeds = Object.keys(data.message);
      displayBreeds(breeds);
    })
    .catch(error => console.error('Error fetching dog breeds:', error));
}

// Display breeds in the list
function displayBreeds(breeds) {
  breeds.forEach(breed => {
    const li = document.createElement('li');
    li.textContent = breed;
    breedList.appendChild(li);
  });
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  fetchDogImages();
  fetchDogBreeds();
});