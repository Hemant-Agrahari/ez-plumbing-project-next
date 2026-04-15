"use client";
import Editor from "@/components/UI/Editor";
import styles from "./page.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Navigation from "@/components/Layout/Navigation/Navigation";
import { requestHandler } from "@/helper/requestHandler";
import { asyncHandler } from "@/utils/asyncHandler";

const DataComponent = () => {
  const formik = useFormik({
    initialValues: {
      meta: "",
      homepagemeta: "",
      headerscript: "",
      bodyscript: "",
      footerscript: "",
    },
    validationSchema: Yup.object({
      meta: Yup.string().required("Meta is required"),
      homepagemeta: Yup.string().required("Home Page Meta is required"),
      headerscript: Yup.string().required("Header Script is required"),
      bodyscript: Yup.string().required("Body Script is required"),
      footerscript: Yup.string().required("Footer Script is required"),
    }),
    onSubmit: asyncHandler(async (values: any) => {
      const payload = {
        meta: values.meta,
        homeMeta: values.homepagemeta,
        headerScript: values.headerscript,
        bodyScript: values.bodyscript,
        footerScript: values.footerscript,
      };

      const response = await requestHandler('/seo/edit', payload, "post");

      if (response.ok) {
        // console.log('Data submitted successfully');
      } else {
        console.error('Failed to submit data');
      }
    }),
  });

  return (
    <>
      <Navigation
        profile="Seo Management"
        user01="/images/user01.svg"
        bell01="/images/bell01.svg"
      />
      <div className="main w-100">
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.ContentGroup}>
            <div className={styles.TextareaField}>
              <Editor
                tag="textarea"
                name="meta"
                placeholder="Add Meta"
                value={formik.values.meta}
                onChange={(meta: any) => formik.setFieldValue("meta", meta)}
              />
              {formik.touched.meta && formik.errors.meta ? (
                <div className={styles.error}>{formik.errors.meta}</div>
              ) : null}
            </div>
            <div className={styles.TextareaField}>
              <Editor
                tag="textarea"
                name="homepagemeta"
                placeholder="Add home page Meta i.e. GA/GTM/tawk"
                value={formik.values.homepagemeta}
                onChange={(homepagemeta: any) => formik.setFieldValue("homepagemeta", homepagemeta)}
              />
              {formik.touched.homepagemeta && formik.errors.homepagemeta ? (
                <div className={styles.error}>{formik.errors.homepagemeta}</div>
              ) : null}
            </div>
            <div className={styles.TextareaField}>
              <Editor
                tag="textarea"
                name="headerscript"
                placeholder="Add Header script"
                value={formik.values.headerscript}
                onChange={(headerscript: any) => formik.setFieldValue("headerscript", headerscript)}
              />
              {formik.touched.headerscript && formik.errors.headerscript ? (
                <div className={styles.error}>{formik.errors.headerscript}</div>
              ) : null}
            </div>
            <div className={styles.TextareaField}>
              <Editor
                tag="textarea"
                name="bodyscript"
                placeholder="Add Body script"
                value={formik.values.bodyscript}
                onChange={(bodyscript: any) => formik.setFieldValue("bodyscript", bodyscript)}
              />
              {formik.touched.bodyscript && formik.errors.bodyscript ? (
                <div className={styles.error}>{formik.errors.bodyscript}</div>
              ) : null}
            </div>
            <div className={styles.TextareaField}>
              <Editor
                tag="textarea"
                name="footerscript"
                placeholder="Add Footer script"
                value={formik.values.footerscript}
                onChange={(footerscript: any) => formik.setFieldValue("footerscript", footerscript)}
              />
              {formik.touched.footerscript && formik.errors.footerscript ? (
                <div className={styles.error}>{formik.errors.footerscript}</div>
              ) : null}
            </div>
            <div className={styles.ButtonGroup}>
              <button type="submit" className={styles.btnStyle}>
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default DataComponent;
