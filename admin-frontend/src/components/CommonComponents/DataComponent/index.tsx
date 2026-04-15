import React, { useEffect, useState } from "react";
import Dropdown from "@/components/UI/Dropdown";
import Button from "@/components/UI/Button";
import { FaTrash } from "react-icons/fa";
import styles from "./data.module.scss";
import DynamicInput from "@/components/UI/Input";
import { setSelectedImage } from "@/lib/features/selectedImageSlice/selectedImageSlice";
import ImageUpload from "../../UI/Modal/UploadImages/Upload";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import Editor from "@/components/UI/Editor";

interface DataComponentProps {
    formik: any;
    url?: string;
    imageId?: string;
    [key: string]: any;
}

const DataComponent: React.FC<DataComponentProps> = ({
    formik,
    url,
    categories,
    data,
    imageId,
    disabled,
    ...props
}) => {


    const handleAddFaq = (e:any) => {
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

    const options = [
        { value: "option1", label: "Design" },
        { value: "option2", label: "Hr" },
        { value: "option3", label: "Seo" },
    ];

    return (
        <div className="main w-100">
            <div className={styles.frameWrapper}>
                <div className={styles.frameGroup}>
                    <div className={styles.frameContainer}>
                        <DynamicInput
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled={disabled}
                        />
                        {formik.touched?.title && formik.errors?.title ? (
                            <div className={styles.error}>{formik.errors.title}</div>
                        ) : null}

                        <DynamicInput
                            type="text"
                            name="slug"
                            placeholder="Slug"
                            value={formik.values.slug}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled={disabled}
                        />
                        {formik.touched?.slug && formik.errors?.slug ? (
                            <div className={styles.error}>{formik.errors.slug}</div>
                        ) : null}

                        {/* <div>
                            <Editor
                                value={formik.values.content}
                                setOptions={{
                                    readonly: disabled,
                                }}
                                onChange={(content: any) => formik.setFieldValue('content', content)}
                            />
                            {formik.touched?.content && formik.errors?.content ? (
                                <div className={styles.error}>{formik.errors.content}</div>
                            ) : null}
                        </div> */}
                        
                            {/* <div className="mb-0">
                                <h5>Add FAQ (Question & Answer)</h5>
                                {formik.values?.faq && formik.values?.faq?.map(
                                    (faq: { question: string; answer: string }, index: number) => (
                                        <div key={index} className={`${styles.frameParent1}`}>
                                            <div className={styles.SeoInputComponents}>
                                                <DynamicInput
                                                    type="text"
                                                    name={`faq[${index}].question`}
                                                    placeholder="Question"
                                                    value={faq.question}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    disabled={disabled}
                                                />
                                                <DynamicInput
                                                    as="textarea"
                                                    rows={3}
                                                    name={`faq[${index}].answer`}
                                                    placeholder="Answer"
                                                    value={faq.answer}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    disabled={disabled}
                                                />
                                                {!disabled && (
                                                    <FaTrash
                                                        onClick={() => handleRemoveFaq(index)}
                                                        style={{ position: "absolute", right: "0" }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    )
                                )}
                                {!disabled && (
                                    <Button
                                        text="Add FAQ"
                                        type="button"
                                        handle={handleAddFaq}
                                        className={styles.btnStyle}
                                    >
                                        Add FAQ
                                    </Button>
                                )}
                            </div>  */}


                    </div>
                </div>

            </div>
        </div>
    );
};

export default DataComponent;
