const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    // console.table(data.prophets); // temporary testing of data response
    displayProphets(data.prophets);
  }

  const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
      // Create elements to add to the div.cards element
      let card = document.createElement('section');
      let fullName = document.createElement('h2'); // fill in the blank
      let portrait = document.createElement('img');
      let dateOfBirth = document.createElement('p');
      let placeOfBirth = document.createElement('p');

  
      // Build the h2 and p contents out to show the prophet's full name, date of birth and place of birth
      fullName.textContent = `${prophet.name} ${prophet.lastname}`; // fill in the blank
      dateOfBirth.textContent = `Date of Birth: ${prophet.birthdate}`;
      placeOfBirth.textContent = `Place of Birth: ${prophet.birthplace}`;
      // Build the image portrait by setting all the relevant attributes
      portrait.setAttribute('src', prophet.imageurl);
      portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`); // fill in the blank
      portrait.setAttribute('loading', 'lazy');
      portrait.setAttribute('width', '200');
      portrait.setAttribute('height', '180');
  
      // Append the section(card) with the created elements
      card.appendChild(fullName); //fill in the blank
      card.appendChild(dateOfBirth);
      card.appendChild(placeOfBirth);
      card.appendChild(portrait);
  
      cards.appendChild(card);
    }); // end of arrow function and forEach loop
  }


getProphetData();


