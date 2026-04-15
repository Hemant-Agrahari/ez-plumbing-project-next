const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    userId:{
        type: String,
        default: ''
    },
    slug: {
        type: String,
        default: ''
    },
    breadcrumbTitle: {
        type: String,
        default: ''
    },
    bannerTitle: {
        type: String,
        default: ''
    },
    bannerContent: {
        type: String,
        default: ''
    },
    bannerSubTitle: {
        type: String,
        default: ''
    },
    bannerImage: {
        type: String,
        default: ''
    },
    seoTitle: {
        type: String,
        default: ''
    },
    seoDescription: {
        type: String,
        default: ''
    },
    metaRobot: {
        type: String,
        default: ''
    },
    schema: {
        type: Array,
        default: null
    },
    template: {
        type: String,
        default: ''
    },
    iconImage: {
        type: String,
        default: ''
    },
    contentTitle: {
        type: String,
        default: ''
    },
    isDelete: {
        type: Boolean,
        default: false
    }
}, {
    collection: 'Author',
    timestamps: true
});

const Author = mongoose.model('Author', AuthorSchema);

module.exports = Author
