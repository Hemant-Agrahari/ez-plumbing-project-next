"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar, Nav, Offcanvas, Image } from "react-bootstrap";
import { getCurrentDayAndTime } from '@/helper/dateDay'; // Adjust the import path as needed

export const Header = () => {
  // State variables to hold current day and time
  const [day, setDay] = useState<string>('');
  const [time, setTime] = useState<string>('');

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
  return (
    <header className="page-header bg-white sticky-top">
      <div className="container-xl">
        <Navbar expand="lg" className="bg-white">
          <div className="top-header">
            <Navbar.Brand href="/">
              <Image src="/images/logo.png" alt="logo" width={60} height={60} />
            </Navbar.Brand>
            <div className="head_time">
              <p>
                IT&apos;S <span className="day text-green">{day}</span>, {time} AND <span className="text-green">WE&apos;RE OPEN</span>
              </p>
              <p>
                TOLL FREE NUMBER :{" "}
                <span>
                  <Link href="tel:+18447557889" className="text-green">
                    (844) 755-7889
                  </Link>
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
                  <Link
                    href="tel:+17603899117"
                    className="header-phone text-green"
                  >
                    (760) 389 9117
                  </Link>
                </p>
                <p>
                  <span>Orange County:</span>
                  <Link
                    href="tel:+19493906114"
                    className="header-phone text-green"
                  >
                    (949) 390 6114
                  </Link>
                </p>
                <p>
                  <span>Riverside County:</span>
                  <Link
                    href="tel:+19516442211"
                    className="header-phone text-green"
                  >
                    (951) 644-2211
                  </Link>
                </p>
              </div>
            </div>
            <Navbar.Toggle aria-controls="offcanvasNavbar" />
          </div>
          <div className="menu-header">
            <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              placement="start"
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
                      <Link className="nav-link" aria-current="page" href="/">
                        HOME
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" aria-current="page" href="#">
                        WATER DAMAGE
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="#">
                        SLAB LEAK
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" aria-current="page" href="#">
                        PLUMBER
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="#">
                        WATER HEATER
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="#">
                        DRAIN SERVICES
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="#">
                        OTHER SERVICE
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="about-us">
                        ABOUT US
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="contact-us">
                        CONTACT US
                      </Link>
                    </li>
                  </ul>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </div>
        </Navbar>
      </div>
    </header>
  );
};
