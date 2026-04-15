import Link from "next/link";
import React from "react";
import styles from "@/components/FrontendComponents/Blog/RelatedPost/page.module.css";
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
    <div className={styles.blogCard}>
      <div className="blog-card-img">
        <img
          src={imageSrc}
          alt={altText}
          width="424"
          height="243"
          className="img-fluid w-100 h-100"
        />
      </div>
      <div className={styles.blogContent}>
        <h2 className={styles.blogContentTitle}>
          <Link href={linkHref} title={title}>{title}</Link>
        </h2>
      </div>
    </div>
  </div>
);

export default RelatedPost;
