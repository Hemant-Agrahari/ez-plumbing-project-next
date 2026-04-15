"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { BlogData } from "@/types/interface";
import "@/styles/templates-global.css"
import "./scholarship.css"
import InsuranceLogos from "@/components/Home/InsuranceLogos";
import Link from "next/link";
import Image from "next/image";

const ScholarshipTemplate = ({ data }: any) => {
    const parsedListingItems =
        typeof data.listingItems === "string"
            ? JSON.parse(data.listingItems)
            : data.listingItems;
    return (
        <>
            <div className="scholarship-programe">
                <section className="max-container breadcrum-section w-100">
                    <div className="breadcrumbs p-0">
                        <div className="container">
                            <div className="breadcrumbs1">
                                <Link href="/" className="home">
                                    Home
                                </Link>
                                <Image
                                    // className="chevron-right-double-icon"
                                    alt=""
                                    src="/templates/chevronrightdouble.svg"
                                    width={24}
                                    height={24}
                                />
                                <a className="thank-you1">{data.breadcrumbTitle}</a>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    className="banner px-0"
                    style={{
                        backgroundImage: `linear-gradient(113.98deg, rgba(255, 255, 255, 0.82) 65.41%, rgba(49, 160, 91, 0.82) 105.28%), url(${typeof data?.bannerImage === "object" &&
                            data.bannerImage instanceof File
                            ? URL.createObjectURL(data.bannerImage)
                            : `${process.env.NEXT_PUBLIC_BACKEND_URL}${data?.bannerImage}`
                            })`,
                    }}
                >
                    {/* <section className="banner"> */}
                    <h1 className="scholarship-program-for">{data.bannerTitle}</h1>
                    <div
                        className="in-association-with"
                        dangerouslySetInnerHTML={{ __html: data.bannerContent }}
                    ></div>
                </section>


                <section className=" max-container w-100">
                    <div className="banner1">
                        <div className="container">
                            <div className="w-100">
                                <h1 className="about">{data.mainTitle}</h1>
                                <div className="the-game-development">{data.mainContent}</div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className=" max-container w-100">
                    <div className="container">
                        <div className="content pb-0">
                            <div className="scholarship">
                                <h1 className="description">{data.listingTitle}</h1>
                                {parsedListingItems &&
                                    Array.isArray(parsedListingItems) &&
                                    parsedListingItems.map((contentItem: any, index: any) => (
                                        <React.Fragment key={index}>
                                            <div className="design" />
                                            <div className="design1">
                                                <div className="frame-div">
                                                    <div className="frame-inner" />
                                                </div>
                                                <div className="heading" dangerouslySetInnerHTML={{ __html: contentItem?.listingItem }}></div>
                                            </div>
                                        </React.Fragment>
                                    ))}
                            </div>
                        </div>
                    </div>
                </section>
                <div className="mt-4 action d-flex justify-content-center">
                    <div className="button1 text-white">
                        <Link href={`${data?.btnLink}`} className="browse-all-locations fw-semibold text-white">
                            {data?.btnTitle}
                        </Link>
                        <div className="click-here-to">
                        </div>
                    </div>
                </div>
                {/* <div className="action">
            <div className="button">
              <div className="click-here-to">
                Click Here To Check Full Details Of Our Scholarship Program
              </div>
            </div>
          </div> */}

            </div>
            {/* <pre>{JSON.stringify(data)}</pre> */}
            <InsuranceLogos />
        </>
    );
};

export default ScholarshipTemplate;
