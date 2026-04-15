module.exports = function (model) {
    let module = {};


    module.addShortCode = async function (request, response) {
        try {
            let { title, content } = request.body
            let { userId } = request.query

            let uniqueId = Math.floor(Math.random() * (99999 - 9999) + 9999);
            checkUniqueId(uniqueId)
            async function checkUniqueId(uniqueId) {
                let ShortCode = await model.ShortCode.findOne({
                    where: {
                        uniqId: uniqueId
                    }
                })
                if (ShortCode) {
                    uniqueId = Math.floor(Math.random() * (99999 - 9999) + 9999);
                    checkUniqueId(uniqueId)
                }
            }

            let shortCode = await model.ShortCode.create({
                title,
                content,
                userId,
                uniqId: uniqueId
            })

            return response.status(200).json({
                status: 200,
                data: shortCode,
                message: 'ShortCode created successfully'
            })

        } catch (error) {
            console.error("addShortCode error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            })
        }

    }

    module.editShortCode = async function (request, response) {
        try {
            let { title, content } = request.body
            let { shortCodeId, userId } = request.query

            let shortCodeData = await model.ShortCode.findOne({
                where: {
                    id: shortCodeId,
                    isDelete: '0'
                }
            })

            if (!shortCodeData) {
                return response.status(400).json({
                    status: 400,
                    message: "shortCode Not Found"
                })
            }

            await model.ShortCode.update({
                title,
                content,
                userId
            }, {
                where: {
                    id: shortCodeId
                }
            })

            return response.status(200).json({
                status: 200,
                message: "ShortCode updated successfully"
            })


        } catch (error) {
            console.error("editShortCode error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            })
        }

    }

    module.viewShortCode = async function (request, response) {
        try {
            let { shortCodeId } = request.query

            let shortCodeData = await model.ShortCode.findOne({
                where: {
                    id: shortCodeId,
                    isDelete: '0'
                },
                include: [
                    {
                        model: model.user,
                        as: 'updatedBy'
                    }
                ]
                
            })

            if (!shortCodeData) {
                return response.status(400).json({
                    status: 400,
                    message: "shortCode Not Found"
                })
            }

            return response.status(200).json({
                status: 200,
                data: shortCodeData,
                message: "ShortCode View successfully"
            })


        } catch (error) {
            console.error("viewShortCode error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            })
        }

    }

    module.deleteShortCode = async function (request, response) {
        try {
            let { shortCodeId } = request.query

            let shortCodeData = await model.ShortCode.findOne({
                where: {
                    id: shortCodeId,
                    isDelete: '0'
                }
            })

            if (!shortCodeData) {
                return response.status(400).json({
                    status: 400,
                    message: "shortCode Not Found"
                })
            }

            await model.ShortCode.update({
                isDelete: '1'
            }, {
                where: {
                    id: shortCodeId
                }
            })

            return response.status(200).json({
                status: 200,
                message: "ShortCode deleted successfully"
            })


        } catch (error) {
            console.error("deletehortCode error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            })
        }

    }

    module.shortCodeList = async function (request, response) {
        try {
            const { pageIndex, pageSize, search = '', } = request.query;

            const offset = (pageIndex - 1) * pageSize;

            const whereClause = {
                isDelete: '0'
            };

            // Add search condition
            if (search) {
                whereClause[Sequelize.Op.or] = [
                    { title: { [Sequelize.Op.like]: `%${search}%` } },
                    { id: { [Sequelize.Op.like]: `%${search}%` } }
                ];
            }

            const shortCodeData = await model.ShortCode.findAndCountAll({
                where: whereClause,
                include: [
                    {
                        model: model.user,
                        as: 'updatedBy'
                    }
                ],
                order: [
                    ['createdAt', 'DESC']
                ],
                limit: parseInt(pageSize),
                offset: parseInt(offset)
            });

            // Prepare the response with pagination info
            const totalPages = Math.ceil(shortCodeData.count / pageSize);

            response.status(200).json({
                status: 200,
                message: "Short Code fetched successfully",
                data: shortCodeData.rows,
                pagination: {
                    totalItems: shortCodeData.count,
                    currentPage: parseInt(pageIndex),
                    totalPages: totalPages
                }
            });

        } catch (error) {
            console.error("shortCodeList error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            })

        }

    }

    return module;
}