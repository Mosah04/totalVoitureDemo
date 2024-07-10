import React, { useState } from "react";
import { BsShieldLockFill } from "react-icons/bs";
import OtpInput from "react-otp-input";
import { ImSpinner9 } from "react-icons/im";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../config/firebase-config";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../contexts/authContext";
import { Navigate, Link } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const { currentUser, loggedIn } = useAuth();

  const urlParams = new URLSearchParams(window.location.search);
  const phoneNumber = "+" + urlParams.get("phoneNumber");
  const lastPage = urlParams.get("last");

  const onSignup = () => {
    setLoading(true);
    onCaptchaVerify();

    const appVerifier = window.recaptchaVerifier;

    console.log(phoneNumber);

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setShowOtp(true);
        toast.success("OTP envoyé avec succès! Vérifiez votre téléphone 📱");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(true);
      });
  };

  const onCaptchaVerify = () => {
    if (!window.recaptchaVerifier) {
      console.log("AUTH", auth);
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          },
        }
      );
    }
  };

  const onOTPVerify = () => {
    setLoading(true);
    window.confirmationResult.confirm(otp).then(async (result) => {
      const user = result.user;
      console.log(user);
      console.log(currentUser);
      setLoading(false);
      toast.success("Votre compte a été créé avec succès!");
    });
  };

  if (loggedIn) return <Navigate to={"/"} replace={true} />;
  return (
    <div className="bg-background flex flex-col w-screen min-h-screen items-center justify-center font-dm-sans text-font-normal">
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="flex flex-col h-fit w-fit p-3 space-y-5 rounded-md shadow-md bg-white border border-line min-w-[400px] ">
        <h1 className="text-xl font-bold text-font-bold text-center">
          {showOtp ? "Vérifiez votre OTP" : "Confirmation du numéro"}
        </h1>
        <p className="text-sm text-center">
          {showOtp
            ? "Inscrivez le code que vous avez reçu."
            : "Veuillez confirmer votre numéro..."}
        </p>
        {showOtp || (
          <>
            <p className="text-xl text-center">{phoneNumber}</p>
            <span className="text-sm text-center mt-0 text-secondary">
              <span className="text-font-normal">
                Ce n'est pas le bon numéro? 
                <Link to={`/${lastPage}`} className="underline text-primary">
                  Cliquez ici
                </Link>
              </span>
              <br />
              {error && " Quelque chose s'est mal passé, veuillez recommencer!"}
            </span>
          </>
        )}
        <div id="recaptcha-container"></div>
        {console.log("MOUNTEEEEEEEEEEEEEEEEEEEEED")}

        {showOtp && (
          <>
            <div className="flex justify-center">
              <BsShieldLockFill className="text-primary mr-4 " size={30} />
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                inputStyle={{
                  width: "30px",
                  outline: "none",
                  border: "1px solid #E9EAEC",
                  padding: "2px",
                  borderRadius: "5px",
                }}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
              />
            </div>
          </>
        )}
        <button
          className={
            "bg-primary  text-white min-w-72 p-2 rounded-xl shadow-sm shadow-slate-500 active:shadow-sm flex items-center justify-center"
          }
          type="button"
          onClick={showOtp ? onOTPVerify : onSignup}
        >
          {loading && <ImSpinner9 className="mr-2 animate-spin" />}
          <p className="text-sm">{showOtp ? "Valider" : "Confirmer"}</p>
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;
