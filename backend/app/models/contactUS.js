const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ContactUS = new Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    companyName: {
        type: String,
        default: ''
    },
    servicesOffered: {
        type: String,
        default: ''
    },
    companyWebsite: {
        type: String,
        default: ''
    },
    companyAddress: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    aboutYourCompany: {
        type: String,
        default: ''
    },
    provideYourInformation: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    state: {
        type: String,
        default: ''
    },
    contactFrom: {
        type: Boolean,
        default: false,
    }

}, {
    collection: 'ContactUS',
    timestamps: true
});

module.exports = mongoose.model('ContactUS', ContactUS);
