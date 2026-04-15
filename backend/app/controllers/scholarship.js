const Scholarship = require('../models/scholarship'); // Ensure this model is correctly defined

module.exports = function () {
    let module = {};

    module.add = async function (request, response) {
        try {
            const { userId } = request.query;
            const {
                breadcrumbTitle,
                template,
                bannerContent,
                bannerTitle,
                slug,
                mainTitle,
                mainContent,
                listingTitle,
                listingItems,
                btnTitle,
                btnLink,
                seoTitle,
                seoDescription,
                metaRobot,
                schema,
                categories
            } = request.body;

            const { bannerImage } = request.files;

            const obj = {
                breadcrumbTitle,
                bannerContent,
                bannerTitle,
                userId,
                slug,
                mainTitle,
                mainContent,
                listingTitle,
                listingItems,
                btnTitle,
                btnLink,
                template,
                seoTitle,
                seoDescription,
                metaRobot,
                schema,
                categories,
                bannerImage: bannerImage ? await helper.imageUpload(bannerImage) : ''
            };

            await Scholarship.create(obj);
            return response.status(200).json({
                status: 200,
                message: 'Scholarship added successfully',
            });

        } catch (error) {
            console.error("Add Scholarship error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    }

    module.edit = async function (request, response) {
        try {
            const { scholarshipId } = request.query;
            const {
                breadcrumbTitle,
                bannerContent,
                template,
                bannerTitle,
                slug,
                mainTitle,
                mainContent,
                listingTitle,
                listingItems,
                btnTitle,
                btnLink,
                seoTitle,
                seoDescription,
                metaRobot,
                schema,
                categories
            } = request.body;

            if (!scholarshipId) {
                return response.status(400).json({
                    status: 400,
                    message: 'Scholarship ID is required'
                });
            }

            const scholarshipData = await Scholarship.findOne({ _id: scholarshipId, isDelete: false });

            if (!scholarshipData) {
                return response.status(404).json({
                    status: 404,
                    message: 'Scholarship not found'
                });
            }

            const obj = {
                breadcrumbTitle,
                bannerContent,
                bannerTitle,
                slug,
                mainTitle,
                mainContent,
                listingTitle,
                listingItems,
                btnTitle,
                btnLink,
                template,
                seoTitle,
                seoDescription,
                metaRobot,
                schema,
                categories
            };

            if (request.files && request.files.bannerImage) {
                obj.bannerImage = await helper.imageUpload(request.files.bannerImage);
            } else {
                obj.bannerImage = scholarshipData.bannerImage; // keep the old image if not updated
            }

            await Scholarship.updateOne({ _id: scholarshipId }, { $set: obj });

            return response.status(200).json({
                status: 200,
                message: 'Scholarship updated successfully',
            });

        } catch (error) {
            console.error("Edit Scholarship error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    }

    module.view = async function (request, response) {
        try {
            const { scholarshipId } = request.query;

            const scholarshipData = await Scholarship.findOne({ _id: scholarshipId, isDelete: false });

            if (!scholarshipData) {
                return response.status(404).json({
                    status: 404,
                    message: 'Scholarship not found'
                });
            }

            return response.status(200).json({
                status: 200,
                data: scholarshipData,
                message: 'Scholarship viewed successfully',
            });

        } catch (error) {
            console.error("View Scholarship error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    }

    module.delete = async function (request, response) {
        try {
            const { scholarshipId } = request.query;

            const scholarshipData = await Scholarship.findOne({ _id: scholarshipId, isDelete: false });

            if (!scholarshipData) {
                return response.status(404).json({
                    status: 404,
                    message: 'Scholarship not found'
                });
            }

            await Scholarship.updateOne({ _id: scholarshipId }, { $set: { isDelete: true } });

            return response.status(200).json({
                status: 200,
                message: 'Scholarship deleted successfully',
            });

        } catch (error) {
            console.error("Delete Scholarship error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    }

    module.list = async function (request, response) {
        try {
            const { pageIndex = 1, pageSize = 10, search = '' } = request.query;
            const offset = (pageIndex - 1) * pageSize;

            const query = {
                isDelete: false
            };

            if (search) {
                query.$or = [
                    { bannerTitle: { $regex: search, $options: 'i' } }
                ];
            }

            const scholarshipData = await Scholarship.find(query)
                .sort({ createdAt: -1 })
                .skip(offset)
                .limit(parseInt(pageSize));

            const totalCount = await Scholarship.countDocuments(query);
            const totalPages = Math.ceil(totalCount / pageSize);

            return response.status(200).json({
                status: 200,
                message: "Scholarships fetched successfully",
                data: scholarshipData,
                pagination: {
                    totalItems: totalCount,
                    currentPage: parseInt(pageIndex),
                    totalPages: totalPages
                }
            });

        } catch (error) {
            console.error("Scholarship list error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    }

    return module;
};

