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
              height="456"
              className="w-100"
            />
            <div className="additional-services-info">
              <p className="additional-services-dec">
                Hire the best plumbing services that provide the best services
                with advanced technologies and a full Guarantee.
              </p>
              <div className="additional-services-title">
                Call Us Today at
                <Link href="tel:+7603899117" className="call">
                  (760) 389 9117
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-lg-6 col-xl-6 mt-4 pt-3 pt-lg-0 mt-lg-0">
            <h2 className="title mb-3 mb-lg-4">
              ADDITIONAL SERVICES PROVIDED BY EZ PLUMBING USA
            </h2>
            <div className="semi-small-title mb-2 mb-xl-3">
              Having a Slab Leak ?
            </div>
            <p className="dec">
              It&apos;s time to act quickly!Immediate slab leak repair from EZ
              Plumbing can save the foundation of your house and help you avoid
              expensive water destruction.
            </p>
            <div className="semi-small-title mb-2 mb-xl-3">
              Avoid Water Damage
            </div>
            <p className="dec">
              Call us for prompt and efficient slab leak detection to avoid
              having water damage ruin your day.
            </p>
            <div className="semi-small-title mb-2 mb-xl-3">
              Having Plumbing Issues?
            </div>
            <p className="dec">
              Relax; we&apos;ll handle it! We are your dependable and quick fix. We
              are here to provide an emergency plumber in San Diego. Are Clogged
              Drains Bothering You? Our commercial plumbers are here to unclog
              them fast. Call EZ Plumbing for prompt and effective drain
              cleaning services.
            </p>
            <div className="semi-small-title mb-2 mb-xl-3">
              Water Heater on Demand
            </div>
            <p className="dec mb-0">
              No more cold showers. Call EZ Plumbing for your water heater
              repair now!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdditionalServices;
