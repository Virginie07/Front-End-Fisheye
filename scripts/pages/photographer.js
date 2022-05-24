//Mettre le code JavaScript lié à la page photographer.html


// Récuperation des pages des photographes

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product_id = urlParams.get("id");
const product_name = urlParams.get("name").split(' ')[0].replace('-', ' ');


// Encadré de présentation......................................................................


const namePhotographer = document.getElementsByClassName('presentation__info--name');
const cityPhotographer = document.getElementsByClassName('presentation__info--localisation');
const taglinePhotographer = document.getElementsByClassName('presentation__info--citation');
const portraitPhotographer = document.getElementsByClassName('presentation__photo');
const photographerImg = document.createElement('img');
const nameModale = document.getElementsByClassName('name_modale');



fetch("../../data/photographers.json")
.then((res) => res.json())
.then((data) => {

  for (let index = 0; index < data.photographers.length; index++) {
        
      if(product_id == data.photographers[index].id){

          photographerPrice = data.photographers[index].price;

          namePhotographer[0].textContent = data.photographers[index].name;
          cityPhotographer[0].textContent = data.photographers[index].city +', '+ data.photographers[index].country;
          taglinePhotographer[0].textContent = data.photographers[index].tagline;        
          nameModale[0].textContent = data.photographers[index].name; 
          
          photographerImg.src =  './assets/images/' + data.photographers[index].portrait ;
          photographerImg.className = ('presentation__photo--img');
          photographerImg.setAttribute('alt', data.photographers[index].name);
          portraitPhotographer[0].appendChild(photographerImg);
      }
  }

  const tarif = document.getElementsByClassName('encart__tarif');
  tarif[0].textContent = photographerPrice +'€/jour';

});




// Modale formulaire de contact.........................................................


const modal = document.getElementById("contact_modal");
const closeBtn = document.querySelector(".modal__entete--icone");
const contactBtn = document.querySelector(".presentation__contact");
  
// sélection du paragraphe "merci"
const submitBtn = document.querySelector('.modal__formulaire--bouton');
const txtValid = document.getElementById("success"); 
    
contactBtn.addEventListener("click", modalOpen);
closeBtn.addEventListener("click", modalClose);
submitBtn.addEventListener("click", validate);   
  
// Fonction pour ouvrir la modale
function modalOpen(){
  modal.style.display = "block";
  document.getElementById('prenom').focus();
  // document.getElementById('fermeture').focus();
}
  
// Fonction pour fermer la modale
function modalClose(){
  modal.style.display = "none";
}

// Fonction qui fait apparaitre le txt de validation
function txtValidAppear() {
  modal.style.display = "none";
  txtValid.style.display = "block";    
}


// Fonction de vérification du formulaire

