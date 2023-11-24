"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./Form.module.css";
import ButtonCta from "../ButtonCta/ButtonCta";
import FormProps from "@/types/FormProps";

import useFirebaseAuth from "@/hooks/firebase_auth/firebase_auth";

type dataType = {
  name: string;
  email: string;
  password: string;
};

export default function Form({ purpose }: FormProps) {
  const firebaseAuth = useFirebaseAuth();
  const dynamicSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    ...(purpose === "signup" && {
      name: yup.string().required("Name is required"),
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(dynamicSchema),
  });

  const onSubmit: SubmitHandler<dataType> = ({
    email,
    password,
    name = "",
  }) => {
    if (purpose === "signup") {
      firebaseAuth.userSignUp(email, password);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {purpose === "signup" && (
        <div className={styles.form__data}>
          <input
            type="text"
            id="name"
            className={styles.form__input}
            {...register("name")}
          />
          <label htmlFor="name" className={styles.form__label}>
            Name
          </label>
          {errors.name && (
            <p className={styles.error_message}>{errors.name.message}</p>
          )}
        </div>
      )}
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

      <ButtonCta color={`${purpose === "signup" ? "green" : "blue"}`}>
        {purpose === "signup" ? "Sign up" : "Sign in"}
      </ButtonCta>
    </form>
  );
}
