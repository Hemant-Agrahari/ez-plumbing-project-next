const nodemailer = require("nodemailer");
const path = require('path');
const Blog = require("../models/blog")

const transporter = nodemailer.createTransport({
    mail_service: config.smtp_service,
    host: config.smtp_host,
    port: config.smtp_port,
    auth: {
        user: config.smtp_email,
        pass: config.smtp_password,
    },
});

const Notification = require('../models/notification'); // Adjust the path as necessary

module.exports.addNotification = async function (data) {
    try {
        // Create the notification using the Notification model
        let createNotification = await Notification.create(data);

        if (createNotification) {
            return { status: "success", message: "Created Notification.", data: createNotification };
        } else {
            return { status: "fail", message: "Notification failed", data: createNotification };
        }
    } catch (error) {
        console.error("Notification function ERROR: ", error);
        return { status: "fail", message: error.message ? error.message : error };
    }
}


module.exports.imageUpload = async function (file) {
    try {
        const fileName = file.name; // Example for getting the file name
        // await file.mv(`./public/upload/media/${fileName}`); // Adjust path as needed
        let frontendUploadPath = path.join(__dirname, '../../public/uploads/media', fileName);
        await file.mv(frontendUploadPath); // Adjust path as needed
        return `/uploads/media/${fileName}`; // Return the file path

    } catch (error) {
        console.error("imageUpload function ERROR: ", error);
        return { status: "fail", message: error.message ? error.message : error };
    }
}

module.exports.updateViews = async function (params) {

    console.log("-----params-------------------->", params);
    const now = new Date(); 
    const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000); 
    
    try {
        const blogData = await Blog.aggregate([
            {
                '$match': {
                    'updatedAt': { '$lt': twentyFourHoursAgo }
                }
            },
            {
                '$sample': {
                    'size': 25
                }
            }
        ]);

        for (const blog of blogData) {
            const randomIncrement = Math.floor(Math.random() * (20 - 15 + 1)) + 15;
            await Blog.findByIdAndUpdate(blog._id, {
                $inc: { view: randomIncrement }
            });
        }

        console.log("Executing cron job: Task running after 24 hours");
    } catch (error) {
        console.error("Error running task:", error);
    }try {
        const blogData = await Blog.aggregate([
            {
                '$match': {
                    'updatedAt': { '$lt': twentyFourHoursAgo }
                }
            },
            {
                '$sample': {
                    'size': 25
                }
            }
        ]);

        for (const blog of blogData) {
            const randomIncrement = Math.floor(Math.random() * (20 - 15 + 1)) + 15;
            await Blog.findByIdAndUpdate(blog._id, {
                $inc: { view: randomIncrement }
            });
        }

        console.log("Executing cron job: Task running after 24 hours");
    } catch (error) {
        console.error("Error running task:", error);
    }
}
