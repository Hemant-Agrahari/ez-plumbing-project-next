"use client";
import { requestHandler } from "@/helper/requestHandler";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Recentposts = () => {
  const [recentBlogs, setRecentBlogs] = useState<any>([]);

  const fetchRecentBlogs = async () => {
    try {
      const result = await requestHandler("/getRecentBlog", {}, "get");
      // console.log("asdsad", result.data);
      setRecentBlogs(result.data);
    } catch (error) {
      console.error("Error fetching recent blogs:", error);
    }
  };
  useEffect(() => {
    fetchRecentBlogs();
  }, []);
  return (
    <>
      {recentBlogs &&
        recentBlogs.map((post: any, index: number) => {
          const bannerImageUrl = post.bannerImage
            ? post.bannerImage.startsWith("http")
              ? post.bannerImage // If it's a full URL, use it as-is
              : `${process.env.NEXT_PUBLIC_BACKEND_URL}${post.bannerImage}` // If it's a relative URL, prepend the backend URL
            : ""; // If no bannerImage, set it to empty string
          return (
            <Link
              key={index}
              href={`/${post.slug}`}
              className="rectangle-parent2"
            >
              <Image
                className="frame-child46"
                loading="lazy"
                alt={post.breadcrumbTitle}
                src={`${bannerImageUrl}`}
                width={96}
                height={54}
              />
              <div className="heading-wrapper">
                <div className="heading8">{post.bannerTitle}</div>
              </div>
            </Link>
          );
        })}{" "}
    </>
  );
};

export default Recentposts;
