"use-client"
import React, { useEffect, useState } from "react";
import "@/styles/templates-global.css";
import "@/app/(listing)/blog/blog-listing.css";
import BlogClientComponent from "@/components/Blog/ClientComponent";
export async function generateMetadata() {

  const metadata: any = {
    title: 'Blog - EZheatandair',
    description: '',
    alternates: {
      canonical: 'https://www.ezheatandair.com/blog',
    },
    // keywords: blogData.tags,
    publisher: 'EZheatandair',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      locale: 'en_US',
      type: 'article',
      title: 'Blog - EZheatandair',
      url: 'https://www.ezheatandair.com/blog',
      description: '',
      site_name: 'EZheatandair',
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
      index: true,
      follow: true,
      // nocache: false,
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
  return metadata;
}
const Page = () => {
  return (
    <>
      <BlogClientComponent />
    </>
  );
};

export default Page;
