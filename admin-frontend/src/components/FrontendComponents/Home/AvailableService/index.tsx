"use client";
import React from "react";
import Slider from "react-slick";

export const AvailableService = ({ data }: { data: { serviceSlider: Array<any> } }) => {
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
      serviceSliderImage: "/upload/media/247-service.png",
      cardTitle: "24/7",
      cardSubTitle: "Service",
      cardContent: "Same-day Plumbing Service For Any Issue Or Concern Related To Leakage, Clogging, Or Malfunctioning Of Appliances."
    },
    {
      serviceSliderImage: "/upload/media/free-estimate.png",
      cardTitle: "FREE",
      cardSubTitle: "Estimate",
      cardContent: "Request A Quote And Get A Free Estimate For Installation, Repair, And Replacement Services From Professionals."
    },
    {
      serviceSliderImage: "/upload/media/free-service-call.png",
      cardTitle: "FREE",
      cardSubTitle: "Service Call",
      cardContent: "From Plumbing Repairs To Full Replacements, Connect With Our Experts To Inquire About Services At Zero Charges."
    },
    {
      serviceSliderImage: "/upload/media/discount-available.png",
      cardTitle: "15%",
      cardSubTitle: "Discount Available",
      cardContent: "15% Off To The Police, Military, Fire Seniors, And Teachers For Services Up To $1000."
    },
    {
      serviceSliderImage: "/upload/media/247-service (1).png",
      cardTitle: "FINANCING",
      cardSubTitle: "Available",
      cardContent: "Overcome Financial Barriers And Keep Your Plumbing System Up-to-date With Our Alternative Financing Options."
    }
  ];
  // console.log(JSON.stringify(data.serviceSlider), "asdasd")
  return (
    <div className="service-section py-50 w-100">
      <div className="container">
        <Slider {...sliderserviceSettings} className="service-slider">
          {staticServiceData.map((service: any, index) => (
            <div key={index} className="service-col">
              <div className="service-icon">
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${service.serviceSliderImage}`}
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
              <p className="dec mb-0">
                {service.cardContent}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default AvailableService;

{/* {data.serviceSlider && data.serviceSlider.map((service, index) => ( */ }
{/* <div key={index} className="service-col">
              <div className="service-icon">

                <img
                  src={
                    service.serviceSliderImage instanceof File
                      ? URL.createObjectURL(service?.serviceSliderImage)
                      : `${process.env.NEXT_PUBLIC_BACKEND_URL}${service.serviceSliderImage}`
                  }
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
              <p className="dec mb-0">
                {service.cardContent}
              </p>
            </div>
          ))} */}