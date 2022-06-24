const ingredientsContainer = document.getElementById('ingredients');
const img = document.getElementById('image')
const nameValue = document.getElementById('title');
const categoryValue = document.getElementById('category');
const areaValue = document.getElementById('area');
const instructionValue = document.getElementById('instructions');
const youtubeValue = document.getElementById('youtube');


async function getData() {
    // specify where to get the data from
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
    // console.log('The response is', response.data.meals[0]);
    // console.log(response.data.meals[0]);
    addTitle(response.data.meals[0].strMeal,
        response.data.meals[0].strArea,
        response.data.meals[0].strCategory,
        response.data.meals[0].strInstructions,
        response.data.meals[0].strCategory);
    addImage(response.data.meals[0].strMealThumb);
    addIngredients(response.data.meals[0]);
    addYoutube(response.data.meals[0].strYoutube);
}
function addTitle(title, area, category, instructions) {
    nameValue.innerHTML = title;
    categoryValue.innerHTML = category;
    areaValue.innerHTML = area;
    instructionValue.innerHTML = instructions;

}
function addImage(src) {
    img.src = src
}
function addIngredients(ingredients) {
    // all the ingredients
    let ingredientsArray = [];
    for (let i = 1; i <= 20; i++) {
        for (const key in ingredients) {
            // strMeasure3
            if (key === (`strIngredient${i}`) && (ingredients[`strIngredient${i}`]) !== '' && (ingredients[`strIngredient${i}`]) !== null) {
                ingredientsArray.push([ingredients[`strIngredient${i}`], ingredients[`strMeasure${i}`]])
                // if (key === (`strMeasure${i}`) && (ingredients[`strMeasure${i}`]) !== '' && (ingredients[`strMeasure${i}`]) !== null) {

            }
        };
    };

    // all the measure
    ingredientsContainer.innerHTML += `<ul id='stats'> 
   ${(ingredientsArray).map(item => {
        return `<li><div>${item[0]}</div><div>${item[1]}</div></li>`
    }).join(' ')}
    </ul>`
}
function addYoutube(youtubeSrc) {
    youtubeValue.src = `https://www.youtube.com/embed/${youtubeSrc.slice(-11)}`;
}

getData();