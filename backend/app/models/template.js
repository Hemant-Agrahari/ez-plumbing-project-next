const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Template = Schema({
    title: {
        type: String,
        default: ''
    },
    key: {
        type: String,
        default: ''
    },
    userId:{
        type: String,
        default: ''
    },
    isDelete: {
        type: Boolean,
        default: false
    },

}, {
    collection: 'Template',
    timestamps: true
});

module.exports = mongoose.model('Template', Template);