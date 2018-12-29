const mongoose = require('mongoose');
const path = require('path');

class Schema {
    constructor(schemaName) {
        this.schemaName = schemaName;
        return this.init();
    }
    init() {
        let schemaPath = path.join(__dirname, this.schemaName);
        let schema = require(schemaPath);
        return mongoose.Schema(schema);

    }
}
module.exports = Schema;