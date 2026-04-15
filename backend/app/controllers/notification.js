
const Notification = require('../models/notification'); // Import Mongoose Notification model
const Page = require('../models/pages'); // Import Mongoose Page model
const User = require('../models/user'); // Import Mongoose User model


module.exports = function (model) {
    let module = {};


    module.listNotification = async function (request, response) {

        try {
            let { pageIndex = 1, pageSize = 10, search = '', fromDate, toDate } = request.query;
            const skip = (pageIndex - 1) * pageSize;
    
            const whereClause = { isDelete: false };
    
            // Add date range filtering
            if (fromDate && toDate) {
                const startDate = new Date(new Date(fromDate).setHours(0, 0, 0, 0));
                const endDate = new Date(new Date(toDate).setHours(23, 59, 59, 999));
                whereClause.createdAt = { $gte: startDate, $lte: endDate };
            }
    
            // Add search condition
            if (search) {
                whereClause.message = { $regex: search, $options: 'i' };
            }
    
            // Fetch notifications with pagination
            const notificationData = await Notification.find(whereClause)
                .populate('PageDetail', Page)
                .sort({ createdAt: -1 }) // Sort by createdAt in descending order
                .skip(skip)
                .limit(parseInt(pageSize));
    
            const totalItems = await Notification.countDocuments(whereClause);
            const totalPages = Math.ceil(totalItems / pageSize);
    
            return response.status(200).json({
                status: 200,
                message: "Notifications fetched successfully",
                data: notificationData,
                pagination: {
                    totalItems,
                    currentPage: parseInt(pageIndex),
                    totalPages
                }
            });
    
        } catch (error) {
            console.error("list notification error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    module.deleteNotification = async function (request, response) {
        try {
            let { notificationId } = request.query;
    
            if (!notificationId) {
                return response.status(400).json({
                    status: 400,
                    message: "Notification ID is required"
                });
            }
    
            const notificationData = await Notification.findById(notificationId);
    
            if (!notificationData) {
                return response.status(400).json({
                    status: 400,
                    message: "Notification not found"
                });
            }
    
            notificationData.isDelete = true;
            await notificationData.save();
    
            return response.status(200).json({
                status: 200,
                message: "Notification deleted successfully"
            });
    
        } catch (error) {
            console.error("delete notification error: ", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    module.seoEdit = async function (request, response) {
        try {

            let { meta, homeMeta, headerScript, bodyScript, footerScript } = request.body

            let seoData = await model.Seo.findOne({})
            if (seoData) {
                await model.Seo.update({
                    metaData: meta, homeMeta, headerScript, bodyScript, footerScript
                }, {
                    where: {
                        id: seoData.id
                    },
                });
            } else {
                await model.Seo.create({
                    meta,
                    homeMeta,
                    headerScript,
                    bodyScript,
                    footerScript
                })
            }

            return response.status(200).json({
                status: 200,
                message: "Seo updated successfully"
            });

        } catch (error) {
            console.error("Seo Edit error: ", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    }

    module.getSessionData = async function (request, response) {
        try {
            let { userId } = request.query;
    
            if (!userId) {
                return response.status(400).json({
                    status: 400,
                    message: "User ID is required"
                });
            }
    
            let getUserData = await User.findById(userId);
    
            if (!getUserData) {
                return response.status(404).json({
                    status: 404,
                    message: "User not found"
                });
            }
    
            return response.status(200).json({
                status: 200,
                data: getUserData.permission,
                message: "Permission fetched successfully"
            });
    
        } catch (error) {
            console.error("get session data error: ", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    }

    return module

}

