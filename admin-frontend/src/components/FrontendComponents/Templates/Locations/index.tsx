"use client";
import { BlogData } from "@/types/interface";
import React, { useEffect, useState } from "react";
import "./location.css"
interface MainTemplateProps {
    data: BlogData;
    // blog: BlogData;
}
const LoactionsTemplate: React.FC<MainTemplateProps> = ({ data }: any) => {

    // console.log(data);
    return (
        <>
            <div className="locations" dangerouslySetInnerHTML={{ __html: data.content }}>
            </div>
            {/* <InsuranceLogos /> */}
        </>

    );
};

export default LoactionsTemplate;
