import { AIS_CMS_URL, API_URL } from '@/helper/constant';
import { requestHandler } from '@/helper/requestHandler';
import Link from 'next/link'
import React from 'react'
export default async function Page() {
    const res = await fetch(`${API_URL}/getCategories?type=categories-management`, { next: { revalidate: 6 } });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    // console.log(data.data, "data")

    return (
        <>
            <div className="text-group">
                <div className="text83">Category</div>
                <div className="frame-child44" />
                <div className="categorys-col">
                    <div className="frame-parent33">
                        {data && data?.data?.map((category: any) => (
                            <Link key={category?._id} href={`/category/${category?.slug}/`} className="text-wrapper">
                                <div className="text84">{category?.title}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}