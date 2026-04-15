"use client";
import React from "react";
import Slider from "react-slick";

const SectionTwoSlider = ({ data }: any) => {
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
          data.card.map((item: any, index: any) => {
            return (
              <div className="slab-leak-detection-box" key={index}>
                <div className="slab-leak-detection-box-child"> </div>
                <b className="slab-leak-detection1"> {item?.cardTitle} </b>
                <div
                  className="details w-100"
                  dangerouslySetInnerHTML={{ __html: item.cardText }}
                ></div>
              </div>
            );
          })}
      </Slider>
    </>
  );
};

export default SectionTwoSlider;
