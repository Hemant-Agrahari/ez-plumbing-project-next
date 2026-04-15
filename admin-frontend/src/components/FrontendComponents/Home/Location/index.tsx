import Link from "next/link";
import React from "react";

export const Location = () => {
  return (
    <section className="our-location py-60 w-100">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-lg-3 mt-3 mt-md-0 order-2 order-md-1">
            <div className="location-details">
              <h2 className="title mb-4 mb-lg-5">Our Location</h2>
              <div className="locations-col">
                <div className="locations mb-4 pb-1">
                  <div className="locations-title">San Diego</div>
                  <p className="dec mb-0">
                    10320s Camino Santa Fe Unit E,
                    <br />
                    San Diego, CA 92121
                    <br />
                    <Link href="tel:+17603899117">(760) 389 9117</Link>
                  </p>
                </div>
                <div className="locations mb-4 pb-1">
                  <div className="locations-title">Lake Forest</div>
                  <p className="dec mb-0">
                    22365 El Toro Rd Suite 340,
                    <br />
                    Lake Forest, CA 92630
                    <br />
                    <Link href="tel:+9493906114">(949) 390-6114</Link>
                  </p>
                </div>
                <div className="locations">
                  <div className="locations-title">Murrieta</div>
                  <p className="dec">
                    41109 Golden Gate Circle,
                    <br />
                    Murrieta, CA 92562
                    <br />
                    <Link href="tel:+9516442211">(951) 644-2211</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8 col-lg-9 order-1 order-md-2">
            <img
              src="/images/location-map.png"
              alt=""
              width="966"
              height="685"
              className="img-fluid w-100 h-100"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
