"use client";
import { useState } from "react";
import Link from "next/link";
import ContactUsNow from "@/components/FormComponent/ContactUsNow-Form/ContactUsNow";
import Image from "next/image";

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
              <div className="footer-brand-call">
              <Link className="navbar-brand" href="/">
                <img
                  alt="EZ Plumbing USA"
                  src="/images/ez-brand-logo.svg"
                  width="75"
                  height="75"
                  className="img-fluid"
                />
              </Link>


              <p className="toll_f_num">
                <span>Toll Free Number : </span><br/>
                <a href="tel:+18443225539" className="toll_free">
                <Image src="/images/green-icon-call.png" alt="call green icon" className="img-fluid me-1" width="25" height="25" />{` `} 8443-CALLEZ</a>
                </p>
              </div>
            </div>
            <div className="col-md-9 col-lg-6 mt-4 mt-md-0">
              <div className="footer-about">
                <div className="footer-col quick-link-first-col mb-4 mb-md-0">
                  <div className="links-title">Company</div>
                  <ul>
                    <li>
                      <Link href="/about-us">About Us</Link>
                    </li>
                    <li>
                      <Link href="/blog">Blogs</Link>
                    </li>
                    <li>
                      <Link href="/contact-us">Contact Us</Link>
                    </li>
                  </ul>
                </div>
                <div className="footer-col">
                  <div
                    className={`quick-links ${
                      activeSection === "about" ? "active" : ""
                    }`}
                    onClick={() => handleToggle("about")}
                  >
                    Services
                  </div>
                  <ul
                    className={`footer-col-links ${
                      activeSection === "about" ? "active" : ""
                    }`}
                  >
                    <li>
                      <Link href="/san-diego-heating-repair">Heating And Air Repair</Link>
                    </li>
                    <li>
                      <Link href="/san-diego-central-heating-installation">
                      Heating Installation
                      </Link>
                    </li>
                    <li>
                      <Link href="/24-7-emergency-services">
                      24/7 Emergency Services
                      </Link>
                    </li>
                    <li>
                      <Link href="/san-diego-electronic-air-cleaner">
                      Electronic Air Cleaners
                      </Link>
                    </li>
                    <li>
                      <Link href="/san-diego-uv-light-system">
                      San Diego UV Light System
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="footer-col">
                  <div
                    className={`quick-links ${
                      activeSection === "services" ? "active" : ""
                    }`}
                    onClick={() => handleToggle("services")}
                  >
                    Quick Links
                  </div>
                  <ul
                    className={`footer-col-links ${
                      activeSection === "services" ? "active" : ""
                    }`}
                  >
                       <li>
                      <Link href="/sitemap">Sitemap</Link>
                    </li>
                    <li>
                      <Link href="/faq">FAQ</Link>
                    </li>
                    {/* <li>
                      <Link href="/locations">Locations</Link>
                    </li> */}
                    
                  
                 

                  
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-3 ms-lg-auto">
              <div className="footer-col info-col">
                <div className="links-title">Info</div>
                <div className="email_text">
                  Email :
                  <Link href="mailto:mailto:sales@ezheatandair.com">
                  sales@ezheatandair.com
                  </Link>
                  <Link href="#" className="start-reating d-flex mt-2">
                    <img
                      src="/images/rating-footer.png"
                      width="124"
                      height="20"
                      alt="star"
                    />
                  </Link>
                </div>
                <div className="social-links d-flex mt-2 pt-1">
                  <Link
                    href="https://www.facebook.com/profile.php?id=61563780286402"
                    target="_blank"
                  >
                    <img
                      src="/images/facebook.png"
                      width="10"
                      height="21"
                      alt="facebook"
                    />
                  </Link>
                  <Link
                    href="https://x.com/EZHeatAndAir"
                    target="_blank"
                  >
                    <img
                      src="/images/twitter.png"
                      width="18"
                      height="18"
                      alt="twitter"
                    />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/104580298/admin/dashboard/"
                    target="_blank"
                  >
                    <img
                      src="/images/linkedin.svg"
                      width="19"
                      height="24"
                      alt="linkedin"
                    />
                  </Link>
                  <Link
                    href="https://www.instagram.com/ez._heatandair._/?hl=en"
                    target="_blank"
                  >
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
              © 10/12/2024   EZ Heat and Air , All Rights Reserved.{" "}
                <span className="d-block d-md-inline mt-1 mt-md-0">
                  | Powered By :{" "}
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

      <ul className="right-sidebar-btn ebook-modal">
        <li className="first-list">        <a href="tel:+18447557889">
          <span className="content-sidebar call">
            <Image
              src="/images/phone-icons.png"
              className="img-fluid"
              width="15"
              height="16"
              alt="call"
            />
          </span>
        </a></li>
        <li className="second-list">        <Link data-bs-toggle="modal" href="#exampleModal">
          <span className="content-sidebar book-now">BOOK NOW</span>
        </Link></li>


      </ul>

      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog ebook-modal-wrapper p-3">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                // onClick={handleClose}
              ></button>
              <div
                className="ebook-form-wrapper"
                style={{ position: "relative" }}
              >
                <ContactUsNow />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
