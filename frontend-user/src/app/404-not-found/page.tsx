import Link from "next/link";
import "./not-found.css";
import Image from "next/image";
import Recentposts from "@/components/404RecentPosts";
export default function NotFound() {
  const pageLinks = [
    {
      title: "Gas Line Repair & Replacement",
      href: "/san-diego-gas-line-repair-replacement",
    },
    {
      title: "Hose & Outdoor Faucet Services",
      href: "/san-diego-hose-outdoor-faucet-services",
    },
    {
      title: "Leak Repair",
      href: "/san-diego-leak-repair",
    },
    {
      title: "Repipe Pipelining",
      href: "/san-diego-repipe-pipelining",
    },
    {
      title: "Slab Leaks",
      href: "/san-diego-slab-leaks",
    },
    {
      title: "Sump Pumps",
      href: "/san-diego-sump-pumps",
    },
    {
      title: "Plumbing Installation & Replacement",
      href: "/san-diego-plumbing-installation-replacement",
    },
    {
      title: "Shut-Off Valve Repair",
      href: "/san-diego-shut-off-valve-repair",
    },
    {
      title: "Tankless Water Heaters",
      href: "/san-diego-tankless-water-heater-repair-installation",
    },
    {
      title: "Water Conservation",
      href: "/san-diego-water-conservation",
    },
    {
      title: "Heater Installation",
      href: "/san-diego-central-heating-installation",
    },
    {
      title: "Heater Repair",
      href: "/san-diego-heating-repair",
    },
    {
      title: "Heater Tune Ups",
      href: "/san-diego-heater-tune-ups",
    },
    {
      title: "Hybrid Heating Systems",
      href: "/san-diego-hybrid-hvac-system",
    },
    {
      title: "Indoor Air Quality",
      href: "/san-diego-indoor-air-quality",
    },
  ];
  

  return (
    <>
      <div className="page-404-style py-0">
        <header className="breadcrumbs px-0 ">
          <div className="container">
            <div className="breadcrumb-col">
              <div className="home-breadcrumb">
                <Link href="/" className="homes">
                  Home
                </Link>
                <Image
                  loading="lazy"
                  alt=""
                  src="../../templates/chevronrightdouble.svg"
                  width={24}
                  height={24}
                />
                <span className="about-us1">404 not found</span>
              </div>
            </div>
          </div>
        </header>
      </div>
      <section id="primary" className="content-area page-404-style py-100">
        <main id="main" className="site-main">
          <div className="container">
            <h1 className="">404</h1>
            <p className="page-title-txt">Oops! That page can’t be found.</p>
            <div className="page-content text-center">
              <p className="p-txt-style">
                Here are a few suggestions to help you on your way:
              </p>
              <Link href="/" className="btn btn-outline-success" type="submit">
                Return Home
              </Link>
              <div className="row justify-content-center mt-md-5 mt-4">
                <ul className="sitemap-list circle-listing column-3">
                  {pageLinks.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <span className="circle-img"></span>
                      <Link href={link.href || ""} target="_self">
                        {link.title}
                      </Link>
                    </li>
                  ))}                 
                </ul>
                <Recentposts />
              </div>
            </div>
          </div>
        </main>
      </section>
      <div className="d-flex"></div>
    </>
  );
}
