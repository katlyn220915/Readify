import React from "react";
import styles from "./Form.module.css";
import ButtonCta from "../ButtonCta/ButtonCta";
import FormProps from "@/types/FormProps";

export default function Form({ purpose }: FormProps) {
  return (
    <form className={styles.form}>
      {purpose === "signup" && (
        <div className={styles.form__data}>
          <input
            type="text"
            id="name"
            className={styles.form__input}
            required
          />
          <label htmlFor="name" className={styles.form__label}>
            Name
          </label>
        </div>
      )}
      <div className={styles.form__data}>
        <input
          type="email"
          id="email"
          className={styles.form__input}
          required
        />
        <label htmlFor="email" className={styles.form__label}>
          Email
        </label>
      </div>
      <div className={styles.form__data}>
        <input
          type="password"
          id="password"
          className={styles.form__input}
          required
        />
        <label htmlFor="password" className={styles.form__label}>
          Password
        </label>
      </div>
      <ButtonCta color={`${purpose === "signup" ? "green" : "blue"}`}>
        {purpose === "signup" ? "Sign up" : "Sign in"}
      </ButtonCta>
    </form>
  );
}
