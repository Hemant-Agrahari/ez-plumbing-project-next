const Pages = require('../models/pages'); // Adjust the path as necessary
const mongoose = require('mongoose');

module.exports = function () {
    let module = {};

    module.addPage = async function (request, response) {
        try {
            let { title, slug, content, seoTitle, seoDescription, metaRobot, schema, template, categories, featureImage, type, faq, description, author, tags } = request.body;
            let { userId } = request.query;

            let checkPageData = await Pages.findOne({
                slug: slug,
                type: type,
                isDelete: false
            });

            if (checkPageData) {
                return response.status(400).json({
                    status: 400,
                    message: type + " slug already exists"
                });
            }

            let uniqueId;
            let existingShortCode
            do {
                uniqueId = Math.floor(Math.random() * (99999 - 9999) + 9999);
                existingShortCode = await Pages.findOne({ uniqId: uniqueId });
            } while (existingShortCode);

            let pagesData = {
                title,
                slug,
                content,
                seoTitle,
                seoDescription,
                metaRobot,
                schema: schema ,
                template,
                categories: categories ,
                featureImage: featureImage || null,
                userId,
                type,
                subType: request.body.subType || '',
                uniqId: uniqueId,
                faq: faq ,
                author: author || '',
                tags: tags ,
                description
            };

            let pageData = await Pages.create(pagesData);
            // Assuming `helper.addNotification` is defined elsewhere
            await helper.addNotification({ message: "A new Blog add by ", userId: userId, pageId: pageData._id });

            return response.status(200).json({
                status: 200,
                message: type + " added successfully",
            });

        } catch (error) {
            console.error("addPage error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    module.viewPage = async function (request, response) {
        try {
            let { pageId } = request.query;

            let pageData = await Pages.findOne({
                _id: pageId,
                isDelete: false
            });

            if (!pageData) {
                return response.status(404).json({
                    status: 404,
                    message: "Data not found",
                });
            }
            return response.status(200).json({
                status: 200,
                message: pageData.type + " view data",
                data: pageData
            });

        } catch (error) {
            console.error("viewPage error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    module.editPage = async function (request, response) {
        try {
            let { pageId, userId } = request.query;
            let { title, slug, content, seoTitle, seoDescription, metaRobot, schema, template, categories, featureImage, faq, type, tags, description } = request.body;

            let checkPageData = await Pages.findOne({
                _id: pageId,
                isDelete: false
            });

            if (!checkPageData) {
                return response.status(400).json({
                    status: 400,
                    message: type + " Not Found"
                });
            }

            let slugPageData = await Pages.findOne({
                _id: { $ne: pageId },
                type: type,
                slug: slug,
                isDelete: false
            });

            if (slugPageData) {
                return response.status(400).json({
                    status: 400,
                    message: type + " slug already exists"
                });
            }

            let pagesData = {
                title,
                slug,
                content,
                seoTitle,
                seoDescription,
                metaRobot,
                schema: JSON.stringify(schema),
                template,
                categories: JSON.stringify(categories),
                featureImage: featureImage || null,
                userId,
                faq: JSON.stringify(faq),
                tags: tags ? JSON.stringify(tags) : "[]",
                description
            };

            await Pages.updateOne({ _id: pageId }, { $set: pagesData });

            return response.status(200).json({
                status: 200,
                message: type + " updated successfully",
            });

        } catch (error) {
            console.error("editPage error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    module.pagelist = async function (request, response) {
        try {
            let { pageIndex = 1, pageSize = 10, search = '', type } = request.query;
            const offset = (pageIndex - 1) * pageSize;

            const whereClause = {
                isDelete: false,
                type: type
            };

            if (request.query.subType) {
                whereClause.subType = request.query.subType;
            }

            // Add search condition
            if (search) {
                whereClause['$or'] = [
                    { title: { $regex: search, $options: 'i' } },
                    { _id: { $regex: search, $options: 'i' } }
                ];
            }

            const pageData = await Pages.find(whereClause)
                .skip(offset)
                .limit(parseInt(pageSize))
                .sort({ createdAt: -1 });

            const totalItems = await Pages.countDocuments(whereClause);
            const totalPages = Math.ceil(totalItems / pageSize);

            return response.status(200).json({
                status: 200,
                message: pageData.length ? pageData[0].type : 'Pages' + " fetched successfully",
                data: pageData,
                pagination: {
                    totalItems,
                    currentPage: parseInt(pageIndex),
                    totalPages: totalPages
                }
            });

        } catch (error) {
            console.error("pagelist error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    module.pagedelete = async function (request, response) {
        try {
            let { pageId } = request.query;

            let pageData = await Pages.findOne({
                _id: pageId,
                isDelete: false
            });

            if (!pageData) {
                return response.status(404).json({
                    status: 404,
                    message: "Data not found",
                });
            }

            await Pages.updateOne({ _id: pageId }, { $set: { isDelete: true } });

            return response.status(200).json({
                status: 200,
                message: pageData.type + " deleted successfully",
            });

        } catch (error) {
            console.error("DeletePage error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    return module;
};
