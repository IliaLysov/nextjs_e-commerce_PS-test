import { Schema, model, Types, models } from "mongoose";

const PlantSchema = new Schema({
    name: {type: String, required: true},
    latinName: {
        type: String,
        require: true,
        validate: {
            validator: function (value: string) {
                const latinRegex = /^[a-zA-Z -]*$/
                return latinRegex.test(value)
            },
            message: (props: {value: string}) => `${props.value} is not a valid nickname. Only Latin characters are allowed.`
        },
    },
    description: {type: String},
    price: {type: Number},
    quantity: {type: Number},
    onSale: {type: Boolean, default: true},
    rootPacking: {type: String},
    packageType: {type: String},
    packageCount: {type: Number},
    seedlingHight: {type: Number},
    seedlingWidth: {type: Number},
    seedTrunkHeight: {type: Number},
    seedTrunkGirth: {type: Number},
    plantType: [{type: String}],
    leafType: {type: String},
    frostResistance: {type: Number},
    lightLevel: {type: String},
    crownShape: [{type: String}],
    floweringPeriod: [{type: String}],
    careFeature: [{type: String}],
    soil: [{type: String}],
    deseaseResistance: {type: String},
    permanentLeafColor: [{type: String}],
    autumnLeafColor: [{type: String}],
    flowerColor: [{type: String}],
    trunkColor: [{type: String}],
    plantHeight: {type: String},
    plantWidth: {type: String},
    plantTrunkHeight: {type: String},
    plantTrunkGirth: {type: String},
    created_at: {type: Types.ObjectId, ref: 'User'},
    companyId: {type: Types.ObjectId, ref: 'Organization'},
    companyInfo: {
        latinName: {type: String},
        logo: {type: String}
    },
    images: [{
        location: {type: String},
        key: {type: String},
    }]
}, { timestamps: true })

export default models.Plant || model('Plant', PlantSchema);