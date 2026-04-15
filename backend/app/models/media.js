

module.exports = function (mongoose, Schema) {
    let Media = new Schema({
        title: {
            type: String,
            default: ''
        },
        userId: {
            type: String,
            default: ''
        },
        caption: {
            type: String,
            default: ''
        },
        altTag: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        image: {
            type: String,
            default: ''
        },
        isDelete: {
            type: Boolean,
            default: false,
        },

    });

    return mongoose.model('Media', Media);
}