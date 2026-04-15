import AboutUsTemplate from "@/components/Templates/AboutUsTemplate";
import AuthorTemplate from "@/components/Templates/AuthorTemplate";
import BecomeProviderTemplate from "@/components/Templates/BecomeProviderTemplate";
import BlogTemplate from "@/components/Templates/BlogTemplate/BlogTemplate";
import LoactionsTemplate from "@/components/Templates/Locations";
import ScholarshipTemplate from "@/components/Templates/ScholarshipTemplate";
// import ServiceTemplate1 from "@/components/Templates/Service Templates/ServiceTemplate1/Index";
import { AIS_CMS_URL, API_URL } from "@/helper/constant";
import ServiceTemplate7 from "@/components/Templates/Service Templates/ServiceTemplate7/Index";
import { notFound } from "next/navigation";
// import ServiceTemplate2 from "@/components/Templates/Service Templates/ServiceTemplate2/Index";
// import ServiceTemplate3 from "@/components/Templates/Service Templates/ServiceTemplate3/Index";
// import ServiceTemplate4 from "@/components/Templates/Service Templates/ServiceTemplate4/Index";
// import ServiceTemplate5 from "@/components/Templates/Service Templates/ServiceTemplate5/Index";
// import ServiceTemplate6 from "@/components/Templates/Service Templates/ServiceTemplate6/Index";
// import ServiceTemplate8 from "@/components/Templates/Service Templates/ServiceTemplate8/Index";
// import ServiceTemplate9 from "@/components/Templates/Service Templates/ServiceTemplate9/Index";
// import ServiceTemplate10 from "@/components/Templates/Service Templates/ServiceTemplate10/Index";
// import ServiceTemplate11 from "@/components/Templates/Service Templates/ServiceTemplate11/Index";
// import ServiceTemplate12 from "@/components/Templates/Service Templates/ServiceTemplate12/Index";
// import ServiceTemplate13 from "@/components/Templates/Service Templates/ServiceTemplate13/Index";
// import MetaComponent from "@/components/metaComponent";
export default async function Page({ params }: { params: { slug: string } }) {
  // const res = await fetch(
  //   `https://www.ezheatandair.com/wp-json/service/v2/page/24-7-emergency-services`,
  //   `https://ezheatandairapi.aistechnolabs.pro/view/Service?postId=67501591eee6dce3c6ae2324`,
  //   { next: { revalidate: 6 } }
  // );
console.log("params.slug",params.slug)
  // const res = await fetch(`${API_URL}/getBlog?slug=${params.slug}`, { next: { revalidate: 6 } });

  const res = await fetch(`${API_URL}/getService?slug=${params.slug}`, {
    next: { revalidate: 6 },
  });

console.log("res",res)
  if (!res.ok) {
    notFound();
    return;
  }
  const templateMap: any = {
    blog_template: BlogTemplate,
    about_us: AboutUsTemplate,
    locations: LoactionsTemplate,
    author: AuthorTemplate,
    services: ServiceTemplate7,
    // scholarship_program: ScholarshipTemplate,
    // become_provider: BecomeProviderTemplate,
    // services_1: ServiceTemplate1,
    // services_2: ServiceTemplate2,
    // services_3: ServiceTemplate3,
    // services_4: ServiceTemplate4,
    // services_5: ServiceTemplate5,
    // services_6: ServiceTemplate6,
    // services_8: ServiceTemplate8,
    // services_9: ServiceTemplate9,
    // services_10: ServiceTemplate10,
    // services_11: ServiceTemplate11,
    // services_12: ServiceTemplate12,
    // services_13: ServiceTemplate13
  };
  const data = await res.json();
  // console.log("dataService", data.data.blogData)
  const blogData = data.data.blogData;
  const authorData = data.data.author;
  const relatedBlogData = data.data.relatedBlog;
  console.log("blogData",blogData)
  const TemplateComponent = templateMap[blogData.template];

  // console.log("templatenew", blogData.template)

  return (
    <>
      {/* <div><h1>hhh</h1></div> */}
      {TemplateComponent ? (
        <>
          {/* <MetaComponent data={blogData} relatedBlogData={relatedBlogData} authorData={authorData} /> */}
          {/* <Head>
            <meta name="robots" content={`${blogData?.template}`} />
          </Head> */}
          <TemplateComponent
            data={blogData}
            relatedBlogData={relatedBlogData}
            authorData={authorData}
          />
        </>
      ) : (
        <div>No template found for this blog.</div>
      )}
    </>
  );
}
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const res = await fetch(`${API_URL}/getService?slug=${params.slug}`);
  if (!res.ok) {
    notFound();
    return;
  }

  const data = await res.json();
  console.log("res.ok data ",data)

  // console.log("response-data", data);

  if (data) {
    const blogData = data.data.blogData;
    const metadata: any = {
      title: blogData?.seoTitle || "Default Title",
      description: blogData?.seoDescription || "Default description",
      alternates: {
        canonical: `https://www.ezheatandair.com/${blogData.slug}`,
      },
      keywords: blogData.tags,
      publisher: "EZplumbingusa",
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
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
      openGraph: {
        locale: "en_US",
        type: "article",
        title: blogData?.seoTitle || "Blog",
        description: blogData?.seoDescription,
        url: `https://www.ezheatandair.com/${blogData.slug}`,
        site_name: "EZplumbingusa",
        published_time: "2024-09-16T08:13:13+00:00",
        images: [
          {
            url: `https://www.ezheatandair.com${blogData.bannerImage}`,
            width: 825,
            height: 388,
            type: "image/jpeg",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        label1: "Est. reading time",
        data1: "6 minutes",
      },
    };
    if (data.data.author && Object.keys(data.data.author).length > 0) {
      metadata.authors = [{ name: `${data.data.author.bannerTitle}` }];
      metadata.creator = `${data.data.author.bannerTitle}`;
      metadata.twitter.label1 = "Written by";
      metadata.twitter.data1 = `${data.data.author.bannerTitle}`;
    }
    return metadata;
  }
}
