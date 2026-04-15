"use client";
import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import styles from "../ContactUsNow-Form/ContactUsNow.module.css";
import { requestHandler } from '@/helper/requestHandler';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required').min(3, "Please enter a valid name"),
  email: Yup.string().email('Invalid email address').required('Email is required').min(3, "Please enter a valid Email"),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^\d+$/, 'Phone number must be numeric')
    .min(10, 'Phone number must be at least 10 digits')
    .max(12, 'Phone number cannot exceed 12 digits'),
  message: Yup.string().required('Message is required').min(10, 'Message must be at least 10 words')
});

const ContactUsNow = () => {
  const handleSubmit = async (values: any, { resetForm }: FormikHelpers<any>) => {
    console.log('Form submitted with values:', values);
    try {
      const response = await requestHandler('/contactUsFrom', values, 'post');
      if (response.status === 200) {
        toast.success(response.message || "Form Submitted Successfully");
        resetForm(); // Clear the form fields
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className={styles.contactUsNow}>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
          message: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className={styles.content}>
              <b className={styles.heading21}>CONTACT US NOW!</b>
              <div className={styles.input}>
                <div className="w-100">
                  <Field
                    type="text"
                    name="name"
                    className={`${styles.textField} ${styles.name} w-100`}
                    placeholder="Name"
                  />
                  <ErrorMessage name="name" component="div" className={styles.errorMessage} />
                </div>
                <div className="w-100">
                  <Field
                    type="text"
                    name="email"
                    className={`${styles.textField} ${styles.name} w-100`}
                    placeholder="Email"
                  />
                  <ErrorMessage name="email" component="div" className={styles.errorMessage} />
                </div>
                <div className="w-100">
                  <Field
                    type="number"
                    name="phone"
                    className={`${styles.textField} ${styles.name} w-100`}
                    placeholder="Phone Number"
                  />
                  <ErrorMessage name="phone" component="div" className={styles.errorMessage} />
                </div>
                <div className="w-100">
                  <Field
                    as="textarea"
                    name="message"
                    rows={6}
                    cols={18}
                    className={`${styles.textField} ${styles.message} w-100`}
                    placeholder="Message"
                  />
                  <ErrorMessage name="message" component="div" className={styles.errorMessage} />
                </div>
              </div>
            </div>
            <div className={styles.content1}>
              <b className={styles.heading22}>
                100% PRIVACY - WE NEVER SPAM YOU
              </b>
              <button className={`${styles.email1} ${styles.button} border-0`} type="submit">
                <div className={styles.textField4}>SEND</div>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactUsNow;
