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
import Editor from "@/components/UI/Editor";

const AddPage: NextPage = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [author, setAuthor] = useState([]);
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const pageId = searchParams.get("pageId");
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [initialValues, setInitialValues] = useState({
    breadcrumbTitle: "",
    bannerImage: "",
    bannerContent: "",
    bannerTitle: "",
    slug: ``,
    content: [{ title: "", content: "" }],
    seoTitle: "",
    seoDescription: "",
    metaRobot: "",
    schema: [""],
    template: "",
    categories: [""],
    author: "",
    featureImage: "",
    faq: [{ question: "", answer: "" }],
  });

  const fetchData = async () => {
    try {
      const templateResponse = await requestHandler(
        `/template/list?pageIndex=${pagination.pageIndex + 1}&pageSize=${pagination.pageSize
        }`,
        {},
        "get"
      );
      const categoryResponse = await requestHandler(
        `/pages/list?pageIndex=${pagination.pageIndex + 1}&pageSize=${pagination.pageSize
        }&type=category&subType=${slug}`,
        {},
        "get"
      );
      const authorResponse = await requestHandler(
        `/pages/list?pageIndex=${pagination.pageIndex + 1}&pageSize=${pagination.pageSize}&search=&type=author`,
        {},
        "get"
      );
      // console.log(authorResponse.data, "asdasasdad");

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
      const fetchedAuthor = authorResponse.data.map((item: any) => ({
        id: item._id,
        label: item.title,
        value: item.slug,
      }));

      setData(fetchedTemplates);
      setCategories(fetchedCategories);
      setAuthor(fetchedAuthor);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();

    // if (pageId) {
    //   asyncHandler(async () => {
    //     try {
    //       const response = await requestHandler(
    //         `/pages/view?pageId=${pageId}`,
    //         null,
    //         "get"
    //       );
    //       const data = response.data;

    //       // setInitialValues({
    //       //   title: data.title || "",
    //       //   slug: data.slug || "",
    //       //   content: data.content || "",
    //       //   seoTitle: data.seoTitle || "",
    //       //   seoDescription: data.seoDescription || "",
    //       //   metaRobot: data.metaRobot || "",
    //       //   schema: data.schema || [""],
    //       //   template: data.template || "",
    //       //   categories: data.categories || [""],
    //       //   featureImage: JSON.stringify(data.featureImage) || "",
    //       //   type: data.type || "",
    //       //   faq: Array.isArray(data.faq)
    //       //     ? data.faq
    //       //     : [{ question: "", answer: "" }],
    //       // });
    //     } catch (error) {
    //       console.error("Error fetching page data:", error);
    //     }
    //   })();
    // }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageId]);


  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: asyncHandler(async (values: any, { resetForm }: any) => {
      try {
        const endpoint = pageId ? `/blog/edit?blogDataId=${pageId}` : `/blog/add`;

        // Create a FormData object
        const formData = new FormData();

        // Append all fields to the FormData object
        Object.keys(values).forEach((key) => {
          if (Array.isArray(values[key])) {
            // Stringify the array and append it as a single field
            formData.append(key, JSON.stringify(values[key]));
          } else {
            formData.append(key, values[key]);
          }
        });

        // Send the request with FormData
        const response = await requestHandler(endpoint, formData, "post", {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Handle response and file download (optional)
        const jsonData = JSON.stringify(values, null, 2);
        const blob = new Blob([jsonData], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "blogData.json"; // Sets the file name
        link.click();

        if (response.status === 200) {
          toast.success(response.message || "Data saved successfully");
          if (!pageId) {
            resetForm({ values: initialValues });
          }
        } else {
          toast.error("Failed to save data");
        }
      } catch (error) {
        toast.error("Failed to save data");
        console.error("Submission error:", error);
      }
    }),
  });
  const handleAddContent = (e: any) => {
    e.preventDefault();
    formik.setFieldValue("content", [
      ...formik.values.content,
      { title: "", content: "" },
    ]);
  };

  const handleRemoveContent = (index: number) => {
    const updatedContent = formik.values.content.filter((_, i) => i !== index);
    formik.setFieldValue("content", updatedContent);
  };
  return (
    <div>
      {/* <Navigation
        profile={pageId ? "Edit Blog" : "Add Blog"}
        user01="/images/user01.svg"
        bell01="/images/bell01.svg"
      /> */}
      <form onSubmit={formik.handleSubmit} className={styles.frameParent}>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="mb-4">
                <h4>1. <u>Breadcrumb Section</u></h4>
                <div className="mb-3">
                  <input
                    name="breadcrumbTitle"
                    placeholder="Breadcrumb Title"
                    className="form-control"
                    value={formik.values.breadcrumbTitle}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
              <div className="mb-4">
                <h4> <u>Slug</u></h4>
                <div className="mb-3">
                  <input
                    name="slug"
                    placeholder="Slug"
                    className="form-control"
                    value={formik.values.slug}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>

              {/* Banner Section */}
              <div className="mb-4">
                <h4>2. <u>Banner Section</u></h4>
                <h5>Banner Title</h5>
                <div className="mb-3">
                  <input
                    name="bannerTitle"
                    placeholder="Banner Title"
                    className="form-control"
                    value={formik.values.bannerTitle}
                    onChange={formik.handleChange}
                  />
                </div>
                <h5>Banner Content</h5>
                <div className="mb-3">
                  <Editor
                    name="bannerContent"
                    value={formik.values.bannerContent}
                    onChange={(e: any) => formik.setFieldValue(`bannerContent`, e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <h5>Banner Image</h5>
                  <input
                    type="file"
                    name="bannerImage"
                    accept="image/jpeg, image/png"
                    className="form-control"
                    onChange={(event: any) => {
                      const file = event.currentTarget.files[0];
                      formik.setFieldValue(`bannerImage`, file);
                    }}
                  />
                </div>
              </div>
              <div className="mb-4">
                <h4>3. <u>Content Section</u></h4>
                {/* <button
                  type="button"
                  className={`mb-3 ${styles.btnStyle}`}
                  onClick={handleAddContent}
                >
                  Add Content
                </button> */}
                {formik.values.content.map((contentItem, index) => (
                  <div key={index} className="mb-4">
                    <div className="mb-3">
                      <h5>Content Title {index + 1}</h5>
                      <input
                        name={`content[${index}].title`}
                        placeholder="Content Title"
                        className="form-control"
                        value={contentItem.title}
                        onChange={formik.handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <h5>Content {index + 1}</h5>
                      <Editor
                        name={`content[${index}].content`}
                        value={contentItem.content}
                        onChange={(e: any) =>
                          formik.setFieldValue(`content[${index}].content`, e.target.value)
                        }
                      />
                    </div>

                    {/* Button to remove content */}
                    <button
                      type="button"
                      className={`mb-3 ${styles.btnStyle}`}
                      onClick={() => handleRemoveContent(index)}
                    >
                      Remove Content
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className={`mb-3 ${styles.btnStyle}`}
                  onClick={handleAddContent}
                >
                  Add Content
                </button>
              </div>

            </div>
            <div className="col-6">
              <SeoComponent
                formik={formik}
                categories={categories}
                author={author}
                data={data}
              />
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
