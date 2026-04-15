"use client"
import { ImageProps, SliderSettings } from '@/types/interface';
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';

const InsuranceLogos: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sliderSettings: SliderSettings = {
    infinite: false,
    slidesToShow: 2.3,
    slidesToScroll: 2,
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const logos: ImageProps[] = [
    { src: '/images/aaa.png', alt: 'AAA', width: 143, height: 86 },
    { src: '/images/allied-insurance.png', alt: 'Allied Insurance', width: 221, height: 98 },
    { src: '/images/allstate.png', alt: 'Allstate', width: 211, height: 94 },
    { src: '/images/chubb.png', alt: 'Chubb', width: 106, height: 86 },
    { src: '/images/mercury.png', alt: 'Mercury', width: 211, height: 94 },
    { src: '/images/farmers.png', alt: 'Farmers', width: 207, height: 92 },
    { src: '/images/fireman-fund.png', alt: 'Fireman Fund', width: 199, height: 89 },
    { src: '/images/liberty-mutual.png', alt: 'Liberty Mutual', width: 201, height: 90 },
    { src: '/images/pacific-specialty.png', alt: 'Pacific Specialty', width: 211, height: 95 },
    { src: '/images/safeco-insurance.png', alt: 'Safeco Insurance', width: 224, height: 62 },
    { src: '/images/state-farm.png', alt: 'State Farm', width: 221, height: 60 },
    { src: '/images/tower-group.png', alt: 'Tower Group', width: 178, height: 110 },
    { src: '/images/travelers.png', alt: 'Travelers', width: 222, height: 63 },
  ];

  return (
    <section className="insurance-directly py-60 mx-60 w-100">
      <div className="container max-container">
        <h2 className="title mb-3 mb-lg-4 text-center">We Bill Insurance Directly</h2>
      </div>
      <div className="container max-container insurance-container">
        {isMobile ? (
          <Slider {...sliderSettings} className="insurance-logos">
            {logos.map(({ src, alt, width, height }, index) => (
              <div className="insurance-logo" key={index}>
                <img alt={alt} src={src} width={width} height={height} />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="insurance-logos">
            {logos.map(({ src, alt, width, height }, index) => (
              <div className="insurance-logo" key={index}>
                <img alt={alt} src={src} width={width} height={height} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default InsuranceLogos;
