"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./SigninForm.module.css";
import ButtonCta from "../ButtonCta/ButtonCta";

import useFirebaseAuth from "@/hooks/firebase_auth/useFirebaseAuth";
import { useAuth } from "@/context/AuthContext";
import Spinner from "../Spinner/Spinner";

type dataType = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function SigninForm() {
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { setIsLogin } = useAuth();
  const firebaseAuth = useFirebaseAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<dataType> = async ({ email, password }) => {
    try {
      setIsProcessing(true);
      setErrorMessage(null);
      const loginResult = await firebaseAuth.userSignin(email, password);
      if (loginResult === true) {
        setIsLogin(true);
        router.push("/");
      }
      console.log(loginResult);
      if (loginResult === "auth/invalid-login-credentials")
        setErrorMessage("Wrong Email or Password");
    } catch {
      throw new Error("Unknown error");
    } finally {
      setIsProcessing(false);
      reset();
    }
  };

  return (
    <>
      {isProcessing ? (
        <Spinner />
      ) : (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.form__data}>
            <input
              type="text"
              id="email"
              className={styles.form__input}
              {...register("email")}
            />
            <label htmlFor="email" className={styles.form__label}>
              Email
            </label>
            {errors.email && (
              <p className={styles.error_message}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.form__data}>
            <input
              type="password"
              id="password"
              {...register("password")}
              className={styles.form__input}
            />
            <label htmlFor="password" className={styles.form__label}>
              Password
            </label>
            {errors.password && (
              <p className={styles.error_message}>{errors.password.message}</p>
            )}
            {errorMessage && (
              <p className={styles.error_message_firebase}>{errorMessage}</p>
            )}
          </div>
          <ButtonCta color="blue">Sign in</ButtonCta>
          <div className={styles.guide_to_signup}>
            <Link href="/signup">Don&apos;t have an account? Sign up</Link>
          </div>
        </form>
      )}
    </>
  );
}
