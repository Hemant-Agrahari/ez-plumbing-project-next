"use client"; // This ensures this component is a Client Component

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  LinkedinShareButton,
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
} from "react-share";
import Image from "next/image";

const BlogShare = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [data, setData] = useState<string>("");

  const url = `https://www.ezheatandair.com//${pathname}${searchParams ? `?${searchParams.toString()}` : ""}`;
console.log(url)
  useEffect(() => {
    const getContentFromMainTitle = () => {
      const mainTitle = document.querySelector(".why-do-slab1");

      // Check if the element exists and log its content
      if (mainTitle) {
        const content = mainTitle.textContent?.trim();
        setData(content || "Default Title"); // Set fallback if content is empty
      } else {
        console.log("No breadcrumb element found.");
        setData("Default Title");
      }
    };

    getContentFromMainTitle();
  }, []); 

  return (
    <div className="blog-share-wrapper pt-0">
      <div className="container">
        <p className="com-para">Share This Article</p>
        <div className="share-group">
          <span className="icon-box">
            <FacebookShareButton
              url={url}
            >
              <Image
                src="/images/facebook-share-icon.svg"
                alt="facebook"
                width={32}
                height={32}
                title="Share on Facebook"
              />
            </FacebookShareButton>
          </span>
          <span className="icon-box">
            <TwitterShareButton
              url={url}
              title={data || "Check out this blog post!"}
            >
              <Image
                src="/images/twitter-share-icon.svg"
                alt="twitter"
                width={32}
                height={32}
                title="Share on X"
              />
            </TwitterShareButton>
          </span>
          <span className="icon-box">
            <LinkedinShareButton
              url={url}
              title={data || "Check out this blog post!"}
            >
              <Image
                src="/images/linkedin-share-icon.svg"
                alt="linkedin"
                width={32}
                height={32}
                title="Share on LinkedIn"
              />
            </LinkedinShareButton>
          </span>
          <span className="icon-box">
            <EmailShareButton
              url={url}
              subject={data || "Check out this blog post!"}
              body={`Hey, check out this blog post: ${url}`}
            >
              <Image
                src="/images/email-share-icon.svg"
                alt="email"
                width={32}
                height={32}
                title="Share on Email"
              />
            </EmailShareButton>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogShare;
