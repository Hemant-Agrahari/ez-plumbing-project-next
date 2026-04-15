import Wpblog from "@/components/Wpblog/Wpblog";

// Define the types for the fetched data
type BlogData = any; // Adjust types as needed

export default async function page({ params }: { params: { slug: string } }) {
  // Log slug to ensure it's passed correctly
  // console.log("Slug: ", params.slug);

  // Fetch data from the API on the server-side
  // const url = `https://www.ezheatandair.com/wp-json/wp/v2/posts?slug=${params.slug}`;
  const url = `https://ezheatandairapi.aistechnolabs.pro/ssblog/view?slug=${params.slug}`;
  // console.log(`Fetching from: ${url}`);

  const res = await fetch(url, {
    cache: "no-store", // Disable caching for fresh data on each request
  });

  if (!res.ok) {
    // If the response is not OK, log the status and the response body
    const errorText = await res.text();
    console.error("Error fetching data:", res.status, errorText);
    throw new Error("Failed to fetch data");
  }

  // Parse the response JSON
  const data = await res.json();

  // console.log("Fetched data:", data[0]);

  // Ensure the data structure is what you expect
  const blogData = data.data; // Adjust as needed depending on the structure of your API response
  if (!blogData) {
    console.error("No blog data found for the slug.");
    return <div>No blog data available.</div>;
  }

  const authorData = blogData?.author || null; // Extract author data
  const relatedBlogData = blogData?.relatedBlogs || []; // Extract related blog data

  // Return the blog page with the fetched data
  return (
    <Wpblog
      data={blogData}
      relatedBlogData={relatedBlogData}
      authorData={authorData}
    />
  );
}

// src/app/webblog/page.tsx
// import BlogTemplate from "@/components/Templates/BlogTemplate/BlogTemplate";

// // Define the types for the fetched data
// type BlogData = any; // Adjust types as needed

// export default async function page({ params }: { params: { slug: string } }) {
//   // Fetch data from the API on the server-side
//   const res = await fetch(
//     `https://www.ezheatandair.com/wp-json/wp/v2/posts?slug=${params.slug}`,
//     {
//       cache: "no-store", // Disable caching for fresh data on each request
//     }
//   );
//   console.log("res",params.slug)
//   console.log("blogdata",res)

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   const data = await res.json();
//   const blogData = data[0]; // Adjust as needed depending on the structure of your API response
//   const authorData = blogData?.author || null; // Extract author data
//   const relatedBlogData = blogData?.relatedBlogs || []; // Extract related blog data

//   // Return the blog page with the fetched data
//   return (
//     <BlogTemplate
//       blogData={blogData}
//       authorData={authorData}
//       relatedBlogData={relatedBlogData}
//     />
//   );
// }
