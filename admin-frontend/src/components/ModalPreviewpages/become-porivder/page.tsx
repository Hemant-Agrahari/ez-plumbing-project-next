'use client'
import React from 'react'
import "@/style/templates-global.css";
import "./become-provider.css"
import InsuranceLogos from '@/components/FrontendComponents/Home/InsuranceLogos';
import BecomeProviderForm from '@/components/FrontendComponents/FormComponent/BecomePorivder/BecomeForm';


const BecomeProviderPreview = ({ data }: any) => {
  return (
    <>
      <div className="become-provider">
        <div className="breadcrumbs">
          <div className="container">
            <div className="breadcrumbs1">
              <a className="home" href="/">
                Home
              </a>
              <img
                alt=""
                loading="lazy"
                width={24}
                height={24}
                decoding="async"
                data-nimg={1}
                // className="chevron-right-double-icon"
                style={{ color: "transparent" }}
                src="/templates/chevronrightdouble.svg"
              />
              <a className="thank-you1">{data?.breadcrumbTitle}</a>
            </div>
          </div>
        </div>
        <section className="banner" style={{
          backgroundImage: `linear-gradient(113.98deg, rgba(255, 255, 255, 0.82) 65.41%, rgba(49, 160, 91, 0.82) 105.28%), url(${typeof data?.bannerImage === "object" &&
              data.bannerImage instanceof File
              ? URL.createObjectURL(data.bannerImage)
              : `${process.env.NEXT_PUBLIC_BACKEND_URL}${data?.bannerImage}`
            })`,
        }}>
          <div className="thanks-message">
            <div>
              <h1 className="thank-you2 mb-2"><span className='fw-normal' dangerouslySetInnerHTML={{ __html: data?.bannerTitle }} /></h1>
              <div className="thank-you-for text-dark fw-medium">
                {data?.pageSubHeading}              </div>
            </div>
            <div className="thank-you-for" dangerouslySetInnerHTML={{ __html: data?.content }}>

            </div>
          </div>
        </section>
      </div>
      <div className="become-provider">
        <BecomeProviderForm />
        <InsuranceLogos />
      </div>
    </>)
}

export default BecomeProviderPreview