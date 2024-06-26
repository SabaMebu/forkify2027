import { elements} from "./base"; ///ui mxare aris searchviewsi


export const getInput = () => elements.searchInput.value;

export const clearInput = () => elements.searchInput.value = "";

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPage.innerHTML = '';
}




const renderRecipe = (recipe) => {
    const markup = `
                <li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
    `;

    elements.searchResList.insertAdjacentHTML("beforeend", markup);
}

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto="${type === "prev" ? page - 1 : page + 1}">
        <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === "prev" ? "left": "right"}"></use>
        </svg>
    </button>
`

const renderButton = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage)

    let button;
    if(page === 1 && pages > 1){
        //Only button to go next page
        button = createButton(page, "next")
    }else if(page < pages){
        //Both buttons
        button = `
            ${createButton(page, "prev")}
            ${createButton(page, "next")}
        `
    }else if(page === pages && page > 1){
        // Only button to go prev page
        button = createButton(page, "prev")
    }

    elements.searchResPage.insertAdjacentHTML("afterbegin", button)
}

export const renderResult = (recipes, page = 1, resPerPage = 5) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage

    recipes.slice(start, end).forEach(renderRecipe)

    //Render Button
    renderButton(page, recipes.length, resPerPage)
}