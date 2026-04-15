import React from "react";
import "@/styles/templates-global.css";
import "./thankyou.css"
import InsuranceLogos from "@/components/Home/InsuranceLogos";
export const metadata = {
  title: 'Thank you - EZplumbingusa',
  alternates: {
    canonical: 'https://www.ezplumbingusa.com/thank-you',
  },
  // keywords: blogData.tags,
  publisher: 'EZplumbingusa',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    locale: 'en_US',
    type: 'article',
    title: 'Thank you - EZplumbingusa',
    url: 'https://www.ezplumbingusa.com/thank-you',
    site_name: 'EZplumbingusa',
    published_time: '2024-09-16T08:13:13+00:00',
    // images: [
    //   {
    //     url: `https://www.ezplumbingusa.com${blogData.bannerImage}`,
    //     width: 825,
    //     height: 388,
    //     type: 'image/jpeg',
    //   },
    // ],
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    label1: 'Est. reading time',
    data1: '6 minutes',
  },
};
// if (data.data.author && Object.keys(data.data.author).length > 0) {
//   metadata.authors = [{ name: `${data.data.author.bannerTitle}` }];
//   metadata.creator = `${data.data.author.bannerTitle}`;
//   metadata.twitter.label1 = 'Written by';
//   metadata.twitter.data1 = `${data.data.author.bannerTitle}`;
// }

const ThankYou = () => {
  // console.log(data, "asdsad");

  return (
    <>
      <section className="thankyou-wrapper">
        <div className="container px-0">
          <h1 className="main-title">
            Thank You
          </h1>
          <p className="com-para">
            Thank you for contacting us. We value your time and we will get back with you as quickly as possible.
          </p>
        </div>
      </section>
      <div className="thankyou-insurance-wrapper">
        <InsuranceLogos />
      </div>

      {/* <InsuranceLogos /> */}
    </>
  );
};
export default ThankYou;