"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { BlogData } from "@/types/interface";
 import ReactDOM from "react-dom";
import ContactUsNow from "../FormComponent/ContactUsNow-Form/ContactUsNow";
import { createRoot } from 'react-dom/client';

interface MainTemplateProps {
  data: BlogData;
}

interface TocItem {
  id: string;
  text: string | null;
  level: string;
}

const MainTemplate: React.FC<MainTemplateProps> = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(true);
  const [content, setContent] = useState<string>("");
  const [tocItems, setTocItems] = useState<TocItem[]>([]);

//   useEffect(() => {
//     if (data.content) {
//       const parser = new DOMParser();
//       const doc = parser.parseFromString(data.content, "text/html");
//       const headings = [...doc.querySelectorAll("h2, h3")];

//       const toc = headings.map((heading, index) => {
//         const id = `content${index}`;
//         heading.id = id;   
//         return {
//           id,
//           text: heading.textContent,
//           level: heading.tagName.toLowerCase(),
//         };
//       });

//        const bannerFormDiv = doc.getElementById('banner-form');
//       if (bannerFormDiv) {
//         bannerFormDiv.innerHTML = '<div id="form-component-placeholder"></div>'; 
//       }

//       setTocItems(toc);
//       setContent(doc.body.innerHTML);
//     }
//       // eslint-disable-next-line react-hooks/exhaustive-deps
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

  useEffect(() => {
     const placeholder = document.getElementById('form-component-placeholder');
    if (placeholder) {
      const root = createRoot(placeholder);
      root.render(<ContactUsNow />);

    }
  }, [content]);


  return (
    <>
      <Head>
        <title>{data?.seoTitle || "Default Title"}</title>
        <meta
          name="description"
          content={data?.seoDescription || "Default description"}
        />
      </Head>

      <div className="services">
        {content && (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        )}
      </div>
    </>
  );
};

export default MainTemplate;
