"use client";
import { NextPage } from "next";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "@/components/Templates/Scholarship/page.module.css";
// import styles from "@/app/(dashboard)/pages/page.module.scss";
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
import { Button, Modal } from "react-bootstrap";
import Buttons from "@/components/UI/Button";
import ScholarshipPreview from "@/components/ModalPreviewpages/scholarship";
interface ScholarshipDataProps {
  scholarshipData: any; // Adjust the type as needed
}
const Scholarship: React.FC<ScholarshipDataProps> = ({ scholarshipData }) => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);
  const [categories, setCategories] = useState([]);
  const [bannerImagePreview, setBannerImagePreview] = useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = useState({
    bannerImage: null,
  });

  const { slug } = useParams();
  const searchParams = useSearchParams();
  const pageId = searchParams.get("pageId");
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  if (scholarshipData) {
    // console.log(scholarshipData, "data scholarship")
  }
  const [initialValues, setInitialValues] = useState({
    breadcrumbTitle: "",
    bannerImage: "",
    bannerContent: "",
    bannerTitle: "",
    mainTitle: "",
    mainContent: "",
    listingTitle: "",
    listingItems: [{ listingItem: "" }],
    btnTitle: "",
    btnLink: "",
    slug: "",
    seoTitle: "",
    seoDescription: "",
    metaRobot: "",
    schema: [""],
    template: "scholarship_program",
    categories: [""],
    featureImage: "",
    faq: [{ question: "", answer: "" }],
  });
  useEffect(() => {
    if (pageId) {
      // console.log(scholarshipData, "data scholarship");

      // Set the initial values when scholarshipData is available
      setInitialValues({
        breadcrumbTitle: scholarshipData?.breadcrumbTitle || "",
        bannerImage: scholarshipData?.bannerImage || "",
        bannerContent: scholarshipData?.bannerContent || "",
        bannerTitle: scholarshipData?.bannerTitle || "",
        mainTitle: scholarshipData?.mainTitle || "",
        mainContent: scholarshipData?.mainContent || "",
        listingTitle: scholarshipData?.listingTitle || "",
        listingItems: pageId && scholarshipData?.listingItems
          ? JSON.parse(scholarshipData?.listingItems)
          : [{ listingItem: "" }],
        btnTitle: scholarshipData?.btnTitle || "",
        btnLink: scholarshipData?.btnLink || "",
        slug: scholarshipData?.slug || "",
        seoTitle: scholarshipData?.seoTitle || "",
        seoDescription: scholarshipData?.seoDescription || "",
        metaRobot: scholarshipData?.metaRobot || "",
        schema: JSON.parse(scholarshipData?.schema) || [""],
        template: scholarshipData?.template || "scholarship_program",
        categories: scholarshipData?.categories || [""],
        featureImage: scholarshipData?.featureImage || "",
        faq: scholarshipData?.faq || [{ question: "", answer: "" }],
      });
    }
  }, [scholarshipData]);
  const fetchData = async () => {
    try {
      const templateResponse = await requestHandler(
        `/template/list?pageIndex=${pagination.pageIndex + 1}&pageSize=${pagination.pageSize
        }`,
        {},
        "get"
      );

      // console.log("show data", templateResponse)

      const categoryResponse = await requestHandler(
        `/pages/list?pageIndex=${pagination.pageIndex + 1}&pageSize=${pagination.pageSize
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


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageId]);
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: asyncHandler(async (values: any, { resetForm }: any) => {
      try {
        const endpoint = pageId
          ? `/scholarship/edit?scholarshipId=${pageId}`
          : `/scholarship/add`;
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          const value = values[key];

          if (Array.isArray(value)) {
            // Stringify the entire array
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        });
        const response = await requestHandler(endpoint, formData, "post", {});
        // console.log("response", response);
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
  const handlePreview = () => {
    setShowModal(true); // Show the modal
    setPreviewData(formik.values);
    // alert(JSON.stringify(formik.values, null, 2));
    // console.log(formik.values, "sadsad");
  };
  const handleClose = () => {
    setShowModal(false);
  };
  const handleAddList = (event: any) => {
    event.preventDefault();
    formik.setFieldValue("listingItems", [
      ...formik.values.listingItems,
      { listingItem: "" } // Ensure new item follows the correct structure
    ]);
  };

  const handleImageChange = (event: any, type: string, index?: number) => {
    const file = event.currentTarget.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // if (type === "banner") {

      // } 

      setImagePreviews((prev: any) => ({
        ...prev,
        bannerImage: reader.result,
      }));
      formik.setFieldValue("bannerImage", file);

    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleBannerImageChange = (event: any) => {
    const file = event.currentTarget.files[0];
    if (file) {
      formik.setFieldValue("bannerImage", file);
      setBannerImagePreview(URL.createObjectURL(file)); // Set preview URL
    }
  };

  const handleRemoveList = (index: number) => {
    const updatedContent = formik.values.listingItems.filter((_: any, i: any) => i !== index);
    formik.setFieldValue("listingItems", updatedContent);
  };
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className={styles.frameParent}>
        <div className={`container ${styles.templateSection}`}>
          <div className="row">
            <div className="col-7">
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
                    // onChange={(event: any) => {
                    //   const file = event.currentTarget.files[0];
                    //   formik.setFieldValue(`bannerImage`, file);
                    // }}
                    onChange={(event: any) => handleImageChange(event, "bannerImage")}
                  />
                </div>
                {/* Image preview */}
                {imagePreviews.bannerImage ? (
                    <img src={imagePreviews.bannerImage} height={160} width={160} alt="Banner preview" className={styles.imagePreview} />
                  ) : (
                    formik.values.bannerImage && (
                      <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${formik.values.bannerImage}`} height={160} width={160} alt="Existing Banner" className={styles.imagePreview} />
                    )
                  )}
              </div>
              <div className={styles.mb4}>
                <h4>Content Section</h4>
                <h5>Main Title</h5>
                <div className="mb-3">
                  <input
                    name="mainTitle"
                    placeholder="Main Title"
                    className="form-control"
                    value={formik.values.mainTitle}
                    onChange={formik.handleChange}
                  />
                </div>
                <h5>Main Content</h5>
                <div className="mb-3">
                  <Editor
                    name="mainContent"
                    value={formik.values.mainContent}
                    onChange={(e: any) =>
                      formik.setFieldValue(`mainContent`, e.target.value)
                    }
                  />
                </div>

                <div className="mb-3">
                  <h5>Listing Title</h5>
                  <input
                    name={`listingTitle`}
                    placeholder="Content Title"
                    className="form-control"
                    value={formik.values.listingTitle}
                    onChange={formik.handleChange}
                  />
                </div>
                {formik.values.listingItems && formik.values?.listingItems.map((contentItem: any, index: any) => (
                  <div key={index}>
                    <div className="mb-3">
                      <h5>List Item {index + 1}</h5>
                      <Editor
                        name={`listingItems[${index}].listingItem`}
                        value={contentItem.listingItem} // Correctly reference listingItem
                        onChange={(e: any) =>
                          formik.setFieldValue(
                            `listingItems[${index}].listingItem`, // Correct path for updating formik field
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className={styles.btnEnd}>
                      <button
                        type="button"
                        className={`mb-3 ${styles.btnStyle}`}
                        onClick={() => handleRemoveList(index)}
                      >
                        Remove Content
                      </button>
                    </div>
                  </div>
                ))}
                <div className={styles.btnEnd}>
                  <button
                    type="button"
                    className={`mb-3 ${styles.btnStyle}`}
                    onClick={(event) => handleAddList(event)}
                  >
                    Add Content
                  </button>
                </div>
                <h5>Button Text</h5>
                <div className="mb-3">
                  <Editor
                    name="btnTitle"
                    value={formik.values.btnTitle}
                    onChange={(e: any) =>
                      formik.setFieldValue(`btnTitle`, e.target.value)
                    }
                  />
                </div>
                <h5>Button Link</h5>
                <div className="mb-3">
                  <Editor
                    name="btnLink"
                    value={formik.values.btnLink}
                    onChange={(e: any) =>
                      formik.setFieldValue(`btnLink`, e.target.value)
                    }
                  />
                </div>
              </div>

              <div className={styles.btnGroup}>
                <button type="submit" className={`mb-3 ${styles.btnStyle}`}>
                  Save Page
                </button>
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
                // categories={categories}
                data={data}
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
          <ScholarshipPreview data={previewData} />
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

export default Scholarship;
