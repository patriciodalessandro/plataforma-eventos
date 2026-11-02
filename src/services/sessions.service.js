import { getUserByEmail, saveUser } from "../repositories/users.repository.js";
import { createHash } from "../utils/hash.js";

export const registerUser = async (userData) => {
    const { first_name, last_name, email, password } = userData;

    // Validar campos obligatorios
    if (!first_name || !last_name || !email || !password) {
        const error = new Error("Faltan campos obligatorios");
        error.status = 400;
        throw error;
    }

    // Validar que los campos sean textos y no estén vacíos
    if ([first_name, last_name, email, password].some(
        value => typeof value !== "string" || !value.trim()
    )) {
        const error = new Error("Los campos deben contener texto válido");
        error.status = 400;
        throw error;
    }

    // Normalizar y validar el email
    const normalizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
        const error = new Error("Formato de email inválido");
        error.status = 400;
        throw error;
    }

    // Validar longitud de contraseña
    if (password.length < 8) {
        const error = new Error("La contraseña debe tener al menos 8 caracteres");
        error.status = 400;
        throw error;
    }

    // Comprobar si el email ya existe
    const existingUser = await getUserByEmail(normalizedEmail);

    if (existingUser) {
        const error = new Error("El email ya está registrado");
        error.status = 409;
        throw error;
    }

    // Generar hash y guardar el usuario
    const hashedPassword = await createHash(password);

    const newUser = await saveUser({
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        email: normalizedEmail,
        password: hashedPassword
    });

    // Devolver únicamente los datos públicos
    return {
        id: newUser._id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        role: newUser.role
    };
};