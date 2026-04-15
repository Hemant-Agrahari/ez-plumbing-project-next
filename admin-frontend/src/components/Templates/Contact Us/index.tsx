"use client"
import type { NextPage } from "next";
import { Field, FieldArray, useFormik } from "formik";
import styles from "@/app/(dashboard)/pages/page.module.scss";
import Button from "@/components/UI/Button";
import Editor from "@/components/UI/Editor";
import { asyncHandler } from "@/utils/asyncHandler";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import SeoComponent from "@/components/CommonComponents/SeoComponent";
import { useEffect, useState } from "react";
import DynamicInput from "@/components/UI/Input";
import { FaTrash } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { setSelectedImage } from "@/lib/features/selectedImageSlice/selectedImageSlice";

const ContactUs: NextPage = () => {
    const [isViewMode, setIsViewMode] = useState(false); // Updated initialization
    const pathname = usePathname();
    const [showModal, setShowModal] = useState(false);
    const selectedImage = useAppSelector(
        (state) => state.selectedImage.selectedImage
    );

    useEffect(() => {
        if (selectedImage) {
            formik.setFieldValue("featureImage", JSON.stringify(selectedImage.id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedImage]);
    const formik = useFormik({
        initialValues: {
            breadcrumbTitle: '',
            banner: {
                bannerTitle: '',
                bannerContent: '',
                image: null
            },
            content: [
                { contentTitle: '', contentText: '', contentImage: null },
            ],
            serviceSlider: [
                { serviceSliderImage: null, cardTitle: '', cardContent: '' }
            ],
            testimonials: [
                { rating: '', testimonialContent: '', testimonialImage: null, altTitle: '', testimonialName: '' }
            ],
            seoTitle: '',
            seoDescription: '',
            metaRobot: '',
            schema: [''],
            faq: [],
            template: '',
            categories: [''],
            // featureImage: '',
        },
        onSubmit: asyncHandler(async (values: any) => {
            // Replace with your API call
            // console.log("Form submission successful:", values);
        }),
    });
    const handleAddContent = (e: any) => {
    e.preventDefault();
        formik.setFieldValue("content", [
            ...formik.values?.content,
            { contentTitle: '', contentText: '', contentImage: null },
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
            { cardTitle: '', cardText: '', serviceSliderImage: null },
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
            { rating: '', testimonialContent: '', testimonialImage: null, altTitle: '', testimonialName: '' },
        ]);
    };

    const handleRemoveTestimonial = (index: number) => {
        const updatedTestimonials = formik.values.testimonials.filter((_, i) => i !== index);
        formik.setFieldValue("testimonials", updatedTestimonials);
    };

    useEffect(() => {
        setIsViewMode(pathname.includes("view"));
    }, [pathname]);

    return (
        <form onSubmit={formik.handleSubmit} className={styles.frameParent}>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        {/* Breadcrumb Section */}
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

                        {/* Banner Section */}
                        <div className="mb-4">
                            <h4>2. <u>Banner Section</u></h4>
                            <h5>Banner Title</h5>
                            <div className="mb-3">
                                <input
                                    name="banner.bannerTitle"
                                    placeholder="Banner Title"
                                    className="form-control"
                                    value={formik.values.banner.bannerTitle}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <h5>Banner Content</h5>
                            <div className="mb-3">
                                <Editor
                                    name="banner.bannerContent"
                                    value={formik.values.banner.bannerContent}
                                    onChange={(e: any) => formik.setFieldValue('banner.bannerContent', e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <h5>Banner Image</h5>
                                <input
                                    type="file"
                                    name="banner.image"
                                    accept="image/jpeg, image/png"
                                    className="form-control"
                                    onChange={(event: any) => {
                                        const file = event.currentTarget.files[0];
                                        formik.setFieldValue('banner.image', file);
                                    }}
                                />
                            </div>
                        </div>
                        {/* Content Section */}
                        <div className="mb-4">
                            <h4>3. <u>Content Section</u></h4>
                            {formik.values?.content && formik.values?.content?.map(
                                (content: { contentTitle: string; contentText: string }, index: number) => (
                                    <div key={index} style={{ position: "relative" }}>
                                        <div  >
                                            <DynamicInput
                                                type="text"
                                                name={`content[${index}].contentTitle`}
                                                placeholder="contentTitle"
                                                value={content.contentTitle}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />

                                            <Editor
                                                name={`content[${index}].contentText`}
                                                value={formik.values.content[index].contentText}
                                                onChange={(e: any) => formik.setFieldValue(`content[${index}].contentText`, e.target.value)}
                                            />
                                            <div className="mb-3">
                                                <input
                                                    type="file"
                                                    name={`content[${index}].contentImage`}
                                                    accept="image/jpeg, image/png"
                                                    className="form-control"
                                                    onChange={(event: any) => {
                                                        const file = event.currentTarget.files[0];
                                                        formik.setFieldValue(`content[${index}].contentImage`, file);
                                                    }}
                                                />
                                            </div>
                                            <FaTrash
                                                onClick={() => handleRemoveContent(index)}
                                                style={{ position: "absolute", right: "0px", top: "0px" }}
                                            />
                                        </div>
                                    </div>
                                )
                            )}
                            <Button
                                text="Add Content"
                                type="button"
                                handle={handleAddContent}
                                className={styles.btnStyle}
                            >
                                Add Content
                            </Button>
                        </div>
                        {/* Service Slider Section */}
                        <div className="mb-4">
                            <h4>4. <u>Service Slider Section</u></h4>
                            {formik.values?.serviceSlider && formik.values?.serviceSlider?.map(
                                (serviceSlider: { cardTitle: string; cardContent: string }, index: number) => (
                                    <div key={index} style={{ position: "relative" }}>
                                        <div  >
                                            <h5> Slider Item {`${index + 1}`}</h5>
                                            <DynamicInput
                                                type="text"
                                                name={`serviceSlider[${index}].cardTitle`}
                                                placeholder="cardTitle"
                                                value={serviceSlider.cardTitle}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            <Editor
                                                name={`serviceSlider[${index}].cardContent`}
                                                value={formik.values.serviceSlider[index].cardContent}
                                                onChange={(e: any) => formik.setFieldValue(`serviceSlider[${index}].cardContent`, e.target.value)}
                                            />
                                            <div className="mb-3 d-flex" style={{ position: "relative" }}>
                                                <input
                                                    type="file"
                                                    name={`serviceSlider[${index}].serviceSliderImage`}
                                                    accept="image/jpeg, image/png"
                                                    className="form-control w-80"
                                                    onChange={(event: any) => {
                                                        const file = event.currentTarget.files[0];
                                                        formik.setFieldValue(`serviceSlider[${index}].serviceSliderImage`, file);
                                                    }}
                                                />
                                            </div>
                                            <FaTrash
                                                onClick={() => handleRemoveService(index)}
                                                style={{ position: "absolute", right: "0px", top: "0px" }}
                                            />
                                        </div>
                                    </div>
                                )
                            )}
                            <Button
                                text="                Add Slider Item
"
                                type="button"
                                handle={handleAddService}
                                className={styles.btnStyle}
                            >
                                Add Slider Item
                            </Button>
                        </div>
                        <div className="mb-4">
                            <h4>5. <u>Testimonials Section</u></h4>
                            {formik.values.testimonials && formik.values.testimonials.map((testimonial, index) => (
                                <div key={index}>
                                    <div style={{ position: "relative", gap: "5px" }}>
                                        <h5> Testimonial {`${index + 1}`}</h5>
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
                                        <Editor
                                            name={`testimonials[${index}].testimonialContent`}
                                            value={formik.values.testimonials[index].testimonialContent}
                                            onChange={(e: any) => formik.setFieldValue(`testimonials[${index}].testimonialContent`, e.target.value)}
                                        />
                                        <div className="mb-3 d-flex" style={{ position: "relative" }}>
                                            <input
                                                type="file"
                                                name={`testimonials[${index}].testimonialImage`}
                                                accept="image/jpeg, image/png"
                                                className="form-control w-80"
                                                onChange={(event: any) => {
                                                    const file = event.currentTarget.files[0];
                                                    formik.setFieldValue(`testimonials[${index}].testimonialImage`, file);
                                                }}
                                            />
                                        </div>
                                        <FaTrash
                                            onClick={() => handleRemoveTestimonial(index)}
                                            style={{ position: "absolute", right: "0px", top: "0px" }} // Adjust positioning as needed
                                        />
                                    </div>
                                </div>
                            ))}
                            <Button
                                text="Add Testimonial"
                                type="button"
                                handle={handleAddTestimonial}
                                className={styles.btnStyle}
                            >
                                Add Testimonial
                            </Button>
                        </div>
                    </div>
                    <div className="col-6">
                        <SeoComponent disabled={isViewMode} formik={formik} />
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div>
                        <Button
                            handle={formik.handleSubmit}
                            type="submit"
                            text="Save"
                            className={`mb-3 ${styles.btnStyle}`}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ContactUs;