const Model = require('../core/model');
const Schema = Model.Schema;
const schema = {
    _id: { index: true, unique: true, type: String },
    departure: { type: Schema.Types.Point },
    destination: { type: Schema.Types.Point },
    depName: { type: String },
    destName: { type: String },
    entryDate: { type: Date, default: Date.now }
};

const dictionary = {
    _id: "id",
    departure: "departure",
    destination: "destination",
    depName: "dep_name",
    destName: "dest_name",
    entryDate: "entry_date"
};

const createExclude = ["entry_date", "id"];
const updateExclude = ["id", "entry_date"];
const readExclude = [];

const model = Model.create('routes', schema, dictionary).enableAI();
module.exports = model.getModel();