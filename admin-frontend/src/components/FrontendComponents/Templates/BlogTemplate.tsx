"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogData } from "@/types/interface";
import Head from "next/head";
import "@/app/(blog)/[blog]/blog-detail.css"
import { createRoot } from "react-dom/client";
import Category from "../Blog/Category";
import RecentPost from "../Blog/RecentPost/RecentPost";
import Tags from "../Blog/Tags";
import Slider from "react-slick";
import RelatedPost from "../Blog/RelatedPost";
import { sliderblogsSettings } from "@/helper/sliderSettings";
interface BlogTemplateProps {
  data: BlogData;
}
interface TocItem {
  id: string;
  text: string | null;
  level: string;
}

const BlogTemplate: React.FC<BlogTemplateProps> = ({ data }: any) => {
  // console.log("data", data);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(true);
  const [content, setContent] = useState<string>("");
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  
  useEffect(() => {
    const Categories = document.getElementById('categories');
    const RecentPosts = document.getElementById('recentposts');
    const Tag = document.getElementById('tags');
    if (Categories) {
      const root = createRoot(Categories);
      root.render(<Category />);

    }
    if (RecentPosts) {
      const root = createRoot(RecentPosts);
      root.render(<RecentPost />);

    }
    if (Tag) {
      const root = createRoot(Tag);
      root.render(<Tags />);

    }
  }, [content]);

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
      {/* {data?.blog.metatag && <Head>{parse(data?.blog.metatag)}</Head>} */}
      <div className="blog-detail-page" dangerouslySetInnerHTML={{ __html: data.content }}></div>
      <div className="blog-detail-page" >

      <div className="container latest-blog-container">
        <div className="related-posts-parent px-0">
          <h1 className="related-posts">Related Posts</h1>
          <div className="p-0 container">
            <Slider {...sliderblogsSettings} className="latest-blog-slider row">
              <RelatedPost
                imageSrc="/templates/rectangle-346249751@2x.png"
                altText=""
                title="Why Do Slab Leaks Occur Mostly In Older Homes?"
                linkHref="#"
              />
              <RelatedPost
                imageSrc="/templates/rectangle-346249751@2x.png"
                altText=""
                title="Identifying & Fixing The Source Of That Pesky Drip - A Guide To Slab Leak Detection"
                linkHref="#"
              />
              <RelatedPost
                imageSrc="/templates/rectangle-346249751@2x.png"
                altText=""
                title="Why Do Slab Leaks Occur Mostly In Older Homes?"
                linkHref="#"
              />
              <RelatedPost
                imageSrc="/templates/rectangle-346249751@2x.png"
                altText=""
                title="Why Do Slab Leaks Occur Mostly In Older Homes?"
                linkHref="#"
              />
            </Slider>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default BlogTemplate;


