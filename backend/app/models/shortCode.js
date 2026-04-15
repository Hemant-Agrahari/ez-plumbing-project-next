module.exports = function (Sequelize, Schema, User) {
    let ShortCode = Schema({
        title: {
            type: String,
            default: ''
        },
        content: {
            type: Array,
            default: ''
        },
        uniqId: {
            type: String,
            default: ''
        },
        isDelete: {
            type: Boolean,
            default: false
        },

    });
    return mongoose.model('ShortCode', ShortCode);
}