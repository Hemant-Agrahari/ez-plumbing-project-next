/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import "@/styles/templates-global.css";
import "@/app/(listing)/blog/blog-listing.css";
import { Image } from "react-bootstrap";
import SearchBar from "@/components/Search/SearchBar";
import { requestHandler } from "@/helper/requestHandler";
import Link from "next/link";
const ClientComponent = ({ params }: { params: { category: string } }) => {
  const [blogList, setBlogList] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [search, setSearch] = useState<any>("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<any>([]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchBlogList = async () => {
      try {
        const response = await requestHandler(
          `/getCategoriesBlog/?pageIndex=${page}&pageSize=10&search=${search}&slug=${params.category}`,
          {},
          "get",
          { next: { revalidate: 86400 } }
        );
        if (response.status === 200) {
          setBlogList(response.data);
          // console.log(response.data, "abcdef")
          setPagination(response.pagination);
        }
      } catch (error) {
        console.error("Error fetching blog list:", error);
      }
    };
    fetchBlogList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);
  useEffect(() => {
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
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="blog-listing-page">
        <div className="bg-gray w-100">
        <div className="container">
        <header className="breadcrumbs">
              <div className="home-chevron">
                <Link href={"/"} className="home">Home</Link>
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
            <div className="btn-groups">
              <button
                className="most-rcnt-btn button"
                onClick={() => {}}
              >
                Most Recent
              </button>
              <button
                className="most-pplr-btn button"
                onClick={() => {}}
              >
                Most Popular
              </button>
            </div>
            <section className="blog-posts">
              <div className="blog-post">
                <div className="frame-parent">
                  {blogList.map((blog: any) => {
                    const bannerImageUrl = blog.bannerImage
                      ? blog.bannerImage.startsWith("http")
                        ? blog.bannerImage // If it's a full URL, use it as-is
                        : `${process.env.NEXT_PUBLIC_BACKEND_URL}${blog.bannerImage}` // If it's a relative URL, prepend the backend URL
                      : ""; // If no bannerImage, set it to empty string

                      const sanitizedContent = blog?.bannerContent?.replace(
                        /Introduction/i,
                        ""
                      );

                    return (
                      <div key={blog.id} className="image-placeholder-parent">
                        <img
                          className="image-placeholder-icon"
                          loading="lazy"
                          alt={blog.title}
                          src={bannerImageUrl} // Fallback image
                        />
                        <div className="frame-group">
                          <div className="heading-parent">
                            <Link href={`/${blog.slug}`}>
                              <h3 className="heading">{blog.bannerTitle}</h3>
                            </Link>
                            <p
                              className="dec mb-2"
                              dangerouslySetInnerHTML={{
                                __html: sanitizedContent,
                              }}
                            ></p>
                            <div className="text">{blog.excerpt}</div>
                          </div>
                          <div className="post-date-wrapper">
                            <div className="view-post-parent">
                              <a href={`/${blog.slug}`}>
                                <a className="view-post">View Post</a>
                              </a>
                              <img
                                className="frame-child"
                                loading="lazy"
                                alt=""
                                src="/templates/line-2.svg"
                              />
                            </div>
                            <div>
                                <p className="com-para">
                                  Publish Date :{" "}
                                  <span>
                                    {new Date(blog.createdAt)
                                      .toLocaleDateString("en-GB")
                                      .replace(/\//g, "-")}
                                  </span>
                                </p>
                                <p className="com-para mt-2">
                                  Views : <span>{blog.view || ""}</span>
                                </p>
                              </div>
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
              <nav aria-label="Page navigation example">
                <ul className="respo-pagination pagination">
                  {pagination.currentPage > 1 && (
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => setPage(pagination.currentPage - 1)}
                      >
                        Previous
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
                        Next
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

export default ClientComponent;
