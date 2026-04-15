"use client"
import React, { useEffect, useState } from "react";
import "@/styles/templates-global.css";
import "./blog-listing.css";
import Link from "next/link";
import { Image } from "react-bootstrap";
 import { requestHandler } from "@/helper/requestHandler";
import { Blog } from "@/types/interface";
import Category from "@/components/Blog/Category";
import SearchBar from "@/components/FrontendComponents/Search/SearchBar";
import { toast } from "react-toastify";

const Page = () => {
  const [blogList, setBlogList] = useState<Blog[]>([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchBlogList = async () => {
      try {
        const response = await requestHandler('/getBlogList/?pageIndex=1&pageSize=10&search=&type=blog', {}, 'get');
        if (response.status === 200) {
          toast.success(response.message || "Process Successfully");
          setBlogList(response.data);
          // console.log(response.data); // Log for debugging
        }
      } catch (error) {
        console.error('Error fetching blog list:', error);
      }
    };

    fetchBlogList();
  }, []);

  return (

    <div className="blog-listing-page">
      <div className="bg-gray w-100">
        <div className="container">
          <header className="breadcrumbs">
            <div className="home-chevron">
              <a className="home">Home</a>
              <Image
                className="chevron-right-double-icon"
                loading="lazy"
                alt=""
                src="/templates/chevronrightdouble.svg"
              />
            </div>
            <div className="slab-leak">
              <div className="slab-leak-repair">Blog</div>
            </div>
          </header>
        </div>
      </div>
      <div className="container">
        <main className="blog-header px-0">
          <h2 className="blogs">Blogs</h2>
          <section className="blog-posts">
            <div className="blog-post">
              <div className="frame-parent">
                {blogList.map((blog) => (
                  <div key={blog.id} className="image-placeholder-parent">
                    <Image
                      className="image-placeholder-icon"
                      loading="lazy"
                      alt={blog.title}
                      src={blog.imageUrl || "/templates/rectangle-34624975@2x.png"} // Fallback image
                    />
                    <div className="frame-group">
                      <div className="heading-parent">
                        <b className="heading">{blog.title}</b>
                        <div className="text">
                          {blog.excerpt}
                        </div>
                      </div>
                      <div className="view-post-parent">
                        <a href={`/${blog.slug}`}>
                          <a className="view-post">View Post</a>
                        </a>
                        <Image
                          className="frame-child"
                          loading="lazy"
                          alt=""
                          src="/templates/line-2.svg"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="blog-search">
              <SearchBar />
              <div className="right-side-menu">
               <Category/>
              </div>
            </div>
          </section>
        </main>
      </div>

    </div>


  );
};

export default Page;
