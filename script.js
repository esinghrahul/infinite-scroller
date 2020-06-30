const imageContainer = document.getElementById('image-container')
const loader= document.getElementById('loader')

let photosArray = []
let ready= false
let imagesLoaded= 0
let totalImages= 0
let initialCount = 6
let isInitialLoad= true
const apiKey= 'cRwXva6woOZ9sVg1B_tB47B4MQ07Zz2arsyJ3AjMgS4'
const apiUrl= `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`

function updateApiUrlWithNewCount(picCount){
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}

function imageLoaaded(){
    imagesLoaded++
    if(imagesLoaded === totalImages){
        ready = true
        loader.hidden = true
    }
}

function setAttributes(element, attributes) {
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }

function displayPhotos(){
    imagesLoaded = 0
    totalImages = photosArray.length
    photosArray.forEach((photo)=>{
        const item = document.createElement('a')
        // item.setAttribute('href', photo.links.html)
        // item.setAttribute('target','_blank')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
          })
        const img = document.createElement('img')
        // img.setAttribute('src', photo.urls.regular)
        // img.setAttribute('alt', photo.alt_description)
        // img.setAttribute('title', photo.alt_description)
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
          })
        img.addEventListener('load', imageLoaaded)
        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}

async function getPhotos(){
    try{
        const response= await fetch(apiUrl)
        photosArray= await response.json()
        displayPhotos()
        if(isInitialLoad){
            updateApiUrlWithNewCount(25)
            isInitialLoad = false
        }
    }catch(error){

    }
}

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready= false
        getPhotos()
    }
})

getPhotos();