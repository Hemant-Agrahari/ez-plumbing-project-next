import React, { useEffect, useState } from "react";
import "@/styles/templates-global.css";
import "./blog-listing.css";
import ClientComponent from "@/components/Miscellanous/TagClientComponent";
import { API_URL } from "@/helper/constant";
export async function generateMetadata({ params }: { params: { tag: string } }) {
  const res = await fetch( 
    `${API_URL}/getTagsBlog/?slug=${params.tag}&pageIndex=1&pageSize=10&search=`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  console.log("HELLLLLLLLLLOOOOO", data.data[0].tags)
  const currentTag = data.data[0].tags.filter((item: any) => {
    return item.slug === params.tag;
  });
  // console.log(currentTag);
  if (currentTag) {
    const metadata: any = {
      title: `${currentTag[0]?.title} Archives - EZ Plumbing USA`,
      alternates: {
        canonical: `https://www.ezplumbingusa.com/${currentTag[0].slug}`,
      },
      publisher: 'EZplumbingusa',
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
      },
      openGraph: {
        locale: 'en_US',
        type: 'article',
        title: `${currentTag[0]?.title} Archives - EZ Plumbing USA`,
        url: `https://www.ezplumbingusa.com/${currentTag[0].slug}`,
        site_name: 'EZplumbingusa',
        published_time: '2024-09-16T08:13:13+00:00',
      },
      robots: {
        index: false,
        follow: true,
        // nocache: false,
        googleBot: {
          // index: true,
          // follow: false,
          // noimageindex: true,
          // 'max-video-preview': -1,
          'max-image-preview': 'large',
          // 'max-snippet': -1,
        },
      },
      twitter: {
        card: 'summary_large_image',
        label1: 'Est. reading time',
        data1: '6 minutes',
      },
    };
    return metadata;
  }

}
const Page = ({ params }: { params: { tag: string } }) => {
  return (
    <>
      <ClientComponent params={params} />
    </>

  );
};
export default Page;
