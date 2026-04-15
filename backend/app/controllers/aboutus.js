const mongoose = require('mongoose');
const ServicePage = require('../models/servicePage');
module.exports = function (model) {
    let module = {};

    //AboutUs
    module.addAboutUs = async function (request, response) {
        try {

            console.log("request.body", request.body);
            console.log("request.files", request.files);

            let { breadcrumbTitle, slug, bannerTitle, bannerContent, bannerSubTitle, content, serviceSlider, testimonials, seoTitle, seoDescription, metaRobot, schema, faq, template, categories } = request.body

            let dataLocations = await ServicePage.findOne({ slug: slug, type: "AboutUs", isDelete: false })
            if (dataLocations) {
                return response.status(404).json({
                    status: 404,
                    message: "About-us already exists"
                })
            }

            let obj = {
                slug: slug,
                type: "AboutUs",
                breadcrumbTitle: breadcrumbTitle,
                bannerTitle: bannerTitle,
                bannerContent: bannerContent,
                bannerSubTitle: bannerSubTitle,
                content: content ? JSON.parse(content) : null,
                serviceSlider: serviceSlider ? JSON.parse(serviceSlider) : null,
                testimonials: testimonials ? JSON.parse(testimonials) : null,
                seoTitle, seoDescription, metaRobot, 
                schema: schema ? JSON.parse(schema) : null,
                // faq: faq ? JSON.parse(faq) : null, 
                template,
                categories: categories ? JSON.parse(categories) : null,
                userId: request.query.userId
            };

            console.log("obj", obj);

            if (request.files) {

                let { bannerImage } = request.files
                obj.bannerImage = await helper.imageUpload(bannerImage)

                for (let c = 0; c < obj.content.length; c++) {
                    obj.content[c].contentImage = request.files[`contentImage${c}`] ? await helper.imageUpload(request.files[`contentImage${c}`]) : ''
                }

                for (let c = 0; c < obj.serviceSlider.length; c++) {
                    obj.serviceSlider[c].serviceSliderImage = request.files[`serviceSliderImage${c}`] ? await helper.imageUpload(request.files[`serviceSliderImage${c}`]) : ''
                }

                for (let c = 0; c < obj.testimonials.length; c++) {
                    obj.testimonials[c].testimonialImage = request.files[`testimonialImage${c}`] ? await helper.imageUpload(request.files[`testimonialImage${c}`]) : ''
                }
            }

            console.log("obj", obj);

            await ServicePage.create(obj);

            return response.status(200).json({
                status: 200,
                message: 'About-Us Add successfully',
            });

        } catch (error) {
            console.error("addAboutUs error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    }

    module.editAboutUs = async function (request, response) {
        try {

            console.log("request.body", request.body);
            console.log("request.files", request.files);

            let { breadcrumbTitle, bannerTitle, bannerContent, bannerSubTitle, content, serviceSlider, testimonials, seoTitle, seoDescription, metaRobot, schema, faq, template, categories } = request.body
            let { aboutId } = request.query

            if (!aboutId) {
                return response.status(400).json({
                    status: 400,
                    message: "Invalid Request"
                })
            }
            let about = await ServicePage.findOne({ _id: aboutId, isDelete: '0' })
            if (!about) {
                return response.status(404).json({
                    status: 404,
                    message: "About-us data Found"
                })
            }


            let obj = {
                breadcrumbTitle: breadcrumbTitle,
                bannerTitle: bannerTitle,
                bannerContent: bannerContent,
                bannerSubTitle: bannerSubTitle,
                content: content ? JSON.parse(content) : null,
                serviceSlider: serviceSlider ? JSON.parse(serviceSlider) : null,
                testimonials: testimonials ? JSON.parse(testimonials) : null,
                seoTitle, seoDescription, metaRobot, 
                schema: schema ? JSON.parse(schema) : null,
                // faq: faq ? JSON.parse(faq) : null, 
                template,
                categories: categories ? JSON.parse(categories) : null,
            };

            if (request.files) {

                let { bannerImage } = request.files

                obj.bannerImage = bannerImage ? await helper.imageUpload(bannerImage) : about.bannerImage

                for (let c = 0; c < obj.content.length; c++) {
                    obj.content[c].contentImage = request.files[`contentImage${c}`] ? await helper.imageUpload(request.files[`contentImage${c}`]) : about.content[c]?.contentImage
                }

                for (let c = 0; c < obj.serviceSlider.length; c++) {
                    obj.serviceSlider[c].serviceSliderImage = request.files[`serviceSliderImage${c}`] ? await helper.imageUpload(request.files[`serviceSliderImage${c}`]) : about.serviceSlider[c]?.serviceSliderImage
                }

                for (let c = 0; c < obj.testimonials.length; c++) {
                    obj.testimonials[c].testimonialImage = request.files[`testimonialImage${c}`] ? await helper.imageUpload(request.files[`testimonialImage${c}`]) : about.testimonials[c]?.testimonialImage
                }
            } else {

                for (let c = 0; c < obj.content.length; c++) {
                    obj.content[c].contentImage = about?.content[c]?.contentImage
                }

                for (let c = 0; c < obj.serviceSlider.length; c++) {
                    obj.serviceSlider[c].serviceSliderImage = about?.serviceSlider[c]?.serviceSliderImage
                }

                for (let c = 0; c < obj.testimonials.length; c++) {
                    obj.testimonials[c].testimonialImage = about?.testimonials[c]?.testimonialImage
                }
            }


            await ServicePage.updateOne({ _id: aboutId }, obj);

            return response.status(200).json({
                status: 200,
                message: 'About-Us update Successfully',
            });

        } catch (error) {
            console.error("editAboutUs error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    }

    module.viewAboutUs = async function (request, response) {
        try {

            let { aboutId } = request.query

            let data = await ServicePage.findOne({
                _id: aboutId, isDelete: false
            });

            if (!data) {
                return response.status(400).json({
                    status: 400,
                    message: "About-Us not found"
                });
            }


            return response.status(200).json({
                status: 200,
                data: data,
                message: 'AboutUs view Data',
            });

        } catch (error) {
            console.error("viewAboutUs error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    }

    module.deleteAboutUs = async function (request, response) {
        try {

            let { aboutId } = request.query;

            // Find the document with the specified `aboutId` that is not deleted
            let data = await ServicePage.findOne({
                _id: aboutId,
                isDelete: false
            });

            if (!data) {
                return response.status(404).json({
                    status: 404,
                    message: "About Not Found"
                });
            }

            // Update `isDelete` to true
            await ServicePage.updateOne(
                { _id: aboutId },
                { isDelete: true }
            );

            return response.status(200).json({
                status: 200,
                message: 'About deleted successfully',
            });

        } catch (error) {
            console.error("viewAbout error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    }

    module.listAboutUs = async function (request, response) {
        try {

            const { pageIndex = 1, pageSize = 10, search = '' } = request.query;
            const offset = (pageIndex - 1) * pageSize;

            const whereClause = {
                isDelete: false, // In Mongoose, `isDelete` is a boolean
                type: "AboutUs"
            };

            // Add search condition if provided
            if (search) {
                whereClause.bannerTitle = { $regex: search, $options: 'i' }; // Case-insensitive search
            }

            // Get the count of total items
            const count = await ServicePage.countDocuments(whereClause);

            // Fetch the paginated data
            const rows = await ServicePage.find(whereClause)
                .sort({ createdAt: -1 }) // Equivalent to ORDER BY 'createdAt DESC'
                .limit(parseInt(pageSize))
                .skip(parseInt(offset));

            // Calculate total pages
            const totalPages = Math.ceil(count / pageSize);

            return response.status(200).json({
                status: 200,
                message: "AboutUs fetched successfully",
                data: rows,
                pagination: {
                    totalItems: count,
                    currentPage: parseInt(pageIndex),
                    totalPages: totalPages
                }
            });

        } catch (error) {
            console.error("list AboutUs error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    }

    return module
}
