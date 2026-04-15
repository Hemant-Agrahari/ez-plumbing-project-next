const ServicePage = require('../models/servicePage'); // Import the Mongoose model
const Author = require('../models/author'); // Mongoose Author model
const Blog = require('../models/blog'); // Mongoose Blog model
const Scholarship = require('../models/scholarship');

module.exports = function () {
    let module = {};

    // Services
    module.addService = async function (request, response) {
        try {
            console.log("request.body", request.body);
            console.log("request.files", request.files);

            let {
                slug, breadcrumbTitle, bannerTitle, bannerContent, bannerSubTitle,
                content, content2, section2, serviceSlider, testimonials,
                seoTitle, seoDescription, metaRobot, schema, faq, template, categories,locationContent,
                section1, section3, precise_section, slab_Leaksection
            } = request.body.data;

            let obj = {
                breadcrumbTitle,
                bannerTitle,
                bannerContent,
                bannerSubTitle,
                content,
                content2,
                section2,
                serviceSlider,
                testimonials,
                userId: request.query.userId,
                seoTitle,
                seoDescription,
                metaRobot,
                schema,
                faq,
                template,
                categories,
                slug,
                locationContent,
                section1,
                section3,
                precise_section,
                slab_Leaksection,
                type: 'Service'
            };

            if (request.files) {
                let { bannerImage } = request.files;
                obj.bannerImage = bannerImage ? await helper.imageUpload(bannerImage) : '';

                for (let c = 0; c < obj.content.length; c++) {
                    obj.content[c].contentImage = request.files[`contentImage${c}`] ? await helper.imageUpload(request.files[`contentImage${c}`]) : '';
                }

                for (let c = 0; c < obj.content2.length; c++) {
                    obj.content2[c].contentImage = request.files[`content2Image${c}`] ? await helper.imageUpload(request.files[`content2Image${c}`]) : '';
                }

                for (let c = 0; c < obj.serviceSlider.length; c++) {
                    obj.serviceSlider[c].serviceSliderImage = request.files[`serviceSliderImage${c}`] ? await helper.imageUpload(request.files[`serviceSliderImage${c}`]) : '';
                }

                for (let c = 0; c < obj.testimonials.length; c++) {
                    obj.testimonials[c].testimonialImage = request.files[`testimonialImage${c}`] ? await helper.imageUpload(request.files[`testimonialImage${c}`]) : '';
                }
            }

            let data = await ServicePage.create(obj);
            return response.status(200).json({
                status: 200,
                data,
                message: 'Service added successfully',
            });
        } catch (error) {
            console.error("addService error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    module.editService = async function (request, response) {
        try {
            let { serviceId } = request.query;
            let servicePageData = await ServicePage.findById(serviceId);

            if (!servicePageData) {
                return response.status(404).json({
                    status: 404,
                    message: 'Service not found'
                });
            }
            else if(servicePageData.wordpress===true){
                return response.status(404).json({
                    status: 401,
                    message: 'Unauthorized request cannot edit this service'
                });
            }
            let {
                slug, breadcrumbTitle, bannerTitle, bannerContent, bannerSubTitle,
                content, content2, section2, serviceSlider, testimonials,locationContent,
                seoTitle, seoDescription, metaRobot, schema, faq, template, categories,
                section1, section3, precise_section, slab_Leaksection
            } = request.body.data;

            let obj = {
                breadcrumbTitle,
                bannerTitle,
                bannerContent,
                bannerSubTitle,
                content,
                content2,
                section2,
                serviceSlider,
                testimonials,
                seoTitle,
                seoDescription,
                metaRobot,
                schema,
                faq,
                template,
                categories,
                slug,
                locationContent,
                section1,
                section3,
                precise_section,
                slab_Leaksection
            };

            if (request.files) {
                let { bannerImage } = request.files;
                obj.bannerImage = bannerImage ? await helper.imageUpload(bannerImage) : servicePageData.bannerImage;

                for (let c = 0; c < obj.content.length; c++) {
                    obj.content[c].contentImage = request.files[`contentImage${c}`] ? await helper.imageUpload(request.files[`contentImage${c}`]) : servicePageData.content[c]?.contentImage;
                }

                for (let c = 0; c < obj.content2.length; c++) {
                    obj.content2[c].contentImage = request.files[`content2Image${c}`] ? await helper.imageUpload(request.files[`content2Image${c}`]) : servicePageData.content2[c]?.contentImage;
                }

                for (let c = 0; c < obj.serviceSlider.length; c++) {
                    obj.serviceSlider[c].serviceSliderImage = request.files[`serviceSliderImage${c}`] ? await helper.imageUpload(request.files[`serviceSliderImage${c}`]) : servicePageData.serviceSlider[c]?.serviceSliderImage;
                }

                for (let c = 0; c < obj.testimonials.length; c++) {
                    obj.testimonials[c].testimonialImage = request.files[`testimonialImage${c}`] ? await helper.imageUpload(request.files[`testimonialImage${c}`]) : servicePageData.testimonials[c]?.testimonialImage;
                }
            } else {

                for (let c = 0; c < obj.content.length; c++) {
                    obj.content[c].contentImage = servicePageData?.content[c]?.contentImage
                }

                for (let c = 0; c < obj.content2.length; c++) {
                    obj.content2[c].contentImage = servicePageData?.content2[c]?.contentImage
                }

                for (let c = 0; c < obj.serviceSlider.length; c++) {
                    obj.serviceSlider[c].serviceSliderImage = servicePageData?.serviceSlider[c]?.serviceSliderImage
                }

                for (let c = 0; c < obj.testimonials.length; c++) {
                    obj.testimonials[c].testimonialImage = servicePageData?.testimonials[c]?.testimonialImage
                }
            }

            await ServicePage.updateOne({ _id: serviceId }, obj);
            return response.status(200).json({
                status: 200,
                message: 'Service updated successfully',
            });
        } catch (error) {
            console.error("editService error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    module.viewService = async function (request, response) {
        try {
            let { serviceId } = request.query;
            if (!serviceId) {
                return response.status(400).json({
                    status: 400,
                    message: "Service id is required"
                });
            }

            let data = await ServicePage.findOne({ _id: serviceId, isDelete: false }).select(
                'slug breadcrumbTitle bannerImage bannerTitle bannerContent bannerSubTitle content2 section2 content serviceSlider testimonials seoTitle seoDescription metaRobot schema faq template categories locationContent section1 section3 precise_section slab_Leaksection'
            );

            if (!data) {
                return response.status(404).json({
                    status: 404,
                    message: "Service Not Found"
                });
            }

            return response.status(200).json({
                status: 200,
                data,
                message: 'Service data fetched successfully',
            });
        } catch (error) {
            console.error("viewService error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    module.deleteService = async function (request, response) {
        try {
            let { serviceId } = request.query;

            let data = await ServicePage.findOne({ _id: serviceId, isDelete: false });

            if (!data) {
                return response.status(404).json({
                    status: 404,
                    message: "Service Not Found"
                });
            }

            await ServicePage.updateOne({ _id: serviceId }, { isDelete: true });

            return response.status(200).json({
                status: 200,
                message: 'Service deleted successfully',
            });
        } catch (error) {
            console.error("deleteService error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    module.listService = async function (request, response) {
        try {
            const { pageIndex = 1, pageSize = 10, search = '' ,serviceType} = request.query;
            const offset = (pageIndex - 1) * pageSize;

            const query = { isDelete: false, type: 'Service' };

            if (search) {
                query.bannerTitle = { $regex: search, $options: 'i' };
            }
            else if(serviceType){
                query.template = serviceType;
            }

            const totalItems = await ServicePage.countDocuments(query);
            const serviceData = await ServicePage.find(query)
                .sort({ createdAt: -1 })
                .limit(parseInt(pageSize))
                .skip(parseInt(offset));

            const totalPages = Math.ceil(totalItems / pageSize);

            return response.status(200).json({
                status: 200,
                message: "Service fetched successfully",
                data: serviceData,
                pagination: {
                    totalItems,
                    currentPage: parseInt(pageIndex),
                    totalPages
                }
            });
        } catch (error) {
            console.error("listService error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    module.getAllData = async function (request, response) {
        try {
            const { search = '' } = request.query;

            const searchQuery = { isDelete: '0' };

            // Add search condition if applicable
            if (search) {
                const regex = new RegExp(search, 'i'); // 'i' makes it case-insensitive
                searchQuery.$or = [
                    { bannerTitle: regex }
                ];
            }

            // Use Promise.all to run all queries concurrently
            const [ServerData, AuthorData, BlogData, ScholarshipData] = await Promise.all([
                ServicePage.find(searchQuery).sort({ createdAt: -1 }),
                Author.find(searchQuery).sort({ createdAt: -1 }),
                Blog.find(searchQuery).sort({ createdAt: -1 }),
                Scholarship.find(searchQuery).sort({ createdAt: -1 })
            ]);

            // Concatenate the results
            const allData = [...ServerData, ...AuthorData, ...BlogData, ...ScholarshipData];

            // Sort all data by createdAt in descending order
            allData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            return response.status(200).json({
                status: 200,
                message: "All data fetched successfully",
                data: allData
            });

        } catch (error) {
            console.error("getAllData error:", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    }

    return module

};
