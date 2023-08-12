import { Schema, model, Types, models } from "mongoose";


const CompanySchema = new Schema({
    name: {
        type: String,
        required: true,
        description: "Native company name"
    },
    latinName: {
        type: String,
        required: true,
        match: /^[A-Za-z\- ]*$/,
        description: "Company name in latin characters"
    },
    description: {
        type: String,
        description: "Company description"
    },
    email: {
        type: String,
        required: true,
        description: "Company email"
    },
    site: {
        type: String,
        description: "Company website"
    },
    whatsApp: {
        type: Number,
        description: "WhatsApp number"
    },
    telegram: {
        type: String,
        description: "Telegram username"
    },
    activationLink: {
        type: String,
        description: "Activation link for company"
    },
    approved: {
        type: Boolean,
        default: false,
        description: "Company approval status"
    },
    logo: {
        location: {
            type: String,
            description: "Logo image location"
        },
        key: {
            type: String,
            description: "Logo image key"
        }
    },
    authorId: {
        type: Types.ObjectId,
        ref: 'Users',
        required: true,
        description: "Author's ObjectId"
    },
    editorsId: [{
        type: Types.ObjectId,
        ref: 'Users',
        description: "Array of editor ObjectIds"
    }]
});

export default models.Company || model('Company', CompanySchema);
