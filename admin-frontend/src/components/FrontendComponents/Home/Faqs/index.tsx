import React from "react";
import Accordion from "react-bootstrap/Accordion";

export const Faqs = () => {
  return (
    <section className="faq-section my-60">
      <div className="container">
        <h2 className="title mb-3 mb-lg-4 text-center">FAQS</h2>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              What plumbing services do you offer?
            </Accordion.Header>
            <Accordion.Body>
              EZ Plumbing USA provides services like leak detection and
              emergency fixes. They also maintain water heaters and fix sewer
              lines.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              Do you offer emergency plumbing services?
            </Accordion.Header>
            <Accordion.Body>
              EZ Plumbing USA provides services like leak detection and
              emergency fixes. They also maintain water heaters and fix sewer
              lines.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              How can I schedule an appointment?
            </Accordion.Header>
            <Accordion.Body>
              EZ Plumbing USA provides services like leak detection and
              emergency fixes. They also maintain water heaters and fix sewer
              lines.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Do you offer free estimates?</Accordion.Header>
            <Accordion.Body>
              EZ Plumbing USA provides services like leak detection and
              emergency fixes. They also maintain water heaters and fix sewer
              lines.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>What areas do you serve?</Accordion.Header>
            <Accordion.Body>
              EZ Plumbing USA provides services like leak detection and
              emergency fixes. They also maintain water heaters and fix sewer
              lines.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header>
              What are the signs of a slab leak?
            </Accordion.Header>
            <Accordion.Body>
              EZ Plumbing USA provides services like leak detection and
              emergency fixes. They also maintain water heaters and fix sewer
              lines.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </section>
  );
};

export default Faqs;
