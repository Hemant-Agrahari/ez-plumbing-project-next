"use client";
import React, { useEffect, useState } from "react";
import "@/components/Templates/ThankYouTemplate/thank-you.css"

import { BlogData } from "@/types/interface";
import Head from "next/head";
import InsuranceLogos from "@/components/Home/InsuranceLogos";
interface BlogTemplateProps {
    data: BlogData;
}
interface TocItem {
    id: string;
    text: string | null;
    level: string;
}

const ThankYouTemplate: React.FC<BlogTemplateProps> = ({ data }) => {
    // console.log("data", data);
    const [isMobile, setIsMobile] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showContent, setShowContent] = useState(true);
    const [content, setContent] = useState<string>("");
    const [tocItems, setTocItems] = useState<TocItem[]>([]);
   
    // console.log(data?.images?.image);
    return (
        <>
            <Head>
                <title>{data?.seoTitle || "Default Title"}</title>
                <meta
                    name="description"
                    content={data?.seoDescription || "Default description"}
                />
            </Head>
            <div className="thank_you" dangerouslySetInnerHTML={{ __html: content }}></div>
            <InsuranceLogos />

        </>
    );
};

export default ThankYouTemplate;
