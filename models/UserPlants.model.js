const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const userPlantSchema = new Schema({
    plantname: {type: String, required: true},
    plantSpecies: {type:mongoose.Schema.Types.ObjectId, ref: 'Plant'},
    dateOfAcquisition: Date,
    plantPicture: String,
    plantCutting: {type: Number, default: 0},
    plantSize: String,
    productsUsed: [{
        product: {
          type: String,
        },
        dateUsed: {
          type: Date,
          default: Date.now
        }
      }],
    careActivityDate: [{
        activity: {
          type: String,
        },
        dateOfCare: {
          type: Date,
          default: Date.now
        }
      }],
      reminderSettings: Boolean  
});

const UserPlant = model('UserPlant', userPlantSchema);

module.exports = UserPlant;
