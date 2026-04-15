import React from "react";
import Link from "next/link";
import "./service.css";
import Image from "next/image";
import AvailableService from "@/components/Home/AvailableService";
import Testimonials from "@/components/Home/Testimonials";
import SectionTwoSlider from "@/components/Home/Section2Slider";
import ContactUsNow from "@/components/FormComponent/ContactUsNow-Form/ContactUsNow";
import Script from "next/script";
import Head from "next/head";
import SectionTwoSliderwp from "../Home/Section2Sliderwp";
interface ServiceTemplate7 {
  data: any;
  // blog: BlogData;
}
const WpService: React.FC<ServiceTemplate7> = ({ data }) => {
  let url = data?.layout?.[0]?.left_content_right_content_whole_bg_img?.url;
  if (url) {
    url = url.replace(
      "https://www.ezheatandair.com/wp-content",
      "http://ezapi.ezheatandair.com"
    );
  }
  // console.log("maindata", data);

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

  // const canonicalUrl = `https://www.ezheatandair.com/${data?.slug}`;

  const schema1 = `
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.ezheatandair.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "${data?.bannerTitle || "Default Title"}"
       
      }
    ]
  }
`;

  const schema11 = `
<script type="application/ld+json">
{
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
    "name": "San Diego Hvac Package Unit"
  }]
}
</script>
`;

  return (
    <>
      {/* <pre>{JSON.stringify(data)}</pre> */}
      {/* <Head>
        <title>{data?.seoTitle || "Default Title"}</title>
        <meta
          name="description"
          content={data?.seoDescription || "Default Description"}
        />
        <meta property="og:title" content={data?.seoTitle || "Default Title"} />
        <meta
          property="og:description"
          content={data?.seoDescription || "Default Description"}
        />
        <meta property="og:image" content={url} />
        <link rel="canonical" href={canonicalUrl} />
        <meta
          property="og:url"
          content={`https://www.ezheatandair.com/${data?.slug}`}
        />
        <meta
          name="twitter:title"
          content={data?.seoTitle || "Default Title"}
        />
        <meta
          name="twitter:description"
          content={data?.seoDescription || "Default Description"}
        />
        <meta name="twitter:image" content={url} />

       
      </Head> */}

      <div className="services">
        <header className="breadcrumbs px-0">
          <Script
            id="script2"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: schema1 }}
          ></Script>
          <div className="container">
            <div className="breadcrumb-col">
              <div className="home-breadcrumb">
                <Link href="/" className="homes">
                  Home 
                </Link>
                <Image
                  loading="lazy"
                  alt=""
                  src="/templates/chevronrightdouble.svg"
                  width={24}
                  height={24}
                />
                <span className="about-us1">{data?.slug}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Banner Section start */}

        <section
          className="banner max-container pad-60"
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
              zIndex: 0,
            }}
          />
          <Image
            src={url}
            alt={""}
            style={{ objectFit: "cover", objectPosition: "top", zIndex: -1 }}
            fill
            priority={true}
            className=""
          />{" "}
          <div
            className="container"
            style={{ zIndex: "1", position: "relative" }}
          >
            <div className="row">
              <div className="col-lg-7 col-md-7">
                <h1 className="immediate-slab-leak">{data?.title}</h1>

                <div
                  className="slab-leak-detection"
                  dangerouslySetInnerHTML={{
                    __html: data?.layout && data?.layout[0]?.left_content,
                  }}
                ></div>
              </div>
              <div className="col-lg-5 col-md-5">
                <ContactUsNow />
              </div>
            </div>
          </div>
        </section>

        {/* Banner Section end */}

        <AvailableService />

        {/*  Section 2  start*/}

        {data?.layout && (
          <section className="pad-60 img-disc-wrapper">
            <div className="container">
              {data?.layout.map((val: any, index: any) => {
                // console.log("vallllll", val.full_row_title_left_img_right_content_right_side_content);
                if (
                  val.acf_fc_layout === "full_row_title_left_img_right_content"
                ) {
                  let url =
                    val?.full_row_title_left_img_right_content_left_side_image
                      ?.url;
                  if (url) {
                    url = url.replace(
                      "https://www.ezheatandair.com/wp-content",
                      "http://ezapi.ezheatandair.com"
                    );
                    // console.log("notee", url);
                  }

                  return (
                    <div key={index}>
                      <div className="image-container">
                        <div className="col-lg-12 mb-2">
                          <div
                            className="info-columns"
                            dangerouslySetInnerHTML={{
                              __html:
                                val?.full_row_title_left_img_right_content_title,
                            }}
                          ></div>
                        </div>
                        <div className="row gx-3 gy-4">
                          <div className="col-lg-6 text-center">
                            <Image
                              className="installing-ceramic-floor-tiles-icon"
                              loading="lazy"
                              alt=""
                              src={
                                url ||
                                val
                                  ?.full_row_title_left_img_right_content_left_side_image
                                  ?.url
                              }
                              width={719}
                              height={719}
                            />
                          </div>

                          <div className="col-lg-6">
                            <div
                              className="info-columns"
                              dangerouslySetInnerHTML={{
                                __html:
                                  val?.full_row_title_left_img_right_content_right_side_content,
                              }}
                            ></div>
                          </div>

                          <div className="col-lg-12">
                            <div
                              className="info-columns"
                              dangerouslySetInnerHTML={{
                                __html:
                                  val?.full_row_title_left_img_right_content_full_row_content,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </section>
        )}

        {/*  Section 2  end*/}

        {/*  Section 4  start*/}

        {data.layout && (
          <section className="slider-wrapper pad-60">
            <div className="container">
              {data.layout &&
                data.layout.map((val: any, index: any) => {
                  return (
                    <>
                      <div>
                        {val.acf_fc_layout ===
                          "full_row_title_repeater_content" && (
                          <div
                          // className="row g-3"
                          >
                            <div
                              className="info-columns"
                              dangerouslySetInnerHTML={{
                                __html:
                                  val?.full_row_title_repeater_content_title,
                              }}
                            ></div>

                            <div className="service-boxes">
                              <SectionTwoSliderwp
                                data={
                                  val?.full_row_title_repeater_content_repeater_content
                                }
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  );
                })}
            </div>
          </section>
        )}

        {/*  Section 4  end*/}

        {/* new tem */}

        {data.layout && (
          <section className="image-disc-wrapper ">
            <div className="container">
              {data.layout.map((val: any, index: any) => {
                // Check if the layout is "left_content_right_img"
                if (val.acf_fc_layout === "left_content_right_img") {
                  let imageUrl = val?.left_content_right_img_right_img?.url;
                  if (imageUrl) {
                    // Replace the URL if it contains the original base
                    imageUrl = imageUrl.replace(
                      "https://www.ezheatandair.com/wp-content",
                      "http://ezapi.ezheatandair.com"
                    );
                    console.log("Modified image URL:", imageUrl);
                  }

                  return (
                    <div key={index}>
                      <div className="image-container">
                        <div className="row g-3">
                          {/* Left Content Section */}
                          <div className="col-lg-6">
                            <div
                              className="info-columns"
                              dangerouslySetInnerHTML={{
                                __html:
                                  val?.left_content_right_img_left_content,
                              }}
                            ></div>
                          </div>

                          {/* Right Image Section */}
                          <div className="col-lg-6 text-center">
                            <Image
                              className="installing-ceramic-floor-tiles-icon"
                              loading="lazy"
                              alt=""
                              src={
                                imageUrl ||
                                val?.left_content_right_img_right_img?.url
                              }
                              width={570}
                              height={700}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </section>
        )}

        {/*  Section 5  start*/}

        {data.layout && (
          <section className="why-section-wrapper ">
            {data.layout &&
              data.layout.map((val: any, index: any) => {
                // console.log("full_row22",val)
                return (
                  <>
                    <div>
                      {val.acf_fc_layout === "full_row" && (
                        <div>
                          {/* <h1
                            className="info-columns"
                            dangerouslySetInnerHTML={{
                              __html: val?.left_content_right_img_left_title,
                            }}
                          ></h1> */}

                          <div
                            dangerouslySetInnerHTML={{
                              __html: val?.full_row_content,
                            }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </>
                );
              })}
          </section>
        )}

        <Testimonials />

        {/*  Section 5  end*/}
      </div>
      {data.schema
        .filter((val: any) => val != null)
        .map((val: any, index: any) => {
          // console.log("shhhhhhhhh", val);

          const jsonLdString = JSON.stringify(val);

          return (
            <Script
              key={index}
              id={`script1${index}`}
              type="application/ld+json"
              className="rank-math-schema"
              dangerouslySetInnerHTML={{ __html: jsonLdString }}
            />
          );
        })}

      {/* <Script id="script1" type="application/ld+json" className="rank-math-schema" dangerouslySetInnerHTML={{ __html: schemarankMath }}>
      </Script>
      <Script id="script2" type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema2 }}>
      </Script>
      <Script id="script3" type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema3 }}>
      </Script>
      <Script id="script6" type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema6 }}>
      </Script>
      {faq && faq.length > 0 && faq[0].question &&
        <Script
          id="script8"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faq.map((item: any) => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": item.answer
                }
              }))
            })
          }}
        />} */}
    </>
  );
};

export default WpService;
