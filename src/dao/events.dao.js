import Event from "../models/Event.js";

export const getAllEventsDAO = async () => {
    return await Event.find();
};