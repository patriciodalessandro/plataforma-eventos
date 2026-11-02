import { getAllEventsDAO } from "../dao/events.dao.js";

export const getAllEvents = async () => {
    return await getAllEventsDAO();
};