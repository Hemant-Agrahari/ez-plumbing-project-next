module.exports = function (mongoose, Schema) {

  let module = {};

  module.user = require("./user")(mongoose, Schema);
  module.Media = require("./media")(mongoose, Schema, module.user);
  module.Pages = require("./pages")(mongoose, Schema, module.user, module.Media);
  module.ShortCode = require("./shortCode")(mongoose, Schema, module.user);
  module.Notification = require("./notification")(mongoose, Schema, module.user, module.Pages);
  module.Seo = require("./seo")(mongoose, Schema);
  module.Template = require("./template")(mongoose, Schema, module.user);
  module.ContactUS = require("./contactUS")(mongoose, Schema);
  module.Tags = require("./tag")(mongoose, Schema);
  module.ServicePage = require("./servicePage")(mongoose, Schema, module.user);
  module.Author = require("./author")(mongoose, Schema, module.user);
  module.Blog = require("./blog")(mongoose, Schema, module.user);
  module.Scholarship = require("./scholarship")(mongoose, Schema, module.user);
  module.CountrySchema = require("./country")(mongoose, Schema);
  module.StateSchema = require("./state")(mongoose, Schema);
  module.ccpr_posts = require("./ccpr_posts")(mongoose, Schema);


  return module;
};


