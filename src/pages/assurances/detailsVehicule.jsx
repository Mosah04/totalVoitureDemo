import React, { useState, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import TButton from "../../components/TButton";
import { ImSpinner9 } from "react-icons/im";
import { auth } from "../../config/firebase-config";
import SimpleReactValidator from "simple-react-validator";
import { configValidatorFr } from "../../config/validatorLocale";
import { addUserInfos } from "../../api/assurance";
import { useNavigate } from "react-router-dom";

configValidatorFr();
const AssuranceDetVehicule = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ carteGrise: null, carteIdentite: null });

  const navigate = useNavigate();

  const [fileInputMessage, setFileInputMessage] = useState({
    carteGrise: {
      error: false,
      message: "Aucun fichier n'a été sélectionné!",
    },
    carteIdentite: {
      error: false,
      message: "Aucun fichier n'a été sélectionné!",
    },
  });

  const formRef = useRef();
  const carteGriseInput = useRef();
  const carteIdentiteInput = useRef();

  const [, forceUpdate] = useState();
  const validatorRef = useRef(
    new SimpleReactValidator({
      element: false,
      locale: "fr",
    })
  );
  const { current: validator } = validatorRef;

  function validFileType(file, withPdf = true) {
    const fileTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (withPdf) fileTypes.push("application/pdf");
    console.log(file.type);
    return fileTypes.includes(file.type);
  }

  function returnFileSize(number) {
    if (number < 1024) {
      return `${number} octets`;
    } else if (number >= 1024 && number < 1048576) {
      return `${(number / 1024).toFixed(1)} Ko`;
    } else if (number >= 1048576) {
      return `${(number / 1048576).toFixed(1)} Mo`;
    }
  }

  const fileInputManager = ({ target: input }) => {
    setForm({
      ...form,
      [input.name]: null,
    });
    const curFiles = input.files;
    if (curFiles.length === 0) {
      setFileInputMessage({
        ...fileInputMessage,
        [input.name]: {
          error: true,
          message: "Vous n'avez selectionné aucun fichier!",
        },
      });
    } else {
      for (const file of curFiles) {
        if (validFileType(file) && file.size < 5242880) {
          setForm({
            ...form,
            [input.name]: file,
          });
          setFileInputMessage({
            ...fileInputMessage,
            [input.name]: {
              error: false,
              message: `Fichier: ${file.name}, taille ${returnFileSize(
                file.size
              )}.`,
            },
          });
        } else {
          setFileInputMessage({
            ...fileInputMessage,
            [input.name]: {
              error: true,
              message: `Fichier: ${file.name} Type ou taille invalide. Veuillez reprendre.`,
            },
          });
        }
      }
    }
  };

  const submitForm = async () => {
    // Function to check if the required files are present
    const filesValid = () => {
      const isCarteGriseValid = validator.check(form.carteGrise, "required");
      const isCarteIdentiteValid = validator.check(
        form.carteIdentite,
        "required"
      );
      return isCarteGriseValid && isCarteIdentiteValid;
    };

    if (filesValid()) {
      setIsLoading(true);

      try {
        // Get the current user's ID token
        const token = await auth.currentUser.getIdToken(true);
        // Create a FormData object from the form reference and send it with the token
        addUserInfos(token, new FormData(formRef.current));

        // Notify the user of successful submission
        toast.success(
          "Informations enregistrées avec succès. Vous recevrez bientôt les propositions d'assurance."
        );

        setTimeout(() => {
          navigate("/assurances");
        }, 2000);
      } catch (error) {
        // Handle errors based on the error message
        if (
          error.message === "Firebase: Error (auth/network-request-failed)."
        ) {
          toast.error("Erreur de connexion, veuillez réessayer.");
        } else {
          toast.error("Erreur, veuillez réessayer.");
        }
      } finally {
        setIsLoading(false); // Ensure loading state is reset
      }
    } else {
      // Notify the user about form validation errors
      toast.error(
        "Erreur au sein du formulaire. Veuillez les corriger puis soumettre à nouveau!"
      );

      // Force a re-render to show validation messages
      forceUpdate("");
    }
  };

  return (
    <div className="bg-white py-2 flex flex-col overflow-x-hidden">
      <Toaster
        containerClassName="text-center"
        toastOptions={{ duration: 4000 }}
      />
      <h2 className="text-font-bold font-bold text-xl text-center">
        Plus de détails
      </h2>
      <p className="text-center">
        Afin de vous proposer des offres d'assurances qui vous conviennent, nous
        auront besoin de quelques informations.
      </p>

      <form className="mx-2" ref={formRef} encType="multipart/form-data">
        <div className="py-4 pl-1 border-l-4 border-l-primary">
          <p>Veuillez soumettre les pièces demandées ci-après:</p>
          <p className=" mt-2 text-sm text-primary">
            Format de fichiers autorisés: png, jpg, jpeg, pdf. Taille maximale
            par fichier: 5Mo.
          </p>
        </div>
        <div className="flex items-center justify-between gap-4 flex-wrap py-4 border-b border-line">
          <span>Carte grise</span>
          <div className="flex gap-2 md:gap-10 items-center flex-wrap">
            <input
              className="hidden"
              type="file"
              name="carteGrise"
              id="carteGrise"
              accept=".jpg, .jpeg, .png, .pdf"
              onChange={(e) => fileInputManager(e)}
              ref={carteGriseInput}
            />
            <span
              className={`${
                fileInputMessage.carteGrise.error ? "text-secondary" : ""
              }`}
            >
              {fileInputMessage.carteGrise.message}
            </span>
            <label htmlFor="carteGrise">
              <TButton
                className="min-w-fit py-2 px-4 self-end"
                type="button"
                onClick={() => {
                  carteGriseInput.current.click();
                }}
              >
                Ajouter
              </TButton>
            </label>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 flex-wrap py-4 border-b border-line">
          <span>Votre carte d'identité</span>
          <div className="flex gap-2 md:gap-10 items-center flex-wrap">
            <input
              className="hidden"
              type="file"
              name="carteIdentite"
              id="carteIdentite"
              accept=".jpg, .jpeg, .png, .pdf"
              onChange={(e) => fileInputManager(e)}
              ref={carteIdentiteInput}
            />
            <span
              className={`${
                fileInputMessage.carteIdentite.error ? "text-secondary" : ""
              }`}
            >
              {fileInputMessage.carteIdentite.message}
            </span>
            <label htmlFor="contratAssurance">
              <TButton
                className="min-w-fit py-2 px-4 self-end"
                type="button"
                onClick={() => {
                  carteIdentiteInput.current.click();
                }}
              >
                Ajouter
              </TButton>
            </label>
          </div>
        </div>

        <div className="flex justify-between items-center my-2">
          <TButton
            className="min-w-fit py-2 px-4 ml-auto"
            type="button"
            disabled={isLoading}
            onClick={() => {
              submitForm();
            }}
          >
            Soumettre
            {isLoading && <ImSpinner9 className="ml-1 animate-spin" />}
          </TButton>
        </div>
      </form>
    </div>
  );
};

export default AssuranceDetVehicule;
