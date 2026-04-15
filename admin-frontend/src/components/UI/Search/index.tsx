"use client";
import React from "react";
 import styles from "./search.module.css";

const DynamicSearch = ({ type, placeholder, label, ...props }: any) => {
  return (
    <>
      <input
        className={styles.FormControl}
        type={type}
        placeholder={placeholder}
        {...props}
      />
    </>
  );
};

export default DynamicSearch;
