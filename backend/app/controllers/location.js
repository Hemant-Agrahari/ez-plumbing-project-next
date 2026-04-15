const ServicePage = require('../models/servicePage'); // Adjust the path as necessary

module.exports = function () {
    let module = {};

    module.addLocation = async function (request, response) {
        try {
            console.log("request.body", request.body);
            console.log("request.files", request.files);

            let { slug, breadcrumbTitle, bannerTitle, locationContent, template, seoTitle, seoDescription, metaRobot, schema } = request.body;

            let existingLocation = await ServicePage.findOne({ slug });
            if (existingLocation) {
                return response.status(404).json({
                    status: 404,
                    message: "Location already exists"
                });
            }

            let obj = {
                slug,
                type: 'locations',
                breadcrumbTitle,
                bannerTitle,
                locationContent: locationContent ? JSON.parse(locationContent) : null,
                template,
                seoTitle,
                seoDescription,
                metaRobot,
                schema : schema ? JSON.parse(schema) : null
            };

            let newLocation = new ServicePage(obj);
            await newLocation.save();

            return response.status(200).json({
                status: 200,
                message: 'Location data added successfully',
            });

        } catch (error) {
            console.error("addLocation error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    module.editLocation = async function (request, response) {
        try {
            console.log("request.body", request.body);

            let { slug, breadcrumbTitle, bannerTitle, locationContent, template, seoTitle, seoDescription, metaRobot, schema } = request.body;
            let { locationId } = request.query;

            if (!locationId) {
                return response.status(400).json({
                    status: 400,
                    message: "Location ID is required"
                });
            }

            let locationData = await ServicePage.findOne({ _id: locationId, isDelete: false });
            if (!locationData) {
                return response.status(404).json({
                    status: 404,
                    message: "Location data not found"
                });
            }

            let obj = {
                slug,
                breadcrumbTitle,
                bannerTitle,
                locationContent: locationContent ? JSON.parse(locationContent) : null,
                template,
                seoTitle,
                seoDescription,
                metaRobot,
                schema : schema ? JSON.parse(schema) : null
            };

            await ServicePage.updateOne({ _id: locationId }, { $set: obj });

            return response.status(200).json({
                status: 200,
                message: 'Location data updated successfully',
            });

        } catch (error) {
            console.error("editLocation error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    module.viewLocation = async function (request, response) {
        try {
            let { locationId } = request.query;

            let locationData = await ServicePage.findOne({
                _id: locationId,
                isDelete: false,
            });

            if (!locationData) {
                return response.status(404).json({
                    status: 404,
                    message: "Location data not found"
                });
            }

            return response.status(200).json({
                status: 200,
                data: locationData,
                message: 'Location data retrieved successfully',
            });

        } catch (error) {
            console.error("viewLocation error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    module.deleteLocation = async function (request, response) {
        try {
            let { locationId } = request.query;

            let locationData = await ServicePage.findOne({ _id: locationId, isDelete: false });
            if (!locationData) {
                return response.status(404).json({
                    status: 404,
                    message: "Location not found"
                });
            }

            await ServicePage.updateOne({ _id: locationId }, { $set: { isDelete: true } });

            return response.status(200).json({
                status: 200,
                message: 'Location deleted successfully',
            });

        } catch (error) {
            console.error("deleteLocation error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    module.listLocation = async function (request, response) {
        try {
            const { pageIndex = 1, pageSize = 10, search = '' } = request.query;
            const skip = (pageIndex - 1) * pageSize;

            const whereClause = {
                isDelete: false,
                type: "locations"
            };

            // Add search condition
            if (search) {
                whereClause.bannerTitle = { $regex: search, $options: 'i' }; // Case-insensitive search
            }

            const locationsData = await ServicePage.find(whereClause)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(pageSize));

            const totalItems = await ServicePage.countDocuments(whereClause);
            const totalPages = Math.ceil(totalItems / pageSize);

            return response.status(200).json({
                status: 200,
                message: "Locations fetched successfully",
                data: locationsData,
                pagination: {
                    totalItems,
                    currentPage: parseInt(pageIndex),
                    totalPages
                }
            });

        } catch (error) {
            console.error("listLocation error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    return module;
};