function validate(event) {
  event.preventDefault()

  const firstName = document.getElementById("prenom");
  const firstValid = document.getElementById("firstValid");

  const lastName = document.getElementById("nom");
  const lastValid = document.getElementById("lastValid");

  const mail = document.getElementById("email");
  const mailValid = document.getElementById("mailValid");


  let isValid = true;
  firstValid.style.display = "none";
  lastValid.style.display = "none"; 
  mailValid.style.display = "none";


  // Vérification Prénom
  if (firstName.value.match(/^[A-zéèê'-]{2,}$/)===null){               
    firstValid.style.display = "block";
    isValid = false;
  }
  
  // Vérification Nom
  if(lastName.value.match(/^[A-zéèê'-]{2,}$/)===null){                 
    lastValid.style.display = "block";
    isValid = false;
  }
  
  // Vérification email
  if(mail.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)=== null){        
    mailValid.style.display = "block";
    isValid = false;
  }

  if(isValid){
    txtValidAppear();
    console.log(firstName.value);
    console.log(lastName.value);
    console.log(mail.value);
  }
}


// Galerie principale Photos.......................................................


// Appel du parent

const galerie = document.getElementById('galerie');
  

// Structure et récupération données photos/vidéos

fetch("../../data/photographers.json")
.then((res) => res.json())
.then((data) => {
  let ensemblePhotos = []; 
  let totalLikes = 0;
  
  function sortData(critere1){
    if (critere1 == 'TriDate'){
      return data.media.sort(compareDateMediaStr);
    }
    if (critere1 == 'TriName'){
      return data.media.sort(compareTitleMediaStr);
    }
    if (critere1 == 'TriLikes'){
      return data.media.sort(compareLikesMediaStr);
    }
    return data.media;
  }
   
  function affichagePhotos(sortCriteria){

    var result = sortData(sortCriteria);

    galerie.innerHTML = '';

    for (let index = 0; index < data.media.length; index++) {

        
      if(product_id == data.media[index].photographerId){
                     
        totalLikes = totalLikes + data.media[index].likes; 
            
        if(data.media[index].video){

          const galeriePicture = document.createElement('div');
          galeriePicture.setAttribute('class','galerie__picture');
          galeriePicture.setAttribute('class','galerie__video');
          galerie.appendChild(galeriePicture);

          const galeriePictureModel = document.createElement('div');
          galeriePictureModel.setAttribute('class','galerie__picture--modele');
          galeriePicture.appendChild(galeriePictureModel);

          // const liengaleriePictureModelImg = document.createElement('a');
          // liengaleriePictureModelImg.setAttribute('class', 'lienImage');
          // liengaleriePictureModelImg.setAttribute('href', '#');
          // liengaleriePictureModelImg.setAttribute('', data.media[index].title);
          // galeriePictureModel.appendChild(liengaleriePictureModelImg);

          const galeriePictureModelImg = document.createElement('img');
          galeriePictureModelImg.setAttribute('media','video');
          galeriePictureModelImg.setAttribute('src',`./assets/images/miniature_video.jpg`);
          galeriePictureModelImg.setAttribute('video',`./assets/images/${product_name}/${data.media[index].video}`);
          galeriePictureModelImg.setAttribute('tabindex', '0');
          galeriePictureModelImg.setAttribute('role', 'button');
          galeriePictureModelImg.setAttribute('aria-expanded', 'true');
          galeriePictureModelImg.setAttribute('alt', data.media[index].title);
          galeriePictureModelImg.dataset.id = data.media[index].video;
          galeriePictureModelImg.setAttribute('class','galerie__picture--modeleImg');
          galeriePictureModel.appendChild(galeriePictureModelImg);

          const photoLegend = document.createElement('div');
          photoLegend.setAttribute('class', 'galerie__picture--legend');
          galeriePicture.appendChild(photoLegend);

          const photoLegendTitle = document.createElement('p');
          photoLegendTitle.innerHTML = data.media[index].title;
          photoLegend.appendChild(photoLegendTitle);

          const photoLegendLikes = document.createElement('div');
          photoLegendLikes.setAttribute('class', 'galerie__picture--likes');
          photoLegend.appendChild(photoLegendLikes);

          const photoLegendNumber = document.createElement('p');
          photoLegendNumber.setAttribute('class', 'galerie__picture--number');            
          photoLegendNumber.innerHTML = data.media[index].likes;
          photoLegendNumber.setAttribute('likes', 0);  
          photoLegendLikes.appendChild(photoLegendNumber);

          const photoLegendIcone = document.createElement('i');
          photoLegendIcone.setAttribute('class', 'fas fa-heart heart');
          photoLegendIcone.setAttribute('tabindex', '0');
          photoLegendIcone.setAttribute('role', 'button');
          photoLegendIcone.setAttribute('aria-expanded', 'true');
          photoLegendIcone.setAttribute('alt', 'bouton likes');
          photoLegendLikes.appendChild(photoLegendIcone);            

        }

        if(data.media[index].image){
          const galeriePicture = document.createElement('div');
          galeriePicture.setAttribute('class','galerie__picture');
          galerie.appendChild(galeriePicture);
  
          const galeriePictureModel = document.createElement('div');
          galeriePictureModel.setAttribute('class','galerie__picture--modele');
          galeriePicture.appendChild(galeriePictureModel);

          // const liengaleriePictureModelImg = document.createElement('a');
          // liengaleriePictureModelImg.setAttribute('class', 'lienImage');
          // liengaleriePictureModelImg.setAttribute('href', '#');
          // liengaleriePictureModelImg.setAttribute('aria-labelledby', data.media[index].title);
          // galeriePictureModel.appendChild(liengaleriePictureModelImg);
  
          const galeriePictureModelImg = document.createElement('img');
          galeriePictureModelImg.setAttribute('src',`./assets/images/${product_name}/${data.media[index].image}`);
          galeriePictureModelImg.setAttribute('media','image');
          galeriePictureModelImg.setAttribute('tabindex', '0');
          galeriePictureModelImg.setAttribute('role', 'button');
          galeriePictureModelImg.setAttribute('aria-expanded', 'true');
          galeriePictureModelImg.setAttribute('alt', data.media[index].title);
          galeriePictureModelImg.dataset.id = data.media[index].image;
          galeriePictureModelImg.setAttribute('class','galerie__picture--modeleImg');
          galeriePictureModel.appendChild(galeriePictureModelImg);
          
          const photoLegend = document.createElement('div');
          photoLegend.setAttribute('class', 'galerie__picture--legend');
          galeriePicture.appendChild(photoLegend);

          const photoLegendTitle = document.createElement('p');
          photoLegendTitle.innerHTML = data.media[index].title;
          photoLegend.appendChild(photoLegendTitle);

          const photoLegendLikes = document.createElement('div');
          photoLegendLikes.setAttribute('class', 'galerie__picture--likes');
          photoLegend.appendChild(photoLegendLikes);

          const photoLegendNumber = document.createElement('p');
          photoLegendNumber.setAttribute('class', 'galerie__picture--number');    
          photoLegendNumber.setAttribute('likes', 0);        
          photoLegendNumber.innerHTML = data.media[index].likes;
          photoLegendLikes.appendChild(photoLegendNumber);

          const photoLegendIcone = document.createElement('i');
          photoLegendIcone.setAttribute('class', 'fas fa-heart heart');
          photoLegendIcone.setAttribute('tabindex', '0');
          photoLegendIcone.setAttribute('role', 'button');
          photoLegendIcone.setAttribute('aria-expanded', 'true');
          photoLegendIcone.setAttribute('alt', 'bouton likes');
          photoLegendLikes.appendChild(photoLegendIcone);            
        }
     
      }
        
    }

  }

  affichagePhotos();

  // Fonctions d'afffichage de tri

  function affichagePhotoDate(){
    affichagePhotos('TriDate');
    defilementGalerie();
    incrementationLikes();
    menuTriClose();

  }
  const menuDate = document.querySelector('.menuDate');
  menuDate.addEventListener('click', affichagePhotoDate);


  function affichagePhotoTitre(){
    affichagePhotos('TriName');
    defilementGalerie();
    incrementationLikes();
    menuTriClose();
  }
  const menuTitre = document.querySelector('.menuTitre');
  menuTitre.addEventListener('click', affichagePhotoTitre);


  function affichagePhotoLikes(){
    affichagePhotos('TriLikes');
    defilementGalerie();
    incrementationLikes();
    menuTriClose();
  }
  const menuLikes = document.querySelector('.menuPop');
  menuLikes.addEventListener('click',  affichagePhotoLikes);


  // Incrémentation des likes.........

  function incrementationLikes(){

    var els = document.getElementsByClassName('heart');
  
    Array.prototype.forEach.call(els, function(els){
      els.addEventListener('click', function() {
        const listChild = els.closest('.galerie__picture--likes').children;
    
    
        for(var i = 0; i < listChild.length; i++) {
          if(listChild[i].getAttribute('class') ==='galerie__picture--number'){

            if (parseInt(listChild[i].getAttribute('likes')) == 0){             

              // obtenir les likes
              const getLikeDefault = listChild[i].textContent;
              // ajouter un like
              const addLikePlus = parseInt(getLikeDefault) + 1;
              // inserer un nouveau like
              listChild[i].textContent = addLikePlus;
          
              // compte total addLikePlus   
              const totalChiffre2 = document.getElementsByClassName('encart__total--chiffre');
              const initTotalLike = totalChiffre2[0].textContent;
              const addLikeTotal = parseInt(initTotalLike) + 1;
              totalChiffre2[0].textContent = addLikeTotal;

              listChild[i].setAttribute('likes', 1);

            } else{
              // obtenir les likes
              const getLikeDefault = listChild[i].textContent;
              // ajouter un like
              const addLikePlus = parseInt(getLikeDefault) - 1;
              // inserer un nouveau like
              listChild[i].textContent = addLikePlus;               
           
              // compte total addLikePlus   
              const totalChiffre2 = document.getElementsByClassName('encart__total--chiffre');
              const initTotalLike = totalChiffre2[0].textContent;
              const addLikeTotal = parseInt(initTotalLike) - 1;
              totalChiffre2[0].textContent = addLikeTotal;
 
              listChild[i].setAttribute('likes', 0);
            }
            
          }

        }
    
      });
     
    }); 
      
    // Encart de bas de page..........
  
    const totalChiffre = document.getElementsByClassName('encart__total--chiffre');
    totalChiffre[0].textContent = totalLikes;

  }  

  incrementationLikes();

  // Défilement de la galerie......................

  function defilementGalerie(){
   
    const modalGalerie = document.getElementById('modalGalerie');
    const modalGalerieDefilement = document.getElementsByClassName('modalGalerie__defilement');
    const modalGaleriePhoto = document.getElementsByClassName('galerie__picture--modeleImg');
    const closeModalGalerie = document.querySelector(".modalGalerie__iconeClose");
    const modalImg = document.getElementsByClassName('modalGalerie__defilement--big');
    const modalVideo = document.getElementsByClassName('modalGalerie__defilement--bigvideo');
    let imgTags = document.querySelectorAll('.galerie__picture--modeleImg');
    let tabImg = [];
  
  
    // Fermeture de la modale Galerie
  
    closeModalGalerie.addEventListener("click", modalGalerieOff);
      
    function modalGalerieOff(){
      modalGalerie.style.display = "none";
    }            
  
    // Récuperation des images dans un tableau
  
    imgTags.forEach(function (imgTag){
      
      imgTag.addEventListener('click', (event) => {
        event.preventDefault();
        modalGalerie.style.display = 'block';
        const big = document.createElement('img');
        big.setAttribute('class', 'modalGalerie__defilement--big');
        modalGalerieDefilement[0].innerHTML = '';   
        modalGalerieDefilement[0].appendChild(big);
        modalGalerie.appendChild(modalGalerieDefilement[0]); 

        const bigvideo = document.createElement('video');
        bigvideo.setAttribute('class', 'modalGalerie__defilement--bigvideo');
        bigvideo.setAttribute('role','button');
        bigvideo.setAttribute('controls','controls');
        modalGalerieDefilement[0].appendChild(bigvideo);
        modalGalerie.appendChild(modalGalerieDefilement[0]);                 
            
        tabImg = [];
        let mediaCheck = imgTag.getAttribute('media');
  
        if(mediaCheck == 'image'){
          modalVideo[0].style.display = 'none';
          modalImg[0].style.display = 'block';
          let srcMedia = imgTag.getAttribute('src');
          tabImg.push(srcMedia + "..." + mediaCheck);  
          let srcEnd = srcMedia.split('...')[0];
          modalImg[0].setAttribute('src', srcEnd);  
        }
  
        if(mediaCheck == 'video'){
          modalImg[0].style.display = 'none';
          modalVideo[0].style.display = 'block';
          let srcMedia = imgTag.getAttribute('video');
          tabImg.push(srcMedia + "..." + mediaCheck);
          let srcEnd = srcMedia.split('...')[0];
          modalVideo[0].setAttribute('src', srcEnd);    
        }
  

        imgTags.forEach(function (item){
          let mediaCheckItem = item.getAttribute('media');
          let srcMediaItemImage = item.getAttribute('src');
          let srcMediaItemVideo = item.getAttribute('video');
  
          if(imgTag.getAttribute('src') != item.getAttribute('src')){
  
            if(mediaCheckItem == 'image'){
              tabImg.push(srcMediaItemImage + "..." + mediaCheckItem);    
            }
      
            if(mediaCheckItem == 'video'){
              tabImg.push(srcMediaItemVideo + "..." + mediaCheckItem);    
            }
         
          }

        });  
          
      });


      // imgTag.addEventListener('focus', (event) => {
      //   event.preventDefault();
      //   modalGalerie.style.display = 'block';
      //   const big = document.createElement('img');
      //   big.setAttribute('class', 'modalGalerie__defilement--big');
      //   modalGalerieDefilement[0].innerHTML = '';   
      //   modalGalerieDefilement[0].appendChild(big);
      //   modalGalerie.appendChild(modalGalerieDefilement[0]); 

      //   const bigvideo = document.createElement('video');
      //   bigvideo.setAttribute('class', 'modalGalerie__defilement--bigvideo');
      //   bigvideo.setAttribute('role','button');
      //   bigvideo.setAttribute('controls','controls');
      //   modalGalerieDefilement[0].appendChild(bigvideo);
      //   modalGalerie.appendChild(modalGalerieDefilement[0]);                 
            
      //   tabImg = [];
      //   let mediaCheck = imgTag.getAttribute('media');
  
      //   if(mediaCheck == 'image'){
      //     modalVideo[0].style.display = 'none';
      //     modalImg[0].style.display = 'block';
      //     let srcMedia = imgTag.getAttribute('src');
      //     tabImg.push(srcMedia + "..." + mediaCheck);  
      //     let srcEnd = srcMedia.split('...')[0];
      //     modalImg[0].setAttribute('src', srcEnd);  
      //   }
  
      //   if(mediaCheck == 'video'){
      //     modalImg[0].style.display = 'none';
      //     modalVideo[0].style.display = 'block';
      //     let srcMedia = imgTag.getAttribute('video');
      //     tabImg.push(srcMedia + "..." + mediaCheck);
      //     let srcEnd = srcMedia.split('...')[0];
      //     modalVideo[0].setAttribute('src', srcEnd);    
      //   }
  

      //   imgTags.forEach(function (item){
      //     let mediaCheckItem = item.getAttribute('media');
      //     let srcMediaItemImage = item.getAttribute('src');
      //     let srcMediaItemVideo = item.getAttribute('video');
  
      //     if(imgTag.getAttribute('src') != item.getAttribute('src')){
  
      //       if(mediaCheckItem == 'image'){
      //         tabImg.push(srcMediaItemImage + "..." + mediaCheckItem);    
      //       }
      
      //       if(mediaCheckItem == 'video'){
      //         tabImg.push(srcMediaItemVideo + "..." + mediaCheckItem);    
      //       }
         
      //     }

      //   });  
          
      // });


    }); 
  
  
    // Contrôle Left / Right
  
    const btnLeft = document.querySelectorAll('.modalGalerie__fleche--iconeLeft');
    const btnRight = document.querySelectorAll('.modalGalerie__fleche--iconeRight');
      
    var position = 0;
  
    btnLeft.forEach(function (left){

      left.addEventListener('click', (event) => {

        event.preventDefault();
        if(position == 0){
          position = tabImg.length - 1;
        } else{
          position = position - 1;
        }
  
        let mediaCheck = tabImg[position].split('...')[1];
        let srcEnd = tabImg[position].split('...')[0];
  
        if(mediaCheck == 'image'){
          modalVideo[0].style.display = 'none';
          modalImg[0].style.display = 'block';
          modalImg[0].setAttribute('src', srcEnd);  
        }
  
        if(mediaCheck == 'video'){
          modalImg[0].style.display = 'none';
          modalVideo[0].style.display = 'block';
          modalVideo[0].setAttribute('src', srcEnd);  
        }
  
      });

    });
  
    btnRight.forEach(function (right){

      right.addEventListener('click', (event) => {

        event.preventDefault();
        if(position == tabImg.length){
          position = 0;
        } else{
          position = position + 1;
        }
  
        let mediaCheck = tabImg[position].split('...')[1];
        let srcEnd = tabImg[position].split('...')[0];
  
        if(mediaCheck == 'image'){
          modalVideo[0].style.display = 'none';
          modalImg[0].style.display = 'block';
          modalImg[0].setAttribute('src', srcEnd);  
        }
  
        if(mediaCheck == 'video'){
          modalImg[0].style.display = 'none';
          modalVideo[0].style.display = 'block';
          modalVideo[0].setAttribute('src', srcEnd);  
        }
        
      });

    });
  }

  defilementGalerie();

  function compareLikesMediaStr(m1, m2){
    if (m1.likes < m2.likes)
    return -1;
    if (m1.likes > m2.likes)
    return 1;
    return 0;
  }

  function compareDateMediaStr(m1, m2){
    if (m1.date < m2.date)
    return -1;
    if (m1.date > m2.date)
    return 1;
    return 0;
  }

  function compareTitleMediaStr(m1, m2){
    if (m1.title < m2.title)
    return -1;
    if (m1.title > m2.title)
    return 1;
    return 0;
  }

});


// // Bouton de tri.................................................
  
const lienDate = document.getElementsByClassName('menuDate');
const lienAlpha = document.getElementsByClassName('menuTitre');
const lienTri = document.querySelector(".tri__txt");
const divTri = document.querySelector(".tri__btn");
const itemTris = document.querySelectorAll('.tri__btn--menu');

// itemTris.forEach(function (itemTri){
//   itemTri.addEventListener('click', (event) => {

//   });
// });

lienTri.addEventListener("click", menuTriOpen);

// itemTris.forEach(function (itemTri){

//   itemTri.addEventListener('click', (event) => {

//     itemTris.forEach(function (itemTri2){
//       itemTri2.style.display = 'none';
//       itemTri2.remove('active');
//     });

//     itemTri.style.display = 'block';
//     itemTri.add('active');

//   });

// });

  // lienTri.addEventListener("click", menuTriClose);

  // const menuTri = document.getElementsByClassName('tri__btn--back');
  // const divTri = document.querySelector(".tri__btn");
  // const btnTri = document.querySelector(".btn_tri");
   
  // btnTri.addEventListener("mouseenter", menuTriOpen);
  // divTri.addEventListener("mouseleave", menuTriClose);
 
 
// Fonction pour ouvrir le menu de tri...........................

function menuTriOpen(){
  lienDate[0].style.display = "block";
  lienAlpha[0].style.display = "block";


  // let checkVisibility = 0;

  // itemTris.forEach(function (itemTri2){
  //   itemTri2.style.display = 'block'; 
  // });    
  
}

function menuTriClose(){
  lienDate[0].style.display = "none";
  lienAlpha[0].style.display = "none";
 }


 const flecheGauche = document.querySelector('.modalGalerie__fleche--iconeLeft');
 const flecheDroite = document.querySelector('.modalGalerie__fleche--iconeRight');
 
 
 document.body.onkeyup = function(e){
  if(e.keyCode == 32 || e.keyCode == 13){
    document.activeElement.click();
    console.log(document.activeElement);
  }

  if(e.keyCode == 37){
    flecheGauche.click();
    console.log('gauche');
  }

  if(e.keyCode == 39){
    flecheDroite.click();
    console.log('droite');
  }
}





   
  






