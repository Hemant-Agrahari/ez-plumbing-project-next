"use client";

import React from "react";

const OfferPage = () => {
  return (
    <section className="membership-card-wrapper">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="membership-card">
              <h2 className="title">Standard EZ Membership</h2>
              <span className="big-num">$100/year</span>
              <ul className="card-list ms-4">
                <li>Priority scheduling for plumbing needs</li>
                <li>10% discount on every service</li>
                <li>Free annual plumbing system check-up</li>
              </ul>
              <ul className="card-list-list-1 ms-2">
                <li>Reliable and cost-effective service for loyal customers</li>
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <div className="membership-card">
              <h2 className="title">Friends & Family EZ Membership</h2>
              <span className="big-num">$150/year</span>
              <ul className="card-list ms-4">
                <li>Priority scheduling for you and referrals</li>
                <li>10% discount for you and your referrals</li>
                <li>Unlimited referrals with perks</li>
                <li>Free annual plumbing check-up</li>
              </ul>
              <ul className="card-list-list-1 ms-2">
                <li>
                  Encourage loyalty and grow the EZ Plumbing community with
                  shared benefits
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .membership-card-wrapper {
          padding-block: 30px;
        }

        .membership-card-wrapper .membership-card {
          padding: clamp(24px, 3.1vw, 48px);
          background: radial-gradient(
            68.61% 250.77% at 35.87% 21.53%,
            rgba(255, 255, 255, 0.2) 0%,
            rgba(49, 160, 91, 0.2) 100%
          );
          border-radius: 12px;
          height: 100%;
        }

        .membership-card-wrapper .membership-card .title {
          color: #2d2d2d;
          font-weight: 700;
          font-size: clamp(20px, 2.35vw, 32px);
          line-height: clamp(30px, 2vw, 48px);
          margin-bottom: clamp(16px, 3.1vw, 24px);
        }

        .membership-card-wrapper .membership-card .big-num {
          font-size: clamp(32px, 3.72vw, 48px);
          color: #319a52;
          font-weight: 600;
          line-height: clamp(44.2px, 3.1vw, 67.2px);
          margin-bottom: 32px;
          display: block;
        }

        .membership-card-wrapper .membership-card .card-list {
          border-bottom: 1px solid #c9c9c9;
          border-top: 1px solid #c9c9c9;
          padding-block: clamp(16px, 3.1vw, 32px);
          margin: 0;
        }

        .membership-card-wrapper .membership-card .card-list li {
          font-size: clamp(16px, 1.756vw, 20px);
          color: #2d2d2d;
          font-weight: 500;
          line-height: clamp(24px, 3.1vw, 30px);
          list-style-type: disc;
        }

        .membership-card-wrapper .membership-card .card-list-list-1 {
          border: none;
          font-weight: 700 !important;
          font-size: clamp(16px, 1.756vw, 20px);
          line-height: clamp(24px, 3.1vw, 30px);
          list-style-type: disc;
          margin: 0;
          padding-top: clamp(16px, 3.1vw, 24px);
        }
      `}</style>
    </section>
  );
};

export default OfferPage;
