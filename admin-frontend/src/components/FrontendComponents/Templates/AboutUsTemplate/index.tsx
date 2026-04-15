"use client";
import React, { useEffect, useState } from "react";
import { BlogData } from "@/types/interface";
import Head from "next/head";
import "@/components/Templates/AboutUsTemplate/about-us.css";
interface BlogTemplateProps {
    data: BlogData;
}
interface TocItem {
    id: string;
    text: string | null;
    level: string;
}

const AboutUsTemplate: React.FC<BlogTemplateProps> = ({ data }:any) => {
    // console.log("data", data);
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

    const toggleContent = () => {
        if (isMobile) {
            setShowContent(!showContent);
        }
    };
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
            {/* <div className="about-us" dangerouslySetInnerHTML={{ __html: content }}></div> */}

        </>
    );
};

export default AboutUsTemplate;
