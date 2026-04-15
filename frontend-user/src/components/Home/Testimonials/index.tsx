"use client";
import React from "react";
import Slider from "react-slick";

const Testimonials = ({ data }: any) => {
  const slidertestimonialsSettings = {
    infinite: false,
    slidesToShow: 2,
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const staticTestimonials = [
    {
      rating: "5",
      testimonialContent:
        <>"I’ve been using their <strong> air conditioner maintenance</strong> service for years, and it’s always top-notch. Their team is quick, professional, and thorough. They ensure my AC is running smoothly and efficiently, saving me money on energy bills. Highly recommend them for all HVAC needs!"</>,
      testimonialImage: "/upload/media/Google-Profile-3a.jpg",
      testimonialName: "Sarah M. - San Diego",
    },
    {
      rating: "5",
      testimonialContent:
       <>"Excellent service! I called for <strong> air conditioner maintenance</strong> before summer, and their technician arrived right on time. They cleaned the filters, checked everything, and ensured my AC was in perfect condition. It’s running great, and I haven’t had any issues since!"</> ,
      testimonialImage: "/upload/media/Google-profile-2.jpg",
      testimonialName: "John L. - Riverside",
    },
    {
      rating: "5",
      testimonialContent:
      <>  "We needed <strong> emergency HVAC services</strong>, and they were there in no time. Their services are exceptional, and the team is always friendly and professional. They make sure everything is working perfectly and provide helpful tips to keep our system running smoothly."</>,
      testimonialImage: "/upload/media/Google-Profile5.jpg",
      testimonialName: "Amanda R. - Orange County",
    },
    {
      rating: "5",
      testimonialContent:
       <> "I’ve had my air conditioner maintained by this company for years. They always provide great service, and my system runs efficiently because of their routine checks. Their team is knowledgeable, and I always feel confident in their work. I wouldn’t trust anyone else for my HVAC needs."</>,
      testimonialImage: "/upload/media/screenshot-1.png",
      testimonialName: "Mark T. - San Diego",
    },
  ];
  return (
    <section className="testimonials pad-60 w-100">
      <div className="container">
        <h2 className="title mb-3 mb-lg-4 text-center">What Our Clients Say About Us</h2>
        <Slider {...slidertestimonialsSettings} className="testimonials-slider">
          {staticTestimonials.map((testimonial, index) => (
            <div key={index} className="testimonials-col">
              <div className="reviews d-flex">
                {Array.from({ length: Number(testimonial.rating) }).map(
                  (_, i) => (
                    <img
                      key={i}
                      src="/images/star.jpg"
                      alt="review star"
                      width="60"
                      height="60"
                    />
                  )
                )}
              </div>
              <p className="dec mt-4 pb-1 pt-1">
                {testimonial.testimonialContent}
              </p>
              {/* <div className="testimonial-img">
                {testimonial.testimonialImage && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${testimonial.testimonialImage}`}
                    width="79"
                    height="79"
                    alt={`${testimonial.testimonialName}'s testimonial`}
                  />
                )}
              </div> */}
              <span className="client-name mt-4">
                {testimonial.testimonialName}
              </span>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
