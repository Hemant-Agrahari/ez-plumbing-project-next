"use client";
import React, { useEffect, useState } from "react";
import "@/components/Templates/ThankYouTemplate/thank-you.css"

import { BlogData } from "@/types/interface";
import Head from "next/head";
import InsuranceLogos from "@/components/FrontendComponents/Home/InsuranceLogos";
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
//     useEffect(() => {
//         if (data.content) {
//             const parser = new DOMParser();
//             const doc = parser.parseFromString(data.content, 'text/html');
//             const headings = [...doc.querySelectorAll('h2, h3')];

//             const toc = headings.map((heading, index) => {
//                 const id = `content${index}`;
//                 heading.id = id; 
//                 return {
//                     id,
//                     text: heading.textContent,
//                     level: heading.tagName.toLowerCase(),
//                 };
//             });

//             setTocItems(toc);
//              setContent(doc.body.innerHTML);
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [data]);

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
            <div className="thank_you" dangerouslySetInnerHTML={{ __html: content }}></div>
            <InsuranceLogos />

        </>
    );
};

export default ThankYouTemplate;
