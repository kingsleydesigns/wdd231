const modal = document.querySelector('#modal');
const closeModal = document.querySelector('#close');
closeModal.addEventListener('click', () => modal.close());

const title = document.querySelector('#title');
const details = document.querySelector('#details');

// Modal 1 - not for profit
const ml1Btn = document.querySelector('#level1');
ml1Btn.addEventListener('click', () => {
    title.innerHTML = "Non Profit Membership"
    details.innerHTML = `<p>Benefits include:</p>
    <ul>
    <li>Access to general resources</li>
    <li>Invitations to networking events</li>
    <li>Monthly newsletter subscription</li>
    <li>Recognition in the member directory</li>
    </ul>
    <p>COST: Free</p>
    `
    modal.showModal();

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
});

// Modal 2 - not for profit
const ml2Btn = document.querySelector('#level2');
ml2Btn.addEventListener('click', () => {
    title.innerHTML = "Bronze Membership"
    details.innerHTML = `<p>Benefits include:</p>
    <ul>
    <li>All Non-Profit benefits</li>
    <li>Access to exclusive training sessions</li>
    <li>10% discount on event tickets</li>
    <li>Priority support</li>
    </ul>
    <p>COST: $10 annual</p>
    `
    modal.showModal();

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
});

// Modal 3 - not for profit
const ml3Btn = document.querySelector('#level3');
ml3Btn.addEventListener('click', () => {
    title.innerHTML = "Silver Membership"
    details.innerHTML = `<p>Benefits include:</p>
    <ul>
    <li>All Bronze benefits</li>
    <li>Spotlight feature on the homepage for your business/organization</li>
    <li>20% discount on event tickets</li>
    <li>Free promotional materials (e.g., brochures, banners)</li>
    <li>Access to premium workshops</li>
    </ul>
    <p>COST: $30 annual</p>
    `
    modal.showModal();

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
});

// Modal 4 - not for profit
const ml4Btn = document.querySelector('#level4');
ml4Btn.addEventListener('click', () => {
    title.innerHTML = "Gold Membership"
    details.innerHTML = `<p>Benefits include:</p>
    <ul>
    <li>All Silver benefits</li>
    <li>30% discount on event tickets</li>
    <li>Personalized business consultation services</li>
    <li>Featured business profile on social media</li>
    <li>Complimentary tickets to special events</li>
    <li>VIP access at conferences and networking events</li>
    </ul>
    <p>COST: $50 annual</p>
    `
    modal.showModal();

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
});

//ADD A HIDDEN DATE
document.querySelector('#date').value = new Date().toDateString();
document.querySelector('#time').value = new Date().toLocaleTimeString();

