const apiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

// Function to fetch and display featured recipes
async function fetchFeaturedRecipes() {
  try {
    const recipesContainer = document.getElementById('featured-recipes');
    recipesContainer.innerHTML = ''; // Clear existing content

    const fetchPromises = Array.from({ length: 6 }, () => fetch(apiUrl).then(res => res.json()));

    const responses = await Promise.all(fetchPromises);
    const recipes = responses.map(response => response.meals[0]); // Extracting the meal from each response

    displayFeaturedRecipes(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
}

// Function to display the featured recipes on the homepage
function displayFeaturedRecipes(recipes) {
  const recipesContainer = document.getElementById('featured-recipes');

  recipes.forEach(recipe => {
    const recipeElement = document.createElement('div');
    recipeElement.classList.add('recipe-card'); // Matching the CSS

    recipeElement.innerHTML = `
      <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="recipe-img" loading="lazy" />
      <h4 class="recipe-title">${recipe.strMeal}</h4>
      <p class="recipe-summary">Category: ${recipe.strCategory}</p>
      <a href="recipes.html" class="recipe-link">View Recipe</a>
    `;

    recipesContainer.appendChild(recipeElement);
  });
}

// Intersection observer for featured recipe section
document.addEventListener("DOMContentLoaded", () => {
    fetchFeaturedRecipes().then(() => {
        const section = document.querySelector(".animate");
        const recipeCards = document.querySelectorAll(".recipe-card");

        if (!section) return;

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    section.classList.add("visible");

                    // Stagger animations for each card after section becomes visible
                    recipeCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add("in-view");
                        }, index * 200); // 200ms delay per card
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(section);
    });
});
