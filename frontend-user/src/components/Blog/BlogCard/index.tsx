import Link from "next/link";
import React from "react";

interface BlogCardProps {
  imageSrc: string;
  title: string;
  dec: string;
  linkHref: string;
  altText?: string;  
}

const BlogCard: React.FC<BlogCardProps> = ({
  imageSrc,
  title,
  linkHref,
  altText,
  dec,
}) => (
  <div className="col-lg-4 col-md-4 col-12">
    <div className="blog-card mb-2 mb-lg-0 w-100">
      <div className="blog-card-img">
        <img
          src={imageSrc}
          alt={altText}
          width="424"
          height="243"
          className="img-fluid w-100 h-100"
        />
      </div>
      <div className="blog-contant">
        <h2 className="blog-contant-title">
          <Link href={linkHref}>{title}</Link>
        </h2>
        <p className="dec">{dec}</p>
        <div className="blog-view-post">
          <Link
            className="blog-view-link d-flex align-items-center"
            href={linkHref}
          >
            View Post
            <img
              src="/images/next-arrow.png"
              alt="next-arrow"
              width="33"
              height="8"
              className="ms-2"
            />
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default BlogCard;