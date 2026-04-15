"use client";
import { NextPage } from "next";
import { useFormik } from "formik";
import * as Yup from "yup";
// import styles from "@/app/(dashboard)/pages/page.module.scss";
import styles from "@/components/Templates/BecomeProvider/page.module.css";
import SeoComponent from "@/components/CommonComponents/SeoComponent";
import { requestHandler } from "@/helper/requestHandler";
import { asyncHandler } from "@/utils/asyncHandler";
import { toast } from "react-toastify";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navigation from "@/components/Layout/Navigation/Navigation";
import { MRT_PaginationState } from "material-react-table";
import Editor from "@/components/UI/Editor";
import Buttons from "@/components/UI/Button";
import { Button, Modal } from "react-bootstrap";
import BecomeProviderPreview from "@/components/ModalPreviewpages/become-porivder/page";
interface BecomeProviderProps {
  becomeProvider: any; // Adjust the type as needed
}
const BecomeProvider: React.FC<BecomeProviderProps> = ({ becomeProvider }: any) => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const pageId = searchParams.get("pageId");
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [showModal, setShowModal] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);

  const handleClose = () => {
    setShowModal(false);
  };
  const [imagePreviews, setImagePreviews] = useState<any>({
    bannerImage: null,
  });
  const [initialValues, setInitialValues] = useState<any>({
    breadcrumbTitle: "",
    bannerTitle: "",
    bannerImage: null,
    slug:  "",
    pageSubHeading: "",
    content: "",
    seoTitle: "",
    seoDescription: "",
    metaRobot: "",
    schema: [""],
    template: "become_provider",
    // categories: [""],
    featureImage: "",
  });

  const fetchData = async () => {
    try {
      const templateResponse = await requestHandler(
        `/template/list?pageIndex=${pagination.pageIndex + 1}&pageSize=${pagination.pageSize}`,
        {},
        "get"
      );
      const categoryResponse = await requestHandler(
        `/pages/list?pageIndex=${pagination.pageIndex + 1}&pageSize=${pagination.pageSize}&type=category&subType=${slug}`,
        {},
        "get"
      );

      const fetchedTemplates = templateResponse.data.map((item: any) => ({
        id: item._id,
        label: item.title,
        value: item.key,
      }));
      // const fetchedCategories = categoryResponse.data.map((item: any) => ({
      //   id: item.id,
      //   label: item.title,
      //   value: item.slug,
      // }));

      setData(fetchedTemplates);
      // setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();

    if (pageId) {
      setInitialValues({
        breadcrumbTitle: becomeProvider.breadcrumbTitle || "",
        bannerTitle: becomeProvider.bannerTitle || "",
        bannerImage: becomeProvider.bannerImage || null,
        slug: becomeProvider.slug || "",
        pageSubHeading: becomeProvider.pageSubHeading || "",
        content: becomeProvider.content[0] || "",
        seoTitle: becomeProvider.seoTitle || "",
        seoDescription: becomeProvider.seoDescription || "",
        metaRobot: becomeProvider.metaRobot || "",
        schema: becomeProvider.schema || [""],
        template: "become_provider",
        // categories: [""],
        featureImage: "",
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageId]);

  const handleImageChange = (event: any, type: string, index?: number) => {
    const file = event.currentTarget.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      if (type === "bannerImage") {
        setImagePreviews((prev: any) => ({
          ...prev,
          bannerImage: reader.result,
        }));
        formik.setFieldValue("bannerImage", file);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: asyncHandler(async (values: any, { resetForm }: any) => {
      try {
        const formData = new FormData();
        formData.append('schema', JSON.stringify(values.schema));
        Object.keys(values).forEach((key) => {
          if (key !== 'bannerImage' && key !== 'schema') {
            formData.append(key, values[key]);
          }
        });
        if (values.bannerImage) {
          formData.append('bannerImage', values.bannerImage);
        }
        const endpoint = pageId
          ? `/editBecomeAProvider?becomeAProviderId=${pageId}`
          : `/addBecomeAProvider`;
        const response = await requestHandler(endpoint, formData, "post", {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
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
    setShowModal(true);
    setPreviewData(formik.values);
  };


  return (
    <div>
      {/* <Navigation
        profile={pageId ? "Edit Page" : "Add Page"}
        user01="/images/user01.svg"
        bell01="/images/bell01.svg"
      /> */}
      <form onSubmit={formik.handleSubmit} className={styles.frameParent}>
        <div className={`container ${styles.templateSection}`}>
          <div className="row">
            <div className="col-7">
              {/* Breadcrumb Section */}
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

              {/* Page Title Section */}
              <div className={styles.mb4}>
                <h4>Page Title Section</h4>
                {/* <div className="mb-3">
                  <input
                    name="bannerTitle"
                    placeholder="Page Title"
                    className="form-control"
                    value={formik.values.bannerTitle}
                    onChange={formik.handleChange}
                  />
                </div> */}
                <div className="mb-3">
                  <Editor
                    name="bannerTitle"
                    value={formik.values.bannerTitle}
                    onChange={(e: any) => formik.setFieldValue('bannerTitle', e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3">
                <h5>Banner Image</h5>
                <div className={`mb-3 ${styles.imageWrapper}`}>
                  <input
                    type="file"
                    name="bannerImage"
                    accept="image/jpeg, image/png"
                    className="form-control w-50"
                    onChange={(event: any) =>
                      handleImageChange(event, "bannerImage")
                    }
                  />
                  {imagePreviews.bannerImage ? (
                    <img src={imagePreviews.bannerImage} height={160} width={160} alt="Banner preview" className={styles.imagePreview} />
                  ) : (
                    formik.values.bannerImage && (
                      <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${formik.values.bannerImage}`} height={160} width={160} alt="Existing Banner" className={styles.imagePreview} />
                    )
                  )}

                </div>
              </div>
              <div className={styles.mb4}>
                <h4>Slug Section</h4>
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

              {/* Page Subheading Section */}
              <div className={styles.mb4}>
                <h4>Page Subheading Section</h4>
                <div className="mb-3">
                  <input
                    name="pageSubHeading"
                    placeholder="Page Subheading"
                    className="form-control"
                    value={formik.values.pageSubHeading}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className={styles.mb4}>
                <h5>Banner Content</h5>
                <div className="mb-3">
                  <Editor
                    name="content"
                    value={formik.values.content}
                    onChange={(e: any) => formik.setFieldValue('content', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* SEO Component */}
            <div className="col-5">
              <SeoComponent
                formik={formik}
                // categories={categories}
                data={data}
              />
            </div>
          </div>

          <div className="row d-flex justify-content-center">
            <div>
              <Buttons handle={formik.handleSubmit}
                text="Save Page"
                type="submit" className={`mb-3 ${styles.btnStyle}`}>
                Save Page
              </Buttons>
              <Buttons
                handle={handlePreview}
                text="Preview"
                className={styles.btnStyle}
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
          <BecomeProviderPreview data={previewData} />
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

export default BecomeProvider;
