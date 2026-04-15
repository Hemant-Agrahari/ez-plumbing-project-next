const mongoose = require('mongoose');

const ScholarshipSchema = new mongoose.Schema({
    breadcrumbTitle: { type: String, default: '' },
    bannerImage: { type: String, default: '' },
    bannerContent: {
        type: String, default: ''
    },
    bannerTitle: {
        type: String, default: ''
    },
    slug: {
        type: String, default: ''
    },
    mainTitle: {
        type: String, default: ''
    },
    mainContent: {
        type: String, default: ''
    },
    listingTitle: {
        type: String, default: ''
    },
    listingItems: {
        type: String, default: ''
    },
    btnTitle: {
        type: String, default: ''
    },
    btnLink: {
        type: String, default: ''
    },
    template: {
        type: String, default: ''
    },
    seoTitle: {
        type: String, default: ''
    },
    seoDescription: {
        type: String, default: ''
    },
    metaRobot: {
        type: String, default: ''
    },
    schema: {
        type: Array, default: null
    },
    categories: {
        type: Array, default: null
    },
    isDelete: {
        type: Boolean, default: false,
    },
    userId: {
        type: String, default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('Scholarship', ScholarshipSchema);
