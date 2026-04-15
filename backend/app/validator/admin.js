const Joi = require("joi");
module.exports = function (model) {
  let module = {};

  // Page Validation

  module.addPageValidation = function (req, res, next) {
    const schema = Joi.object().keys({
      title: Joi.string().required(),
      slug: Joi.string().required(),
      content: Joi.string().allow(null, ''),
      seoTitle: Joi.string().allow(null, ''),
      seoDescription: Joi.string().allow(null, ''),
      metaRobot: Joi.string().allow(null, ''),
      schema: Joi.array().allow(null, ''),
      template: Joi.string().allow(null, ''),
      categories: Joi.array().allow(null, ''),
      featureImage: Joi.string().allow(null, ''),
      type: Joi.string().allow(null, ''),
      subType: Joi.string().allow(null, ''),
      faq: Joi.array().allow(null, '')
    });
    const { error } = schema.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res.status(422).json({ error: message });
    }
  };

  module.viewPageValidation = function (req, res, next) {
    const schema = Joi.object().keys({
      pageId: Joi.string().required(),
      userId: Joi.string().allow(null, '')
    });
    const { error } = schema.validate(req.query);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res.status(422).json({ error: message });
    }
  };

  module.editPageValidation = function (req, res, next) {
    const schema = Joi.object().keys({
      title: Joi.string().required(),
      slug: Joi.string().required(),
      content: Joi.string().allow(null, ''),
      seoTitle: Joi.string().allow(null, ''),
      seoDescription: Joi.string().allow(null, ''),
      metaRobot: Joi.string().allow(null, ''),
      schema: Joi.array().allow(null, ''),
      template: Joi.string().allow(null, ''),
      categories: Joi.array().allow(null, ''),
      featureImage: Joi.string().allow(null, ''),
      type: Joi.string().allow(null, ''),
      subType: Joi.string().allow(null, ''),
      faq: Joi.array().allow(null, '')
    });
    const { error } = schema.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res.status(422).json({ error: message });
    }
  };

  module.pageListValidation = function (req, res, next) {
    const schema = Joi.object().keys({
      pageIndex: Joi.number().required(),
      pageSize: Joi.number().required(),
      search: Joi.string().allow(null, ''),
      type: Joi.string().allow(null, ''),
      userId: Joi.string().allow(null, ''),
      subType: Joi.string().allow(null, '')
    });
    const { error } = schema.validate(req.query);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res.status(422).json({ error: message });
    }
  };

  //Login 
  module.loginValidation = function (req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res.status(422).json({ error: message });
    }
  };

  //Short Code
  module.addEditShortCodeValidation = function (req, res, next) {
    const schema = Joi.object().keys({
      title: Joi.string().required(),
      content: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res.status(422).json({ error: message });
    }
  };

  module.shortListValidation = function (req, res, next) {
    const schema = Joi.object().keys({
      pageIndex: Joi.number().required(),
      pageSize: Joi.number().required(),
      search: Joi.string().allow(null, ''),
      userId: Joi.string().allow(null, ''),
    });
    const { error } = schema.validate(req.query);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res.status(422).json({ error: message });
    }
  };

  //Sub Admin Validation
  module.addEditSubAdmiinValidation = function (req, res, next) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      mobile: Joi.string().required(),
      email: Joi.string().required(),
      permission: Joi.string().required(),
      password: Joi.string().required(),
      status: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res.status(422).json({ error: message });
    }
  };

  module.subadminListValidation = function (req, res, next) {
    const schema = Joi.object().keys({
      pageIndex: Joi.number().required(),
      pageSize: Joi.number().required(),
      search: Joi.string().allow(null, ''),
      userId: Joi.string().allow(null, ''),
    });
    const { error } = schema.validate(req.query);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res.status(422).json({ error: message });
    }
  };

  //Forget Password
  module.forgetPasswordValidation = function (req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string().required()
    });
    const { error } = schema.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res.status(422).json({ error: message });
    }
  };

  //Change Password
  module.changePasswordValidation = function (req, res, next) {
    const schema = Joi.object().keys({
      newpassword: Joi.string().required(),
      oldpassword: Joi.string().required()
    });
    const { error } = schema.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res.status(422).json({ error: message });
    }
  };

  //Update Profile
  module.updateProfileValidation = function (req, res, next) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      mobile: Joi.string().required(),
      email: Joi.string().required()
    });
    const { error } = schema.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res.status(422).json({ error: message });
    }
  };

  //Media Validation
  module.mediaListValidation = function (req, res, next) {
    const schema = Joi.object().keys({
      pageIndex: Joi.number().required(),
      pageSize: Joi.number().required(),
      search: Joi.string().allow(null, ''),
      userId: Joi.string().allow(null, ''),
    });
    const { error } = schema.validate(req.query);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res.status(422).json({ error: message });
    }
  };

  //Notification
  module.notificationListValidation = function (req, res, next) {
    const schema = Joi.object().keys({
      pageIndex: Joi.number().required(),
      pageSize: Joi.number().required(),
      search: Joi.string().allow(null, ''),
      userId: Joi.string().allow(null, ''),
      fromDate: Joi.string().allow(null, ''),
      toDate: Joi.string().allow(null, ''),
    });
    const { error } = schema.validate(req.query);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res.status(422).json({ error: message });
    }
  };

  // Service
  module.addEditServiceValidation = function (req, res, next) {
    console.log("req.body.data",req.body.data);
    req.body.data = JSON.parse(req.body.data)
    const schema = Joi.object().keys({
      breadcrumbTitle: Joi.string().required(),
      bannerTitle: Joi.string().allow(null, ''),
      bannerImage: Joi.string().allow(null, ''),
      bannerSubTitle: Joi.string().allow(null, ''),
      bannerContent: Joi.string().allow(null, ''),
      content: Joi.array().required(),
      serviceSlider: Joi.array().required(),
      testimonials: Joi.array().required(),
      content2: Joi.array().allow(null, ''),
      section2: Joi.object().allow(null, ''),
      seoTitle: Joi.string().allow(null, ''),
      seoDescription: Joi.string().allow(null, ''),
      metaRobot: Joi.string().allow(null, ''),
      template: Joi.string().allow(null, ''),
      schema: Joi.array().allow(null, ''),
      categories: Joi.array().allow(null, ''),
      faq: Joi.array().allow(null, ''),
      slug: Joi.string().allow(null, ''),
      locationContent: Joi.array().allow(null, ''),
      section1 : Joi.object().allow(null, ''),
      section3 : Joi.object().allow(null, ''),
      precise_section : Joi.object().allow(null, ''),
      slab_Leaksection : Joi.object().allow(null, '')
    });
    const { error } = schema.validate(req.body.data);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res.status(422).json({ error: message });
    }
  }

  //Author 
  module.addEditAuthorValidation = function (req, res, next) {
    const schema = Joi.object().keys({
      breadcrumbTitle: Joi.string().required(),
      banner: Joi.array().required(),
      seoTitle: Joi.string().required(),
      seoDescription: Joi.string().required(),
      metaRobot: Joi.string().required(),
      schema: Joi.array().required(),
      authorId: Joi.string().allow('', null),
      author: Joi.string().allow('', null),
      name: Joi.string().allow('', null),
      slug: Joi.string().allow(null, ''),
      template: Joi.string().required(),
    });
    const { error } = schema.validate(req.body.data);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res.status(422).json({ error: message });
    }
  }

  module.viewDeleteAuthorValidation = function (req, res, next) {
    const schema = Joi.object().keys({
      authorId: Joi.string().required(),
      userId: Joi.string().allow(null, ''),
    });
    const { error } = schema.validate(req.query);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res.status(422).json({ error: message });
    }
  }

  module.authorListValidation = function (req, res, next) {
    const schema = Joi.object().keys({
      pageIndex: Joi.number().required(null, ''),
      pageSize: Joi.number().required(null, ''),
      search: Joi.string().allow(null, ''),
      userId: Joi.string().allow(null, ''),
    });
    const { error } = schema.validate(req.query);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res.status(422).json({ error: message });
    }
  }


  return module;
};
