const Joi = require("joi");
module.exports = function (model) {
    let module = {};

    module.getBlogValidation = function (req, res, next) {
        const schema = Joi.object().keys({
            slug: Joi.string().required(),
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

    module.getBlogListValidation = function (req, res, next) {
        const schema = Joi.object().keys({
            pageIndex: Joi.number().required(),
            pageSize: Joi.number().required(),
            search: Joi.string().allow(null, '')
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

    module.getCategoriesBlogValidation = function (req, res, next) {
        const schema = Joi.object().keys({
            pageIndex: Joi.number().required(),
            pageSize: Joi.number().required(),
            search: Joi.string().allow(null, ''),
            type: Joi.string().required(),
            categories: Joi.string().required()
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

    module.contactUsFormValidation = function (req, res, next) {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required(),
            phone: Joi.string().pattern(/^[0-9]*$/).allow(null, ''),
            message: Joi.string().required(),
            currentFormUrl:Joi.string()
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

    module.becomeAProviderFormValidation = function (req, res, next) {
        const schema = Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().required(),
            phone: Joi.string().required(),
            aboutYourCompany: Joi.string().required(),
            companyName: Joi.string().allow(null, ''),
            servicesOffered: Joi.string().allow(null, ''),
            companyWebsite: Joi.string().allow(null, ''),
            companyAddress: Joi.string().allow(null, ''),
            country: Joi.string().allow(null, ''),
            state: Joi.string().allow(null, ''),
            city: Joi.string().allow(null, ''),
            provideYourInformation: Joi.string().allow(null, ''),
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

    module.getAuthorValidation = function (req, res, next) {
        const schema = Joi.object().keys({
            type: Joi.string().required(),
            authorName: Joi.string().required(),
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

    module.getAuthorBlogValidation = function (req, res, next) {
        const schema = Joi.object().keys({
            pageIndex: Joi.number().required(),
            pageSize: Joi.number().required(),
            search: Joi.string().allow(null, ''),
            authorName: Joi.string().required()
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

    module.getRecentPostValidation = function (req, res, next) {
        const schema = Joi.object().keys({
            type: Joi.string().required(),
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


    return module;
};
