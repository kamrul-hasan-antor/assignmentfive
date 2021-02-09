/////// The function of Search Total Meal..........
const getMealList = () => {
  let searchInput = document.getElementById("inputSearchArea").value;
  if (searchInput == "") {
    document.getElementById("mealItems").innerHTML = `
    <div id="warningMessage" class="mt-3 mx-auto" style="background-color: #FFFFFF;">
      <h2 class="text-center">Please insert your food name..</h2>
    </div>`;
  } else {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
      .then((res) => res.json())
      .then((data) => {
        let totalMeal = "";
        if (data.meals) {
          data.meals.forEach((meal) => {
            totalMeal += `                    
                    <div onclick="mealIngredientsAll('${meal.strMeal}')" class="col-md-3 cursor-view">
                        <div class="meal-container text-center my-3 p-4 bg-secondary text-white data-id="${meal.IdMeal}">
                            <img src="${meal.strMealThumb}" alt="" class="img-fluid rounded">
                            <p class="mt-3">${meal.strMeal}</p>
                        </div>
                    </div>                    
                `;
          });
        } else {
          totalMeal = ` 
                <div id="warningMessage" class="mt-3 mx-auto" style="background-color: #FFFFFF;">
                  <h2 class="text-center">Sorry! We couldn't get any meal. Please Search Again..</h2>
                </div>`;
        }
        const mealList = document.getElementById("mealItems");
        mealList.innerHTML = totalMeal;
      });
    getHiddenOnClick();
  }
};

/////// The function of display meal detail....
const mealIngredientsAll = (mealName) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealAll(meal);
    });
};
const addMealAll = (meal) => {
  const detailOfMeal = `
        <div id="mealDetailsId" class="col-md-6 offset-md-3">
            <div class="meal-details my-3 p-4 bg-secondary text-white data-id="${meal.IdMeal}"">
                <img src="${meal.strMealThumb}" alt="" class="img-fluid rounded">
                <h2 class="mt-3">${meal.strMeal}</h2>
                <div class="ingredients">
                    <h3>Ingredients </h3>
                    <ul id="ingredients-list">
                        <li class="measure">${meal.strIngredient1} ${meal.strMeasure1}</li>
                        <li class="measure">${meal.strIngredient2} ${meal.strMeasure2}</li>
                        <li class="measure">${meal.strIngredient3} ${meal.strMeasure3}</li>
                        <li class="measure">${meal.strIngredient4} ${meal.strMeasure4}</li>
                        <li class="measure">${meal.strIngredient5} ${meal.strMeasure5}</li>
                        <li class="measure">${meal.strIngredient6} ${meal.strMeasure6}</li>
                        <li class="measure">${meal.strIngredient7} ${meal.strMeasure7}</li>
                        <li class="measure">${meal.strIngredient8} ${meal.strMeasure8}</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
  document.getElementById("meal-ingredients").innerHTML = detailOfMeal;
};

///// The function of  Meal Details hide on search click..........
const getHiddenOnClick = () => {
  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", function () {
    const detailOfMeal = document.getElementById("mealDetailsId");
    detailOfMeal.style = "display:none";
  });
};
