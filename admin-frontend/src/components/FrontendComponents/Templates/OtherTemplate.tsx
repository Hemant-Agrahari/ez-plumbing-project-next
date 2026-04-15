import React from "react";
import { BlogData } from "@/types/interface";

interface BlogTemplateProps {
  blogData: BlogData;
}

const OtherTemplate: React.FC<BlogTemplateProps> = ({ blogData }) => {
  return (
    <>
      <div>{blogData?.title}</div>
      <div dangerouslySetInnerHTML={{ __html: blogData?.content }} />
    </>
  );
};

export default OtherTemplate;
