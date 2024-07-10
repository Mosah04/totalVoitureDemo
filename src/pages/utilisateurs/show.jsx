import React from 'react'

const UtilisateurShow = () => {
  return (
    <div>
      <div className="flex flex-col items-center mb-4">
        <img src="https://th.bing.com/th/id/R.6093c4a2755f22120824206d38d1b787?rik=g9u%2bWG%2f7OwP82w&pid=ImgRaw&r=0" alt="Photo de profil" className="w-32 h-32 rounded-full mb-2" />
        <div className="text-center">
          <h3 className="text-lg font-bold">John Doe</h3>
          <p className="text-gray-600">Transitaire</p>
        </div>
      </div>
      <div class="w-full p-4">
        
        <div class="overflow-x-auto">
            <table class="w-full text-sm text-left bg-gray-50 border border-gray-200 rounded-lg shadow-md">
                <thead class="bg-primary text-white text-xs uppercase">
                    <tr>
                        <th scope="col" class="px-4 py-3">Nombre de Vehicule importe</th>
                        <th scope="col" class="px-4 py-3">Nombre de demande</th>
                        <th scope="col" class="px-4 py-3">Nombre de clients satisfait</th>
                        <th scope="col" class="px-4 py-3">Avis des clients</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b">
                        <td class="px-4 py-3">134231</td>
                        <td class="px-4 py-3">1871761</td>
                        <td class="px-4 py-3">123 clients</td>
                        <td class="px-4 py-3">Service satisfaisant</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    </div>
  )
}

export default UtilisateurShow
