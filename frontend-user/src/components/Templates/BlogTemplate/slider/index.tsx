"use client";
import React from "react";
import Slider from "react-slick";
import RelatedPost from "../../../Blog/RelatedPost";
import { sliderblogsSettings } from "@/helper/sliderSettings";
const SliderCompo = ({ data }: any) => {
  const isWordpress = data?.wordpress;
  //   console.log("isWordpressisWordpress",data)
  // console.log(JSON.stringify(data), "datasliderdatasliderdatasliderdatasliderdatasliderdatasliderdataslider")
  return (
    <>
      <Slider {...sliderblogsSettings} className="latest-blog-slider row">
        {data &&
          data.map((item: any, index: any) => {
            return (
              <>
               
                  <RelatedPost
                    imageSrc={`${process.env.NEXT_PUBLIC_BACKEND_URL}${item.bannerImage}`}
                    altText=""
                    title={item.bannerTitle}
                    linkHref={item.slug}
                  />
               
              </>
            );
          })}
      </Slider>
    </>
  );
};

export default SliderCompo;
