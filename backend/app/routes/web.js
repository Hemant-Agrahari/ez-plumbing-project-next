
module.exports = function (app, model, controller) {
  const validation = require("../validator/index")(model);

  // app.get("/getBlog", validation.web.getBlogValidation, controller.public.getBlog)
  // app.get("/getBlogList", validation.web.getBlogListValidation, controller.public.getBlogList)
  // app.get("/getCategoriesBlog", validation.web.getCategoriesBlogValidation, controller.public.getCategoriesBlog)
  app.post("/contactUsForm", validation.web.contactUsFormValidation, controller.public.contactUsForm)
  app.post("/becomeAProviderForm", validation.web.becomeAProviderFormValidation, controller.public.becomeAProviderForm)
  // app.get("/getAuthor", validation.web.getAuthorValidation, controller.public.getAuthor)
  // app.get("/getAuthorBlog", validation.web.getAuthorBlogValidation, controller.public.getAuthorBlog)
  // app.get("/getRecentPost", validation.web.getRecentPostValidation, controller.public.getRecentPost)
  // app.get("/getCategories", validation.web.getRecentPostValidation, controller.public.getCategories)
  // app.get("/countryList", controller.public.countryList);
  
  //Template Data
  app.get("/getService", controller.public.getService)
  // app.get("/getBlogList", validation.web.getBlogListValidation, controller.blog.list)
  app.get("/getRecentBlog", controller.public.getRecentBlog)
  app.get("/getMostpopular", controller.public.getMostpopular)
  // app.get("/getAuthor", validation.web.getAuthorValidation, controller.public.getAuthor)
  // app.get("/getAuthorBlog", validation.web.getAuthorBlogValidation, controller.public.getAuthorBlog)
  app.get("/getCategories",controller.public.getCategories)
  app.get("/getCategoriesBlog", controller.public.getCategoriesBlog)
  // app.get("/getTagsBlog", controller.public.getTagsBlog)
  // app.post("/testAPI", controller.public.testAPI)



}