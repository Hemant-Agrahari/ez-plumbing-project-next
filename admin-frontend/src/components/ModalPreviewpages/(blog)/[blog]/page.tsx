"use client";
import React, { useEffect, useState } from "react";
import "@/style/templates-global.css";
import "./blog-detail.css";
import Link from "next/link";
import Slider from "react-slick";
import { Image } from "react-bootstrap";
import RelatedPost from "@/components/FrontendComponents/Blog/RelatedPost";
import { requestHandler } from "@/helper/requestHandler";
import { sliderblogsSettings3 } from "@/helper/sliderSettings";

const BlogPreview = ({ data }: any) => {
  const [recentBlogs, setRecentBlogs] = useState<any>([]);

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const result = await requestHandler("/getRecentBlog", {}, "get"); // Use your requestHandler
        // console.log("asdsad", result.data); // Log the response
        setRecentBlogs(result.data); // Store the result in state if needed
      } catch (error) {
        console.error("Error fetching recent blogs:", error);
      }
    };
    fetchRecentBlogs();
  }, []);
  return (
    <>
      {/* <pre>{JSON.stringify(recentBlogs, null, 2)}</pre> */}
      <div className="blog-detail-page">
        <section className="max-container breadcrum-section w-100">
          <div className="breadcrumbs4 px-0">
            <div className="container">
              <div className="breadcrumbs5">
                <div className="home-group">
                  <Link href="/" className="home7">
                    Home
                  </Link>
                  <Image
                    className="chevron-right-double-icon3"
                    loading="lazy"
                    alt=""
                    src="/templates/chevronrightdouble.svg"
                    width={24}
                    height={24}
                  />
                  <div className="latest-news">Latest News &amp; Articles</div>
                  <Image
                    className="chevron-right-double-icon4"
                    alt=""
                    src="/templates/chevronrightdouble.svg"
                    width={24}
                    height={24}
                  />
                </div>
                <div className="why-do-slab-leaks-occur-mostly-wrapper">
                  <div className="why-do-slab">{data.breadcrumbTitle} </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-100 max-container">
          <main className="container">
            <div className="frame-main px-0">
              <section className="why-do-slab-leaks-occur-mostly-parent">
                <h1 className="why-do-slab1">{data?.bannerTitle} </h1>
                <Image
                  className="img-why-do-slab-leaks-occur-mo"
                  loading="lazy"
                  alt=""
                  src={
                    data?.bannerImage?.includes("blob")
                      ? data?.bannerImage
                      : `${process.env.NEXT_PUBLIC_BACKEND_URL}${data?.bannerImage}`
                  }
                  width={708}
                  height={333}
                />
                <div
                  className="text-parent"
                  dangerouslySetInnerHTML={{ __html: data.bannerContent }}
                ></div>
                <div className="frame-parent30">
                  {data.content &&
                    data?.content.map((item: any, index: any) => (
                      <div key={index} className="signs-of-a-slab-leak-parent">
                        <h2 className="signs-of-a">{item?.title}</h2>
                        <div
                          className="text50"
                          dangerouslySetInnerHTML={{ __html: item?.content }}
                        />
                      </div>
                    ))}
                </div>
              </section>
              <div className="frame-parent32">
                <div className="text-group">
                  <h3 className="text83">Category</h3>
                  <div className="frame-child44" />
                  <div className="categorys-col">
                    <div className="frame-parent33">
                      <Link
                        href="/category/air-conditioning/"
                        className="text-wrapper"
                      >
                        <div className="text84">Air Conditioning</div>
                      </Link>
                      <Link
                        href="/category/drain-service/"
                        className="text-wrapper"
                      >
                        <div className="text84">Drain Service</div>
                      </Link>
                      <Link
                        href="/category/home-maintenance/"
                        className="text-wrapper"
                      >
                        <div className="text84">Home Maintenance</div>
                      </Link>
                      <Link
                        href="/category/plumbing-services/"
                        className="text-wrapper"
                      >
                        <div className="text84">Plumbing Services</div>
                      </Link>
                      <Link
                        href="/category/slab-leak/"
                        className="text-wrapper"
                      >
                        <div className="text84">Slab Leak</div>
                      </Link>
                      <Link
                        href="/category/water-damage/"
                        className="text-wrapper"
                      >
                        <div className="text84">Water Damage</div>
                      </Link>
                      <Link
                        href="/category/water-heater/"
                        className="text-wrapper"
                      >
                        <div className="text84">Water Heater</div>
                      </Link>
                      <Link
                        href="/category/water-leak/"
                        className="text-wrapper"
                      >
                        <div className="text84">Water Leak</div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="text-parent1">
                  <h3 className="text92">Recent Posts</h3>
                  <div className="frame-child45" />
                  {/* <div className="recent-posts">
                    {recentBlogs.rows &&
                      recentBlogs.rows.map((post: any, index: number) => (
                        <Link
                          key={index}
                          href={`/${post.slug}`}
                          className="rectangle-parent2"
                        >
                          <Image
                            className="frame-child46"
                            loading="lazy"
                            alt={post.breadcrumbTitle}
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${post.bannerImage}`}
                            width={96}
                            height={54}
                          />
                          <div className="heading-wrapper">
                            <div className="heading8">{post.bannerTitle}</div>
                          </div>
                        </Link>
                      ))}
                  </div> */}
                </div>
                {/* {data?.tags.length > 0 && data?.tags[0] !== '' && */}
                <div className="text-parent2">
                  <h3 className="text93">Tags</h3>
                  <div className="frame-child54" />
                  <div className="frame-parent34">
                    {/* {data?.tags.map((tag: any, index: any) => (
                        <div className="frame-parent35" key={index}>
                          <>
                            <div className="rectangle-wrapper">
                              <div className="frame-child55" />
                            </div>
                              <Link className="heading14" href={`${tag.slug}`}>
                              {tag.title}
                              </Link>
                          </>
                        </div>
                      ))} */}
                  </div>
                </div>
                {/* } */}
              </div>
            </div>
          </main>
        </section>
        <section className="w-100 max-container">
          <div className="container">
            <div className="blog-detail-page-inner px-0">
              <div className="frame-parent37">
                <Image
                  className="group-icon"
                  loading="lazy"
                  alt=""
                  src="/templates/group-1000008898.svg"
                  width={120}
                  height={120}
                />
                <div className="frame-parent38">
                  <div className="frame-parent39">
                    <div className="frame-wrapper">
                      <div className="text-parent3">
                        <div className="text94">Angela Louise</div>
                        <Image
                          className="icon-email"
                          alt=""
                          src="/templates/icon-email.svg"
                          width={44}
                          height={44}
                        />
                      </div>
                    </div>
                    <div className="text95">Marketing Manager</div>
                  </div>
                  <div className="about3">
                    <div className="text96">About</div>
                    <div className="text97">
                      Angela is a marketing manager at EZ Plumbing USA. She has
                      a great interest in educating readers about various
                      leakages that can happen in their home or offices through
                      her articles. With extensive knowledge of water leak and
                      slab leak detection techniques as well as HVAC systems,
                      Angela wants to make readers aware about the warning signs
                      indicating leakage and predictive AC and Heater
                      maintenance and also how to fix them to refrain from
                      dangerous and costly consequences.
                    </div>
                    <div className="text98">
                      Read articles to get more valuable information about
                      detection and damages of water and slab leak repair,
                      techniques to fix clogging, and installation and
                      maintenance of AC &amp; Appliance in San Diego.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-100 max-container">
          <div className="container latest-blog-container">
            <div className="related-posts-parent px-0">
              <h1 className="related-posts">Related Posts</h1>
              <div className="p-0 container">
                <Slider
                  {...sliderblogsSettings3}
                  className="latest-blog-slider row"
                >
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
        </section>
      </div>
    </>
  );
};

export default BlogPreview;
