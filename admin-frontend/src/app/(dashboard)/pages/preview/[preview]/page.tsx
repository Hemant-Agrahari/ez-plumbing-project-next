"use client"
import BlogPreview from '@/components/ModalPreviewpages/(blog)/[blog]/page';
// import AboutUsPreview from '@/components/ModalPreviewpages/about-us/page';
import AuthorPreview from '@/components/ModalPreviewpages/author/[author]/page';
import BecomeProviderPreview from '@/components/ModalPreviewpages/become-porivder/page';
import LocationPreview from '@/components/ModalPreviewpages/locations/page';
import ScholarshipPreview from '@/components/ModalPreviewpages/scholarship';
import ServicePreview1 from '@/components/ModalPreviewpages/multipleService/services-1/page';
import ServicePreview2 from '@/components/ModalPreviewpages/multipleService/services-2/page';
import ServicePreview3 from '@/components/ModalPreviewpages/multipleService/services-3/page';
import ServicePreview4 from '@/components/ModalPreviewpages/multipleService/services-4/page';
import ServicePreview5 from '@/components/ModalPreviewpages/multipleService/services-5/page';
import ServicePreview6 from '@/components/ModalPreviewpages/multipleService/services-6/page';
import ServicePreview8 from '@/components/ModalPreviewpages/multipleService/services-8/page';
import ServicePreview9 from '@/components/ModalPreviewpages/multipleService/services-9/page';
import ServicePreview10 from '@/components/ModalPreviewpages/multipleService/services-10/page';
import ServicePreview11 from '@/components/ModalPreviewpages/multipleService/services-11/page';
import ServicePreview12 from '@/components/ModalPreviewpages/multipleService/services-12/page';
import ServicePreview13 from '@/components/ModalPreviewpages/multipleService/services-13/page';

import ServicePreview7 from '@/components/ModalPreviewpages/multipleService/services-7/page';
import BecomeProvider from '@/components/Templates/BecomeProvider';
import { requestHandler } from '@/helper/requestHandler';
import { asyncHandler } from '@/utils/asyncHandler';
import { MRT_PaginationState } from 'material-react-table';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AboutUsPreview from '@/components/ModalPreviewpages/about-us/page';

const page = () => {
    const [templates, setTemplates] = useState([]);
    const [data, setData] = useState([]);
    const [template, setTemplate] = useState<any>([]);
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 30,
    });
    const searchParams = useSearchParams();
    const pageId = searchParams.get("pageId");
    const templateparam = searchParams.get("template");
    const fetchData = async () => {
        let apiUrl;
        switch (templateparam) {
            case "author":
                apiUrl = `/author/view/?authorId=${pageId}`;
                break;
            case "about_us":
                apiUrl = `/viewAboutUs?aboutId=${pageId}`;
                break;
            case "scholarship_program":
                apiUrl = `/scholarship/view/?scholarshipId=${pageId}`;
                break;
            case "become_provider":
                apiUrl = `/viewBecomeAProvider?becomeAProviderId=${pageId}`;
                break;
            case "services_1":
                apiUrl = `/viewService/?serviceId=${pageId}`;
                break;
            case "services_2":
                apiUrl = `/viewService/?serviceId=${pageId}`;
                break;
            case "services_3":
                apiUrl = `/viewService/?serviceId=${pageId}`;
                break;
            case "services_4":
                apiUrl = `/viewService/?serviceId=${pageId}`;
                break;
            case "services_5":
                apiUrl = `/viewService/?serviceId=${pageId}`;
                break;
            case "services_6":
                apiUrl = `/viewService/?serviceId=${pageId}`;
                break;
            case "services":
                apiUrl = `/viewService/?serviceId=${pageId}`;
                break;
            case "services_8":
                apiUrl = `/viewService/?serviceId=${pageId}`;
                break;
            case "services_9":
                apiUrl = `/viewService/?serviceId=${pageId}`;
                break;
            case "services_10":
                apiUrl = `/viewService/?serviceId=${pageId}`;
                break;
            case "services_11":
                apiUrl = `/viewService/?serviceId=${pageId}`;
                break;
            case "services_12":
                apiUrl = `/viewService/?serviceId=${pageId}`;
                break;
            case "services_13":
                apiUrl = `/viewService/?serviceId=${pageId}`;
                break;    
            case "locations":
                apiUrl = `/viewLocation/?locationId=${pageId}`;
                break;
            case "blog_template":
                apiUrl = `/blog/view/?blogDataId=${pageId}`;
                break;
            default:
                apiUrl = `/blog/view/?blogDataId=${pageId}`;
                break;
        }
        const response = await requestHandler(apiUrl, {}, "get");

        if (response.status === 200) {
            // toast.success(response.message || "Process Successfully");
            setData(response.data)
            setTemplate(response.data.template)
        }
        const templateResponse = await requestHandler(
            `/template/list?pageIndex=${pagination.pageIndex + 1}&pageSize=${pagination.pageSize}`,
            {},
            "get"
        );
        const fetchedTemplates = templateResponse.data.map((item: any) => ({
            id: item._id,
            label: item.title,
            value: item.key,
        }));
        // console.log(response.data, "blogData")
        setTemplates(fetchedTemplates);
    };
    useEffect(() => {
        asyncHandler(fetchData)();
    }, []);
    return (
        <div>
            {/* {pageId}{templateparam} */}
            {/* {JSON.stringify(data)} */}
            <Modal show={true} fullscreen centered>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Preview Data</Modal.Title>
                </Modal.Header> */}
                <Modal.Body className='m-0 p-0'>
                    {templateparam === "author" && <AuthorPreview data={data} />}
                    {templateparam === "about_us" && <AboutUsPreview data={data} />}
                    {templateparam === "scholarship_program" && <ScholarshipPreview data={data} />}
                    {templateparam === "become_provider" && <BecomeProviderPreview data={data} />}
                    {templateparam === "services" && <ServicePreview7 data={data} />}
                    {templateparam === "services_1" && <ServicePreview1 data={data} />}
                    {templateparam === "services_2" && <ServicePreview2 data={data} />}
                    {templateparam === "services_3" && <ServicePreview3 data={data} />}
                    {templateparam === "services_4" && <ServicePreview4 data={data} />}
                    {templateparam === "services_5" && <ServicePreview5 data={data} />}
                    {templateparam === "services_6" && <ServicePreview6 data={data} />}
                    {templateparam === "services_8" && <ServicePreview8 data={data} />}
                    {templateparam === "services_9" && <ServicePreview9 data={data} />}
                    {templateparam === "services_10" && <ServicePreview10 data={data} />}
                    {templateparam === "services_11" && <ServicePreview11 data={data} />}
                    {templateparam === "services_12" && <ServicePreview12 data={data} />}
                    {templateparam === "services_13" && <ServicePreview13 data={data} />}
                    {templateparam === "locations" && <LocationPreview data={data} />}
                    {templateparam === "blog_template" && <BlogPreview data={data} />}

                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer> */}
            </Modal>

        </div>
    )
}

export default page