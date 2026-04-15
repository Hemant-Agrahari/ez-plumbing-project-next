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

const AddPage: NextPage = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const pageId = searchParams.get("pageId");
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [initialValues, setInitialValues] = useState({
    title: "",
    // slug: `/${slug}/`,
    slug: ``,
    content: "",
    seoTitle: "",
    seoDescription: "",
    metaRobot: "",
    schema: [""],
    template: "",
    categories: [""],
    featureImage: "",
    type: `${slug}`,
    faq: [{ question: "", answer: "" }],
  });

  const fetchData = async () => {
    try {
      const templateResponse = await requestHandler(
        `/template/list?pageIndex=${pagination.pageIndex + 1}&pageSize=${
          pagination.pageSize
        }`,
        {},
        "get"
      );
      const categoryResponse = await requestHandler(
        `/pages/list?pageIndex=${pagination.pageIndex + 1}&pageSize=${
          pagination.pageSize
        }&type=category&subType=${slug}`,
        {},
        "get"
      );

      const fetchedTemplates = templateResponse.data.map((item: any) => ({
        id: item._id,
        label: item.title,
        value: item.key,
      }));
      const fetchedCategories = categoryResponse.data.map((item: any) => ({
        id: item._id,
        label: item.title,
        value: item.slug,
      }));

      setData(fetchedTemplates);
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();

    if (pageId) {
      asyncHandler(async () => {
        try {
          const response = await requestHandler(
            `/pages/view?pageId=${pageId}`,
            null,
            "get"
          );
          const data = response.data;

          setInitialValues({
            title: data.title || "",
            slug: data.slug || "",
            content: data.content || "",
            seoTitle: data.seoTitle || "",
            seoDescription: data.seoDescription || "",
            metaRobot: data.metaRobot || "",
            schema: data.schema || [""],
            template: data.template || "",
            categories: data.categories || [""],
            featureImage: JSON.stringify(data.featureImage) || "",
            type: data.type || "",
            faq: Array.isArray(data.faq)
              ? data.faq
              : [{ question: "", answer: "" }],
          });
        } catch (error) {
          console.error("Error fetching page data:", error);
        }
      })();
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageId]);


  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: asyncHandler(async (values: any, { resetForm }: any) => {
      try {
        const endpoint = pageId ? `/pages/edit?pageId=${pageId}` : `/pages/add`;
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
        profile={pageId ? "Edit Pages" : "Add Pages"}
        user01="/images/user01.svg"
        bell01="/images/bell01.svg"
      />
      <form onSubmit={formik.handleSubmit} className={styles.frameParent}>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <DataComponent formik={formik} />
            </div>
            <div className="col-6">
              {/* <SeoComponent
                formik={formik}
                categories={categories}
                data={data}
              /> */}
            </div>
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
