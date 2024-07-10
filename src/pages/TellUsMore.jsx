import React, { useEffect, useState } from "react";
import SuperInput from "../components/SuperInput";
import { ImSpinner9 } from "react-icons/im";
import MailSvg from "../assets/mailSvg";
import { FaPhoneAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { updateEmail, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase-config";
import toast, { Toaster } from "react-hot-toast";
import { createUser, getRoles } from "../config/auth.js";

const TellUsMore = () => {
  const { currentUser } = useAuth();
  const { state } = useLocation();
  const missingInfos = state;
  const [form, setForm] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});
  console.log(missingInfos);
  console.log("USER", currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState(null);
  const [selectedRole, setSelectedRole] = useState([]);

  const handleRadioChange = (event) => {
    const role = event.target.value;
    const roleToSet = role.split(",");
    setSelectedRole(() => roleToSet);
    console.log(role, "role", role.split(","));
    console.log(selectedRole);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const doGetRoles = async () => {
      await getRoles(currentUser?.stsTokenManager.accessToken)
        .then((response) => {
          const rolesData = response?.data;
          console.log("RoleToSend: ", rolesData);
          console.log("Réponse: ", response);
          setRoles(rolesData);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    doGetRoles();
  }, [currentUser?.stsTokenManager.accessToken]);

  const validateForm = ({ lastName, firstName, email, phoneNumber }) => {
    const errors = {};

    if (
      missingInfos.hasOwnProperty("email") &&
      (!email ||
        !email
          .trim()
          .match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/))
    ) {
      errors.email = "Adresse email invalide";
    } else if (errors.hasOwnProperty("email")) {
      delete errors["email"];
    }

    if (missingInfos.hasOwnProperty("phoneNumber")) {
      const phoneNumberRegex = /^[+]?\d{10,}$/;
      if (!phoneNumber || !phoneNumber.trim().match(phoneNumberRegex)) {
        errors.phoneNumber = "Numéro de téléphone invalide";
      } else if (errors.hasOwnProperty("phoneNumber")) {
        delete errors["phoneNumber"];
      }
    }

    if (missingInfos.hasOwnProperty("displayName")) {
      if (
        !lastName ||
        !lastName
          .trim()
          .match(/^(?=(?:.*[a-zA-ZÀ-ÖØ-öø-ÿ]){2})[a-zA-ZÀ-ÖØ-öø-ÿ \-'']+$/)
      ) {
        errors.lastName = "Nom invalide";
      } else if (errors.hasOwnProperty("lastName")) {
        delete errors["lastName"];
      }

      if (
        !firstName ||
        !firstName
          .trim()
          .match(/^(?=(?:.*[a-zA-Z]){2})[a-zA-ZÀ-ÖØ-öø-ÿ \-'']+$/)
      ) {
        errors.firstName = "Prénom invalide";
      } else if (errors.hasOwnProperty("firstName")) {
        delete errors["firstName"];
      }
    }

    if (!selectedRole || selectedRole.length === 0) {
      errors.role = "Veuillez choisir un rôle";
      toast.error(errors.role);
    } else if (errors.hasOwnProperty("role")) {
      delete errors["role"];
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;

    setIsLoading(true);

    const data = {};

    if (missingInfos.hasOwnProperty("displayName")) {
      data.displayName = form.firstName.trim() + " " + form.lastName.trim();
    }
    if (missingInfos.hasOwnProperty("email")) {
      data.email = form.email.trim();
    }
    if (missingInfos.hasOwnProperty("phoneNumber")) {
      data.phoneNumber = form.phoneNumber.trim();
    }

    updateProfile(auth.currentUser, data).catch((err) => {
      toast.error("Oups, nous avons rencontré un problème!");
      console.error(err);
    });
    if (missingInfos.hasOwnProperty("email"))
      updateEmail(auth.currentUser, data.email).catch((err) => {
        toast.error("Oups, nous avons rencontré un problème!");
        console.error(err);
      });
    createUser(await auth.currentUser.getIdToken(true), {
      idFirebase: currentUser.uid,
      nom: form.lastName?.trim() || auth.currentUser.displayName.split(" ")[1],
      prenoms:
        form.firstName?.trim() || auth.currentUser.displayName.split(" ")[0],
      email: data.email || auth.currentUser.email,
      rolesId: selectedRole,
      telephone: data.phoneNumber || auth.currentUser.phoneNumber,
    })
      .then(() => {
        toast.success("Informations ajoutées avec succès!");
      })
      .catch((err) => {
        toast.error("Oups, nous avons rencontré un problème!");
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
        const date = Date.now();
        while (Date.now() - date < 5000) {}
        navigate("/");
      });
  };

  return (
    <div className="bg-background flex flex-col w-screen min-h-screen items-center justify-center font-dm-sans text-font-normal">
      <Toaster toastOptions={{ duration: 4000 }} />
      <form
        className="flex flex-col h-fit w-fit p-3 space-y-5 rounded-md shadow-md bg-white border border-line min-w-[400px] "
        onSubmit={onSubmit}
      >
        <h1 className="text-xl font-bold text-font-bold text-center">
          Dites nous plus à votre sujet
        </h1>
        {missingInfos.hasOwnProperty("displayName") && (
          <>
            <SuperInput
              htmlFor="lastName"
              labelText="Nom"
              name="lastName"
              placeholder="Votre nom ici"
              type="text"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              message={errors.lastName}
              error={Object.keys(errors).length !== 0}
            />
            <SuperInput
              htmlFor="firstName"
              labelText="Prénom"
              name="firstName"
              placeholder="Prénom"
              type="text"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              message={errors.firstName}
              error={Object.keys(errors).length !== 0}
            />
          </>
        )}
        {missingInfos.hasOwnProperty("email") && (
          <SuperInput
            htmlFor="email"
            labelText="Email"
            name="email"
            placeholder="example@xyz.com"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            message={errors.email}
            error={Object.keys(errors).length !== 0}
          >
            <MailSvg />
          </SuperInput>
        )}
        {missingInfos.hasOwnProperty("phoneNumber") && (
          <SuperInput
            htmlFor="phoneNumber"
            labelText="Numéro de téléphone"
            name="phoneNumber"
            placeholder="+229XXXXXXXX"
            type="text"
            value={form.phoneNumber}
            onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
            children={<FaPhoneAlt />}
            message={errors.phoneNumber}
            error={Object.keys(errors).length !== 0}
          />
        )}
        <div>
          <p>Quel rôle souhaitez-vous jouer sur notre plateforme?</p>
          <div className="flex gap-6 justify-between py-1">
            {roles &&
              roles.map((e) => (
                <div key={e._id} className="flex gap-2 items-center">
                  <label htmlFor={e._id}>{e.nom}</label>
                  <input
                    type="radio"
                    name="role"
                    id={e._id}
                    value={e._id}
                    checked={
                      selectedRole.length === 1 && selectedRole[0] === e._id
                    }
                    onChange={handleRadioChange}
                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary"
                  />
                </div>
              ))}
            {/* {roles && (
              <div className="flex gap-2 items-center">
                <label htmlFor="all">Les deux</label>
                <input
                  type="radio"
                  name="role"
                  id="all"
                  onChange={handleRadioChange}
                  checked={
                    selectedRole[0] === roles[0]._id &&
                    selectedRole[1] === roles[1]._id
                  }
                  value={[roles[0]._id, roles[1]._id]}
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary"
                />
              </div>
            )} */}
          </div>
        </div>
        <button
          className={
            isLoading
              ? "bg-primary/50 cursor-not-allowed text-white min-w-72 p-2 rounded-xl shadow-sm shadow-slate-500 active:shadow-sm flex items-center justify-center"
              : "bg-primary  text-white min-w-72 p-2 rounded-xl shadow-sm shadow-slate-500 active:shadow-sm flex items-center justify-center"
          }
          onClick={() => {}}
          type="submit"
          disabled={isLoading}
        >
          Valider
          {isLoading && <ImSpinner9 className="ml-2 animate-spin" />}
        </button>
      </form>
    </div>
  );
};

export default TellUsMore;
