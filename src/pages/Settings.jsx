import React from "react";

const Settings = () => {
  return (
    <div className="bg-white">
      <section class="bg-white ">
        <div class="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <form action="#">
            <nav class="bg-white shadow-md py-4">
              <div class="container mx-auto flex justify-between items-center">
                <div class="flex space-x-6 text-gray-700">
                  <a
                    href="#"
                    class="hover:text-primary transition-colors duration-300"
                  >
                    Mon profil
                  </a>
                  <a
                    href="#"
                    class="hover:text-primary transition-colors duration-300"
                  >
                    Mon mot de passe
                  </a>
                  <a
                    href="#"
                    class="hover:text-primary transition-colors duration-300"
                  >
                    Détails véhicules
                  </a>
                  <a
                    href="#"
                    class="hover:text-primary transition-colors duration-300"
                  >
                    Notifications
                  </a>
                </div>
              </div>
            </nav>

            <div class="bg-white p-4 shadow-md rounded-md">
              <h2 class="text-xl font-bold text-gray-800 mb-2">Mon profil</h2>
              <div class="text-gray-600">
                Mettez à jour votre profil et vos informations personnelles ici.
              </div>
            </div>

            <div class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-t-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer">
              <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5 ">
                <div class="w-full">
                  <label
                    for="Ville"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Ville
                  </label>
                  <input
                    type="text"
                    name="Ville"
                    id="Ville"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Porto-Novo"
                    required=""
                  />
                </div>
                <div class="w-full">
                  <label
                    for="Adresse"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Adresse
                  </label>
                  <input
                    type="text"
                    name="Adresse"
                    id="Adresse"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="545eme Rue"
                    required=""
                  />
                </div>
                <div class="sm:col-span-2">
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Adresse mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="totzoulou@gmail.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="date"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Date de naissance
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="totzoulou@gmail.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="Genre"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Genre
                  </label>
                  <select
                    id="Genre"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                  >
                    <option selected="">Homme</option>
                    <option value="femme">Femme</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between bg-white shadow-md rounded-lg p-4">
              <div>
                <h2 class="text-gray-800 font-bold">Ma photo</h2>
                <p class="text-gray-600">
                  Cette photo sera mise à votre profil
                </p>
              </div>
              <div class="w-16 h-16 rounded-full overflow-hidden">
                <img
                  src="https://th.bing.com/th/id/OIP.J4D2sw3inRpeyyZfUlHnvgHaFL?rs=1&pid=ImgDetMain"
                  alt="Profile Photo"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="flex space-x-2">
                <button class="hover:text-red-400 transition-colors duration-300 text-gray-700 py-2 px-4 rounded-md  transition-colors duration-300">
                  Supprimer
                </button>
                <button class="hover:text-primary transition-colors duration-300 text-gray-700 py-2 px-4 rounded-md transition-colors duration-300">
                  Mettre à jour
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section class="bg-white dark:bg-gray-900 ">
        <div class="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <form class="max-w-sm mx-auto ">
            <div class="bg-white p-4 shadow-md rounded-md">
              <h2 class="text-xl font-bold text-gray-800 mb-2">
                Mon mot de passe
              </h2>
              <div class="text-gray-600">
                Mettez a jour votre mot de passe pour plus de securite.
              </div>
            </div>
            <div class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-t-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer">
              <div class="mb-5">
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Mot de passe actuel
                </label>
                <input
                  type="password"
                  id="password"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <div class="mb-5">
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <div class="mb-5">
                <label
                  for="repeat-password"
                  class="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Confirmez le Nouveau mot de passe
                </label>
                <input
                  type="password"
                  id="repeat-password"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Mettre a jour
              </button>
            </div>
          </form>
        </div>
      </section>


  <div class="flex">
      <div class="w-full max-w-full p-4 text-gray-500 bg-white rounded-lg shadow-lg   transform transition-all duration-300 ease-in-out" role="alert">
          <div class="flex items-start">
              <img class="w-10 h-10 rounded-full border-2 border-blue-500" src="https://nypost.com/wp-content/uploads/sites/2/2021/12/Ameca_02-1.jpg?quality=90&strip=all" alt="Jese Leos image"/>
              <div class="ms-3 text-sm font-normal flex-1">
                  <span class="block mb-1 text-sm font-semibold text-gray-900 ">Jese Leos</span>
                  <div class="mb-2 text-sm font-normal">
                      Votre assurance prend fin dans 2 mois, pensez vous rapprocher de l'agence le plus proche...
                  </div>
                  <div class="flex space-x-2">
                      <a href="#" class="inline-flex px-3 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-6">Lire plus</a>
                  </div>
              </div>
            
              <div class="flex items-center">
          <div class="">
              <p>Il y a quelques jours</p>
          </div>
      </div>
        </div>
      </div> 
</div>

<div class="flex">
      <div class="w-full max-w-full p-4 text-gray-500 bg-white rounded-lg shadow-lg   transform transition-all duration-300 ease-in-out" role="alert">
          <div class="flex items-start">
              <img class="w-10 h-10 rounded-full border-2 border-blue-500" src="https://nypost.com/wp-content/uploads/sites/2/2021/12/Ameca_02-1.jpg?quality=90&strip=all" alt="Jese Leos image"/>
              <div class="ms-3 text-sm font-normal flex-1">
                  <span class="block mb-1 text-sm font-semibold text-gray-900 ">Jese Leos</span>
                  <div class="mb-2 text-sm font-normal">
                      Votre assurance prend fin dans 2 mois, pensez vous rapprocher de l'agence le plus proche...
                  </div>
                  <div class="flex space-x-2">
                      <a href="#" class="inline-flex px-3 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-6">Lire plus</a>
                  </div>
              </div>
            
              <div class="flex items-center">
          <div class="">
              <p>Il y a quelques jours</p>
          </div>
      </div>
        </div>
      </div> 
</div>

<div class="flex">
      <div class="w-full max-w-full p-4 text-gray-500 bg-white rounded-lg shadow-lg   transform transition-all duration-300 ease-in-out" role="alert">
          <div class="flex items-start">
              <img class="w-10 h-10 rounded-full border-2 border-blue-500" src="https://nypost.com/wp-content/uploads/sites/2/2021/12/Ameca_02-1.jpg?quality=90&strip=all" alt="Jese Leos image"/>
              <div class="ms-3 text-sm font-normal flex-1">
                  <span class="block mb-1 text-sm font-semibold text-gray-900 ">Jese Leos</span>
                  <div class="mb-2 text-sm font-normal">
                      Votre assurance prend fin dans 2 mois, pensez vous rapprocher de l'agence le plus proche...
                  </div>
                  <div class="flex space-x-2">
                      <a href="#" class="inline-flex px-3 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-6">Lire plus</a>
                  </div>
              </div>
            
              <div class="flex items-center">
          <div class="">
              <p>Il y a quelques jours</p>
          </div>
      </div>
        </div>
      </div> 
</div>

    </div>
  );
};

export default Settings;
