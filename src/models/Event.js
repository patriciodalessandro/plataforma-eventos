import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum:["active", "cancelled", "completed"],
        default: "active"
    }
})

const eventModel = mongoose.model("Event", eventSchema);

export default eventModel;