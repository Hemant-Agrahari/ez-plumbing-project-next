"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// import "@/styles/templates-global.css";
import "./page.css"
// import InsuranceLogos from '@/components/Home/InsuranceLogos';
// import BecomeProviderForm from '@/components/FormComponent/BecomePorivder/BecomeForm';
interface LocationProps {
  data: any;
}
const LocationPreview: React.FC<LocationProps> = ({ data }: any) => {
  // console.log(data, "locationData");

  return (
    <>
      <div className="locations">
        <section className="breadcrum-section max-container w-100">
          <div className="breadcrumbs">
            <div className="container ps-0">
              <div className="breadcrumbs1">
                <Link className="homes" href="/">
                  Home
                </Link>
                <img
                  alt=""
                  loading="lazy"
                  width={24}
                  height={24}
                  decoding="async"
                  data-nimg={1}
                  className="chevron-right-double-icon"
                  style={{ color: "transparent" }}
                  src="/templates/chevronrightdouble.svg"
                />
                <a className="thank-you1">{data?.breadcrumbTitle}</a>
              </div>
            </div>
          </div>
        </section>
        <section className="max-container w-100 py-60">
          <div className="container">
            <div className="area-we-served p-0">
              <h3 className="area-we-served1 f-36 text-center mb-0">
                {data?.bannerTitle}
              </h3>
              {/* <h2 className="area-we-served1 text-center">
                {data?.pageSubHeading}
              </h2> */}
              {data?.locationContent &&
                data.locationContent.map((contentItem: any, index: any) => (
                  <div key={index} className="w-100">
                    {" "}
                    {/* Added key for contentItem */}
                    <h2 className="area-we-served2 mb-5 text-center">{contentItem.pageSubHeading}</h2>
                    {contentItem.location && (
                      <div className="location-grid">
                        <div className="location-grid-col">
                          {contentItem.location.map(
                            (locationItem: any, locIndex: any) => (
                              <div className="location-grid-item" key={locIndex}>
                                <img
                                  loading="lazy"
                                  alt=""
                                  src="/templates/frame-1686564363.svg"
                                  width={24}
                                  height={24}
                                />
                                <div className="location-name">
                                  {locationItem.items}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                    {/* {contentItem.browseBtnText && (
                      <a
                        href={contentItem.browseBtnLink}
                        className="browse-button"
                      >
                        {contentItem.browseBtnText}
                      </a>
                    )} */}
                    {contentItem.browseBtnText && (
                      <div className="button-container text-center mt-md-5 mt-sm-4 mt-3">
                        <button className="button1 text-white">
                          <div className="browse-all-locations fw-semibold text-white">
                            {contentItem.browseBtnText}
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LocationPreview;
{
  /* /////////////////////// */
}
{
  /* <div className="location-grid-col">
                    <div className="location-grid-item">
                      <Image
                        className="column-items-icon"
                        loading="lazy"
                        alt=""
                        src="/templates/frame-1686564363.svg"
                        width={24}
                        height={24}
                      />

                        <div className="location-name">La Mesa</div>
                      </div>
                      <div className="location-grid-item">
                        <Image
                          className="column-items-icon"
                          loading="lazy"
                          alt=""
                          src="/templates/frame-1686564363.svg"
                          width={24}
                          height={24}
                        />

                        <div className="location-name">Serra Mesa</div>
                      </div>
                      <div className="location-grid-item">
                        <Image
                          className="column-items-icon"
                          loading="lazy"
                          alt=""
                          src="/templates/frame-1686564363.svg"
                          width={24}
                          height={24}
                        />

                        <div className="location-name">Encinitas</div>
                      </div>
                      <div className="location-grid-item">
                        <Image
                          className="column-items-icon"
                          loading="lazy"
                          alt=""
                          src="/templates/frame-1686564363.svg"
                          width={24}
                          height={24}
                        />

                        <div className="location-name">Mira Mesa</div>
                      </div>
                      <div className="location-grid-item">
                        <Image
                          className="column-items-icon"
                          loading="lazy"
                          alt=""
                          src="/templates/frame-1686564363.svg"
                          width={24}
                          height={24}
                        />

                      <div className="location-name">Mira Mesa</div>
                    </div>
                  </div> */
}
{
  /* /////////////////////// */
}
