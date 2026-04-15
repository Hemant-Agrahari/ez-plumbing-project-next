"use client";
import { useState } from "react";
import Link from "next/link";

const Footer = () => {
   const [activeSection, setActiveSection] = useState(null);

   const handleToggle = (section: any) => {
    setActiveSection((prevSection) =>
      prevSection === section ? null : section
    );
  };

  return (
    <footer className="page-footer">
      <div className="footer">
        <div className="container-xl">
          <div className="row">
            <div className="col-md-3 col-lg-2">
              <Link className="navbar-brand" href="#">
                <img
                  alt=""
                  src="/images/footer-logo.png"
                  width="74"
                  height="74"
                />
              </Link>
            </div>
            <div className="col-md-9 col-lg-6 mt-4 mt-md-0">
              <div className="footer-about">
                <div className="footer-col quick-link-first-col mb-4 mb-md-0">
                  <h4 className="links-title">Quick Links</h4>
                  <ul>
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li>
                      <Link href="about-us">About Us</Link>
                    </li>
                    <li>
                      <Link href="#">Become Provider</Link>
                    </li>
                    <li>
                      <Link href="#">Locations</Link>
                    </li>
                    <li>
                      <Link href="#">Blog</Link>
                    </li>
                    <li>
                      <Link href="contact-us">Contact us</Link>
                    </li>
                    <li>
                      <Link href="#">Sitemap</Link>
                    </li>
                  </ul>
                </div>
                <div className="footer-col">
                  <h4
                    className={`quick-links ${
                      activeSection === "about" ? "active" : ""
                    }`}
                    onClick={() => handleToggle("about")}
                  >
                    About
                  </h4>
                  <ul
                    className={`footer-col-links ${
                      activeSection === "about" ? "active" : ""
                    }`}
                  >
                    <li>
                      <Link href="about-us">About Us</Link>
                    </li>
                    <li>
                      <Link href="#">Blog</Link>
                    </li>
                    <li>
                      <Link href="#">Case Study</Link>
                    </li>
                    <li>
                      <Link href="#">Locations</Link>
                    </li>
                    <li>
                      <Link href="contact-us">Contact us</Link>
                    </li>
                    <li>
                      <Link href="#">Sitemap</Link>
                    </li>
                  </ul>
                </div>
                <div className="footer-col">
                  <h4
                    className={`quick-links ${
                      activeSection === "services" ? "active" : ""
                    }`}
                    onClick={() => handleToggle("services")}
                  >
                    Services
                  </h4>
                  <ul
                    className={`footer-col-links ${
                      activeSection === "services" ? "active" : ""
                    }`}
                  >
                    <li>
                      <Link href="about-us">About Us</Link>
                    </li>
                    <li>
                      <Link href="#">Blog</Link>
                    </li>
                    <li>
                      <Link href="#">Case Study</Link>
                    </li>
                    <li>
                      <Link href="#">Locations</Link>
                    </li>
                    <li>
                      <Link href="contact-us">Contact us</Link>
                    </li>
                    <li>
                      <Link href="#">Sitemap</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-3 ms-lg-auto">
              <div className="footer-col info-col">
                <h4 className="links-title">Info</h4>
                <div className="email_text">
                  Email :
                  <Link href="mailto:sales@ezplumbingusa.com">
                    sales@ezplumbingusa.com
                  </Link>
                  <Link href="#" className="start-reating d-flex mt-2">
                    <img
                      src="/images/rating-footer.png"
                      width="124"
                      height="20"
                      alt="star"
                    />
                  </Link>
                  <a
                    className="see-our mt-1 d-flex"
                    href="https://www.yelp.com/biz/ez-plumbing-usa-san-diego-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    See our reviews on Yelp
                  </a>
                </div>
                <div className="social-links d-flex mt-2 pt-1">
                  <Link href="https://www.facebook.com/EZPlumbingUSA/" target="_blank">
                    <img
                      src="/images/facebook.png"
                      width="10"
                      height="21"
                      alt="facebook"
                    />
                  </Link>
                  <Link href="https://twitter.com/EZPlumbingUSA1" target="_blank">
                    <img
                      src="/images/twitter.png"
                      width="18"
                      height="18"
                      alt="twitter"
                    />
                  </Link>
                  <Link href="https://pinterest.com/EZPlumbingUSA/" target="_blank">
                    <img
                      src="/images/pinterest.png"
                      width="19"
                      height="24"
                      alt="pinterest"
                    />
                  </Link>
                  <Link href="https://www.instagram.com/ezplumbingusa/" target="_blank">
                    <img
                      src="/images/instagram.png"
                      width="18"
                      height="28"
                      alt="instagram"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-section">
        <div className="container-xl">
          <div className="row align-items-center">
            <div className="col-12 col-md-10 col-lg-8">
              <div className="copyright text-center text-md-start">
                EZ Plumbing USA , All Rights Reserved.{" "}
                <span className="d-block d-md-inline mt-1 mt-md-0">
                  | Powered By : {" "}
                  <Link target="_blank" href="https://www.aistechnolabs.com/">
                    AIS TECHNOLABS PVT LTD
                  </Link>
                  .
                </span>
              </div>
            </div>
            <div className="col-12 col-md-2 col-lg-4 text-center text-md-end mt-2 pt-1 pt-md-0 mt-md-0">
              <img
                alt=""
                src="/images/mca-protected.png"
                width="121"
                height="24"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
