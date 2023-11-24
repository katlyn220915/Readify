"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./SignupForm.module.css";
import ButtonCta from "../ButtonCta/ButtonCta";

import useFirebaseAuth from "@/hooks/firebase_auth/firebase_auth";

type dataType = {
  firstName: string;
  email: string;
  password: string;
};

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function SignupForm() {
  const firebaseAuth = useFirebaseAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<dataType> = ({
    email,
    password,
    firstName,
  }) => {
    firebaseAuth.userSignUp(email, password);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form__data}>
        <input
          type="text"
          id="name"
          className={styles.form__input}
          {...register("firstName")}
        />
        <label htmlFor="name" className={styles.form__label}>
          Name
        </label>
        {errors.firstName && (
          <p className={styles.error_message}>{errors.firstName.message}</p>
        )}
      </div>
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
      </div>

      <ButtonCta color="green">Sign up</ButtonCta>
    </form>
  );
}
