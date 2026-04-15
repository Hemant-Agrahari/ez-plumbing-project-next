"use client";

import React from "react";
import Accordion from "react-bootstrap/Accordion";

export const Faqs = () => {
  return (
    <section className="faq-section my-60">
      <div className="container">
        <h2 className="title mb-3 mb-lg-4 text-center">FAQS</h2>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header as="h3">
              What types of heating and air conditioning services do you offer?
            </Accordion.Header>
            <Accordion.Body>
              We offer various HVAC services, including air conditioner
              maintenance, installation and repair, heating repair and
              installation, duct cleaning, thermostat installations, and{" "}
              <strong>emergency HVAC services</strong>. We cater to both
              residential and commercial needs, ensuring optimal comfort
              year-round.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header as="h3">
              How often should I schedule maintenance for my HVAC system?
            </Accordion.Header>
            <Accordion.Body>
              We recommend scheduling maintenance for your HVAC system at least
              once a year. It&apos;s best to have air conditioners serviced in
              the spring and schedule service in the fall for heating systems.
              Regular maintenance ensures optimal performance and extends the
              lifespan of your system.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header as="h3">
            How can I improve the energy efficiency of my heating and cooling system?
            </Accordion.Header>
            <Accordion.Body>
              Improving energy efficiency starts with regular air conditioner
              maintenance and ensuring your system is up to date. Consider
              upgrading to energy-efficient systems, sealing air leaks, using
              programmable thermostats, and cleaning ducts regularly to reduce
              strain on the system and save energy.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header as="h3">
              {" "}
              Do you offer emergency heating and cooling services?
            </Accordion.Header>
            <Accordion.Body>
              Yes, we provide 24/7 <strong>emergency HVAC services</strong>.
              Whether it&apos;s a sudden AC breakdown in the middle of summer or
              a furnace failure during winter, our team is always ready to
              restore comfort to your home quickly.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header as="h3">
              {" "}
              What should I do if my air conditioner isn’t cooling properly?
            </Accordion.Header>
            <Accordion.Body>
              If your AC isn’t cooling properly, check for simple issues like a
              dirty filter, thermostat settings, or blocked vents. If these
              aren’t the cause, it&apos;s best to call a professional for{" "}
              <strong>air conditioner maintenance </strong> to identify and fix
              any underlying problems.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header as="h3">
              What should I do if I need Air Conditioning Repair in San Diego?
            </Accordion.Header>
            <Accordion.Body>
              Check the thermostat and power supply if your AC isn’t working. If
              the issue continues, contact our team for{" "}
              <strong>air conditioning repair in San Diego</strong>. We offer
              fast, reliable service to restore comfort quickly.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </section>
  );
};

export default Faqs;
