const mongoose = require('mongoose');
const { Schema } = mongoose;

const PageSchema = new Schema({
    title: { type: String, default: '' },
    slug: { type: String, default: '', unique: true },
    content: { type: String, default: '' },
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
    metaRobot: { type: String, default: '' },
    schema: { type: Array, default: null },
    template: { type: String, default: '' },
    categories: { type: Array, default: null },
    featureImage: { type: String, default: null },
    userId: { type: String, default: '' },
    type: { type: String, default: '' },
    subType: { type: String, default: '' },
    uniqId: { type: Number, unique: true },
    faq: { type: Array, default: null },
    author: { type: String, default: '' },
    tags: { type: Array, default: null },
    description: { type: String, default: '' },
    isDelete: { type: Boolean, default: false }
}, {
    timestamps: true,
    collection: 'Pages'
});

module.exports = mongoose.model('Pages', PageSchema);
