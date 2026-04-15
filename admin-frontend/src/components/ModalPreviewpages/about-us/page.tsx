import React from 'react'
import "./page.css"
import Testimonials from '@/components/FrontendComponents/Home/Testimonials';
import AvailableService from '@/components/FrontendComponents/Home/AvailableService';
import Location from '@/components/FrontendComponents/Home/Location';
import { Metadata } from 'next';

const AboutUsPreview = (data: any) => {


    return (
        <>
            {/* <h1>{data.data.breadcrumbTitle}</h1> */}
            <div className='about-us'>
                <section className="w-100 max-container breadcrum-section">
                    <header className="breadcrumbs px-0">
                        <div className="container ">
                            <div className="breadcrumb-col">
                                <div className="home-breadcrumb"><a className="homes" href="/">Home</a><img alt="" loading="lazy" width="24" height="24" decoding="async" data-nimg="1" src="/templates/chevronrightdouble.svg" /></div>
                                <div className="about-breadcrumb"><a className="about-us1" href="#">{data?.data.breadcrumbTitle}</a></div>
                            </div>
                        </div>
                    </header>
                </section>
                <section className="banner">
                    <h1 className="about-us2">{data?.data.bannerTitle}</h1>
                    <div className="ez-plumbing-started" dangerouslySetInnerHTML={{ __html: data?.data.bannerContent }}></div>
                </section>
                <section className="our-services max-container w-100">
                    <div className="container">
                        <div className="our-services-comes-with-guaran px-0">
                            {data.data.content && data.data.content.map((item: any, index: any) => (
                                <>
                                    <h1 className="our-services-comes">{data?.data.content[index].contentTitle}</h1>
                                    <div className="guarantee-image">
                                        <div key={index} className="content-item">
                                            {index % 2 === 0 ? (
                                                // For even indexes, display image first, then text
                                                <>
                                                    <img
                                                        alt=""
                                                        loading="lazy"
                                                        width="719"
                                                        height="584"
                                                        className="installing-ceramic-floor-tiles-icon"
                                                        src={
                                                            item.contentImage instanceof File
                                                                ? URL.createObjectURL(item.contentImage)
                                                                : typeof item.contentImage === "string"
                                                                    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${item.contentImage}`
                                                                    : ""
                                                        }
                                                    />
                                                    <div className="team">
                                                        <div className="frame-parent">
                                                            {/* <div className="ellipse-wrapper">
                                                            <div className="frame-child"></div>
                                                        </div> */}
                                                            <div
                                                                className="thanks-to-the-container"
                                                                dangerouslySetInnerHTML={{ __html: item.contentText }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                // For odd indexes, display text first, then image
                                                <>
                                                    <div className="team">
                                                        <div className="frame-parent">
                                                            {/* <div className="ellipse-wrapper">
                                                            <div className="frame-child"></div>
                                                        </div> */}
                                                            <div
                                                                className="thanks-to-the-container"
                                                                dangerouslySetInnerHTML={{ __html: item.contentText }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                    <img
                                                        alt=""
                                                        loading="lazy"
                                                        width="719"
                                                        height="584"
                                                        className="installing-ceramic-floor-tiles-icon"
                                                        src={
                                                            item.contentImage instanceof File
                                                                ? URL.createObjectURL(item.contentImage)
                                                                : typeof item.contentImage === "string"
                                                                    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${item.contentImage}`
                                                                    : ""
                                                        }
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </>
                            ))}


                        </div>
                    </div>
                </section>

                {/* {data.data.serviceSlider &&
                    } */}
                    <AvailableService data={data.data} />
                {/* {data.data.testimonials &&
                    } */}
                    <Testimonials data={data.data} />

                <Location />
            </div>
        </>
    )
}

export default AboutUsPreview