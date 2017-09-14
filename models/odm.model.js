const Model = require('../core/model');
const schema = {
    _id: { index: true, unique: true, type: String },
    name: { type: String, required: true },
    category: { type: String, required: true }
};

const dictionary = {
    id: "_id",
    name: "name",
    category: "category"
}

const model = Model.create('odm', schema, dictionary).enableAI();
module.exports = model.getModel();

