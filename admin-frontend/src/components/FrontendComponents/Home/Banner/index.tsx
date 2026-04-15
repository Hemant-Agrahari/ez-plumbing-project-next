import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <>
      <section className="home-banner">
        <div className="container">
          <div className="banner-col">
            <div className="banner-content">
              <h2 className="title">
                We Offer Professional Plumbers in San Diego, Anaheim, Riverside,
                Los Angeles, Orange County and Irvine
              </h2>
              <div className="small-title mt-3 mb-3 pb-xl-2">
                The Go-To -Shop for All Plumbing Concerns
              </div>
              <p className="dec">
                Are you dealing with slab leaks, pouring faucets, leaky water
                lines, clogged drains or problems with your water heater? Our
                qualified specialists tackle plumbing problems, from slab leak
                repair to water heating system repair.
              </p>
              <p className="dec mb-0">
                Unexpected plumbing issues, such as leaks and broken water
                heaters, can occur. It is not the right thing to wait. For
                dependable, reasonably priced, and assured plumbing solutions,
                including skilled slab leak detection, get in touch with our
                residential plumbers right now. We employ cutting-edge methods
                to find and address slab leaks and maintain the stability of
                your home&apos;s foundation. A plumbing problem shouldn&apos;t be
                disregarded just because it occurs after regular business hours.
                Give us a call right away!
              </p>
            </div>
            <div className="banner-contact-form">
              <form className="contact-form">
                <div className="semi-small-title text-center mb-3">
                  CONTACT US NOW!
                </div>
                <div className="inputField">
                  <input
                    className="text-field"
                    type="name"
                    name="name"
                    id="name"
                    placeholder="Name"
                  />
                </div>
                <div className="inputField">
                  <input
                    className="text-field"
                    type="Email"
                    name="email"
                    id="email"
                    placeholder="Email"
                  />
                </div>
                <div className="inputField">
                  <input
                    className="text-field"
                    type="number"
                    name="number"
                    id="number"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="inputField">
                  <textarea
                    className="text-field"
                    name="message"
                    id="message"
                    placeholder="Message"
             
                  ></textarea>
                </div>
                <p className="privacy text-green">
                  100% PRIVACY -WE NEVER SPAM YOU
                </p>
                <button
                  className="btn btn-primary bg-green w-100"
                  type="button"
                >
                  SEND
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <div className="solutions">
        <div className="container">
          <div className="solutions-contact">
            <div className="solutions-contact-title">
              Call Us 24x7 at
              <Link href="tel:+7603899117" className="call">
                (760) 389 9117
              </Link>
            </div>
            <p className="solutions-dec">
              Contact EZ Plumbing USA for superior
              <br />
              plumbing solutions!!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
