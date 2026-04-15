"use client";
import React from "react";
import Slider from "react-slick";

const SectionTwoSliderwp = ({ data }: any) => {
  console.log("dataslider", data);
  const sliderblogsSettings = {
    infinite: true,
    autoPlay: true,
    dots: true,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    margin: 30,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3.2,
          slidesToScroll: 3,
          autoplay: true,
          autoplaySpeed: 2000,
          dots: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2.2,
          slidesToScroll: 2,
          autoplay: true,
          autoplaySpeed: 2000,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
          dots: true,
        },
      },
    ],
  };
  return (
    <>
      <Slider {...sliderblogsSettings} className="w-100">
        {data &&
          data.map((item: any, index: any) => {
            // Extracting and replacing the image URLs in the content HTML string
            let updatedContent = item.content;

            // Regular expression to match all image src URLs in the content
            const regex = /<img[^>]+src="([^">]+)"/g;

            // Replacing the base URL part in all image src URLs found
            updatedContent = updatedContent.replace(
              regex,
              (match: any, src: any) => {
                // Replace the base URL part with the new URL
                const updatedSrc = src.replace(
                  "https://www.ezheatandair.com/wp-content/",
                  "https://ezapi.ezheatandair.com/"
                );

                // Return the updated <img> tag with the new src
                return match.replace(src, updatedSrc);
              }
            );

            return (
              <div className="slab-leak-detection-box" key={index}>
                <div
                  className="details w-100"
                  dangerouslySetInnerHTML={{ __html: updatedContent }} // Inject the updated HTML content
                ></div>
              </div>
            );
          })}
      </Slider>
    </>
  );
};

export default SectionTwoSliderwp;
