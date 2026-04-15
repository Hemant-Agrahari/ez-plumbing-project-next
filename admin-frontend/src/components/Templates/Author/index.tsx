"use client"
import type { NextPage } from "next";
import { useFormik } from "formik";
import styles from "@/components/Templates/Author/page.module.css";
// import styles from "@/app/(dashboard)/pages/page.module.scss";
import Button from "@/components/UI/Button";
import Editor from "@/components/UI/Editor";
import { asyncHandler } from "@/utils/asyncHandler";
import { usePathname, useSearchParams } from "next/navigation";
import SeoComponent from "@/components/CommonComponents/SeoComponent";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { setSelectedImage } from "@/lib/features/selectedImageSlice/selectedImageSlice";
import { requestHandler } from "@/helper/requestHandler";
import Navigation from "@/components/Layout/Navigation/Navigation";
import { Modal } from "react-bootstrap";
import AuthorPreview from "@/components/ModalPreviewpages/author/[author]/page";
import { MRT_PaginationState } from "material-react-table";
import { toast } from "react-toastify";
interface AuthorProps {
    authorData: any; // Adjust the type as needed
}
const Author: React.FC<AuthorProps> = ({ authorData }): any => {
    const [isViewMode, setIsViewMode] = useState(false); // Updated initialization
    const [imagePreviewUrls, setImagePreviewUrls] = useState<{ [key: string]: string | null }>({}); // State for image previews
    const [data, setData] = useState([]);
    const [author, setAuthor] = useState([]);
    const pathname = usePathname();
    const [previewData, setPreviewData] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    const searchParams = useSearchParams();
    const pageId = searchParams.get("pageId");
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const selectedImage = useAppSelector(
        (state) => state.selectedImage.selectedImage
    );
    const dispatch = useAppDispatch();
    // const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    // const handleImageSelect = (image: any) => {
    //     dispatch(setSelectedImage(image));
    // };
    const formik = useFormik({
        initialValues: {
            breadcrumbTitle: authorData.breadcrumbTitle || '',
            slug: authorData.slug || '',
            bannerTitle: authorData.bannerTitle || '',
            bannerSubTitle: authorData.bannerSubTitle || '',
            contentTitle: authorData.contentTitle || '',
            bannerContent: authorData.bannerContent || '',
            bannerImage: authorData.bannerImage || null,
            iconImage: authorData.iconImage || null,
            seoTitle: authorData.seoTitle || '',
            seoDescription: authorData.seoDescription || '',
            metaRobot: authorData.metaRobot || '',
            schema: pageId ? (authorData?.schema ? JSON.parse(authorData.schema) : ['']) : [''],
            faq: [],
            template:"author",
            categories: [''],
        },
        onSubmit: asyncHandler(async (values: any) => {
            try {
                const formData = new FormData();
                formData.append('breadcrumbTitle', values.breadcrumbTitle);
                formData.append('slug', values.slug);
                formData.append('bannerTitle', values.bannerTitle);
                formData.append('bannerSubTitle', values.bannerSubTitle);
                formData.append('contentTitle', values.contentTitle);
                formData.append('bannerContent', values.bannerContent);

                if (values.bannerImage) {
                    formData.append('bannerImage', values.bannerImage);
                }
                if (values.iconImage) {
                    formData.append('iconImage', values.iconImage);
                }
                formData.append('seoTitle', values.seoTitle);
                formData.append('seoDescription', values.seoDescription);
                formData.append('metaRobot', values.metaRobot);
                formData.append('schema', JSON.stringify(values.schema));
                formData.append('faq', JSON.stringify(values.faq));
                formData.append('template', values.template);
                formData.append('categories', JSON.stringify(values.categories));
                const apiUrl = pageId ? `/author/edit?authorId=${pageId}` : '/author/add';
                const response = await requestHandler(apiUrl, formData, 'POST', {
                    'Content-Type': 'multipart/form-data',
                });
                if (response.status === 200) {
                    toast.success(response.message || "Process Successfully");
                    if (!pageId) {
                        formik.resetForm();
                    }
                } else if (response.status === false || response.status === 400) {
                     toast.error(response.message || "Something went wrong");
                } else {
                    toast.error("Unexpected error occurred");
                }
                // console.log("Form submited:", response);
            } catch (error) {
                console.error("Form submission error:", error);
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
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const file = event.currentTarget.files?.[0];
        if (file) {
            formik.setFieldValue(field, file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreviewUrls(prevUrls => ({
                ...prevUrls,
                [field]: previewUrl
            }));
        }
    };
    const fetchData = async () => {
        try {
            const templateResponse = await requestHandler(
                `/template/list?pageIndex=${pagination.pageIndex + 1}&pageSize=${pagination.pageSize
                }`,
                {},
                "get"
            );
            //   const categoryResponse = await requestHandler(
            //     `/pages/list?pageIndex=${pagination.pageIndex + 1}&pageSize=${
            //       pagination.pageSize
            //     }&type=category&subType=${slug}`,
            //     {},
            //     "get"
            //   );
            const authorResponse = await requestHandler(
                `/pages/list?pageIndex=${pagination.pageIndex + 1}&pageSize=${pagination.pageSize
                }&search=&type=author`,
                {},
                "get"
            );
            // console.log(authorResponse.data, "asdasasdad");

            const fetchedTemplates = templateResponse.data.map((item: any) => ({
                id: item._id,
                label: item.title,
                value: item.key,
            }));
            // const fetchedCategories = categoryResponse.data.map((item: any) => ({
            //     id: item.id,
            //     label: item.title,
            //     value: item.slug,
            // }));
            const fetchedAuthor = authorResponse.data.map((item: any) => ({
                id: item._id,
                label: item.title,
                value: item.slug,
            }));

            setData(fetchedTemplates);
            // setCategories(fetchedCategories);
            setAuthor(fetchedAuthor);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        if (selectedImage) {
            formik.setFieldValue("featureImage", JSON.stringify(selectedImage.id));
        }
    }, [selectedImage]);
    useEffect(() => {
        fetchData()
    }, []);
    useEffect(() => {
        return () => {
            Object.values(imagePreviewUrls).forEach(url => {
                if (url) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, [imagePreviewUrls]);
    return (
        <>
            <form onSubmit={formik.handleSubmit} className={styles.frameParent}>
                <div className={`container ${styles.templateSection}`}>
                    <div className="row">
                        <div className="col-6">
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

                                <h5>Banner SubTitle</h5>
                                <div className="mb-3">
                                    <input
                                        name="bannerSubTitle"
                                        placeholder="Banner Sub Title"
                                        className="form-control"
                                        value={formik.values.bannerSubTitle}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                <h5>Content Title</h5>
                                <div className="mb-3">
                                    <input
                                        name="contentTitle"
                                        placeholder="Banner Sub Title"
                                        className="form-control"
                                        value={formik.values.contentTitle}
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

                                <div className="mb-3">
                                    <h5>Banner Image</h5>
                                    <div className={`mb-3 ${styles.imageWrapper}`}>
                                        <input
                                            type="file"
                                            name="bannerImage"
                                            accept="image/jpeg, image/png"
                                            className="form-control w-50"
                                            onChange={(event: any) => handleFileChange(event, 'bannerImage')}
                                        />
                                        {imagePreviewUrls['bannerImage'] ? (
                                            <img src={imagePreviewUrls['bannerImage']} height={160} width={160} alt="Banner preview" className={styles.imagePreview} />
                                        ) : (
                                            formik.values.bannerImage && (
                                                <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${formik.values.bannerImage}`} height={160} width={160} alt="Existing Banner" className={styles.imagePreview} />
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <h5>Banner Icon</h5>
                                    <div className={`mb-3 ${styles.imageWrapper}`}>
                                        <input
                                            type="file"
                                            name="iconImage"
                                            accept="image/jpeg, image/png"
                                            className="form-control w-50"
                                            onChange={(event: any) => handleFileChange(event, 'iconImage')}
                                        />
                                        {imagePreviewUrls['iconImage'] ? (
                                            <img src={imagePreviewUrls['iconImage']} height={160} width={160} alt="Banner preview" className={styles.imagePreview} />
                                        ) : (
                                            formik.values.iconImage && (
                                                <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${formik.values.iconImage}`} height={160} width={160} alt="Existing Banner" className={styles.imagePreview} />
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
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
                            <SeoComponent disabled={isViewMode} formik={formik} data={data} />
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center">

                    </div>
                </div>
            </form>
            <Modal show={showModal} onHide={handleClose} fullscreen centered>
                <Modal.Header closeButton>
                    <Modal.Title>Preview Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <pre>{JSON.stringify(previewData, null, 2)}</pre> */}
                    <AuthorPreview data={previewData} />
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

export default Author;