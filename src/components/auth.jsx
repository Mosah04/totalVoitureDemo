import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import SuperInput from "./SuperInput";
import MailSvg from "../assets/mailSvg";
import { FaGoogle } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { LuMail } from "react-icons/lu";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
  doCreateUserWithEmailAndPassword,
} from "../config/auth";
import { useAuth } from "../contexts/authContext";

function Auth() {
  const page = window.location.pathname.slice(1);

  const navigate = useNavigate();

  const { loggedIn } = useAuth();

  const [authMethod, setAuthMethod] = useState("phone");
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = ({ email, password, confirmPassword, phoneNumber }) => {
    const errors = {};

    if (
      (authMethod === "email" || page === "signup") &&
      (!email ||
        !email
          .trim()
          .match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/))
    ) {
      errors.email = "Adresse email invalide";
    } else if (errors.hasOwnProperty("email")) {
      delete errors["email"];
    }
    if (authMethod === "email") {
      if (!password || password.trim().length < 6) {
        errors.password = "Le mot de passe doit contenir au moins 6 caractères";
      } else if (errors.hasOwnProperty("password")) {
        delete errors["password"];
      }
    }

    if (
      page === "signup" &&
      authMethod === "email" &&
      password.trim() !== confirmPassword.trim()
    ) {
      errors.confirmPassword = "Les mots de passe ne correspondent pas";
    } else if (errors.hasOwnProperty("confirmPassword")) {
      delete errors["confirmPassword"];
    }

    if (page === "signup" || authMethod === "phone") {
      const phoneNumberRegex = /^[+]?\d{10,}$/;
      if (!phoneNumber || !phoneNumber.trim().match(phoneNumberRegex)) {
        errors.phoneNumber = "Numéro de téléphone invalide";
      } else if (errors.hasOwnProperty("phoneNumber")) {
        delete errors["phoneNumber"];
      }
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm(form) || isAuthenticating) return;

    setIsAuthenticating(true);
    if (page === "login" && authMethod === "email")
      await doSignInWithEmailAndPassword(form.email, form.password).catch(
        (e) => {
          const message =
            e.message === "Firebase: Error (auth/invalid-credential)."
              ? "Identifiants invalides"
              : "Ouch! Quelque chose s'est mal passé, veuillez réessayer!";
          setErrors({
            ...errors,
            general: message,
          });
          console.log(e);
        }
      );

    if (page === "signup" && authMethod === "email") {
      const userCreated = await doCreateUserWithEmailAndPassword(
        form.email,
        form.password
      ).catch(() => {
        setErrors({
          ...errors,
          general: "Ouch! Quelque chose s'est mal passé, veuillez réessayer!",
        });
      });
      console.log("userCreated", userCreated);
    }

    if (authMethod === "phone") {
      setIsAuthenticating(true);
      navigate(`/verify-otp?phoneNumber=${form.phoneNumber}&last=${page}`);
    }

    setIsAuthenticating(false);
  };

  const onGoogleSignIn = () => {
    if (!isAuthenticating) {
      setIsAuthenticating(true);
      doSignInWithGoogle().catch(() => {
        setIsAuthenticating(false);
        setErrors({
          ...errors,
          general: "Ouch! Quelque chose s'est mal passé, veuillez réessayer!",
        });
      });
    }
  };

  return (
    <div className="bg-background flex flex-col w-screen min-h-screen items-center justify-center font-dm-sans text-font-normal">
      {loggedIn && <Navigate to={"/"} replace={true} />}
      <form
        className="flex flex-col h-fit w-fit p-3 space-y-5 rounded-md shadow-md bg-white border border-line"
        action=""
        onSubmit={onFormSubmit}
      >
        <p className="text-xl font-bold text-font-bold text-center">
          {page === "login" ? "Connexion avec " : "Inscription avec "}
          {authMethod === "phone" ? "un numéro" : "email"}
        </p>
        {errors.general && (
          <p className="text-sm text-secondary text-center">{errors.general}</p>
        )}
        <div className="flex flex-col">
          {page === "signup" || authMethod === "email" ? (
            <SuperInput
              htmlFor="email"
              labelText="Email"
              name="email"
              placeholder="example@xyz.com"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={authMethod === "email" ? "order-1" : "order-2"}
              message={errors.email}
              error={Object.keys(errors).length !== 0}
            >
              <MailSvg />
            </SuperInput>
          ) : (
            <></>
          )}

          {page === "signup" || authMethod === "phone" ? (
            <SuperInput
              htmlFor="phoneNumber"
              labelText="Votre numéro de téléphone"
              name="phoneNumber"
              placeholder="+22953558044"
              type="text"
              value={form.phoneNumber}
              onChange={(e) =>
                setForm({ ...form, phoneNumber: e.target.value })
              }
              message={errors.phoneNumber}
              error={Object.keys(errors).length !== 0}
              className={
                authMethod === "email" ? "order-2 mt-4" : "order-1 mb-4"
              }
            >
              <FaPhoneAlt />
            </SuperInput>
          ) : (
            <></>
          )}
        </div>
        {authMethod === "email" ? (
          <SuperInput
            htmlFor="password"
            labelText="Entrez votre mot de passe"
            name="password"
            placeholder="••••••••"
            type="password"
            value={form.password}
            message={errors.password}
            error={Object.keys(errors).length !== 0}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          >
            <MdPassword />
          </SuperInput>
        ) : (
          <></>
        )}
        {authMethod === "email" && page === "signup" ? (
          <SuperInput
            htmlFor="passwordConfirm"
            labelText="Confirmez votre mot de passe"
            name="passwordConfirm"
            placeholder="••••••••"
            type="password"
            value={form.confirmPassword}
            message={errors.confirmPassword}
            error={Object.keys(errors).length !== 0}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          >
            <MdPassword />
          </SuperInput>
        ) : (
          <></>
        )}
        <p className="text-center">
          {page === "login" ? (
            <>
              Vous n'avez pas de compte?{" "}
              <Link className="text-primary underline" to="/signup">
                Inscrivez-vous
              </Link>
            </>
          ) : (
            <>
              Vous avez déjà un compte?{" "}
              <Link className="text-primary underline" to="/login">
                Connectez-vous
              </Link>
            </>
          )}
        </p>
        <button
          className={
            isAuthenticating
              ? "bg-primary/35 cursor-not-allowed text-white min-w-72 p-2 rounded-xl shadow-sm shadow-slate-500 active:shadow-sm"
              : "bg-primary text-white min-w-72 p-2 rounded-xl shadow-sm shadow-slate-500 active:shadow-sm"
          }
          type="submit"
          disabled={isAuthenticating}
        >
          {authMethod === "email" &&
            (page === "login" ? "Se connecter " : "S'inscrire")}
          {authMethod === "phone" && "Envoyer un code via SMS"}
        </button>

        <div className="border-t border-line flex justify-center relative">
          <span className="absolute bg-white -translate-y-1/2 px-4">OU</span>
        </div>

        <button
          className={
            isAuthenticating
              ? "bg-primary/35 cursor-not-allowed text-white min-w-72 p-2 rounded-xl shadow-sm shadow-slate-500 active:shadow-sm flex items-center justify-center"
              : "bg-primary  text-white min-w-72 p-2 rounded-xl shadow-sm shadow-slate-500 active:shadow-sm flex items-center justify-center"
          }
          type="button"
          onClick={() => {
            setAuthMethod((authMethod) =>
              authMethod === "phone" ? "email" : "phone"
            );
          }}
          disabled={isAuthenticating}
        >
          {page === "login" ? "Se connecter " : "S'inscrire "}
          {authMethod === "phone" ? (
            <span className="flex w-fit items-center justify-center">
              {" "}
               avec email <LuMail className="ml-1" />
            </span>
          ) : (
            <span className="flex w-fit items-center justify-center">
              {" "}
               avec un numéro <FaPhoneAlt className="ml-1" />
            </span>
          )}
        </button>
        <button
          className={
            isAuthenticating
              ? "bg-primary/35 cursor-not-allowed text-white min-w-72 p-2 rounded-xl shadow-sm shadow-slate-500 active:shadow-sm flex items-center justify-center"
              : "bg-primary  text-white min-w-72 p-2 rounded-xl shadow-sm shadow-slate-500 active:shadow-sm flex items-center justify-center"
          }
          onClick={onGoogleSignIn}
          type="button"
          disabled={isAuthenticating}
        >
          {page === "login" ? "Se connecter " : "S'inscrire "}
          avec Google
          <FaGoogle className="ml-1" />
        </button>
      </form>
    </div>
  );
}

export default Auth;
