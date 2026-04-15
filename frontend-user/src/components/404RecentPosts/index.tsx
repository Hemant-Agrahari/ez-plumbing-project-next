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
      <div className="row">
        {recentBlogs &&
          recentBlogs.slice(0, 3).map((post: any, index: number) => (
            <div key={index} className="col-lg-4 col-md-4 col-12 p-3 p-sm-4">
              <div className="blog-card mb-2 mb-lg-0 w-100 h-100">
                <div className="blog-card-img">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${post.bannerImage}`}
                    alt={post.breadcrumbTitle}
                    width="424"
                    height="243"
                    className="img-fluid w-100 h-100"
                  />
                </div>
                <div className="blog-contant">
                  <p className="blog-contant-title mb-0 text-start">
                    <Link href={post.slug}>{post.bannerTitle}</Link>
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Recentposts;
