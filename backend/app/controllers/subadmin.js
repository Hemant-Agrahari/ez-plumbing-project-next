const bcrypt = require("bcrypt");
const fs = require('fs');
const User = require('../models/user'); // Import the Mongoose User model

module.exports = function () {
    let module = {};

    module.addSubAdmin = async function (request, response) {
        try {
            let { name, mobile, email, permission, password, status } = request.body;

            let userUpdate = await User.findOne({ email: email });
            if (userUpdate) {
                return response.status(400).json({
                    status: 400,
                    message: "Email Already Exist"
                });
            }

            let userData = {
                name: name,
                mobile: mobile,
                email: email,
                role: "subadmin",
                permission: permission ? JSON.parse(permission) : [],
                last_login: new Date(),
                password: bcrypt.hashSync(password, 10),
                status: status
            };

            let imageName = 'default.png';
            if (request.files?.profile) {
                let image = request.files.profile;
                imageName = "admin_" + Date.now() + image.name;
                await image.mv("./public/upload/subadmin/" + imageName, (err) => {
                    if (err) {
                        return response.status(400).json({ message: "Image upload error" });
                    }
                });
            }
            userData.profile = constants.baseUrl + "upload/subadmin/" + imageName;
            await User.create(userData);

            return response.status(200).json({ message: "Sub-Admin added successfully." });
        } catch (error) {
            console.error("addSubAdmin error: ", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    module.editSubAdmin = async function (request, response) {
        try {
            let { name, mobile, email, permission, password, status } = request.body;
            let { subAdminId } = request.query;

            if (!subAdminId) {
                return response.status(400).json({
                    status: 400,
                    message: "Sub Admin id is required"
                });
            }

            let userDataCheck = await User.findOne({ _id: subAdminId, isDelete: '0' });
            if (!userDataCheck) {
                return response.status(400).json({
                    status: 400,
                    message: "Sub Admin not found"
                });
            }

            let checkEmail = await User.findOne({
                _id: { $ne: subAdminId },
                email: email
            });
            if (checkEmail) {
                return response.status(400).json({
                    status: 400,
                    message: "Email already exist"
                });
            }

            let userData = {
                name: name,
                mobile: mobile,
                email: email,
                role: "subadmin",
                permission: permission ? JSON.parse(permission) : [],
                last_login: new Date(),
                password: bcrypt.hashSync(password, 10),
                status: status
            };

            let imageName;
            if (request.files?.profile) {
                let image = request.files.profile;
                imageName = "admin_" + Date.now() + image.name;
                await image.mv("./public/upload/subadmin/" + imageName, (err) => {
                    if (err) {
                        return response.status(400).json({ message: "Image upload error" });
                    }
                });
                userData.profile = constants.baseUrl + "upload/subadmin/" + imageName;

                fs.unlink('./public' + userDataCheck.image, (err) => {
                    if (err) {
                        console.log("Error deleting file: ", err);
                    }
                });
            }

            await User.updateOne({ _id: subAdminId }, userData);

            return response.status(200).json({ message: "Sub-Admin updated successfully." });
        } catch (error) {
            console.error("editSubAdmin error: ", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    module.viewSubAdmin = async function (request, response) {
        try {
            let { subAdminId } = request.query;

            if (!subAdminId) {
                return response.status(400).json({
                    status: 400,
                    message: "Sub Admin id is required"
                });
            }

            let userDataCheck = await User.findOne({ _id: subAdminId, isDelete: '0' });
            if (!userDataCheck) {
                return response.status(400).json({
                    status: 400,
                    message: "Sub Admin not found"
                });
            }

            return response.status(200).json({
                status: 200,
                message: "Sub Admin viewed successfully.",
                data: userDataCheck,
            });
        } catch (error) {
            console.error("viewSubAdmin error: ", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    module.listSubAdmin = async function (request, response) {
        try {
            const { pageIndex = 1, pageSize = 10, search = '' } = request.query;
            const offset = (pageIndex - 1) * pageSize;

            const whereClause = {
                isDelete: '0',
                role: "subadmin"
            };

            if (search) {
                whereClause.$or = [
                    { email: new RegExp(search, 'i') },
                    { name: new RegExp(search, 'i') },
                    { mobile: new RegExp(search, 'i') }
                ];
            }

            const subAdminData = await User.find(whereClause)
                .sort({ createdAt: -1 })
                .limit(parseInt(pageSize))
                .skip(parseInt(offset));

            const totalItems = await User.countDocuments(whereClause);
            const totalPages = Math.ceil(totalItems / pageSize);

            return response.status(200).json({
                status: 200,
                message: "Pages fetched successfully",
                data: subAdminData,
                pagination: {
                    totalItems,
                    currentPage: parseInt(pageIndex),
                    totalPages: totalPages
                }
            });
        } catch (error) {
            console.error("listSubAdmin error", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    module.deleteSubAdmin = async function (request, response) {
        try {
            let { subAdminId } = request.query;

            if (!subAdminId) {
                return response.status(400).json({
                    status: 400,
                    message: "Sub Admin id is required"
                });
            }

            let userDataCheck = await User.findOne({ _id: subAdminId, isDelete: '0' });
            if (!userDataCheck) {
                return response.status(400).json({
                    status: 400,
                    message: "Sub Admin not found"
                });
            }

            await User.updateOne({ _id: subAdminId }, { isDelete: '1' });

            return response.status(200).json({
                status: 200,
                message: "Sub-Admin deleted successfully."
            });
        } catch (error) {
            console.error("deleteSubAdmin error: ", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    return module;
};
