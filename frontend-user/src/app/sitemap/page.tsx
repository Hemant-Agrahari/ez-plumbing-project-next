"use client";
import React, { useEffect, useState } from "react";
import "../../styles/templates-global.css";
import InsuranceLogos from "@/components/Home/InsuranceLogos";
import "./sitemap.css";
import { Tab, Tabs } from "react-bootstrap";
import { requestHandler } from "@/helper/requestHandler";
import Link from "next/link";
import Head from "next/head";
interface SitemapData {
  [key: string]: {
    name: string;
    categories: {
      title: string;
      url?: string;
      links: {
        text: string;
        href: string;
        target?: string;
      }[];
    }[];
  };
}
const page = () => {

  const [sitemapData, setSitemapData] = useState<any>(null);
  console.log("sitemapData",sitemapData)
  interface Link {
    text: string;
    href: string;
  }
  
  interface Category {
    title: string;
    links: Link[];
    name: string
  }
  
  interface Response {
    pages: {
      title: string;
      categories: Category[];
    };
    posts: {
      title: string;
      categories: Category[];
    };
  }
  useEffect(() => {
    const fetchSitemapData = async () => {
      try {
        const response:Response = await requestHandler(`/siteMap`, {}, "get");
        console.log("response",response); // Log for debugging
        if (response) {
          response.pages.categories.forEach(category => {
            category.links.sort((a, b) => a.text.trim().localeCompare(b.text.trim()));
          });
          response.posts.categories.sort((a, b) => a.name.trim().localeCompare(b.name.trim()));
          response.posts.categories.forEach(category => {
            category.links.sort((a, b) => a.text.trim().localeCompare(b.text.trim()));
          });
          setSitemapData(response);
        }
      } catch (error) {
        console.error("Error fetching sitemap data:", error);
      }
    };

    fetchSitemapData();
  }, []);

  if (!sitemapData) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <header>
        <title>Sitemap for EZ Heat and Air | Explore Our Services</title>
        <meta
          name="description"
          content="Navigate EZ Heat and Air's sitemap to explore all our HVAC, heating, and cooling services. Find quick links to resources, service areas, and more!"
        />
        <meta
          property="og:title"
          content="Sitemap for EZ Heat and Air | Explore Our Services"
        />
        <meta
          property="og:description"
          content="Navigate EZ Heat and Air's sitemap to explore all our HVAC, heating, and cooling services. Find quick links to resources, service areas, and more!"
        />
        <meta property="og:image" content="" />
        <link rel="canonical" href="https://www.ezheatandair.com/sitemap" />
        <meta property="og:url" content="" />
        <meta
          name="twitter:title"
          content="Sitemap for EZ Heat and Air | Explore Our Services"
        />
        <meta
          name="twitter:description"
          content="Navigate EZ Heat and Air's sitemap to explore all our HVAC, heating, and cooling services. Find quick links to resources, service areas, and more!"
        />
        <meta name="robots" content="index, follow"/>
        <meta name="twitter:image" content="" />
      </header>

      <div className="breadcrumbs">
        <div className="homes">Home</div>
        <img
          className="chevronRightDoubleIcon"
          alt=""
          src="./templates/chevronrightdouble.svg"
        />
        <div className="page-title">
          <div className="slab-leak-repair">Sitemap</div>
        </div>
      </div>
      <section className="sitemap-section my-60">
        <div className="container">
          <div className="row">
            <h1 className="com-title text-center mb-md-5 mb-4">Sitemap</h1>
            <div className="sitemap-main">
              <div className="col-12">
                <Tabs defaultActiveKey="pages" id="sitemap-tabs">
                  {Object.keys(sitemapData).map((key) => (
                    <Tab
                      eventKey={key}
                      title={sitemapData[key as keyof typeof sitemapData].title}
                      key={key}
                    >
                      {sitemapData[
                        key as keyof typeof sitemapData
                      ].categories.map((category:any, index:any) => (
                        <div
                          className={` ${
                            key === "pages" ? "row" : "row border-bottom"
                          }`}
                          key={index}
                        >
                          <div
                            className={`tab-title mt-4 ${
                              key === "pages" ? "col-md-12 column-3" : " col-12"
                            }`}
                          >
                            {category.name && (
                              <>
                                {"url" in category ? (
                                  <Link
                                    href={`${category.url}`}
                                    className="fw-semibold text-green text-decoration-underline"
                                    style={{ fontSize: "18px" }}
                                  >
                                    {category.name}
                                  </Link>
                                ) : (
                                  <span className="fw-semibold">
                                    {category.name}
                                  </span> // Render as plain text if no URL
                                )}
                              </>
                            )}
                            <ul
                              className={`sitemap-list circle-listing ${
                                key === "pages" ? "" : " column-2"
                              }`}
                            >
                              {category.links.map((link:any, linkIndex:any) => (
                                <li key={linkIndex}>
                                  <span className="circle-img"></span>
                                  <Link href={link.href || ""} target="_self">
                                    {link.text}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </Tab>
                  ))}
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="pt-md-4 pt-3"></div>
      <InsuranceLogos />
    </>
  );
};

export default page;
