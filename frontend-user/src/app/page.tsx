import Banner from "@/components/Home/Banner";
import InstallationRepair from "@/components/Home/InstallationRepair";
import Trusted from "@/components/Home/Trusted";
import AvailableService from "@/components/Home/AvailableService";
import Testimonials from "@/components/Home/Testimonials";
import AdditionalServices from "@/components/Home/AdditionalServices";
import PlumbingServices from "@/components/Home/PlumbingServices";
import Faqs from "@/components/Home/Faqs";
import Script from "next/script";
import Blogs from "@/components/Home/Blogs";
import Location from "@/components/Home/Location";
import InsuranceLogos from "@/components/Home/InsuranceLogos";
import OfferPage from "@/components/Home/Offer";
export const metadata = {
  title:
    "Expert HVAC Services & Repairs in San Diego – Contact Us Today! | EZ Heat & Air",
  description:
    "Looking for expert HVAC services? EZ Heat and Air provides top-quality repairs, installations, and maintenance. Book your service today and stay comfortable!",
  alternates: {
    canonical: "https://www.ezheatandair.com/",
  },
  // keywords: blogData.tags,
  publisher: "EZplumbingusa",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    locale: "en_US",
    type: "article",
    title:
      "Expert HVAC Services & Repairs in San Diego – Contact Us Today! | EZ Heat & Air",
    description:
      "Looking for expert HVAC services? EZ Heat and Air provides top-quality repairs, installations, and maintenance. Book your service today and stay comfortable!",
    url: "https://www.ezheatandair.com/",
    site_name: "EZheatandair",
    // published_time: '2024-09-16T08:13:13+00:00',
    // images: [
    //   {
    //     url: `https://www.ezplumbingusa.com${blogData.bannerImage}`,
    //     width: 825,
    //     height: 388,
    //     type: 'image/jpeg',
    //   },
    // ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // twitter: {
  //   card: 'summary_large_image',
  //   label1: 'Est. reading time',
  //   data1: '6 minutes',
  // },
};
export default async function Page({ params }: { params: { slug: string } }) {
  const schema1 = `
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "EZ Heat and Air",
  "image": "https://www.ezheatandair.com/images/ez-brand-logo.png",
  "@id": "https://en.wikipedia.org/wiki/San_Diego_California_area",
  "url": "https://www.ezheatandair.com/",
  "telephone": "844-755-7889",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "29610 Buena Tierra",
    "addressLocality": "Sun City",
    "addressRegion": "CA",
    "postalCode": "92586",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 33.6904912,
    "longitude": -117.1822276
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  },
  "sameAs": [
    "https://www.yelp.com/biz/ez-heat-and-air-sun-city",
    "https://www.ezheatandair.com/",
    "https://www.mapquest.com/us/california/ez-heat-and-air-san-diego-440603622"
  ] 
}
`;

  const schema2 = `
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "EZ Heat and Air",
  "alternateName": "EZ Heat & Air",
  "url": "https://www.ezheatandair.com/",
  "logo": "https://www.ezheatandair.com/images/ez-brand-logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "844-755-7889",
    "contactType": "customer service",
    "contactOption": "TollFree",
    "areaServed": "US"
  }
}`;

  const schema3 = `{
  "@context": "https://schema.org/",
  "@type": "HVACBusiness",
  "image": "https://www.ezheatandair.com/images/ez-brand-logo.png",
  "priceRange": "$",
  "telephone": "844-755-7889",
  "name": "EZ Heat and Air",
  "legalName": "EZ Heat and Air",
  "logo": "https://www.ezheatandair.com/images/ez-brand-logo.png",
  "hasMap": "https://maps.app.goo.gl/j6eRiQ6GNxQRVtow6",
  "description": "EZ Heat and Air is your trusted partner for comprehensive HVAC services in San Diego, Orange County, and Riverside, California. Our team of certified and licensed technicians delivers top-notch heating and cooling system installations, repairs, and maintenance. We pride ourselves on offering 24/7 emergency services, ensuring our clients receive prompt and efficient solutions. Committed to customer satisfaction, we provide fair pricing, quality workmanship, and advanced technology to address all your HVAC needs. Choose EZ Heat and Air for reliable, professional service you can count on.",
  "openingHours": "24 hours",
  "geo": {
    "@type": "GeoCoordinates",
    "longitude": "-117.18222760",
    "latitude": "33.69049120"
  },
  "areaServed": {
    "@type": "Place",
    "name": "San Diego, Orange County, Riverside, CA"
  },
  "url": "https://www.ezheatandair.com/",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "844-755-7889",
    "contactType": "Customer Service",
    "email": "sales@ezheatandair.com",
    "availableLanguage": "English"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "United States",
    "addressLocality": "Sun City",
    "addressRegion": "CA",
    "postalCode": "92586",
    "streetAddress": "29610 Buena Tierra"
  },
  "sameAs": [
    "https://www.yelp.com/biz/ez-heat-and-air-sun-city",
    "https://www.facebook.com/ezheatandair",
    "https://twitter.com/ezheatandair"
  ]
}
`;

  const schema4 = `
{
  "@context": "http://schema.org",
  "@type": "SiteNavigationElement",
  "name": [
    "Air Conditioning",
    "Heating",
    "Duct Cleaning",
    "Air Purification",
    "Maintenance Plan",
    "HVAC Services"
  ],
  "url": [
    "https://www.ezheatandair.com/",
    "https://www.ezheatandair.com/san-diego-central-heating-installation/",
    "https://www.ezheatandair.com/san-diego-heating-repair/",
    "https://www.ezheatandair.com/san-diego-heat-pump-installation-repair/",
    "https://www.ezheatandair.com/san-diego-hvac-package-unit/",
    "https://www.ezheatandair.com/san-diego-ductless-heating/",
    "https://www.ezheatandair.com/san-diego-air-conditioning-installation/",
    "https://www.ezheatandair.com/san-diego-air-conditioning-repair/",
    "https://www.ezheatandair.com/san-diego-ductless-air-conditioner-repair-installation/",
    "https://www.ezheatandair.com/san-diego-duct-cleaning-services/",
    "https://www.ezheatandair.com/san-diego-ductless-system/",
    "https://www.ezheatandair.com/san-diego-air-conditioner-tune-up/",
    "https://www.ezheatandair.com/san-diego-air-duct-cleaning-services/",
    "https://www.ezheatandair.com/san-diego-air-conditioner-coil-cleaner/",
    "https://www.ezheatandair.com/about-us/",
    "https://www.ezheatandair.com/blog/",
    "https://www.ezheatandair.com/contact-us/"
  ]
}
`;

  const schema5 = `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What types of heating and air conditioning services do you offer?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "We offer various HVAC services, including air conditioner maintenance, installation and repair, heating repair and installation, duct cleaning, thermostat installations, and emergency HVAC services. We cater to both residential and commercial needs, ensuring optimal comfort year-round."
    }
  },{
    "@type": "Question",
    "name": "How often should I schedule maintenance for my HVAC system?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "We recommend scheduling maintenance for your HVAC system at least once a year. It's best to have air conditioners serviced in the spring and schedule service in the fall for heating systems. Regular maintenance ensures optimal performance and extends the lifespan of your system."
    }
  },{
    "@type": "Question",
    "name": "How can I improve the energy efficiency of my heating and cooling system?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Improving energy efficiency starts with regular air conditioner maintenance and ensuring your system is up to date. Consider upgrading to energy-efficient systems, sealing air leaks, using programmable thermostats, and cleaning ducts regularly to reduce strain on the system and save energy."
    }
  },{
    "@type": "Question",
    "name": "Do you offer emergency heating and cooling services?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes, we provide 24/7 emergency HVAC services. Whether it's a sudden AC breakdown in the middle of summer or a furnace failure during winter, our team is always ready to restore comfort to your home quickly."
    }
  },{
    "@type": "Question",
    "name": "What should I do if my air conditioner isn’t cooling properly?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "If your AC isn't cooling properly, check for simple issues like a dirty filter, thermostat settings, or blocked vents. If these aren’t the cause, it's best to call a professional for air conditioner maintenance to identify and fix any underlying problems."
    }
  },{
    "@type": "Question",
    "name": "What should I do if I need Air Conditioning Repair in San Diego?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Check the thermostat and power supply if your AC isn't working. If the issue continues, contact our team for air conditioning repair in San Diego. We offer fast, reliable service to restore comfort quickly."
    }
  }]
}
`;

  return (
    <>
      <noscript>
        {/* <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PSWVXV8" height="0" width="0" style={{ display: "none", visibility: "hidden" }}>
        </iframe> */}
      </noscript>
      <Banner />
      {/* <OfferPage/> */}
      <InstallationRepair />
      <Trusted />
      <AvailableService />
      <Testimonials />
      <AdditionalServices />
      <PlumbingServices />
      <Faqs />
      <Blogs />
      <Location />
      <InsuranceLogos />
      <Script
        id="script1"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schema1 }}
      ></Script>
      <Script
        id="script2"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schema2 }}
      ></Script>
      <Script
        id="script3"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: schema3,
        }}
      ></Script>
      <Script
        id="script4"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: schema4,
        }}
      ></Script>
      <Script
        id="script5"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: schema5,
        }}
      ></Script>
    </>
  );
}
