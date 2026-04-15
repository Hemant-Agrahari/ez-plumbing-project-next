"use client";
import { slidertestimonialsSettings, staticTestimonials } from "@/helper/sliderSettings";
import React from "react";
import Slider from "react-slick";

const Testimonials = ({ data }: { data: { testimonials: Array<any> } }) => {

// console.log(JSON.stringify(data.testimonials));
  return (
    <section className="testimonials my-60 w-100">
      <div className="container">
        <h2 className="title mb-3 mb-lg-4 text-center">Testimonials</h2>
        <Slider {...slidertestimonialsSettings} className="testimonials-slider">
          {staticTestimonials.map((testimonial, index) => (
            <div key={index} className="testimonials-col">
              <div className="reviews d-flex">
                {Array.from({ length: Number(testimonial.rating) }).map((_, i) => (
                  <img
                    key={i}
                    src="/images/star.jpg"
                    alt="review star"
                    width="60"
                    height="60"
                  />
                ))}
              </div>
              <p className="dec mt-4 pb-1 pt-1">
                {testimonial.testimonialContent}
              </p>
              <div className="testimonial-img">
                {testimonial.testimonialImage && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${testimonial.testimonialImage}`}
                    width="79"
                    height="79"
                    alt={`${testimonial.testimonialName}'s testimonial`}
                  />
                )}
              </div>
              <span className="client-name mt-4">{testimonial.testimonialName}</span>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
