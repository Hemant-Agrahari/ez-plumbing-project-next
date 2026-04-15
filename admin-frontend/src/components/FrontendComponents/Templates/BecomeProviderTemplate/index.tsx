"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { BlogData } from "@/types/interface";
import "@/styles/templates-global.css"
import "./become-provider.css"
import InsuranceLogos from "@/components/FrontendComponents/Home/InsuranceLogos";
import BecomeProviderForm from '@/components/FrontendComponents/FormComponent/BecomePorivder/BecomeForm';

interface MainTemplateProps {
    data: BlogData;
}

interface TocItem {
    id: string;
    text: string | null;
    level: string;
}

const ScholarshipTemplate: React.FC<MainTemplateProps> = ({ data }) => {
    // console.log(data, "asdsad");

    return (
        <>
            <Head>
                <title>{data?.seoTitle || "Default Title"}</title>
                <meta
                    name="description"
                    content={data?.seoDescription || "Default description"}
                />
            </Head>

            <div className="become-provider" dangerouslySetInnerHTML={{ __html: data.content }}>
            </div>
            <div className="become-provider">
                <BecomeProviderForm />
                <InsuranceLogos />
            </div>

            <InsuranceLogos />

        </>
    );
};

export default ScholarshipTemplate;
