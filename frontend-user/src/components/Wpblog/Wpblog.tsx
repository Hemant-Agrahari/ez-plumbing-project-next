import React from "react";
import "./blog-detail.css";
import Link from "next/link";
// import SliderCompo from "./slider";
// import Recentposts from "./recentPosts";
// import TexttoSpeech from "./textToSpeech";
import Script from "next/script";
import GetCategories from "../Templates/BlogTemplate/Categories";
import Head from "next/head";
import Recentposts from "../Templates/BlogTemplate/recentPosts";
import TexttoSpeech from "../Templates/BlogTemplate/textToSpeech";
import SliderCompo from "../Templates/BlogTemplate/slider";
import BlogShare from "../Blog/BlogShare/BlogShare";
export default async function Wpblog({
  data,
  relatedBlogData,
  authorData,
}: any) {
  // if (data?.schema[0]) {
  //   const index = data.schema.findIndex((schemaString: any) =>
  //     schemaString.includes('@type": "FAQPage"')
  //   );

  //   const FaqSchema = index !== -1 ? data.schema[index] : null;

  //   // Remove <script type="application/ld+json"> and </script>
  //   var cleanedFaqSchema = FaqSchema
  //     ? FaqSchema.replace(
  //         /<script type="application\/ld\+json">\s*/,
  //         ""
  //       ).replace(/\s*<\/script>/, "")
  //     : null;
  // }
  if (!data) {
    console.error("No data received.");
    return <div>Error: No data available</div>;
  }

  // console.log("mydata66", data);

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
    createdAt: formatDate(data?.createdAt),
    updatedAt: formatDate(data?.updatedAt),
  };

  const schemarankMath = `{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.ezheatandair.com/#organization",
        "name": "EZ Heat and Air",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.ezheatandair.com/images/ez-brand-logo.svg",
          "caption": "EZ Heat and Air",
          "inLanguage": "en-US"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.ezheatandair.com/#website",
        "url": "https://www.ezheatandair.com/",
        "name": "EZ Heat and Air",
        "publisher": {
          "@id": "https://www.ezheatandair.com/#organization"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "ImageObject",
        "@id": "https://www.ezheatandair.com/images/ez-brand-logo.svg",
        "url": "https://www.ezheatandair.com/images/ez-brand-logo.svg",
        "width": "80",
        "height": "80",
        "inLanguage": "en-US"
      },
      {
        "@type": "Person",
        "@id": "https://www.ezheatandair.com/author/michael-cabral/",
        "name": "Michael Cabral",
        "image": {
          "@type": "ImageObject",
          "url": "https://www.ezheatandair.com/wp-content/uploads/2021/05/aut-avtar.jpg",
          "caption": "EZ Heat and Air",
          "inLanguage": "en-US"
        },
        "sameAs": [
          "https://www.ezheatandair.com/"
        ],
        "worksFor": {
          "@id": "https://www.ezheatandair.com/#organization"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://www.ezheatandair.com/${data?.slug}/#webpage",
        "url": "https://www.ezheatandair.com/${data?.slug}/",
        "name": "${data?.bannerTitle}",
        "datePublished": "${dataDate.createdAt}",
        "dateModified": "${dataDate.updatedAt}",
        "author": {
          "@id": "https://www.ezheatandair.com/author/michael-cabral/"
        },
        "isPartOf": {
          "@id": "https://www.ezheatandair.com/#website"
        },
        "primaryImageOfPage": {
          "@id": "https://www.ezheatandair.com/images/ez-brand-logo.svg"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "Article",
        "headline": "${data?.bannerTitle}",
        "datePublished": "${dataDate.createdAt}",
        "dateModified": "${dataDate.updatedAt}",
        "author": {
          "@type": "Person",
          "name": "Michael Cabral"
        },
        "description": "${data?.seoDescription}",
        "name": "${data?.bannerTitle}",
        "@id": "https://www.ezheatandair.com/${data?.slug}/#schema-16882",
        "isPartOf": {
          "@id": "https://www.ezheatandair.com/${data?.slug}/#webpage"
        },
        "publisher": {
          "@id": "https://www.ezheatandair.com/#organization"
        },
        "image": {
          "@id": "https://www.ezheatandair.com/images/ez-brand-logo.svg"
        },
        "inLanguage": "en-US",
        "mainEntityOfPage": {
          "@id": "https://www.ezheatandair.com/${data?.slug}/#webpage"
        }
      }
    ]
  }
  `;

  const schema2 = `{
    "@type": "BreadcrumbList",
    "@id": "https://www.ezheatandair.com/${data?.slug}/#breadcrumb",
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
        "name": "Blog",
        "item": "https://www.ezheatandair.com/blog/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "${data?.categories[0].name}",
        "item": "${data?.categories[0].slug}"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "${data?.bannerTitle}"
      }
    ]
  }`;

  return (
    <>
      <Head>
        <meta name="robots" content={`${data?.template}`} />
      </Head>
      {/* <pre>{JSON.stringify(data)}</pre> */}
      <div className="blog-detail-page">
        <div className="breadcrumbs4 px-0">
          <div className="container">
            <div className="breadcrumbs5">
            <div className="home-group">
                <Link href="/" className="home7">
                  Home
                </Link>
                <img
                  className="chevron-right-double-icon3"
                  loading="lazy"
                  alt=""
                  src="/templates/chevronrightdouble.svg"
                  width={24}
                  height={24}
                />
                <Link
                  style={{ fontWeight: "normal" }}
                  href="/blog"
                  className="latest-news"
                >
                  Blog
                </Link>
                <img
                  className="chevron-right-double-icon4"
                  alt=""
                  src="/templates/chevronrightdouble.svg"
                  width={24}
                  height={24}
                />
                {data.categories &&
                  data.categories.map((item: any, index: number) => {
                    return (
                      <>
                        <Link
                          style={{ fontWeight: "normal" }}
                          href={`/category/${item?.slug}`}
                          className="latest-news"
                        >
                          {item?.title}
                        </Link>
                        {index < data.categories.length - 1 && ", "}
                      </>
                    );
                  })}
                <img
                  className="chevron-right-double-icon4"
                  alt=""
                  src="/templates/chevronrightdouble.svg"
                  width={24}
                  height={24}
                />
              </div>
              <div className="why-do-slab-leaks-occur-mostly-wrapper">
                <div className="why-do-slab">{data?.bannerTitle} </div>
              </div>
            </div>
          </div>
        </div>
        <main className="container blog-details">
          <div className="frame-main px-0">
            <section className="why-do-slab-leaks-occur-mostly-parent">
              <div className="title-wrapper">
                <h1 className="why-do-slab1">
                  {data?.bannerTitle}
                  {/* {data && data?.title.rendered} */}
                </h1>
                <TexttoSpeech />
              </div>
              <div className="h-0 justify-content-end">
                    
                      Publish Date :{" "}
                      {new Date(data.createdAt)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, "-")} 
                      <p className="com-para">
                        Views : <span>{data.view || "200"}</span>
                      </p>
                    </div>
              <img
                className="img-why-do-slab-leaks-occur-mo"
                loading="lazy"
                alt="" // Fallback image
                // src="https://ezapi.ezplumbingusa.com/upload/media/HVAC%20and%20Plumbing%20How%20They%20Work%20Together%20for%20Home%20Comfort_11zon.png"
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${data?.bannerImage}`}
                width={708}
                height={333}
              />
              <div className="blog-contact">
                    <a href="tel:+7603899117" className="blog-num">(760) 389-9117</a>
                    <Link className="blog-contact-btn" href={"/contact-us"}>Schedule An Appointment</Link>
                  </div>
              {/* <div className="text-parent" dangerouslySetInnerHTML={{ __html:  data?.bannerContent }}>
              </div> */}
              <div className="frame-parent30">
                {/* {data?.content && data.content.map((item: any, index: any) => ( */}
                <div className="signs-of-a-slab-leak-parent">
                  {/* <h2 className="signs-of-a">
                    {data?.title?.rendered || "Default Title"}
                  </h2> */}
                  <div
                    // className="text50"
                    dangerouslySetInnerHTML={{
                      __html: data?.content || "",
                    }} // Fallback to empty string if content is undefined
                  />
                </div>
                {/* ))} */}
              </div>
            </section>
            <div className="frame-parent32">
              <GetCategories />
              <div className="text-parent1">
                <h3 className="text92">Recent Posts</h3>
                <div className="frame-child45" />
                <div className="recent-posts">
                  <Recentposts />
                </div>
              </div>
            </div>
          </div>
        </main>
        <BlogShare/>
        {/* {authorData && (
          <div className="container">
            <div className="blog-detail-page-inner px-0">
              <div className="frame-parent37">
                <img
                  className="group-icon"
                  loading="lazy"
                  alt=""
                  src={
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}${authorData.bannerImage}` ||
                    "/templates/group-1000008898.svg"
                  }
                  width={120}
                  height={120}
                />
                <div className="frame-parent38">
                  <div className="frame-parent39">
                    <div className="frame-wrapper">
                      <div className="text-parent3">
                        <Link href={authorData?.slug}>
                          <div
                            className="text94"
                            dangerouslySetInnerHTML={{
                              __html: authorData.bannerTitle,
                            }}
                          ></div>
                        </Link>
                        <img
                          className="icon-email"
                          alt=""
                          src={
                            `${process.env.NEXT_PUBLIC_BACKEND_URL}${authorData.iconImage}` ||
                            "/templates/icon-email.svg"
                          }
                          width={44}
                          height={44}
                        />
                      </div>
                    </div>
                    <div
                      className="text95"
                      dangerouslySetInnerHTML={{
                        __html: authorData.bannerSubTitle,
                      }}
                    ></div>
                  </div>
                  <div className="about3">
                    <div
                      className="text96"
                      dangerouslySetInnerHTML={{
                        __html: authorData.contentTitle,
                      }}
                    ></div>
                    <div
                      className="text97"
                      dangerouslySetInnerHTML={{
                        __html: authorData.bannerContent,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )} */}

        {/* {authorData && ( */}
        <div className="container">
          <div className="blog-detail-page-inner px-0">
            <div className="frame-parent37">
              <img
                className="group-icon"
                loading="lazy"
                alt=""
                src="https://ezapi.ezplumbingusa.com/upload/media/angela-louise.png"
                // src={
                //   `${process.env.NEXT_PUBLIC_BACKEND_URL}${authorData.bannerImage}` ||
                //   "/templates/group-1000008898.svg"
                // }
                width={120}
                height={120}
              />
              <div className="frame-parent38">
                <div className="frame-parent39">
                  <div className="frame-wrapper">
                    <div className="text-parent3">
                      <Link href={"/michael-cabral"}>
                        <div
                          className="text94"
                          // dangerouslySetInnerHTML={{
                          //   __html: authorData.bannerTitle,
                          // }}
                        >
                          Michael Cabral
                        </div>
                      </Link>
                      <img
                        className="icon-email"
                        alt=""
                        src="https://ezapi.ezplumbingusa.com/upload/media/icon-email.png"
                        // src={
                        //   `${process.env.NEXT_PUBLIC_BACKEND_URL}${authorData.iconImage}` ||
                        //   "/templates/icon-email.svg"
                        // }
                        width={44}
                        height={44}
                      />
                    </div>
                  </div>
                  <div
                    className="text95"
                    // dangerouslySetInnerHTML={{
                    //   __html: authorData.bannerSubTitle,
                    // }}
                  >
                    Marketing Manager
                  </div>
                </div>
                <div className="about3">
                  <div
                    className="text96"
                    // dangerouslySetInnerHTML={{
                    //   __html: authorData.contentTitle,
                    // }}
                  >
                    About:
                  </div>
                  <div
                    className="text97"
                    // dangerouslySetInnerHTML={{
                    //   __html: authorData.bannerContent,
                    // }}
                  >
                    Michael is a marketing manager at EZ Heat and Air. He loves
                    writing about innovative and hybrid HVAC installation tips.
                    His articles help readers to have valuable insights into the
                    importance of duct cleaning, water heater maintenance and
                    repair, optimum working of thermostat, Mini split and heat
                    pump installation in Orange County. Read articles for more
                    information on keeping your HVAC system in a tip-top
                    condition and lead a hassle-free life.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* )} */}

        <div className="container latest-blog-container">
          <div className="related-posts-parent px-0">
            <h1 className="related-posts">Related Posts</h1>
            <div className="p-0 container">
              <SliderCompo data={relatedBlogData} />
            </div>
          </div>
        </div>
      </div>
      <Script
        id="script1"
        type="application/ld+json"
        className="rank-math-schema"
        dangerouslySetInnerHTML={{ __html: schemarankMath }}
      ></Script>
      <Script
        id="script2"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schema2 }}
      ></Script>
    </>
  );
}
