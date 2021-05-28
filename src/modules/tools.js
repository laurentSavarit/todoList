"use strict";

const baseUrl = "http://serveur:3000/api";

const token = [];

//ferme toutes les modales
const hideModals = () => {

  //on commence par vider les options du select pour ne pas qu'il s se dupliquent...
  document.querySelector("#deleteListModal")
    .querySelectorAll("option").forEach(option => option.remove());

  const modalElements = document.querySelectorAll(".modal");
  modalElements.forEach(modal => {
    modal.classList.remove("is-active");
  })
};

/**
 * 
 * @param {string} link : il s'agit du fragment d'url correspondant à la requete
 * @param {string} method : GET or POST or DELETE or PATCH
 * @param {FormData} body : object type FormData
 * @returns if status of response is 200 or 204 : returns the response else false
 */

const fetchApi = async (link = "", method = "GET", body = null) => {

  const options = {};
  options.method = method;

  options.headers = new Headers({
    "Authorization": token[0] || null
  });
  body != null ? options.body = body : null;

  try {
    const request = await fetch(`${baseUrl}${link}`, options);

    switch (request.status) {
      case (200):
        const response = await request.json();
        return response;
      case (204):
        return true;
      default:
        return false;
    }
  } catch (err) {
    console.error(err)
  }
};

//fonction pour trier dans l'ordre les cartes ou les listes
/**
 * 
 * @param {array} array 
 * @returns sort array : if different order, order sort by order else order by createdAt
 */
const orderSort = (array) => {
  array.sort((firstIndex, secondIndex) => {
    if (firstIndex.order == secondIndex.order) {
      return secondIndex.createdAt - firstIndex.createdAt;
    } else {
      return firstIndex.order - secondIndex.order;
    };
  });
  return array;
};

const dragAndDrop = {
  //TODO gerer la position lors du drag and drop...
  //ensemble de 4 methode pour gérer le drag and drop
  dragStartCard: (event) => {
    event.dataTransfer.setData("card", event.target.dataset.cardId);
    event.target.style.border = "solid 4px red";
  },

  dragEndCard: (event) => {
    event.preventDefault();
    event.target.style.border = "none";
  },

  dragOverList: (event) => {
    event.preventDefault();
  },

  dropList: async (event) => {
    event.stopPropagation();
    try {
      const parentElement = event.target.closest(".panel-block");
      const cardDrop = event.dataTransfer.getData("card");
      const cardElement = document.querySelector(`[data-card-id="${cardDrop}"]`);
      parentElement.appendChild(cardElement);

      const requestUpdate = new FormData();
      const parentList = event.target.closest(".listDrop");
      requestUpdate.set("list_id", parseInt(parentList.dataset.listId, 10));

      const cardId = cardElement.dataset.cardId;

      const updateListOfCard = await fetchApi(`/card/${cardId}`, "PATCH", requestUpdate);

      updateListOfCard ? updateListOfCard : alert("Nous n'avons pas réussi à modifier la liste de la carte...");

      //on conserve le style...
      cardElement.style.borderBottom = `solid 4px ${updateListOfCard.color}`;

    } catch (err) {
      console.error(err);
    }
  }
}

export  {
  hideModals,
  fetchApi,
  orderSort,
  dragAndDrop,
  token
};