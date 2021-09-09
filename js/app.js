const loadDrinks = () => {
    const searchText = document.getElementById('search-field');
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText.value.toLowerCase()}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDrinks(data.drinks))
    searchText.value = '';
}

const displayDrinks = (drinks) => {
    const drinksResults = document.getElementById('drinks-results');
    drinksResults.textContent = '';
    drinks.forEach(drink => {
        const div = document.createElement('div');
        div.classList.add ='col';
        div.innerHTML = `
            <div class="card h-100">
                <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
                <div class="card-footer">
                    <small class="text-muted">${drink.strDrink}</small>
                </div>
            </div>
        `;
        drinksResults.appendChild(div);
        console.log(drink);
    })
    
}