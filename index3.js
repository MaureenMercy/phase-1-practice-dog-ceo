document.addEventListener('DOMContentLoaded', () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const imageContainer = document.getElementById('dog-image-container');
    const breedList = document.getElementById('dog-breeds');
    const breedDropdown = document.getElementById('breed-dropdown');

    // Fetch and render dog images
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            data.message.forEach(imageUrl => {
                const img = document.createElement('img');
                img.src = imageUrl;
                img.style.width = '200px';  // Optional: set a consistent width
                imageContainer.appendChild(img);
            });
        })
        .catch(error => console.error('Error fetching dog images:', error));

    // Fetch and render dog breeds
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            const breeds = Object.keys(data.message);
            renderBreeds(breeds);
            addBreedClickListener();
            addBreedFilterListener();
        })
        .catch(error => console.error('Error fetching dog breeds:', error));

    function renderBreeds(breeds) {
        breedList.innerHTML = '';  // Clear existing list
        breeds.forEach(breed => {
            const li = document.createElement('li');
            li.textContent = breed;
            breedList.appendChild(li);
        });
    }

    function addBreedClickListener() {
        breedList.addEventListener('click', (event) => {
            if (event.target.tagName === 'LI') {
                event.target.style.color = 'blue';  // Change color when clicked
            }
        });
    }

    function addBreedFilterListener() {
        breedDropdown.addEventListener('change', (event) => {
            const selectedLetter = event.target.value;
            fetch(breedUrl)
                .then(response => response.json())
                .then(data => {
                    const allBreeds = Object.keys(data.message);
                    const filteredBreeds = allBreeds.filter(breed => 
                        breed.startsWith(selectedLetter)
                    );
                    renderBreeds(filteredBreeds);
                })
                .catch(error => console.error('Error filtering breeds:', error));
        });
    }
});