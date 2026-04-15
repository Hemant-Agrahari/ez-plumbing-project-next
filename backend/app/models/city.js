const mongoose = require('mongoose');
const { Schema } = mongoose;


const CitySchema = new Schema({
    name: { type: String },
    s_id: { type: Number },
    ct_id: { type: Number },
}, {
    collection: 'City',
    timestamps: true,
});

module.exports = mongoose.model('City', CitySchema);