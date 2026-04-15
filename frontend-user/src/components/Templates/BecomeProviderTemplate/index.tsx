"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { BlogData } from "@/types/interface";
import "@/styles/templates-global.css";
import "./become-provider.css";
import InsuranceLogos from "@/components/Home/InsuranceLogos";
import BecomeProviderForm from "@/components/FormComponent/BecomePorivder/BecomeForm";
import Image from "next/image";
import Link from "next/link";

interface MainTemplateProps {
  data: BlogData;
}

interface TocItem {
  id: string;
  text: string | null;
  level: string;
}

const ScholarshipTemplate: React.FC<MainTemplateProps> = ({ data }) => {
  // console.log(data, "asdsad");

  return (
    <>
            <header className="breadcrumbs px-0">
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
                <span className="about-us1">Become A Provider</span>
              </div>
            </div>
          </div>
        </header>
      <section className="provider-wrapper py-60">
        <div className="container">
          <h1 className="text-center main-title">
            Become a Service Provider <b>With EZ Plumbing USA</b> 
          </h1>
          <h3 className="text-center main-sub-title">
            Maximize your Business Reach with Us & Increase Your Revenue
          </h3>
          <div
            className="become-provider banner-content"
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></div>
        </div>
      </section>
      <div className="become-provider">
        <BecomeProviderForm />
        <InsuranceLogos />
      </div>

      {/* <InsuranceLogos /> */}
    </>
  );
};

export default ScholarshipTemplate;
