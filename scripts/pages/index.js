async function getPhotographers() {
	
	const photographers = [
		{
			name: 'Mimi Keel',
			id: 243,
			city: 'London',
			country: 'UK', 
			tagline: 'Voir le beau dans le quotidien',
			price: 400,
			portrait: 'MimiKeel.jpg',
		},
		{
			name: 'Ellie-Rose Wilkens',
			id: 930,
			city: 'Paris',
			country: 'France',
			tagline: 'Capturer des compositions complexes',
			price: 250,
			portrait: 'EllieRoseWilkens.jpg',
		},
		{
			name: 'Tracy Galindo',
			id: 82,
			city: 'Montreal',
			country: 'Canada',
			tagline: 'Photographe freelance',
			price: 500,
			portrait: 'TracyGalindo.jpg',
		},
		{
			name: 'Nabeel Bradford',
			id: 527,
			city: 'Mexico City',
			country: 'Mexico',
			tagline: "Toujours aller de l'avant",
			price: 350,
			portrait: 'NabeelBradford.jpg',
		},
		{
			name: 'Rhode Dubois',
			id: 925,
			city: 'Barcelona',
			country: 'Spain',
			tagline: 'Je crée des souvenirs',
			price: 275,
			portrait: 'RhodeDubois.jpg',
		},
		{
			name: 'Marcel Nikolic',
			id: 195,
			city: 'Berlin',
			country: 'Germany',
			tagline: 'Toujours à la recherche de LA photo',
			price: 300,
			portrait: 'MarcelNikolic.jpg',
		},
	];
	
	return {
		photographers: [...photographers],
	};
}



// STRUCTURE DES PROFILS......................................

function photographerFactory(photographer){

	// Appel de la section parent

	let photographersContainer = document.getElementsByClassName('photographer_section');

	// Création de la structure profil

	var containerChild = document.createElement('div');
	containerChild.setAttribute('class', 'profil');

	var containerChildIcone = document.createElement('div');
	containerChildIcone.setAttribute('class', 'profil__icone');

	var containerChildIconeLink = document.createElement('a');
	containerChildIconeLink.setAttribute('href', `photographer.html?id=${photographer.id}&name=${photographer.name}`);
	
	var containerChildIconeImg = document.createElement('img');
	containerChildIconeImg.setAttribute('src', `./assets/images/${photographer.portrait}`);
	containerChildIconeImg.setAttribute('class', 'profil__icone--img');
	containerChildIconeImg.setAttribute('alt', photographer.name);

	var containerChildText = document.createElement('div');
	containerChildText.setAttribute('class', 'profil__txt');

	var containerChildTextName = document.createElement('p');
	containerChildTextName.setAttribute('class', 'profil__txt--name');
	containerChildTextName.textContent = photographer.name;

	var containerChildTextLocalisation = document.createElement('p');
	containerChildTextLocalisation.setAttribute('class', 'profil__txt--localisation');
	containerChildTextLocalisation.textContent = photographer.city +','+ photographer.country;

	var containerChildTextCitation = document.createElement('p');
	containerChildTextCitation.setAttribute('class', 'profil__txt--citation');
	containerChildTextCitation.textContent = photographer.tagline;

	var containerChildTextPrix = document.createElement('p');
	containerChildTextPrix.setAttribute('class', 'profil__txt--prix');
	containerChildTextPrix.textContent = photographer.price +'€/jour';


	// Appendchild

	containerChild.appendChild(containerChildIcone);
	containerChildIcone.appendChild(containerChildIconeLink);
	containerChildIconeLink.appendChild(containerChildIconeImg);

	containerChild.appendChild(containerChildText);
	containerChildText.appendChild(containerChildTextName);
	containerChildText.appendChild(containerChildTextLocalisation);
	containerChildText.appendChild(containerChildTextCitation);
	containerChildText.appendChild(containerChildTextPrix);

	photographersContainer[0].appendChild(containerChild);

	// Appel du contenant "profil"

	return containerChild;
	
}


// INTEGRATION DES PROFILS.........................

async function displayData(photographers) {

	const photographersSection = document.querySelector('.photographer_section');
	
	photographers.forEach((photographer) => {
		const photographerModel = photographerFactory(photographer);
		photographersSection.appendChild(photographerModel);
	});
}




// RECUPERATION DATAS PHOTOGRAPHES..................

async function init(){
	const { photographers } = await getPhotographers();
	displayData(photographers);
}


init();
