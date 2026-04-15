import Link from "next/link";
import React from "react";

export const PlumbingServices = () => {
  return (
    <section className="services my-60">
      <div className="container">
        <h2 className="title mb-3 mb-lg-4 text-start text-md-center">
          Superior Plumbing Services Offered By <br />
          Our Certified Professionals Count On Us For
        </h2>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-4 mt-3 mt-lg-0 mt-xl-0">
            <Link href="#" target="_blank">
              <div className="service-item">Drain Snaking Service</div>
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-3 mt-lg-0 mt-xl-0">
            <Link href="#" target="_blank">
              <div className="service-item">Slab Leak Repair</div>
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-3 mt-lg-0 mt-xl-0">
            <Link href="#" target="_blank">
              <div className="service-item">Backflow Preventers</div>
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-3">
            <Link href="#" target="_blank">
              <div className="service-item">Plumbing Drain Repair</div>
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-3">
            <Link href="#" target="_blank">
              <div className="service-item">Water Heater Repair</div>
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-3">
            <Link href="#" target="_blank">
              <div className="service-item">Qest Plumbing</div>
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-3">
            <Link href="#" target="_blank">
              <div className="service-item">Drain Maintenance Services</div>
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-3">
            <Link href="#" target="_blank">
              <div className="service-item">Gas Leak Repair</div>
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-3">
            <Link href="#" target="_blank">
              <div className="service-item">Garbage Disposal Installation</div>
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-3">
            <Link href="#" target="_blank">
              <div className="service-item">Hydro Jetting</div>
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-3">
            <Link href="#" target="_blank">
              <div className="service-item">Gas Line Repiping</div>
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-3">
            <Link href="#" target="_blank">
              <div className="service-item">Toilets Repair</div>
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-3">
            <Link href="#" target="_blank">
              <div className="service-item">Sewer Camera Inspection</div>
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-3">
            <Link href="#" target="_blank">
              <div className="service-item">Sink Installation</div>
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-3">
            <Link href="#" target="_blank">
              <div className="service-item">Residential Plumbing</div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlumbingServices;
