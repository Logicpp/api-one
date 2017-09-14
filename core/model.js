let db = require('../lib/api.database');
let ai = require('mongoose-auto-increment');

class Model {
    constructor(name, schema, dictionary, createExclude, updateExclude) {
        this.name = name;
        this.schema = schema;
        this.dictionary = dictionary;
        this.createExclude = createExclude;
        this.updateExclude = updateExclude;
        this.model = new db.Schema(this.schema);
    }
    enableAI(field = '_id', start = 1) {
        ai.initialize(db.connection);
        this.model.plugin(ai.plugin, { model: this.name, field: field, startAt: start }); /** Add Auto increment plugin */
        return this;
    }
    getModel() {
        return {
            model: db.model(this.name, this.model),
            dictionary: this.dictionary,
            createExclude: this.createExclude,
            updateExclude: this.updateExclude,
            schema: this.schema
        }
    }
}

module.exports = {
    create: function (name, schema, dictionary, createExclude = [], updateExclude = []) {
        return new Model(name, schema, dictionary, createExclude, updateExclude);
    },
    model: Model,
    Schema: db.Schema
};