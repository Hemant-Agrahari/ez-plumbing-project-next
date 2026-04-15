"use client";
import React, { useEffect, useRef } from "react";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { requestHandlerBackend } from "@/helper/requestHandler";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";

const CallTOAction = () => {
  const params = usePathname();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        const footer = document.querySelector(".footer");
        const callToAction = document.querySelector(
          ".call-action-form-wrapper"
        );
        if (!footer || !callToAction) {
          return;
        }

        const footerRect = footer.getBoundingClientRect();
        const isFooterVisible =
          footerRect.top <= window.innerHeight && footerRect.bottom >= 0;
        if (isFooterVisible) {
          callToAction.classList.add("hidden");
        } else {
          callToAction.classList.remove("hidden");
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Form Logic Start From Here
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleSubmit = async (
    values: any,

    { resetForm }: FormikHelpers<any>
  ) => {
    if (!values.phone.startsWith("+1")) {
        values.phone = "+1" + values.phone;
      }
    try {
      const response = await requestHandlerBackend(
        "/callToActionForm",
        values,
        "post"
      );
      if (response.status === 200) {
        toast.success(response.message || "Form submitted successfully!");
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
      phone: "",
      email: "",
      service: "",
      date: "",
      message: "",
      currentFormUrl: params
        ? `https://ezapi.ezheatandair.com${params}`
        : "https://ezapi.ezheatandair.com/",
    },
    validationSchema: Yup.object({
      phone: Yup.string()
      .required('Required')
        .matches(phoneRegex,  '(Must be 10 digits) may include -, (, )'),
      email: Yup.string().email().required("Invalid email id"),
      name: Yup.string().required("Name Required"),
      date: Yup.string().required("Date Required"),
      service: Yup.string().required("Service Required"),
      message: Yup.string().required("Message Required"),
    }),
    onSubmit: handleSubmit,
  });
  return (
    <>
      <section className="call-action-form-wrapper">
        <div className="call-action-form-contents">
          <div className="left-contents">

              <span style={{fontSize:"clamp(12px, 1vw, 14px)"}}>
               Need An Electrician?{" "}
                <a href="tel:+17603899117" id="ppc-contact">
                  (760) 389-9117
                </a>
              </span>
          </div>
          <div className="right-contents">
            <form className="action-form" onSubmit={formik.handleSubmit}>
              <div className="input-wrapper">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Your Name"
                  name="name"
                  id="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="error">{formik.errors.name}</div>
                ) : null}
              </div>
              <div className="input-wrapper">
              <div className="input-group flex-nowrap">
              <span className="input-group-text" id="basic-addon1" style={{height: "fit-content", fontSize: 12}}>+1</span>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Phone Number"
                  name="phone"
                  id="phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone.replace("+1", "").trim()}
                />
                </div>
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="error">{formik.errors.phone}</div>
                ) : null}
              </div>
              <div className="input-wrapper">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Email"
                  name="email"
                  id="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="error">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="input-wrapper">
                <select
                  className="form-control form-control-select"
                  name="service"
                  id="service"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.service}
                >
                  <option value="" disabled>
                    Select Service
                  </option>
                  <option value="plumbing_service">Plumbing</option>
                  <option value="sewer_and_drain">Sewer & Drain</option>
                  <option value="heating">Heating</option>
                  <option value="air_conditioning">Air Conditioning</option>
                  <option value="hvac">HVAC</option>
                 {/*  <option value="water_damage">Water Damage</option>
                  <option value="other">Other</option> */}
                </select>
                {formik.touched.service && formik.errors.service ? (
                  <div className="error">{formik.errors.service}</div>
                ) : null}
              </div>
              <div className="input-wrapper">
                <input
                  className="form-control"
                  type="date"
                  placeholder="Your Name"
                  name="date"
                  id="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.date}
                />
                {formik.touched.date && formik.errors.date ? (
                  <div className="error">{formik.errors.date}</div>
                ) : null}
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Message"
                  className="form-control"
                  name="message"
                  id="message"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.message}
                />
                {formik.touched.message && formik.errors.message ? (
                  <div className="error">{formik.errors.message}</div>
                ) : null}
              </div>
              <input type="submit" className="send-btn" value="Send" />
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default CallTOAction;
