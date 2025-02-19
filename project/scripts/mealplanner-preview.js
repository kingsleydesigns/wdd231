document.addEventListener("DOMContentLoaded", () => {
    fetchMealPlan();
    setupMealPlanObserver();
});

function fetchMealPlan() {
    const mealPlanBody = document.getElementById("meal-plan-body");
    mealPlanBody.innerHTML = "";
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let mealPromises = days.map(() => fetch("https://www.themealdb.com/api/json/v1/1/random.php").then(res => res.json()));

    Promise.all(mealPromises)
        .then(mealDataArray => {
            mealDataArray.forEach((data, index) => {
                if (data.meals) {
                    const meal = data.meals[0];
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${days[index]}</td>
                        <td>${meal.strMeal}</td>
                        <td>${meal.strCategory}</td>
                    `;
                    row.style.animationDelay = `${index * 0.2}s`;
                    row.classList.add("fade-in-scale");
                    mealPlanBody.appendChild(row);
                }
            });
        })
        .catch(error => console.error("Error fetching meal plan:", error));
}

function setupMealPlanObserver() {
    const section = document.querySelector(".table-animate");
    const rows = document.querySelectorAll(".meal-plan-table tbody tr");

    // Add the base animation class to all rows
    rows.forEach(row => row.classList.add("fade-in-slide"));

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                section.classList.add("visible");

                // Apply the 'in-view' class with a delay for each row
                rows.forEach((row, index) => {
                    setTimeout(() => {
                        row.classList.add("in-view"); // Triggers the animation
                    }, index * 150); // 150ms staggered delay
                });

                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, { threshold: 0.2 });

    rows.forEach(row => observer.observe(row)); // Observe each row individually
    observer.observe(section);
}


