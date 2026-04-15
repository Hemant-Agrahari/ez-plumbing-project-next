import Link from "next/link";
import React from "react";

export const PlumbingServices = () => {
  return (
    <section className="services my-60">
      <div className="container">
        <h2 className="title mb-3 mb-lg-5 text-start text-md-center">
          Top-notch Heat and Air Solutions Delivered by Our Certified Experts
        </h2>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-4 mt-3 mt-lg-0 mt-xl-0">
            <Link href="/24-7-emergency-services/" target="_blank">
              <div className="service-item">24/7 Emergency Services</div>
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-3 mt-lg-0 mt-xl-0">
            <Link href="/san-diego-ductless-heating/" target="_blank">
              <div className="service-item">Ductless Heating Systems</div>
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-3 mt-lg-0 mt-xl-0">
            <Link href="/san-diego-air-conditioning-repair/" target="_blank">
              <div className="service-item">AC Repair</div>
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-3">
            <Link
              href="/san-diego-central-heating-installation/"
              target="_blank"
            >
              <div className="service-item">
                AC Installation and Replacement
              </div>
            </Link>
          </div>

          <div className="col-12 col-md-6 col-lg-4 mt-3">
            <Link href="/san-diego-duct-cleaning-services/" target="_blank">
              <div className="service-item">Duct Cleaning</div>
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-3">
            <Link
              href="/san-diego-water-heater-repair-installation/"
              target="_blank"
            >
              <div className="service-item">Water Heater Repair</div>
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-3">
            <Link
              href="/san-diego-heat-pump-installation-repair/"
              target="_blank"
            >
              <div className="service-item">
                Heating System Installation and Repair
              </div>
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-3 ">
            <Link
              href="/san-diego-tankless-water-heater-repair-installation/"
              target="_blank"
            >
              <div className="service-item">
                Tankless Water Heater Repair & Installation
              </div>
            </Link>
          </div>
         
          <div className="col-12 col-md-6 col-lg-4 mt-3">
            <Link
              href="/orange-county-hvac-repair-installation/"
              target="_blank"
            >
              <div className="service-item">HVAC Repair & Installation</div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlumbingServices;
