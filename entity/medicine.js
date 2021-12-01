const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    uses: {
        type: [],
        required: false,
    },
    description: {
        type: String,
        required: false
    },
    createdAt: {
        type: String,
        default: Date.now()
    }
});

module.exports = mongoose.model('Medicine', MedicineSchema);


