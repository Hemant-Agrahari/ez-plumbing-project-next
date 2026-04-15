"use client";
import React from 'react';
import Link from 'next/link';
// import "../../styles/templates-global.css";
import "./service.css";
import Image from "next/image";
import AvailableService from "@/components/FrontendComponents/Home/AvailableService";
import Testimonials from "@/components/FrontendComponents/Home/Testimonials";
import Slider from "react-slick";
import { sliderblogsSettings } from '@/helper/sliderSettings';
interface ServiceTemplate {
  // data: BlogData;
  // blog: BlogData;
}
const ServiceTemplate: React.FC<ServiceTemplate> = ({ data }: any) => {
  const banner= JSON.parse((data.banner))
  const content= JSON.parse((data.content))
  const serviceSlider= JSON.parse((data.serviceSlider))
  // console.log("sunny ssir",data);
  // console.log("asdasd",banner);
  return (
      <>
           <div className="services">
         <header className="breadcrumbs px-0">
         <div className="container">
          <div className="breadcrumb-col">
            <div className="home-link">
              <Link href="/" className="home">
                Home
              </Link>
              <Image
                className="chevron-right-double-icon"
                loading="lazy"
                alt=""
                src="/templates/chevronrightdouble.svg"
                width={24}
                height={24}
              />
            </div>
            <div className="page-title">
              <div className="slab-leak-repair">{data.breadcrumbTitle}</div>
            </div>
          </div>
        </div>
      </header>
      <section className="banner px-0">
        <div className="container">
          <div className="hero-content">
            <div className="immediate-slab-leak-detection">
              <h2 className="immediate-slab-leak">
                {banner.bannerTitle}
              </h2>
              <h2 className="affordable-slab-leak">
                Affordable Slab Leak Repair in San Diego County From EZ Plumbing
                USA
              </h2>
              <div className="slab-leak-detection">
              {banner.bannerContent}
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
      <section className="container service-boxe-col">
        <div className="avoid-inefficient-leak-get-sla px-0">
          <h2 className="avoid-inefficient-leak-container">
            <p className="avoid-inefficient-leak">
              {content.contentTitle}
            </p>
          </h2>
          <div className="service-boxes">
            <Slider {...sliderblogsSettings} className="w-100">
            {serviceSlider.map((item:any, index:any) => (
          <div key={index} className="slab-leak-detection-box">
            <div className="slab-leak-detection-box-child"></div>
            <b className="slab-leak-detection1">{item.cardTitle}</b>
            <div className="details w-100">
              {item.cardContent}
            </div>
          </div>
        ))}
            </Slider>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="ez-plumbing-guarantees-repair px-0">
          <h2 className="ez-plumbing-guarantees-container">
            <p className="ez-plumbing-guarantees">
              EZ Plumbing Guarantees Repair Quality; Get
            </p>
            <p className="best-slab-leak">
              Best Slab Leak Repair San Diego Services
            </p>
          </h2>
          <div className="image-container">
            <Image
              className="installing-ceramic-floor-tiles-icon"
              loading="lazy"
              alt=""
              src="/templates/installingceramicfloortilesconstructionsiteconstructionworkersworkerslayingtilesfloorwithcementadhesiverenovatingfloor-2@2x.png"
              width={719}
              height={719}
            />

            <div className="info-columns">
              <h3 className="services-of-ez">
                Services of EZ San Diego Slab Leak Repair Plumbers Comprehensive
                Slab Leak Detection in San Diego
              </h3>
              <div className="benefits">
                <div className="benefit-icons">
                  <div className="icon-pairs">
                    <div className="icons"></div>
                  </div>
                  <div className="considering-buying-a">
                    Considering buying a new house or commercial premises?
                  </div>
                </div>
                <div className="benefit-icons1">
                  <div className="benefit-icons-inner">
                    <div className="frame-child"></div>
                  </div>
                  <div className="shifting-to-an">
                    Shifting to an old house?
                  </div>
                </div>
              </div>
              <div className="contact-ez-plumbing">
                Contact EZ Plumbing USA to check the slab plumbing and other
                plumbing lines for leaks or leak-prone pipe sections. Get a
                water leak and slab leak detection done to ensure that your new
                property’s plumbing is in good condition. This will prevent the
                chance of your having to spend a lot on plumbing repairs every
                year.
              </div>
              <h3 className="degree-approach-to">
                360-Degree Approach To Slab Leak Repair in San Diego
              </h3>
              <div className="when-a-property">
                When a property owner consults with us for slab leak repair in
                San Diego, we discuss everything and find out about their
                concerns, preferences, and expectations of solutions. Based on
                the property-based plumbing scenario, the budget constraints of
                the customers, and the plumbing solutions they are expecting, we
                offer multiple repair options.
              </div>
              <div className="our-san-diego">
                Our San Diego Slab Leak Repair teams deliver any repairs with
                perfection. Find solutions for all slab leak problems.
              </div>
              <div className="benefits">
                <div className="benefit-icons">
                  <div className="icon-pairs">
                    <div className="icons"></div>
                  </div>
                  <div className="considering-buying-a">Burst Pipe Repair</div>
                </div>
                <div className="benefit-icons1">
                  <div className="benefit-icons-inner">
                    <div className="frame-child"></div>
                  </div>
                  <div className="shifting-to-an">Pipelining</div>
                </div>
                <div className="benefit-icons1">
                  <div className="benefit-icons-inner">
                    <div className="frame-child"></div>
                  </div>
                  <div className="shifting-to-an">Pipe Coating</div>
                </div>
              </div>
              <h3 className="ez-plumbing-repipe">
                EZ Plumbing Repipe San Diego Team Services
              </h3>
              <div className="with-the-help">
                With the help of an EZ Plumbing Repipe San Diego plumber, you
                will be able to identify and get the right piping material for
                under-the-slab repiping or pipe rerouting. Our plumbers are
                backed by our experience and expertise of 30+ years in repiping.
                Get the best deals and the best services.
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <AvailableService />

      <Testimonials /> */}

      <section className="container">
        <div className="count-on-ez-plumbing-usa-for-s px-0">
          <div className="trust-content">
            <h3 className="count-on-ez">
              Count on EZ Plumbing USA For Slab Leak Detection Repair In San
              Diego
            </h3>
            <div className="ez-plumbing-san">
              EZ Plumbing San Diego slab leak repair services are trusted by
              millions of people across San Diego County, CA.
            </div>
            <div className="our-slab-leak1">
              Our slab leak San Diego teams offer evidence-based inspection and
              reports about the pipes under the slab and all the leak-prone
              areas. You will be able to make a well-informed decision about the
              kind of repair that will best fit your requirements.
            </div>
            <div className="we-are-open">
              We are open 24/7 to serve you! Contact us anytime for slab leak
              repair in San Diego.
            </div>
            <div className="count-on-our">
              Count on our trustworthy professionals, who will always help you
              in finding the right solutions to any plumbing troubles.
            </div>
            <div className="text-info1">
              <div className="burst-pipe-repair-info1">
                <div className="quality-icons">
                  <div className="icon"></div>
                </div>
                <div className="licensed-insured-bonded">
                  Licensed, Insured, Bonded Plumbers
                </div>
              </div>
              <div className="burst-pipe-repair-info2">
                <div className="burst-pipe-repair-info-inner">
                  <div className="ellipse-div"></div>
                </div>
                <div className="slab-leak-san">
                  Slab Leak San Diego Plumbers With Brilliant Track Records
                </div>
              </div>
              <div className="pipe-coating-info1">
                <div className="pipe-coating-info-child">
                  <div className="frame-child1"></div>
                </div>
                <div className="background-checked">Background-Checked</div>
              </div>
              <div className="pipe-coating-info2">
                <div className="frame-div">
                  <div className="frame-child2"></div>
                </div>
                <div className="use-of-the">
                  Use of The Best And Latest Slab Leak Detection Techniques
                </div>
              </div>
              <div className="pipe-coating-info3">
                <div className="pipe-coating-info-inner1">
                  <div className="frame-child3"></div>
                </div>
                <div className="accurate-fact-based-reports">
                  Accurate, Fact-Based Reports
                </div>
              </div>
              <div className="pipe-coating-info4">
                <div className="pipe-coating-info-inner2">
                  <div className="frame-child4"></div>
                </div>
                <div className="guarantee-backed-repairs">
                  Guarantee-Backed Repairs
                </div>
              </div>
              <div className="pipe-coating-info5">
                <div className="pipe-coating-info-inner3">
                  <div className="frame-child5"></div>
                </div>
                <div className="emergency-slab-leak">
                  24/7 Emergency Slab Leak Detection Service
                </div>
              </div>
            </div>
            <div className="find-an-expert">
              Find an expert San Diego slab leak repair plumber by contacting EZ
              Plumbing USA!
            </div>
          </div>
          <div className="gallery">
            <div className="image-2">
              <div className="image-grid">
                <Image
                  className="h2-intro-jpg-icon w-100 h-100"
                  alt=""
                  src="/templates/detection-repair-img.png"
                  width={576}
                  height={250}
                />
                {/* <Image
                className="h2-intro-jpg-icon"
                alt=""
                src="/templates/h2introjpg@2x.png"
              />

              <Image
                className="h2-intro-jpg-icon1"
                alt=""
                src="/templates/h2introjpg-1@2x.png"
              /> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="area-we-served px-0">
          <h2 className="area-we-served1">Area We Served</h2>
          <div className="location-grid-col">
            <div className="location-grid-item">
              <Image
                className="column-items-icon"
                loading="lazy"
                alt=""
                src="/templates/frame-1686564363.svg"
                width={24}
                height={24}
              />

              <div className="location-name">La Mesa</div>
            </div>
            <div className="location-grid-item">
              <Image
                className="column-items-icon"
                loading="lazy"
                alt=""
                src="/templates/frame-1686564363.svg"
                width={24}
                height={24}
              />

              <div className="location-name">Serra Mesa</div>
            </div>
            <div className="location-grid-item">
              <Image
                className="column-items-icon"
                loading="lazy"
                alt=""
                src="/templates/frame-1686564363.svg"
                width={24}
                height={24}
              />

              <div className="location-name">Encinitas</div>
            </div>
            <div className="location-grid-item">
              <Image
                className="column-items-icon"
                loading="lazy"
                alt=""
                src="/templates/frame-1686564363.svg"
                width={24}
                height={24}
              />

              <div className="location-name">Mira Mesa</div>
            </div>
            <div className="location-grid-item">
              <Image
                className="column-items-icon"
                loading="lazy"
                alt=""
                src="/templates/frame-1686564363.svg"
                width={24}
                height={24}
              />

              <div className="location-name">Tierrasanta</div>
            </div>
            <div className="location-grid-item">
              <Image
                className="column-items-icon"
                loading="lazy"
                alt=""
                src="/templates/frame-1686564363.svg"
                width={24}
                height={24}
              />

              <div className="location-name">Vista</div>
            </div>
            <div className="location-grid-item">
              <Image
                className="column-items-icon"
                loading="lazy"
                alt=""
                src="/templates/frame-1686564363.svg"
                width={24}
                height={24}
              />

              <div className="location-name">Mission Valley</div>
            </div>
            <div className="location-grid-item">
              <Image
                className="column-items-icon"
                loading="lazy"
                alt=""
                src="/templates/frame-1686564363.svg"
                width={24}
                height={24}
              />

              <div className="location-name">Solana Beach</div>
            </div>
            <div className="location-grid-item">
              <Image
                className="column-items-icon"
                loading="lazy"
                alt=""
                src="/templates/frame-1686564363.svg"
                width={24}
                height={24}
              />

              <div className="location-name">Pacific Beach</div>
            </div>
            <div className="location-grid-item">
              <Image
                className="column-items-icon"
                loading="lazy"
                alt=""
                src="/templates/frame-1686564363.svg"
                width={24}
                height={24}
              />

              <div className="location-name">Linda Vista</div>
            </div>
            <div className="location-grid-item">
              <Image
                className="column-items-icon"
                loading="lazy"
                alt=""
                src="/templates/frame-1686564363.svg"
                width={24}
                height={24}
              />

              <div className="location-name">Cardiff</div>
            </div>
            <div className="location-grid-item">
              <Image
                className="column-items-icon"
                loading="lazy"
                alt=""
                src="/templates/frame-1686564363.svg"
                width={24}
                height={24}
              />

              <div className="location-name">Paradise Valley</div>
            </div>
            <div className="location-grid-item">
              <Image
                className="column-items-icon"
                loading="lazy"
                alt=""
                src="/templates/frame-1686564363.svg"
                width={24}
                height={24}
              />

              <div className="location-name">Golden Hills</div>
            </div>
            <div className="location-grid-item">
              <Image
                className="column-items-icon"
                loading="lazy"
                alt=""
                src="/templates/frame-1686564363.svg"
                width={24}
                height={24}
              />

              <div className="location-name">Coronado</div>
            </div>
            <div className="location-grid-item">
              <Image
                className="column-items-icon"
                loading="lazy"
                alt=""
                src="/templates/frame-1686564363.svg"
                width={24}
                height={24}
              />

              <div className="location-name">San Macros</div>
            </div>
            <div className="location-grid-item">
              <Image
                className="column-items-icon"
                loading="lazy"
                alt=""
                src="/templates/frame-1686564363.svg"
                width={24}
                height={24}
              />

              <div className="location-name">Hillcrest</div>
            </div>
            <div className="location-grid-item">
              <Image
                className="column-items-icon"
                loading="lazy"
                alt=""
                src="/templates/frame-1686564363.svg"
                width={24}
                height={24}
              />

              <div className="location-name">Del Cerro</div>
            </div>
            <div className="location-grid-item">
              <Image
                className="column-items-icon"
                loading="lazy"
                alt=""
                src="/templates/frame-1686564363.svg"
                width={24}
                height={24}
              />

              <div className="location-name">Logan Heights</div>
            </div>
            <div className="location-grid-item">
              <Image
                className="column-items-icon"
                loading="lazy"
                alt=""
                src="/templates/frame-1686564363.svg"
                width={24}
                height={24}
              />

              <div className="location-name">Rancho Penasquitos</div>
            </div>
            <div className="location-grid-item">
              <Image
                className="column-items-icon"
                loading="lazy"
                alt=""
                src="/templates/frame-1686564363.svg"
                width={24}
                height={24}
              />

              <div className="location-name">San Ysidro</div>
            </div>
            <div className="location-grid-item">
              <Image
                className="column-items-icon"
                loading="lazy"
                alt=""
                src="/templates/frame-1686564363.svg"
                width={24}
                height={24}
              />

              <div className="location-name">Morena</div>
            </div>
            <div className="location-grid-item">
              <Image
                className="column-items-icon"
                loading="lazy"
                alt=""
                src="/templates/frame-1686564363.svg"
                width={24}
                height={24}
              />

              <div className="location-name">Santee</div>
            </div>
            <div className="location-grid-item">
              <Image
                className="column-items-icon"
                loading="lazy"
                alt=""
                src="/templates/frame-1686564363.svg"
                width={24}
                height={24}
              />

              <div className="location-name">Carlsbad</div>
            </div>
            <div className="location-grid-item">
              <Image
                className="column-items-icon"
                loading="lazy"
                alt=""
                src="/templates/frame-1686564363.svg"
                width={24}
                height={24}
              />

              <div className="location-name">Normal Heights</div>
            </div>
            <div className="location-grid-item">
              <Image
                className="column-items-icon"
                loading="lazy"
                alt=""
                src="/templates/frame-1686564363.svg"
                width={24}
                height={24}
              />

              <div className="location-name">Lemon Grove</div>
            </div>
            <div className="location-grid-item">
              <Image
                className="column-items-icon"
                loading="lazy"
                alt=""
                src="/templates/frame-1686564363.svg"
                width={24}
                height={24}
              />

              <div className="location-name">Carmel Valley</div>
            </div>
            <div className="location-grid-item">
              <Image
                className="column-items-icon"
                loading="lazy"
                alt=""
                src="/templates/frame-1686564363.svg"
                width={24}
                height={24}
              />

              <div className="location-name">North Park</div>
            </div>
            <div className="location-grid-item">
              <Image
                className="column-items-icon"
                loading="lazy"
                alt=""
                src="/templates/frame-1686564363.svg"
                width={24}
                height={24}
              />

              <div className="location-name">Scripps Ranch</div>
            </div>
            <div className="location-grid-item">
              <Image
                className="column-items-icon"
                loading="lazy"
                alt=""
                src="/templates/frame-1686564363.svg"
                width={24}
                height={24}
              />

              <div className="location-name">El Cajon</div>
            </div>
            <div className="location-grid-item">
              <Image
                className="column-items-icon"
                loading="lazy"
                alt=""
                src="/templates/frame-1686564363.svg"
                width={24}
                height={24}
              />

              <div className="location-name">College Grove</div>
            </div>
          </div>
          <div className="button-container">
            <button className="button1">
              <div className="browse-all-locations">BROWSE ALL LOCATIONS</div>
            </button>
          </div>
        </div>
      </section>
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
      </>

  );
};


    



export default ServiceTemplate