
// Main section
const cards = document.querySelector('#members');
const path = './data/members.json';

async function getMembers() {
	try {
		const response = await fetch(path);
		const data = await response.json();
		// console.log(data.members);
		displayMembers(data.members);
	} catch (error) {
		console.error('Error fetching members:', error);
	}
  }
getMembers();

const displayMembers = (members) => {
    members.forEach((member) => {
	
      let name = document.createElement('h2'); // fill in the blank
      let image = document.createElement('img');
      let address = document.createElement('p');
      let phoneNumber = document.createElement('p');
	  let website = document.createElement('p');
	  let level = document.createElement('p')

	  name.textContent = member.name;
	  address.textContent = member.address;
	  phoneNumber.textContent = member.phonenumber;
	  website.innerHTML = `<a href="${member.website}" target="_blank">Website</a>`
	  
	  image.setAttribute('src', member.image);
      image.setAttribute('alt', `image for ${member.name}`); // fill in the blank
      image.setAttribute('loading', 'lazy');
      image.setAttribute('width', '200');
      image.setAttribute('height', '180');

	  if (member.level === 3) {
		level.textContent = "Level - Gold"
	  } else if (member.level === 2) {
		level.textContent = "Level - Silver"
	  } else {
		level.textContent = "Level - Member"
	  }

	const memberSection = document.createElement('section')
    memberSection.appendChild(image)
    memberSection.appendChild(name)
    memberSection.appendChild(address)
    memberSection.appendChild(phoneNumber)
	memberSection.appendChild(level)
	memberSection.appendChild(website)
    cards.appendChild(memberSection)
	});
}


const setGridLayout = document.querySelector('#gridBtn')
const setListLayout = document.querySelector('#ListBtn')
setGridLayout.addEventListener('click',() => {
  setGridLayout.className="active"
  setListLayout.className=""
  cards.className='grid'
})
setListLayout.addEventListener('click',() => {
  setListLayout.className="active"
  setGridLayout.className=""
  cards.className='list'
})

