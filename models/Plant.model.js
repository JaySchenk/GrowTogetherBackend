const { Schema, model } = require("mongoose");

const plantSchema = new Schema({
    species: {
        type: String,
        required: true,
        unique: true
    },
    care_instructions: {
        water: {
            frequency: {
                type: String,
                required: true
            },
            amount: {
                type: String,
                required: true
            }
        },
        light_requirement: {
            type: String,
            required: true
        },
        temperature: String,
        soil_type: {
            type: String,
            required: true
        },
        pot_size: {
            type: String,
            required: true
        },
        growth_stages: [String],
        common_pests_diseases: String,
        toxicity: [String],
        difficulty_care_level: [String]
    }
});

const Plant = model('Plant', plantSchema);

module.exports = Plant;
