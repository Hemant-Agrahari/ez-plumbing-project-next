"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { BlogData } from "@/types/interface";
import "@/styles/templates-global.css"
import "./scholarship.css"
import InsuranceLogos from "@/components/FrontendComponents/Home/InsuranceLogos";
interface MainTemplateProps {
    data: BlogData;
}

interface TocItem {
    id: string;
    text: string | null;
    level: string;
}

const ScholarshipTemplate: React.FC<MainTemplateProps> = ({ data }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showContent, setShowContent] = useState(true);
    const [content, setContent] = useState<string>("");
    const [tocItems, setTocItems] = useState<TocItem[]>([]);
    useEffect(() => {
        window.scrollTo(0, 0);

        if (data) {
            setIsLoading(false);
        }

        function handleResize() {
            if (window.innerWidth > 768) {
                setIsMobile(false);
                setShowContent(true);
            } else {
                setShowContent(false);
                setIsMobile(true);
            }
        }

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <>
            <Head>
                <title>{data?.seoTitle || "Default Title"}</title>
                <meta
                    name="description"
                    content={data?.seoDescription || "Default description"}
                />
            </Head>
            <>
                <div className="scholarship-programe" dangerouslySetInnerHTML={{ __html: data.content }}>
                </div>
                <InsuranceLogos />
            </>

        </>
    );
};

export default ScholarshipTemplate;
