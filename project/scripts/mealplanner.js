document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#meal-planner-form form");
    const tableHead = document.querySelector("#weekly-meal-plan thead tr");
    const tableBody = document.querySelector("#weekly-meal-plan tbody");
    const savePlanBtn = document.querySelector("#save-plan");
    const printPlanBtn = document.querySelector("#print-plan");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent default form submission

        // Extract user inputs
        const name = document.querySelector("#name").value;
        const email = document.querySelector("#email").value;
        const diet = document.querySelector("#diet").value;
        const cuisine = document.querySelector("#cuisine").value;
        const date = document.querySelector("#date").value;
        const mealTypes = Array.from(document.querySelectorAll("input[name='mealType']:checked"))
            .map(input => input.value);

        // Open thank you page in new tab with GET parameters
        const params = new URLSearchParams({ name, email, diet, cuisine, mealTypes, date }).toString();
        window.open("thankyou.html?" + params, "_blank");

        // Generate meal plan
        generateMealPlan(diet, cuisine, mealTypes);
    });

    async function generateMealPlan(diet, cuisine, mealTypes) {
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const defaultMeals = {
            breakfast: ["Oatmeal", "Pancakes", "Fruit Salad", "Scrambled Eggs", "Smoothie Bowl", "Avocado Toast", "Granola with Yogurt"],
            lunch: ["Grilled Chicken", "Vegetable Stir-fry", "Pasta", "Quinoa Salad", "Sandwich & Soup", "Buddha Bowl", "Sushi Rolls"],
            dinner: ["Salmon with Rice", "Soup", "Veggie Tacos", "Spaghetti Bolognese", "Curry with Naan", "Stuffed Peppers", "Grilled Fish & Veggies"]
        };

        tableHead.innerHTML = ""; // Clear table header
        tableBody.innerHTML = ""; // Clear previous entries

        let fetchedMeals = {}; // To store meals from API

        // Fetch meals from TheMealDB if a preference is selected
        if (diet || cuisine) {
            for (let mealType of mealTypes) {
                fetchedMeals[mealType] = await fetchMealFromAPI(diet, cuisine);
            }
        }

        // Construct the table headers dynamically based on selected meal types
        let headerRow = "<th>Day</th>";
        mealTypes.forEach(meal => {
            headerRow += `<th>${meal.charAt(0).toUpperCase() + meal.slice(1)}</th>`;
        });
        tableHead.innerHTML = headerRow;

        // Generate table rows dynamically based on selected meal types
        days.forEach(day => {
            let row = `<tr><td>${day}</td>`;
            mealTypes.forEach(meal => {
                let mealOptions = fetchedMeals[meal] && fetchedMeals[meal].length ? fetchedMeals[meal] : defaultMeals[meal];
                const randomMeal = mealOptions[Math.floor(Math.random() * mealOptions.length)];
                row += `<td>${randomMeal}</td>`;
            });
            row += "</tr>";
            tableBody.innerHTML += row;
        });

        // Save meal plan to local storage
        localStorage.setItem("mealPlan", JSON.stringify({ header: tableHead.innerHTML, body: tableBody.innerHTML }));
    }

    async function fetchMealFromAPI(diet, cuisine) {
        try {
            let apiUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?";
            if (cuisine) {
                apiUrl += `a=${cuisine}`; // Filter by area (cuisine)
            } else if (diet) {
                apiUrl += `c=${diet}`; // Filter by category (diet)
            }

            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.meals) {
                return data.meals.map(meal => meal.strMeal); // Extract meal names
            }
        } catch (error) {
            console.error("Error fetching meals:", error);
        }
        return []; // Return empty array if API fails
    }

    // Load saved meal plan on page load
    const savedMealPlan = JSON.parse(localStorage.getItem("mealPlan"));
    if (savedMealPlan) {
        tableHead.innerHTML = savedMealPlan.header;
        tableBody.innerHTML = savedMealPlan.body;
    }

    // Save and Print event listeners
    savePlanBtn.addEventListener("click", function () {
        alert("Meal plan saved successfully!");
    });

    printPlanBtn.addEventListener("click", function () {
        window.print();
    });

    // Auto-fill the date field
    document.querySelector('#date').value = new Date().toDateString();
});
