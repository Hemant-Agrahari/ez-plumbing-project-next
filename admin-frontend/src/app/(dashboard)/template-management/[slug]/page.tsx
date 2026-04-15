"use client";
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { requestHandler } from '@/helper/requestHandler';
import Navigation from '@/components/Layout/Navigation/Navigation';
import DynamicInput from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import styles from "@/app/(dashboard)/template-management/page.module.scss";
import { asyncHandler } from '@/utils/asyncHandler';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
});

const Page = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const templateId = searchParams.get('templateId');
    const pathname = usePathname();
    const [isViewMode, setIsViewMode] = useState(false);

    const fetchTemplate = async (templateId: any) => {
        const response = await requestHandler(`/template/view?templateId=${templateId}`, {}, 'get');
        if (response.status === 200) {
            formik.setValues({
                title: response.data.title,
                key: response.data.key,
            });
        } else {
            console.error('Failed to fetch template data');
        }
    };

    useEffect(() => {
        if (templateId) {
            fetchTemplate(templateId);
        }
        setIsViewMode(pathname.includes('view'));
    }, [templateId, pathname]);

    const formik = useFormik({
        initialValues: { title: '', key: '' },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: asyncHandler(async (values: any, { setSubmitting }: any) => {
            let endpoint = "/template/add";
            if (templateId) {
                endpoint = `/template/edit?templateId=${templateId}`;
            }
            const response = await requestHandler(endpoint, values, "post");
            toast.success(response?.message || "Data saved successfully");
            // console.log("Form submission successful:", response);
            setSubmitting(false);
        }),
    });

    return (
        <>
            <Navigation profile="Template Management" user01="/images/user01.svg" bell01="/images/bell01.svg" />
            <div className="container mt-3">
                <form onSubmit={formik.handleSubmit}>
                    <DynamicInput
                        label="Title"
                        name="title"
                        type="text"
                        disabled={isViewMode}
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.title}
                    />
                    {templateId && (
                        <DynamicInput
                            label="key"
                            name="key"
                            type="text"
                            disabled
                            value={formik.values.key}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    )}
                    {!isViewMode && (
                          <Button
                            text={`${templateId ? 'Update' : 'Add'} Template`}
                            className={`${styles.btnStyle} mt-3`}
                            type="submit"
                            disabled={formik.isSubmitting}
                            handle={formik.handleSubmit}
                        />
                     )}
                </form>
            </div>
        </>
    );
};

export default Page;
