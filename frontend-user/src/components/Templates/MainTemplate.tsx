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
