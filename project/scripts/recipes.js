document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    const categoryUrl = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
    const ingredientUrl = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";

    const searchBar = document.getElementById("search-bar");
    const categoryFilter = document.getElementById("category-filter");
    const ingredientFilter = document.getElementById("ingredient-filter");
    const searchBtn = document.getElementById("search-btn");
    const recipeResults = document.getElementById("recipe-results");
    const recipeModal = document.getElementById("recipe-modal");
    const closeModal = document.getElementById("close-modal");

    async function fetchRecipes(query = "") {
        try {
            const response = await fetch(`${apiUrl}${query}`);
            const data = await response.json();
            if (!data.meals) {
                recipeResults.innerHTML = "<p>No recipes found.</p>";
                return;
            }
    
            // Get selected filter values
            const selectedCategory = categoryFilter.value;
            const selectedIngredient = ingredientFilter.value;
    
            // Apply filtering logic
            let filteredRecipes = data.meals.filter(recipe => {
                const matchesCategory = selectedCategory === "" || recipe.strCategory === selectedCategory;
                const matchesIngredient = selectedIngredient === "" || Object.values(recipe).includes(selectedIngredient);
                return matchesCategory && matchesIngredient;
            });
    
            displayRecipes(filteredRecipes);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    }
    

    function displayRecipes(recipes) {
        recipeResults.innerHTML = "";
        
        if (!recipes || recipes.length === 0) {
            recipeResults.innerHTML = "<p>No recipes found.</p>";
            return;
        }
    
        recipes.forEach((recipe, index) => {
            if (!recipe.strMealThumb) {
                console.warn(`Skipping recipe: ${recipe.strMeal} (No Image)`);
                return; // Skip this recipe if there's no image
            }
    
            const recipeCard = document.createElement("div");
            recipeCard.classList.add("recipe-card");
            recipeCard.style.setProperty("--index", index + 1); // Set CSS variable dynamically
            recipeCard.innerHTML = `
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="recipe-img" loading="lazy">
                <h4 class="recipe-title">${recipe.strMeal}</h4>
                <p class="recipe-summary">Category: ${recipe.strCategory}</p>
            `;
            recipeCard.addEventListener("click", () => openModal(recipe));
            recipeResults.appendChild(recipeCard);
        });
    }
    

    async function fetchFilters() {
        try {
            const categoryResponse = await fetch(categoryUrl);
            const ingredientResponse = await fetch(ingredientUrl);
            const categoryData = await categoryResponse.json();
            const ingredientData = await ingredientResponse.json();

            populateFilter(categoryFilter, categoryData.meals, "strCategory");
            populateFilter(ingredientFilter, ingredientData.meals, "strIngredient");
        } catch (error) {
            console.error("Error fetching filters:", error);
        }
    }

    function populateFilter(filterElement, items, key) {
        items.forEach(item => {
            const option = document.createElement("option");
            option.value = item[key];
            option.textContent = item[key];
            filterElement.appendChild(option);
        });
    }

    function openModal(recipe) {
        document.getElementById("modal-img").src = recipe.strMealThumb;
        document.getElementById("modal-title").textContent = recipe.strMeal;
        document.getElementById("modal-ingredients").innerHTML = generateIngredientList(recipe);
        document.getElementById("modal-instructions").textContent = recipe.strInstructions;
        document.getElementById("modal-video").href = recipe.strYoutube || "#";
        recipeModal.showModal();
    }

    function generateIngredientList(recipe) {
        let ingredients = "";
        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${i}`];
            const measure = recipe[`strMeasure${i}`];
            if (ingredient) {
                ingredients += `<li>${measure} ${ingredient}</li>`;
            }
        }
        return ingredients;
    }

    closeModal.addEventListener("click", () => recipeModal.close());
    searchBtn.addEventListener("click", () => fetchRecipes(searchBar.value));

        // Close modal when clicking outside of it
    recipeModal.addEventListener("click", (event) => {
        if (event.target === recipeModal) {
            recipeModal.close();
        }
    });

    fetchRecipes();
    fetchFilters();
});
