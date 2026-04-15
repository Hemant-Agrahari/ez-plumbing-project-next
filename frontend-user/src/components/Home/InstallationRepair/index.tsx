import Link from "next/link";
import React from "react";

export const InstallationRepair = () => {
  return (
    <section className="installation-repair my-60">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-sm-12 col-lg-6 col-xl-6 left-col">
            <img
              src="/images/expert-repairman.png"
              alt=""
              width="563"
              height="447"
              className="w-100 h-100 object-fit-cover"
            />
          </div>
          <div className="col-sm-12 col-lg-6 col-xl-6 mt-4 mt-lg-0">
            <h2 className="title mb-3 mb-lg-4">
              Professional Air Conditioner Maintenance and HVAC Solutions in San
              Diego
            </h2>
            <p className="dec">
              Keeping your home comfortable starts with proper{" "}
              <strong>air conditioner maintenance.</strong>
              <br /> Our team ensures your cooling system operates at peak
              efficiency, reducing energy costs and extending its lifespan.
            </p>
            <p className="dec">
              We provide expert{" "}
              <strong>AC installation services in San Diego</strong> for those
              needing new systems. Whether upgrading an outdated unit or setting
              up a system for a new home, we guarantee precision and
              performance.
            </p>
            <p className="dec">
              When temperatures drop, count on us for reliable{" "}
              <strong>Furnace Repair in San Diego</strong> to keep your heating
              system running smoothly. Our comprehensive HVAC services ensure
              year-round comfort for your family.
            </p>
            <p className="dec mt-2 mb-0">
              With years of experience and a commitment to excellence, we’re
              your go-to partner for all HVAC needs. Contact us today for
              customized solutions that fit your requirements.
            </p>

            <div className="text-center text-lg-start">
              <Link href="/about-us">
                <button
                  className="btn btn-primary bg-green py-30 my-40"
                  type="button"
                >
                  LEARN MORE
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstallationRepair;
