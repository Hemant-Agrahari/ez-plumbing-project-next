"use client";

import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import styles from "../BecomePorivder/BecomeForm.module.css";
import { requestHandler } from '@/helper/requestHandler';
import { toast } from 'react-toastify';


const validationSchema = Yup.object({
  name: Yup.string().required('Name is required').min(3, "Please enter a valid name"),
  email: Yup.string().email('Invalid email address').required('Email is required').min(3, "Please enter a valid Email"),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^\d+$/, 'Phone number must be numeric')
    .min(10, 'Phone number must be at least 10 digits')
    .max(12, 'Phone number cannot exceed 12 digits'),
  message: Yup.string().required('Message is required').min(10, 'Message must be at least 10 words')
});

const ContactUsNow = () => {
  const handleSubmit = async (values: any, { resetForm }: FormikHelpers<any>) => {
    // console.log('Form submitted with values:', values);
    try {
      const response = await requestHandler('/becomeAProviderForm', values, 'post');
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
          phoneNumber: '',
          message: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className='w-100'>
            <div className={styles.content}>
              <b className={styles.heading21}>CONTACT US NOW!</b>
              {/* <div className={styles.input}> */}
              <div className="row g-3">
                <div className="col-md-6">
                  <Field
                    type="text"
                    name="name"
                    className={`${styles.textField} ${styles.name} w-100`}
                    placeholder="Name"
                  />
                  <ErrorMessage name="name" component="div" className={styles.errorMessage} />
                </div>
                <div className="col-md-6">
                  <Field
                    type="text"
                    name="email"
                    className={`${styles.textField} ${styles.name} w-100`}
                    placeholder="Email"
                  />
                  <ErrorMessage name="email" component="div" className={styles.errorMessage} />
                </div>
                <div className="col-md-4">
                  <Field
                    type="text"
                    name="email"
                    className={`${styles.textField} ${styles.name} w-100`}
                    placeholder="Company Name"
                  />
                  <ErrorMessage name="email" component="div" className={styles.errorMessage} />
                </div>
                <div className="col-md-4">
                  <Field
                    type="text"
                    name="email"
                    className={`${styles.textField} ${styles.name} w-100`}
                    placeholder="Your Email*"
                  />
                  <ErrorMessage name="email" component="div" className={styles.errorMessage} />
                </div>
                <div className="col-md-4">
                  <Field
                    type="text"
                    name="email"
                    className={`${styles.textField} ${styles.name} w-100`}
                    placeholder="Your Phone*"
                  />
                  <ErrorMessage name="email" component="div" className={styles.errorMessage} />
                </div>
                <div className="col-md-6">
                  {/* <Field
                    type="number"
                    name="phoneNumber"
                    className={`${styles.textField} ${styles.name} w-100`}
                    placeholder="Phone Number"
                  /> */}
                  <select name="cars" id="cars" className={`${styles.textField} ${styles.name} py-0 w-100`}>
                    <option value="volvo">Services Offered*</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                  <ErrorMessage name="phoneNumber" component="div" className={styles.errorMessage} />
                </div>
                <div className="col-md-6">
                  <Field
                    type="text"
                    name="phoneNumber"
                    className={`${styles.textField} ${styles.name} w-100`}
                    placeholder="Company Website"
                  />
                  <ErrorMessage name="phoneNumber" component="div" className={styles.errorMessage} />
                </div>

                <div className="col-md-6">
                  <Field
                    type="text"
                    name="phoneNumber"
                    className={`${styles.textField} ${styles.name} w-100`}
                    placeholder="Company Address*"
                  />
                  <ErrorMessage name="phoneNumber" component="div" className={styles.errorMessage} />
                </div>
                <div className="col-md-6">
                  <select name="cars" id="cars" className={`${styles.textField} ${styles.name} py-0 w-100`}>
                    <option value="volvo">Country*</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                  <ErrorMessage name="phoneNumber" component="div" className={styles.errorMessage} />
                </div>
                <div className="col-md-6">
                  <select name="cars" id="cars" className={`${styles.textField} ${styles.name} py-0 w-100`}>
                    <option value="volvo">State/ Province/ Region*</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                  <ErrorMessage name="phoneNumber" component="div" className={styles.errorMessage} />
                </div>
                <div className="col-md-6">
                  <select name="cars" id="cars" className={`${styles.textField} ${styles.name} py-0 w-100`}>
                    <option value="volvo">City*</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                  <ErrorMessage name="phoneNumber" component="div" className={styles.errorMessage} />
                </div>
              
                <div className="col-md-6">
                  <Field
                    as="textarea"
                    name="message"
                    rows={6}
                    cols={18}
                    className={`${styles.textField} ${styles.message} w-100`}
                    placeholder="Please tell us about your company*"
                  />
                  <ErrorMessage name="message" component="div" className={styles.errorMessage} />
                </div>
                <div className="col-md-6">
                  <Field
                    as="textarea"
                    name="message"
                    rows={6}
                    cols={18}
                    className={`${styles.textField} ${styles.message} w-100`}
                    placeholder="Please provide your licensing, bonding, and insurance information."
                  />
                  <ErrorMessage name="message" component="div" className={styles.errorMessage} />
                </div>
              </div>
            </div>
            <div className={`${styles.content1} mt-4`}>
             
              <button className={`${styles.email1} ${styles.button} border-0`} type="submit">
                <div className={styles.textField4}>Submit</div>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactUsNow;
