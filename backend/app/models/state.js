const mongoose = require('mongoose');
const { Schema } = mongoose;


const StateSchema = new Schema({
    name: { type: String },
    s_id: { type: Number },
    c_id: { type: Number },
}, {
    collection: 'State',
    timestamps: true,
});

module.exports = mongoose.model('State', StateSchema);