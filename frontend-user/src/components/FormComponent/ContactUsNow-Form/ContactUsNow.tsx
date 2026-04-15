"use client";
import React, { useRef } from "react";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { requestHandler, requestHandlerBackend } from "@/helper/requestHandler";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
const ContactUsNow = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleCountryChange = (
    value: any,
    country: any,
    e: any,
    formattedValue: any
  ) => {
    formik.setFieldValue("phone", formattedValue);
    formik.errors.phone;
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const handleSubmit = async (
    values: any,
    { resetForm }: FormikHelpers<any>
  ) => {
    if (!values.phone.startsWith("+1")) {
      values.phone = "+1" + values.phone;
    }
    try {
      const response = await requestHandlerBackend(
        "/contactUsForm",
        values,
        "post"
      );
      if (response.status === 200) {
        toast.success(response.message || "Form submitted successfully!"); // Use response.message if available
        router.push("/thank-you");
        resetForm();
      } else {
        throw new Error("Unexpected response");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  };
  const phoneRegex = /^(?!\s*$)(\(?\d{3}\)?[\s\-]?)\d{3}[\s\-]?\d{4}$/;
  
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      phone: Yup.string()
      .required('Required')
        .matches(
         phoneRegex,
         '(Must be 10 digits) may include -, (, )'
        ),
      message: Yup.string().required("Required"),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <div className="banner-contact-form">
      <form className="contact-form" onSubmit={formik.handleSubmit}>
        <div className="semi-small-title text-center mb-3">CONTACT US NOW!</div>
        <div className="inputField">
          <input
            className="text-field"
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="inputField">
          <input
            className="text-field"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="errorMessage">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="inputField">
        <div className="input-group flex-nowrap">
        <span className="input-group-text" id="basic-addon1" style={{height: 45}}>+1</span>
          <input
            className="text-field"
            type="text"
            name="phone"
            id="phone"
            placeholder="Phone Number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone.replace("+1", "").trim()}
          />
          </div>

          {/* <PhoneInput
            placeholder='Mobile Number'
            searchPlaceholder='Mobile Number'
            inputClass='text-field number-text-field'
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
          {formik.touched.phone && formik.errors.phone ? (
            <div className="errorMessage">{formik.errors.phone}</div>
          ) : null}
        </div>
        <div className="inputField">
          <textarea
            className="text-field"
            name="message"
            id="message"
            placeholder="Message"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
          />
          {formik.touched.message && formik.errors.message ? (
            <div className="errorMessage">{formik.errors.message}</div>
          ) : null}
        </div>
        <p className="privacy text-green">100% PRIVACY - WE NEVER SPAM YOU</p>
        <button className="btn btn-primary bg-green w-100" type="submit">
          Send
        </button>
        {/* <button
          className="btn btn-primary bg-green w-100"
          type="submit"
        >
          SEND
        </button> */}
      </form>
    </div>
  );
};

export default ContactUsNow;
