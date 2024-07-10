import React, { useRef, useState } from "react";
import SuperInput from "../../components/SuperInput";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import TButton from "../../components/TButton";
import { FaArrowRight, FaFileImage } from "react-icons/fa6";
import { updateAnnonce } from "../../api";
import { auth } from "../../config/firebase-config";
import { ImSpinner9 } from "react-icons/im";
import SimpleReactValidator from "simple-react-validator";
import { configValidatorFr } from "../../config/validatorLocale";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
const { REACT_APP_BACKEND_URL } = process.env;

configValidatorFr();
const AnnonceEdit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const { annonceId } = useParams();

  const { annonce } = useLoaderData();
  const initialForm = useRef(annonce);
  const [form, setForm] = useState(initialForm.current);

  const [fileInputMessage, setFileInputMessage] = useState({
    carteGrise: {
      error: false,
      message: "Aucun fichier n'a été sélectionné!",
    },
    visiteTechnique: {
      error: false,
      message: "Aucun fichier n'a été sélectionné!",
    },
    TVM: {
      error: false,
      message: "Aucun fichier n'a été sélectionné!",
    },
    contratAssurance: {
      error: false,
      message: "Aucun fichier n'a été sélectionné!",
    },
  });

  const [photoInputMessage, setPhotoInputMessage] = useState({
    0: {
      error: false,
      message: "Aucun fichier n'a été sélectionné!",
    },
    1: {
      error: false,
      message: "Aucun fichier n'a été sélectionné!",
    },
    2: {
      error: false,
      message: "Aucun fichier n'a été sélectionné!",
    },
    3: {
      error: false,
      message: "Aucun fichier n'a été sélectionné!",
    },
  });
  if (!form.regularisation)
    for (const key of Object.keys(fileInputMessage))
      fileInputMessage[key].message = "Aucun fichier n'a été sélectionné!";

  const [, forceUpdate] = useState();
  const validatorRef = useRef(
    new SimpleReactValidator({
      element: false,
      locale: "fr",
    })
  );
  const { current: validator } = validatorRef;
  const TVMInput = useRef();
  const carteGriseInput = useRef();
  const visiteTechniqueInput = useRef();
  const contratAssuranceInput = useRef();
  const formRef = useRef();

  function validFileType(file, withPdf = true) {
    const fileTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (withPdf) fileTypes.push("application/pdf");
    console.log(typeof "file");
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

  const fileInputManager = ({ current: input }) => {
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
            detailsVehicule: {
              ...form.detailsVehicule,
              pieces: {
                ...form.detailsVehicule.pieces,
                [input.name]:
                  form.detailsVehicule.pieces[input.name].push(file),
              },
            },
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
          console.log(form);
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
  const photoInputManager = ({ target: input }) => {
    let tofs = [...form.detailsVehicule.photos];
    const curFiles = input.files;
    if (curFiles.length === 0) {
      setPhotoInputMessage({
        ...photoInputMessage,
        [Number(input.name)]: {
          error: true,
          message: "Vous n'avez selectionné aucun fichier!",
        },
      });
    } else {
      for (const file of curFiles) {
        if (validFileType(file, false) && file.size < 5242880) {
          tofs[Number(input.name)] = file;
          setForm({
            ...form,
            detailsVehicule: {
              ...form.detailsVehicule,
              photos: [...tofs],
            },
          });
          setPhotoInputMessage({
            ...photoInputMessage,
            [Number(input.name)]: {
              error: false,
              message: `Fichier: ${file.name}, taille ${returnFileSize(
                file.size
              )}.`,
            },
          });
        } else {
          setPhotoInputMessage({
            ...photoInputMessage,
            [Number(input.name)]: {
              error: true,
              message: `Fichier: ${file.name} Type ou taille invalide. Veuillez reprendre.`,
            },
          });
        }
      }
    }
  };

  const navigate = useNavigate();
  const submitForm = async () => {
    const filesValid = () => {
      const fileBol =
        validator.check(form.detailsVehicule.photos[0], "required") &&
        validator.check(form.detailsVehicule.photos[1], "required") &&
        validator.check(form.detailsVehicule.photos[2], "required") &&
        validator.check(form.detailsVehicule.photos[3], "required");
      return !form.regularisation
        ? fileBol
        : fileBol &&
            validator.check(form.detailsVehicule.pieces.TVM, "required") &&
            validator.check(
              form.detailsVehicule.pieces.carteGrise,
              "required"
            ) &&
            validator.check(
              form.detailsVehicule.pieces.contratAssurance,
              "required"
            ) &&
            validator.check(
              form.detailsVehicule.pieces.visiteTechnique,
              "required"
            );
    };
    if (validator.allValid() && filesValid()) {
      setIsLoading(true);
      try {
        const token = await auth.currentUser.getIdToken(true);
        updateAnnonce(token, annonceId, new FormData(formRef.current));
      } catch (error) {
        if (error.message === "Firebase: Error (auth/network-request-failed).")
          toast.error("Erreur de connexion, veuillez réessayer.");
      }
      setIsLoading(false);
      toast.success("Annonce modifiée avec succès!");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate(`/annonces/${annonceId}`);
    } else {
      validator.showMessages();
      toast.error(
        "Erreur au sein du formulaire. Veuillez les corriger puis soumettre à nouveau!"
      );
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      forceUpdate("");
      console.log(
        Number(form.detailsVehicule.annee),
        Number(form.prixVehicule)
      );
    }
  };

  return (
    <div className="bg-white py-2 flex flex-col overflow-x-hidden">
      <Toaster
        containerClassName="text-center"
        toastOptions={{ duration: 4000 }}
      />
      <h2 className="text-font-bold font-bold text-xl text-center">
        Créez une annonce {`${page}/2`}
      </h2>
      <form className="" ref={formRef} encType="multipart/form-data">
        <div
          className={`w-[200%] ${
            page === 1 ? "" : "translate-x-[-50%] mr-2"
          } transition-transform duration-500 ease-in-out flex gap-2`}
        >
          <div
            className={`space-y-8 w-1/2 flex-shrink-0 flex-grow-0 ${
              page !== 1 ? "translate-x-[-102%]" : ""
            }`}
          >
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
              <SuperInput
                htmlFor="prixInput"
                labelText="Prix du véhicule"
                name="prixVehicule"
                min={100000}
                placeholder="300000"
                type="number"
                className="flex-1 flex-shrink-0 min-w-[300px]"
                value={form.prixVehicule}
                onChange={(e) => {
                  setForm({ ...form, prixVehicule: e.target.value });
                }}
                error={Boolean(
                  validator.message(
                    "prixVehicule",
                    Number(form.prixVehicule),
                    `required|numeric|min:300000,num`
                  )
                )}
                message={validator.message(
                  "prixVehicule",
                  Number(form.prixVehicule),
                  `required|numeric|min:300000,num`
                )}
              />
            </div>
            <div className="flex justify-between items-center flex-wrap mx-2">
              <label htmlFor="">Le véhicule est-il déjà régularisé?</label>
              <div className="flex gap-2">
                <span
                  className="cursor-pointer hover:text-primary"
                  onClick={() => setForm({ ...form, regularisation: false })}
                >
                  Non
                </span>
                <Toggle
                  id="cheese-status"
                  name="regularisation"
                  className="toggleB"
                  icons={false}
                  checked={form.regularisation}
                  onChange={() => {
                    setForm({ ...form, regularisation: !form.regularisation });
                  }}
                />
                <span
                  className="cursor-pointer hover:text-primary"
                  onClick={() => {
                    setForm({ ...form, regularisation: true });
                  }}
                >
                  Oui
                </span>
              </div>
            </div>
            {form.regularisation && (
              <div className="mx-2">
                <div className="py-4 pl-1 border-l-4 border-l-primary">
                  <p>Veuillez soumettre les pièces du vehicules ci-après:</p>
                  <p className=" mt-2 text-sm text-primary">
                    Format de fichiers autorisés: png, jpg, jpeg, pdf. Taille
                    maximale par fichier: 5Mo.
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
                      ref={carteGriseInput}
                      onChange={() => fileInputManager(carteGriseInput)}
                    />
                    <span
                      className={`${
                        fileInputMessage.carteGrise.error
                          ? "text-secondary"
                          : ""
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
                  <span>Contrat d'assurance</span>
                  <div className="flex gap-2 md:gap-10 items-center flex-wrap">
                    <input
                      className="hidden"
                      type="file"
                      name="contratAssurance"
                      id="contratAssurance"
                      accept=".jpg, .jpeg, .png, .pdf"
                      ref={contratAssuranceInput}
                      onChange={() => fileInputManager(contratAssuranceInput)}
                    />
                    <span
                      className={`${
                        fileInputMessage.contratAssurance.error
                          ? "text-secondary"
                          : ""
                      }`}
                    >
                      {fileInputMessage.contratAssurance.message}
                    </span>
                    <label htmlFor="contratAssurance">
                      <TButton
                        className="min-w-fit py-2 px-4 self-end"
                        type="button"
                        onClick={() => {
                          contratAssuranceInput.current.click();
                        }}
                      >
                        Ajouter
                      </TButton>
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 flex-wrap py-4 border-b border-line">
                  <span>Attestation de visite technique</span>
                  <div className="flex gap-2 md:gap-10 items-center flex-wrap">
                    <input
                      className="hidden"
                      type="file"
                      name="visiteTechnique"
                      id="visiteTechnique"
                      accept=".jpg, .jpeg, .png, .pdf"
                      ref={visiteTechniqueInput}
                      onChange={() => fileInputManager(visiteTechniqueInput)}
                    />
                    <span
                      className={`${
                        fileInputMessage.visiteTechnique.error
                          ? "text-secondary"
                          : ""
                      }`}
                    >
                      {fileInputMessage.visiteTechnique.message}
                    </span>
                    <label htmlFor="visiteTechnique">
                      <TButton
                        className="min-w-fit py-2 px-4 self-end"
                        type="button"
                        onClick={() => {
                          visiteTechniqueInput.current.click();
                        }}
                      >
                        Ajouter
                      </TButton>
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 flex-wrap py-4 border-b border-line">
                  <span>Fiche de la Taxe sur Véhicule à Moteur (TVM)</span>
                  <div className="flex gap-2 md:gap-10 items-center flex-wrap">
                    <input
                      className="hidden"
                      type="file"
                      name="TVM"
                      id="TVM"
                      accept=".jpg, .jpeg, .png, .pdf"
                      ref={TVMInput}
                      onChange={() => fileInputManager(TVMInput)}
                    />
                    <span
                      className={`${
                        fileInputMessage.TVM.error ? "text-secondary" : ""
                      }`}
                    >
                      {fileInputMessage.TVM.message}
                    </span>
                    <label htmlFor="TVM">
                      <TButton
                        className="min-w-fit py-2 px-4 self-end"
                        type="button"
                        onClick={() => {
                          TVMInput.current.click();
                        }}
                      >
                        Ajouter
                      </TButton>
                    </label>
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-wrap justify-between gap-8 mx-2">
              <SuperInput
                htmlFor="placesInput"
                labelText="Nombres de places du véhicule"
                name="placesVehicule"
                min={2}
                max={12}
                placeholder="5"
                type="number"
                className="flex-1 flex-shrink-0 min-w-[300px]"
                value={form.detailsVehicule.places}
                onChange={(e) => {
                  const updatedForm = { ...form };
                  updatedForm.detailsVehicule.places = e.target.value;
                  setForm(updatedForm);
                }}
                error={Boolean(
                  validator.message(
                    "placesVehicule",
                    Number(form.detailsVehicule.places),
                    `required|between:2,12,num`
                  )
                )}
                message={validator.message(
                  "placesVehicule",
                  Number(form.detailsVehicule.places),
                  `required|between:2,12,num`
                )}
              />
              <div className="flex-1 flex-shrink-0 min-w-[300px]">
                <label
                  className="block mb-2 text-sm font-medium text-font-light"
                  htmlFor="transmissionSelect"
                >
                  Sélectionnez la transmission du véhicule
                </label>
                <select
                  onChange={(e) => {
                    const updatedForm = { ...form };
                    updatedForm.detailsVehicule.transmission = e.target.value;
                    setForm(updatedForm);
                  }}
                  className="bg-transparent border border-line text-font-normal text-sm rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none block w-full p-2.5"
                  name="transmissionVehicule"
                  id="transmissionSelect"
                >
                  <option value="automatique">Automatique</option>
                  <option value="manuelle">Manuelle</option>
                </select>
                <p
                  className={`text-xs ${
                    Boolean(
                      validator.message(
                        "transmissionVehicule",
                        form.detailsVehicule.transmission,
                        `required|string`
                      )
                    )
                      ? "text-secondary"
                      : ""
                  }`}
                >
                  {Boolean(
                    validator.message(
                      "transmissionVehicule",
                      form.detailsVehicule.transmission,
                      `required|string`
                    )
                  )}
                </p>
              </div>
            </div>
            <div className="mx-2">
              <label className="block mb-2" htmlFor="descriptionInput">
                Description de l'annonce
              </label>
              <textarea
                name="description"
                id="descriptionInput"
                placeholder="Entrez une description ici"
                className="w-full outline-none border border-line rounded-lg focus:ring-1 focus:ring-primary focus:border-primary px-2 py-1"
                rows="6"
                value={form.description}
                onChange={(e) => {
                  setForm({ ...form, description: e.target.value });
                }}
              ></textarea>
              {Boolean(
                validator.message("description", form.description, `required`)
              ) && (
                <p className="mt-2 text-xs text-secondary">
                  {validator.message(
                    "description",
                    form.description,
                    `required`
                  )}
                </p>
              )}
            </div>
          </div>
          <div className="w-1/2 mr-2">
            <div className="py-4 bg-line w-full">
              <div className="w-full">
                Uploadez 4 images de la voiture afin de rassurer le potentiel
                acheteur. La première image téléversée sera la principale.
              </div>
              <div className="text-sm mt-2">
                Formats jpeg, jpg et png acceptés. Taille maximale de 5Mo par
                image.
              </div>
            </div>
            <div className="my-2 flex flex-col gap-2">
              <div className="border flex px-2 justify-around flex-wrap">
                <div className="w-[235px] h-[106px] flex justify-center flex-shrink-0">
                  <img
                    src={
                      typeof form.detailsVehicule.photos[0] !== "string"
                        ? URL.createObjectURL(form.detailsVehicule.photos[0])
                        : `${REACT_APP_BACKEND_URL}/photosVoitures/${form.detailsVehicule.photos[0]}`
                    }
                    alt="Voiture à vendre"
                    className="max-w-[235px] max-h-[106px]"
                  />
                </div>
                <div className="flex gap-10 items-center justify-between">
                  <div className="">
                    <p>Image n°1 (Principale)</p>
                    <p
                      className={`${
                        photoInputMessage[0].error ? "text-secondary" : ""
                      } inline-block w-[200px] sm:w-[400px] truncate`}
                      title={photoInputMessage[0].message}
                    >
                      {photoInputMessage[0].message}
                    </p>
                  </div>
                  <TButton
                    className="min-w-fit py-2 px-4"
                    type="button"
                    onClick={(e) => {
                      e.target.children[1]?.click();
                    }}
                  >
                    <FaFileImage className="mr-1" />
                    <label htmlFor="file0">Choisir</label>
                  </TButton>
                  <input
                    type="file"
                    id="file0"
                    name="0"
                    onChange={(e) => photoInputManager(e)}
                    className="hidden"
                    accept=" .png, .jpeg, .jpg"
                  />
                </div>
              </div>
              <div className="border flex px-2 justify-around flex-wrap">
                <div className="w-[235px] h-[106px] flex justify-center flex-shrink-0">
                  <img
                    src={
                      typeof form.detailsVehicule.photos[1] !== "string"
                        ? URL.createObjectURL(form.detailsVehicule.photos[1])
                        : `${REACT_APP_BACKEND_URL}/photosVoitures/${form.detailsVehicule.photos[1]}`
                    }
                    alt="Voiture à vendre"
                    className="max-w-[235px] max-h-[106px]"
                  />
                </div>
                <div className="flex gap-10 items-center justify-between">
                  <div className="">
                    <p>Image n°2</p>
                    <p
                      className={`${
                        photoInputMessage[1].error ? "text-secondary" : ""
                      } inline-block w-[200px] sm:w-[400px] truncate`}
                      title={photoInputMessage[1].message}
                    >
                      {photoInputMessage[1].message}
                    </p>
                  </div>
                  <TButton
                    className="min-w-fit py-2 px-4"
                    type="button"
                    onClick={(e) => {
                      e.target.children[1]?.click();
                    }}
                  >
                    <FaFileImage className="mr-1" />
                    <label htmlFor="file1">Choisir</label>
                  </TButton>
                  <input
                    type="file"
                    name="1"
                    id="file1"
                    onChange={(e) => photoInputManager(e)}
                    className="hidden"
                    accept=" .png, .jpeg, .jpg"
                  />
                </div>
              </div>
              <div className="border flex px-2 justify-around flex-wrap">
                <div className="w-[235px] h-[106px] flex justify-center flex-shrink-0">
                  <img
                    src={
                      typeof form.detailsVehicule.photos[2] !== "string"
                        ? URL.createObjectURL(form.detailsVehicule.photos[2])
                        : `${REACT_APP_BACKEND_URL}/photosVoitures/${form.detailsVehicule.photos[2]}`
                    }
                    alt="Voiture à vendre"
                    className="max-w-[235px] max-h-[106px]"
                  />
                </div>
                <div className="flex gap-10 items-center justify-between">
                  <div className="">
                    <p>Image n°3</p>
                    <p
                      className={`${
                        photoInputMessage[2].error ? "text-secondary" : ""
                      } inline-block w-[200px] sm:w-[400px] truncate`}
                      title={photoInputMessage[2].message}
                    >
                      {photoInputMessage[2].message}
                    </p>
                  </div>
                  <TButton
                    className="min-w-fit py-2 px-4"
                    type="button"
                    onClick={(e) => {
                      e.target.children[1]?.click();
                    }}
                  >
                    <FaFileImage className="mr-1" />
                    <label htmlFor="file2">Choisir</label>
                  </TButton>
                  <input
                    type="file"
                    name="2"
                    onChange={(e) => photoInputManager(e)}
                    id="file2"
                    className="hidden"
                    accept=" .png, .jpeg, .jpg"
                  />
                </div>
              </div>
              <div className="border flex px-2 justify-around flex-wrap">
                <div className="w-[235px] h-[106px] flex justify-center flex-shrink-0">
                  <img
                    src={
                      typeof form.detailsVehicule.photos[3] !== "string"
                        ? URL.createObjectURL(form.detailsVehicule.photos[3])
                        : `${REACT_APP_BACKEND_URL}/photosVoitures/${form.detailsVehicule.photos[3]}`
                    }
                    alt="Voiture à vendre"
                    className="max-w-[235px] max-h-[106px]"
                  />
                </div>
                <div className="flex gap-10 items-center justify-between">
                  <div className="">
                    <p>Image n°4</p>
                    <p
                      className={`${
                        photoInputMessage[3].error ? "text-secondary" : ""
                      } inline-block w-[200px] sm:w-[400px] truncate`}
                      title={photoInputMessage[3].message}
                    >
                      {photoInputMessage[3].message}
                    </p>
                  </div>
                  <TButton
                    className="min-w-fit py-2 px-4"
                    type="button"
                    onClick={(e) => {
                      e.target.children[1]?.click();
                    }}
                  >
                    <FaFileImage className="mr-1" />
                    <label htmlFor="file3">Choisir</label>
                  </TButton>
                  <input
                    type="file"
                    name="3"
                    onChange={(e) => photoInputManager(e)}
                    id="file3"
                    className="hidden"
                    accept=" .png, .jpeg, .jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="flex justify-between items-center mx-2">
        {page > 1 && (
          <TButton
            onClick={() => {
              setPage((page) => {
                return page > 1 ? page - 1 : page;
              });
            }}
            className="min-w-fit py-2 px-4"
            type="button"
          >
            <FaArrowRight className="rotate-180 mr-1" /> Précédent
          </TButton>
        )}

        <TButton
          className="min-w-fit py-2 px-4 ml-auto"
          type="button"
          onClick={() => {
            if (page !== 2) {
              setPage((page) => page + 1);
            } else {
              submitForm();
            }
          }}
        >
          {page !== 2 ? (
            <>
              Suivant <FaArrowRight className="ml-1" />
            </>
          ) : (
            <>
              Soumettre{" "}
              {isLoading && <ImSpinner9 className="ml-1 animate-spin" />}{" "}
            </>
          )}
        </TButton>
      </div>
    </div>
  );
};

export default AnnonceEdit;
