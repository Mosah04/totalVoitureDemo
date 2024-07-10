import React, { useState, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate, useLoaderData, useParams } from "react-router-dom";
import ServiceInput from "../../components/serviceInput";
import SuperInput from "../../components/SuperInput";
import TButton from "../../components/TButton";
import SimpleReactValidator from "simple-react-validator";
import { configValidatorFr } from "../../config/validatorLocale";
import { auth } from "../../config/firebase-config";
import { updateDevis } from "../../api/devis";

configValidatorFr();

const DevisEdit = () => {
  const { devisId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { devis } = useLoaderData();
  const initialForm = useRef(devis);
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
        Modifiez votre devis
      </h2>
      <div className="space-y-8">
        {form.services.map((service, index) => (
          <ServiceInput
            key={index}
            number={index + 1}
            closeable={index !== 0}
            onClose={() => {
              const newServices = form.services.filter((_, i) => i !== index);
              setForm({ ...form, services: newServices });
            }}
            descriptionValue={service.description}
            onDescriptionChange={(e) => {
              const newForm = { ...form };
              newForm.services[index].description = e.target.value;
              setForm(newForm);
            }}
            quantityValue={service.quantite}
            onQuantityChange={(e) => {
              const newForm = { ...form };
              newForm.services[index].quantite = e.target.value;
              setForm(newForm);
            }}
            unitPriceValue={service.prix}
            onUnitPriceChange={(e) => {
              const newForm = { ...form };
              newForm.services[index].prix = e.target.value;
              setForm(newForm);
            }}
            totalPriceValue={new Intl.NumberFormat("bj-BJ", {
              style: "currency",
              currency: "XOF",
            }).format(service.quantite * service.prix)}
            descriptionMessage={validator.message(
              `description`,
              service.description,
              "required|string"
            )}
            unitPriceMessage={validator.message(
              `prixUnitaire`,
              service.prix,
              "required|min:100,num"
            )}
            quantityMessage={validator.message(
              `quantité`,
              service.quantite,
              "required|min:1,num"
            )}
          />
        ))}
        <SuperInput
          htmlFor={`delayInput`}
          labelText="Délai d'exécution (en jours)"
          placeholder="30"
          type="number"
          min={10}
          className="flex-1 flex-shrink-0 min-w-[300px] mx-4"
          value={form.delai}
          onChange={(e) => {
            setForm({ ...form, delai: e.target.value });
          }}
          //   error={Boolean(
          //     validator.message("délai", form.delai, "required|min:10,num")
          //   )}
          //   message={validator.message(
          //     "délai",
          //     form.delai,
          //     "required|min:10,num"
          //   )}
        />
        <div className="flex justify-end items-center mx-4 gap-4">
          <TButton
            className="min-w-fit py-2 px-4"
            onClick={() => {
              const newForm = { ...form };
              newForm.services.push({
                description: "",
                prix: 100,
                quantite: 1,
              });
              setForm(newForm);
            }}
            type="button"
          >
            Ajouter un service
          </TButton>
          <TButton
            className="min-w-fit py-2 px-4"
            onClick={async () => {
              if (validator.allValid()) {
                setIsLoading(true);
                try {
                  const token = await auth.currentUser.getIdToken(true);
                  const updatedDevis = {
                    cout: form.services.reduce((total, service) => {
                      return total + service.prix * service.quantite;
                    }, 0),
                    delai: form.delay,
                    services: form.services.map((service) => ({
                      description: service.description,
                      prix: service.prix,
                      quantite: service.quantite,
                    })),
                  };
                  await updateDevis(token, devisId, updatedDevis);
                  toast.success("Devis modifié avec succès.");
                  navigate("/devis");
                } catch (error) {
                  if (
                    error.message ===
                    "Firebase: Error (auth/network-request-failed)."
                  )
                    toast.error("Erreur de connexion, veuillez réessayer.");
                  else {
                    toast.error("Erreur lors de la modification du devis");
                    console.log(error);
                  }
                } finally {
                  setIsLoading(false);
                }
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
            Modifier le devis
            {isLoading && <ImSpinner9 className="ml-1 animate-spin" />}
          </TButton>
        </div>
      </div>
    </div>
  );
};

export default DevisEdit;
