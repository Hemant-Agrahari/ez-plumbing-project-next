import React from "react";
import Link from "next/link";
import "../../styles/templates-global.css";
// import "./service.css";
import Image from "next/image";
import AvailableService from "@/components/Home/AvailableService";
import Testimonials from "@/components/Home/Testimonials";
import SectionTwoSlider from "@/components/Home/Section2Slider";
import ContactUsNow from "@/components/FormComponent/ContactUsNow-Form/ContactUsNow";
import Script from "next/script";
import Slider from "react-slick";
interface ServiceTemplate1 {
  // data: BlogData;
  // blog: BlogData;
}
const ServiceTemplate1: React.FC<ServiceTemplate1> = ({ data }: any) => {
  // console.log(data);
  // const banner = JSON.parse((data.banner))
  const sliderserviceSettings = {
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 2,
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const staticServiceData = [
    {
      serviceSliderImage: "/upload/media/247-service.png",
      cardTitle: "24/7",
      cardSubTitle: "Service",
      cardContent:
        "Same-day Plumbing Service For Any Issue Or Concern Related To Leakage, Clogging, Or Malfunctioning Of Appliances.",
    },
    {
      serviceSliderImage: "/upload/media/free-estimate.png",
      cardTitle: "FREE",
      cardSubTitle: "Estimate",
      cardContent:
        "Request A Quote And Get A Free Estimate For Installation, Repair, And Replacement Services From Professionals.",
    },
    {
      serviceSliderImage: "/upload/media/free-service-call.png",
      cardTitle: "FREE",
      cardSubTitle: "Service Call",
      cardContent:
        "From Plumbing Repairs To Full Replacements, Connect With Our Experts To Inquire About Services At Zero Charges.",
    },
    {
      serviceSliderImage: "/upload/media/discount-available.png",
      cardTitle: "15%",
      cardSubTitle: "Discount Available",
      cardContent:
        "15% Off To The Police, Military, Fire Seniors, And Teachers For Services Up To $1000.",
    },
    {
      serviceSliderImage: "/upload/media/247-service (1).png",
      cardTitle: "FINANCING",
      cardSubTitle: "Available",
      cardContent:
        "Overcome Financial Barriers And Keep Your Plumbing System Up-to-date With Our Alternative Financing Options.",
    },
  ];
  return (
    <>
      <div className="services">
        <header className="breadcrumbs px-0">
          <div className="container">
            <div className="breadcrumb-col">
              <div className="home-link">
                <Link href="/" className="home">
                  Home
                </Link>
                <Image
                  className="chevron-right-double-icon"
                  loading="lazy"
                  alt=""
                  src="/templates/chevronrightdouble.svg"
                  width={24}
                  height={24}
                />
              </div>
              <div className="page-title">
                <div className="slab-leak-repair">
                  Slab Leak Repair Orange County
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* Banner Section Start From Here  */}
        <section
          className="banner max-container"
          style={{
            backgroundImage: `linear-gradient(113.98deg, rgba(255, 255, 255, 0.82) 65.41%, rgba(49, 160, 91, 0.82) 105.28%), url("https://ezplumbingusa.aistechnolabs.in/_next/static/media/banner@3x.4330ee32.png")`,
          }}
        >
          {" "}
          <div className="container">
            <div className="hero-content">
              <div className="immediate-slab-leak-detection">
                <h2 className="immediate-slab-leak">
                  Urgent Slab Leak in Orange County
                </h2>
                <h2 className="affordable-slab-leak">
                  Licensed Plumbers With Expertise in Slab Leak Detection and
                  Repair
                </h2>
                <div className="slab-leak-detection">
                  <div>
                    Contact EZ Plumbing USA in Orange County for slab leak
                    detection and repair. The best slab leak detection and
                    repair services are available at reasonable rates from EZ
                    Plumbing slab leak repair Orange County teams.
                  </div>
                  <div>
                    A leaking slab is a huge inconvenience. Wet carpets and mold
                    growth are things that any homeowner would like to avoid at
                    any time. If you have discovered a slab leak at your place,
                    delaying the repairs only makes it more expensive later, as
                    water damage will spread more.
                  </div>
                  <div>
                    Call EZ Plumbing USA anywhere you live in Orange
                    County-Anaheim, Irvine, Santa Ana, Laguna Hills, Mission
                    Viejo, Costa Mesa, Tustin, or in any other city. An EZ
                    Plumbing team of local, licensed plumbers will be present
                    offering 24-hour emergency services in Orange County for
                    leak detection and repair.
                  </div>
                  <div>
                    Our slab leak in Orange County teams are always ready to
                    serve you. It does not matter when you want a slab leak
                    detected, you can call us anytime that suits you.
                  </div>
                  <div>
                    For slab leak repair, there are always many options. The
                    best repair process is the one that suits your property, its
                    plumbing, and your budget. Our slab leak repair Orange
                    County teams will find ways to deliver the best repairs
                    within your budget. Call us and find out!
                  </div>
                </div>
              </div>
              <ContactUsNow />
            </div>
          </div>
        </section>
        <section className="description-section-1 py-60">
          <div className="container">
            <h2 className="com-title">
              What is a Slab Leak in Orange County?
            </h2>
            <p>
              A slab leak is a water leak that occurs in the pipes beneath your
              home’s concrete foundation. These leaks can cause significant
              damage over time, leading to cracks in the foundation, mold
              growth, and structural issues.
            </p>
            <div>
              A slab leak is a water leak that occurs in the pipes beneath your
              home’s concrete foundation. These leaks can cause significant
              damage over time, leading to cracks in the foundation, mold
              growth, and structural issues.
            </div>
          </div>
        </section>

        {/*What Causes Slab Leaks? Slider Section Start From Here  */}
        <section className="container service-boxe-col pt-0">
          <div className="cause-slab-leaks py-60 px-0">
            <h2 className="com-title w-100">
              What Causes Slab Leaks?
            </h2>
            <div className="container px-0">
              <div className="row g-4">
                <div className="col-lg-3">
                  <div className="card-1">
                    <h3 className="small-title">Pipe Corrosion</h3>
                    <p className="com-para">
                      Over time, pipes under the slab can corrode due to age or
                      chemical reactions, leading to leaks.
                    </p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="card-1">
                    <h3 className="small-title">Pipe Corrosion</h3>
                    <p className="com-para">
                      Over time, pipes under the slab can corrode due to age or
                      chemical reactions, leading to leaks.
                    </p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="card-1">
                    <h3 className="small-title">Pipe Corrosion</h3>
                    <p className="com-para">
                      Over time, pipes under the slab can corrode due to age or
                      chemical reactions, leading to leaks.
                    </p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="card-1">
                    <h3 className="small-title">Pipe Corrosion</h3>
                    <p className="com-para">
                      Over time, pipes under the slab can corrode due to age or
                      chemical reactions, leading to leaks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*What Causes Slab Leaks? Slider Section End Here  */}

        {/* 24/7 Emergency Services Start From Here  */}
        <div className="service-sections py-60 w-100">
          <div className="container">
            <div className="row justify-content-center">
              {" "}
              <div className="col-lg-10">
                <h2 className="com-title">
                  24/7 Emergency Services From EZ Plumbers Offering Reliable and
                  Durable Slab Leak Repair in Orange County
                </h2>
              </div>
            </div>
            <div className="row g-4">
              <div className="col-lg-3">
                <div className="card-2">
                  <div className="card-2-img">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8gp4Cuzs8NiXjCeg21N7Iio334UnTPZusLw&s"
                      width="60"
                      height="60"
                      alt=""
                    />
                  </div>
                  <h3 className="small-title">Slab Leak Detection</h3>
                  <p className="com-para">
                    Our Orange County slab leak detection plumbers can quickly
                    detect the type of plumbing in your slab and the kind of
                    leak: a pinhole leak, a burst pipe, a cracked and corroded
                    pipe leaking at multiple places. Hire us for accurate leak
                    detection.
                  </p>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="card-2">
                  <div className="card-2-img">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8gp4Cuzs8NiXjCeg21N7Iio334UnTPZusLw&s"
                      width="60"
                      height="60"
                      alt=""
                    />
                  </div>
                  <h3 className="small-title">Slab Leak Detection</h3>
                  <p className="com-para">
                    Our Orange County slab leak detection plumbers can quickly
                    detect the type of plumbing in your slab and the kind of
                    leak: a pinhole leak, a burst pipe, a cracked and corroded
                    pipe leaking at multiple places. Hire us for accurate leak
                    detection.
                  </p>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="card-2">
                  <div className="card-2-img">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8gp4Cuzs8NiXjCeg21N7Iio334UnTPZusLw&s"
                      width="60"
                      height="60"
                      alt=""
                    />
                  </div>
                  <h3 className="small-title">Slab Leak Detection</h3>
                  <p className="com-para">
                    Our Orange County slab leak detection plumbers can quickly
                    detect the type of plumbing in your slab and the kind of
                    leak: a pinhole leak, a burst pipe, a cracked and corroded
                    pipe leaking at multiple places. Hire us for accurate leak
                    detection.
                  </p>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="card-2">
                  <div className="card-2-img">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8gp4Cuzs8NiXjCeg21N7Iio334UnTPZusLw&s"
                      width="60"
                      height="60"
                      alt=""
                    />
                  </div>
                  <h3 className="small-title">Slab Leak Detection</h3>
                  <p className="com-para">
                    Our Orange County slab leak detection plumbers can quickly
                    detect the type of plumbing in your slab and the kind of
                    leak: a pinhole leak, a burst pipe, a cracked and corroded
                    pipe leaking at multiple places. Hire us for accurate leak
                    detection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 24/7 Emergency Services End Here  */}

        {/* Image Right Section Start From Here  */}
        <section className="container py-60">
          <div className="ez-plumbing-guarantees-repair px-0">
            <h2 className="ez-plumbing-guarantees-container">
              The Hidden Costs of Slab Leaks
            </h2>

            <div className="image-container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="info-columns">
                    <h3 className="small-title">Structural Damage</h3>
                    <p className="com-para">
                      Leaks can cause cracks in your foundation and walls,
                      weakening your home’s structure.
                    </p>
                    <h3 className="small-title">Mold Growth</h3>
                    <p>
                      Moisture from leaks can lead to mold and mildew, which can
                      be costly to remove and can affect health.
                    </p>
                    <h3 className="small-title">Increased Water Bills</h3>
                    <p className="ez-plumbing-guarantees">
                      Continuous leaks can cause your water bills to rise
                      significantly over time.
                    </p>
                    <h3 className="small-title">High Repair Costs</h3>
                    <p className="com-para">
                      Fixing slab leaks often requires extensive excavation and
                      repair, which can be expensive.
                    </p>
                    <h3 className="small-title">Damage to Flooring</h3>
                    <p className="com-para">
                      Water can damage flooring materials, leading to additional
                      repair or replacement costs.
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <img
                    className="installing-ceramic-floor-tiles-icon"
                    loading="lazy"
                    alt=""
                    src="https://www.ezplumbingusa.com/wp-content/uploads/2024/09/1_The-Hidden-Costs-of-Slab-Leaks.jpg"
                    width={719}
                    height={719}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Image Right Section End Here  */}
        {/* Image Left Section Start From Here  */}
        <section className="container py-60">
          <div className="ez-plumbing-guarantees-repair px-0 pt-0">
            <h2 className="ez-plumbing-guarantees-container">
              Call EZ Plumbing USA For Slab Leak Repair in Orange County
            </h2>

            <div className="image-container">
              <div className="row g-4">
                <div className="col-lg-6">
                  <img
                    className="installing-ceramic-floor-tiles-icon"
                    loading="lazy"
                    alt=""
                    src="https://www.ezplumbingusa.com/wp-content/uploads/2019/12/Orange-County-Slab-Leak-Detection.png"
                    width={719}
                    height={719}
                  />
                </div>
                <div className="col-lg-6">
                  <div className="info-columns">
                    <h3 className="small-title">Structural Damage</h3>
                    <p className="com-para">
                      EZ Plumbing Orange County slab leak detection teams have a
                      24-hour emergency service facility present across cities
                      in the county. If you want to schedule slab leak repairs
                      in the late evening or early morning, before or after your
                      work hours, book an appointment with ease. Find a plumber
                      in Orange County on time to deliver leak detection and
                      repair services.
                    </p>

                    <p>
                      Sometimes, slab leak repairs could be a huge process,
                      especially when the leak has caused substantive water
                      damage. You might have mold spread under carpets and
                      furnishing, warped flooring with stains and spots, and a
                      burst slab pipe to replace. These are the times when
                      finding a 100% trustworthy and efficient slab leak repair
                      Orange County plumber makes a huge difference.
                    </p>

                    <p className="ez-plumbing-guarantees">
                      The EZ Plumbing professionals are backed by the company –
                      our expertise, our rates, our resources, and our
                      equipment. So finding the most affordable rates and
                      solutions becomes easy.
                    </p>
                    <ul>
                      <li>Slab Leak Detection</li>
                      <li>Slab Video Pipe Inspection</li>
                      <li>Leaking Pipe Repair</li>
                      <li>
                        Damaged Pipe Removal and Repiping or Pipe Rerouting
                      </li>
                      <li>Structural Repairs</li>
                      <li>Carpet Cleaning/Repairs/Replacement</li>
                      <li>Mold Detection</li>
                      <li>Mold Removal</li>
                    </ul>
                    <p>
                      With EZ Plumbing Orange County slab leak detection teams
                      at your service, you will never have to worry too much
                      about anything – the quality of repairs, durability of
                      repairs, or the cost of repairs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Image Left Section End Here  */}

        {/* Precise Electronic Slab Leak Slider Start From here  */}

        {/* Precise Electronic Slab Leak Slider End here  */}

        {/* Slab Leak Repair in Orange County Section Start From Here  */}
        <section className="slab-leak-gray-wrapper py-60 w-100">
          <div className="container">
            <h2 className="com-title">
              Slab Leak Repair in Orange County
            </h2>
            <div className="slab-leak-gray-conntent">
              <div className="slab-leak-gray-connten-box">
                <h3 className="small-title">Leak Detection</h3>
                <p className="com-para">
                  We use advanced tools like acoustic sensors and thermal
                  imaging to accurately locate the leak under the slab
                </p>
              </div>
              <div className="slab-leak-gray-connten-box">
                <h3 className="small-title">Leak Detection</h3>
                <p className="com-para">
                  We use advanced tools like acoustic sensors and thermal
                  imaging to accurately locate the leak under the slab
                </p>
              </div>
              <div className="slab-leak-gray-connten-box">
                <h3 className="small-title">Leak Detection</h3>
                <p className="com-para">
                  We use advanced tools like acoustic sensors and thermal
                  imaging to accurately locate the leak under the slab
                </p>
              </div>
              <div className="slab-leak-gray-connten-box">
                <h3 className="small-title">Leak Detection</h3>
                <p className="com-para">
                  We use advanced tools like acoustic sensors and thermal
                  imaging to accurately locate the leak under the slab
                </p>
              </div>
              <div className="slab-leak-gray-connten-box">
                <h3 className="small-title">Leak Detection</h3>
                <p className="com-para">
                  We use advanced tools like acoustic sensors and thermal
                  imaging to accurately locate the leak under the slab
                </p>
              </div>
              <div className="slab-leak-gray-connten-box">
                <h3 className="small-title">Leak Detection</h3>
                <p className="com-para">
                  We use advanced tools like acoustic sensors and thermal
                  imaging to accurately locate the leak under the slab
                </p>
              </div>
              <div className="slab-leak-gray-connten-box">
                <h3 className="small-title">Leak Detection</h3>
                <p className="com-para">
                  We use advanced tools like acoustic sensors and thermal
                  imaging to accurately locate the leak under the slab
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Slab Leak Repair in Orange County Section End Here  */}

        <section className="container">
          <div className="ez-plumbing-guarantees-repair px-0">
            <h2 className="ez-plumbing-guarantees-container">
              OPTIONS FOR THE REPAIR OF SLAB LEAKS
            </h2>

            <div className="image-container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="info-columns">
                    <h3 className="small-title">Pipe Rerouting</h3>
                    <p className="com-para">
                      Instead of fixing the damaged pipe, we reroute a new pipe
                      around the slab to avoid future leaks.
                    </p>
                    <h3 className="small-title">Epoxy Pipe Lining</h3>
                    <p>
                      We insert a flexible liner coated with epoxy into the
                      damaged pipe, which hardens to seal the leak.
                    </p>
                    <h3 className="small-title">Pipe Burst Technology</h3>
                    <p className="ez-plumbing-guarantees">
                      This method involves pulling a new pipe through the old
                      one, and expanding it to fit and replace the damaged pipe.
                    </p>
                    <h3 className="small-title">Slab Jacking</h3>
                    <p className="com-para">
                      We lift and stabilize the slab using a grout mixture if
                      the foundation has been affected by the leak.
                    </p>
                    <h3 className="small-title">Trenchless Repair</h3>
                    <p className="com-para">
                      We dig small access points to fix the leak without
                      removing large sections of the slab, reducing disruption
                      and repair costs.
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <img
                    className="installing-ceramic-floor-tiles-icon"
                    loading="lazy"
                    alt=""
                    src="https://www.ezplumbingusa.com/wp-content/uploads/2024/09/2_OPTIONS-FOR-THE-REPAIR-OF-SLAB-LEAKS.jpg"
                    width={719}
                    height={719}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container pt-0">
          <div className="ez-plumbing-guarantees-repair px-0 pt-0">
            <div className="image-container">
              <div className="row g-4">
                <div className="col-lg-6">
                  <img
                    className="installing-ceramic-floor-tiles-icon"
                    loading="lazy"
                    alt=""
                    src="https://www.ezplumbingusa.com/wp-content/uploads/2024/09/3_Slab-Leak-Detection-Repair.jpg"
                    width={719}
                    height={719}
                  />
                </div>
                <div className="col-lg-6">
                  <div className="info-columns">
                    <h2 className="small-title">Why EZ Plumbing USA?</h2>
                    {/* <h3 className="small-title">Structural Damage</h3> */}
                    {/* <p className="com-para">
                      EZ Plumbing Orange County slab leak detection teams have a
                      24-hour emergency service facility present across cities
                      in the county. If you want to schedule slab leak repairs
                      in the late evening or early morning, before or after your
                      work hours, book an appointment with ease. Find a plumber
                      in Orange County on time to deliver leak detection and
                      repair services.
                    </p>

                    <p>
                      Sometimes, slab leak repairs could be a huge process,
                      especially when the leak has caused substantive water
                      damage. You might have mold spread under carpets and
                      furnishing, warped flooring with stains and spots, and a
                      burst slab pipe to replace. These are the times when
                      finding a 100% trustworthy and efficient slab leak repair
                      Orange County plumber makes a huge difference.
                    </p>

                    <p className="ez-plumbing-guarantees">
                      The EZ Plumbing professionals are backed by the company –
                      our expertise, our rates, our resources, and our
                      equipment. So finding the most affordable rates and
                      solutions becomes easy.
                    </p> */}
                    <ul>
                      <li>
                        <p className="com-para">
                          Our team is highly trained and experienced in handling
                          all types of plumbing issues.
                        </p>
                      </li>
                      <li>
                        <p className="com-para">
                          We use the latest tools and techniques for accurate
                          leak detection and efficient repairs.
                        </p>
                      </li>
                      <li>
                        <p className="com-para">
                          We offer fast service to address your plumbing
                          problems promptly and minimize damage.
                        </p>
                      </li>
                      <li>
                        <p className="com-para">
                          We provide clear, upfront pricing with no hidden fees,
                          ensuring you know the cost before we start.
                        </p>
                      </li>
                      <li>
                        <p className="com-para">
                          We use high-quality materials and methods to ensure
                          durable and reliable repairs.
                        </p>
                      </li>
                      <li>
                        <p className="com-para">
                          Our goal is to deliver excellent service and ensure
                          you’re fully satisfied with our work.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Available Service Section Start From Here  */}
        {/* <AvailableService data={serviceSlider} /> */}
        {/* Available Service Section End Here  */}

        {/* Testimonial Section Start From Here  */}
        {/* <Testimonials data={testimonials} /> */}
        {/* Testimonial Section End Here  */}
      </div>
    </>
  );
};

export default ServiceTemplate1;
