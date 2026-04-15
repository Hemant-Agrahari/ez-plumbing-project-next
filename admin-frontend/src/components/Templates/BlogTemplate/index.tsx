"use client";
import { NextPage } from "next";
import { useFormik } from "formik";
import * as Yup from "yup";
// import styles from "@/app/(dashboard)/pages/page.module.scss";
import styles from "@/components/Templates/BlogTemplate/page.module.css";
import DataComponent from "@/components/CommonComponents/DataComponent";
import SeoComponent from "@/components/CommonComponents/SeoComponent";
import { requestHandler } from "@/helper/requestHandler";
import { asyncHandler } from "@/utils/asyncHandler";
import { toast } from "react-toastify";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navigation from "@/components/Layout/Navigation/Navigation";
import { MRT_PaginationState } from "material-react-table";
import Editor from "@/components/UI/Editor";
import { FaTrash } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";
import Buttons from "@/components/UI/Button";
import BlogPreview from "@/components/ModalPreviewpages/(blog)/[blog]/page";
import { Router } from "next/router";

interface BlogProps {
  Blogdata: any; // Adjust the type as needed
}
const BlogTemplate: React.FC<BlogProps> = ({ Blogdata }: any) => {
  const [data, setData] = useState([]);
  const [previewData, setPreviewData] = useState<any>(null);
  const [inputQuery, setInputQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [uploadedBannerImage, setUploadedBannerImage] = useState<File | null>(
    null
  );
  const [imagePreviewUrl, setImagePreviewUrl] = useState<File | any>(null);
  const [categories, setCategories] = useState([]);
  const [author, setAuthor] = useState([]);
  const [tags, setTags] = useState([]);
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const pageId = searchParams.get("pageId");
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const Router = useRouter()

  const [initialValues, setInitialValues] = useState({
    breadcrumbTitle: "",
    bannerImage: "",
    bannerContent: "",
    bannerTitle: "",
    slug: "",
    content: [{ title: "", content: "" }],
    seoTitle: "",
    seoDescription: "",
    metaRobot: "",
    schema: [""],
    faq: [""],
    tags: [""],
    categories: [""],
    template: "blog_template",
    author: "",
  });

  const fetchData = async () => {
    try {
      const templateResponse = await requestHandler(
        `/template/list?pageIndex=${pagination.pageIndex + 1}&pageSize=${pagination.pageSize
        }`,
        {},
        "get"
      );
      const authorResponse = await requestHandler(
        `/author/list?pageIndex=${pagination.pageIndex + 1}&pageSize=${pagination.pageSize
        }&search=`,
        {},
        "get"
      );
      const categoryResponse = await requestHandler(
        `/pages/list?pageIndex=${pagination.pageIndex + 1}&pageSize=${pagination.pageSize
        }&type=categories-management`,
        {},
        "get"
      );
      const tagsResponse = await requestHandler(
        `/tags/list?pageIndex=${pagination.pageIndex + 1}&pageSize=100000&search=${inputQuery}`,
        {},
        "get"
      );
      // console.log(authorResponse.data, "asdasasdad");

      const fetchedTemplates = templateResponse.data.map((item: any) => ({
        id: item._id,
        label: item.title,
        value: item.key,
      }));
      const fetchedAuthor = authorResponse.data.map((item: any) => ({
        id: item._id,
        label: item.bannerTitle,
        value: item._id,
      }));
      const fetchedCategories = categoryResponse.data.map((item: any) => ({
        id: item._id,
        label: item.title,
        value: item.slug,
      }));
      const fetchedTags = tagsResponse.data.map((item: any) => ({
        id: item._id,
        label: item.name,
        value: item.slug,
      }));

      setData(fetchedTemplates);
      setCategories(fetchedCategories);
      setAuthor(fetchedAuthor);
      setTags(fetchedTags);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // console.log(imagePreviewUrl, "imagePreviewUrl");

  useEffect(() => {
    fetchData();
    if (pageId) {
      setInitialValues({
        breadcrumbTitle: Blogdata?.breadcrumbTitle || "",
        bannerImage: Blogdata?.bannerImage || "",
        bannerContent: Blogdata?.bannerContent || "",
        bannerTitle: Blogdata?.bannerTitle || "",
        slug: Blogdata?.slug || "",
        content: Blogdata?.content || [{ title: "", content: "" }],
        seoTitle: Blogdata?.seoTitle || "",
        seoDescription: Blogdata?.seoDescription || "",
        metaRobot: Blogdata?.metaRobot || "",
        schema: Blogdata?.schema || [""],
        faq: Blogdata?.faq || [""],
        tags: Blogdata?.tags || [{ title: "", slug: "" }],
        categories: Blogdata?.categories || [{ title: "", slug: "" }],
        template: Blogdata?.template || "blog_template",
        author: pageId ? Blogdata?.author._id : "",
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageId]);

  const formik = useFormik({
    validationSchema: Yup.object({
      author: Yup.string().required("Author is required"),
    }),
    initialValues,
    enableReinitialize: true,
    onSubmit: asyncHandler(async (values: any, { resetForm }: any) => {
      try {
        const endpoint = pageId
          ? `/blog/edit?blogDataId=${pageId}`
          : `/blog/add`;
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          if (Array.isArray(values[key])) {
            formData.append(key, JSON.stringify(values[key]));
          } else {
            formData.append(key, values[key]);
          }
        });
        const response = await requestHandler(endpoint, formData, "post", {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // const jsonData = JSON.stringify(values, null, 2);
        // const blob = new Blob([jsonData], { type: "application/json" });
        // const link = document.createElement("a");
        // link.href = URL.createObjectURL(blob);
        // link.download = "blogData.json";
        // link.click();

        if (response.status === 200) {
          toast.success(response.message || "Data saved successfully");
          if (!pageId) {
            resetForm({ values: initialValues });
            Router.push("/pages")
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
  const handlePreview = () => {
    setShowModal(true); // Show the modal
    const imageToPreview = uploadedBannerImage
      ? URL.createObjectURL(uploadedBannerImage)
      : Blogdata?.bannerImage || ""; // Use existing image URL if no new image

    setPreviewData({
      ...formik.values,
      bannerImage: imageToPreview, // Update preview data to include image
    });
    // console.log(previewData, "Preview Data");
  };

  const handleClose = () => {
    setShowModal(false);
  };
  const handleAddContent = (e:any) => {
    e.preventDefault()
    formik.setFieldValue("content", [
      ...formik.values.content,
      { title: "", content: "" },
    ]);
  };

  const handleRemoveContent = (index: number) => {
    const updatedContent = formik.values.content.filter(
      (_: any, i: any) => i !== index
    );
    formik.setFieldValue("content", updatedContent);
  };
  if (Blogdata) {
    // console.log(Blogdata, "korbin");
  }
  return (
    <div>
      {/* <Navigation
        profile={pageId ? "Edit Blog" : "Add Blog"}
        user01="/images/user01.svg"
        bell01="/images/bell01.svg"
      /> */}
      <form onSubmit={formik.handleSubmit} className={styles.frameParent}>
        <div className={`container ${styles.templateSection}`}>
          <div className="row">
            <div className="col-7">
              <div className={styles.mb4}>
                <h4>Breadcrumb Section</h4>
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
              <div className={styles.mb4}>
                <h4>Slug</h4>
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
              <div className={styles.mb4}>
                <h4>Banner Section</h4>
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
                    onChange={(e: any) =>
                      formik.setFieldValue(`bannerContent`, e.target.value)
                    }
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
                      setUploadedBannerImage(file); // Store uploaded file in state
                      setImagePreviewUrl(URL.createObjectURL(file));
                    }}
                  />
                  {/* {imagePreviewUrl && ( */}
                  <div>
                    <img
                      src={
                        `${imagePreviewUrl}`.includes("blob")
                          ? `${imagePreviewUrl}`
                          : `${process.env.NEXT_PUBLIC_BACKEND_URL}${Blogdata?.bannerImage}`
                      }
                      alt="Uploaded Preview"
                      style={{ maxWidth: "100%", height: "auto" }} // Ensure the image fits well
                    />
                  </div>
                  {/* )} */}
                </div>
              </div>
              <div className={styles.mb4}>
                <h4>Content Section</h4>
                {/* <button
                  type="button"
                  className={`mb-3 ${styles.btnStyle}`}
                  onClick={handleAddContent}
                >
                  Add Content
                </button> */}
                {formik.values.content.map((contentItem: any, index: any) => (
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
                          formik.setFieldValue(
                            `content[${index}].content`,
                            e.target.value
                          )
                        }
                      />
                    </div>

                    {/* Button to remove content */}
                    {/* <button
                                            type="button"
                                            className={`mb-3 ${styles.btnStyle}`}
                                            onClick={() => handleRemoveContent(index)}
                                        >
                                            Remove Content
                                        </button> */}
                    <FaTrash
                      onClick={() => handleRemoveContent(index)}
                      className={styles.trashIcon}
                    // Adjust positioning as needed
                    />
                  </div>
                ))}
                <div className={styles.btnEnd}>
                  <button
                    type="button"
                    className={`mb-3 ${styles.btnStyle}`}
                    onClick={handleAddContent}
                  >
                    Add Content
                  </button>
                </div>
              </div>

              <div className={styles.btnGroup}>
                {/* <button type="submit" className={`mb-3 ${styles.btnStyle}`}>
                                Save Page
                            </button> */}
                <Buttons
                  handle={formik.handleSubmit}
                  type="submit"
                  text="Save"
                  className={styles.btnStyle}
                />

                <Buttons
                  handle={handlePreview}
                  text="Preview"
                  className={styles.btnStyle}
                />
              </div>
            </div>
            <div className="col-5">
              <SeoComponent
                formik={formik}
                categories={categories}
                author={author}
                data={data}
                tags={tags}
              />
            </div>
          </div>
        </div>
      </form>
      <Modal show={showModal} onHide={handleClose} fullscreen centered>
        <Modal.Header closeButton>
          <Modal.Title>Preview Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <pre>{JSON.stringify(previewData, null, 2)}</pre> */}
          <BlogPreview data={previewData} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BlogTemplate;
