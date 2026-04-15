// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// let ServicePageSchema = Schema({
//     id: {
//         type: Number,
//         default: ''
//     },
//     title:{
//         type: String,
//         default: ''
//     },
//     content: {
//         type: String,
//         default: false,
//     },
//     excerpt:{
//         type: String,
//         default: null
//     },
//     slug:{
//         type: String,
//         default: null
//     },
//     featured_image:{
//         type: Boolean,
//         default: false
//     },
//     layout:{
//         type: Array,
//         default: null
//     },
//     template:{
//         type:String,
//         default :''
//     },
//     wordpress:{
//         type:Boolean,
//         default:true
//     }

// }, {
//     collection: 'ServicePage',
//     timestamps: true
// });
// const ServicePage = mongoose.model('ServicePage', ServicePageSchema);
// module.exports = ServicePage;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ServicePageSchema = Schema({
    breadcrumbTitle: {
        type: String,
        default: ''
    },
    layout:{
        type: Array,
        default: null
    },
    slug: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: ''
    },
    bannerImage: {
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
    bannerTitle: {
        type: String,
        default: ''
    },
    content: {
        type: Array,
        default: null
    },
    content2: {
        type: Array,
        default: null
    },
    section2: {
        type: Object,
        default: null
    },
    serviceSlider: {
        type: Array,
        default: null
    },
    testimonials: {
        type: Array,
        default: null
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
    faq: {
        type: Array,
        default: null
    },
    template: {
        type: String,
        default: ''
    },
    categories: {
        type: Array,
        default: null
    },
    pageSubHeading: {
        type: String,
        default: ''
    },
    locationContent: {
        type: Array,
        default: null
    },
    pageTitle: {
        type: String,
        default: ''
    },
    userId:{
        type: String,
        default: ''
    },
    isDelete: {
        type: Boolean,
        default: false,
    },
    section1:{
        type: Object,
        default: null
    },
    section3:{
        type: Object,
        default: null
    },
    precise_section:{
        type: Object,
        default: null
    },
    slab_Leaksection:{
        type: Object,
        default: null
    },
    wordpress:{
        type:Boolean,
        default:false
    },
    featured_image:{
            type: Boolean,
            default: false
    },

}, {
    collection: 'ServicePage',
    timestamps: true
});
const ServicePage = mongoose.model('ServicePage', ServicePageSchema);
module.exports = ServicePage;
