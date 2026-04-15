const { where } = require("sequelize");

module.exports = function (model) {
    let module = {};
    //Services 
    module.addService = async function (request, response) {
        try {

            console.log("request.body", request.body);
            console.log("request.files", request.files);

            let { slug, breadcrumbTitle, bannerTitle, bannerContent, bannerSubTitle, content, content2, section2, serviceSlider, testimonials, seoTitle, seoDescription, metaRobot, schema, faq, template, categories } = request.body.data

            let obj = {
                type: 'Service',
                breadcrumbTitle: breadcrumbTitle,
                bannerTitle: bannerTitle,
                bannerContent: bannerContent,
                bannerSubTitle: bannerSubTitle,
                content: content,
                content2: content2,
                section2: section2,
                serviceSlider: serviceSlider,
                testimonials: testimonials,
                userId: request.query.userId,
                seoTitle, seoDescription, metaRobot, schema, faq, template, categories, slug
            }

            console.log("obj", obj);

            if (request.files) {

                let { bannerImage } = request.files

                obj['bannerImage'] = bannerImage ? await helper.imageUpload(bannerImage) : ''

                for (let c = 0; c < obj.content.length; c++) {
                    obj.content[c].contentImage = request.files[`contentImage${c}`] ? await helper.imageUpload(request.files[`contentImage${c}`]) : ''
                }

                for (let c = 0; c < obj.content2.length; c++) {
                    obj.content2[c].contentImage = request.files[`content2Image${c}`] ? await helper.imageUpload(request.files[`content2Image${c}`]) : ''
                }

                for (let c = 0; c < obj.serviceSlider.length; c++) {
                    obj.serviceSlider[c].serviceSliderImage = request.files[`serviceSliderImage${c}`] ? await helper.imageUpload(request.files[`serviceSliderImage${c}`]) : ''
                }

                for (let c = 0; c < obj.testimonials.length; c++) {
                    obj.testimonials[c].testimonialImage = request.files[`testimonialImage${c}`] ? await helper.imageUpload(request.files[`testimonialImage${c}`]) : ''
                }
            }

            ['schema', 'faq', 'categories', 'section2', 'content2', 'content', 'serviceSlider', 'testimonials'].forEach(field => {
                obj[field] = JSON.stringify(obj[field]);
            });

            let data = await model.ServicePage.create(obj);
            ['schema', 'faq', 'categories', 'section2', 'content2', 'content', 'serviceSlider', 'testimonials'].forEach(field => {
                data[field] = JSON.parse(data[field]);
            });

            return response.status(200).json({
                status: 200,
                data: data,
                message: 'Service add successfully',
            });

        } catch (error) {
            console.error("serviceTemplate error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    }

    module.editService = async function (request, response) {
        try {

            console.log("request.body", request.body);
            console.log("request.files", request.files);
            let { serviceId } = request.query
            let ServicePageData = await model.ServicePage.findOne({
                where: {
                    id: serviceId,
                    isDelete: '0'
                }
            });
            if (!ServicePageData) {
                return response.status(400).json({
                    status: 400,
                    message: 'Service not found'
                });
            }

            let { slug, breadcrumbTitle, bannerTitle, bannerContent, bannerSubTitle, content, content2, section2, serviceSlider, testimonials, seoTitle, seoDescription, metaRobot, schema, faq, template, categories } = request.body.data

            let obj = {
                breadcrumbTitle: breadcrumbTitle,
                bannerTitle: bannerTitle,
                bannerContent: bannerContent,
                bannerSubTitle: bannerSubTitle,
                content: content,
                content2: content2,
                section2: section2,
                serviceSlider: serviceSlider,
                testimonials: testimonials,
                userId: request.query.userId,
                seoTitle, seoDescription, metaRobot, schema, faq, template, categories, slug
            }

            console.log("obj", obj);

            ['content2', 'section2', 'content', 'serviceSlider', 'testimonials'].forEach(field => {
                ServicePageData[field] = ServicePageData[field] ? JSON.parse(ServicePageData[field]) : []
            });

            console.log("ServicePageData", ServicePageData);

            if (request.files) {

                let { bannerImage } = request.files

                obj.bannerImage = bannerImage ? await helper.imageUpload(bannerImage) : ServicePageData.bannerImage

                for (let c = 0; c < obj.content.length; c++) {
                    obj.content[c].contentImage = request.files[`contentImage${c}`] ? await helper.imageUpload(request.files[`contentImage${c}`]) : ServicePageData.content[c]?.contentImage
                }

                for (let c = 0; c < obj.content2.length; c++) {
                    obj.content2[c].contentImage = request.files[`content2Image${c}`] ? await helper.imageUpload(request.files[`content2Image${c}`]) : ServicePageData.content2[c].contentImage
                }

                for (let c = 0; c < obj.serviceSlider.length; c++) {
                    obj.serviceSlider[c].serviceSliderImage = request.files[`serviceSliderImage${c}`] ? await helper.imageUpload(request.files[`serviceSliderImage${c}`]) : ServicePageData.serviceSlider[c].serviceSliderImage
                }

                for (let c = 0; c < obj.testimonials.length; c++) {
                    obj.testimonials[c].testimonialImage = request.files[`testimonialImage${c}`] ? await helper.imageUpload(request.files[`testimonialImage${c}`]) : ServicePageData.testimonials[c].testimonialImage
                }
            } else {
                
                for (let c = 0; c < obj.content.length; c++) {
                    obj.content[c].contentImage = ServicePageData?.content[c]?.contentImage
                }

                for (let c = 0; c < obj.content2.length; c++) {
                    obj.content2[c].contentImage = ServicePageData?.content2[c]?.contentImage
                }

                for (let c = 0; c < obj.serviceSlider.length; c++) {
                    obj.serviceSlider[c].serviceSliderImage = ServicePageData?.serviceSlider[c]?.serviceSliderImage
                }

                for (let c = 0; c < obj.testimonials.length; c++) {
                    obj.testimonials[c].testimonialImage = ServicePageData?.testimonials[c]?.testimonialImage
                }
            }



            ['schema', 'faq', 'categories', 'section2', 'content', 'content2', 'serviceSlider', 'testimonials'].forEach(field => {
                obj[field] = JSON.stringify(obj[field]);
            });

            console.log("objobjobj", obj);

            await model.ServicePage.update(obj, {
                where: {
                    id: serviceId
                }
            });

            return response.status(200).json({
                status: 200,
                message: 'Service update successfully',
            });

        } catch (error) {
            console.error("serviceTemplate error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    }

    module.viewService = async function (request, response) {
        try {

            let { serviceId } = request.query
            if (!serviceId) {
                return response.status(400).json({
                    status: 400,
                    message: "Service id is required"
                })
            }

            let data = await model.ServicePage.findOne({
                where: { id: serviceId, isDelete: '0' },
                attributes: ['slug', 'breadcrumbTitle', "bannerImage", 'bannerTitle', 'bannerContent', 'bannerSubTitle', 'content2', 'section2', 'content', 'serviceSlider', 'testimonials', "bannerTitle", "bannerContent", "bannerSubTitle", 'seoTitle', 'seoDescription', 'metaRobot', 'schema', 'faq', 'template', 'categories']
            });

            if (!data) {
                return response.status(404).json({
                    status: 404,
                    message: "Service Not Found"
                })
            }

            ['content2', 'section2', 'content', 'serviceSlider', 'testimonials'].forEach(field => {
                data[field] = JSON.parse(data[field]);
            });

            return response.status(200).json({
                status: 200,
                data: data,
                message: 'Service Data',
            });

        } catch (error) {
            console.error("viewService error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    }

    module.deleteService = async function (request, response) {
        try {

            let { serviceId } = request.query

            let data = await model.ServicePage.findOne({
                where: { id: serviceId, isDelete: '0' },
            });

            if (!data) {
                return response.status(404).json({
                    status: 404,
                    message: "Service Not Found"
                })
            }

            await model.ServicePage.update({ isDelete: '1' }, {
                where: {
                    id: serviceId
                }
            })

            return response.status(200).json({
                status: 200,
                message: 'Service delete successfully ',
            });

        } catch (error) {
            console.error("viewService error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    }

    module.listService = async function (request, response) {
        try {

            const { pageIndex, pageSize, search = '', } = request.query;
            const offset = (pageIndex - 1) * pageSize;

            const whereClause = {
                isDelete: '0',
                type: "Service"
            };

            // Add search condition
            if (search) {
                whereClause[Sequelize.Op.or] = [
                    { bannerTitle: { [Sequelize.Op.like]: `%${search}%` } },
                ];
            }

            const ServerData = await model.ServicePage.findAndCountAll({
                where: whereClause,
                order: [
                    ['createdAt', 'DESC']
                ],
                limit: parseInt(pageSize),
                offset: parseInt(offset)
            });

            // Prepare the response with pagination info
            const totalPages = Math.ceil(ServerData.count / pageSize);

            response.status(200).json({
                status: 200,
                message: "Service fetched successfully",
                data: ServerData.rows,
                pagination: {
                    totalItems: ServerData.count,
                    currentPage: parseInt(pageIndex),
                    totalPages: totalPages
                }
            });

        } catch (error) {
            console.error("list Service error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    }

    module.getAllData = async function (request, response) {
        try {
            const { search = '' } = request.query;

            const whereClause = {
                isDelete: '0',
            };

            // Add search condition if applicable
            if (search) {
                whereClause[Sequelize.Op.or] = [
                    { bannerTitle: { [Sequelize.Op.like]: `%${search}%` } },
                ];
            }

            // Use Promise.all to run all queries concurrently
            const [ServerData, AutherData, BlogData, scholarshipData] = await Promise.all([
                model.ServicePage.findAll({ where: whereClause, order: [['createdAt', 'DESC']] }),
                model.Auther.findAll({ where: whereClause, order: [['createdAt', 'DESC']] }),
                model.Blog.findAll({ where: whereClause, order: [['createdAt', 'DESC']] }),
                model.Scholarship.findAll({ where: whereClause, order: [['createdAt', 'DESC']] })
            ]);

            // Concatenate the results
            const allData = [...ServerData, ...AutherData, ...BlogData, ...scholarshipData];
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
    };


    return module
}