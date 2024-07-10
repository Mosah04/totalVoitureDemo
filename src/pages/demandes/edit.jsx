import React, { useState, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import TButton from "../../components/TButton";
import SuperInput from "../../components/SuperInput";
import SimpleReactValidator from "simple-react-validator";
import { configValidatorFr } from "../../config/validatorLocale";
import { auth } from "../../config/firebase-config";
import { ImSpinner9 } from "react-icons/im";
import { updateDemande } from "../../api/demande";
import { useNavigate, useLoaderData, useParams } from "react-router-dom";

configValidatorFr();

const DemandeEdit = () => {
  const { demandeId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const { demande } = useLoaderData();
  const initialForm = useRef(demande);
  const [form, setForm] = useState(initialForm.current);
  const [, forceUpdate] = useState();
  const validatorRef = useRef(
    new SimpleReactValidator({
      element: false,
      locale: "fr",
    })
  );
  const { current: validator } = validatorRef;
  const navigate = useNavigate();
  return (
    <div className="bg-white py-2 flex flex-col overflow-x-hidden">
      <Toaster
        containerClassName="text-center"
        toastOptions={{ duration: 4000 }}
      />
      <h2 className="text-font-bold font-bold text-xl text-center">
        Modifiez votre demande
      </h2>
      <form className="">
        <div className={`space-y-8`}>
          <div className="flex flex-wrap justify-between gap-8 mx-2">
            <SuperInput
              htmlFor="marqueInput"
              labelText="Marque du véhicule"
              name="marqueVehicule"
              placeholder="Toyota"
              type="text"
              className="flex-1 flex-shrink-0 min-w-[300px]"
              value={form.detailsVehicule.marque}
              onChange={(e) => {
                const updatedForm = { ...form };
                updatedForm.detailsVehicule.marque = e.target.value;
                setForm(updatedForm);
              }}
              error={Boolean(
                validator.message(
                  "marqueVehicule",
                  form.detailsVehicule.marque,
                  "required|string"
                )
              )}
              message={validator.message(
                "marqueVehicule",
                form.detailsVehicule.marque,
                "required|string"
              )}
            />
            <SuperInput
              htmlFor="modeleInput"
              labelText="Modèle du véhicule"
              name="modeleVehicule"
              placeholder="Corola"
              type="text"
              className="flex-1 flex-shrink-0 min-w-[300px]"
              value={form.detailsVehicule.modele}
              onChange={(e) => {
                const updatedForm = { ...form };
                updatedForm.detailsVehicule.modele = e.target.value;
                setForm(updatedForm);
              }}
              error={Boolean(
                validator.message(
                  "modeleVehicule",
                  form.detailsVehicule.modele,
                  "required|string"
                )
              )}
              message={validator.message(
                "modeleVehicule",
                form.detailsVehicule.modele,
                "required|string"
              )}
            />
          </div>
          <div className="flex flex-wrap justify-between gap-8 mx-2">
            <SuperInput
              htmlFor="anneeInput"
              labelText="Année de sortie du véhicule"
              name="anneeVehicule"
              min={1990}
              max={new Date().getFullYear()}
              placeholder="2000"
              type="number"
              className="flex-1 flex-shrink-0 min-w-[300px]"
              value={form.detailsVehicule.annee}
              onChange={(e) => {
                const updatedForm = { ...form };
                updatedForm.detailsVehicule.annee = e.target.value;
                setForm(updatedForm);
              }}
              error={Boolean(
                validator.message(
                  "anneeVehicule",
                  Number(form.detailsVehicule.annee),
                  `required|between:1990,${new Date().getFullYear()},num`
                )
              )}
              message={validator.message(
                "anneeVehicule",
                Number(form.detailsVehicule.annee),
                `required|between:1990,${new Date().getFullYear()},num`
              )}
            />
            <div className="flex-1 flex-shrink-0 min-w-[300px]">
              <label
                className="block mb-2 text-sm font-medium text-font-light"
                htmlFor="typeSelect"
              >
                Sélectionnez l'état du véhicule
              </label>
              <select
                onChange={(e) => {
                  const updatedForm = { ...form };
                  updatedForm.detailsVehicule.etat = e.target.value;
                  setForm(updatedForm);
                }}
                className="bg-transparent border border-line text-font-normal text-sm rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none block w-full p-2.5"
                name="etatVehicule"
                id="typeSelect"
                value={form.detailsVehicule.etat}
              >
                <option value="occasion">Occasion</option>
                <option value="neuf">Neuf</option>
              </select>
              <p
                className={`text-xs ${
                  Boolean(
                    validator.message(
                      "typeVehicule",
                      form.detailsVehicule.etat,
                      ["required", { in: ["occasion", "neuf"] }]
                    )
                  )
                    ? "text-secondary"
                    : ""
                }`}
              >
                {Boolean(
                  validator.message("etatVehicule", form.detailsVehicule.etat, [
                    "required",
                    { in: ["occasion", "neuf"] },
                  ])
                )}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-between gap-8 mx-2">
            <SuperInput
              htmlFor="departInput"
              labelText="Entrez le pays de départ du véhicule"
              name="paysDepart"
              placeholder="Chine"
              type="text"
              className="flex-1 flex-shrink-0 min-w-[300px]"
              value={form.paysDepart}
              onChange={(e) => {
                const updatedForm = { ...form };
                updatedForm.paysDepart = e.target.value;
                setForm(updatedForm);
              }}
              error={Boolean(
                validator.message(
                  "paysDepart",
                  form.paysDepart,
                  `required|string`
                )
              )}
              message={validator.message(
                "paysDepart",
                form.paysDepart,
                `required|string`
              )}
            />
            <SuperInput
              htmlFor="arriveeInput"
              labelText="Entrez le pays d'arrivée du véhicule"
              name="paysArrivee"
              placeholder="Bénin"
              type="text"
              className="flex-1 flex-shrink-0 min-w-[300px]"
              value={form.paysArrivee}
              onChange={(e) => {
                const updatedForm = { ...form };
                updatedForm.paysArrivee = e.target.value;
                setForm(updatedForm);
              }}
              error={Boolean(
                validator.message(
                  "paysArrivee",
                  form.paysArrivee,
                  `required|string`
                )
              )}
              message={validator.message(
                "paysArrivee",
                form.paysArrivee,
                `required|string`
              )}
            />
          </div>
          <div className="flex flex-wrap justify-between gap-8 mx-2">
            <SuperInput
              htmlFor="chassisInput"
              labelText="Entrez le numéro de chassis du véhicule"
              name="chassisVehicule"
              placeholder="AVBCDET541SD52L6Z"
              type="text"
              className="flex-1 flex-shrink-0 min-w-[300px]"
              value={form.detailsVehicule.chassis}
              onChange={(e) => {
                const updatedForm = { ...form };
                updatedForm.detailsVehicule.chassis = e.target.value;
                setForm(updatedForm);
              }}
              error={Boolean(
                validator.message(
                  "chassisVehicule",
                  form.detailsVehicule.chassis,
                  ["required", { regex: "^[A-HJ-NPR-Z0-9]{17}$" }]
                )
              )}
              message={validator.message(
                "chassisVehicule",
                form.detailsVehicule.chassis,
                ["required", { regex: "^[A-HJ-NPR-Z0-9]{17}$" }]
              )}
            />
          </div>
          <div className="mx-2">
            <label className="block mb-2" htmlFor="descriptionInput">
              Message de la demande (facultatif)
            </label>
            <textarea
              name="message"
              id="messageInput"
              placeholder="Entrez un message ici"
              className="w-full outline-none border border-line rounded-lg focus:ring-1 focus:ring-primary focus:border-primary px-2 py-1"
              rows="6"
              value={form.message}
              onChange={(e) => {
                setForm({ ...form, message: e.target.value });
              }}
            ></textarea>
            {Boolean(validator.message("message", form.message, `string`)) && (
              <p className="mt-2 text-xs text-secondary">
                {validator.message("message", form.message, `string`)}
              </p>
            )}
          </div>
        </div>
      </form>
      <div className="flex justify-between items-center mx-2">
        <TButton
          className="min-w-fit py-2 px-4 ml-auto"
          type="button"
          onClick={async () => {
            if (validator.allValid()) {
              let isError = false;
              alert("You submitted the form and stuff!");
              setIsLoading(true);
              try {
                const token = await auth.currentUser.getIdToken(true);
                await updateDemande(token, demandeId, form);
              } catch (error) {
                isError = true;
                if (
                  error.message ===
                  "Firebase: Error (auth/network-request-failed)."
                )
                  toast.error("Erreur de connexion, veuillez réessayer.");
                else {
                  toast.error("Erreur lors de l'enregistrement");
                  console.log(error);
                }
              } finally {
                setIsLoading(false);
              }
              if (!isError) {
                toast.success("Demande modifiée avec succès.");
              }
              navigate("/importations");
            } else {
              validator.showMessages();
              toast.error(
                "Erreur au sein du formulaire. Veuillez les corriger puis soumettre à nouveau!"
              );
              // rerender to show messages for the first time
              // you can use the autoForceUpdate option to do this automatically`
              forceUpdate("");
            }
          }}
        >
          Soumettre
          {isLoading && <ImSpinner9 className="ml-1 animate-spin" />}
        </TButton>
      </div>
    </div>
  );
};

export default DemandeEdit;
