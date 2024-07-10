import React, { useState, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate, useLocation } from "react-router-dom";
import ServiceInput from "../../components/serviceInput";
import SuperInput from "../../components/SuperInput";
import TButton from "../../components/TButton";
import SimpleReactValidator from "simple-react-validator";
import { configValidatorFr } from "../../config/validatorLocale";
import { auth } from "../../config/firebase-config";
import { createDevis } from "../../api/devis";

configValidatorFr();

const DevisCreate = () => {
  const { state } = useLocation();
  const [form, setForm] = useState({
    services: [
      {
        description: "",
        unitPrice: 100,
        quantity: 1,
      },
    ],
    delay: 10,
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
        Proposez votre devis
      </h2>
      <p className="text-center">Soyez clair</p>
      <div className="space-y-8">
        <ServiceInput
          number={1}
          closeable={false}
          descriptionValue={form.services[0].description}
          onDescriptionChange={(e) => {
            console.log("CHANGE", e.target.value);
            const newForm = structuredClone(form);
            newForm.services[0].description = e.target.value;
            setForm(newForm);
            console.log(form);
          }}
          quantityValue={form.services[0].quantity}
          onQuantityChange={(e) => {
            const newForm = structuredClone(form);
            newForm.services[0].quantity = e.target.value;
            setForm(newForm);
          }}
          unitPriceValue={form.services[0].unitPrice}
          onUnitPriceChange={(e) => {
            const newForm = structuredClone(form);
            newForm.services[0].unitPrice = e.target.value;
            setForm(newForm);
          }}
          totalPriceValue={new Intl.NumberFormat("bj-BJ", {
            style: "currency",
            currency: "XOF",
          }).format(form.services[0].quantity * form.services[0].unitPrice)}
          descriptionMessage={validator.message(
            "description",
            form.services[0].description,
            "required|string"
          )}
          unitPriceMessage={validator.message(
            "prixUnitaire",
            form.services[0].unitPrice,
            "required|min:100,num"
          )}
          quantityMessage={validator.message(
            "quantité",
            form.services[0].quantity,
            "required|min:1,num"
          )}
        />
        {form.services
          .filter((_, i) => i !== 0)
          .map((_, index) => (
            <ServiceInput
              number={index + 2}
              closeable={true}
              onClose={() => {
                const newServices = form.services.filter((_, i) => i !== index);
                setForm({ ...form, services: newServices });
              }}
              descriptionValue={form.services[index + 1].description}
              onDescriptionChange={(e) => {
                console.log("CHANGE", e.target.value);
                const newForm = structuredClone(form);
                newForm.services[index + 1].description = e.target.value;
                setForm(newForm);
                console.log(form);
              }}
              quantityValue={form.services[index + 1].quantity}
              onQuantityChange={(e) => {
                const newForm = structuredClone(form);
                newForm.services[index + 1].quantity = e.target.value;
                setForm(newForm);
              }}
              unitPriceValue={form.services[index + 1].unitPrice}
              onUnitPriceChange={(e) => {
                const newForm = structuredClone(form);
                newForm.services[index + 1].unitPrice = e.target.value;
                setForm(newForm);
              }}
              totalPriceValue={new Intl.NumberFormat("bj-BJ", {
                style: "currency",
                currency: "XOF",
              }).format(
                form.services[index + 1].quantity *
                  form.services[index + 1].unitPrice
              )}
              descriptionMessage={validator.message(
                "description",
                form.services[index + 1].description,
                "required|string"
              )}
              unitPriceMessage={validator.message(
                "prixUnitaire",
                form.services[index + 1].unitPrice,
                "required|min:100,num"
              )}
              quantityMessage={validator.message(
                "quantité",
                form.services[index + 1].quantity,
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
          value={form.delay}
          onChange={(e) => {
            setForm({ ...form, delay: e.target.value });
          }}
          //   error={true}
          //   message={descriptionMessage}
        />
        <div className="flex justify-end items-center mx-4 gap-4">
          <TButton
            className="min-w-fit py-2 px-4"
            onClick={() => {
              const newForm = structuredClone(form);
              newForm.services.push({
                description: "",
                unitPrice: 100,
                quantity: 1,
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
                  const newDevis = {
                    idDemande: state.idDemande,
                    cout: form.services.reduce((total, service) => {
                      return total + service.unitPrice * service.quantity;
                    }, 0),
                    delai: form.delay,
                    services: form.services.map((service) => ({
                      description: service.description,
                      prix: service.unitPrice,
                      quantite: service.quantity,
                    })),
                  };
                  await createDevis(token, newDevis);
                  toast.success("Devis créé avec succès.");
                  setTimeout(() => {
                    navigate(`/devis/user/${auth.currentUser.uid}`);
                  }, 2000);
                } catch (error) {
                  if (
                    error.message ===
                    "Firebase: Error (auth/network-request-failed)."
                  )
                    toast.error("Erreur de connexion, veuillez réessayer.");
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
            Soumettre le devis
            {isLoading && <ImSpinner9 className="ml-1 animate-spin" />}
          </TButton>
        </div>
      </div>
    </div>
  );
};

export default DevisCreate;
