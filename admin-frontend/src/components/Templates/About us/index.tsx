"use client";
import type { NextPage } from "next";
import { Field, FieldArray, useFormik } from "formik";
// import styles from "@/app/(dashboard)/pages/page.module.scss";
import styles from "@/components/Templates/About us/page.module.css";
import Button from "@/components/UI/Button";
import Editor from "@/components/UI/Editor";
import { asyncHandler } from "@/utils/asyncHandler";
import { toast } from "react-toastify";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import SeoComponent from "@/components/CommonComponents/SeoComponent";
import { useCallback, useEffect, useState } from "react";
import DynamicInput from "@/components/UI/Input";
import { FaTrash } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { setSelectedImage } from "@/lib/features/selectedImageSlice/selectedImageSlice";
import { requestHandler } from "@/helper/requestHandler";
import { MRT_PaginationState } from "material-react-table";
import Navigation from "@/components/Layout/Navigation/Navigation";
import { Modal } from "react-bootstrap";
// import ServicePreview from "@/components/ModalPreviewpages/multipleService/services7/page";
import AboutUsPreview from "@/components/ModalPreviewpages/about-us/page";
interface AboutUsProps {
  aboutUsData: any; // Adjust the type as needed
}
const AboutUs: React.FC<AboutUsProps> = ({ aboutUsData }) => {
  const [imagePreviews, setImagePreviews] = useState<any>({
    bannerImage: null,
    contentImages: [] as (string | ArrayBuffer | any | null)[],
    serviceSliderImages: [] as (string | ArrayBuffer | any | null)[],
    testimonialImages: [] as (string | ArrayBuffer | any | null)[],
  });
  const [data, setData] = useState([]);
  const [previewData, setPreviewData] = useState<any>(null);
  const [categories, setCategories] = useState([]);
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const pageId = searchParams.get("pageId");
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [isViewMode, setIsViewMode] = useState(false); // Updated initialization
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);
  const selectedImage = useAppSelector(
    (state) => state.selectedImage.selectedImage
  );
  const dispatch = useAppDispatch();
  const fetchData = useCallback(async () => {
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
  }, [pagination, slug]);

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
        } catch (error) {
          console.error("Error fetching page data:", error);
        }
      })();
    }
  }, [pageId, fetchData]);
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
      } else if (type === "content" && index !== undefined) {
        const updatedContentImages = [...imagePreviews.contentImages];
        updatedContentImages[index] = reader.result;
        setImagePreviews((prev: any) => ({
          ...prev,
          contentImages: updatedContentImages,
        }));
        formik.setFieldValue(`content[${index}].contentImage`, file);
      } else if (type === "testimonialImage" && index !== undefined) {
        const updatedTestimonialImages = [...imagePreviews.testimonialImages];
        updatedTestimonialImages[index] = reader.result;
        setImagePreviews((prev: any) => ({
          ...prev,
          testimonialImages: updatedTestimonialImages,
        }));
        formik.setFieldValue(`testimonials[${index}].testimonialImage`, file);
      } else if (type === "serviceSlider" && index !== undefined) {
        const updatedServiceSliderImages = [
          ...imagePreviews.serviceSliderImages,
        ];
        updatedServiceSliderImages[index] = reader.result;
        setImagePreviews((prev: any) => ({
          ...prev,
          serviceSliderImages: updatedServiceSliderImages,
        }));
        formik.setFieldValue(`serviceSlider[${index}].serviceSliderImage`, file);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const formik = useFormik({
    initialValues: {
      breadcrumbTitle: aboutUsData.breadcrumbTitle || "",
      slug: aboutUsData.slug || "",
      bannerTitle: aboutUsData.bannerTitle || "",
      bannerContent: aboutUsData.bannerContent || "",
      bannerImage: aboutUsData.bannerImage || null,
      content: pageId ? (aboutUsData.content) : [{ contentTitle: "", contentText: "", contentImage: null }],
      serviceSlider: pageId ? (aboutUsData.serviceSlider) : [{ serviceSliderImage: null, cardTitle: "", cardSubTitle: "", cardContent: "" }],
      testimonials: pageId ? (aboutUsData.testimonials) : [
        {
          rating: "",
          testimonialContent: "",
          testimonialImage: null,
          altTitle: "",
          testimonialName: "",
        },
      ],
      seoTitle: aboutUsData.seoTitle || "",
      seoDescription: aboutUsData.seoDescription || "",
      metaRobot: aboutUsData.metaRobot || "",
      schema: pageId ? aboutUsData.schema : [''],
      faq: [],
      template:"about_us",
      categories: [""],
    },
    onSubmit: asyncHandler(async (values: any, resetForm: any) => {
      const formData = new FormData();
      formData.append('breadcrumbTitle', values.breadcrumbTitle);
      formData.append('slug', values.slug);
      formData.append('seoTitle', values.seoTitle);
      formData.append('seoDescription', values.seoDescription);
      formData.append('metaRobot', values.metaRobot);
      formData.append('template', values.template);
      formData.append('schema', JSON.stringify(values.schema));
      formData.append('bannerTitle', values.bannerTitle);
      formData.append('bannerContent', values.bannerContent);

      formData.append('content', JSON.stringify(values.content.map((item: any, index: number) => ({
        contentTitle: item.contentTitle,
        contentText: item.contentText,
        contentImage: item.contentImage,

      }))));
      formData.append('serviceSlider', JSON.stringify(values.serviceSlider.map((item: any, index: number) => ({
        serviceSliderImage: item.serviceSliderImage,
        cardTitle: item.cardTitle,
        cardSubTitle: item.cardSubTitle,
        cardContent: item.cardContent
      }))));
      formData.append('testimonials', JSON.stringify(values.testimonials.map((item: any, index: number) => ({
        rating: item.rating,
        testimonialContent: item.testimonialContent,
        altTitle: item.altTitle,
        testimonialName: item.testimonialName,
        testimonialImage: item.testimonialImage,
      }))));
      formData.append('faq', JSON.stringify(values.faq));
      formData.append('categories', JSON.stringify(values.categories));
      if (values.bannerImage) {
        formData.append('bannerImage', values.bannerImage);
      }
      values.content.forEach((item: any, index: any) => {
        if (item.contentImage instanceof File) {
          formData.append(`contentImage${index}`, item.contentImage);
        }
      });
      values.serviceSlider.forEach((item: any, index: any) => {
        if (item.serviceSliderImage instanceof File) {
          formData.append(`serviceSliderImage${index}`, item.serviceSliderImage);
        }
      });
      values.testimonials.forEach((item: any, index: any) => {
        if (item.testimonialImage instanceof File) {
          formData.append(`testimonialImage${index}`, item.testimonialImage);
        }
      });
      try {
        const endpoint = pageId ? `/editAboutUs?aboutId=${pageId}` : `/addAboutUs`;

        const response = await requestHandler(endpoint, formData, 'post');
        if (response.status === 200) {
          toast.success(response.message || "Process Successfull")
        }
        // console.log("Form submission successful:", response.data);
      } catch (error: any) {
        toast.error(error.message || "")
        console.error("Error submitting form:", error);
      }
    }),
  });

  useEffect(() => {
    if (selectedImage) {
      formik.setFieldValue("featureImage", JSON.stringify(selectedImage.id));
    }
  }, [selectedImage, formik]);
  const handlePreview = () => {
    setShowModal(true); // Show the modal
    setPreviewData(formik.values);
    // alert(JSON.stringify(formik.values, null, 2));
    // console.log(formik.values, "sadsad");
  };

  const handleClose = () => {
    setShowModal(false);
  };
  const handleAddContent = (e: any) => {
    e.preventDefault();
    formik.setFieldValue("content", [
      ...formik.values?.content,
      { contentTitle: "", contentText: "", contentImage: null },
    ]);
  };

  const handleRemoveContent = (index: number) => {
    const updatedFaq = formik.values?.content.filter(
      (_: any, i: any) => i !== index
    );
    formik.setFieldValue("content", updatedFaq);
  };
  useEffect(() => {
    setIsViewMode(pathname.includes("view"));
  }, [pathname]);
  const handleAddService = (e:any) => {
    e.preventDefault()
    formik.setFieldValue("serviceSlider", [
      ...formik.values?.serviceSlider,
      { cardTitle: "", cardSubTitle: "", cardText: "", serviceSliderImage: null },
    ]);
  };
  const handleRemoveService = (index: number) => {
    const updatedFaq = formik.values?.serviceSlider.filter(
      (_: any, i: any) => i !== index
    );
    formik.setFieldValue("serviceSlider", updatedFaq);
  };
  const handleAddTestimonial = (e:any) => {
    e.preventDefault()
    formik.setFieldValue("testimonials", [
      ...formik.values.testimonials,
      {
        rating: "",
        testimonialContent: "",
        testimonialImage: null,
        altTitle: "",
        testimonialName: "",
      },
    ]);
  };

  const handleRemoveTestimonial = (index: number) => {
    const updatedTestimonials = formik.values.testimonials.filter(
      (_: any, i: any) => i !== index
    );
    formik.setFieldValue("testimonials", updatedTestimonials);
  };

  useEffect(() => {
    setIsViewMode(pathname.includes("view"));
  }, [pathname]);

  return (
    <>
      {/* <Navigation profile="About Us"
        user01="/images/user01.svg"
        bell01="/images/bell01.svg" /> */}
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
              <div className={styles.mb4}>
                <h4>Slug </h4>
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
                      formik.setFieldValue(
                        "bannerContent",
                        e.target.value
                      )
                    }
                  />
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
              </div>
              {/* Content Section */}
              <div className={styles.mb4}>
                <h4>Content Section</h4>
                {formik.values?.content &&
                  formik.values?.content?.map(
                    (
                      content: { contentTitle: string; contentText: string, contentImage: string },
                      index: number
                    ) => (
                      <div key={index}>
                        <div>
                          <DynamicInput
                            type="text"
                            name={`content[${index}].contentTitle`}
                            placeholder="contentTitle"
                            value={content.contentTitle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={styles.w100}
                          />

                          <Editor
                            name={`content[${index}].contentText`}
                            value={formik.values.content[index].contentText}
                            onChange={(e: any) =>
                              formik.setFieldValue(
                                `content[${index}].contentText`,
                                e.target.value
                              )
                            }
                          />

                          <div className={`mb-3 ${styles.imageWrapper}`}>
                            <input
                              type="file"
                              name={`content[${index}].contentImage`}
                              accept="image/jpeg, image/png"
                              className="form-control w-50"
                              onChange={(event: any) =>
                                handleImageChange(event, "content", index)
                              }
                            />
                            {/* {imagePreviews.contentImages[index] && (
                              <img
                                src={
                                  imagePreviews.contentImages[index] as string
                                }
                                alt={`Content ${index} Preview`}
                                style={{ width: "100px", height: "auto" }}
                              />
                            )} */}
                            {imagePreviews.contentImages[index] ? (
                              <img src={imagePreviews.contentImages[index]} height={160} width={160} alt="Banner preview" className={styles.imagePreview} />
                            ) : (
                              formik.values.content[index].contentImage && (
                                <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${formik.values.content[index].contentImage}`} height={160} width={160} alt="Existing Banner" className={styles.imagePreview} />
                              )
                            )}

                          </div>
                          <FaTrash
                            onClick={() => handleRemoveContent(index)}
                            className={styles.trashIcon}
                          />
                        </div>
                      </div>
                    )
                  )}
                <div className={styles.btnEnd}>
                  <Button
                    text="Add Content"
                    type="button"
                    handle={handleAddContent}
                    className={styles.btnStyle}
                  >
                    Add Content
                  </Button>
                </div>
              </div>
              {/* Service Slider Section */}
              {/* <div className={styles.mb4}>
                <h4>Service Slider Section</h4>
                {formik.values?.serviceSlider &&
                  formik.values?.serviceSlider?.map(
                    (
                      serviceSlider: { cardTitle: string; cardSubTitle: string, cardContent: string, serviceSliderImage: string },
                      index: number
                    ) => (
                      <div key={index}>
                        <div>
                          <h5> Slider Item {`${index + 1}`}</h5>
                          <DynamicInput
                            type="text"
                            name={`serviceSlider[${index}].cardTitle`}
                            placeholder="cardTitle"
                            value={serviceSlider.cardTitle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={styles.w100}
                          />
                          <DynamicInput
                            type="text"
                            name={`serviceSlider[${index}].cardSubTitle`}
                            placeholder="cardSubTitle"
                            value={serviceSlider.cardSubTitle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={styles.w100}
                          />
                          <Editor
                            name={`serviceSlider[${index}].cardContent`}
                            value={
                              formik.values.serviceSlider[index].cardContent
                            }
                            onChange={(e: any) =>
                              formik.setFieldValue(
                                `serviceSlider[${index}].cardContent`,
                                e.target.value
                              )
                            }
                          />
                          <div className={`mb-3 ${styles.imageWrapper}`}>
                            <input
                              type="file"
                              name={`serviceSlider[${index}].serviceSliderImage`} // Adjusted name to match the field
                              accept="image/jpeg, image/png"
                              className="form-control w-50"
                              onChange={(event: any) => handleImageChange(event, "serviceSlider", index)}
                            />

                            {imagePreviews.serviceSliderImages && imagePreviews.serviceSliderImages[index] ? (
                              <img
                                src={imagePreviews.serviceSliderImages[index]}
                                height={160}
                                width={160}
                                alt="Service Slider preview"
                                className={styles.imagePreview}
                              />
                            ) : (
                              serviceSlider.serviceSliderImage && ( // Adjusted to refer to the correct field
                                <img
                                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${serviceSlider.serviceSliderImage}`} // Adjusted to match the field name
                                  height={160}
                                  width={160}
                                  alt="Service Slider existing image"
                                  className={styles.imagePreview}
                                />
                              )
                            )}

                          </div>
                          <FaTrash
                            onClick={() => handleRemoveService(index)}
                            className={styles.trashIcon}
                          />
                        </div>
                      </div>
                    )
                  )}
                <div className={styles.btnEnd}>
                  <Button
                    text="Add Slider Item"
                    type="button"
                    handle={handleAddService}
                    className={styles.btnStyle}
                  >
                    Add Slider Item
                  </Button>
                </div>
              </div>
              <div className={styles.mb4}>
                <h4>Testimonials Section</h4>
                {formik.values.testimonials &&
                  formik.values.testimonials.map((testimonial: any, index: any) => (
                    <div key={index}>
                      <div>
                        <h5> Testimonial {`${index + 1}`}</h5>
                        <div className={styles.inputGroup}>
                          <DynamicInput
                            type="text"
                            name={`testimonials[${index}].testimonialName`}
                            placeholder="Name"
                            value={testimonial.testimonialName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <DynamicInput
                            type="text"
                            name={`testimonials[${index}].rating`}
                            placeholder="Rating"
                            value={testimonial.rating}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                        <Editor
                          name={`testimonials[${index}].testimonialContent`}
                          value={
                            formik.values.testimonials[index].testimonialContent
                          }
                          onChange={(e: any) =>
                            formik.setFieldValue(
                              `testimonials[${index}].testimonialContent`,
                              e.target.value
                            )
                          }
                        />
                        <div className={`mb-3 ${styles.imageWrapper}`}>
                          <input
                            type="file"
                            name={`testimonials[${index}].testimonialImage`}
                            accept="image/jpeg, image/png"
                            className="form-control w-50"
                            onChange={(event: any) =>
                              handleImageChange(event, "testimonialImage", index)
                            }
                          />
                          {imagePreviews.testimonialImages[index] ? (
                            <img
                              src={imagePreviews.testimonialImages[index]}
                              height={160}
                              width={160}
                              alt="Testimonial preview"
                              className={styles.imagePreview}
                            />
                          ) : (
                            testimonial.testimonialImage && (
                              <img
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${testimonial.testimonialImage}`}
                                height={160}
                                width={160}
                                alt="Existing Testimonial"
                                className={styles.imagePreview}
                              />
                            )
                          )}
                        </div>
                        <FaTrash
                          onClick={() => handleRemoveTestimonial(index)}
                          className={styles.trashIcon} // Adjust positioning as needed
                        />
                      </div>
                    </div>
                  ))}
                <div className={styles.btnEnd}>
                  <Button
                    text="Add Testimonial"
                    type="button"
                    handle={handleAddTestimonial}
                    className={styles.btnStyle}
                  >
                    Add Testimonial
                  </Button>
                </div>
              </div> */}
              <div className={styles.btnGroup}>
                <Button
                  handle={formik.handleSubmit}
                  type="submit"
                  text="Save"
                  className={`mb-3 ${styles.btnStyle}`}
                />
                <Button
                  handle={handlePreview}
                  text="Preview"
                  className={`mb-3 ${styles.btnStyle}`}
                />
              </div>
            </div>
            <div className="col-5">
              <SeoComponent
                data={data}
                // categories={categories}
                // disabled={isViewMode}
                formik={formik}
              />
            </div>
          </div>
          <div className="row d-flex justify-content-center"></div>
        </div>
      </form>
      <Modal show={showModal} onHide={handleClose} fullscreen centered>
        <Modal.Header closeButton>
          <Modal.Title>Preview Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <pre>{JSON.stringify(previewData, null, 2)}</pre> */}
          <AboutUsPreview data={previewData} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AboutUs;
