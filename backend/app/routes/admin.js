module.exports = function (app, model, controller) {
  const middleware = require("../middleware/index")(model);
  const validation = require("../validator/index")(model);


  app.post("/login", validation.admin.loginValidation, controller.admin.login);
  app.post("/forgetPassword", validation.admin.forgetPasswordValidation, controller.admin.forgetPassword);
  app.post("/changepasswordPost", middleware.admin.verifyUserToken, validation.admin.changePasswordValidation, controller.admin.changepasswordPost);
  app.post("/updateprofile", middleware.admin.verifyUserToken, validation.admin.updateProfileValidation, controller.admin.updateprofile);
  app.get("/adminProfileView", middleware.admin.verifyUserToken, controller.admin.viewAdmin);

  //DashBoard
  app.get("/dashboard", middleware.admin.verifyUserToken, controller.dashboard.viewDashBoard);

  //pages Route
  app.post("/pages/add", middleware.admin.verifyUserToken, validation.admin.addPageValidation, controller.pages.addPage)
  app.get('/pages/view', middleware.admin.verifyUserToken, validation.admin.viewPageValidation, controller.pages.viewPage)
  app.post('/pages/edit', middleware.admin.verifyUserToken, validation.admin.editPageValidation, controller.pages.editPage)
  app.get('/pages/list', middleware.admin.verifyUserToken, validation.admin.pageListValidation, controller.pages.pagelist)
  app.get("/pages/delete", middleware.admin.verifyUserToken, controller.pages.pagedelete)

  // //Media Route
  // app.post("/media/add", middleware.admin.verifyUserToken, controller.media.addMedia)
  // app.post("/media/edit", middleware.admin.verifyUserToken, controller.media.editMedia)
  // app.get("/media/view", middleware.admin.verifyUserToken, controller.media.viewMedia)
  // app.get("/media/list", middleware.admin.verifyUserToken, validation.admin.mediaListValidation, controller.media.mediaList)
  // app.get("/media/delete", middleware.admin.verifyUserToken, controller.media.deleteMedia)


  //ShortCode Route
  // app.post("/shortcode/add", middleware.admin.verifyUserToken, validation.admin.addEditShortCodeValidation, controller.shortCode.addShortCode)
  // app.post("/shortcode/edit", middleware.admin.verifyUserToken, validation.admin.addEditShortCodeValidation, controller.shortCode.editShortCode)
  // app.get("/shortcode/view", middleware.admin.verifyUserToken, controller.shortCode.viewShortCode)
  // app.get("/shortcode/list", middleware.admin.verifyUserToken, validation.admin.shortListValidation, controller.shortCode.shortCodeList)
  // app.get("/shortcode/delete", middleware.admin.verifyUserToken, controller.shortCode.deleteShortCode)

  //Sub Admin
  app.post("/subadmin/add", middleware.admin.verifyUserToken, validation.admin.addEditSubAdmiinValidation, controller.subadmin.addSubAdmin);
  app.post("/subadmin/edit", middleware.admin.verifyUserToken, validation.admin.addEditSubAdmiinValidation, controller.subadmin.editSubAdmin);
  app.get("/subadmin/delete", middleware.admin.verifyUserToken, controller.subadmin.deleteSubAdmin);
  app.get("/subadmin/view", middleware.admin.verifyUserToken, controller.subadmin.viewSubAdmin);
  app.get("/subadmin/list", middleware.admin.verifyUserToken, validation.admin.subadminListValidation, controller.subadmin.listSubAdmin);

  //Notification
  app.get("/notification/list", middleware.admin.verifyUserToken, validation.admin.notificationListValidation, controller.notification.listNotification);
  app.get("/notification/delete", middleware.admin.verifyUserToken, controller.notification.deleteNotification);

  //SEO
  app.post("/seo/edit", middleware.admin.verifyUserToken, controller.notification.seoEdit);
  app.get("/getSessionData", middleware.admin.verifyUserToken, controller.notification.getSessionData);


  //Template Route
  app.post("/template/add", middleware.admin.verifyUserToken, controller.template.addTemplate)
  app.post("/template/edit", middleware.admin.verifyUserToken, controller.template.editTemplate)
  app.get("/template/view", middleware.admin.verifyUserToken, controller.template.viewTemplate)
  app.get("/template/list", middleware.admin.verifyUserToken, controller.template.templateList)
  app.get("/template/delete", middleware.admin.verifyUserToken, controller.template.deleteTemplate)

  //Tags API 
  app.post("/tags/add", middleware.admin.verifyUserToken, controller.tags.add)
  app.post("/tags/edit", middleware.admin.verifyUserToken, controller.tags.edit)
  app.get("/tags/view", middleware.admin.verifyUserToken, controller.tags.view)
  app.get("/tags/list", middleware.admin.verifyUserToken, controller.tags.list)
  app.get("/tags/delete", middleware.admin.verifyUserToken, controller.tags.delete) 


  // ServiceAPI 
  app.post("/addService", middleware.admin.verifyUserToken, validation.admin.addEditServiceValidation, controller.services.addService)
  app.post("/editService", middleware.admin.verifyUserToken, validation.admin.addEditServiceValidation, controller.services.editService)
  app.get("/deleteService", middleware.admin.verifyUserToken, controller.services.deleteService)
  app.get("/viewService", middleware.admin.verifyUserToken, controller.services.viewService)
  app.get("/listService", middleware.admin.verifyUserToken, controller.services.listService)

  // AboutUsAPI
  app.post("/addAboutUs", middleware.admin.verifyUserToken, controller.aboutus.addAboutUs)
  app.post("/editAboutUs", middleware.admin.verifyUserToken, controller.aboutus.editAboutUs)
  app.get("/viewAboutUs", middleware.admin.verifyUserToken, controller.aboutus.viewAboutUs)
  app.get("/deleteAboutUs", middleware.admin.verifyUserToken, controller.aboutus.deleteAboutUs)
  app.get("/listAboutUs", middleware.admin.verifyUserToken, controller.aboutus.listAboutUs)

  // Author API 
  app.post("/author/add", middleware.admin.verifyUserToken, validation.admin.addEditAuthorValidation, controller.author.add)
  app.post("/author/edit", middleware.admin.verifyUserToken, validation.admin.addEditAuthorValidation, controller.author.edit)
  app.get("/author/view", middleware.admin.verifyUserToken, validation.admin.viewDeleteAuthorValidation, controller.author.view)
  app.get("/author/delete", middleware.admin.verifyUserToken, validation.admin.viewDeleteAuthorValidation, controller.author.delete)
  app.get("/author/list", middleware.admin.verifyUserToken, validation.admin.authorListValidation, controller.author.list)

  // Blog API 
  app.post("/blog/add", middleware.admin.verifyUserToken, controller.blog.add)
  app.post("/blog/edit", middleware.admin.verifyUserToken, controller.blog.edit)
  app.get("/blog/view",  controller.blog.view)
  app.get("/blog/delete",middleware.admin.verifyUserToken, controller.blog.delete)
  app.get("/blog/list", controller.blog.list)

  // Scholarship API 
  app.post("/scholarship/add", middleware.admin.verifyUserToken, controller.scholarship.add)
  app.post("/scholarship/edit", middleware.admin.verifyUserToken, controller.scholarship.edit)
  app.get("/scholarship/view", middleware.admin.verifyUserToken, controller.scholarship.view)
  app.get("/scholarship/delete", middleware.admin.verifyUserToken, controller.scholarship.delete)
  app.get("/scholarship/list", middleware.admin.verifyUserToken, controller.scholarship.list)

  //Location API 
  app.post("/addLocation", middleware.admin.verifyUserToken, controller.location.addLocation)
  app.post("/editLocation", middleware.admin.verifyUserToken, controller.location.editLocation)
  app.get("/viewLocation", middleware.admin.verifyUserToken, controller.location.viewLocation)
  app.get("/deleteLocation", middleware.admin.verifyUserToken, controller.location.deleteLocation)
  app.get("/listLocation", middleware.admin.verifyUserToken, controller.location.listLocation)

  //BecomeAProvider
  app.post("/addBecomeAProvider", middleware.admin.verifyUserToken, controller.becomeaprovider.addBecomeAProvider)
  app.post("/editBecomeAProvider", middleware.admin.verifyUserToken, controller.becomeaprovider.editBecomeAProvider)
  app.get("/viewBecomeAProvider", middleware.admin.verifyUserToken, controller.becomeaprovider.viewBecomeAProvider)
  app.get("/deleteBecomeAProvider", middleware.admin.verifyUserToken, controller.becomeaprovider.deleteBecomeAProvider)
  app.get("/listBecomeAProvider", middleware.admin.verifyUserToken, controller.becomeaprovider.listBecomeAProvider)

  app.get("/getAllData", middleware.admin.verifyUserToken, controller.services.getAllData)

};
