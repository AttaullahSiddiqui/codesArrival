let mongoose = require('mongoose');

let storeSchema = mongoose.Schema({
    name: { type: String, required: true },
    storeURL: { type: String, required: true, unique: true },
    heading: { type: String, required: true },
    categoryRef: { type: Array, required: true },
    shortDes: { type: String, required: true },
    longDes: { type: String, required: true },
    img: { type: String, required: true },
    imgAlt: { type: String, required: true },
    directUrl: { type: String, required: true },
    trackUrl: { type: String, required: true },
    metaTitle: { type: String, required: true },
    metaDes: { type: String, required: true },
    metaKeywords: { type: String },
    fb: { type: String },
    pin: { type: String },
    wik: { type: String },
    twit: { type: String },
    gplus: { type: String },
    android: { type: String },
    ios: { type: String },
    topStore: { type: Boolean, required: true },
    editorChoice: { type: Boolean, required: true },
    CreatedAt: { type: String, default: Date.now() }
});

module.exports = mongoose.model('Store', storeSchema);