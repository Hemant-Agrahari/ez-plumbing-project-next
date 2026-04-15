const ServicePage = require('../models/servicePage'); // Adjust the path as necessary

module.exports = function () {
    let module = {};

    // Become A Provider
    module.addBecomeAProvider = async function (request, response) {
        try {
            console.log("request.body", request.body);
            console.log("request.files", request.files);

            const { slug, breadcrumbTitle, bannerTitle, pageSubHeading, content, template, seoTitle, seoDescription, metaRobot, schema } = request.body;

            // Check if the slug already exists
            let existingServicePage = await ServicePage.findOne({ slug, isDelete: false });
            if (existingServicePage) {
                return response.status(404).json({
                    status: 404,
                    message: "Become A Provider already exists"
                });
            }

            let obj = {
                slug,
                breadcrumbTitle,
                bannerTitle,
                pageSubHeading,
                content,
                template,
                seoTitle,
                seoDescription,
                metaRobot,
                schema: schema ? JSON.parse(schema) : null,
                type: 'become-a-provider'
            };

            // Handle file upload if present
            if (request.files && request.files.bannerImage) {
                obj.bannerImage = await helper.imageUpload(request.files.bannerImage);
            }

            // Create new ServicePage document
            const newServicePage = new ServicePage(obj);
            await newServicePage.save();

            return response.status(200).json({
                status: 200,
                message: 'Become A Provider Data added successfully',
            });
        } catch (error) {
            console.error("Become A Provider error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    module.editBecomeAProvider = async function (request, response) {
        try {
            console.log("request.body", request.body);
            console.log("request.files", request.files);

            const { slug, breadcrumbTitle, bannerTitle, pageSubHeading, content, template, seoTitle, seoDescription, metaRobot, schema } = request.body;
            const { becomeAProviderId } = request.query;

            if (!becomeAProviderId) {
                return response.status(400).json({
                    status: 400,
                    message: "Become A Provider ID is required"
                });
            }

            let servicePage = await ServicePage.findOne({ _id: becomeAProviderId, isDelete: false });
            if (!servicePage) {
                return response.status(404).json({
                    status: 404,
                    message: "Become-a-provider Data Not Found"
                });
            }

            // Update fields
            servicePage.slug = slug || servicePage.slug;
            servicePage.breadcrumbTitle = breadcrumbTitle || servicePage.breadcrumbTitle;
            servicePage.bannerTitle = bannerTitle || servicePage.bannerTitle;
            servicePage.pageSubHeading = pageSubHeading || servicePage.pageSubHeading;
            servicePage.content = content || servicePage.content;
            servicePage.template = template || servicePage.template;
            servicePage.seoTitle = seoTitle || servicePage.seoTitle;
            servicePage.seoDescription = seoDescription || servicePage.seoDescription;
            servicePage.metaRobot = metaRobot || servicePage.metaRobot;
            servicePage.schema = schema ? JSON.parse(schema) : servicePage.schema;

            // Handle file upload if present
            if (request.files && request.files.bannerImage) {
                servicePage.bannerImage = await helper.imageUpload(request.files.bannerImage);
            }

            await servicePage.save();

            return response.status(200).json({
                status: 200,
                message: 'Become-a-provider Data updated successfully',
            });
        } catch (error) {
            console.error("Become-a-provider error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    module.viewBecomeAProvider = async function (request, response) {
        try {
            const { becomeAProviderId } = request.query;

            const data = await ServicePage.findOne({ _id: becomeAProviderId, isDelete: false })
                .select('bannerImage breadcrumbTitle bannerTitle pageSubHeading content slug template seoTitle seoDescription metaRobot schema');

            if (!data) {
                return response.status(404).json({
                    status: 404,
                    message: "Become-a-provider Data Not Found"
                });
            }

            return response.status(200).json({
                status: 200,
                data,
                message: 'Become-a-provider Data',
            });
        } catch (error) {
            console.error("viewBecomeAProvider error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    module.deleteBecomeAProvider = async function (request, response) {
        try {
            const { becomeAProviderId } = request.query;

            let servicePage = await ServicePage.findOne({ _id: becomeAProviderId, isDelete: false });
            if (!servicePage) {
                return response.status(404).json({
                    status: 404,
                    message: "Service Not Found"
                });
            }

            // Soft delete
            servicePage.isDelete = true;
            await servicePage.save();

            return response.status(200).json({
                status: 200,
                message: 'Become-a-provider deleted successfully',
            });
        } catch (error) {
            console.error("deleteBecome-a-provider error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    module.listBecomeAProvider = async function (request, response) {
        try {
            const { pageIndex = 1, pageSize = 10, search = '' } = request.query;
            const skip = (pageIndex - 1) * pageSize;

            const whereClause = {
                isDelete: false,
                type: "become-a-provider"
            };

            // Add search condition
            if (search) {
                whereClause.bannerTitle = { $regex: search, $options: 'i' };
            }

            const servicePages = await ServicePage.find(whereClause)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(pageSize));

            const totalItems = await ServicePage.countDocuments(whereClause);
            const totalPages = Math.ceil(totalItems / pageSize);

            return response.status(200).json({
                status: 200,
                message: "Become-a-provider fetched successfully",
                data: servicePages,
                pagination: {
                    totalItems,
                    currentPage: parseInt(pageIndex),
                    totalPages
                }
            });
        } catch (error) {
            console.error("list Service error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    return module;
};
