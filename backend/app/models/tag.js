const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Tags = Schema({
    name: {
        type: String,
        default: ''
    },
    slug: {
        type: String,
        default: ''
    },
    isDelete: {
        type: Boolean,
        default: false
    },

}, {
    collection: 'Tags',
    timestamps: true
});
module.exports = mongoose.model('Tags', Tags);