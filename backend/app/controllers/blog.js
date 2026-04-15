const Blog = require('../models/blog'); // Adjust the path as necessary
const { ObjectId } = require('mongodb');

module.exports = function () {
    let module = {};

    module.add = async function (request, response) {
        try {
            console.log("request.query", request.query);
            console.log("request.body", request.body);
            let { userId } = request.query;
            let { breadcrumbTitle, content, bannerContent, bannerTitle, slug, seoTitle, seoDescription, metaRobot, schema, faq, template, categories, author, tags } = request.body;
            let { bannerImage } = request.files;

            let obj = {
                breadcrumbTitle,
                bannerContent,
                bannerTitle,
                content: content ? JSON.parse(content) : null,
                slug,
                seoTitle,
                seoDescription,
                metaRobot,
                schema: schema ? JSON.parse(schema) : null,
                userId: userId, // Assuming you want to keep the original userId
                faq: faq ? JSON.parse(faq) : null,
                template,
                categories: categories ? JSON.parse(categories) : null,
                author,
                tags: tags ? JSON.parse(tags) : null
            };

            console.log("obj", obj);

            obj.bannerImage = bannerImage ? await helper.imageUpload(bannerImage) : '';

            let blogData = new Blog(obj);
            await blogData.save();

            return response.status(200).json({
                status: 200,
                message: 'Blog added successfully',
            });

        } catch (error) {
            console.error("add blog error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    module.edit = async function (request, response) {
        try {
            let { blogDataId } = request.query;
            let { breadcrumbTitle, content, bannerContent, bannerTitle, slug, seoTitle, seoDescription, metaRobot, schema, faq, template, categories, author, tags } = request.body;

            if (!blogDataId) {
                return response.status(400).json({
                    status: 400,
                    message: 'Blog id is required'
                });
            }

            let blogData = await Blog.findOne({ _id: blogDataId, isDelete: false });

            if (!blogData) {
                return response.status(400).json({
                    status: 400,
                    message: 'Blog not found'
                });
            }
            else if(blogData.wordpress===true){
                return response.status(404).json({
                    status: 401,
                    message: 'Unauthorized request cannot edit this blog'
                });
            }
            let obj = {
                breadcrumbTitle,
                bannerContent,
                bannerTitle,
                content: content ? JSON.parse(content) : null,
                slug,
                seoTitle,
                seoDescription,
                metaRobot,
                schema: schema ? JSON.parse(schema) : null,
                faq: faq ? JSON.parse(faq) : null,
                template,
                categories: categories ? JSON.parse(categories) : null,
                author,
                tags: tags ? JSON.parse(tags) : null
            };

            if (request.files) {
                let { bannerImage } = request.files;
                obj.bannerImage = bannerImage ? await helper.imageUpload(bannerImage) : blogData.bannerImage; // Keep existing if not updated
            }

            await Blog.updateOne({ _id: blogDataId }, { $set: obj });

            return response.status(200).json({
                status: 200,
                message: 'Blog updated successfully',
            });

        } catch (error) {
            console.error("edit Blog error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    module.view = async function (request, response) {
        try {
            let { blogDataId ,slug} = request.query;
            console.log("request.query", request.query);

            let populateQuery = {
                model: "Author",
                path: 'author',
            }

            // let blogData = await Blog.findOne({ slug, isDelete: false }); // Adjust as per your author schema
            let blogData = await Blog.findOne({ slug, isDelete: false }).populate(populateQuery); // Adjust as per your author schema

            if (!blogData) {
                return response.status(400).json({
                    status: 400,
                    message: 'Blog not found'
                });
            }

            return response.status(200).json({
                status: 200,
                data: blogData,
                message: 'Blog viewed successfully',
            });

        } catch (error) {
            console.error("view blog error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    module.delete = async function (request, response) {
        try {
            let { blogDataId } = request.query;

            let blogData = await Blog.findOne({ _id: blogDataId, isDelete: false });

            if (!blogData) {
                return response.status(400).json({
                    status: 400,
                    message: 'Blog not found'
                });
            }

            // Soft delete
            await Blog.findOneAndUpdate({_id:blogDataId}, {isDelete : true});
            // blogData.isDelete = true;
            // await blogData.save();

            return response.status(200).json({
                status: 200,
                message: 'Blog deleted successfully',
            });

        } catch (error) {
            console.error("delete blog error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    module.list = async function (request, response) {
        try {
            const { pageIndex = 1, pageSize = 10, search = '' } = request.query;
            const skip = (pageIndex - 1) * pageSize;

            const whereClause = {
                isDelete: false
            };

            // Add search condition
            if (search) {
                whereClause.bannerTitle = { $regex: search, $options: 'i' }; // Case-insensitive search
            }

            const blogData = await Blog.find(whereClause)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(pageSize))
                // .populate('author', 'name'); // Adjust according to your author schema

            const totalItems = await Blog.countDocuments(whereClause);
            const totalPages = Math.ceil(totalItems / pageSize);

            return response.status(200).json({
                status: 200,
                message: "Blogs fetched successfully",
                data: blogData,
                pagination: {
                    totalItems,
                    currentPage: parseInt(pageIndex),
                    totalPages
                }
            });

        } catch (error) {
            console.error("Blog list error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    return module;
};