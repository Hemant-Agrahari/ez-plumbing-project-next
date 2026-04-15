import React from "react";
import "@/styles/templates-global.css";
import "./blog-listing.css";
import ClientComponent from "@/components/Miscellanous/ClientComponent";
import { Metadata } from "next";
import { API_URL } from "@/helper/constant";
export async function generateMetadata({ params }: { params: { category: string } }) {
  const res = await fetch(
    `${API_URL}/getCategoriesBlog/?pageIndex=1&pageSize=10&search=&slug=${params.category}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  // console.log("HELLLLLLLLLLOOOOO", data.data[0].categories[0].title)
  // if (data) {
  //   const categories = data.data[0].categories[0];
  //   const metadata: any = {
  //     title: `Latest ${categories?.title} Articles - EZ Plumbing USA` || 'Articles - EZ Plumbing USA',
  //     description: `Stay updated with the latest ${categories?.title} news from EZ Plumbing USA, featuring helpful insights on current events and trends in the plumbing industry. Stay updated with the latest Slab Leak news from EZ Plumbing USA, featuring helpful insights on current events and trends in the plumbing industry.` || 'Articles - EZ Plumbing USA',
  //     alternates: {
  //       canonical: `https://www.ezplumbingusa.com/${categories.slug}`,
  //     },
  //     // keywords: blogData.tags,
  //     publisher: 'EZplumbingusa',
  //     formatDetection: {
  //       email: false,
  //       address: false,
  //       telephone: false,
  //     },
  //     openGraph: {
  //       locale: 'en_US',
  //       type: 'article',
  //       title: `Latest ${categories?.title} Articles - EZ Plumbing USA` || 'Articles - EZ Plumbing USA' || 'Blog',
  //       description: `Stay updated with the latest ${categories?.title} news from EZ Plumbing USA, featuring helpful insights on current events and trends in the plumbing industry. Stay updated with the latest Slab Leak news from EZ Plumbing USA, featuring helpful insights on current events and trends in the plumbing industry.`,
  //       url: `https://www.ezplumbingusa.com/${categories.slug}`,
  //       site_name: 'EZplumbingusa',
  //       published_time: '2024-09-16T08:13:13+00:00',
  //       // images: [
  //       //   {
  //       //     url: `https://www.ezplumbingusa.com${blogData.bannerImage}`,
  //       //     width: 825,
  //       //     height: 388,
  //       //     type: 'image/jpeg',
  //       //   },
  //       // ],
  //     },
  //     robots: {
  //       index: true,
  //       follow: true,
  //       // nocache: false,
  //       googleBot: {
  //         index: true,
  //         follow: false,
  //         noimageindex: true,
  //         'max-video-preview': -1,
  //         'max-image-preview': 'large',
  //         'max-snippet': -1,
  //       },
  //     },
  //     twitter: {
  //       card: 'summary_large_image',
  //       label1: 'Est. reading time',
  //       data1: '6 minutes',
  //     },
  //   };
  //   // if (data.data.author && Object.keys(data.data.author).length > 0) {
  //   //   metadata.authors = [{ name: `${data.data.author.bannerTitle}` }];
  //   //   metadata.creator = `${data.data.author.bannerTitle}`;
  //   //   metadata.twitter.label1 = 'Written by';
  //   //   metadata.twitter.data1 = `${data.data.author.bannerTitle}`;
  //   // }
  //   return metadata;
  // }

}
const Page = ({ params }: { params: { category: string } }) => {
  return (
    <>
      <ClientComponent params={params} />
    </>
  );
};

export default Page;
