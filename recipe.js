const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');





// getting recipes with js function 


const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    recipeContainer.innerHTML = "";



    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `<img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span></p>
        <p>Belongs to <span>${meal.strCategory}</sapn>Categor</p>
        `


        const button = document.createElement('button');
        button.textContent = 'View Recipe';
        recipeDiv.appendChild(button);

        //adding eventlistener to recipe button 
        button.addEventListener('click', () => {
            openRecipePopup(meal);
        });
        recipeContainer.appendChild(recipeDiv);
    });
}



//function to fetch ingredients and measurements 
const fetchIngredients = (meal) => {
    let ingredientList = "";
    for (let i = 0; i <= 20; i++) {
        const ingredien = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientList += `<li>${measure} ${ingredient}</li>`
        }
        else
            break;
    }
    return ingredientList;
}



const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
    <h2>${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul>${fetchIngredients(meal)}</ul>
    `
    recipeDetailsContent.parentElement.style.display = "block";
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
    // console.log("Button Clicked");
});  