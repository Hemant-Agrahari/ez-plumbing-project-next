import React from "react";
import Link from "next/link";
// import "../../styles/templates-global.css";
// import "./service.css";
import "./servicemain.css";
import Image from "next/image";
import AvailableService from "@/components/Home/AvailableService";
import Testimonials from "@/components/Home/Testimonials";
import SectionTwoSlider from "@/components/Home/Section2Slider";
import ContactUsNow from "@/components/FormComponent/ContactUsNow-Form/ContactUsNow";
import Script from "next/script";
import Head from "next/head";
import WpService from "@/components/WpService/Index";
interface ServiceTemplate7 {
  // data: BlogData;
  // blog: BlogData;
}
const ServiceTemplate7: React.FC<ServiceTemplate7> = ({ data }: any) => {
  console.log("ServiceTemplate-7",data.content[0].contentImage) 
  const isWordpress = data.wordpress;

  // console.log("test", data.section2);

  // const banner = JSON.parse((data.banner))
  const content = data?.content;
  const content2 = data?.content2;
  const section2 = data.section2;
  const schema = data?.schema;
  const serviceSlider = data?.serviceSlider;
  const testimonials = data?.testimonials;
  const faq = data?.faq;
  const inputDate = data?.createdAt;


  const formatDate = (inputDate: any) => {
    const dateObject = new Date(inputDate);

    // Extract the date components
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(dateObject.getDate()).padStart(2, "0");
    const hours = dateObject.getHours();
    const minutes = String(dateObject.getMinutes()).padStart(2, "0");

    // Format the output
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  const dataDate = {
    createdAt: formatDate(data.createdAt),
    updatedAt: formatDate(data.updatedAt),
  };
  const schema1 = `{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "EZ Heat and Air",
  "image": "https://www.ezheatandair.com/wp-content/uploads/2019/11/ez-heat-and-air_yellow.png",
  "@id": "",
  "url": "https://www.ezheatandair.com/",
  "telephone": "+1 844-755-7889",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "29610 Buena Tierra",
    "addressLocality": "Sun City",
    "addressRegion": "CA",
    "postalCode": "92586",
    "addressCountry": "US"
  } 
}
`;

  const schema2 = `{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "https://www.ezheatandair.com/"
  },{
    "@type": "ListItem",
    "position": 2,
    "name": "${data?.bannerTitle || "Default Title"}"
  }]
}
`;


let randomRating = (Math.floor(Math.random() * 4 + 6) / 10).toFixed(1);
let randomSku = 'EZHEAT' + Math.floor(Math.random() * 900 + 100);
const schemaTest=`
{"@context": "https://schema.org/",	"@type": "Product",	
"name": "${data?.bannerTitle}",	
"image": "${process.env.NEXT_PUBLIC_BACKEND_URL}${content[0].contentImage}",	
"priceRange":"$$",
"description": "${data.seoDescription}",
"sku": "${randomSku}",
"brand": {	"@type": "Brand",	"name": "EZ Heat and Air"	},
"aggregateRating": 
{"@type": "AggregateRating",
"ratingValue": "${4.0 + Number(randomRating)}",
"bestRating": "5",
"ratingCount": "200"}
} 
`

  //   const schema3 = `{
  //   "@context": "https://schema.org",
  //   "@type": "FAQPage",
  //   "mainEntity": [{
  //     "@type": "Question",
  //     "name": "How do I stop water leaking from an air conditioner?",
  //     "acceptedAnswer": {
  //       "@type": "Answer",
  //       "text": "Whenever you find water leaking, first you need to switch off an AC and locate the reason for the leakage. Water leaking can be due to dirty coils, damaged insulation, clogged or disconnection of the drain line."
  //     }
  //   },{
  //     "@type": "Question",
  //     "name": "My air conditioner is over 12 years old and working properly, is it worth getting repaired?",
  //     "acceptedAnswer": {
  //       "@type": "Answer",
  //       "text": "When your air conditioner has reached double-digit, repair is not a good option. Due to low efficiency, more energy will be consumed and your utility bills will be high. It would probably be cheaper to replace it with the new cost-effective air conditioner."
  //     }
  //   }]
  // }
  // `;

  return (
    <>

      {isWordpress ? (
        <WpService data={data} />
      ) : (
        <div className=" serviceTemplate">
       
          <header className="breadcrumbs px-0">
            <div className="container">
              <div className="breadcrumb-col">
                <div className="home-breadcrumb">
                  <Link prefetch={false} href="/" className="homes">
                    Home
                  </Link>
                  <Image
                    priority
                    alt="chevronrightdouble"
                    src="/templates/chevronrightdouble.svg"
                    width={24}
                    height={24}
                  />
                  <span className="about-us1">{data.breadcrumbTitle}</span>
                </div>
              </div>
            </div>
          </header>

          <section
            className="banner max-container"
            title={data.bannerTitle}
            style={{
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(113.98deg, rgba(255, 255, 255, 0.82), 65.41%, rgba(49, 160, 91, 0.82) 105.28%) ",
                zIndex: 0,
              }}
            />
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${data?.bannerImage}`}
              alt={data.bannerTitle}
              style={{ objectFit: "cover", objectPosition: "top", zIndex: -1 }}
              fill
              // sizes="(max-width: 768px) 100vw, 50vw" // Adjust based on your layout
              priority={true}
              className="d-none d-lg-block"
            />
            <div className="container" style={{ zIndex: "1" }}>
              <div className="row">
                <div className="col-lg-7 col-md-7">
                  <div className="immediate-slab-leak-detection">
                    <h1 className="immediate-slab-leak">{data.bannerTitle}</h1>
                    {data.bannerSubTitle? <h2 className="affordable-slab-leak">
                    {data.bannerSubTitle}
                  </h2>: null}
                    <div
                      className="slab-leak-detection"
                      dangerouslySetInnerHTML={{ __html: data.bannerContent }}
                    ></div>
                  </div>
                </div>
                <div className="col-lg-5 col-md-5">
                  <ContactUsNow />
                </div>
              </div>
            </div>
          </section>

          <section className="container service-boxe-col">
            <div className="avoid-inefficient-leak-get-sla px-0">
              <h2 className="avoid-inefficient-leak-container">
                <span
                  className="avoid-inefficient-leak"
                  dangerouslySetInnerHTML={{ __html: section2.title }}
                />
              </h2>
              <div className="service-boxes">
                <SectionTwoSlider data={section2} />
              </div>
            </div>
          </section>

          <section className="container">
            <div className="ez-plumbing-guarantees-repair px-0 pt-0 service-7">
              <h2 className="ez-plumbing-guarantees-container">
                <span
                  className="ez-plumbing-guarantees"
                  dangerouslySetInnerHTML={{ __html: content[0].contentTitle }}
                />
              </h2>

              <div className="image-container">
                {content[0].contentImage && (
                  <Image
                    className="installing-ceramic-floor-tiles-icon"
                    priority
                    alt="chevronrightdouble"
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${content[0].contentImage}`}
                    width={719}
                    height={719}
                  />
                )}

                <div
                  className="info-columns"
                  dangerouslySetInnerHTML={{ __html: content[0].contentText }}
                ></div>
              </div>
            </div>
          </section>

          <AvailableService data={serviceSlider} />

          <section className="call-experts-now">
            <div className="dont-let-plumbing">
              Don’t Let Plumbing Issues Interrupt Your Comfort & Budget
            </div>
            <div className="call-info">
              <div className="call-experts-now1">Call Experts Now</div>
              <div className="number-container">
                <a href="tel:+17603899117">
                  <Image
                    className="span-icon"
                    priority
                    alt="span"
                    src="/templates/span@2x.png"
                    width={44}
                    height={44}
                  />

                  <b className="space">(760) 389 9117</b>
                </a>
              </div>
            </div>
          </section>

          <Testimonials data={testimonials} />

          {content2[0] && (
            <section className="container">
              <div className="ez-plumbing-guarantees-repair px-0 pt-0 service-7s">
                <h2 className="ez-plumbing-guarantees-container">
                  <p
                    className="ez-plumbing-guarantees"
                    dangerouslySetInnerHTML={{
                      __html: content2[0].contentTitle,
                    }}
                  />
                  {/* <p className="best-slab-leak">
                {content?.contentTitle}
              </p> */}
                </h2>

                <div className="image-container">
                  <div className="row g-3">
                    <div className="col-lg-6">
                      <div
                        className="info-columns"
                        dangerouslySetInnerHTML={{
                          __html: content2[0].contentText,
                        }}
                      ></div>
                    </div>
                    <div className="col-lg-6 text-center">
                      {content2[0].contentImage && (
                        <Image
                          className="installing-ceramic-floor-tiles-icon"
                          priority
                          alt="chevronrightdouble"
                          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${content2[0].contentImage}`}
                          width={719}
                          height={719}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {data?.locationContent &&
            data?.locationContent[0]?.pageSubHeading && (
              <section className="container">
                <div className="area-we-served px-0">
                  {/* <h3 className=" area-we-served-title">{data.bannerTitle}</h3> */}
                  {data.locationContent &&
                    data.locationContent.map((item: any, index: any) => {
                      return (
                        <>
                          <div className="w-100">
                            <h2 className="area-we-served1 text-center">
                              {item.pageSubHeading}
                            </h2>

                            <div className="location-grid-col">
                              {data.locationContent[index].location.map(
                                (locationItem: any, ele: any) => {
                                  return (
                                    <>
                                      <div className="location-grid-item">
                                        <Image
                                          className="column-items-icon"
                                          priority
                                          alt="frame"
                                          src="/templates/frame-1686564363.svg"
                                          width={24}
                                          height={24}
                                        />
                                        <Link
                                          prefetch={false}
                                          href={`${locationItem.links}`}
                                          className="location-name"
                                        >
                                          {locationItem.items}
                                        </Link>
                                      </div>
                                    </>
                                  );
                                }
                              )}
                            </div>
                            {item.browseBtnLink && (
                              <div className="button-container text-center mt-md-5 mt-sm-4 mt-3">
                                <Link
                                  prefetch={false}
                                  href={item.browseBtnLink}
                                  className="button1 text-white"
                                >
                                  <Link
                                    prefetch={false}
                                    href={item.browseBtnLink}
                                    className="browse-all-locations fw-semibold text-white"
                                  >
                                    {item.browseBtnText}
                                  </Link>
                                </Link>
                              </div>
                            )}
                          </div>
                        </>
                      );
                    })}
                </div>
              </section>
            )}
          {faq && faq[0].question && (
            <section className="faq-section">
              <div className="container">
                <h2 className="com-title">FAQs</h2>

                <div className="accordion" id="accordionFaq">
                  {faq &&
                    (typeof faq === "string" ? JSON.parse(faq) : faq).map(
                      (item: any, index: any) => (
                        <div className="accordion-item" key={index}>
                          <h2 className="accordion-header">
                            <button
                              className={`accordion-button ${
                                index === 0 ? "" : "collapsed"
                              }`}
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapse${index}`}
                              aria-expanded={index === 0 ? "true" : "false"}
                              aria-controls={`collapse${index}`}
                            >
                              {item.question}
                            </button>
                          </h2>
                          <div
                            id={`collapse${index}`}
                            className={`accordion-collapse collapse ${
                              index === 0 ? "show" : ""
                            }`}
                            data-bs-parent="#accordionFaq"
                          >
                            <div className="accordion-body">{item.answer}</div>
                          </div>
                        </div>
                      )
                    )}
                </div>
              </div>
            </section>
          )}

          <Script
            id="script1"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: schema1 }}
          ></Script>

          <Script
            id="script2"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: schema2 }}
          ></Script>

          <Script
            id="schemaTest"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: schemaTest }}
          ></Script>

          {/* <Script
            id="script3"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: schema3 }}
          ></Script> */}

          {faq && faq.length > 0 && faq[0].question && (
            <Script
              id="script8"
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: faq.map((item: any) => ({
                    "@type": "Question",
                    name: item.question,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: item.answer,
                    },
                  })),
                }),
              }}
            />
          )}

          {/* {data.schema
            .filter((val: any) => val != null)
            .map((val: any, index: any) => {


              return (
                <Script
                  key={index}
                  id={`script1${index}`}
                  type="application/ld+json"
                  className="rank-math-schema"
                  dangerouslySetInnerHTML={{ __html: val }}
                />
              );
            })} */}

        </div>
      )}
    
    </>
  );
};

export default ServiceTemplate7;
