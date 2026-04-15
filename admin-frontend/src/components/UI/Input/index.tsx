"use client";
import React from 'react';
import styles from "./Input.module.scss";

const DynamicInput = ({ type, placeholder, className, label, value, onBlur, handleChange, ...props }: any) => {

    return (
        <>
            {label && <label className={styles.label}>{label}</label>}
             <input
                 value={value}
                onBlur={onBlur}
                className={`${styles.rectangleParent} ${className}`}
                type={type}
                placeholder={placeholder}
                onChange={handleChange}
                {...props}
            />
        </>
    );
};

export default DynamicInput;
