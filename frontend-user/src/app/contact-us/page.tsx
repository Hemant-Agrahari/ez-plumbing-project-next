"use-client";
import React, { useState, useEffect } from "react";
import "../../styles/templates-global.css";
// import "../contact-us/contact-us.css";
// import styles from "../contact-us/contact.module.css";
import InsuranceLogos from "@/components/Home/InsuranceLogos";
import ContactUsNow from "@/components/FormComponent/ContactUsNow-Form/ContactUsNow";
import "./contact-us.css";
import Link from "next/link";
import Image from "next/image";

const page = () => {
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
                loading="lazy"
                alt=""
                src="./templates/chevronrightdouble.svg"
                width={24}
                height={24}
              />
              <span className="about-us1">Contact Us</span>
            </div>
          </div>
        </div>
      </header>

      <div className="contact-us py-60 max-container contact-us-form-wrapper w-100">
        <div className="contact-section">
          <div className="container">
            <div className="contact-us-new">Contact Us</div>
            <div className="frameParent">
              <div className="frameGroup">
                <div className="frameContainer">
                <div className="location1Parent">
                    <div className="location1">
                      <img
                        className="icon"
                        alt=""
                        src="./templates/icon.svg"
                        width="60"
                        height="60"
                      />
                      <div className="title">
                        <b className="heading">Location</b>
                        <div className="text">
                          29610 Buena Tierra, Sun City, CA 92586
                        </div>
                      </div>
                    </div>
                    <div className="phoneNo1">
                      <img
                        className="icon"
                        alt=""
                        src="./templates/icon-1.svg"
                      />
                      <div className="title">
                        <b className="heading">Phone Number</b>
                        <div className="text1">
                          <a href="tel:+18447557889">(844) 755-7889</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <img
                    className="mapsIcon"
                    width="306"
                    height="263"
                    alt=""
                    src="./templates/maps@2x.png"
                  />
                </div>
                {/* <div className="frameContainer">
                  <div className="location1Parent">
                    <div className="location1">
                      <img className="icon" alt="" src="./templates/icon.svg" />
                      <div className="title">
                        <b className="heading">Location</b>
                        <div className="text">
                          10320 Camino Santa Fe Unit E,
                          <br /> San Diego, CA 92121
                        </div>
                      </div>
                    </div>
                    <div className="phoneNo1">
                      <img
                        className="icon"
                        alt=""
                        src="./templates/icon-1.svg"
                      />
                      <div className="title">
                        <b className="heading">Phone Number</b>
                        <div className="text1">
                          <a href="tel:+17603899117">(760) 389 9117</a>

                        </div>
                      </div>
                    </div>
                  </div>
                  <img
                    className="mapsIcon"
                    alt=""
                    src="./templates/maps@2x.png"
                    width="306"
                    height="263"
                  />
                </div> */}
              </div>
              <ContactUsNow />
            </div>
          </div>
        </div>
      </div>
      <InsuranceLogos />
    </>
  );
};

export default page;
