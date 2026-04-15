import React from "react";
import "@/style/templates-global.css";
import "./author.css";
import Link from "next/link";
import { Image } from "react-bootstrap";
const AuthorPreview = ({ data }: any) => {
  // console.log(data, "author preview data");

  return (
    <div className="author-page">
      <section className="max-container breadcrum-section w-100">
      <div className="breadcrumbs px-0">
        <div className="container">
          <div className="breadcrumb-col">
            <Link href="/" className="home5">
              Home
            </Link>
            <Image
              className="chevron-right-double-icon"
              alt=""
              src="/templates/chevronrightdouble.svg"
            />
            <div className="location-breadcrumb">
              <div className="slab-leak-repair">{data.breadcrumbTitle}</div>
            </div>
          </div>
        </div>
      </div>
      </section>
      <section className="content max-container w-100 px-0 py-60">
        <div className="container">
          <div className="main-content">
            <Image
              className="main-content-child"
              loading="lazy"
              alt=""
              src={
                data.bannerImage instanceof File
                  ? URL.createObjectURL(data.bannerImage) // Create object URL if it's a file
                  : typeof data.bannerImage === "string"
                    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${data.bannerImage}`
                    : "/templates/group-1000008898.svg" // Use URL or fallback
              }
              width={120}
              height={120}
            />
            <div className="right-column">
              <div className="about-content-parent">
                <div className="about-content">
                  <div className="contact-info">
                    <div className="text">{data.bannerTitle}</div>
                    <img
                      className="icon-email"
                      alt=""
                      src={
                        data?.iconImage instanceof File
                          ? URL.createObjectURL(data.iconImage)
                          : typeof data?.iconImage === "string"
                            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${data.iconImage}`
                            : "/templates/group-1000008898.svg"
                      }
                      width={44}
                      height={44}
                    />
                  </div>
                </div>
                <h3 className="text1">{data.bannerSubTitle}</h3>
              </div>
              <div className="about">
                <h3 className="about-description">{data.contentTitle}</h3>
                <div className="about-heading" dangerouslySetInnerHTML={{ __html: data?.bannerContent }}></div>
                <div className="about-heading1">
                  {/* Read articles to get more valuable information about detection
                  and damages of water and slab leak repair, techniques to fix
                  clogging, and installation and maintenance of AC  Appliance
                  in San Diego. */}
                </div>
              </div>
            </div> 
          </div>
        </div>
      </section>
    </div>
  );
};
export default AuthorPreview;
