"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { publicHandler } from '@/helper/requestHandler'; // Adjust import path as needed
import styles from "../Login/Login.module.css";
import { toast } from 'react-toastify';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { asyncHandler } from '@/utils/asyncHandler';

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email address is required'),
});

const ForgotPassword = () => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const handleFormSubmit = async (values: { email: string }) => {
    setLoading(true);
  
    await asyncHandler(async () => {
      const response = await publicHandler('/forgetPassword', values, 'POST');
      
      if (response && response.status===200) {
        toast.success(response.message || 'Password reset link sent successfully');
        router.push('/login');
      } else {
        toast.error(response.message || 'Failed to send password reset link');
      }
    })();
  
    setLoading(false);
  };
  

  return (
    <div className={styles.login1}>
      <div className={styles.loginItem} />
       
      <div className={styles.loginContainer}>
        <h1 className={styles.login2}>Register</h1>
      </div>
      <div>
        <p className={`${styles.para} pb-2`}>
          Enter your account email address to receive a link allowing you to
          create a new password.
        </p>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={styles.frameParent}>
              <div className={styles.frameGroup}>
                <div className={styles.rectangleParent}>
                  <div className={styles.frameChild} />
                  <Field
                    as="input"
                    name="email"
                    className={styles.emailAddress}
                    placeholder="Email Address"
                    type="text"
                  />
                </div>
              </div>
              {/* <ErrorMessage name="email" component="div" className={styles.error} /> */}
              <button
                className={styles.rectangleContainer}
                type="submit"
                disabled={isSubmitting || isLoading}
              >
                <div className={styles.frameInner} />
                <div className={styles.login3}>{isLoading ? 'Sending...' : 'Request Link'}</div>
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
