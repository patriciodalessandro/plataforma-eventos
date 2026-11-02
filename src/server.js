import mongoose from "mongoose";
import app from "./app.js";
import { config } from "./config/config.js";

const startServer = async () => {
    try {
        if (!config.MONGO_URL) {
            throw new Error("Falta configurar MONGO_URL");
        }

        await mongoose.connect(config.MONGO_URL);
        console.log("MongoDB conectado correctamente");

        app.listen(config.PORT, () => {
            console.log(`Servidor escuchando en el puerto ${config.PORT}`);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor:", error.message);
        process.exit(1);
    }
};

startServer();