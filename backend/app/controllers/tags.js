const Tag = require('../models/tag'); // Import the Mongoose Tag model

module.exports = function () {
    let module = {};

    // Add a new Tag
    module.add = async function (request, response) {
        try {
            let { name ,slug } = request.body;

            let tagData = await Tag.create({
                name,
                slug
            });

            return response.status(200).json({
                status: 200,
                data: tagData,
                message: 'Tag created successfully'
            });
        } catch (error) {
            console.error("add Tags error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    // Edit a Tag
    module.edit = async function (request, response) {
        try {
            let { name ,slug } = request.body;
            let { tagId } = request.query;

            let tagData = await Tag.findOne({
                _id: tagId,
                isDelete: '0'
            });

            if (!tagData) {
                return response.status(400).json({
                    status: 400,
                    message: "Tag Data Not Found"
                });
            }

            await Tag.updateOne({ _id: tagId }, { name ,slug});

            return response.status(200).json({
                status: 200,
                message: "Tag updated successfully"
            });
        } catch (error) {
            console.error("edit Tag error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    // View a Tag
    module.view = async function (request, response) {
        try {
            let { tagId } = request.query;

            let tagData = await Tag.findOne({
                _id: tagId,
                isDelete: '0'
            });

            if (!tagData) {
                return response.status(400).json({
                    status: 400,
                    message: "Tag Not Found"
                });
            }

            return response.status(200).json({
                status: 200,
                data: tagData,
                message: "Tag viewed successfully"
            });
        } catch (error) {
            console.error("view Tag error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    // Delete a Tag (soft delete)
    module.delete = async function (request, response) {
        try {
            let { tagId } = request.query;

            let tagData = await Tag.findOne({
                _id: tagId,
                isDelete: '0'
            });

            if (!tagData) {
                return response.status(400).json({
                    status: 400,
                    message: "Tag Not Found"
                });
            }

            await Tag.updateOne({ _id: tagId }, { isDelete: '1' });

            return response.status(200).json({
                status: 200,
                message: "Tag deleted successfully"
            });
        } catch (error) {
            console.error("delete Tag error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    // List Tags with Pagination and Search
    module.list = async function (request, response) {
        try {
            const { pageIndex = 1, pageSize = 10, search = '' } = request.query;
            const offset = (pageIndex - 1) * pageSize;

            const whereClause = {
                isDelete: '0'
            };

            // Add search condition
            if (search) {
                whereClause.name = new RegExp(search, 'i'); // Case-insensitive regex search
            }

            const tagData = await Tag.find(whereClause)
                .sort({ createdAt: -1 })
                .limit(parseInt(pageSize))
                .skip(parseInt(offset));

            const totalItems = await Tag.countDocuments(whereClause);
            const totalPages = Math.ceil(totalItems / pageSize);

            return response.status(200).json({
                status: 200,
                message: "Tags fetched successfully",
                data: tagData,
                pagination: {
                    totalItems: totalItems,
                    currentPage: parseInt(pageIndex),
                    totalPages: totalPages
                }
            });
        } catch (error) {
            console.error("List Tags error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    return module;
};
