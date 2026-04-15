import Link from "next/link";
import React from "react";

export const AdditionalServices = () => {
  return (
    <section className="installation-repair additional-services my-60">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-sm-12 col-lg-6 col-xl-6 left-col">
            <img
              src="/images/additional-services.png"
              alt=""
              width="570"
              height="636"
              className="w-100"
            />
            <div className="additional-services-info">
              <p className="additional-services-dec">
                Hire Us Today for Expert HVAC Solutions!
              </p>
              <div className="additional-services-title">
                Call Us Today at
                <a href="tel:+17603899117" className="call">
                  (844) 755-7889
                </a>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-lg-6 col-xl-6 mt-4 pt-3 pt-lg-0 mt-lg-0">
            <h2 className="title mb-3 mb-lg-4">
              Explore Our Additional Services
            </h2>
            <h3 className="semi-small-title mb-2 mb-xl-3">
              1. Air Purification Systems
            </h3>
            <p className="dec">
              Breathe easy with our air purification systems. We install
              high-quality filters that remove allergens, dust, and pollutants,
              enhancing your indoor air quality and creating a healthier living
              environment.
            </p>
            <h3 className="semi-small-title mb-2 mb-xl-3">
              2. Thermostat Installation
            </h3>
            <p className="dec">
              Upgrade your home’s comfort with smart thermostat installation.
              Our team ensures precise installation of energy-efficient systems
              that allow you to control your home&apos;s temperature from
              anywhere, optimizing energy use.
            </p>
            <h3 className="semi-small-title mb-2 mb-xl-3">
              3. Ductwork Installation & Repair
            </h3>
            <p className="dec">
              Our ductwork services ensure optimal airflow and system
              efficiency. Whether you need installation for a new home or
              repairs for existing ducts, we guarantee seamless, professional
              service to enhance HVAC performance.
            </p>
            <h3 className="semi-small-title mb-2 mb-xl-3">
              4. Insulation Services
            </h3>
            <p className="dec mb-0">
              Proper insulation improves energy efficiency and comfort. We offer
              expert insulation installation and upgrades, ensuring your home
              stays warm in winter and cool in summer while reducing energy
              costs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdditionalServices;
