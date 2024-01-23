const IMAGE_SEARCH = document.querySelector("#image-search");
const QUERY = document.querySelector("#search-box");
const MORE_BTN = document.querySelector("#more-btn");
const IMAGE_CONTAINER = document.querySelector("#image-container");

let pageNumber = 1;

/**************************************************************************
 formHandler function is used to handle the submit request from the form
 **************************************************************************/

function formHandler(e){

    e.preventDefault();

    let query = QUERY.value;

    IMAGE_CONTAINER.innerHTML = "";
    getImage(query);
}

/**************************************************************************
 renderImage function will update the images received from the api in the
 DOM 

 @param {Array} data - array of objects recived from the api 
***************************************************************************/

function renderImages(data){

    // console.log(data.results)
    MORE_BTN.classList.remove("hidden");

    data.results.forEach((image) => {
        let div = document.createElement("div");
        let img = document.createElement("img");
        let p = document.createElement("p");

        p.innerText = image.alt_description
        img.setAttribute("src",image.urls.small_s3)
        div.classList.add("image-card");

        div.append(img,p);
        IMAGE_CONTAINER.appendChild(div);
    })

}

/**************************************************************************
 getImage function will fetch the image according to the query from the unsplash api
 
 @param {String} query - the search term you want to get photos of 
***************************************************************************/

function getImage(query){

    fetch(`https://api.unsplash.com/search/photos?page=${pageNumber}&query=${query}`,{
        headers:{
            Authorization: "Client-ID JriFle8zMCOdFCjlTO3I0AkVVtIooQ7A2sZ48vHbELk"
        }
    })
    .then(reponse => reponse.json())
    .then(renderImages)
    .catch(error => console.error(error))

}

IMAGE_SEARCH.addEventListener("submit",formHandler);

MORE_BTN.addEventListener("click",()=>{

    let query = QUERY.value;

    pageNumber++;
    getImage(query);

});
