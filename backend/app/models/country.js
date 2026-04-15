const mongoose = require('mongoose');
const { Schema } = mongoose;

const CountrySchema = new Schema({
    name: { type: String },
    c_id: { type: Number },
}, {
    collection: 'Country',
    timestamps: true,
});


module.exports = mongoose.model('Country', CountrySchema);