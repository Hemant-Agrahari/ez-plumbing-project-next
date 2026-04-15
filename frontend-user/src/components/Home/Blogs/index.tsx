"use client"
import BlogCard from "@/components/Blog/BlogCard";
import { requestHandler } from "@/helper/requestHandler";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";

interface BlogItem {
  bannerTitle: string;
  bannerContent: string;
  slug: string;
  // Add other properties if needed
}

const Blogs: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [blogList, setBlogList] = useState<BlogItem[]>([]);

  // console.log("bloglist 0", blogList[0])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const sliderblogsSettings = {
    infinite: false,
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2.2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2.2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1.6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
        },
      },
    ],
  };


  const fetchBlogList = async () => {
    try {
      const response = await requestHandler(`/blog/list/?pageIndex=${1}&pageSize=3&search=${""}`, {}, 'get');
      if (response.status == 200) {
        setBlogList(response.data);
        
      }
    } catch (error) {
      console.error('Error fetching blog list:', error);
    }
  };

  useEffect(() => {
    fetchBlogList();
  }, []);




  return (
    <section className="latest-blogs my-60">
      <div className="container">
        <h2 className="title mb-3 mb-lg-4 text-center">Latest Blogs</h2>
      </div>
      <div className="container latest-blog-container">
        {isMobile ? (
          <Slider {...sliderblogsSettings} className="latest-blog-slider row">

            {
              blogList && blogList.map((val: any, index: any) => {
                const sanitizedContent = val.bannerContent.replace(/Introduction/i, ''); // Remove "Introduction"

                return (
                  <div className="col-lg-4 col-md-4 col-12" key={index}>
                    <div className="blog-card mb-2 mb-lg-0 w-100">
                      <div className="blog-card-img">
                        <img
                          // src="/images/why-do-slab-leaks-occur-mostly-in-older-homes-new.png"
                          src={
                            val.contentImage instanceof File
                              ? URL.createObjectURL(val?.bannerImage)
                              : `${process.env.NEXT_PUBLIC_BACKEND_URL}${val?.bannerImage}`
                          }
                          alt={"altText"}
                          width="424"
                          height="243"
                          className="img-fluid w-100 h-100"
                        />
                      </div>
                      <div className="blog-contant">
                        <h2 className="blog-contant-title">
                          <Link href={val.slug}>{val.bannerTitle}</Link>
                        </h2>
                        <p className="dec" dangerouslySetInnerHTML={{ __html: sanitizedContent }}></p>

                        <div className="blog-view-post">
                          <Link
                            className="blog-view-link d-flex align-items-center"
                            href={val.slug}
                          >
                            View Post
                            <img
                              src="/images/next-arrow.png"
                              alt="next-arrow"
                              width="33"
                              height="8"
                              className="ms-2"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }

          
          </Slider>
        ) : (
          <div className="latest-blog-slider row">
            {/* <BlogCard
              imageSrc="/images/why-do-slab-leaks-occur-mostly-in-older-homes-new.png"
              altText=""
              title={`${blogList[0]?.bannerTitle}`}
              dec={`${convertContent()}`}
              linkHref={`${blogList[0]?.slug}`}
            /> */}

            {
              blogList && blogList.map((val: any, index: any) => {
                const sanitizedContent = val.bannerContent.replace(/Introduction/i, ''); // Remove "Introduction"

                return (
                  <div className="col-lg-4 col-md-4 col-12" key={index}>
                    <div className="blog-card mb-2 mb-lg-0 w-100">
                      <div className="blog-card-img">
                        <img
                          // src="/images/why-do-slab-leaks-occur-mostly-in-older-homes-new.png"
                          src={
                            val.contentImage instanceof File
                              ? URL.createObjectURL(val?.bannerImage)
                              : `${process.env.NEXT_PUBLIC_BACKEND_URL}${val?.bannerImage}`
                          }
                          alt={"altText"}
                          width="424"
                          height="243"
                          className="img-fluid w-100 h-100"
                        />
                      </div>
                      <div className="blog-contant">
                        <h2 className="blog-contant-title">
                          <Link href={val.slug}>{val.bannerTitle}</Link>
                        </h2>
                        <p className="dec" dangerouslySetInnerHTML={{ __html: sanitizedContent }}></p>

                        <div className="blog-view-post">
                          <Link
                            className="blog-view-link d-flex align-items-center"
                            href={val.slug}
                          >
                            View Post
                            <img
                              src="/images/next-arrow.png"
                              alt="next-arrow"
                              width="33"
                              height="8"
                              className="ms-2"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }




            {/* <BlogCard
              imageSrc="/images/why-do-slab-leaks-occur-mostly-in-older-homes.png"
              altText=""
              title="Why Do Slab Leaks Occur Mostly In Older Homes?"
              dec="Leaks in the water supply or drainage pipes that are found below the concrete foundation"
              linkHref="#"
            />
            <BlogCard
              imageSrc="/images/why-do-slab-leaks-occur-mostly-in-older-homes-new.png"
              altText=""
              title="Why Do Slab Leaks Occur Mostly In Older Homes?"
              dec="Leaks in the water supply or drainage pipes that are found below the concrete foundation"
              linkHref="#"
            /> */}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;
