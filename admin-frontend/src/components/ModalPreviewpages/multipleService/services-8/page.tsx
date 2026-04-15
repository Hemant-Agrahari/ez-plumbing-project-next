"use client";
import React from "react";
import "./service.css";
import "@/style/templates-global.css";
import Image from "next/image";
import Link from "next/link";
import AvailableService from "@/components/FrontendComponents/Home/AvailableService";
import Testimonials from "@/components/FrontendComponents/Home/Testimonials";
import Slider from "react-slick";

const ServicePreview = ({ data }: any) => {
  const sliderblogsSettings = {
    infinite: false,
    dots: false,
    arrows: false,
    slidesToShow: 2,
    slidesToScroll: 4,
    margin: 30,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3.1,
          slidesToScroll: 3,
          dots: true,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },
      {
        breakpoint: 991,
        settings: {
          dots: true,
          autoplay: true,
          autoplaySpeed: 2000,
          slidesToShow: 2.2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          dots: true,
          autoplay: true,
          autoplaySpeed: 2000,
          slidesToShow: 1.6,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          dots: true,
          autoplay: true,
          autoplaySpeed: 2000,
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: true,
          autoplay: true,
          autoplaySpeed: 2000,
          slidesToShow: 1.2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 0,
        settings: {
          dots: true,
          autoplay: true,
          autoplaySpeed: 2000,
          slidesToShow: 1.1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  // console.log("data?.content", data);
  return (
    <div className="services">
      <section className="max-container breadcrum-section w-100">
        <header className="breadcrumbs">
          <div className="container">
            <div className="breadcrumb-col">
              <div className="home-link">
                <Link href="/" className="home">
                  Home
                </Link>
                <Image
                  className="chevron-right-double-icon ms-2"
                  loading="lazy"
                  alt=""
                  src="/templates/chevronrightdouble.svg"
                  width={24}
                  height={24}
                />
              </div>
              <div className="page-title">
                <div className="slab-leak-repair ms-1">{data?.breadcrumbTitle}</div>
              </div>
            </div>
          </div>
        </header>
      </section>
      <section className="banner max-container" style={{
        backgroundImage: `linear-gradient(113.98deg, rgba(255, 255, 255, 0.82) 65.41%, rgba(49, 160, 91, 0.82) 105.28%), url(${typeof data?.bannerImage === 'object' && data.bannerImage instanceof File ? URL.createObjectURL(data.bannerImage) : `${process.env.NEXT_PUBLIC_BACKEND_URL}${data?.bannerImage}`})`,
      }}>
        <div className="container">
          <div className="hero-content">
            <div className="immediate-slab-leak-detection">
              <h2 className="immediate-slab-leak">
                {data?.bannerTitle}
              </h2>
              <h2 className="affordable-slab-leak">
                {data?.bannerSubTitle}

              </h2>
              <div className="slab-leak-detection" dangerouslySetInnerHTML={{ __html: data?.bannerContent }}>
              </div>
            </div>
            <div className="contact-us-now">
              <div className="content">
                <b className="heading-2">CONTACT US NOW!</b>
                <div className="input">
                  <div className="name">
                    <input
                      className="text-field"
                      placeholder="Name"
                      type="text"
                    />
                  </div>
                  <div className="email">
                    <input
                      className="text-field1"
                      placeholder="Email"
                      type="text"
                    />
                  </div>
                  <div className="phone-number">
                    <input
                      className="text-field2"
                      placeholder="Phone Number"
                      type="text"
                    />
                  </div>
                  <textarea
                    className="message"
                    placeholder="Message"
                    rows={6}
                    cols={18}
                  ></textarea>
                </div>
              </div>
              <div className="buttoun">
                <b className="privacy-we-never">
                  100% PRIVACY -WE NEVER SPAM YOU
                </b>
                <button className="button">
                  <div className="send">SEND</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="max-container w-100">
        <section className="container service-boxe-col">
          <div className="avoid-inefficient-leak-get-sla px-0">
            <h2 className="avoid-inefficient-leak-container">
              <p className="avoid-inefficient-leak" dangerouslySetInnerHTML={{ __html: data?.section2?.title }}>

              </p>
            </h2>
            <div className="service-boxes">
              {data?.section2 &&
                <Slider {...sliderblogsSettings} className="w-100">
                  {data?.section2?.card && data.section2.card.map((card: any, index: number) => (
                    <div className="slab-leak-detection-box" key={index}>
                      <div className="slab-leak-detection-box-child"></div>
                      <b className="slab-leak-detection1" dangerouslySetInnerHTML={{ __html: card.cardTitle }} />
                      {card.cardSubTitle &&
                        <b className="card-sub-title" dangerouslySetInnerHTML={{ __html: card.cardSubTitle }}></b>
                      }
                      <div className="details w-100" dangerouslySetInnerHTML={{ __html: card.cardText }}>
                        {/* {card.cardText} */}
                      </div>
                    </div>
                  ))}
                </Slider>
              }
            </div>

          </div>
        </section>
      </div>
      <section className="max-container w-100">
        <div className="container">
          {data.content && data?.content.map((item: any, index: any) => (
            <div className="ez-plumbing-guarantees-repair px-0 service-8" key={index}>
              <h2 className="ez-plumbing-guarantees-container">
                <p className="ez-plumbing-guarantees"></p>
                <p className="best-slab-leak" dangerouslySetInnerHTML={{ __html: item.contentTitle }}>

                </p>
              </h2>
              <div className="image-container">
                {item.contentImage &&
                  <img
                    className="installing-ceramic-floor-tiles-icon"
                    loading="lazy"
                    alt=""
                    src={
                      item.contentImage instanceof File
                        ? URL.createObjectURL(item.contentImage)
                        : `${process.env.NEXT_PUBLIC_BACKEND_URL}${item.contentImage}`
                    }
                    width={567}
                    height={719}
                  />
                }
                <div className="info-columns" dangerouslySetInnerHTML={{ __html: item.contentText }}>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <AvailableService data={data} />
      <Testimonials data={data} />
      <section className="w-100 max-container">
        <div className="container">
          {data.content2 && data.content2.map((item: any, index: any) => (
            <div className="count-on-ez-plumbing-usa-for-s px-0 service-8s" key={index}>
              {index % 2 === 0 ? (
                <>
                  <div className="trust-content">
                    <h3 className="count-on-ez" dangerouslySetInnerHTML={{ __html: item.contentTitle }} />
                    <div className="ez-plumbing-san" dangerouslySetInnerHTML={{ __html: item.contentText }} />
                  </div>
                  <div className="gallery">
                    <div className="image-2">
                      <div className="image-grid">
                        {item.contentImage && (
                          <img
                            className="installing-ceramic-floor-tiles-icon"
                            loading="lazy"
                            alt=""
                            src={
                              item.contentImage instanceof File
                                ? URL.createObjectURL(item.contentImage)
                                : `${process.env.NEXT_PUBLIC_BACKEND_URL}${item.contentImage}`
                            }
                            width={576}
                            height={719}
                          />
                        )}
                        {/* <div className="info-columns"> </div> */}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="gallery">
                    <div className="image-2">
                      <div className="image-grid">
                        {item.contentImage && (
                          <img
                            className="installing-ceramic-floor-tiles-icon"
                            loading="lazy"
                            alt=""
                            src={
                              item.contentImage instanceof File
                                ? URL.createObjectURL(item.contentImage)
                                : `${process.env.NEXT_PUBLIC_BACKEND_URL}${item.contentImage}`
                            }
                            width={576}
                            height={719}
                          />
                        )}
                        {/* <div className="info-columns"> </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="trust-content">
                    <h3 className="count-on-ez" dangerouslySetInnerHTML={{ __html: item.contentTitle }} />
                    <div className="ez-plumbing-san" dangerouslySetInnerHTML={{ __html: item.contentText }} />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
      <section className="max-container w-100">
        <div className="container">
          <div className="area-we-served px-0">
            {data?.locationContent &&
              data.locationContent.map((contentItem: any, index: any) => (
                <div key={index} className="w-100">
                  {" "}
                  {/* Added key for contentItem */}
                  <h2 className="area-we-served2 mb-5 text-center">
                    {contentItem.pageSubHeading}
                  </h2>
                  {contentItem.location && (
                    <div className="location-grid">
                      <div className="location-grid-col">
                        {contentItem.location.map(
                          (locationItem: any, locIndex: any) => (
                            <div className="location-grid-item" key={locIndex}>
                              <img
                                loading="lazy"
                                alt=""
                                src="/templates/frame-1686564363.svg"
                                width={24}
                                height={24}
                              />
                              {/* <div className="location-name"> */}
                              <Link href={`${locationItem.links}`} className="location-name">
                                {locationItem.items}
                              </Link>
                              {/* </div> */}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                  {contentItem.browseBtnText && (
                    <div className="button-container text-center mt-md-5 mt-sm-4 mt-3">
                      <button className="button1 text-white">
                        <div className="browse-all-locations fw-semibold text-white">
                          {contentItem.browseBtnText}
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </section>
      {/* Faq Section Start From Here  */}
      <section className="faq-section max-container">
        <div className="container">
          <h2 className="com-title">FAQs</h2>

          <div className="accordion" id="accordionFaq">
            {data?.faq && (typeof data.faq === 'string' ? JSON.parse(data.faq) : data.faq).map((item: any, index: any) => (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button ${index === 0 ? '' : 'collapsed'}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${index}`}
                    aria-expanded={index === 0 ? 'true' : 'false'}
                    aria-controls={`collapse${index}`}
                  >
                    {item.question}
                  </button>
                </h2>
                <div
                  id={`collapse${index}`}
                  className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                  data-bs-parent="#accordionFaq"
                >
                  <div className="accordion-body">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
      {/* Faq Section End Here  */}
      <section className="call-experts-now">
        <h2 className="dont-let-plumbing">
          Don’t Let Plumbing Issues Interrupt Your Comfort & Budget
        </h2>
        <div className="call-info">
          <h1 className="call-experts-now1">Call Experts Now</h1>
          <div className="number-container">
            <Link href="tel:+7603899117">
              <Image
                className="span-icon"
                loading="lazy"
                alt=""
                src="/templates/span@2x.png"
                width={44}
                height={44}
              />

              <b className="space">(760) 389 9117</b>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ServicePreview;
