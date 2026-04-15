"use client"
import { useFormik } from "formik";
import styles from "@/components/Templates/ServiceTemplates/Services/page.module.css";
import Button from "@/components/UI/Button";
import Editor from "@/components/UI/Editor";
import { asyncHandler } from "@/utils/asyncHandler";
import { toast } from "react-toastify";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import SeoComponent from "@/components/CommonComponents/SeoComponent";
import { useEffect, useState } from "react";
import DynamicInput from "@/components/UI/Input";
import { FaTrash } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { requestHandler } from "@/helper/requestHandler";
import { MRT_PaginationState } from "material-react-table";
import { Modal } from "react-bootstrap";
import ServicePreview from "@/components/ModalPreviewpages/multipleService/services-9/page";
import { useRouter } from "next/navigation";
interface ServicesProps {
  serviceData: any;
}
const Services: React.FC<ServicesProps> = ({ serviceData }) => {
  const [imagePreviews, setImagePreviews] = useState({
    bannerImage: null,
    contentImages: [] as (string | ArrayBuffer | null)[],
    contentImages2: [] as (string | ArrayBuffer | null)[],
    serviceSliderImages: [] as (string | ArrayBuffer | null)[],
    testimonialImages: [] as (string | ArrayBuffer | null)[],
  });
  const [previewData, setPreviewData] = useState<any>(null);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const pageId = searchParams.get("pageId");
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [isViewMode, setIsViewMode] = useState(false);
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);
  const selectedImage = useAppSelector(
    (state) => state.selectedImage.selectedImage
  );
  const router = useRouter();
  const dispatch = useAppDispatch();
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
  }, []);
  const handleImageChange = (event: any, type: string, index?: number) => {
    const file = event.currentTarget.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      // if (type === "banner") {
      // } 
      if (type === "content" && index !== undefined) {
        setImagePreviews((prev) => {
          const updatedContentImages = [...prev.contentImages];
          updatedContentImages[index] = reader.result; // This should hold the image preview URL
          return {
            ...prev,
            contentImages: updatedContentImages,
          };
        });
        formik.setFieldValue(`content[${index}].contentImage`, file); // Store the actual file here
      }
      else if (type === "content2" && index !== undefined) {
        setImagePreviews((prev) => {
          const updatedcontentImages2 = [...prev.contentImages2];
          updatedcontentImages2[index] = reader.result;
          return {
            ...prev,
            contentImages2: updatedcontentImages2,
          };
        });
        formik.setFieldValue(`content2[${index}].contentImage`, file);
      }
      else if (type === "testimonials" && index !== undefined) {
        setImagePreviews((prev) => {
          const updatedTestimonialImages = [...prev.testimonialImages];
          updatedTestimonialImages[index] = reader.result;
          return {
            ...prev,
            testimonialImages: updatedTestimonialImages,
          };
        });
        formik.setFieldValue(`testimonials[${index}].testimonialImage`, file);
      } else if (type === "serviceSlider" && index !== undefined) {
        setImagePreviews((prev) => {
          const updatedServiceSliderImages = [...prev.serviceSliderImages];
          updatedServiceSliderImages[index] = reader.result;
          return {
            ...prev,
            serviceSliderImages: updatedServiceSliderImages,
          };
        });
        formik.setFieldValue(`serviceSlider[${index}].serviceSliderImage`, file);
      } else {
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
  if (serviceData) {
    console.log(serviceData);
  }
  useEffect(() => {
    if (selectedImage) {
      formik.setFieldValue("featureImage", JSON.stringify(selectedImage.id));
    }
  }, [selectedImage]);
  const formik = useFormik({
    initialValues: {
      breadcrumbTitle: serviceData?.breadcrumbTitle || '',
      slug: serviceData?.slug || '',
      bannerTitle: serviceData?.bannerTitle || '',
      bannerSubTitle: serviceData?.bannerSubTitle || '',
      bannerContent: serviceData?.bannerContent || '',
      bannerImage: serviceData?.bannerImage || null,
      section2: serviceData?.section2 || {
        title: '',
        card: [{ cardTitle: '', cardText: '' }]
      },
      content: serviceData?.content || [
        { contentTitle: '', contentText: '', contentImage: null },
      ],
      content2: serviceData?.content2 || [
        { contentTitle: '', contentText: '', contentImage: null },
      ],
      serviceSlider: serviceData?.serviceSlider || [
        { serviceSliderImage: null, cardTitle: '', cardSubTitle: "", cardContent: '' }
      ],
      testimonials: serviceData?.testimonials || [
        { rating: '', testimonialContent: '', testimonialImage: null, altTitle: '', testimonialName: '' }
      ],
      locationContent: serviceData?.locationContent || [
        {
          pageSubHeading: "",
          location: [{ items: "", links: "" }],
          browseBtnText: "",
          browseBtnLink: "",
        },
      ],
      seoTitle: serviceData?.seoTitle || '',
      seoDescription: serviceData?.seoDescription || '',
      metaRobot: serviceData?.metaRobot || '',
      schema: serviceData?.schema || [''],
      faq: serviceData?.faq || [''],
      template: serviceData?.template || "services_9",
      categories: [''],
    },
    onSubmit: asyncHandler(async (values: any) => {
      try {
        const formData = new FormData();
        const jsonData = {
          breadcrumbTitle: values.breadcrumbTitle,
          slug: values.slug,
          bannerTitle: values.bannerTitle,
          bannerSubTitle: values.bannerSubTitle,
          bannerContent: values.bannerContent,
          bannerImage: values.bannerImage ? 'bannerImage' : null,
          section2: {
            title: values.section2.title,
            card: values.section2.card.map((item: any) => ({
              cardTitle: item.cardTitle,
              cardText: item.cardText,
            }))
          },
          content: values.content.map((item: any, index: any) => ({
            contentTitle: item.contentTitle,
            contentText: item.contentText,
            contentImage: item.contentImage ? `item${[index]}.contentImage` : null,
          })),
          content2: values.content2.map((item: any, index: any) => ({
            contentTitle: item.contentTitle,
            contentText: item.contentText,
            contentImage: item.contentImage ? `item${[index]}.contentImage` : null,
          })),
          serviceSlider: values.serviceSlider.map((item: any, index: any) => ({
            serviceSliderImage: item.serviceSliderImage ? `item${[index]}.serviceSliderImage` : null,
            cardTitle: item.cardTitle,
            cardSubTitle: item.cardSubTitle,
            cardContent: item.cardContent
          })),
          testimonials: values.testimonials.map((item: any, index: any) => ({
            rating: item.rating,
            testimonialContent: item.testimonialContent,
            testimonialImage: item.testimonialImage ? `item${[index]}.testimonialImage` : null,
            altTitle: item.altTitle,
            testimonialName: item.testimonialName
          })),
          seoTitle: values.seoTitle,
          seoDescription: values.seoDescription,
          metaRobot: values.metaRobot,
          schema: values.schema,
          locationContent: values.locationContent,
          faq: values.faq,
          template: values.template,
          categories: values.categories
        };
        formData.append('data', JSON.stringify(jsonData));
        if (values.bannerImage) formData.append('bannerImage', values.bannerImage);
        values.content.forEach((item: any, index: any) => {
          if (item.contentImage instanceof File) {
            formData.append(`contentImage${index}`, item.contentImage);
          }
        });
        values.content2.forEach((item: any, index: any) => {
          if (item.contentImage instanceof File) {
            formData.append(`content2Image${index}`, item.contentImage);
          }
        });
        values.serviceSlider.forEach((item: any, index: any) => {
          if (item.serviceSliderImage) formData.append(`serviceSliderImage${index}`, item.serviceSliderImage);
        });
        values.testimonials.forEach((item: any, index: any) => {
          if (item.testimonialImage) formData.append(`testimonialImage${index}`, item.testimonialImage);
        });
        let apiUrl;
        if (pageId) {
          apiUrl = `/editService?serviceId=${pageId}`;
        } else {
          apiUrl = '/addService';
        }
        try {
          const response = await requestHandler(apiUrl, formData, 'POST', {
            'Content-Type': 'multipart/form-data',
          });
          // if (response.status === 200) {
          if (response.status === 200) {
            router.push("/pages"); // Redirect to the login page
            toast.success(response.message || "Process Successfully");

            console.log("Success:");
          } else {
            console.error("Error:", response.message);
          }
        } catch (error) {
          console.error("Request Error:", error);
        }
      } catch (error) {
        console.error("Form submission error:", error);
      }
    }),
  });
  const handleDeleteBannerImage = () => {
    formik.setFieldValue("bannerImage", ""); // Reset the bannerImage value
    setImagePreviews({ ...imagePreviews, bannerImage: null }); // Clear the preview
  };

  const handlePreview = () => {
    setShowModal(true); // Show the modal
    setPreviewData(formik.values);
    // alert(JSON.stringify(formik.values, null, 2));
    console.log(formik.values, "sadsad");
  };
  const handleClose = () => {
    setShowModal(false);
  };
  const handleAddContent = (e: any) => {
    e.preventDefault();
    formik.setFieldValue("content", [
      ...formik.values?.content,
      { contentTitle: '', contentText: '', contentImage: null },
    ]);
  }
  const handleAddContent2 = (e: any) => {
    e.preventDefault()
    formik.setFieldValue("content2", [
      ...formik.values?.content2,
      { contentTitle: '', contentText: '', contentImage: null },
    ]);
  };
  const handleRemoveContent2 = (index: number) => {
    const updatedFaq = formik.values?.content2.filter(
      (_: any, i: any) => i !== index
    );
    formik.setFieldValue("content2", updatedFaq);

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
  const handleAddService = () => {
    formik.setFieldValue("serviceSlider", [
      ...formik.values?.serviceSlider,
      { cardTitle: '', cardSubTitle: '', cardText: '', serviceSliderImage: null },
    ]);
  };
  const handleRemoveService = (index: number) => {
    const updatedFaq = formik.values?.serviceSlider.filter(
      (_: any, i: any) => i !== index
    );
    formik.setFieldValue("serviceSlider", updatedFaq);
  };
  const handleAddTestimonial = () => {
    formik.setFieldValue("testimonials", [
      ...formik.values.testimonials,
      { rating: '', testimonialContent: '', testimonialImage: null, altTitle: '', testimonialName: '' },
    ]);
  };
  const handleRemoveTestimonial = (index: number) => {
    const updatedTestimonials = formik.values.testimonials.filter((_: any, i: any) => i !== index);
    formik.setFieldValue("testimonials", updatedTestimonials);
  };
  useEffect(() => {
    setIsViewMode(pathname.includes("view"));
  }, [pathname]);
  const handleAddCard = (e: any) => {
    e.preventDefault()
    formik.setFieldValue('section2.card', [
      ...formik.values.section2.card,
      { cardTitle: '', cardSubTitle: '', cardText: '', cardImage: null }
    ]);
  };
  const handleRemoveCard = (index: any) => {
    const updatedCards = formik.values.section2.card.filter((_: any, i: any) => i !== index);
    formik.setFieldValue('section2.card', updatedCards);
  };
  const handleAddFaq = (e: any) => {
    e.preventDefault()
    formik.setFieldValue("faq", [
      ...formik.values?.faq,
      { question: "", answer: "" },
    ]);
  };
  const handleRemoveFaq = (index: number) => {
    const updatedFaq = formik.values?.faq.filter(
      (_: any, i: any) => i !== index
    );
    formik.setFieldValue("faq", updatedFaq);
  };
  const handleAddLocation = (e: any) => {
    e.preventDefault()
    formik.setFieldValue("locationContent", [
      ...formik.values.locationContent,
      {
        pageSubHeading: "",
        location: [{ items: "", links: "" }],
        browseBtnText: "",
        browseBtnLink: "",
      },
    ]);
  };
  const handleAddLocationItem = (index: any, e: any) => {
    e.preventDefault()
    const newLocationItem = { items: '', links: '' };
    const updatedLocationContent = [...formik.values.locationContent];
    updatedLocationContent[index].location.push(newLocationItem);
    formik.setFieldValue('locationContent', updatedLocationContent);
  };

  const handleRemoveLocation = (index: number) => {
    const updatedLocations = formik.values.locationContent.filter(
      (_: any, i: any) => i !== index
    );
    formik.setFieldValue("locationContent", updatedLocations);
  };
  const handleRemoveLocationItem = (index: any, locIndex: any) => {
    const updatedLocationContent = [...formik.values.locationContent];
    updatedLocationContent[index].location.splice(locIndex, 1);
    formik.setFieldValue('locationContent', updatedLocationContent);
  };
  return (
    <>
      <form onSubmit={formik.handleSubmit} className={styles.frameParent}>
        <div className={`container ${styles.templateSection}`}>
          <div className="row">
            <div className="col-7">
              {/* Breadcrumb Section */}
              <div className={`mt-0 ${styles.mb4}`}>
                <h4>Breadcrumb Section </h4>
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
              <div className={`mt-0 ${styles.mb4}`}>
                <h4>Slug</h4>
                <div className="mb-3">
                  <input
                    name="slug"
                    placeholder="Breadcrumb Title"
                    className="form-control"
                    value={formik.values.slug}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
              {/* Banner Section */}
              <div className={styles.mb4}>
                <h4>Banner Section </h4>
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
                <h5>Banner SubTitle</h5>
                <div className="mb-3">
                  <input
                    name="bannerSubTitle"
                    placeholder="Banner SubTitle"
                    className="form-control"
                    value={formik.values.bannerSubTitle}
                    onChange={formik.handleChange}
                  />
                </div>
                <h5>Banner Content</h5>
                <div className="mb-3">
                  <Editor
                    name="bannerContent"
                    value={formik.values.bannerContent}
                    onChange={(e: any) => formik.setFieldValue('bannerContent', e.target.value)}
                  />
                </div>
                <h5>Banner Image</h5>
                <div className={`mb-3 ${styles.imageWrapper}`}>
                  <input
                    type="file"
                    name="bannerImage"
                    accept="image/jpeg, image/png"
                    className="form-control w-50 mt-2"
                    onChange={(event: any) => handleImageChange(event, "banner")}
                  />
                  {imagePreviews.bannerImage ? (
                    <div>
                      <img
                        src={imagePreviews.bannerImage}
                        height={160}
                        width={160}
                        alt="Banner preview"
                        className={styles.imagePreview}
                      />
                      {/* <button type="button" onClick={handleDeleteBannerImage}>
                        Delete
                      </button> */}
                    </div>
                  ) : (
                    formik.values.bannerImage && (
                      <div>
                        <img
                          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${formik.values.bannerImage}`}
                          height={160}
                          width={160}
                          alt="Existing Banner"
                          className={styles.imagePreview}
                        />
                        {/* <button type="button" onClick={handleDeleteBannerImage}>
                          Delete
                        </button> */}
                      </div>
                    )
                  )}
                </div>
              </div>
              {/* section 2 */}
              <div className={styles.mb4}>
                <h4>
                  Section 2
                </h4>
                <h5>Title</h5>
                <div className="mb-3">
                  <Editor
                    name={`section2.title`}
                    value={formik.values.section2.title}
                    onChange={(e: any) => formik.setFieldValue(`section2.title`, e.target.value)}
                  />
                </div>
                {formik.values.section2.card && formik.values.section2.card.map((card: any, index: any) => (
                  <div key={index} style={{ marginBottom: '20px' }}>
                    <DynamicInput
                      type="text"
                      name={`section2.card[${index}].cardTitle`}
                      placeholder="Card Title"
                      value={card.cardTitle}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={styles.w100}
                    />
                    {/* <DynamicInput
                      type="text"
                      name={`section2.card[${index}].cardSubTitle`}
                      placeholder="Card Sub Title"
                      value={card.cardSubTitle}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={styles.w100}
                    /> */}

                    <Editor
                      name={`section2.card[${index}].cardText`}
                      value={card.cardText}
                      onChange={(e: any) => formik.setFieldValue(`section2.card[${index}].cardText`, e.target.value)}
                    />
                    <FaTrash
                      onClick={() => handleRemoveCard(index)}
                      className={styles.trashIcon}
                    />
                  </div>
                ))}
                <div className={styles.btnEnd}>
                  <Button
                    text="Add Card"
                    type="button"
                    handle={handleAddCard}
                    className={styles.btnStyle}
                  >
                    Add Card
                  </Button>
                </div>
              </div>
              {/* Content Section */}
              <div className={styles.mb4}>
                <h4>Content Section I</h4>
                {formik.values?.content && formik.values?.content?.map(
                  (content: { contentTitle: string; contentText: string, contentImage: string }, index: number) => (
                    <div key={index} >
                      <div  >
                        {/* <DynamicInput
                          type="text"
                          name={`content[${index}].contentTitle`}
                          placeholder="contentTitle"
                          value={content.contentTitle}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={styles.w100}
                        /> */}
                        <Editor
                          name={`content[${index}].contentTitle`}
                          value={formik.values.content[index].contentTitle}
                          onChange={(e: any) => formik.setFieldValue(`content[${index}].contentTitle`, e.target.value)}
                        />
                        <Editor
                          name={`content[${index}].contentText`}
                          value={formik.values.content[index].contentText}
                          onChange={(e: any) => formik.setFieldValue(`content[${index}].contentText`, e.target.value)}
                        />
                        <div className={`mb-3 ${styles.imageWrapper}`}>
                          <input
                            type="file"
                            name={`content[${index}].contentImage`}
                            accept="image/jpeg, image/png"
                            className="form-control w-50 mt-2"
                            onChange={(event: any) => handleImageChange(event, "content", index)}
                          />
                          {content?.contentImage && (
                            <img
                              src={typeof content.contentImage === 'string'
                                ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${content.contentImage}`
                                : URL.createObjectURL(content.contentImage)}
                              height={160}
                              width={160}
                              alt="Existing Content"
                              className={styles.imagePreview}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )}
                {/* <FaTrash
                  className={styles.trashIcon}
                  onClick={() => handleRemoveContent(index)}

                /> */}
                {/* <div className={styles.btnEnd}>
                  <Button
                    text="Add Content"
                    type="button"
                    handle={handleAddContent}
                    className={styles.btnStyle}
                  >
                    Add Content
                  </Button>
                </div> */}
              </div>
              <div className={styles.mb4}>
                <h4>Content Section II</h4>
                {formik.values?.content2 && formik.values?.content2?.map(
                  (content2: { contentTitle: string; contentText: string, contentImage: string }, index: number) => (
                    <div key={index} >
                      <div  >
                        <DynamicInput
                          type="text"
                          name={`content2[${index}].contentTitle`}
                          placeholder="Content Title"
                          value={content2.contentTitle}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={styles.w100}
                        />
                        <Editor
                          name={`content2[${index}].contentText`}
                          value={formik.values.content2[index].contentText}
                          onChange={(e: any) => formik.setFieldValue(`content2[${index}].contentText`, e.target.value)}
                        />
                        <div className={`mb-3 ${styles.imageWrapper}`}>
                          <input
                            type="file"
                            name={`content2[${index}].contentImage`}
                            accept="image/jpeg, image/png"
                            className="form-control w-50 mt-2"
                            onChange={(event: any) => handleImageChange(event, "content2", index)}
                          />
                          {content2?.contentImage && (
                            <img
                              src={typeof content2.contentImage === 'string'
                                ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${content2.contentImage}`
                                : URL.createObjectURL(content2.contentImage)}
                              height={160}
                              width={160}
                              alt="Existing Content"
                              className={styles.imagePreview}
                            />
                          )}
                        </div>
                      </div>
                      {/* <FaTrash
                        className={styles.trashIcon}
                        onClick={() => handleRemoveContent2(index)}
                      /> */}
                    </div>
                  )
                )}
                <div className={styles.btnEnd}>
                  {/* <Button
                    text="Add Content"
                    type="button"
                    handle={handleAddContent2}
                    className={styles.btnStyle}
                  >
                    Add Content
                  </Button> */}
                </div>
              </div>
              {/* Service Slider Section */}
              {/* <div className={styles.mb4}>
                <h4>Service Slider Section</h4>
                {formik.values?.serviceSlider && formik.values?.serviceSlider?.map(
                  (serviceSlider: { cardSubTitle: string; cardTitle: string; cardContent: string, serviceSliderImage: string }, index: number) => (
                    <div key={index} >
                      <div  >
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
                          value={formik.values.serviceSlider[index].cardContent}
                          onChange={(e: any) => formik.setFieldValue(`serviceSlider[${index}].cardContent`, e.target.value)}
                        />
                        <div className={`mb-3 ${styles.imageWrapper}`} >
                          <input
                            type="file"
                            name={`serviceSlider[${index}].serviceSliderImage`}
                            accept="image/jpeg, image/png"
                            className="form-control w-50 mt-2"
                            onChange={(event: any) => handleImageChange(event, "serviceSlider", index)}
                          />
                          {imagePreviews.serviceSliderImages[index] ? (
                            <img src={imagePreviews.serviceSliderImages[index] as string} height={160} width={160} alt="Banner preview" className={styles.imagePreview} />
                          ) : (
                            formik.values.serviceSlider && (
                              <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${formik.values.serviceSlider[index].serviceSliderImage}`} height={160} width={160} alt="Existing Banner" className={styles.imagePreview} />
                            )
                          )}
                        </div>
                        <FaTrash
                          className={styles.trashIcon}
                          onClick={() => handleRemoveService(index)}

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
              </div> */}

              {/* Testimonials */}

              {/* <div className={styles.mb4}>
                <h4>Testimonials Section</h4>
                {formik.values.testimonials && formik.values.testimonials.map((testimonial: any, index: number) => (
                  <div key={index}>
                    <div style={{ gap: "5px" }}>
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
                        value={formik.values.testimonials[index].testimonialContent}
                        onChange={(e: any) => formik.setFieldValue(`testimonials[${index}].testimonialContent`, e.target.value)}
                      />

                      <div className={`mb-3 ${styles.imageWrapper}`}>
                        <input
                          type="file"
                          name={`testimonials[${index}].testimonialImage`}
                          accept="image/jpeg, image/png"
                          className="form-control w-50 mt-2"
                          onChange={(event: any) => handleImageChange(event, "testimonials", index)}
                        />

                        {imagePreviews.testimonialImages[index] ? (
                          <img src={imagePreviews.testimonialImages[index] as string} height={160} width={160} alt="testimonialImage preview" className={styles.imagePreview} />
                        ) : (
                          formik.values.testimonials && (
                            <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${formik.values.testimonials[index].testimonialImage}`} height={160} width={160} alt="testimonialImage image" className={styles.imagePreview} />
                          )
                        )}
                      </div>
                      <FaTrash
                        onClick={() => handleRemoveTestimonial(index)}
                        className={styles.trashIcon}
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

              <div className={styles.mb4}>
                <h4>Location Content</h4>
                {formik.values.locationContent.map((locationItem: any, index: any) => (
                  <div key={index} className={styles.mb4}>
                    <h5>3.{index + 1} Location Content</h5>
                    <div className="mb-3">
                      <input
                        name={`locationContent[${index}].pageSubHeading`}
                        placeholder="Page Subheading"
                        className="form-control"
                        value={locationItem.pageSubHeading}
                        onChange={formik.handleChange}
                      />
                    </div>

                    {locationItem.location.map((locItem: any, locIndex: any) => (
                      <>
                        <h5>3.{index + 1}.{(locIndex + 1)} Location Item</h5>

                        <div key={locIndex} className="mb-3">
                          <input
                            name={`locationContent[${index}].location[${locIndex}].items`}
                            placeholder="Location Item"
                            className="form-control"
                            value={locItem.items}
                            onChange={formik.handleChange}
                          />
                        </div>
                        <div key={locIndex} className="mb-3">
                          <input
                            name={`locationContent[${index}].location[${locIndex}].links`}
                            placeholder="Location Link"
                            className="form-control mb-3"
                            value={locItem.links}
                            onChange={formik.handleChange}
                          />
                        </div>
                        <div className={styles.btnEnd}>
                          <a
                            type="button"
                            className={styles.btnStyle}
                            onClick={() => handleRemoveLocationItem(index, locIndex)}
                          >
                            Remove Location Item
                          </a>
                        </div>
                      </>
                    ))}
                    <a
                      type="button"
                      className={`mb-3 ${styles.btnStyle}`}
                      onClick={(e) => handleAddLocationItem(index, e)} // Function to add location item
                    >
                      Add Location Item
                    </a>
                    <div className="mb-3">
                      <input
                        name={`locationContent[${index}].browseBtnText`}
                        placeholder="Browse Button Text"
                        className="form-control"
                        value={locationItem.browseBtnText}
                        onChange={formik.handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <input
                        name={`locationContent[${index}].browseBtnLink`}
                        placeholder="Browse Button Link"
                        className="form-control"
                        value={locationItem.browseBtnLink}
                        onChange={formik.handleChange}
                      />
                    </div>

                    <div className={styles.btnEnd}>
                      <a
                        type="button"
                        className={styles.btnStyle}
                        onClick={() => handleRemoveLocation(index)}
                      >
                        Remove Location Content
                      </a>
                    </div>

                    {/* Add Location Item Button */}
                  </div>

                ))}
                <a
                  type="button"
                  className={`mb-3 ${styles.btnStyle}`}
                  onClick={handleAddLocation}
                >
                  Add Location Content
                </a>
              </div>
              <div className={styles.mb4}>
                <h4>Add FAQ (Question & Answer)</h4>
                {formik.values?.faq && formik.values?.faq?.map(
                  (faq: { question: string; answer: string }, index: number) => (
                    <div key={index} className={`${styles.frameParent1}`}>
                      <div className={styles.SeoInputComponents}>
                        <h5> Faq {`${index + 1}`}</h5>
                        <DynamicInput
                          type="text"
                          name={`faq[${index}].question`}
                          placeholder="Question"
                          value={faq.question}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="form-control w-100 mt-2"
                        // disabled={disabled}
                        />
                        <DynamicInput
                          as="textarea"
                          rows={3}
                          name={`faq[${index}].answer`}
                          placeholder="Answer"
                          className="form-control w-100 mt-2"
                          value={faq.answer}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        // disabled={disabled}
                        />
                        {/* {!disabled && ( */}
                        <FaTrash
                          onClick={() => handleRemoveFaq(index)}
                          className={styles.trashIcon}
                          style={{ right: "0", top: "0" }}
                        />
                        {/* )} */}
                      </div>
                    </div>
                  )
                )}
                {/* {!disabled && ( */}
                <Button
                  text="Add FAQ"
                  type="button"
                  handle={handleAddFaq}
                  className={styles.btnStyle}
                >
                  Add FAQ
                </Button>
                {/* )} */}
              </div>

              <div className={styles.mb4}>
                <div className={styles.btnGroup}>
                  <Button
                    handle={formik.handleSubmit}
                    type="submit"
                    text="Save"
                    className={styles.btnStyle}
                  />

                  <Button
                    handle={handlePreview}
                    text="Preview"
                    className={styles.btnStyle}
                  />
                </div>
              </div>
            </div>
            <div className="col-5">
              <SeoComponent data={data} disabled={isViewMode} formik={formik} />
            </div>
          </div>
        </div>
      </form>
      <Modal show={showModal} onHide={handleClose} fullscreen centered>
        <Modal.Header closeButton>
          <Modal.Title>Preview Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>{JSON.stringify(previewData, null, 2)}</pre>
          <ServicePreview data={previewData} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close                           b
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Services;


('b' + 'a' + +'a' + 'a').toLowerCase()

// output ba2aa
// output  baNaNa
// output  banana                            