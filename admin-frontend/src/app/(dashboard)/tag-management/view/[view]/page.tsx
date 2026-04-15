"use client";
import { NextPage } from "next";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "@/app/(dashboard)/pages/page.module.scss";
import DataComponent from "@/components/CommonComponents/DataComponent";
import SeoComponent from "@/components/CommonComponents/SeoComponent";
import { requestHandler } from "@/helper/requestHandler";
import { asyncHandler } from "@/utils/asyncHandler";
import { toast } from "react-toastify";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navigation from "@/components/Layout/Navigation/Navigation";
import { MRT_PaginationState } from "material-react-table";
import DynamicInput from "@/components/UI/Input";

const AddPage: NextPage = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const pageId = searchParams.get("tagId");
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [initialValues, setInitialValues] = useState({
    name: "",
    slug: "",
  });

  const fetchData = async () => {
    try {
      const templateResponse = await requestHandler(
        `/tags/view?tagId=${pageId}`,
        {},
        "get"
      );

      if (templateResponse.status === 200) {
        toast.success(templateResponse.message)
        // const fetchedTemplates = templateResponse.data.map((item: any) => ({
        //   name: item.name,
        //   slug: item.slug,
        // }));
        // console.log(templateResponse.data, "sadsad")
        setInitialValues(templateResponse.data);
        // console.log(templateResponse.data, "dadad")
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageId]);


  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: asyncHandler(async (values: any, { resetForm }: any) => {
      try {
        const endpoint = pageId ? `/tags/edit?tagId=${pageId}` : `/tags/add`;
        const response = await requestHandler(endpoint, values, "post");

        if (response.status === 200) {
          toast.success(response.message || "Data saved successfully");
          if (!pageId) {
            resetForm({ values: initialValues });
          } // Reset form fields
        } else {
          toast.error("Failed to save data");
        }
      } catch (error) {
        toast.error("Failed to save data");
        console.error("Submission error:", error);
      }
    }),
  });

  return (
    <div>
      <Navigation
        profile={pageId ? "Edit Tag" : "Add Tag"}
        user01="/images/user01.svg"
        bell01="/images/bell01.svg"
      />
      <form onSubmit={formik.handleSubmit} className={styles.frameParent}>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="main w-100">
                <div className={styles.frameWrapper}>
                  <div className={styles.frameGroup}>
                    <div className={styles.frameContainer}>
                      <DynamicInput
                        type="text"
                        name="name"
                        placeholder="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched?.name && formik.errors?.name ? (
                        <div className={styles.error}>{formik.errors.name}</div>
                      ) : null}

                      <DynamicInput
                        type="text"
                        name="slug"
                        placeholder="Slug"
                        value={formik.values.slug}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                       />
                      {formik.touched?.slug && formik.errors?.slug ? (
                        <div className={styles.error}>{formik.errors.slug}</div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-6">
              <SeoComponent
                formik={formik}
                categories={categories}
                data={data}
              />
            </div> */}
          </div>
          <div className="row d-flex justify-content-center">
            <div>
              <button type="submit" className={`mb-3 ${styles.btnStyle}`}>
                Save Page
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPage;
