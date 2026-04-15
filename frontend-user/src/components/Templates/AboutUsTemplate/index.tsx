"use client";
import React, { useEffect, useState } from "react";
import { BlogData } from "@/types/interface";
import Head from "next/head";
import "@/components/Templates/AboutUsTemplate/about-us.css";
import InsuranceLogos from "@/components/Home/InsuranceLogos";
import Image from "next/image";
import Link from "next/link";
import AvailableService from "@/components/Home/AvailableService";
import Testimonials from "@/components/Home/Testimonials";
import Location from "@/components/Home/Location";
interface BlogTemplateProps {
  data: BlogData;
}
interface TocItem {
  id: string;
  text: string | null;
  level: string;
}

const AboutUsTemplate: React.FC<BlogTemplateProps> = ({ data }: any) => {
  // console.log("data", data);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(true);
  const [content, setContent] = useState<string>("");
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const serviceSlider = data.serviceSlider;
  const testimonials = data.testimonials;

  // console.log(data?.images?.image);
  return (
    <>
      <div className="about-us">
        <header className="breadcrumbs p-0">
          <div className="container">
            <div className="breadcrumb-col">
              <div className="home-breadcrumb">
                <Link href="/" className="homes">
                  Home
                </Link>
                <Image
                  // className="chevron-right-double-icon"
                  loading="lazy"
                  alt=""
                  src="/templates/chevronrightdouble.svg"
                  width={24}
                  height={24}
                />
                <span className="about-us1">{data.breadcrumbTitle}</span>
              </div>
              {/* <div className="about-breadcrumb">
                <Link href="#" className="about-us1">
                  {data.breadcrumbTitle}
                </Link>
              </div> */}
            </div>
          </div>
        </header>
        <section className="banner">
          <h1 className="about-us2"> {data.bannerTitle}</h1>
          <div
            className="ez-plumbing-started"
            dangerouslySetInnerHTML={{ __html: data?.bannerContent }}
          ></div>
        </section>
        <div className="container">
          {data.content &&
            data.content.map((item: any, index: number) => (
              <div
                className="our-services-comes-with-guaran px-0 pb-0"
                key={index}
              >
                <h1 className="our-services-comes">{item.contentTitle}</h1>
                <div className="guarantee-image">
                  {index % 2 === 0 ? (
                    <>
                      {item?.contentImage && (
                        <Image
                          className="installing-ceramic-floor-tiles-icon"
                          loading="lazy"
                          alt=""
                          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${item?.contentImage}`}
                          width={719}
                          height={584}
                        />
                      )}

                      <div className="team">
                        <div className="frame-parent">
                          {/* <div className="ellipse-wrapper">
                                            <div className="frame-child"></div>
                                            </div> */}
                          <div
                            className="thanks-to-the-container"
                            dangerouslySetInnerHTML={{
                              __html: item?.contentText,
                            }}
                          ></div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="team">
                        <div className="frame-parent">
                          {/* <div className="ellipse-wrapper">
                                            <div className="frame-child"></div>
                                            </div> */}
                          <div
                            className="thanks-to-the-container"
                            dangerouslySetInnerHTML={{
                              __html: item?.contentText,
                            }}
                          ></div>
                        </div>
                      </div>
                      {item?.contentImage && (
                        <Image
                          className="installing-ceramic-floor-tiles-icon"
                          loading="lazy"
                          alt=""
                          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${item?.contentImage}`}
                          width={719}
                          height={584}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
        </div>

        <AvailableService data={serviceSlider} />
        <Testimonials data={testimonials} />
        <Location />
        <section className="call-experts-now my-60">
          <div className="dont-let-plumbing">
            Don’t Let Plumbing Issues Interrupt Your Comfort & Budget
          </div>
          <div className="call-button">
            <div className="call-experts-now1">Call Experts Now</div>
            <div className="span-parent">
              <a href="tel:+17603899117">
                <Image
                  className="span-icon"
                  loading="lazy"
                  alt=""
                  src="/templates/span@2x.png"
                  width={44}
                  height={44}
                />

                <b className="space">(760) 389 9117</b>
              </a>
            </div>
          </div>
        </section>
        <InsuranceLogos />
      </div>
    </>
  );
};

export default AboutUsTemplate;
