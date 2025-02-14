const path = './data/places.json';

async function getPlaces() {
  try {
    const response = await fetch(path);
    const data = await response.json();
    // console.log(data.places)
    displayPlaces(data.places);
    showVisitMessage();
  } catch (error) {
    console.error('Error fetching places:', error);
  }
}

function displayPlaces(places) {
  const showHere = document.querySelector("#allplaces");
  places.forEach(place => {
    const card = document.createElement('div');
    card.classList.add('card');

    const image = document.createElement('img');
    image.src = `images/${place.photo_link}`;
    image.alt = place.name;
    image.loading = "lazy";
    card.appendChild(image);

    const title = document.createElement('h2');
    title.textContent = place.name;
    card.appendChild(title);

    const address = document.createElement('address');
    address.textContent = place.address;
    card.appendChild(address);

    const description = document.createElement('p');
    description.textContent = place.description;
    card.appendChild(description);

    const button = document.createElement('button');
    button.textContent = "Learn More";
    card.appendChild(button);

    showHere.appendChild(card);
  });
}

function showVisitMessage() {
  const messageElement = document.querySelector("#visitMessage");
  const lastVisit = localStorage.getItem('lastVisit');
  const currentVisit = Date.now();

  if (!lastVisit) {
    messageElement.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const daysSinceLastVisit = Math.floor((currentVisit - lastVisit) / (1000 * 60 * 60 * 24));
    if (daysSinceLastVisit < 1) {
      messageElement.textContent = "Back so soon! Awesome!";
    } else if (daysSinceLastVisit === 1) {
      messageElement.textContent = "You last visited 1 day ago.";
    } else {
      messageElement.textContent = `You last visited ${daysSinceLastVisit} days ago.`;
    }
  }

  localStorage.setItem('lastVisit', currentVisit);
}

getPlaces();
