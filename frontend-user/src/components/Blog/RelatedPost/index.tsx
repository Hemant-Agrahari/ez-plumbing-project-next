import Link from "next/link";
import React from "react";

interface RelatedPostProps {
  imageSrc: string;
  title: string;
  linkHref: string;
  altText?: string;  
}

const RelatedPost: React.FC<RelatedPostProps> = ({
  imageSrc,
  title,
  altText,
  linkHref,
}) => (
  <div className="col-lg-4 col-md-4 col-12 w-100 h-100">
    <div className="blog-card mb-2 mb-lg-0 w-100 h-100">
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
        <div style={{
marginTop: 'clamp(12px, 2.1vw, 24px)'
        }} className="blog-contant-title mb-0">
          <Link href={linkHref}>{title}</Link>
        </div>
      </div>
    </div>
  </div>
);

export default RelatedPost;
