// error mesage:
const errorField = document.getElementById('error-message');
const error = (message,textColor) =>{
    errorField.innerText = message;
    errorField.style.color = textColor;
}
const loadDrinks = () => {
    const searchText = document.getElementById('search-field');
    if(searchText.value === ''){
        const message = 'Put your favorite drinks name';
        const textColor = 'red';
        error(message,textColor);
        document.getElementById('drinks-results').textContent = '';
        document.getElementById('drink-details').textContent = '';
        return;
    }
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText.value.toLowerCase()}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDrinks(data.drinks))
    searchText.value = '';
}

const displayDrinks = (drinks) => {
    document.getElementById('drink-details').textContent = '';
    if(drinks === null){
        const message = 'Results not found';
        const textColor = 'orangeRed';
        error(message,textColor);
        document.getElementById('drinks-results').textContent = '';
        return;
    }
    errorField.innerText = '';
    const drinksResults = document.getElementById('drinks-results');
    drinksResults.textContent = '';
    drinks.forEach(drink => {
        const div = document.createElement('div');
        div.classList.add ='col';
        div.innerHTML = `
            <div onclick="showDetails('${drink.idDrink}')" class="card h-100">
                <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
                <div class="card-footer">
                    <small class="fw-bold text-success">${drink.strDrink}</small>
                </div>
            </div>
        `;
        drinksResults.appendChild(div);
        // console.log(drink); 
    })
}
const showDetails = (id) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => displayDetails(data.drinks[0]))
}


const displayDetails = (details) =>{
    const drinkDetails = document.getElementById('drink-details');
    /* ----to be fixed when any value is null----- */
        /* const detailsArr = [];
        detailsArr.push(details);
            // console.log(detailsArr);
            detailsArr.filter(property => {
                const objArr = Object.values(property);
                // console.log(objArr)
                const filtObjarr = objArr.filter(item => item !== null);
                console.log(filtObjarr);
            }); */
   

    drinkDetails.innerHTML = `
        <div class="card border-success mb-3 mx-auto w-50">
            <div class="card-header bg-secondary border-success text-light">${details.strCategory}</div>
            <div class="card-body text-success">
                <h5 class="card-title">${details.strAlcoholic}</h5>
                <p class="card-text">${details.strInstructions}</p>
            </div>
            <div class="card-footer bg-transparent border-success"><b>Ingredients:</b>
                <ul class="d-flex list-unstyled mt-2">
                    <li id="first" class="rounded-2 bg-primary text-light px-2 py-1">${details.strIngredient1}</li>
                    <li id="second"class="mx-1 rounded-2 bg-danger text-light px-2 py-1">${details.strIngredient2}</li>
                    <li id="third" class="rounded-2 bg-success text-light px-2 py-1">${details.strIngredient3}</li>
                </ul>
            </div>
        </div>
    `;
}

