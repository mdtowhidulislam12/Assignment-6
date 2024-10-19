const showAll = async () => {
  let response = await fetch("https://openapi.programming-hero.com/api/peddy/pets");
  let data = await response.json();
  let pets = data.pets;

  pets.forEach(pet => {
    loadAllData(pet);
  });
}

const loadAllData = (data) => {
  const showAllContainer = document.getElementById('showAll-container');

  let div = document.createElement('div');
  
  div.innerHTML = `
    <div class="card bg-base-100 w-full shadow-xl">
      <img class="rounded-lg mt-4 lg:h-44 m-4  h-full" src="${data.image}" />
      <div class="card-body p-4">
        <h2 class="card-title">${data.pet_name}</h2>
        <p>Breed: ${data.breed}</p>
        <p>Birth: ${data.date_of_birth}</p>
        <p>Gender: ${data.gender}</p>
        <p class="font-bold text-orange-700">Price: $${data.price}</p>
        <div class="flex lg:justify-between gap-4 lg:gap-0 w-full ">
          <button id="like-${data.pet_name}" onclick="like('${data.image}', '${data.pet_name}')" class="btn border-green-600 text-green-900">
            <i class="fa-regular fa-thumbs-up"></i>
          </button>
          <button id="adoptBtn-${data.pet_name}" class="btn border-green-600 text-green-900">Adopt</button>
          <button id="detailsBtn-${data.pet_name}" class="btn border-green-600 text-green-900">Details</button>
        </div>
      </div>
    </div>`;

  showAllContainer.appendChild(div);

  const detailsBtn = document.getElementById(`detailsBtn-${data.pet_name}`);

  detailsBtn.addEventListener('click', () => {
    showDetailsModal(data);
  });

  const adoptBtn = document.getElementById(`adoptBtn-${data.pet_name}`)
  adoptBtn.addEventListener('click', ()=>{
    showAdoptModal(data,adoptBtn);
  })
};

// like function
const like = (imageUrl, petName) => {
  const likeContainer = document.getElementById('like-Container');
  let div = document.createElement('div');
  div.classList.add('like-item');
  div.innerHTML = `<img src="${imageUrl}" alt="${petName}" class=" w-full rounded-lg" />`;
  likeContainer.appendChild(div);
}

const showAdoptModal = (pet, adoptBtn) => {
  const modalContainer = document.getElementById('my_modal_1');
  const modalContent = document.getElementById('modal-content');
  modalContent.innerHTML = '';

  let countdown = 3; 
  adoptBtn.disabled = true; 

  const countdownInterval = setInterval(() => {
    adoptBtn.innerText = `Adopting in ${countdown}...`; 
    modalContent.innerHTML = `
      <div>
        <img src="${pet.image}" class="rounded-lg w-full h-full" />
      </div>
      <h2 class="text-2xl font-bold my-4">${pet.pet_name}</h2>
      <div class="flex justify-between">
        <div>
          <p>Breed: ${pet.breed}</p>
          <p>Birth: ${pet.date_of_birth}</p>
        </div>
        <div>
          <p>Gender: ${pet.gender}</p>
          <p class="font-bold text-orange-800">Price:  $${pet.price}</p>
        </div>
      </div>
      <br>
      <h2 id="Adopting" class="text-3xl font-bold text-center text-green-700">Adopting in ${countdown}...</h2>`;

    if (countdown < 0) {
      document.getElementById('Adopting').style.display='none';

      clearInterval(countdownInterval); 
      adoptBtn.innerText = 'Adopted';  
      modalContent.innerHTML += `
        <br>
        <h2 class="text-3xl font-bold text-center text-orange-700">Congratulations!</h2>
        <h2 class="text-xl font-bold text-center text-green-700">You have adopted ${pet.pet_name}</h2>
        <br>
        <hr>
        <div class="modal-action w-full">
          <div class="divider"></div>
          <button class=" text-xl font-bold btn w-full border-green-800 bg-orange-600" onclick="closeModal()">Thanks!</button>
        </div>`;
    }

    countdown--; 
  }, 1000);

  my_modal_1.showModal(); 
};






