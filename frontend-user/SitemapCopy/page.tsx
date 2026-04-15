"use client";
import React from "react";
import "../../styles/templates-global.css";
import InsuranceLogos from "@/components/Home/InsuranceLogos";
import "./sitemap.css";
import { Tab, Tabs } from "react-bootstrap";
import Link from "next/link";
import Head from "next/head";
interface SitemapData {
  [key: string]: {
    title: string;
    categories: {
      title: string;
      url?: string;
      links: {
        text: string;
        href: string;
        target?: string;
      }[];
    }[];
  };
}
const page = () => {
  const sitemapData = {
    pages: {
      title: "Pages",
      categories: [
        {
          title: "",
          links: [
            {
              text: "24/7 Emergency Services",
              href: "/24-7-emergency-services/",
            },
            { text: "About Us", href: "/about-us/" },
            {
              text: "Affordable Tankless Water Heater Installation In Orange County?",
              href: "/orange-county-tankless-water-heater-repair-installation/",
            },
            { text: "Blog", href: "/blog/" },
            { text: "Contact Us", href: "/contact-us/" },
            { text: "Duct Cleaning", href: "/duct-cleaning-amp/" },
            {
              text: "Expert Water Heater Repair Service Providers In Orange County",
              href: "/orange-county-water-heater-repair-installation/",
            },
            { text: "FAQ", href: "/faq/" },
            { text: "Home", href: "/" },
            {
              text: "los angeles air conditioner repair installation",
              href: "/los-angeles-air-conditioner-repair-installation/",
            },
            {
              text: "los angeles air duct cleaning services",
              href: "/los-angeles-air-duct-cleaning-services/",
            },
            {
              text: "los angeles emergency plumbing services",
              href: "/los-angeles-emergency-plumbing-services/",
            },
            {
              text: "Los Angeles Tankless Water Heater Repair Installation",
              href: "/los-angeles-tankless-water-heater-repair-installation/",
            },
            {
              text: "los angeles water heater repair installation",
              href: "/los-angeles-water-heater-repair-installation/",
            },
            {
              text: "Orange County Heat Pump",
              href: "/orange-county-heat-pump/",
            },
            {
              text: "Orange County Heating Repair",
              href: "/orange-county-heating-repair/",
            },
            {
              text: "Orange County HVAC Repair & Installation",
              href: "/orange-county-hvac-repair-installation/",
            },
            {
              text: "Orange County Water Heater Installation Service",
              href: "/orange-county-water-heater-installation-service/",
            },
            {
              text: "Riverside Heating Repair",
              href: "/riverside-heating-repair/",
            },
            {
              text: "Riverside Heating Repair",
              href: "/riverside-heating-repair/",
            },
            { text: "Riverside HVAC Repair", href: "/riverside-hvac-repair/" },
            {
              text: "Riverside Tankless Water Heater Repair Installation",
              href: "/riverside-tankless-water-heater-repair-installation/",
            },
            {
              text: "riverside water heater repair installation",
              href: "/riverside-water-heater-repair-installation/",
            },
            {
              text: "San Diego AC Coil Cleaner",
              href: "/san-diego-air-conditioner-coil-cleaner/",
            },
            {
              text: "San Diego Air Conditioner Financing",
              href: "/san-diego-air-conditioner-financing/",
            },
            {
              text: "San Diego Air Conditioning Installation",
              href: "/san-diego-air-conditioning-installation/",
            },
            {
              text: "San Diego Air Conditioning Repair",
              href: "/san-diego-air-conditioning-repair/",
            },
            {
              text: "San Diego Air Conditioning Thermostat Service",
              href: "/san-diego-air-conditioner-thermostat/",
            },
            {
              text: "San Diego Air Conditioning Tune-UP",
              href: "/san-diego-air-conditioner-tune-up/",
            },
            {
              text: "San Diego Air Duct Cleaning Services",
              href: "/san-diego-air-duct-cleaning-services/",
            },
            {
              text: "San Diego Air Filter Cleaner",
              href: "/san-diego-air-filter-cleaner/",
            },
            {
              text: "San Diego Central Heating Installation",
              href: "/san-diego-central-heating-installation/",
            },
            {
              text: "San Diego Duct Cleaning Services",
              href: "/san-diego-duct-cleaning-services/",
            },
            {
              text: "San Diego Ductless Air Conditioner Repair Installation",
              href: "/san-diego-ductless-air-conditioner-repair-installation/",
            },
            {
              text: "San Diego Ductless Heating",
              href: "/san-diego-ductless-heating/",
            },
            {
              text: "San Diego Ductless System",
              href: "/san-diego-ductless-system/",
            },
            {
              text: "San Diego Electronic Air Cleaners",
              href: "/san-diego-electronic-air-cleaner/",
            },
            {
              text: "San Diego Forced Air Unit",
              href: "/san-diego-forced-air-unit/",
            },
            {
              text: "San Diego Heat Pump Contractors",
              href: "/san-diego-heat-pump-contractors/",
            },
            {
              text: "San Diego Heat Pump Installation Repair",
              href: "/san-diego-heat-pump-installation-repair/",
            },
            {
              text: "San Diego Heater Tune Up",
              href: "/san-diego-heater-tune-up/",
            },
            {
              text: "San Diego Heating Installation Replacement",
              href: "/san-diego-heating-installation-replacement/",
            },
            {
              text: "San Diego Heating Repair",
              href: "/san-diego-heating-repair/",
            },
            {
              text: "San Diego Heating Repair Service",
              href: "/san-diego-heating-repair-service/",
            },
            {
              text: "San Diego HVAC Financing",
              href: "/san-diego-hvac-financing/",
            },
            {
              text: "San Diego HVAC Package Unit",
              href: "/san-diego-hvac-package-unit/",
            },
            { text: "San Diego HVAC Repair", href: "/san-diego-hvac-repair/" },
            {
              text: "San Diego Hybrid HVAC System",
              href: "/san-diego-hybrid-hvac-system/",
            },
            {
              text: "San Diego Indoor Air Quality",
              href: "/san-diego-indoor-air-quality/",
            },
            {
              text: "San Diego Mini Split AC Installation",
              href: "/san-diego-mini-split-ac-installation/",
            },
            {
              text: "San Diego Tankless Water Heater Repair Installation",
              href: "/san-diego-tankless-water-heater-repair-installation/",
            },
            {
              text: "San Diego Thermostat Services",
              href: "/san-diego-thermostat-installation/",
            },
            {
              text: "San Diego Thermostats Systems",
              href: "/san-diego-thermostats-and-hybrid-systems/",
            },
            {
              text: "San Diego UV Light System",
              href: "/san-diego-uv-light-system/",
            },
            {
              text: "San Diego Wall Heater Repair Installation",
              href: "/san-diego-wall-heater-repair-installation/",
            },
            {
              text: "San Diego Water Heater Repair Installation",
              href: "/san-diego-water-heater-repair-installation/",
            },
            {
              text: "San Diego Camera Inspection",
              href: "/san-diego-camera-inspection"
            },
            {
              text: "San Diego Trenchless Sewer Lining",
              href: "/san-diego-trenchless-sewer-lining"
            },
            {
              text: "San Diego Drain Cleaning",
              href: "/san-diego-drain-cleaning"
            },
            {
              text: "San Diego Drain Repair",
              href: "/san-diego-drain-repair"
            },
            {
              text: "San Diego Drain Replacement & Installation",
              href: "/san-diego-drain-replacement-installation"
            },
            {
              text: "San Diego Snaking & Hydro Jetting",
              href: "/san-diego-snaking-hydro-jetting"
            },
            {
              text: "San Diego Heater Tune Ups",
              href: "/san-diego-heater-tune-ups"
            },
            {
              text: "San Diego Emergency Furnace Repair",
              href: "/san-diego-emergency-furnace-repair"
            },
            {
              text: "San Diego Central Air Conditioner",
              href: "/san-diego-central-air-conditioner"
            },
            {
              text: "San Diego Air Handler Services",
              href: "/san-diego-air-handler-services"
            },
            {
              text: "San Diego Attic & Crawl Space HVAC Installation",
              href: "/san-diego-attic-crawl-space-hvac-installation"
            },
            {
              text: "San Diego Commercial Rooftop HVAC",
              href: "/san-diego-commercial-rooftop-hvac"
            },
            {
              text: "San Diego Dryer Vent Cleaning",
              href: "/san-diego-dryer-vent-cleaning"
            },
            {
              text: "San Diego Zone Control Systems",
              href: "/san-diego-zone-control-systems"
            },
            {
              text: "San Diego Air Filtration",
              href: "/san-diego-air-filtration"
            },
            {
              text: "San Diego Air Scrubber Purification System",
              href: "/san-diego-air-scrubber-purification-system"
            },
            {
              text: "San Diego Dehumidifiers",
              href: "/san-diego-dehumidifiers"
            },
            {
              "text": "San Diego Ductless HVAC Units",
              "href": "/san-diego-ductless-hvac"
            },
            {
              "text": "San Diego Gas Line Repair & Replacement",
              "href": "/san-diego-gas-line-repair-replacement"
            },
            {
              "text": "San Diego Hose and Outdoor Faucet Services",
              "href": "/san-diego-hose-outdoor-faucet-services"
            },
            {
              "text": "San Diego Humidifier Installation Services",
              "href": "/san-diego-humidifiers"
            },
            {
              "text": "San Diego Leak Repair Services",
              "href": "/san-diego-leak-repair"
            },
            {
              "text": "San Diego Phenomenal Aire Systems",
              "href": "/san-diego-phenomenal-aire"
            },
            {
              "text": "San Diego Plumbing Installation and Replacement",
              "href": "/san-diego-plumbing-installation-replacement"
            },
            {
              "text": "San Diego Repipe Pipelining Services",
              "href": "/san-diego-repipe-pipelining"
            },
            {
              "text": "San Diego Shut-Off Valve Repair",
              "href": "/san-diego-shut-off-valve-repair"
            },
            {
              "text": "San Diego Slab Leak Repair",
              "href": "/san-diego-slab-leaks"
            },
            {
              "text": "San Diego Smoke & Carbon Monoxide Detector",
              "href": "/san-diego-smoke-carbon-monoxide-detector"
            },
            {
              "text": "San Diego Sump Pump Services",
              "href": "/san-diego-sump-pumps"
            },
            {
              "text": "San Diego Water Conservation",
              "href": "/san-diego-water-conservation"
            },
            {
              "text": "San Diego Water Filtration",
              "href": "/san-diego-water-filtration"
            },
            {
              "text": "San Diego Water Pressure Regulator",
              "href": "/san-diego-water-pressure-regulators"
            },
            {
              "text": "San Diego Water Softener Services",
              "href": "/san-diego-water-softeners"
            },
            {
              "text": "San Diego Water Treatment Services",
              "href": "/san-diego-water-treatment-services"
            },
            { text: "Thank you", href: "/thank-you/" },
          ],
        },
      ],
    },
    posts: {
      title: "Posts by category",

      categories: [
        {
          title: "AC Coil Cleaning",
          url: "category/ac-coil-cleaning",
          links: [
            {
              text: "Importance of Keeping Your AC Coils Clean",
              href: "keep-ac-coils-clean",
            },
          ],
        },
        {
          title: "AC Filter Cleaning",
          url: "/category/ac-filter-cleaning/",
          links: [
            {
              text: "Should You Replace Your AC Filter Or Rather Just Decide To Clean It?",
              href: "/how-to-improve-life-of-your-air-conditioner/",
            },
            {
              text: "Why Is It Necessary To Clean Your Split Ac Filter Regularly?",
              href: "/why-its-necessary-to-clean-ac-filter-regularly/",
            },
            {
              text: "How Often Should The Air Conditioner Filters Be Changed?",
              href: "/how-often-should-you-change-ac-filter/",
            },
          ],
        },
        {
          title: "AC Thermostat",
          url: "/category/ac-thermostat/",
          links: [
            {
              text: "Troubleshooting Guide: How To Fix A Faulty Thermostat",
              href: "/troubleshooting-guide-on-how-to-fix-faulty-thermostat/",
            },
            {
              text: "3 Simple Steps To Diagnose And Repair Your Thermostat",
              href: "/simple-steps-to-diagnose-and-repair-thermostat/",
            },
            {
              text: "How To Fix A Broken Thermostat And The Warning Signs",
              href: "/how-to-fix-broken-thermostat/",
            },
            {
              text: "Consequences Of Improper Installation Of An AC Thermostat",
              href: "/consequences-of-improper-installation-of-ac-thermostat/",
            },
            {
              text: "How do I know if my AC thermostat is broken?",
              href: "/broken-thermostant-symptoms/",
            },
          ],
        },
        {
          title: "AC Tune Up Service",
          url: "/category/ac-tune-up-service/",
          links: [
            {
              text: "Spring Cleaning For Your AC Unit: Why a Tune-Up Should Be On Your Checklist",
              href: "/spring-cleaning-checklist-for-ac-tune-up/",
            },
            {
              text: "Top 6 Reasons To Get Summer Tune-Up For Your Air Conditioner",
              href: "/summer-ac-tune-up/",
            },
            {
              text: "Can an AC tune-up help my air conditioner last longer?",
              href: "/ac-tune-up-helps-air-conditioner-last-longer/",
            },
            {
              text: "What Are The 5 Reasons To Get Your AC Tuned Up?",
              href: "/reasons-to-get-your-ac-tuned-up/",
            },
          ],
        },
        {
          title: "Air Conditioning",
          url: "/category/air-conditioning/",
          links: [
            {
              text: "Common Causes Of Air Compression Failure And How To Fix Them",
              href: "/common-causes-of-air-compression-failure-and-how-to-fix/",
            },
            {
              text: "Stay Cool And Save Money: Tips For Efficiently Using Your Air Conditioner This Summer",
              href: "/tips-for-efficiently-using-air-conditioner-this-summer/",
            },
            {
              text: "How To Choose The Right Size AC Unit For Your Home",
              href: "/how-to-choose-right-size-ac-unit-for-your-home/",
            },
            {
              text: "Things You Need To Know About Ductless Air Conditioner Installation",
              href: "/things-to-know-about-ductless-air-conditioner-installation/",
            },
            {
              text: "Steps To Find The Perfect Air Conditioning Installation",
              href: "/steps-to-find-perfect-ac-installation/",
            },
            {
              text: "Amazing Benefits Of Availing Emergency AC Repair Services",
              href: "/amazing-benefits-of-availing-emergency-ac-repair-services/",
            },
            {
              text: "Looking For AC Repair Services Around You? These Are Points To Keep In Mind",
              href: "/ac-repair-service-around-these-are-points-tokeep-mind/",
            },
            {
              text: "Essential Points To Consider When Repairing An Air Conditioner",
              href: "/essential-points-consider-reparing-air-conditioner/",
            },
            {
              text: "Major Air Conditioning Mistakes That Cost Huge in Repairing",
              href: "/air-conditioning-mistakes-that-cost-huge-in-repairing/",
            },
            {
              text: "5 Causes Of Air Conditioner Noise And How To Fix Them",
              href: "/causes-of-ac-noise-and-how-to-fix/",
            },
            {
              text: "What Errors Cause Air Conditioners To Be Inefficient?",
              href: "/what-error-cause-air-conditioners-to-be-inefficient/",
            },
            {
              text: "What Should You Do If Your Air Conditioner Is Blowing Warm Air?",
              href: "/what-should-you-do-when-your-air-conditioner-is-blowing-warm-air/",
            },
            {
              text: "Things to Know About Ductless Air Conditioning",
              href: "/things-to-know-about-ductless-air-conditioning/",
            },
            {
              text: "How To Make Your AC Work Efficiently",
              href: "/how-to-make-ac-work-efficiently/",
            },
            {
              text: "How To Get The Most From Your AC Unit?",
              href: "/how-to-get-most-from-ac-unit/",
            },
            {
              text: "How To Fix Your Air Conditioner In 24 Hours Or Less?",
              href: "/fix-your-air-conditioner-in-24-hours-or-less/",
            },
            {
              text: "What Factors Affect The Price Of An Ac Installation?",
              href: "/factors-affect-the-price-of-ac-installation/",
            },
          ],
        },
        {
          title: "Air Duct Cleaning",
          url: "/category/air-duct-cleaning/",
          links: [
            {
              text: "Why Air Duct Cleaning is Important for Your Home’s Health",
              href: "/why-air-duct-cleaning-is-important-for-your-homes-health/",
            },
            {
              text: "How To Clean Air Ducts: The Best Ways In Simple Steps",
              href: "/how-to-clean-air-ducts/",
            },
            {
              text: "Does Duct Cleaning Improve Airflow?",
              href: "/air-duct-cleaning-improve-airflow/",
            },
          ],
        },
        {
          title: "Dryer Vent Cleaning",
          url: "/category/dryer-vent-cleaning/",
          links: [
            {
              text: "Main Reasons That You Should Invest In Dryer Vent Cleaning",
              href: "/reasons-you-should-invest-in-dryer-vent-cleaning/",
            },
            {
              text: "Understanding The Difference Between Air Duct And Dryer Vent Cleaning",
              href: "/understanding-the-differnce-air-duct-and-dry-vent-cleaning/",
            },
            {
              text: "7 Reasons To Conduct Dryer Vent Cleaning Regularly",
              href: "/reasons-to-conduct-dryer-vent-cleaning-regularly/",
            },
            {
              text: "When Should I Clean My Dryer Vent Filter?",
              href: "/when-should-you-clean-your-dryer-vent-filter/",
            },
          ],
        },
        {
          title: "Heat Pump Services",
          url: "/category/heat-pump-services/",
          links: [
            {
              text: "How to Choose the Right Size Heat Pump for Your Home",
              href: "/how-to-choose-right-size-heat-pump-for-your-home/",
            },
            {
              text: "5 Reasons Why a Heat Pump is the Best Way to Heat Your Home",
              href: "/why-heat-pump-is-best-way-to-heat-your-home/",
            },
            {
              text: "TOP 5 BENEFITS OF INSTALLING A HEAT PUMP IN YOUR HOME",
              href: "/benefits-of-installing-heat-pump/",
            },
            {
              text: "Advantage of Professional Heat Pump Services Over Do-It-Yourself Repairs",
              href: "/benefits-of-professional-heat-pump-services/",
            },
            {
              text: "What Do I Need To Know About Installing A Heat Pump",
              href: "/need-know-about-installing-heat-pump/",
            },
          ],
        },
        {
          title: "Heating Service",
          url: "/category/heating-service/",
          links: [
            {
              text: "How To Spot A Good Heating Contractor?",
              href: "/how-to-spot-good-heating-contractor/",
            },
            {
              text: "Heating Repair: How To Do It Quickly And Easily",
              href: "/how-to-repair-heating-system-quickly/",
            },
            {
              text: "Top Tips For Choosing The Right Heating Repair",
              href: "/tips-for-choosing-right-heating-repair/",
            },
            {
              text: "Guide:To Maintain Your Heating System",
              href: "/guide-to-maintain-your-heating-system/",
            },
            {
              text: "Effective Tips For Choosing Heating And AC Repair Services",
              href: "/effective-tips-for-choosing-heating-and-ac-repair-services/",
            },
          ],
        },
        {
          title: "Home Maintenance",
          url: "/category/home-maintenance/",
          links: [
            {
              text: "How to Clean Air Condition Ducts for Maximum Efficiency",
              href: "/how-to-clean-air-condition-ducts-for-maximum-efficiency/",
            },
            {
              text: "Top 5 Symptoms of Low Refrigerant in an AC Unit",
              href: "/symptoms-low-refrigerant-ac-unit/",
            },
            {
              text: "Advantages of Switching to a Smart Thermostat in San Diego",
              href: "/benefits-of-smart-thermostat-san-diego/",
            },
            {
              text: "Optimizing Comfort: Water Source Heat Pumps for Efficient Cooling and Heating Solutions in San Diego",
              href: "/water-source-heat-pumps-san-diego/",
            },
            {
              text: "Improving Energy Efficiency in Heating Systems",
              href: "/improving-energy-efficiency-heating-systems/",
            },
            {
              text: "Services for the Repair and Maintenance of Ductless Heat Pumps",
              href: "/ductless-heat-pump-repair-maintenance-san-diego/",
            },
            {
              text: "Choosing the Right Warmth: A Comparative Guide to Heat Pump vs. Traditional Heating Systems",
              href: "/choosing-the-right-warmth-a-comparative-guide-to-heat-pump-vs-traditional-heating-systems/",
            },
            {
              text: "Navigating Chilly Nights: Choosing the Right Heater for Your San Diego Home",
              href: "/san-diego-home-heater-guide/",
            },
            {
              text: "Factors to Reflect on Before Enlisting a Water Heater Repair Service",
              href: "/water-heater-repair-san-diego-factors/",
            },
          ],
        },
        {
          title: "HVAC Services",
          url: "/category/hvac-services/",
          links: [
            {
              text: "How To Troubleshoot Your HVAC System When It Stops Working",
              href: "/how-to-troubleshoot-hvac-system-when-it-stops-working/",
            },
            {
              text: "The Pros And Cons Of HVAC Repair VS. Replacement",
              href: "/pros-and-cons-of-hvac-repair-vs-replacement/",
            },
            {
              text: "What Are The Points To Remember When Looking For Best HVAC Installation Services",
              href: "/what-to-consider-for-hvac-installation-service/",
            },
            {
              text: "How does the Energy Star Of The Air Conditioning System Boost The HVAC Efficiency?",
              href: "/energy-star-the-air-conditioning-system-boost-hvac-efficiency/",
            },
            {
              text: "What Are The Reasons To Upgrade Your HVAC System",
              href: "/reasons-to-upgrade-your-hvac-system/",
            },
            {
              text: "Everything You Need To Learn About HVAC Maintenance And Repairs",
              href: "/learn-about-hvac-maintenance-and-repair/",
            },
            {
              text: "Summer HVAC Maintenance Tips To Make Sure You Keep Cool",
              href: "/summer-hvac-maintenance-tips/",
            },
            {
              text: "Effective Tips on Handling Emergency HVAC Repairs With Little Stress",
              href: "/tips-to-handle-emergency-hvac-repairs-with-little-stress/",
            },
          ],
        },
        {
          title: "Indoor air quality",
          url: "/category/indoor-air-quality/",
          links: [
            {
              text: "7 Easy Tips to Increase Indoor Air Quality",
              href: "/easy-tips-to-increase-indoor-air-quality/",
            },
          ],
        },
        {
          title: "Plumbing",
          url: "/category/plumbing/",
          links: [
            {
              text: "10 Signs That You Need To Call For Emergency Plumbing Services",
              href: "/10-signs-you-need-call-for-emergency-plumbing-service/",
            },
          ],
        },

        {
          title: "Wall Heater",
          url: "/category/wall-heater/",
          links: [
            {
              text: "Is Your Wall Heater Not Working? Here’s How To Solve Common Difficulties",
              href: "/how-to-solve-common-wall-heater-difficulties/",
            },
            {
              text: "Are You Getting The Most Out Of Your Wall Heater Installation And Repair?",
              href: "/getting-most-out-of-wall-heater-installation-repair/",
            },
            {
              text: "How Much Does It Cost To Repair A Wall Heater In San Diego?",
              href: "/cost-to-repair-wall-heater-in-san-diego/",
            },
          ],
        },
        {
          title: "Water Heater",
          url: "/category/water-heater/",
          links: [
            {
              text: "5 Common Reasons Why Your Water Heater Stopped Working",
              href: "/common-reasons-why-your-water-heater-stopped-working/",
            },
            {
              text: "Is Your Water Heater Leaking From The Bottom? Here’s What You Need to Do",
              href: "/what-to-do-if-your-water-heater-leaking-from-bottom/",
            },
            {
              text: "Why Professional Water Heater Installation Is Worth The Investment",
              href: "/why-professional-water-heater-installation-is-worth-investment/",
            },
            {
              text: "How To Keep Your Water Heater Running Efficiently During The Winter",
              href: "/keep-your-water-heater-running-efficiently-during-winter/",
            },
            {
              text: "How To Use A Tankless Water Heater In Winter: The Pros And Cons",
              href: "/pros-and-cons-of-tankless-water-heater/",
            },
            {
              text: "How to Prepare Your Water Heater For The Winter Months",
              href: "/prepare-your-water-heater-for-winter-months/",
            },
            {
              text: "Install Your Own Water Heater! It’s Easier Than You Think",
              href: "/steps-to-install-your-own-water-heater/",
            },
            {
              text: "Is Your Water Heater Stopped Working? Here Are The Signs That Indicate The Fault",
              href: "/sign-that-your-water-heater-has-fault/",
            },
            {
              text: "Need Water Heater Repair And Installation Services? Here Are Essential Points To Consider",
              href: "/essential-points-to-consider-for-water-heater-repair-and-installation/",
            },
            {
              text: "Is It Worth Switching To A Tankless Water Heater System?",
              href: "/worth-switching-a-tankless-water-heater-system/",
            },
            {
              text: "Troubleshooting And Repair Strange Water Heater Noises And Sounds",
              href: "/troubleshoot-water-heater-noise-and-sound/",
            },
            {
              text: "What Should You Know About Keeping Your Water Heater In Good Condition?",
              href: "/what-should-you-khow-about-keeping-your-water-heater-in-good-condition/",
            },
            {
              text: "Water Heater Leaking? How To Fix It In 5 Easy Steps",
              href: "/fix-water-heater-leaking-issues/",
            },
            {
              text: "Warning Signs That There is Trouble with Your Water Heater",
              href: "/warning-signs-of-your-water-heater/",
            },
            {
              text: "8 Major Consequences Of Delaying Water Heater Repairs",
              href: "/consequences-of-delaying-water-heater-repairs/",
            },
            {
              text: "How To Know If It’s Time To Replace Your Water Heater",
              href: "/time-to-replace-water-heater/",
            },
            {
              text: "How can Regular Water Heater Repair Avoid Plumbing Headaches?",
              href: "/regular-water-heater-repair-avoid-plumbing-headaches/",
            },
            {
              text: "Should I Install A Water Heater Myself? 5 Mistakes to Avoid",
              href: "/mistakes-to-avoid-when-installing-water-heater/",
            },
            {
              text: "How Can I Reduce The Consumption of My Water Heater?",
              href: "/how-to-reduce-consumption-of-water-heater/",
            },
          ],
        },
      ],
    },
  };

  return (
    <>
      <header>
        <title>Sitemap for EZ Heat and Air | Explore Our Services</title>
        <meta
          name="description"
          content="Navigate EZ Heat and Air's sitemap to explore all our HVAC, heating, and cooling services. Find quick links to resources, service areas, and more!"
        />
        <meta
          property="og:title"
          content="Sitemap for EZ Heat and Air | Explore Our Services"
        />
        <meta
          property="og:description"
          content="Navigate EZ Heat and Air's sitemap to explore all our HVAC, heating, and cooling services. Find quick links to resources, service areas, and more!"
        />
        <meta property="og:image" content="" />
        <link rel="canonical" href="https://www.ezheatandair.com/sitemap" />
        <meta property="og:url" content="" />
        <meta
          name="twitter:title"
          content="Sitemap for EZ Heat and Air | Explore Our Services"
        />
        <meta
          name="twitter:description"
          content="Navigate EZ Heat and Air's sitemap to explore all our HVAC, heating, and cooling services. Find quick links to resources, service areas, and more!"
        />
        <meta name="robots" content="index, follow"/>
        <meta name="twitter:image" content="" />
      </header>

      <div className="breadcrumbs">
        <div className="homes">Home</div>
        <img
          className="chevronRightDoubleIcon"
          alt=""
          src="./templates/chevronrightdouble.svg"
        />
        <div className="page-title">
          <div className="slab-leak-repair">Sitemap</div>
        </div>
      </div>
      <section className="sitemap-section my-60">
        <div className="container">
          <div className="row">
            <h1 className="com-title text-center mb-md-5 mb-4">Sitemap</h1>
            <div className="sitemap-main">
              <div className="col-12">
                <Tabs defaultActiveKey="pages" id="sitemap-tabs">
                  {Object.keys(sitemapData).map((key) => (
                    <Tab
                      eventKey={key}
                      title={sitemapData[key as keyof typeof sitemapData].title}
                      key={key}
                    >
                      {sitemapData[
                        key as keyof typeof sitemapData
                      ].categories.map((category, index) => (
                        <div
                          className={` ${
                            key === "pages" ? "row" : "row border-bottom"
                          }`}
                          key={index}
                        >
                          <div
                            className={`tab-title mt-4 ${
                              key === "pages" ? "col-md-12 column-3" : " col-12"
                            }`}
                          >
                            {category.title && (
                              <>
                                {"url" in category ? (
                                  <Link
                                    href={`${category.url}`}
                                    className="fw-semibold text-green text-decoration-underline"
                                    style={{ fontSize: "18px" }}
                                  >
                                    {category.title}
                                  </Link>
                                ) : (
                                  <span className="fw-semibold">
                                    {category.title}
                                  </span> // Render as plain text if no URL
                                )}
                              </>
                            )}
                            <ul
                              className={`sitemap-list circle-listing ${
                                key === "pages" ? "" : " column-2"
                              }`}
                            >
                              {category.links.map((link, linkIndex) => (
                                <li key={linkIndex}>
                                  <span className="circle-img"></span>
                                  <Link href={link.href || ""} target="_self">
                                    {link.text}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </Tab>
                  ))}
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="pt-md-4 pt-3"></div>
      <InsuranceLogos />
    </>
  );
};

export default page;
