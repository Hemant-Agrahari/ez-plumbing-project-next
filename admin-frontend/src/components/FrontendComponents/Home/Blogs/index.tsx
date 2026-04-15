import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import BlogCard from "@/components/Blog/BlogCard";
import { sliderblogsSettings2 } from "@/helper/sliderSettings";
export const Blogs = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); 
    };

    handleResize();  
    window.addEventListener("resize", handleResize);  

    return () => {
      window.removeEventListener("resize", handleResize); 
    };
  }, []);
 
  return (
    <section className="latest-blogs my-60">
      <div className="container">
        <h2 className="title mb-3 mb-lg-4 text-center">Latest Blogs</h2>
      </div>
      <div className="container latest-blog-container">
        {isMobile ? (
          <Slider {...sliderblogsSettings2} className="latest-blog-slider row">
            <BlogCard
              imageSrc="/images/why-do-slab-leaks-occur-mostly-in-older-homes-new.png"
              altText=""
              title="Why Do Slab Leaks Occur Mostly In Older Homes?"
              dec="Leaks in the water supply or drainage pipes that are found below the concrete foundation"
              linkHref="#"
            />
            <BlogCard
              imageSrc="/images/why-do-slab-leaks-occur-mostly-in-older-homes.png"
              altText=""
              title="Why Do Slab Leaks Occur Mostly In Older Homes?"
              dec="Leaks in the water supply or drainage pipes that are found below the concrete foundation"
              linkHref="#"
            />
            <BlogCard
              imageSrc="/images/why-do-slab-leaks-occur-mostly-in-older-homes-new.png"
              altText=""
              title="Why Do Slab Leaks Occur Mostly In Older Homes?"
              dec="Leaks in the water supply or drainage pipes that are found below the concrete foundation"
              linkHref="#"
            />
          </Slider>
        ) : (
          <div className="latest-blog-slider row">
            <BlogCard
              imageSrc="/images/why-do-slab-leaks-occur-mostly-in-older-homes-new.png"
              altText=""
              title="Why Do Slab Leaks Occur Mostly In Older Homes?"
              dec="Leaks in the water supply or drainage pipes that are found below the concrete foundation"
              linkHref="#"
            />
            <BlogCard
              imageSrc="/images/why-do-slab-leaks-occur-mostly-in-older-homes.png"
              altText=""
              title="Why Do Slab Leaks Occur Mostly In Older Homes?"
              dec="Leaks in the water supply or drainage pipes that are found below the concrete foundation"
              linkHref="#"
            />
            <BlogCard
              imageSrc="/images/why-do-slab-leaks-occur-mostly-in-older-homes-new.png"
              altText=""
              title="Why Do Slab Leaks Occur Mostly In Older Homes?"
              dec="Leaks in the water supply or drainage pipes that are found below the concrete foundation"
              linkHref="#"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;
