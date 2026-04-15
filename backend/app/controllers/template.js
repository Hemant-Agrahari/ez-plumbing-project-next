const Template = require('../models/template'); // Mongoose Template model

module.exports = function () {
    let module = {};

    // Add a new template
    module.addTemplate = async function (request, response) {
        try {
            let { title } = request.body;
            let { userId } = request.query;

            let key = title.replace(/ /g, "_");

            let templateData = await Template.findOne({ key, isDelete: '0' });

            if (templateData) {
                return response.status(400).json({
                    status: 400,
                    message: 'Title already exists'
                });
            }

            let template = await Template.create({
                title,
                key,
                userId,
            });

            return response.status(200).json({
                status: 200,
                data: template,
                message: 'Template created successfully'
            });
        } catch (error) {
            console.error("addTemplate error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    // Edit a template
    module.editTemplate = async function (request, response) {
        try {
            let { title } = request.body;
            let { templateId, userId } = request.query;

            let templateData = await Template.findOne({
                _id: templateId,
                isDelete: '0'
            });

            if (!templateData) {
                return response.status(400).json({
                    status: 400,
                    message: "Template Not Found"
                });
            }

            let key = title.replace(/ /g, "_");

            let existingTemplate = await Template.findOne({
                _id: { $ne: templateId },
                key,
                isDelete: '0'
            });

            if (existingTemplate) {
                return response.status(400).json({
                    status: 400,
                    message: 'Title already exists'
                });
            }

            await Template.updateOne(
                { _id: templateId },
                { title, key, userId }
            );

            return response.status(200).json({
                status: 200,
                message: "Template updated successfully"
            });
        } catch (error) {
            console.error("editTemplate error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    // View a template
    module.viewTemplate = async function (request, response) {
        try {
            let { templateId } = request.query;

            let templateData = await Template.findOne({
                _id: templateId,
                isDelete: '0'
            }).populate('userId', 'name email'); // Populating User details

            if (!templateData) {
                return response.status(400).json({
                    status: 400,
                    message: "Template Not Found"
                });
            }

            return response.status(200).json({
                status: 200,
                data: templateData,
                message: "Template viewed successfully"
            });
        } catch (error) {
            console.error("viewTemplate error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    // Soft delete a template
    module.deleteTemplate = async function (request, response) {
        try {
            let { templateId } = request.query;

            let templateData = await Template.findOne({
                _id: templateId,
                isDelete: '0'
            });

            if (!templateData) {
                return response.status(400).json({
                    status: 400,
                    message: "Template Not Found"
                });
            }

            await Template.updateOne(
                { _id: templateId },
                { isDelete: '1' }
            );

            return response.status(200).json({
                status: 200,
                message: "Template deleted successfully"
            });
        } catch (error) {
            console.error("deleteTemplate error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    // List templates with pagination and search
    module.templateList = async function (request, response) {
        try {
            const { pageIndex = 1, pageSize = 10, search = '' } = request.query;
            const offset = (pageIndex - 1) * pageSize;

            let searchQuery = {
                isDelete: '0'
            };

            // Add search condition
            if (search) {
                searchQuery.$or = [
                    { title: new RegExp(search, 'i') },
                    { _id: new RegExp(search, 'i') }
                ];
            }

            const templates = await Template.find(searchQuery)
                .populate('userId', 'name email') // Populating user data
                .sort({ createdAt: -1 })
                .limit(parseInt(pageSize))
                .skip(parseInt(offset));

            const totalItems = await Template.countDocuments(searchQuery);
            const totalPages = Math.ceil(totalItems / pageSize);

            return response.status(200).json({
                status: 200,
                message: "Templates fetched successfully",
                data: templates,
                pagination: {
                    totalItems,
                    currentPage: parseInt(pageIndex),
                    totalPages
                }
            });
        } catch (error) {
            console.error("templateList error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    return module;
};
