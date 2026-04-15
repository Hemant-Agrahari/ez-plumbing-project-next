"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar, Nav, Offcanvas, Image, NavDropdown } from "react-bootstrap";
import { getCurrentDayAndTime } from "@/helper/dateDay"; // Adjust the import path as needed
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";

export const Header = () => {
  // State variables to hold current day and time
  const [day, setDay] = useState<string>("");
  const [time, setTime] = useState<string>("");

  // Update time and day
  const updateTimeAndDay = () => {
    const { day, time } = getCurrentDayAndTime();
    setDay(day);
    setTime(time);
  };

  // Update time and day on component mount and every minute
  useEffect(() => {
    updateTimeAndDay(); // Initial call to set the time and day
    const intervalId = setInterval(updateTimeAndDay, 60000); // Update every minute

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const [show, setShow] = useState(false);
  const handleLinkClick = () => {
    setShow(false);
  };
  return (
    <>
      {/* <GoogleTagManager gtmId="GTM-W6WCW52" /> */}
      {/* <Script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W6WCW52');`,
        }}
      ></Script> */}
      <header className="page-header bg-white sticky-top">
        <div className="container-xl">
          <Navbar expand="lg" className="bg-white">
            <div className="top-header">
              <Link href="/">
                <Image
                  src="/images/ez-brand-logo.svg"
                  alt="logo"
                  width={75}
                  height={75}
                  className="brand-logo img-fluid"
                />
                
                <Image
                  src="/images/ez-brand-logo.svg"
                  alt="logo"
                  width={42}
                  height={42}
                  className="brand-logo-s"
                />
                
              </Link>
              <div className="head_time">
                <p className="days">
                  IT&apos;S <span className="day text-green">{day}</span>,{" "}
                  {time} AND <span className="text-green">WE&apos;RE OPEN</span>
                </p>
                <p className="toll-free-no">
                  TOLL FREE NUMBER :{" "}
                  <span>
                    <a href="tel:+18447557889" className="text-green">
                      (844) 755-7889
                    </a>
                  </span>
                </p>
              </div>
              <div className="header-service">
                <div className="sevi-logo">
                  <Image
                    alt=""
                    src="/images/emergency-service.png"
                    width={66}
                    height={61}
                  />
                </div>
                <div className="emergency-service">
                  <p>
                    <span>San Diego County:</span>
                    <a
                      href="tel:+17603899117"
                      className="header-phone text-green"
                    >
                      (760) 389 9117
                    </a>
                  </p>
                  <p>
                    <span>Orange County:</span>
                    <a
                      href="tel:+19493906114"
                      className="header-phone text-green"
                    >
                      (949) 390 6114
                    </a>
                  </p>
                  <p>
                    <span>Riverside County:</span>
                    <a
                      href="tel:+19516442211"
                      className="header-phone text-green"
                    >
                      (951) 644-2211
                    </a>
                  </p>
                </div>
              </div>
              <Navbar.Toggle
                aria-controls="offcanvasNavbar"
                onClick={() => setShow(!show)}
              />
            </div>
            <div className="menu-header">
              <Navbar.Offcanvas
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
                placement="start"
                show={show}
                onHide={() => setShow(false)}
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id="offcanvasNavbarLabel">
                    Menu
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1">
                    <ul className="d-lg-flex d-block">
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          aria-current="page"
                          href="/"
                          onClick={handleLinkClick}
                        >
                          HOME
                        </Link>
                      </li>
                      {/* COMPANY */}
                      <li className="nav-item">
                        <NavDropdown title="COMPANY" id="basic-nav-dropdown">
                          <NavDropdown.Item
                            as={Link}
                            href="/about-us"
                            onClick={handleLinkClick}
                          >
                            About Us
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            as={Link}
                            href="/blog"
                            onClick={handleLinkClick}
                          >
                            Blog
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/faq"
                            onClick={handleLinkClick}
                          >
                            FAQ
                          </NavDropdown.Item>
                        </NavDropdown>
                      </li>
                      {/* PLUMBING  */}
                      <li className="nav-item">
                        <NavDropdown title=" PLUMBING" id="basic-nav-dropdown">
                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-gas-line-repair-replacement"
                            onClick={handleLinkClick}
                          >
                            Gas Line Repair & Replacement
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-hose-outdoor-faucet-services"
                            onClick={handleLinkClick}
                          >
                            Hose & Outdoor Faucet Services
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-leak-repair"
                            onClick={handleLinkClick}
                          >
                            Leak Repair
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-repipe-pipelining"
                            onClick={handleLinkClick}
                          >
                            Repipe Pipelining
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-slab-leaks"
                            onClick={handleLinkClick}
                          >
                            Slab Leaks
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-sump-pumps"
                            onClick={handleLinkClick}
                          >
                            Sump Pumps
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-plumbing-installation-replacement"
                            onClick={handleLinkClick}
                          >
                            Plumbing Installation & Replacement
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-shut-off-valve-repair"
                            onClick={handleLinkClick}
                          >
                            Shut-Off Valve Repair
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-tankless-water-heater-repair-installation"
                            onClick={handleLinkClick}
                          >
                            Tankless Water Heaters
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-water-conservation"
                            onClick={handleLinkClick}
                          >
                            Water Conservation
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-water-filtration"
                            onClick={handleLinkClick}
                          >
                            Water Filtration
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-water-heater-repair-installation"
                            onClick={handleLinkClick}
                          >
                            Water Heaters
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-water-pressure-regulators"
                            onClick={handleLinkClick}
                          >
                            Water Pressure Regulators
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-water-softeners"
                            onClick={handleLinkClick}
                          >
                            Water Softeners
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-water-treatment-services"
                            onClick={handleLinkClick}
                          >
                            Water Treatment Services
                          </NavDropdown.Item>
                        </NavDropdown>
                      </li>
                      {/* SEWER & DRAIN  */}
                      <li className="nav-item">
                        <NavDropdown
                          title=" SEWER & DRAIN"
                          id="basic-nav-dropdown"
                        >
                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-camera-inspection"
                            onClick={handleLinkClick}
                          >
                            Camera Inspection
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-trenchless-sewer-lining"
                            onClick={handleLinkClick}
                          >
                            Trenchless Sewer Lining
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-drain-cleaning"
                            onClick={handleLinkClick}
                          >
                            Drain Cleaning
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-drain-repair"
                            onClick={handleLinkClick}
                          >
                            Drain Repair
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-drain-replacement-installation"
                            onClick={handleLinkClick}
                          >
                            Drain Replacement & Installation
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-snaking-hydro-jetting"
                            onClick={handleLinkClick}
                          >
                            Snaking & Hydro Jetting
                          </NavDropdown.Item>
                        </NavDropdown>
                      </li>
                      {/* Heating  */}
                      <li className="nav-item">
                        <NavDropdown title=" HEATING" id="basic-nav-dropdown">
                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-central-heating-installation"
                            onClick={handleLinkClick}
                          >
                            Heater Installation
                          </NavDropdown.Item>

                          {/* <NavDropdown.Item
                            as={Link}
                            href="/san-diego-emergency-heating-services"
                            onClick={handleLinkClick}
                          >
                            Emergency Heating Service
                          </NavDropdown.Item> */}

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-heating-repair"
                            onClick={handleLinkClick}
                          >
                            Heater Repair
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-heater-tune-ups"
                            onClick={handleLinkClick}
                          >
                            Heater Tune Ups
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-hybrid-hvac-system"
                            onClick={handleLinkClick}
                          >
                            Hybrid Heating Systems
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-emergency-furnace-repair"
                            onClick={handleLinkClick}
                          >
                            Emergency Furnace Repair
                          </NavDropdown.Item>
                        </NavDropdown>
                      </li>
                      {/* AIR CONDITIONING */}
                      <li className="nav-item">
                        <NavDropdown
                          title="AIR CONDITIONING"
                          id="basic-nav-dropdown"
                        >
                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-air-conditioning-installation"
                            onClick={handleLinkClick}
                          >
                            AC Installation
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-air-conditioning-repair"
                            onClick={handleLinkClick}
                          >
                            AC Repairs
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-ductless-air-conditioner-repair-installation"
                            onClick={handleLinkClick}
                          >
                            Ductless AC
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-duct-cleaning-services"
                            onClick={handleLinkClick}
                          >
                            Duct Services
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-mini-split-ac-installation"
                            onClick={handleLinkClick}
                          >
                            Split System AC
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-ductless-system"
                            onClick={handleLinkClick}
                          >
                            Ductless System
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-air-conditioner-thermostat"
                            onClick={handleLinkClick}
                          >
                            AC Thermostat
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-air-conditioner-tune-up"
                            onClick={handleLinkClick}
                          >
                            AC Tune-UP
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-indoor-air-quality"
                            onClick={handleLinkClick}
                          >
                            Indoor Air Quality
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-air-conditioner-financing"
                            onClick={handleLinkClick}
                          >
                            AC Financing
                          </NavDropdown.Item>
                        </NavDropdown>
                      </li>
                      {/* HVAC */}
                      <li className="nav-item">
                        <NavDropdown title="HVAC" id="basic-nav-dropdown">
                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-air-duct-cleaning-services"
                            onClick={handleLinkClick}
                          >
                            Air Duct Services
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-air-handler-services"
                            onClick={handleLinkClick}
                          >
                            Air Handler Services
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-attic-crawl-space-hvac-installation"
                            onClick={handleLinkClick}
                          >
                            Attic & Crawl Space HVAC Installation
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-commercial-rooftop-hvac"
                            onClick={handleLinkClick}
                          >
                            Commercial Rooftop HVAC
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-ductless-hvac"
                            onClick={handleLinkClick}
                          >
                            Ductless HVAC
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-dryer-vent-cleaning"
                            onClick={handleLinkClick}
                          >
                            Dryer Vent Cleaning
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-heat-pump-installation-repair"
                            onClick={handleLinkClick}
                          >
                            Heat Pumps
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/san-diego-zone-control-systems"
                            onClick={handleLinkClick}
                          >
                            Zone Control Systems
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={Link}
                            href="/24-7-emergency-services"
                            onClick={handleLinkClick}
                          >
                            Emergency HVAC Repair Services
                          </NavDropdown.Item>
                        </NavDropdown>
                      </li>
                      {/* AIR PURIFICATION */}
                      {/* <li className="nav-item">
                        <NavDropdown
                          title="AIR PURIFICATION "
                          id="basic-nav-dropdown"
                          className="large-dropdown-menu"
                        >
                          <NavDropdown.Item
                            onClick={handleLinkClick}
                            as={Link}
                            href="/san-diego-air-filter-cleaner"
                          >
                            Air Filter Cleaner
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            onClick={handleLinkClick}
                            as={Link}
                            href="/san-diego-electronic-air-cleaner"
                          >
                            Electronic Air Cleaners
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            onClick={handleLinkClick}
                            as={Link}
                            href="/san-diego-forced-air-unit"
                          >
                            Forced Air Unit
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            onClick={handleLinkClick}
                            as={Link}
                            href="/san-diego-uv-light-system"
                          >
                            UV Light Systems
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            onClick={handleLinkClick}
                            as={Link}
                            href="/24-7-emergency-services"
                          >
                            24/7 Emergency Services
                          </NavDropdown.Item>
                        </NavDropdown>
                      </li> */}
                      <li className="nav-item">
                        <Link
                          className="nav-link last-child"
                          href="/contact-us"
                          onClick={handleLinkClick}
                        >
                          CONTACT US
                        </Link>
                      </li>
                      <li className="nav-item mob-view mt-4">
                        <div className="icon-wrapper">
                          <div className="icon-box">
                            <Image
                              src="/images/call_us.png"
                              width={66}
                              height={61}
                              alt="call us"
                              className="img-fluid"
                            />
                          </div>
                          <div className="contact-list">
                            <span className="contact-details">
                              San Diego County:{" "}
                              <a href="tel:+17603899117">(760) 389 9117</a>
                            </span>
                            <span className="contact-details">
                              Orange County:{" "}
                              <a href="tel:+19493906114">(949) 390 6114</a>
                            </span>
                            <span className="contact-details">
                              Riverside County:{" "}
                              <a href="tel:+19516442211">(951) 644-2211</a>
                            </span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </div>
          </Navbar>
        </div>
      </header>
    </>
  );
};
