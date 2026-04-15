const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogSchema = new Schema({
    breadcrumbTitle: { type: String, required: true },
    bannerContent: { type: String, default: '' },
    bannerTitle: { type: String, default: '' },
    content: { type: Array, default: null },
    slug: { type: String, required: true, unique: true },
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
    metaRobot: { type: String, default: '' },
    schema: { type: Array, default: null },
    faq: { type: Array, default: null },
    template: { type: String, default: '' },
    view: { type: Number, default: 200 },
    categories: { type: Array, default: null },
    author: { type: String, default: '' },
    tags: { type: Array, default: null },
    bannerImage: { type: String, default: '' },
    isDelete: { type: Boolean, default: false },
    userId: { type: String, default: '' },
    wordpress:  { type: Boolean, default: false }

}, {
    collection: 'Blog',
    timestamps: true,
});

module.exports = mongoose.model('Blog', BlogSchema);
// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const BlogSchema = new Schema({
//     image: { type: String, default: '' },  // Image URL for the blog post
//     post_author: { type: Number},  // Reference to the author (user model)
//     post_date: { type: Date, default: Date.now },  // Date when the post was published
//     post_date_gmt: { type: Date, default: Date.now },  // GMT version of post date
//     post_content: { type: String },  // Main content of the post (HTML formatted)
//     post_title: { type: String },  // Title of the blog post
//     post_excerpt: { type: String, default: '' },  // Excerpt from the blog post (optional)
//     post_status: { type: String, enum: ['publish', 'draft', 'pending'] },  // Status of the blog post
//     comment_status: { type: String, enum: ['open', 'closed'], default: 'open' },  // Whether comments are enabled
//     post_password: { type: String, default: '' },  // Password protection for the post (optional)
//     post_name: { type: String },  // URL slug (unique)
//     post_parent: { type: Number, default: 0 },  // Parent post ID (if applicable for hierarchical structure)
//     guid: { type: String },  // Unique identifier (URL of the post)
//     menu_order: { type: Number, default: 0 },  // Menu order (optional)
//     post_type: { type: String, default: 'post' },  // Post type (e.g., "post", "page")
//     post_mime_type: { type: String, default: '' },  // MIME type (optional)
//     comment_count: { type: Number, default: 0 },  // Number of comments on the post
//     isDelete: { type: Boolean, default: false },
//     wordpress:  { type: Boolean, default: true },  // Soft delete flag for the post
//   }, {
//     collection: 'Blog',
//     timestamps: true  // Automatically adds createdAt and updatedAt fields
//   });

// module.exports = mongoose.model('Blog', BlogSchema);
