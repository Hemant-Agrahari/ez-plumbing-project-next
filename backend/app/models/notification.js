const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotificationSchema = new Schema({
    message: { type: String, required: true },
    userId: { type: String, required: true },
    pageId: { type: mongoose.Types.ObjectId, required: true },
    createdAt: { type: Date, default: Date.now }
}, {
    collection: 'Notifications'
});

module.exports = mongoose.model('Notification', NotificationSchema);
