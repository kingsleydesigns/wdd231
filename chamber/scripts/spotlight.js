const spotlight = document.querySelector('#spotlight');

const path = './data/members.json';

async function getMembers() {
  const response = await fetch(path);
  const data = await response.json();
  const payingmembers = data.members.filter(member => member.level > 1);
  displayMembers(payingmembers)
}

getMembers();

  const displayMembers = (myArray) => {
    for (let step = 0; step < 3; step++) {
    const random = Math.floor(Math.random() * myArray.length);
    //console.log(random)
    let picked = myArray[random];
    myArray.splice(random, 1);
    //console.log(picked)
    //console.log(myArray)
    showOnPage(picked)
    } // end loop
  }// end display members

  function showOnPage(x) {
    //console.log(x)
    const sl= document.createElement('div')

    const name= document.createElement('h2')
    name.innerHTML = x.name
    sl.appendChild(name)

    const photo= document.createElement('img')
    photo.src = x.image
    photo.alt=x.name
    sl.appendChild(photo)

    const phone= document.createElement('p')
    phone.innerHTML = x.phonenumber
    sl.appendChild(phone)

    const address= document.createElement('p')
    address.innerHTML = x.address
    sl.appendChild(address)

    const level = document.createElement('p')
    level.innerHTML = `Member - Level ${x.level}`
    sl.appendChild(level)

    const link= document.createElement('a')
    link.href = x.website
    link.textContent="Website"
    link.target="_blank"
    sl.appendChild(link)
    
    spotlight.appendChild(sl)
  }