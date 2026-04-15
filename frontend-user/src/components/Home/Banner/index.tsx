import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";

const ContactUsNow = dynamic(
  () => import("@/components/FormComponent/ContactUsNow-Form/ContactUsNow")
);

const Banner = () => {
  return (
    <>
      <section
        className="home-banner"
        title="Reliable Heating, Air Conditioner Maintenance and Ventilation Services by Experts in San Diego, Riverside, and Orange County"
      >
        <div className="container">
          <div className="banner-col row justify-content-between">
            <Image
              alt="banner img"
              src="/images/heat-air-banner-img-2.png"
              fill
              loading="eager"
              priority
              style={{
                objectFit: "contain",
                objectPosition: "center",
                zIndex: -1,
              }}
              // className="d-none d-lg-block"
              className="d-none"

            />
            <div className="col-lg-7 col-md-6">
              <div className="banner-content">
                <h1 className="titles">
                  {/* We Offer Professional Plumbers in San Diego, Anaheim, Riverside,
                Los Angeles, Orange County and Irvine */}
                  Reliable Heating and Air Conditioning Services in San Diego, Riverside & Orange County 
                </h1>
                <h2 className="small-title mt-3 mb-3 pb-xl-2">
                Affordable HVAC Services in Your Area
                </h2>
                <p className="dec">
                Maintaining your heating, air conditioning, and ventilation systems is essential for a comfortable and healthy home, especially in San Diego, Riverside, and Orange County. At <strong> EZ Heat and Air</strong>, our comprehensive HVAC and air conditioner maintenance services ensure your systems operate efficiently, reducing the risk of costly breakdowns and high energy bills. 
                </p>
                <p className="dec">
                From cleaning filters and inspecting crucial components to optimizing airflow and checking heating units, we handle every detail with precision to keep your home’s climate control systems running smoothly year-round. In urgent situations, count on our Emergency HVAC Services to restore your cooling system immediately. 
                </p>
                {/* <p className="dec mb-0">
                  Stay comfortable year-round with reliable heating and
                  ventilation services.
                </p> */}
              </div>
            </div>
            <div className="col-lg-5 col-md-6 ">
              <ContactUsNow />
            </div>
          </div>
        </div>
      </section>
      <div className="solutions">
        <div className="container">
          <div className="solutions-contact">
            <div className="solutions-contact-title">
              Call Us 24x7 at 
              <a href="tel:+17603899117" className="call">
              (760) 389 9117
              </a>
            </div>
            <p className="solutions-dec">
              Contact us today for quick maintenance or
              <br />
              emergency services.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
