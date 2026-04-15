const mongoose = require('mongoose');
const { Schema } = mongoose;

const ccpr_postSchema = new Schema({

    // slug: { type: String, required: true, unique: true },
    // bannerTitle: { type: String, default: '' },
    // bannerImage: { type: String, default: '' },
    // section2Titel: { type: String, default: '' },
    // section2Description: { type: String, default: '' },
    // content: { type: Array, default: null },
    // seoTitle: { type: String, default: '' },
    // seoDescription: { type: String, default: '' },
    // metaRobot: { type: String, default: '' },
    // schema: { type: Array, default: null },
    // template: { type: String, default: '' },
    // categories: { type: Array, default: null },
    // userId: { type: String, default: '' },
    // isDelete: { type: Boolean, default: false },
    guid: { type: String }
}, {
    collection: 'ccpr_posts',
    timestamps: true,
});

module.exports = mongoose.model('ccpr_posts', ccpr_postSchema);
