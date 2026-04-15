"use client";
import React from "react";
import Slider from "react-slick";

export const AvailableService = ({ data }: any) => {
  const sliderserviceSettings = {
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 2,
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const staticServiceData = [
    {
      serviceSliderImage: "/images/247-service.png",
      cardTitle: "24/7",
      cardSubTitle: "Service",
      cardContent: "Same-day Plumbing Service For Any Issue Or Concern Related To Leakage, Clogging, Or Malfunctioning Of Appliances."
    },
    {
      serviceSliderImage: "/images/free-estimate.png",
      cardTitle: "FREE",
      cardSubTitle: "Estimate",
      cardContent:
        "Request a quote and get a free estimate for installation, repair, and replacement services from professionals",
    },
    {
      serviceSliderImage: "/images/free-service-call.png",
      cardTitle: "FREE",
      cardSubTitle: "Service Call",
      cardContent:
        "From plumbing repairs to full replacements, connect with our experts to inquire about services at zero charges",
    },
    {
      serviceSliderImage: "/images/discount-available.png",
      cardTitle: "15%",
      cardSubTitle: "Discount Available",
      cardContent: "15% Off to the Police, Military, Fire Seniors and Teachers for Services up to $1000."
    },
    {
      serviceSliderImage: "/images/finance-service.png",
      cardTitle: "FINANCING",
      cardSubTitle: "Available",
      cardContent: "Overcome financial barriers and keep your plumbing system up to date with our alternative financing options."
    }
  ];
  return (
    <div className="service-section py-50 w-100">
      <div className="container">
        <Slider {...sliderserviceSettings} className="service-slider">
          {staticServiceData.map((service: any, index) => (
            <div key={index} className="service-col">
              <div className="service-icon">
                <img
                  src={service.serviceSliderImage}
                  alt={service.cardTitle}
                  width="50"
                  height="50"
                />
              </div>
              <div className="service-name">
                <span className="card-title">{service.cardTitle}</span>
                <span className="card-sub-title">{service.cardSubTitle}</span>
                {service.subtitle}
              </div>
              <p className="dec mb-0">{service.cardContent}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default AvailableService;
