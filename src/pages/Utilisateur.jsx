import React from 'react'
import { Routes,Route } from 'react-router-dom'
import UtilisateurShow from './utilisateurs/show'
import UtilisateurIndex from './utilisateurs/index'

const Utilisateur = () => {
  return <section className="flex flex-col gap-4">
  <h1 className="text-xl text-font-bold font-bold">
    Utilisateurs
  </h1>
  <div className="w-full">
    <Routes>
      <Route path="" element={<UtilisateurIndex />} />
      <Route path="edit" element={<div>Edit oh</div>} />
      <Route path="show" element={<UtilisateurShow />} />
      <Route path="*" element={<div>Not found x(</div>} />
    </Routes>
  </div>
</section>
}

export default Utilisateur
