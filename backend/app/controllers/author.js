const Author = require('../models/author'); // Ensure you adjust the path as needed

module.exports = function () {
    const module = {};

    module.add = async function (request, response) {
        try {
            const { userId } = request.query;
            const {
                name, slug, bannerTitle, bannerContent, contentTitle, template,
                bannerSubTitle, breadcrumbTitle, seoTitle, seoDescription, metaRobot, schema
            } = request.body;
            const { bannerImage, iconImage } = request.files;

            // Check if slug already exists
            const authorSlugCheck = await Author.findOne({ slug: slug, isDelete: false });
            console.log("userId", userId);
            if (authorSlugCheck) {
                return response.status(400).json({ status: false, message: 'Slug already exists' });
            }

            let obj = {
                breadcrumbTitle,
                name,
                bannerTitle,
                bannerContent,
                bannerSubTitle,
                contentTitle,
                seoTitle,
                seoDescription,
                metaRobot,
                schema,
                userId,
                slug,
                template,
                iconImage: iconImage ? await helper.imageUpload(iconImage) : '',
                bannerImage: bannerImage ? await helper.imageUpload(bannerImage) : ''
            }

            await Author.create(obj);
            return response.status(200).json({ status: 200, message: 'Author added successfully' });

        } catch (error) {
            console.error("add author error", error);
            return response.status(500).json({ status: 500, message: "Internal Server Error" });
        }
    };

    module.edit = async function (request, response) {
        try {
            const { authorId } = request.query;
            const {
                name, breadcrumbTitle, template, contentTitle, slug,
                bannerTitle, bannerContent, bannerSubTitle, seoTitle, seoDescription, metaRobot, schema
            } = request.body;

            if (!authorId) {
                return response.status(400).json({ status: 400, message: 'Author ID is required' });
            }

            const authorData = await Author.findOne({ _id: authorId, isDelete: false });

            if (!authorData) {
                return response.status(404).json({ status: 404, message: 'Author not found' });
            }

            // Update fields
            authorData.breadcrumbTitle = breadcrumbTitle || authorData.breadcrumbTitle;
            authorData.bannerTitle = bannerTitle || authorData.bannerTitle;
            authorData.bannerContent = bannerContent || authorData.bannerContent;
            authorData.bannerSubTitle = bannerSubTitle || authorData.bannerSubTitle;
            authorData.contentTitle = contentTitle || authorData.contentTitle;
            authorData.seoTitle = seoTitle || authorData.seoTitle;
            authorData.seoDescription = seoDescription || authorData.seoDescription;
            authorData.metaRobot = metaRobot || authorData.metaRobot;
            authorData.schema = schema || authorData.schema;
            authorData.name = name || authorData.name;
            authorData.slug = slug || authorData.slug;
            authorData.template = template || authorData.template;

            if (request.files) {
                if (request.files.bannerImage) {
                    authorData.bannerImage = await helper.imageUpload(request.files.bannerImage);
                }
                if (request.files.iconImage) {
                    authorData.iconImage = await helper.imageUpload(request.files.iconImage);
                }
            }

            await authorData.save();

            return response.status(200).json({ status: 200, message: 'Author updated successfully' });

        } catch (error) {
            console.error("edit author error", error);
            return response.status(500).json({ status: 500, message: "Internal Server Error" });
        }
    };
  
    module.view = async function (request, response) {
        try {
            const { authorId } = request.query;

            const authorData = await Author.findOne({ _id: authorId, isDelete: false });

            if (!authorData) {
                return response.status(404).json({ status: 404, message: 'Author not found' });
            }

            return response.status(200).json({ status: 200, data: authorData, message: 'Author viewed successfully' });

        } catch (error) {
            console.error("view author error", error);
            return response.status(500).json({ status: 500, message: "Internal Server Error" });
        }
    };

    module.delete = async function (request, response) {
        try {
            const { authorId } = request.query;

            const authorData = await Author.findOne({ _id: authorId, isDelete: false });

            if (!authorData) {
                return response.status(404).json({ status: 404, message: 'Author not found' });
            }

            authorData.isDelete = true; // Soft delete
            await authorData.save();

            return response.status(200).json({ status: 200, message: 'Author deleted successfully' });

        } catch (error) {
            console.error("delete author error", error);
            return response.status(500).json({ status: 500, message: "Internal Server Error" });
        }
    };

    module.list = async function (request, response) {
        try {
            const { pageIndex = 1, pageSize = 10, search = '' } = request.query;
            const skip = (pageIndex - 1) * pageSize;

            const whereClause = { isDelete: false };

            if (search) {
                whereClause.$or = [
                    { bannerTitle: { $regex: search, $options: 'i' } }
                ];
            }

            const authorData = await Author.find(whereClause)
                .skip(skip)
                .limit(parseInt(pageSize))
                .sort({ createdAt: -1 });

            const totalItems = await Author.countDocuments(whereClause);
            const totalPages = Math.ceil(totalItems / pageSize);

            return response.status(200).json({
                status: 200,
                message: "Authors fetched successfully",
                data: authorData,
                pagination: {
                    totalItems,
                    currentPage: parseInt(pageIndex),
                    totalPages
                }
            });

        } catch (error) {
            console.error("list authors error", error);
            return response.status(500).json({ status: 500, message: "Internal Server Error" });
        }
    };

    return module;
};