//Details Modal 
const showDetailsModal = (pet) => {
  const modalContainer = document.getElementById('my_modal_1');

  const modalContent = document.getElementById('modal-content');

  modalContent.innerHTML = '';

  let modal = document.createElement('div');
  modal.innerHTML = `
    <div>
      <img src="${pet.image}" class="rounded-lg w-full h-full" />
    </div>
    <h2 class="text-2xl font-bold my-4">${pet.pet_name}</h2>
    <div class ="flex justify-between">
    <div>
    <p>Breed: ${pet.breed}</p>
    <p>Birth: ${pet.date_of_birth}</p>
    </div>
    <div>
    <p>Gender: ${pet.gender}</p>
    <p class ="font-bold text-orange-800">Price: $${pet.price} </p>
    </div>
    </div>
    <br>
    <h2 class="text-2xl font-bold"> Details Information </h2>
    <br>
    <p> ${pet.pet_details}</p>
    <br>
    <hr>
    <div class="modal-action w-full">
    <div class="divider"></div>
      <button class="btn w-full border-green-800" onclick="closeModal()">Cancel</button>
    </div>`;

  modalContent.appendChild(modal);



  my_modal_1.showModal();
}


const closeModal = () => {
  my_modal_1.close();
}

// Sort pets by price (descending order)
const shortBtn = document.getElementById('shortBtn');
shortBtn.addEventListener('click', async function () {
  const showAllContainer = document.getElementById('showAll-container');
  showAllContainer.innerHTML = ''; 

  let response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
  let data = await response.json();
  let pets = data.pets;

  pets.sort((a, b) => b.price - a.price);

  pets.forEach(pet => {
    loadAllData(pet);
  });
});

// Create category buttons
const showCategory = async () => {
  let response = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
  let data = await response.json();
  let categories = data.categories;
  categories.forEach(category => {
    loadCategory(category);
  });
}

let activeBtn = null;

const loadCategory = (category) => {
  const categories = document.getElementById('categoriesBtnContainer');
  let btn = document.createElement('button');
  btn.classList.add('lg:flex', 'items-center', 'gap-4', 'btn', 'text-2xl', 'border-green-600', 'font-bold','h-fit', 'p-4','w-full','lg:w-60','md:w-60');
  btn.innerText = `${category.category}`;


  let img = document.createElement('img');
  img.src = category.category_icon;

  btn.append(img);

  btn.addEventListener('click', async () => {
    if (activeBtn) {
      activeBtn.classList.remove('bg-[#0e798162]');
      activeBtn.classList.remove('rounded-full');
    }

    btn.classList.add('bg-[#0e798162]');
    btn.classList.add('rounded-full');
    activeBtn = btn;

    const spinner = document.getElementById('spinner');
    spinner.style.display = 'flex';

    await filterByCategory(category.category);

    setTimeout(() => {
      spinner.style.display = 'none';

    }, 2000)

  });

  categories.appendChild(btn);
}

// Filter pets by category
const filterByCategory = async (categoryName) => {
  const showAllContainer = document.getElementById('showAll-container');
  showAllContainer.innerHTML = '';

  let response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
  let data = await response.json();
  let pets = data.pets;
  let filteredPets = pets.filter(pet => pet.category === categoryName);

  if (filteredPets.length > 0) {
    filteredPets.forEach(pet => {
      loadAllData(pet);

      const error = document.getElementById('error');
      error.style.display = 'none'
    });
  } else {
    document.getElementById('error').innerHTML = `
      <div class="rounded-lg m-5 p-10 bg-gray-200 space-y-4 ">
        <div class="flex justify-center"><img src="./images/error.webp" alt=""></div>
        <h2 class="text-center text-2xl font-bold">No Information Available</h2>
        <div class="flex justify-center">
            <p class="text-center max-w-md">It is a long established fact that a reader will be distracted by the
                readable content of a page when looking at its layout.</p>
        </div>
      </div>`;
    const error = document.getElementById('error');
    error.style.display = 'block'
  };
};
//load Dom
document.addEventListener('DOMContentLoaded', () => {

  const spinner = document.getElementById('spinner');
  spinner.style.display = 'flex';
  setTimeout(() => {
    spinner.style.display = 'none';
  }, 2000)
});

const showSpinnerOnBtnClick = () => {
  const spinner = document.getElementById('spinner')
  spinner.style.display = 'flex'

  setTimeout(() => {
    spinner.style.display = 'none'
  }, 2000)
};

// function for button click spinner
const buttons = document.querySelectorAll('button')
buttons.forEach(button => {
  button.addEventListener('click', showSpinnerOnBtnClick)
});

//show more btn add event listener




showCategory();
showAll();
