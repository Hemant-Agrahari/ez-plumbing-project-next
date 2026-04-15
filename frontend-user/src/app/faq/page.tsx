"use client";
import React from "react";
import "../../styles/templates-global.css";
import InsuranceLogos from "@/components/Home/InsuranceLogos";
import "./faq.css";
import { Accordion } from "react-bootstrap";
import Testimonials from "@/components/Home/Testimonials";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
interface FAQQuestion {
  question: string;
  answer: string;
  optionalAnswer?: string; // optional
  list?: string[]; // optional
}

interface FAQSection {
  category: string;
  questions: FAQQuestion[];
}
const page = () => {
  const faqData: FAQSection[] = [
    {
      category: "Air Conditioning Repair",
      questions: [
        {
          question: "Why is my AC leaking water inside my home?",
          answer:
            "If your AC is leaking water inside your home, the prime reason can be blocked condensate drain lines. Debris such as dust, mold, dirty particles can clog the lines over time. In such a scenario, water can’t escape out, so it starts leaking inside your home. ",
          // optionalAnswer: 'If you can not figure out the real cause of the problem, immediately call the experienced AC repair technician to fix it.'
        },
        {
          question: "How long does it take to cool the house after AC repair?",
          answer:
            "The cooling of your house depends on the size, power, and age of your appliance. However, if your AC is not too old and the capacity of AC is right for your house, your house should be able to cool by 10 degrees Fahrenheit in three hours.",
        },
        {
          question: "Is it necessary to service my air conditioner?",
          answer:
            "Your air conditioner too experiences wear and tear just like other appliances. So, for optimal functioning, saving energy, and enjoying a pleasant and cool ambiance in your room, you need regular air conditioning maintenance services from experts. Air filters accumulate dirt, pollutant, and pollen, which needs to be cleaned regularly to avoid discomfort.",
        },
        {
          question: "What size of AC do I need?",
          answer:
            "Too large AC will cool the room quickly and satisfy the thermostat without eradicating sufficient moisture. So, you won’t feel comfortable due to the humid and sticky ambiance. At the same time, smaller units will take a long time to cool your room as well as have to work harder, which leads to high usage of energy. However, the size of AC not only depends on the size of your room but also depends on the types of wall, size of windows, attic conditions, insulations, and more. Consult experts to make the right choice for installing AC in your residence or office.",
        },
        {
          question:
            "I am looking for a new air conditioner for my home, so which brand is the best and most cost-effective?",
          answer:
            "The major factor of sorting the suitable brand for your home would be pricing that fits your budget. After that, you need to check the longevity of your unit, warranties, and SEER rating for energy efficiency to choose the best-suited AC brand for your home.",
        },
      ],
    },
    {
      category: "HVAC Repair",
      questions: [
        {
          question: "What are the signs that your HVAC is in need of repair?",
          answer:
            "If you notice a blow of hot air from your HVAC unit, weak airflow, unpleasant odor, unusual noise, a thermostat is not working properly, high utility bills, moisture leakage, humid air, or frequent issues, you need to immediately call a professional and get your HVAC repaired.",
        },

        {
          question: "How often should I have my HVAC system serviced?",
          answer:
            "It is best to service your cooling system during spring and heating system during the fall to have swift functioning of an HVAC unit all through the year.",
        },

        {
          question: "I need HVAC repair on weekends. What shall I do?",
          answer:
            "Don’t worry. EZ Heat and Air work 24×7 and during public holidays as well. So, whether you have issues at 3 am or on Sunday, or in the Christmas holiday, we are always available to serve you quick and hassle-free HVAC installation, maintenance, and repair services.",
        },
        {
          question:
            "My HVAC system is 15 years old and working properly. Should I go for repairs or install a new HVAC system?",
          answer:
            "Generally, the life expectancy of an HVAC system is 15 to 25 years, depending on the type of the system and how you care. If you have maintained your system aptly and had regular repairs, it will last longer. But once your unit reaches 15 years, it becomes less reliable and efficient. Consult our professional to know the extent of the issue; if it is minor, you can go for our efficient HVAC repair services. Otherwise, when the problems are major, instead of replacing many parts, installing a new system is justifiable as it will save monthly energy conservation and work efficiently.",
        },
        {
          question: "What type of fuel should I use to heat and cool my home?",
          answer:
            "Natural gas, electricity, oil, and solar panels are primary options for fuel that you can use to heat and cool your home. We will help you to get the most viable option based on your requirements and budget.",
        },
        {
          question: "Do you offer emergency HVAC repair services?",
          answer:
            "Yes, whether you need a water heater or furnace repair in the dark of frosty winter or emergency AC repair in the afternoon during peak hours, we are just a call away. Call us and schedule service at your convenience; our team is always ready and well-equipped to offer quick solutions and efficient services.",
        },
      ],
    },
    // {
    //   category: "Water Leak Detection",
    //   questions: [
    //     {
    //       question: "What are the causes of water leakage?",
    //       answer:
    //         "Clogged drains, damaged flapper or flush valve seals in toilets, corrosion in pipes, and high water pressure are the reasons for water leakage.",
    //       optionalAnswer:
    //         "If you’re experiencing it, rely on skilled and trained water leakage repair technicians at EZ Plumbing USA for fast and efficient services.",
    //     },
    //     {
    //       question: "Water is leaking from my shower pipe. What should I do?",
    //       answer:
    //         " The leakage can be due to a damaged shower arm. Damage can be due to the repeated adjustments of the pressure of the showerhead over the years. Replace the shower arm.",
    //       optionalAnswer:
    //         "In case leaking does not stop even after replacement, there can be issues in the drop-ear elbow or vertical shower pipe. Instead of playing guess games, it’s better to ask for professional assistance. Call our experts; they will be available at your scheduled time. We are available 24×7 to assist you.",
    //     },
    //   ],
    // },
    // {
    //   category: "Ceiling Leak Repair",
    //   questions: [
    //     {
    //       question:
    //         "What are the indicators that a ceiling leak is a part of bigger problems?",
    //       answer:
    //         "When you see broken shingles, punctured roofs with brown rainwater, cracks in the flashing, holes in the roof, etc., are indicators of ceiling leaks, which you can’t take lightly. This can cause significant damage to the structure, including walls and attic. Also, there is a risk of the spread of mold and mildew in your house.",
    //     },
    //     {
    //       question:
    //         "My roof is leaking and I don’t have the means to change the shingles right now. What should I do?",
    //       answer:
    //         "When the shingles are cracked or rotten and you don’t have the equipment to change, call EZ Plumbing USA pros to remove the damaged shingles and fix the new one with 6d galvanized nails.",
    //       optionalAnswer:
    //         "We understand the inconveniences you face due to roof leakage, so we provide an emergency roof repair service to fix your issue on time.",
    //     },
    //   ],
    // },
    // {
    //   category: "Slab Leak Repair",
    //   questions: [
    //     {
    //       question: "Will you tear my house to detect slab leak?",
    //       answer:
    //         " No, EZ Plumbing USA professionals are well-equipped with the latest technology. So, without any excavation, we will detect the slab leak through modern scanning and identification equipment. We assure you that after slab leak repair, your house will be in habitual condition.",
    //     },
    //     {
    //       question:
    //         "I suspect leakage underneath concrete slabs. How long would your slab leak detection experts take to repair a slab leak?",
    //       answer:
    //         "It will depend on how complicated it is to locate the leak and the degree of damage to your property. Generally, our experienced professional can complete all needed repairs in 2-3 days. They will even work 24 hours when the problem is serious if it is convenient for you. Your satisfaction is our pride.",
    //     },
    //   ],
    // },
    // {
    //   category: "Slab Leak Detection",
    //   questions: [
    //     {
    //       question:
    //         " I haven’t noticed a change in the water bill. How else might I detect that I have a slab leak?",
    //       answer:
    //         "If there is no change in your water bill, you need to look for the sound of running water. Especially in the nighttime, when all water sources are shut down, and still, you hear the sound, it could be an indication of a slab leak. There could be a busted pipe beneath the concrete slab. Another sign is a warm spot on the floor. When there are copper pipes, the leakages allow hot water to accumulate in the specific area. So, you notice hot spots on some areas of the floor.",
    //     },
    //     {
    //       question: "When is the perfect time to request slab leak detection?",
    //       answer:
    //         "The perfect time to request slab leak detection is immediately after you see any warning sign of slab leak. The more you are proactive, the lesser will be the damage, complication, and repair cost.",
    //     },
    //   ],
    // },
    // {
    //   category: "Water Damage Repair",
    //   questions: [
    //     {
    //       question: "In how much time will I get indications of water damage?",
    //       answer:
    //         "You can see signs of water damage immediately or in a few hours. But in some situations, it takes days or months to become visible. Whenever you see any warning signs, you need to act quickly to avoid yourself, your loved ones, and your home at risk.",
    //       optionalAnswer:
    //         "Precautions are always better than cure, so it’s wise to have regular plumbing inspections from our experienced plumber to detect leaks and fix them on site.",
    //     },
    //     {
    //       question:
    //         "The local plumber said that my crawl space is flooded. What is a crawl space and how do I fix it?",
    //       answer:
    //         "The crawl space is between the ground and your house, where plumbers and technicians access the piping and wiring system. During weather events or leakage, the excess water draws down the crawl space, and there are high chances of mold and mildew growth as this space is not exposed to sunlight.",
    //       optionalAnswer:
    //         "So, you need to take quick action and call a water damage expert who will fix the leakage as well as repair the damage. EZ Plumbing USA will offer a one-stop solution for water damage restoration and repair in your crawl space.",
    //     },
    //   ],
    // },
    // {
    //   category: "24/7 Emergency Plumber",
    //   questions: [
    //     {
    //       question:
    //         "What are the different types of emergency plumbing repair services offered by you?",
    //       answer:
    //         "All your plumbing needs are a priority for us. However, some plumbing issues need to be addressed quickly and efficiently before it gets critical.",
    //       list: [
    //         "Clogged Drains",
    //         "Faulty Shut Off",
    //         "Burst Pipes",
    //         "No Hot Water",
    //         "The Sump Pump is no longer working",
    //         "Toilet and Kitchen",
    //       ],
    //     },

    //     {
    //       question: " Will you come for leaking taps after business hours?",
    //       answer:
    //         "Yes, we do all kinds of projects, including leaking taps. We know even a minor leakage has the potential to waste gallons of water every week, so we take all minor leaks seriously and offer quick solutions for the same.",
    //       optionalAnswer:
    //         "If you find any small plumbing or heating issues, don’t hesitate to call us. Call us anytime as we are available 24/7.",
    //     },
    //     {
    //       question:
    //         "What if my plumbing emergency happens at 3 AM on the weekend?",
    //       answer:
    //         " Don’t worry; we will be there for you. Whether it is day or night, your skilled 24-hour plumbers will fix your plumbing issues in your time of need.",
    //     },
    //   ],
    // },
    // {
    //   category: "Drain Cleaning",
    //   questions: [
    //     {
    //       question: "How quickly should I expect the drain cleaning service?",
    //       answer:
    //         "We understand that drain clogging is not pleasant, so our drain cleaning team is always ready to help seven days a week and 24 hours a day. Whether the issue is minor or major, call us anytime without any hesitation. Our team will reach out to you in an hour.",
    //     },
    //     {
    //       question:
    //         "I hear the sound of running water outside my house. What shall I do?",
    //       answer:
    //         "It may be due to a broken or clogged pipeline of pure water or drain water. Call our expert to peep in your pipes and know the source. We will locate the source using our video inspection tool, and once we detect the problem, we will fix it instantly as our experts always carry all the necessary tools and equipment with them to offer prompt services.",
    //     },
    //     {
    //       question: "Why are my drains making bubbling noises?",
    //       answer:
    //         "Bubbling or gurgling noises from your drains indicate the blockage. However, water disruption and uneven outflow due to clogs result in such noises. Call our expert for drain cleaning services and unclog your drain lines.",
    //     },
    //   ],
    // },
    // {
    //   category: "Water Extraction",
    //   questions: [
    //     {
    //       question: " How long it will take to extract water from my property?",
    //       answer: " It depends on various factors:",
    //       list: [
    //         "Types of water – Fresh, Gray, or Blackwater",
    //         "Building size and types of material used",
    //         "Weather Condition",
    //         "Amount of water",
    //         "How quickly you call for emergency service",
    //       ],
    //       optionalAnswer:
    //         "Our professionals do complete inspections and evaluations of your property to determine the time required for the process. Moreover, we use all the latest tools, equipment, and industrial dehumidifiers to extract water and mitigate moisture quickly. We will not leave the place until the moisture level is zero and it is safe to live.",
    //     },
    //     {
    //       question:
    //         "Do I need to remove all the items from the house before you start the water extraction process?",
    //       answer:
    //         "No, you are not required to remove all items. All you need to do is give us a call, and the rest will be taken care of by our water extraction expert team.",
    //     },
    //     {
    //       question:
    //         "Do you offer a water extraction service after business hours?",
    //       answer:
    //         "Yes, we understand that the water flooding in the house is a traumatic experience, and it needs to be removed immediately before it damages the property and valuables. So, we are available 24 hours a day and even on weekends and holidays. After consulting with you on the phone, our team will reach out to you in just 60 minutes.",
    //     },
    //   ],
    // },
    // {
    //   category: "Tankless Water Heater",
    //   questions: [
    //     {
    //       question:
    //         " Should I replace my water heater with a tankless water heater?",
    //       answer:
    //         "There are many benefits of installing tankless water heaters ranging from saving money, environment-friendly to enough hot water throughout your home. Being small in size, it saves a lot of valuable floor space. Moreover, the tankless water heater is designed with materials that are long-lasting. Also, most of its parts can be replaced easily. You can rest easy for issues like corrosive leaks and the risk of expensive water damage.",
    //     },
    //     {
    //       question:
    //         "Can I install my new tankless in the same place as my old water heater?",
    //       answer:
    //         "Maybe, usually, tankless water heaters should be mounted on the wall. So, the space required would remain the same as your old water heater. However, you should consult with our experts to install the water heater precisely.",
    //     },
    //   ],
    // },
    // {
    //   category: "Water heater Repair",
    //   questions: [
    //     {
    //       question: "When should I repair a water heater?",
    //       answer:
    //         "If the water heater is not near to the end of its life and only a few things go wrong, repairing a water heater is a good choice for you. Before deciding whether you need repair or replacement, the professionals need to inspect the water heater to suggest the best option for you.",
    //     },
    //     {
    //       question:
    //         "The pilot in my water is off. How to make it work as there is no hot water?",
    //       answer:
    //         "Some of the internal parts of your water heater are malfunctioning, or the pilot light must have worn out. Consult with EZ Plumbing USA technicians to locate the issue and let you know the right solution for it.",
    //     },
    //   ],
    // },
    // More categories and questions can be added similarly...
  ];
  return (
    <>
      <header className="breadcrumbs px-0">
        <div className="container">
          <div className="breadcrumb-col">
            <div className="home-breadcrumb">
              <Link href="/" className="homes">
                Home
              </Link>
              <Image
                loading="lazy"
                alt=""
                src="/templates/chevronrightdouble.svg"
                width={24}
                height={24}
              />
              <span className="about-us1">Faq</span>
            </div>
          </div>
        </div>
      </header>
      <section className="faq-section my-60">
        <div className="container">
          <h2 className="title mb-3 mb-lg-4 text-center">
            Frequently Asked Questions
          </h2>

          {faqData.map((faqSection, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="mb-2 mb-lg-3 text-start text-green fs-24 fw-medium mt-md-5 mt-4">
                {faqSection.category}
              </h3>
              <Accordion defaultActiveKey={sectionIndex === 0 ? "0-0" : null}>
                {faqSection.questions.map((faq, questionIndex) => (
                  <Accordion.Item
                    eventKey={`${sectionIndex}-${questionIndex}`}
                    key={questionIndex}
                  >
                    <Accordion.Header>{faq.question}</Accordion.Header>
                    <Accordion.Body>
                      {faq.answer}
                      {faq.optionalAnswer && (
                        <p className="mt-2 text-muted">{faq.optionalAnswer}</p>
                      )}
                      {faq.list && (
                        <ul className="list-circle d-flex flex-column gap-2 mt-4">
                          {faq.list.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>
      <div className="pt-md-4 pt-3">
        <Testimonials />
      </div>
      {/* <InsuranceLogos /> */}
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "How do I stop water leaking from an air conditioner?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Whenever you find water leaking, first you need to switch off an AC and locate the reason for the leakage. Water leaking can be due to dirty coils, damaged insulation, clogged or disconnection of the drain line."
    }
  },{
    "@type": "Question",
    "name": "My air conditioner is over 12 years old and working properly, is it worth getting repaired?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "When your air conditioner has reached double-digit, repair is not a good option. Due to low efficiency, more energy will be consumed and your utility bills will be high. It would probably be cheaper to replace it with the new cost-effective air conditioner."
    }
  },{
    "@type": "Question",
    "name": "Why is my AC filter wet?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Having wet AC filters indicates a blockage in the condensate drain or pan. During air filtration, there are lots of pollutants and debris which may accumulate in the drainpipe, preventing moisture that is condensed into liquid in evaporator coils from draining away. Hence, there is no way to go, so the condensate backs up until the pan overflows, resulting in wet AC filters."
    }
  },{
    "@type": "Question",
    "name": "What are the causes of water leakage?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Clogged drains, damaged flapper or flush valve seals in toilets, corrosion in pipes, and high water pressure are the reasons for water leakage. If you’re experiencing it, rely on skilled and trained water leakage repair technicians at EZ Plumbing USA for fast and efficient services."
    }
  },{
    "@type": "Question",
    "name": "Water is leaking from my shower pipe. What should I do?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "The leakage can be due to a damaged shower arm. Damage can be due to the repeated adjustments of the pressure of the showerhead over the years. Replace the shower arm. In case leaking does not stop even after replacement, there can be issues in the drop-ear elbow or vertical shower pipe. Instead of playing guess games, it’s better to ask for professional assistance. Call our experts; they will be available at your scheduled time. We are available 24×7 to assist you."
    }
  },{
    "@type": "Question",
    "name": "What are the indicators that a ceiling leak is a part of bigger problems?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "When you see broken shingles, punctured roofs with brown rainwater, cracks in the flashing, holes in the roof, etc., are indicators of ceiling leaks, which you can’t take lightly. This can cause significant damage to the structure, including walls and attic. Also, there is a risk of the spread of mold and mildew in your house."
    }
  },{
    "@type": "Question",
    "name": "My roof is leaking and I don’t have the means to change the shingles right now. What should I do?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "When the shingles are cracked or rotten and you don’t have the equipment to change, call EZ Plumbing USA pros to remove the damaged shingles and fix the new one with 6d galvanized nails. We understand the inconveniences you face due to roof leakage, so we provide an emergency roof repair service to fix your issue on time."
    }
  },{
    "@type": "Question",
    "name": "Will you tear my house to detect slab leak?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "No, EZ Plumbing USA professionals are well-equipped with the latest technology. So, without any excavation, we will detect the slab leak through modern scanning and identification equipment. We assure you that after slab leak repair, your house will be in habitual condition."
    }
  },{
    "@type": "Question",
    "name": "I suspect leakage underneath concrete slabs. How long would your slab leak detection experts take to repair a slab leak?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "It will depend on how complicated it is to locate the leak and the degree of damage to your property. Generally, our experienced professional can complete all needed repairs in 2-3 days. They will even work 24 hours when the problem is serious if it is convenient for you. Your satisfaction is our pride."
    }
  },{
    "@type": "Question",
    "name": "I haven’t noticed a change in the water bill. How else might I detect that I have a slab leak?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "If there is no change in your water bill, you need to look for the sound of running water. Especially in the nighttime, when all water sources are shut down, and still, you hear the sound, it could be an indication of a slab leak. There could be a busted pipe beneath the concrete slab. Another sign is a warm spot on the floor. When there are copper pipes, the leakages allow hot water to accumulate in the specific area. So, you notice hot spots on some areas of the floor."
    }
  },{
    "@type": "Question",
    "name": "When is the perfect time to request slab leak detection?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "The perfect time to request slab leak detection is immediately after you see any warning sign of slab leak. The more you are proactive, the lesser will be the damage, complication, and repair cost."
    }
  },{
    "@type": "Question",
    "name": "In how much time will I get indications of water damage?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "You can see signs of water damage immediately or in a few hours. But in some situations, it takes days or months to become visible. Whenever you see any warning signs, you need to act quickly to avoid yourself, your loved ones, and your home at risk. Precautions are always better than cure, so it’s wise to have regular plumbing inspections from our experienced plumber to detect leaks and fix them on site."
    }
  },{
    "@type": "Question",
    "name": "The local plumber said that my crawl space is flooded. What is a crawl space and how do I fix it?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "The crawl space is between the ground and your house, where plumbers and technicians access the piping and wiring system. During weather events or leakage, the excess water draws down the crawl space, and there are high chances of mold and mildew growth as this space is not exposed to sunlight. So, you need to take quick action and call a water damage expert who will fix the leakage as well as repair the damage. EZ Plumbing USA will offer a one-stop solution for water damage restoration and repair in your crawl space."
    }
  },{
    "@type": "Question",
    "name": "What are the different types of emergency plumbing repair services offered by you?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "All your plumbing needs are a priority for us. However, some plumbing issues need to be addressed quickly and efficiently before it gets critical.

Clogged Drains
Faulty Shut Off
Burst Pipes
No Hot Water
The Sump Pump is no longer working
Last-minute repair"
    }
  },{
    "@type": "Question",
    "name": "Will you come for leaking taps after business hours?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes, we do all kinds of projects, including leaking taps. We know even a minor leakage has the potential to waste gallons of water every week, so we take all minor leaks seriously and offer quick solutions for the same. If you find any small plumbing or heating issues, don’t hesitate to call us. Call us anytime as we are available 24/7."
    }
  },{
    "@type": "Question",
    "name": "What if my plumbing emergency happens at 3 AM on the weekend?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Don’t worry; we will be there for you. Whether it is day or night, your skilled 24-hour plumbers will fix your plumbing issues in your time of need."
    }
  },{
    "@type": "Question",
    "name": "How quickly should I expect the drain cleaning service?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "We understand that drain clogging is not pleasant, so our drain cleaning team is always ready to help seven days a week and 24 hours a day. Whether the issue is minor or major, call us anytime without any hesitation. Our team will reach out to you in an hour."
    }
  },{
    "@type": "Question",
    "name": "I hear the sound of running water outside my house. What shall I do?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "It may be due to a broken or clogged pipeline of pure water or drain water. Call our expert to peep in your pipes and know the source. We will locate the source using our video inspection tool, and once we detect the problem, we will fix it instantly as our experts always carry all the necessary tools and equipment with them to offer prompt services."
    }
  },{
    "@type": "Question",
    "name": "Why are my drains making bubbling noises?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Bubbling or gurgling noises from your drains indicate the blockage. However, water disruption and uneven outflow due to clogs result in such noises. Call our expert for drain cleaning services and unclog your drain lines."
    }
  },{
    "@type": "Question",
    "name": "How long it will take to extract water from my property?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "It depends on various factors:

Types of water – Fresh, Gray, or Blackwater
Building size and types of material used
Weather Condition
Amount of water
How quickly you call for emergency service
Our professionals do complete inspections and evaluations of your property to determine the time required for the process. Moreover, we use all the latest tools, equipment, and industrial dehumidifiers to extract water and mitigate moisture quickly. We will not leave the place until the moisture level is zero and it is safe to live."
    }
  },{
    "@type": "Question",
    "name": "Do I need to remove all the items from the house before you start the water extraction process?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "No, you are not required to remove all items. All you need to do is give us a call, and the rest will be taken care of by our water extraction expert team."
    }
  },{
    "@type": "Question",
    "name": "Do you offer a water extraction service after business hours?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes, we understand that the water flooding in the house is a traumatic experience, and it needs to be removed immediately before it damages the property and valuables. So, we are available 24 hours a day and even on weekends and holidays. After consulting with you on the phone, our team will reach out to you in just 60 minutes."
    }
  },{
    "@type": "Question",
    "name": "Should I replace my water heater with a tankless water heater?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "There are many benefits of installing tankless water heaters ranging from saving money, environment-friendly to enough hot water throughout your home. Being small in size, it saves a lot of valuable floor space. Moreover, the tankless water heater is designed with materials that are long-lasting. Also, most of its parts can be replaced easily. You can rest easy for issues like corrosive leaks and the risk of expensive water damage."
    }
  },{
    "@type": "Question",
    "name": "Can I install my new tankless in the same place as my old water heater?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Maybe, usually, tankless water heaters should be mounted on the wall. So, the space required would remain the same as your old water heater. However, you should consult with our experts to install the water heater precisely."
    }
  },{
    "@type": "Question",
    "name": "When should I repair a water heater?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "If the water heater is not near to the end of its life and only a few things go wrong, repairing a water heater is a good choice for you. Before deciding whether you need repair or replacement, the professionals need to inspect the water heater to suggest the best option for you."
    }
  },{
    "@type": "Question",
    "name": "The pilot in my water is off. How to make it work as there is no hot water?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Some of the internal parts of your water heater are malfunctioning, or the pilot light must have worn out. Consult with EZ Plumbing USA technicians to locate the issue and let you know the right solution for it."
    }
  }]
}`,
        }}
      ></Script>
    </>
  );
};

export default page;
