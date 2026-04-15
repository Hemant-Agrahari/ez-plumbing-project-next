"use client";
import Navigation from "@/components/Layout/Navigation/Navigation";
import Button from "@/components/UI/Button";
import HtmlDropdown from "@/components/UI/HtmlDropdown";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { asyncHandler } from "@/utils/asyncHandler";
import { requestHandler } from "@/helper/requestHandler";
import { MRT_PaginationState } from "material-react-table";
import AboutUs from "@/components/Templates/About us";
import Services1 from "@/components/Templates/ServiceTemplates/Services 1";
import Services2 from "@/components/Templates/ServiceTemplates/Services 2";
import Services3 from "@/components/Templates/ServiceTemplates/Services 3";
import Services4 from "@/components/Templates/ServiceTemplates/Services 4";
import Services5 from "@/components/Templates/ServiceTemplates/Services 5";
import Services6 from "@/components/Templates/ServiceTemplates/Services 6";
import Services7 from "@/components/Templates/ServiceTemplates/Services";
import Services8 from "@/components/Templates/ServiceTemplates/Services 8";
import Services9 from "@/components/Templates/ServiceTemplates/Services 9";
import Services10 from "@/components/Templates/ServiceTemplates/Services 10";
import Services11 from "@/components/Templates/ServiceTemplates/Services 11";
import Services12 from "@/components/Templates/ServiceTemplates/Services 12";
import Services13 from "@/components/Templates/ServiceTemplates/Services 13";
import BecomeProvider from "@/components/Templates/BecomeProvider";
import Scholarship from "@/components/Templates/Scholarship";
import BlogTemplate from "@/components/Templates/BlogTemplate";
import { useSearchParams } from "next/navigation";
import ContactUs from "@/components/Templates/Contact Us";
import Author from "@/components/Templates/Author";
import Locations from "@/components/Templates/Locations";
import { toast } from "react-toastify";
interface ServicesProps {
  serviceData: any; // Adjust the type as needed
}
const Page = () => {
  const [templates, setTemplates] = useState([]);
  const [data, setData] = useState([]);
  const [template, setTemplate] = useState<any>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 30,
  });
  const searchParams = useSearchParams();
  const pageId = searchParams.get("pageId");
  const templateparam = searchParams.get("template");

  const fetchData = async () => {
    let apiUrl;
    switch (templateparam) {
      case "author":
        apiUrl = `/author/view/?authorId=${pageId}`;
        break;
      case "about_us":
        apiUrl = `/viewAboutUs?aboutId=${pageId}`;
        break;
      case "become_provider":
        apiUrl = `/viewBecomeAProvider?becomeAProviderId=${pageId}`;
        break;
      case "scholarship_program":
        apiUrl = `/scholarship/view/?scholarshipId=${pageId}`;
        break;
      case "locations":
        apiUrl = `/viewLocation/?locationId=${pageId}`;
        break;
      case "services":
        apiUrl = `/viewService/?serviceId=${pageId}`;
        break;
      case "services_1":
        apiUrl = `/viewService/?serviceId=${pageId}`;
        break;
      case "services_2":
        apiUrl = `/viewService/?serviceId=${pageId}`;
        break;
      case "services_3":
        apiUrl = `/viewService/?serviceId=${pageId}`;
        break;
      case "services_4":
        apiUrl = `/viewService/?serviceId=${pageId}`;
        break;
      case "services_5":
        apiUrl = `/viewService/?serviceId=${pageId}`;
        break;
      case "services_6":
        apiUrl = `/viewService/?serviceId=${pageId}`;
        break;
      case "services_8":
        apiUrl = `/viewService/?serviceId=${pageId}`;
        break;
      case "services_9":
        apiUrl = `/viewService/?serviceId=${pageId}`;
        break;
      case "services_10":
        apiUrl = `/viewService/?serviceId=${pageId}`;
        break;
      case "services_11":
        apiUrl = `/viewService/?serviceId=${pageId}`;
        break;
      case "services_12":
        apiUrl = `/viewService/?serviceId=${pageId}`;
        break;
      case "services_13":
        apiUrl = `/viewService/?serviceId=${pageId}`;
        break;
      case "blog_template":
        apiUrl = `/blog/view/?blogDataId=${pageId}`;
        break;
      default:
        apiUrl = ``;
        break;
    }
    const response = await requestHandler(apiUrl, {}, "get");

    if (response.status === 200) {
      toast.success(response.message || "Process Successfully");
      setData(response.data);
      setTemplate(response.data.template);
    }
    const templateResponse = await requestHandler(
      `/template/list?pageIndex=${pagination.pageIndex + 1}&pageSize=${
        pagination.pageSize
      }`,
      {},
      "get"
    );
    const fetchedTemplates = templateResponse.data.map((item: any) => ({
      id: item._id,
      label: item.title,
      value: item.key,
    }));
    // console.log(response.data, "blogData");
    setTemplates(fetchedTemplates);
  };

  const handleTemplateChange = (e: any) => {
    // console.log(e.target.value);
    // console.log(template);

    setTemplate(e.target.value);
    setTemplates(templates);
  };
  useEffect(() => {
    asyncHandler(fetchData)();
  }, []);
  return (
    <>
      <Navigation
        profile={`Add Page`}
        user01="/images/user01.svg"
        bell01="/images/bell01.svg"
      />
      <div className="main">
        <div
          className=""
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <HtmlDropdown
            className={styles.designOption}
            options={templates}
            onChange={handleTemplateChange}
            value={template}
            placeholder="Select a Template"
            disabled={!!pageId}
          />
          {/* <Button
                        text="Add New"
                        link={`pages/create-page`}
                        className={`mb-4 ${styles.btnStyle}`}
                    /> */}
        </div>
      </div>
      {template && template === "about_us" && <AboutUs aboutUsData={data} />}
      {template && template === "services_1" && (
        <Services1 serviceData={data} />
      )}
      {template && template === "services_2" && (
        <Services2 serviceData={data} />
      )}
      {template && template === "services_3" && (
        <Services3 serviceData={data} />
      )}
      {template && template === "services_4" && (
        <Services4 serviceData={data} />
      )}
      {template && template === "services_5" && (
        <Services5 serviceData={data} />
      )}
      {template && template === "services_6" && (
        <Services6 serviceData={data} />
      )}
      {template && template === "services" && <Services7 serviceData={data} />}
      {template && template === "services_8" && (
        <Services8 serviceData={data} />
      )}
      {template && template === "services_9" && (
        <Services9 serviceData={data} />
      )}
      {template && template === "services_10" && (
        <Services10 serviceData={data} />
      )}
      {template && template === "services_11" && (
        <Services11 serviceData={data} />
      )}
      {template && template === "services_12" && (
        <Services12 serviceData={data} />
      )}
      {template && template === "services_13" && (
        <Services13 serviceData={data} />
      )}
      {template && template === "become_provider" && (
        <BecomeProvider becomeProvider={data} />
      )}
      {template && template === "locations" && (
        <Locations locationData={data} />
      )}
      {template && template === "scholarship_program" && (
        <Scholarship scholarshipData={data} />
      )}
      {/* {template && template === "Contact_Us" && <ContactUs />} */}
      {/* {template && template === "Thank_you" && <Services />} */}
      {template && template === "blog_template" && (
        <BlogTemplate Blogdata={data} />
      )}
      {template && template === "author" && <Author authorData={data} />}
    </>
  );
};

export default Page;
