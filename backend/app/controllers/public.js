const nodemailer = require("nodemailer");
const ServicePage = require('../models/servicePage');
const Author = require('../models/author');
const Blog = require('../models/blog');
const Page = require('../models/pages'); 
const Scholarship = require('../models/scholarship');
const ContactUS = require('../models/contactUS');
const { ObjectId } = require('mongodb');
const axios = require('axios')
const Country = require('../models/country');
const State = require('../models/state');
const City = require('../models/city');

module.exports = function (model) {
    let module = {};
    // Configure nodemailer
    const transporter = nodemailer.createTransport({
        pool: true,
        name: 'noreply@ezheatandair.com',
        host: 'mail.ezheatandair.com',
        port: 587,
        secure: false,
        auth: {
          user: 'noreply@ezheatandair.com',
          pass: 'hEMVqum7'
        },
        tls: {
            rejectUnauthorized: false
        }
      });
     
    module.getService = async function (request, response) {
        try {
            const { slug } = request.query;
            console.log("slug", slug);
            console.log("request.query", request.query);
            if (!slug) {
                return response.status(400).json({
                    status: 400,
                    message: "Slug is required."
                });
            }

            const validSlugs = ['about-us', 'contact-us', 'thank-you', 'locations', 'become-a-provider', 'ld-liner-bags', 'client-industries' , 'custom-one', 'custom-two', 'custom-three', 'custom-four', 'custom-five', 'custom-six', 'custom-seven', 'custom-eight','custom-nine','custom-ten'];

            const models = {
                ServicePage,
                Author,
                Blog,
                // Scholarship
            };

            // Check if slug is valid for a ServicePage
            let serviceData = await getServiceDataBySlug(models.ServicePage, slug, validSlugs);
            console.log("serviceData before", serviceData);
            // If not found, check in Blog, Author, and Scholarship models
            if (!serviceData) {
                serviceData = await findServiceInModels(models, slug);
            }
            console.log("serviceData After", serviceData);


            if (!serviceData) {
                return response.status(404).json({
                    status: 404,
                    message: "Service not found."
                });
            }

            let relatedBlog = [];
            let author = {};

            if (serviceData.model === 'Blog') {
                // Get author details and related blogs for Blog data
                console.log("serviceData.author",serviceData.author);
                console.log("serviceData.author",new ObjectId(serviceData.author));
                author = await models.Author.findOne({ _id: new ObjectId(serviceData.author), isDelete: false });
                relatedBlog = await getRelatedBlogs(models.Blog, serviceData);
            }

            return response.status(200).json({
                status: 200,
                data: {
                    blogData: serviceData,
                    relatedBlog: relatedBlog,
                    author: author
                },
                message: 'Service data retrieved successfully.',
            });
        } catch (error) {
            console.error("Error in getService:", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error."
            });
        }
    };

    module.getRecentBlog = async function (request, response) {
        try {
            const pageIndex = parseInt(request.query.pageIndex) || 1; // Default to page 1 if not provided
            const pageSize = parseInt(request.query.pageSize) || 10; // Default to 10 items per page if not provided
    
            // Calculate the number of documents to skip
            const skip = (pageIndex - 1) * pageSize;
    
            // Get the total count of blogs (for pagination metadata)
            const totalBlogs = await Blog.countDocuments({ isDelete: false });
    
            // Fetch paginated blog data
            const blogData = await Blog.find({ isDelete: false })
                .select('breadcrumbTitle slug bannerImage bannerTitle wordpress view')
                .populate('author')
                .sort({ createdAt: -1 })
                .skip(skip) // Skip documents for pagination
                .limit(pageSize); // Limit to pageSize
    
            return response.status(200).json({
                status: 200,
                data: blogData,
                pagination: {
                    totalItems: totalBlogs,
                    currentPage: pageIndex,
                    pageSize: pageSize,
                    totalPages: Math.ceil(totalBlogs / pageSize)
                },
                message: 'Recent blog data retrieved successfully.',
            });
    
        } catch (error) {
            console.error("Error in getRecentBlog:", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error."
            });
        }
    };


    module.getMostpopular = async function (request, response) {
        try {

            const pageIndex = parseInt(request.query.pageIndex) || 1; // Default to page 1 if not provided
            const pageSize = parseInt(request.query.pageSize) || 10; // Default to 10 items per page if not provided
    
            // Calculate the number of documents to skip
            const skip = (pageIndex - 1) * pageSize;

            const totalBlogs = await Blog.countDocuments({ isDelete: false });

            const blogData = await Blog.find({ isDelete: false })
            .select('breadcrumbTitle slug bannerImage bannerTitle wordpress view')
            .populate('author')
            .sort({ view: -1 })
            .skip(skip) // Skip documents for pagination
            .limit(pageSize); // Limit to pageSize

        return response.status(200).json({
            status: 200,
            data: blogData,
            pagination: {
                totalItems: totalBlogs,
                currentPage: pageIndex,
                pageSize: pageSize,
                totalPages: Math.ceil(totalBlogs / pageSize)
            },
            message: 'most popular blog data retrieved successfully.',
        });

        } catch (error) {
            console.error("error getAuthor ", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    }

    module.becomeAProviderForm = async function (request, response) {
        try {

            let { firstName, lastName, companyName, email, phone, servicesOffered, companyWebsite,
                companyAddress, country, state, city, aboutYourCompany, provideYourInformation } = request.body
            let s_id = Number(state);
            let c_id = Number(country);
            let countryData = await Country.findOne({ c_id: c_id });
            let stateData = await State.findOne({ s_id: s_id });
            
            let ipAddress = request.headers["x-forwarded-for"]
                ? request.headers["x-forwarded-for"].split(",")[0]
                : request.socket.remoteAddress;


            const userRes = await axios.get(`http://ip-api.com/json/${ipAddress}`);

            if (userRes.data) {
                console.log("COUNTRY -------------------------------------------: ", userRes.data)
            }
            const ipdata = userRes.data
            if (firstName && lastName && email && phone && aboutYourCompany) {

                const userMailOptions = {
                    from: "noreply@ezheatandair.com",
                    to: email,
                    subject: 'Contact Us from www.ezplumbingusa.com ',
                    html: `<!doctype html>
                        <html>
                        <head>
                        <meta charset="utf-8">
                        <title>Need solution for your project?</title>
                        </head>

                        <body style="width:100% !important; margin: 0px auto; text-align:center;">
                        <link href="https://fonts.googleapis.com/css?family=Pacifico" rel="stylesheet">
                        <table style="width:700px; text-align:center; margin:20px auto;border:3px solid #3ab54b;" cellpadding="0" cellspacing="0">
                         <tr style="margin:0;">
                            <td><table style="width:700px; text-align:center; margin:0px auto;margin-top: 20px; padding:50px 0;" cellpadding="0" cellspacing="0">
                               <tr style="margin:0;">
                                  <td><img src="https://www.ezplumbingusa.com/wp-content/uploads/2019/11/ez-plumbing-usa-logo.png" height="70"></td>
                                </tr>
                               <tr style="margin:0;">
                                  <td ><p style="font-family:'Pacifico', cursive; font-size:73px; margin-top: 0px; margin-bottom: 0px;color:#3ab54b;"> Thank you </p></td>
                                </tr>
                               <tr style="margin:0;">
                                  <td ><p style="font-family:Calibri; font-size:30px;margin-top: 0px; margin-bottom: 0px;color:#3ab54b;"> <b> ${firstName} ${lastName} </b></p></td>
                                </tr>
                              </table></td>
                          </tr>
                         <tr style="margin:0;">
                            <td><p style="color:#FFF; text-align:center; margin:0px; background-color:#3ab54b;font-family:Calibri; padding-right:25px; padding-left:25px; font-size:16px; padding-top:40px;">Thank you for contacting us. We value your time and we will get back with you as quickly as possible.</p></td>
                          </tr>

                         <tr style="margin:0;">
                            <td><p style="color:#FFF; font-size:16px; text-align:center; margin:0px; background-color:#3ab54b; font-family:Calibri; padding: 20px 25px 40px;"> Can't wait for us to get in touch? Give us a call straight away on Below Numbers!</p></td>
                          </tr>
                           <tr style="margin:0;">
                              <td style="background-color:#1e1d1f; font-family:Calibri; color:#FFF; font-size:16px;">
                            <table style=" margin:10px auto;padding:16px; text-align:left; width:100%; color:#FFF;" cellpadding="0" cellspacing="0">
                                  <tbody>
                                   <tr style="margin:0;">
                                      <td><table cellspacing="0" cellpadding="0" align="center">
                                          <tbody>
                                           <tr style="margin:0;">
                                              <td style="vertical-align: bottom; color:#fff;">San Diego County</td>
                                            </tr>
                                           <tr style="margin:0;">
                                              <td style="color:#fff;"><span style="color:#fff;">  (760) 389 9117</span></td>
                                            </tr>
                                          </tbody>
                                        </table></td>

                                        <td><table cellspacing="0" cellpadding="0" align="center" >
                                          <tbody>
                                            <tr style="color:#fff;">
                                              <td style="vertical-align: bottom; color:#fff;">  Orange County</td>
                                            </tr>
                                           <tr style="margin:0;">
                                              <td style="color:#fff;"><span style="color:#fff;">  (949) 390 6114</span></td>
                                            </tr>
                                          </tbody>
                                        </table></td>
                                         <td><table cellspacing="0" cellpadding="0" align="center" >
                                          <tbody>
                                            <tr style="color:#fff;">
                                              <td style="vertical-align: bottom; color:#fff;"> Riverside County</td>
                                            </tr>
                                           <tr style="margin:0;">
                                              <td style="color:#fff;"><span style="color:#fff;">  (951) 644-2211</span></td>
                                            </tr>
                                          </tbody>
                                        </table></td>
                                 </tr>    
                                  </tbody>
                                </table></td>
                            </tr>

                        </table>
                        </body>
                        </html>`,
                };

                const adminMailOptions = {
                    from: "EZheatandair<noreply@ezheatandair.com>",
                    to: ["chris@lnsturnkey.com", "anthony@lnsturnkey.com", "sales@ezplumbingusa.com", "ezcontactformleads@gmail.com"],
                    subject: 'Contact Us from www.ezplumbingusa.com',
                    html: `<div>
                    <div class="adM">&nbsp;</div>
                    <table style="font-family: Verdana,sans-serif; font-size: 11px; color: #374953; width: 90%; border: 3px solid #3bb44d; border-radius: 8px;" border="0" cellspacing="0" cellpadding="0" align="center">
                    <tbody>
                    <tr>
                    <td style="background-color: #fff; color: #000; font-size: 27px; padding: 15px;" align="center"><img src="https://www.ezplumbingusa.com/wp-content/uploads/2019/11/ez-plumbing-usa-logo.png" alt="" width="" height="80px" /><br />
                    <div class="a6S" dir="ltr" style="opacity: 0.01; left: 762px; top: 138px;">&nbsp;</div>
                    </td>
                    </tr>
                    <tr>
                    <td style="background-color: #3bb44d; color: #fff; font-size: 16px; font-weight: bold; padding: 0.5em 1em;" align="center">New Message From: ${firstName} ${lastName}</td>
                    </tr>
                    <tr>
                    <td>&nbsp;</td>
                    </tr>
                    <tr>
                    <td align="left">
                    <table style="width: 100%; font-family: Verdana,sans-serif; font-size: 11px; color: #374953;">
                    <tbody>
                    <tr style="background-color: #ebebeb; text-align: center;">
                    <th style="width: 40%; padding: 0.6em 0;" colspan="2">Here is details filled by: ${firstName} ${lastName}</th>
                    </tr>
                    <tr style="background-color: #ebebeb; text-align: center;">
                    <th style="width: 40%; padding: 0.6em 0;">First Name</th>
                    <td style="background-color: #ebebeb; padding: 0.6em 0.4em;" align="left">${firstName}</td>
                    </tr>
                    <tr style="background-color: #ebebeb; text-align: center;">
                    <th style="width: 40%; padding: 0.6em 0;">Last Name</th>
                    <td style="background-color: #ebebeb; padding: 0.6em 0.4em;" align="left">${lastName}</td>
                    </tr>

                    <tr style="background-color: #ebebeb; text-align: center;">
                    <th style="width: 40%; padding: 0.6em 0;">Company Name</th>
                    <td style="background-color: #ebebeb; padding: 0.6em 0.4em;" align="left">${companyName}</td>
                    </tr>

                    <tr style="background-color: #ebebeb; text-align: center;">
                    <th style="width: 40%; padding: 0.6em 0;">Your Email</th>
                    <td style="background-color: #ebebeb; padding: 0.6em 0.4em;" align="left">${email}</td>
                    </tr>
                    <tr style="background-color: #ebebeb; text-align: center;">
                    <th style="width: 40%; padding: 0.6em 0;">Phone Number</th>
                    <td style="background-color: #ebebeb; padding: 0.6em 0.4em;" align="left">${phone}</td>
                    </tr>

                    <tr style="background-color: #ebebeb; text-align: center;">
                    <th style="width: 40%; padding: 0.6em 0;">Service Offered</th>
                    <td style="background-color: #ebebeb; padding: 0.6em 0.4em;" align="left">${servicesOffered}</td>
                    </tr>

                    <tr style="background-color: #ebebeb; text-align: center;">
                    <th style="width: 40%; padding: 0.6em 0;">Company Website</th>
                    <td style="background-color: #ebebeb; padding: 0.6em 0.4em;" align="left">${companyWebsite}</td>
                    </tr>

                    <tr style="background-color: #ebebeb; text-align: center;">
                    <th style="width: 40%; padding: 0.6em 0;">Company Address</th>
                    <td style="background-color: #ebebeb; padding: 0.6em 0.4em;" align="left">${companyAddress}</td>
                    </tr>

                    <tr style="background-color: #ebebeb; text-align: center;">
                    <th style="width: 40%; padding: 0.6em 0;"> city</th>
                    <td style="background-color: #ebebeb; padding: 0.6em 0.4em;" align="left">${city}</td>
                    </tr>

                    <tr style="background-color: #ebebeb; text-align: center;">
                    <th style="width: 40%; padding: 0.6em 0;">State/ Province/ Region</th>
                    <td style="background-color: #ebebeb; padding: 0.6em 0.4em;" align="left">${stateData.name}</td>
                    </tr>

                    <tr style="background-color: #ebebeb; text-align: center;">
                    <th style="width: 40%; padding: 0.6em 0;">Country</th>
                    <td style="background-color: #ebebeb; padding: 0.6em 0.4em;" align="left">${countryData.name}</td>
                    </tr>

                    <tr style="background-color: #ebebeb; text-align: center;">
                    <th style="width: 40%; padding: 0.6em 0;">Please tell us about your company.</th>
                    <td style="background-color: #ebebeb; padding: 0.6em 0.4em;" align="left">${aboutYourCompany}</td>
                    </tr>

                    <tr style="background-color: #ebebeb; text-align: center;">
                    <th style="width: 40%; padding: 0.6em 0;">Please provide your licensing, bonding, and insurance information.</th>
                    <td style="background-color: #ebebeb; padding: 0.6em 0.4em;" align="left">${provideYourInformation}</td>
                    </tr>

                     <tr style="background-color: #ebebeb; text-align: center;">
                    <th style="width: 40%; padding: 0.6em 0;">User ip</th>
                    <td style="background-color: #ebebeb; padding: 0.6em 0.4em;" align="left">${ipAddress}</td>
                    </tr>

                    <tr style="background-color: #ebebeb; text-align: center;">
                    <th style="width: 40%; padding: 0.6em 0;">Location</th>
                    <td style="background-color: #ebebeb; padding: 0.6em 0.4em;" align="left">${ipdata.country},${ipdata.regionName},${ipdata.city}</td>
                    </tr>
                   
                   
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    </div>`,
                };

                transporter.sendMail(userMailOptions, (error, info) => {
                    if (error) {
                        console.log('Error sending email:', error);
                    } else {
                        console.log('User side Email sent successfully.....: ', info.response);
                    }
                });

                transporter.sendMail(adminMailOptions, (error, info) => {
                    if (error) {
                        console.log('Error sending email:', error);
                    } else {
                        console.log('Admin side Email sent successfully.....: ', info.response);
                    }
                });
               
                let fromData = await ContactUS.create({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phone: phone,
                    companyName: companyName,
                    servicesOffered: servicesOffered,
                    companyWebsite: companyWebsite,
                    companyAddress: companyAddress,
                    country: countryData.name,
                    aboutYourCompany: aboutYourCompany,
                    provideYourInformation: provideYourInformation,
                    city: city,
                    state: stateData.name
                })

                console.log("fromData", fromData);
                return response.status(200).json({
                    status: 200,
                    message: "Form submit successfully",
                })

            } else {
                return response.status(400).json({
                    status: 400,
                    message: "Invalid data",
                })
            }

        } catch (error) {
            console.error("error becomeAProviderForm ", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    };

    module.contactUsForm = async function (request, response) {
        try {

            let { name, email, phone, message } = request.body

            let ipAddress = request.headers["x-forwarded-for"]
                ? request.headers["x-forwarded-for"].split(",")[0]
                : request.socket.remoteAddress;

            console.log('ipAddress----------------------------------------', ipAddress)

            const userRes = await axios.get(`http://ip-api.com/json/${ipAddress}`);
            // const response = await axios.get(`http://ip-api.com/json/${ip}`);

            if (userRes.data) {
                console.log("COUNTRY -------------------------------------------: ", userRes.data)
            }
            const ipdata = userRes.data
            const userMailOptions = {
                from: "noreply@ezheatandair.com",
                to: email,
                subject: 'Contact Us',
                html: `<!doctype html>
                    <html>
                    <head>
                    <meta charset="utf-8">
                    <title>Need solution for your project?</title>
                    </head>

                    <body style="width:100% !important; margin: 0px auto; text-align:center;">
                    <link href="https://fonts.googleapis.com/css?family=Pacifico" rel="stylesheet">
                    <table style="width:700px; text-align:center; margin:20px auto;border:3px solid #3ab54b;" cellpadding="0" cellspacing="0">
                     <tr style="margin:0;">
                        <td><table style="width:700px; text-align:center; margin:0px auto;margin-top: 20px; padding:50px 0;" cellpadding="0" cellspacing="0">
                           <tr style="margin:0;">
                              <td><img src="https://www.ezplumbingusa.com/wp-content/uploads/2019/11/ez-plumbing-usa-logo.png" height="70"></td>
                            </tr>
                           <tr style="margin:0;">
                              <td ><p style="font-family:'Pacifico', cursive; font-size:73px; margin-top: 0px; margin-bottom: 0px;color:#3ab54b;"> Thank you </p></td>
                            </tr>
                           <tr style="margin:0;">
                              <td ><p style="font-family:Calibri; font-size:30px;margin-top: 0px; margin-bottom: 0px;color:#3ab54b;"> <b> ${name} </b></p></td>
                            </tr>
                          </table></td>
                      </tr>
                     <tr style="margin:0;">
                        <td><p style="color:#FFF; text-align:center; margin:0px; background-color:#3ab54b;font-family:Calibri; padding-right:25px; padding-left:25px; font-size:16px; padding-top:40px;">Thank you for contacting us. We value your time and we will get back with you as quickly as possible.</p></td>
                      </tr>

                     <tr style="margin:0;">
                        <td><p style="color:#FFF; font-size:16px; text-align:center; margin:0px; background-color:#3ab54b; font-family:Calibri; padding: 20px 25px 40px;"> Can't wait for us to get in touch? Give us a call straight away on Below Numbers!</p></td>
                      </tr>
                       <tr style="margin:0;">
                          <td style="background-color:#1e1d1f; font-family:Calibri; color:#FFF; font-size:16px;">
                        <table style=" margin:10px auto;padding:16px; text-align:left; width:100%; color:#FFF;" cellpadding="0" cellspacing="0">
                              <tbody>
                               <tr style="margin:0;">
                                  <td><table cellspacing="0" cellpadding="0" align="center">
                                      <tbody>
                                       <tr style="margin:0;">
                                          <td style="vertical-align: bottom; color:#fff;">San Diego County</td>
                                        </tr>
                                       <tr style="margin:0;">
                                          <td style="color:#fff;"><span style="color:#fff;">  (760) 389 9117</span></td>
                                        </tr>
                                      </tbody>
                                    </table></td>

                                    <td><table cellspacing="0" cellpadding="0" align="center" >
                                      <tbody>
                                        <tr style="color:#fff;">
                                          <td style="vertical-align: bottom; color:#fff;">  Orange County</td>
                                        </tr>
                                       <tr style="margin:0;">
                                          <td style="color:#fff;"><span style="color:#fff;">  (949) 390 6114</span></td>
                                        </tr>
                                      </tbody>
                                    </table></td>
                                     <td><table cellspacing="0" cellpadding="0" align="center" >
                                      <tbody>
                                        <tr style="color:#fff;">
                                          <td style="vertical-align: bottom; color:#fff;"> Riverside County</td>
                                        </tr>
                                       <tr style="margin:0;">
                                          <td style="color:#fff;"><span style="color:#fff;">  (951) 644-2211</span></td>
                                        </tr>
                                      </tbody>
                                    </table></td>
                             </tr>    
                              </tbody>
                            </table></td>
                        </tr>

                    </table>

                    </body>
                    </html>`,
            };

            const adminMailOptions = {
                from: "EZheatandair<noreply@ezheatandair.com>",
                to: ["chris@lnsturnkey.com", "anthony@lnsturnkey.com", "sales@ezplumbingusa.com", "ezcontactformleads@gmail.com"],
                subject: 'Contact Us',
                html: `<div>
                    <div class="adM">&nbsp;</div>
                    <table style="font-family: Verdana,sans-serif; font-size: 11px; color: #374953; width: 90%; border: 3px solid #3bb44d; border-radius: 8px;" border="0" cellspacing="0" cellpadding="0" align="center">
                    <tbody>
                    <tr>
                    <td style="background-color: #fff; color: #000; font-size: 27px; padding: 15px;" align="center"><img src="https://www.ezplumbingusa.com/wp-content/uploads/2019/11/ez-plumbing-usa-logo.png" alt="" width="" height="80px" /><br />
                    <div class="a6S" dir="ltr" style="opacity: 0.01; left: 762px; top: 138px;">&nbsp;</div>
                    </td>
                    </tr>
                    <tr>
                    <td style="background-color: #3bb44d; color: #fff; font-size: 16px; font-weight: bold; padding: 0.5em 1em;" align="center">New Message From: ${name}</td>
                    </tr>
                    <tr>
                    <td>&nbsp;</td>
                    </tr>
                    <tr>
                    <td align="left">
                    <table style="width: 100%; font-family: Verdana,sans-serif; font-size: 11px; color: #374953;">
                    <tbody>
                    <tr style="background-color: #ebebeb; text-align: center;">
                    <th style="width: 40%; padding: 0.6em 0;" colspan="2">Here is details filled by: ${name}</th>
                    </tr>
                    <tr style="background-color: #ebebeb; text-align: center;">
                    <th style="width: 40%; padding: 0.6em 0;">Full Name</th>
                    <td style="background-color: #ebebeb; padding: 0.6em 0.4em;" align="left">${name}</td>
                    </tr>
                    <tr style="background-color: #ebebeb; text-align: center;">
                    <th style="width: 40%; padding: 0.6em 0;">Your Email</th>
                    <td style="background-color: #ebebeb; padding: 0.6em 0.4em;" align="left">${email}</td>
                    </tr>
                    <tr style="background-color: #ebebeb; text-align: center;">
                    <th style="width: 40%; padding: 0.6em 0;">Phone Number</th>
                    <td style="background-color: #ebebeb; padding: 0.6em 0.4em;" align="left">${phone}</td>
                    </tr>
                    <tr style="background-color: #ebebeb; text-align: center;">
                    <th style="width: 40%; padding: 0.6em 0;">Your Message</th>
                    <td style="background-color: #ebebeb; padding: 0.6em 0.4em;" align="left">${message}</td>
                    </tr>
                    <tr style="background-color: #ebebeb; text-align: center;">
                    <th style="width: 40%; padding: 0.6em 0;">User IP</th>
                    <td style="background-color: #ebebeb; padding: 0.6em 0.4em;" align="left">${ipAddress}</td>
                    </tr>
                     <tr style="background-color: #ebebeb; text-align: center;">
                    <th style="width: 40%; padding: 0.6em 0;">User Location</th>
                    <td style="background-color: #ebebeb; padding: 0.6em 0.4em;" align="left">${ipdata.city},${ipdata.regionName},${ipdata.country}</td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <div style="font-size: 12px; padding: 10px 10px 15px 10px; text-align: center;">Form URL: ${request.body.currentFormUrl}</div>
                    </div>`,
            };
            console.log("test");
            
            transporter.sendMail(userMailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending email:', error);
                } else {
                    console.log('User side Email sent successfully.....: ', info.response);
                }
            });

            transporter.sendMail(adminMailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending email:', error);
                } else {
                    console.log('Admin side Email sent successfully.....: ', info.response);
                }
            });

            let fromData = await ContactUS.create({
                name: name,
                email: email,
                phone: phone,
                message: message,
                contactFrom: true
            })
            console.log("fromData", fromData);
            return response.status(200).json({
                status: 200,
                message: "Form submit successfully",
            })

        } catch (error) {
            console.error("error contactus", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    };

    module.getBlogList = async function (request, response) {
        try {
            let { pageIndex = 1, pageSize = 10, search = '' } = request.query;
            pageIndex = pageIndex == '0' ? 1 : pageIndex;
            const offset = (pageIndex - 1) * pageSize;

            // Build the query
            const whereClause = {
                isDelete: '0',
                type: type
            };

            // Add search condition
            if (search) {
                const regex = new RegExp(search, 'i'); // 'i' makes it case-insensitive
                whereClause.$or = [
                    { title: { $regex: regex } },
                    { _id: { $regex: regex } }
                ];
            }

            // Fetch blog data with pagination
            const [getBlogData, totalItems] = await Promise.all([
                Blog.find(whereClause)
                    .sort({ createdAt: -1 })
                    .skip(parseInt(offset))
                    .limit(parseInt(pageSize)),
                Blog.countDocuments(whereClause)
            ]);

            const totalPages = Math.ceil(totalItems / pageSize);

            response.status(200).json({
                status: 200,
                message: "Blog data fetched successfully",
                data: getBlogData,
                pagination: {
                    totalItems: totalItems,
                    currentPage: parseInt(pageIndex),
                    totalPages: totalPages
                }
            });

        } catch (error) {
            console.error("getBlogList error: ", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    module.getCategories = async function (request, response) {
        try {
            let { type } = request.query;

            // Fetching the categories based on the type and paginating the results
            const getCategories = await Page.find({ type: type,isDelete: false })
                .select('id title slug') // Select only the fields you need
                .sort({ createdAt: -1 }) // Sort by createdAt in descending order
            // .limit(10) // Limit the results to 10
            // .skip(0); // Offset, starting from the first document

            return response.status(200).json({
                status: 200,
                message: "Categories fetched successfully",
                data: getCategories,
            });

        } catch (error) {
            console.error("error getCategories", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            });
        }
    };

    module.getCategoriesBlog = async function (request, response) {
        try {

            let { pageIndex, pageSize, slug, search = '' } = request.query;
            pageIndex = pageIndex == '0' ? 1 : pageIndex
            const offset = (pageIndex - 1) * pageSize;

            const whereClause = {
                isDelete: false,
                'categories.slug': slug, // Only include categories if specified 
            };
            if (search) {
                whereClause.bannerTitle = { $regex: search, $options: 'i' };
            }
            console.log("whereClause", whereClause);

            // Fetch blog data
            let getBlogData = await Blog.find(whereClause)
                .sort({ createdAt: -1 })
                .skip(parseInt(offset))
                .limit(parseInt(pageSize));

            // Count total items for pagination
            const totalItems = await Blog.countDocuments(whereClause);

            let totalPages = Math.ceil(totalItems / pageSize);

            return response.status(200).json({
                status: 200,
                message: "Categories Blog data fetched successfully",
                data: getBlogData,
                pagination: {
                    totalItems: totalItems,
                    currentPage: parseInt(pageIndex),
                    totalPages: totalPages
                }
            });

        } catch (error) {
            console.error("error getCategoriesBlog", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    };

    module.getTagsBlog = async function (request, response) {
        try {

            let { pageIndex, pageSize, slug, search = '' } = request.query;
            pageIndex = pageIndex == '0' ? 1 : pageIndex
            const offset = (pageIndex - 1) * pageSize;

            const whereClause = {
                isDelete: false,
                'tags.slug': slug, // Only include categories if specified
            };
            if (search) {
                whereClause.bannerTitle = { $regex: search, $options: 'i' };
            }
            console.log("whereClause", whereClause);

            // Fetch blog data
            let getBlogData = await Blog.find(whereClause)
                .sort({ createdAt: -1 })
                .skip(parseInt(offset))
                .limit(parseInt(pageSize));

            // Count total items for pagination
            const totalItems = await Blog.countDocuments(whereClause);

            let totalPages = Math.ceil(totalItems / pageSize);

            return response.status(200).json({
                status: 200,
                message: "Tags Blog data fetched successfully",
                data: getBlogData,
                pagination: {
                    totalItems: totalItems,
                    currentPage: parseInt(pageIndex),
                    totalPages: totalPages
                }
            });

        } catch (error) {
            console.error("error getCategoriesBlog", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    };

    module.getAuthor = async function (request, response) {
        try {

            let { authorName } = request.query;

            // Find the author using the slug
            let authorData = await Author.findOne({
                slug: authorName,
                isDelete: false
            });

            if (!authorData) {
                return response.status(404).json({
                    status: 404,
                    message: "Author not found"
                });
            }

            return response.status(200).json({
                status: 200,
                data: authorData,
                message: "Author Data"
            });


        } catch (error) {
            console.error("error getAuthor ", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    }

    module.getAuthorBlog = async function (request, response) {
        try {

            let { pageIndex = 1, pageSize = 10, search = '', authorId } = request.query;
            pageIndex = pageIndex == '0' ? 1 : pageIndex;
            const offset = (pageIndex - 1) * pageSize;

            // Construct the where clause
            const whereClause = {
                isDelete: false,
                author: authorId // Assuming `author` field is used to reference author ID
            };

            // Add search condition
            if (search) {
                whereClause.$or = [
                    { title: { $regex: search, $options: 'i' } },
                    { _id: { $regex: search, $options: 'i' } }
                ];
            }

            // Fetch author blogs
            let authorData = await Blog.find(whereClause)
                .sort({ createdAt: -1 })
                .skip(parseInt(offset))
                .limit(parseInt(pageSize));

            // Count total items for pagination
            const totalItems = await Blog.countDocuments(whereClause);

            const totalPages = Math.ceil(totalItems / pageSize);

            return response.status(200).json({
                status: 200,
                message: "Author blog fetched successfully",
                data: authorData,
                pagination: {
                    totalItems: totalItems,
                    currentPage: parseInt(pageIndex),
                    totalPages: totalPages
                }
            });


        } catch (error) {
            console.error("error getAuthor ", error);
            return response.status(500).json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    }

    module.testAPI = async function (request, response) {
        try {
            let { name, phone, email, services } = request.body

            const transporter = nodemailer.createTransport({
                // Configure your email transport options here
                name: 'noreply',
                host: 'mail.aistechnolabs.org',
                port: 465,
                secure: true,
                auth: {
                    user: "no-reply@aistechnolabs.com",
                    pass: "@!$tech6567"
                }
            });

            const mailOptions = {
                from: 'no-reply@aistechnolabs.com',
                to: 'mason@aistechnolabs.org',
                subject: 'Web-Development',
                text: `UserName: ${name}\nPhone No: ${phone}\nEmail: ${email}\nServices: ${services}`,
            };
            await transporter.sendMail(mailOptions).then(() => {
                console.log("Mail sent..........");
                response.status(200).send({ message: "Successfully Mail sent..........", success: true })
            }).catch((err) => {
                console.log("ERROR Sending : ", err.message);
            })
        } catch (error) {
            console.error("Error :", error);
        }
    }

    module.countryList = async function (request, response) {
        try {
            let { country, state } = request.query;
            let Data;

            // If `state` is provided, fetch the corresponding city
            if (country && state || state) {
                let s_id = Number(state);
                Data = await City.find({ s_id: s_id });
                return response.status(200).send({ data: Data, success: true });
            }
            // If `country` is provided, fetch the corresponding state
            else if (country) {
                let c_id = Number(country);
                Data = await State.find({ c_id: c_id });
                return response.status(200).send({ data: Data, success: true });
            }

            // If no `country` or `state` is provided, fetch all countries
            Data = await Country.find();
            return response.status(200).send({ data: Data, success: true });

        } catch (error) {
            console.error("Error:", error);
            return response.status(500).send({ message: 'Internal Server Error', success: false });
        }
    };

    return module;
}

// Helper function to find data in models
async function findServiceInModels(models, slug) {
    for (let modelName of ['Blog', 'Author','ServicePage']) {
        const model = models[modelName];
        const serviceData = await model.findOne({ slug, isDelete: false });
        console.log("serviceData aaa", serviceData);
        if (serviceData) {
            serviceData.model = modelName; // Save model name for later checks
            return serviceData;
        }
    }
    return null;
}

// Helper function to get service data by slug
async function getServiceDataBySlug(ServicePageModel, slug, validSlugs) {
    if (validSlugs.includes(slug)) {
        return await ServicePageModel.findOne({ slug, isDelete: false });
    }
    return null;
}

// Helper function to get related blogs
async function getRelatedBlogs(BlogModel, serviceData) {
    let titleWords = serviceData.bannerTitle.split(" ");
    let query = {
        _id: { $ne: new ObjectId(serviceData._id) },
        $or: titleWords.map(value => ({
            bannerTitle: { $regex: new RegExp(value, 'i') }
        })),
        isDelete: false
    };

    let relatedBlog = await BlogModel.find(query).limit(4);

    if (relatedBlog.length < 4) {
        let ids = relatedBlog.map(blog => blog._id);
        ids.push(serviceData._id);
        let additionalBlogs = await BlogModel.find({
            _id: { $nin: ids },
            categories: { $in: serviceData.categories },
            isDelete: false
        }).limit(4 - relatedBlog.length);
        relatedBlog = relatedBlog.concat(additionalBlogs);
    }

    return relatedBlog;
}