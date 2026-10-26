# Plataforma de Eventos Culturales

API REST desarrollada con Node.js y Express para una plataforma de eventos culturales, como recitales, talleres, exposiciones y actividades recreativas.

El proyecto forma parte del curso de Programación Backend II de Coderhouse.

## Objetivo

Construir progresivamente una API que permita gestionar usuarios, eventos culturales e inscripciones.

En futuras etapas se incorporarán autenticación, autorización, roles de usuario, conexión a MongoDB y reglas de negocio.

## Tecnologías

- Node.js
- JavaScript con módulos ESM
- Express
- Mongoose
- dotenv

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone URL_DEL_REPOSITORIO
   ```

2. Ingresar a la carpeta del proyecto:

   ```bash
   cd plataforma-eventos
   ```

3. Instalar las dependencias:

   ```bash
   npm install
   ```

4. Crear un archivo `.env` tomando como referencia `.env.example`.

5. Iniciar el servidor:

   ```bash
   npm start
   ```

   Para ejecutarlo en modo desarrollo, con reinicio automático:

   ```bash
   npm run dev
   ```

## Variables de entorno

| Variable | Descripción |
|---|---|
| `PORT` | Puerto en el que se ejecuta el servidor. |
| `NODE_ENV` | Entorno de ejecución, por ejemplo `development`. |
| `MONGO_URL` | Cadena de conexión a MongoDB, para futuras etapas. |
| `JWT_SECRET` | Clave para firmar tokens JWT, para futuras etapas. |

El archivo `.env` no se incluye en el repositorio para evitar exponer información sensible.

## Estructura del proyecto

```text
src/
├── app.js
├── server.js
├── config/
├── controllers/
│   ├── events.controller.js
│   └── sessions.controller.js
├── dao/
├── middlewares/
├── models/
│   ├── User.js
│   └── Event.js
├── repositories/
├── routes/
│   ├── events.routes.js
│   └── sessions.routes.js
├── services/
└── utils/
```

`app.js` configura Express y registra las rutas. `server.js` inicia el servidor utilizando el puerto configurado.

Las carpetas de servicios, repositorios y DAO están preparadas para incorporar progresivamente una arquitectura por capas.

## Endpoints disponibles

### GET /api/health

Comprueba que el servidor está activo.

**Respuesta HTTP 200:**

```json
{
  "status": "ok",
  "message": "Servidor activo"
}
```

### GET /api/events

Devuelve el listado inicial de eventos. Por ahora no hay registros cargados.

**Respuesta HTTP 200:**

```json
{
  "status": "success",
  "payload": []
}
```

### GET /api/sessions

Endpoint inicial del módulo de sesiones. Todavía no implementa autenticación.

**Respuesta HTTP 200:**

```json
{
  "status": "success",
  "message": "Módulo de sesiones en preparación"
}
```

## Roles previstos

El proyecto contempla tres roles para futuras etapas:

- **admin:** administración general de la plataforma.
- **organizer:** creación y gestión de eventos.
- **user:** consulta de eventos e inscripciones.

Los permisos y la autenticación todavía no están implementados.

## Estado del proyecto

**Pre-entrega 1 — Estructura arquitectónica inicial.**

Actualmente están implementados el servidor Express, la configuración por variables de entorno, las rutas iniciales y los modelos base de usuarios y eventos.

La conexión a MongoDB, la persistencia de datos, las inscripciones y la autenticación se incorporarán en próximas etapas.