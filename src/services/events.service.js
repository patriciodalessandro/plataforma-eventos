import { getAllEvents } from "../repositories/events.repository.js";

export const getEventsService = async () => {
    const events = await getAllEvents();
    return events;
};