"use client";
import React, { useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from "../BecomePorivder/BecomeForm.module.css";
import { requestHandler } from '@/helper/requestHandler';
import PhoneInput from 'react-phone-input-2';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters'),

  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters'),

  companyName: Yup.string()
    .required('Company name is required')
    .min(2, 'Company name must be at least 2 characters'),

  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[\d\s()+-]+$/, 'Phone number must be numeric and may include +, -, (, ), and spaces')
  // .min(10, 'Phone number must be at least 10 digits')
  // .max(17, 'Phone number cannot exceed 12 digits')
  ,

  servicesOffered: Yup.string()
    .required('Services offered is required')
    .min(3, 'Please enter valid services offered'),

  companyWebsite: Yup.string()
    // .url('Invalid website URL')
    .required('Company website is required'),

  companyAddress: Yup.string()
    .required('Company address is required'),

  country: Yup.string()
    .required('Country is required'),

  state: Yup.string()
    .required('State is required'),

  city: Yup.string()
    .required('City is required'),

  aboutYourCompany: Yup.string()
    .required('About your company is required')
    .min(10, 'Please provide more information about your company'),

  provideYourInformation: Yup.string()
    .required('Please provide your information')
    .min(10, 'Please provide at least 10 characters')
});

const ContactUsNow = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
      phone: '',
      servicesOffered: '',
      companyWebsite: '',
      companyAddress: '',
      country: '',
      state: '',
      city: '',
      aboutYourCompany: '',
      provideYourInformation: ''
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      // console.log(values)
      try {
        const response = await requestHandler('/becomeAProviderForm', values, 'post');
        if (response.status === 200) {
          toast.success(response.message);
          router.push('/thank-you');
          resetForm();
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
  });

  const handleCountryChange = (value: any, country: any, e: any, formattedValue: any) => {
    formik.setFieldValue('phone', formattedValue);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={styles.contactUsNow}>
      <form onSubmit={formik.handleSubmit} className='w-100'>
        <div className={styles.content}>
          <b className={styles.heading21}>CONTACT US NOW!</b>
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                name="firstName"
                className={`${styles.textField} ${styles.name} w-100`}
                placeholder="First Name*"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className={styles.errorMessage}>{formik.errors.firstName}</div>
              ) : null}
            </div>

            <div className="col-md-6">
              <input
                type="text"
                name="lastName"
                className={`${styles.textField} ${styles.name} w-100`}
                placeholder="Last Name*"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className={styles.errorMessage}>{formik.errors.lastName}</div>
              ) : null}
            </div>

            <div className="col-md-4">
              <input
                type="text"
                name="companyName"
                className={`${styles.textField} ${styles.name} w-100`}
                placeholder="Company Name*"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.companyName}
              />
              {formik.touched.companyName && formik.errors.companyName ? (
                <div className={styles.errorMessage}>{formik.errors.companyName}</div>
              ) : null}
            </div>

            <div className="col-md-4">
              <input
                type="text"
                name="email"
                className={`${styles.textField} ${styles.name} w-100`}
                placeholder="Email*"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className={styles.errorMessage}>{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="col-md-4">
              {/* <PhoneInput
                placeholder='Mobile Number'
                searchPlaceholder='Mobile Number'
                inputClass={`${styles.textField} ${styles.name} w-100`}
                // inputId='form-control-country'
                enableSearch={true}
                countryCodeEditable={false}
                disableDropdown={false}
                disableSearchIcon={false}
                disableCountryCode={false}
                country={'us'}
                specialLabel=""
                onChange={handleCountryChange}
                inputStyle={{ width: '100%', paddingLeft: '15px' }}
                inputProps={{ ref: inputRef }}
              /> */}
              <input
                className={`${styles.textField} ${styles.name} w-100`}
                type="text"
                name="phone"
                id="phone"
                placeholder="Phone Number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />

              {formik.touched.phone && formik.errors.phone ? (
                <div className={styles.errorMessage}>{formik.errors.phone}</div>
              ) : null}
            </div>

            {/* <div className="col-md-6">
              <input
                type="text"
                name="servicesOffered"
                className={`${styles.textField} ${styles.name} w-100`}
                placeholder="Services Offered*"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.servicesOffered}
              />
              {formik.touched.servicesOffered && formik.errors.servicesOffered ? (
                <div className={styles.errorMessage}>{formik.errors.servicesOffered}</div>
              ) : null}
            </div> */}
            <div className="col-md-6">
              <select
                name="servicesOffered"
                className={`${styles.textField} ${styles.name} py-0 w-100`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.servicesOffered}
              >
                <option value="">Services Offered</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Water Heater Repair & Installation">Water Heater Repair & Installation</option>
                <option value="Slab Leak Detection & Repair">Slab Leak Detection & Repair</option>
                <option value="Water Leak Detection & Repair">Water Leak Detection & Repair</option>
                <option value="Drain Cleaning & Repair">Drain Cleaning & Repair</option>
                <option value="HVAC">HVAC</option>
                <option value="Air Conditioning Repair & Installation">Air Conditioning Repair & Installation</option>
                <option value="Water Damage Repair & Restoration">Water Damage Repair & Restoration</option>
              </select>
              {formik.touched.servicesOffered && formik.errors.servicesOffered ? (
                <div className={styles.errorMessage}>{formik.errors.servicesOffered}</div>
              ) : null}
            </div>


            <div className="col-md-6">
              <input
                type="text"
                name="companyWebsite"
                className={`${styles.textField} ${styles.name} w-100`}
                placeholder="Company Website*"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.companyWebsite}
              />
              {formik.touched.companyWebsite && formik.errors.companyWebsite ? (
                <div className={styles.errorMessage}>{formik.errors.companyWebsite}</div>
              ) : null}
            </div>

            <div className="col-md-6">
              <input
                type="text"
                name="companyAddress"
                className={`${styles.textField} ${styles.name} w-100`}
                placeholder="Company Address*"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.companyAddress}
              />
              {formik.touched.companyAddress && formik.errors.companyAddress ? (
                <div className={styles.errorMessage}>{formik.errors.companyAddress}</div>
              ) : null}
            </div>

            <div className="col-md-6">
              <select
                name="country"
                className={`${styles.textField} ${styles.name} py-0 w-100`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.country}
              >
                <option value="">Country*</option>
                <option value="usa">USA</option>
                <option value="canada">Canada</option>
                <option value="uk">UK</option>
              </select>
              {formik.touched.country && formik.errors.country ? (
                <div className={styles.errorMessage}>{formik.errors.country}</div>
              ) : null}
            </div>

            <div className="col-md-6">
              <select
                name="state"
                className={`${styles.textField} ${styles.name} py-0 w-100`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.state}
              >
                <option value="">State/Province/Region*</option>
                <option value="california">California</option>
                <option value="ontario">Ontario</option>
                <option value="london">London</option>
              </select>
              {formik.touched.state && formik.errors.state ? (
                <div className={styles.errorMessage}>{formik.errors.state}</div>
              ) : null}
            </div>

            <div className="col-md-6">
              <select
                name="city"
                className={`${styles.textField} ${styles.name} py-0 w-100`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
              >
                <option value="">City*</option>
                <option value="losangeles">Los Angeles</option>
                <option value="toronto">Toronto</option>
                <option value="london">London</option>
              </select>
              {formik.touched.city && formik.errors.city ? (
                <div className={styles.errorMessage}>{formik.errors.city}</div>
              ) : null}
            </div>

            <div className="col-md-6">
              <textarea
                name="aboutYourCompany"
                rows={6}
                className={`${styles.textField} ${styles.message} w-100`}
                placeholder="Please tell us about your company*"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.aboutYourCompany}
              />
              {formik.touched.aboutYourCompany && formik.errors.aboutYourCompany ? (
                <div className={styles.errorMessage}>{formik.errors.aboutYourCompany}</div>
              ) : null}
            </div>

            <div className="col-md-6">
              <textarea
                name="provideYourInformation"
                rows={6}
                className={`${styles.textField} ${styles.message} w-100`}
                placeholder="Please provide your licensing, bonding, and insurance information."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.provideYourInformation}
              />
              {formik.touched.provideYourInformation && formik.errors.provideYourInformation ? (
                <div className={styles.errorMessage}>{formik.errors.provideYourInformation}</div>
              ) : null}
            </div>

            <div className={`${styles.content1} mt-4`}>
              <button className={`${styles.email1} ${styles.button} border-0`} type="submit">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactUsNow;
