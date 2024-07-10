import React, { useState, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate, useLocation } from "react-router-dom";
import SuperInput from "../../components/SuperInput";
import TButton from "../../components/TButton";
import SimpleReactValidator from "simple-react-validator";
import { configValidatorFr } from "../../config/validatorLocale";
import { auth } from "../../config/firebase-config";
import { createAssuranceOffer } from "../../api/assurance";

configValidatorFr();

const AssuranceOfferCreate = () => {
  const { state } = useLocation();
  const [form, setForm] = useState({
    compagnie: "",
    typeCouverture: "",
    optionsPaiement: [
      {
        duree: 3,
        prime: 10000,
      },
    ],
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [, forceUpdate] = useState();
  const validatorRef = useRef(
    new SimpleReactValidator({
      element: false,
      locale: "fr",
    })
  );
  const { current: validator } = validatorRef;
  if (!state?.idDemande) {
    return <div> Unauthorized access</div>;
  }
  return (
    <div className="bg-white py-2 flex flex-col overflow-x-hidden">
      <Toaster
        containerClassName="text-center"
        toastOptions={{ duration: 4000 }}
      />
      <h2 className="text-font-bold font-bold text-xl text-center">
        Proposez une offre d'assurance
      </h2>
      {/* <p className="text-center">Soyez clair</p> */}
      <div className="space-y-8">
        <div className="flex flex-wrap justify-between gap-8 mx-2">
          <SuperInput
            htmlFor="compagnieInput"
            labelText="Nom de la compagnie d'assurance"
            placeholder="NSIA"
            type="text"
            className="flex-1 flex-shrink-0 min-w-[300px]"
            value={form.compagnie}
            onChange={(e) => {
              const updatedForm = { ...form };
              updatedForm.compagnie = e.target.value;
              setForm(updatedForm);
            }}
            error={Boolean(
              validator.message(
                "compagnieD'assurance",
                form.compagnie,
                "required|string"
              )
            )}
            message={validator.message(
              "compagnieD'assurance",
              form.compagnie,
              "required|string"
            )}
          />
          <SuperInput
            htmlFor="couvertureInput"
            labelText="Type de couverture"
            placeholder="Tous risques"
            type="text"
            className="flex-1 flex-shrink-0 min-w-[300px]"
            value={form.typeCouverture}
            onChange={(e) => {
              const updatedForm = { ...form };
              updatedForm.typeCouverture = e.target.value;
              setForm(updatedForm);
            }}
            error={Boolean(
              validator.message(
                "typeCouverture",
                form.typeCouverture,
                "required|string"
              )
            )}
            message={validator.message(
              "typeCouverture",
              form.typeCouverture,
              "required|string"
            )}
          />
        </div>

        {form.optionsPaiement.map((_, index) => (
          <OptionPaiementInput
            number={index + 1}
            closeable={index !== 0}
            onClose={() => {
              const newOptions = form.optionsPaiement.filter(
                (_, i) => i !== index
              );
              setForm({ ...form, optionsPaiement: newOptions });
            }}
            dureeValue={form.optionsPaiement[index].duree}
            onDureeChange={(e) => {
              const newForm = structuredClone(form);
              newForm.optionsPaiement[index].duree = e.target.value;
              setForm(newForm);
            }}
            primeValue={form.optionsPaiement[index].prime}
            onPrimeChange={(e) => {
              const newForm = structuredClone(form);
              newForm.optionsPaiement[index].prime = e.target.value;
              setForm(newForm);
            }}
            primeMessage={validator.message(
              "montantPrime",
              form.optionsPaiement[index].prime,
              "required|min:10000,num"
            )}
            dureeMessage={validator.message(
              "duree",
              form.optionsPaiement[index].duree,
              "required|min:1,num"
            )}
          />
        ))}
        <div className="mx-2">
          <label className="block mb-2" htmlFor="descriptionInput">
            Description de l'offre
          </label>
          <textarea
            name="message"
            id="messageInput"
            placeholder="Décrivez les avantages de l'offre d'assurance"
            className="w-full outline-none border border-line rounded-lg focus:ring-1 focus:ring-primary focus:border-primary px-2 py-1"
            rows="6"
            value={form.description}
            onChange={(e) => {
              setForm({ ...form, description: e.target.value });
            }}
          ></textarea>
          {Boolean(
            validator.message("message", form.description, `required|string`)
          ) && (
            <p className="mt-2 text-xs text-secondary">
              {validator.message(
                "message",
                form.description,
                `required|string`
              )}
            </p>
          )}
        </div>
        <div className="flex justify-end items-center mx-2 gap-4">
          <TButton
            className="min-w-fit py-2 px-4"
            onClick={() => {
              const newForm = structuredClone(form);
              newForm.optionsPaiement.push({
                duree: 3,
                prime: 10000,
              });
              setForm(newForm);
            }}
            type="button"
          >
            Ajouter une option de paiement
          </TButton>
          <TButton
            className="min-w-fit py-2 px-4"
            onClick={async () => {
              if (validator.allValid()) {
                setIsLoading(true);
                try {
                  const token = await auth.currentUser.getIdToken(true);
                  const newOffer = {
                    assuranceDemandeId: state.idDemande,
                    compagnie: form.compagnie,
                    typeCouverture: form.typeCouverture,
                    optionsPaiement: form.optionsPaiement.map(
                      (optionPaiement) => ({
                        dureeMois: optionPaiement.duree,
                        prime: optionPaiement.prime,
                      })
                    ),
                    description: form.description,
                  };
                  await createAssuranceOffer(token, newOffer);
                  toast.success("Offre soumise avec succès.");
                  // setTimeout(() => {
                  //   navigate(`/devis/user/${auth.currentUser.uid}`);
                  // }, 2000);
                } catch (error) {
                  if (
                    error.message ===
                    "Firebase: Error (auth/network-request-failed)."
                  )
                    toast.error("Erreur de connexion, veuillez réessayer.");
                  else toast.error("Erreur durant la soumission de l'offre.");
                }
                setIsLoading(false);
              } else {
                validator.showMessages();
                toast.error(
                  "Erreur au sein du formulaire. Veuillez les corriger puis soumettre à nouveau!"
                );
                forceUpdate("");
              }
            }}
            type="button"
            disabled={isLoading}
          >
            Soumettre l'offre
            {isLoading && <ImSpinner9 className="ml-1 animate-spin" />}
          </TButton>
        </div>
      </div>
    </div>
  );
};

export default AssuranceOfferCreate;

const OptionPaiementInput = ({
  number,
  closeable,
  onClose,
  dureeValue,
  onDureeChange,
  dureeMessage,
  primeValue,
  onPrimeChange,
  primeMessage,
}) => {
  return (
    <div className="border border-line py-3 mx-2 rounded-lg relative">
      <span className="inline-block absolute top-0 left-4 -translate-y-1/2  bg-white px-2">
        Option de paiement n°{number}
      </span>
      {closeable && (
        <span
          className="inline-block absolute top-0 right-4 -translate-y-1/2 bg-primary text-white px-2 shadow-sm shadow-primary rounded-sm cursor-pointer select-none"
          onClick={() => {
            onClose();
          }}
        >
          X
        </span>
      )}
      <div className="space-y-8">
        <div className="flex flex-wrap justify-between gap-8 mx-2">
          <SuperInput
            htmlFor={`duree${number}Input`}
            labelText="Durée de validité (en mois)"
            placeholder="3"
            type="number"
            min={1}
            className="flex-1 flex-shrink-0 min-w-[300px]"
            value={dureeValue}
            onChange={(e) => {
              onDureeChange(e);
            }}
            error={true}
            message={dureeMessage}
          />
          <SuperInput
            htmlFor={`prime${number}Input`}
            labelText="Montant de la prime"
            placeholder="15000"
            type="number"
            min={10000}
            className="flex-1 flex-shrink-0 min-w-[300px]"
            value={primeValue}
            onChange={(e) => {
              onPrimeChange(e);
            }}
            error={true}
            message={primeMessage}
          />
        </div>
      </div>
    </div>
  );
};
