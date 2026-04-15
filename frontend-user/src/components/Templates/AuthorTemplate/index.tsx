import Image from "next/image";
import Link from "next/link";
import React from "react";
import "./author.css";
import BlogShowAuthor from "@/components/Blog/BlogShow-Author";
import Script from "next/script";
export default async function AuthorTemplate({ data }: any) {
  // console.log(data)

  const schema1 = `{
"@context": "https://schema.org",
"@type": "Person",
"@id": "https://www.ezheatandair.com/michael-cabral",
"familyName": "Michael",
"givenName": "Cabral",
"worksFor":

{ "@type": "Organization", "name": "EZ Heat and Air", "url": "https://www.ezheatandair.com/" }
,
"jobTitle": "Marketing Manager",
"knowsAbout": ["Marketing"],
"alumniOf":

{ "@type": "EducationalOrganization", "name": "De La Salle University" }
,
"image": "https://www.ezheatandair.com/templates/michael-cabral.png"
}`;
  return (
    <>
      <div className="author-page">
        <div className="bg-gray w-100">
          <div className="container">
            <div className="breadcrumbs px-0">
              <div className="home-breadcrumb">
                <Link href="/" className="home5">
                  Home
                </Link>
              </div>
              <img
                // className="chevron-right-double-icon"
                alt=""
                src="/templates/chevronrightdouble.svg"
              />
              <div className="location-breadcrumb">
                <div className="slab-leak-repair">{data.breadcrumbTitle}</div>
              </div>
            </div>
          </div>
        </div>
        <section className="content px-0">
          <div className="container">
            <div className="main-content">
              <img
                className="main-content-child"
                loading="lazy"
                alt=""
                src="/templates/michael-cabral.png"
                // src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${data?.bannerImage}`}
                width={120}
                height={120}
              />
              <div className="right-column">
                <div className="about-content-parent">
                  <div className="about-content">
                    <div className="contact-info">
                      <div className="text"> {data.bannerTitle}</div>
                      <img
                        className="icon-email"
                        alt=""
                        src="https://ezapi.ezplumbingusa.com/upload/media/icon-email.png"
                        // src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${data?.iconImage}`}
                        width={44}
                        height={44}
                      />
                    </div>
                  </div>
                  <h3 className="text1">{data.bannerSubTitle}</h3>
                </div>
                <div className="about">
                  <h3 className="about-description">{data.contentTitle}</h3>
                  <div
                    className="about-heading"
                    dangerouslySetInnerHTML={{ __html: data.bannerContent }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <BlogShowAuthor />
      </div>
      <Script
        id="schema1"
        type="application/ld+json"
        className="rank-math-schema"
        dangerouslySetInnerHTML={{ __html: schema1 }}
      ></Script>
    </>
  );
}
