"use client";
import React, { useEffect, useState } from "react";
import "@/styles/templates-global.css";
import "@/app/(listing)/blog/blog-listing.css";
import { Image } from "react-bootstrap";
import SearchBar from "@/components/Search/SearchBar";
import { requestHandler } from "@/helper/requestHandler";
import Link from "next/link";
const BlogShowAuthor = () => {
  const [blogList, setBlogList] = useState<any>([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState<any>("");
  const [pagination, setPagination] = useState<any>([]);
  const [page, setPage] = useState(1);

  const fetchCategories = async () => {
    try {
      const response = await requestHandler(
        `/getCategories?type=categories-management`,
        {},
        "get",
        { next: { revalidate: 86400 } }
      );
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching blog list:", error);
    }
  };
  useEffect(() => {
    // fetchBlogList();
    fetchCategories();
  }, []);
  useEffect(() => {
    const fetchBlogList = async () => {
      try {
        const response = await requestHandler(
          `/blog/list/?pageIndex=${page}&pageSize=10&search=${search}`,
          {},
          "get"
        );

        // console.log("response", response); // Log for debugging
        if (response.status == 200) {
          setBlogList(response.data);
          // setBlogList(data.data);
          // console.log("blog data", response.data);
          setPagination(response.pagination);
        }
      } catch (error) {
        console.error("Error fetching blog list:", error);
      }
    };

    fetchBlogList();
  }, [page, search]);

  return (
    <>
      <div className="blog-listing-page">
        <div className="bg-gray w-100"></div>
        <div className="container">
          <main className="blog-header px-0">
            <h2 className="blogs">Blogs</h2>
            <section className="blog-posts">
              <div className="blog-post">
                <div className="frame-parent">
                  {blogList.map((blog: any) => {
                    // console.log("blog.titel",blog.title.rendered)
                    const bannerImageUrl = blog.bannerImage
                      ? blog.bannerImage.startsWith("http")
                        ? blog.bannerImage // If it's a full URL, use it as-is
                        : `${process.env.NEXT_PUBLIC_BACKEND_URL}${blog.bannerImage}` // If it's a relative URL, prepend the backend URL
                      : ""; // If no bannerImage, set it to empty string

                    return (
                      <div key={blog.id} className="image-placeholder-parent">
                        <Image
                          className="image-placeholder-icon"
                          loading="lazy"
                          alt={blog.title}
                          src={bannerImageUrl} // Fallback image
                        />
                        <div className="frame-group">
                          <div className="heading-parent">
                            <h3 className="heading">{blog.bannerTitle}</h3>
                            {/* <div className="text">{blog.excerpt}</div> */}
                          </div>
                          <div className="view-post-parent">
                            <Link href={`/${blog.slug}`}>
                              {/* <a href={`/webblog/fix-your-air-conditioner-in-24-hours-or-less`}> */}
                              <p className="view-post">View Post</p>
                            </Link>
                            <Image
                              className="frame-child"
                              loading="lazy"
                              alt=""
                              src="/templates/line-2.svg"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="blog-search">
                <SearchBar onSearchChange={setSearch} />
                <div className="right-side-menu">
                  <div className="text-group">
                    <h3 className="text83">Category</h3>
                    <div className="frame-child44" />
                    <div className="categorys-col">
                      <div className="frame-parent33">
                        {categories &&
                          categories.map((category: any) => (
                            <Link
                              key={category.slug}
                              href={`/category/${category.slug}`}
                              className="text-wrapper"
                            >
                              <div className="text84">{category.title}</div>
                            </Link>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {pagination && pagination.totalItems > 0 && pagination ? (
              <nav
                aria-label="Page navigation example"
                className="pagination-wrapper"
              >
                <ul className="respo-pagination pagination">
                  {pagination.currentPage > 1 && (
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => setPage(pagination.currentPage - 1)}
                      >
                        «
                      </button>
                    </li>
                  )}

                  {Array.from(
                    { length: Math.min(3, pagination.totalPages) },
                    (_, index) => {
                      const currentPage = page + index - 1;
                      const isCurrentPage = currentPage === page;
                      if (
                        currentPage > 0 &&
                        currentPage <= pagination.totalPages
                      ) {
                        return (
                          <li
                            key={currentPage}
                            className={`page-item ${
                              isCurrentPage ? "active" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => setPage(currentPage)}
                            >
                              {currentPage}
                            </button>
                          </li>
                        );
                      }
                      return null;
                    }
                  )}
                  {pagination.currentPage < pagination.totalPages && (
                    <li className="page-item">
                      <button
                        // disabled={pagination.currentPage < pagination.totalPages}
                        onClick={() => setPage(page + 1)}
                        className="page-link"
                      >
                        »
                      </button>
                    </li>
                  )}
                </ul>
              </nav>
            ) : null}
          </main>
        </div>
      </div>
    </>
  );
};
export default BlogShowAuthor;
