

//  import AboutUsTemplate from "@/components/FrontendComponents/Templates/AboutUsTemplate";
// import BecomeProviderTemplate from "@/components/FrontendComponents/Templates/BecomeProviderTemplate";
// import BlogTemplate from "@/components/FrontendComponents/Templates/BlogTemplate";
// import ContactTemplate from "@/components/FrontendComponents/Templates/ContactTemplate";
// import LoactionsTemplate from "@/components/FrontendComponents/Templates/Locations";
// import MainTemplate from "@/components/FrontendComponents/Templates/MainTemplate";
// import OtherTemplate from "@/components/FrontendComponents/Templates/OtherTemplate";
// import ScholarshipTemplate from "@/components/FrontendComponents/Templates/ScholarshipTemplate";
// import ServiceTemplate from "@/components/FrontendComponents/Templates/ServiceTemplate/Index";
// import ThankYouTemplate from "@/components/FrontendComponents/Templates/ThankYouTemplate";
// import { AIS_CMS_URL } from "@/helper/constant";
 
// export default async function Page({ params }: { params: { slug: string } }) {
//   const res = await fetch(
//     // `${AIS_CMS_URL}/getBlog?slug=${params.slug}`,
//     `${AIS_CMS_URL}/getService?slug=${params.slug}`

//   );
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   const templateMap: any = {
//     blog_template: BlogTemplate,
//     template_two: OtherTemplate,
//     Main_Template_1: MainTemplate,
//     about_us: AboutUsTemplate,
//     Thank_you: ThankYouTemplate,
//     Contact_Us: ContactTemplate,
//     scholarship_program: ScholarshipTemplate,
//     become_provider: BecomeProviderTemplate,
//     locations: LoactionsTemplate,
//     services: ServiceTemplate
//   };
//   const data = await res.json();
//   const blogData = data.data;
//   console.log(data,"data")
 
//   const TemplateComponent = templateMap[blogData.template];
//   return (
//     <>
//       {TemplateComponent ? (
//         <TemplateComponent data={blogData} />
//       ) : (
//         <div>No template found for this blog.</div>
//       )}

//     </>
//   );
// }
