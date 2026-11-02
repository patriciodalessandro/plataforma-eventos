# Plataforma de Eventos Culturales

API REST desarrollada con Node.js, Express y MongoDB para una plataforma de eventos culturales, como recitales, talleres y exposiciones.

Proyecto desarrollado para el curso de Programación Backend II de Coderhouse.

## Objetivo

Construir progresivamente una API para gestionar usuarios, eventos culturales e inscripciones.

En esta etapa se implementa la consulta de eventos y el registro seguro de usuarios, utilizando una arquitectura por capas.

## Tecnologías

- Node.js
- JavaScript con módulos ESM
- Express
- MongoDB Atlas
- Mongoose
- bcrypt
- dotenv

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/patriciodalessandro/plataforma-eventos.git
   ```

2. Ingresar al proyecto:

   ```bash
   cd plataforma-eventos
   ```

3. Instalar las dependencias:

   ```bash
   npm install
   ```

4. Crear un archivo `.env` a partir de `.env.example` y configurar las variables necesarias:

   ```dotenv
   PORT=8080
   NODE_ENV=development
   MONGO_URL=mongodb+srv://USUARIO:CONTRASEÑA@CLUSTER.mongodb.net/plataforma_eventos
   ```

   Es necesario contar con un usuario de MongoDB Atlas y autorizar la IP de conexión.

5. Iniciar el servidor:

   ```bash
   npm start
   ```

   O, para desarrollo:

   ```bash
   npm run dev
   ```

## Variables de entorno

| Variable | Descripción |
|---|---|
| `PORT` | Puerto del servidor. Por defecto, 8080. |
| `NODE_ENV` | Entorno de ejecución. |
| `MONGO_URL` | Cadena de conexión a MongoDB Atlas. |
| `JWT_SECRET` | Reservada para futuras implementaciones de autenticación. |

El archivo `.env` está excluido del repositorio mediante `.gitignore`.

## Arquitectura

El proyecto utiliza la siguiente estructura por capas:

**Rutas → Controladores → Servicios → Repositorios → DAO → Modelos**

- **Rutas:** definen los endpoints.
- **Controladores:** reciben las solicitudes y generan respuestas HTTP.
- **Servicios:** contienen las validaciones y la lógica de negocio.
- **Repositorios:** conectan los servicios con la capa de acceso a datos.
- **DAO:** realiza las operaciones de consulta y persistencia mediante Mongoose.
- **Modelos:** definen los esquemas de MongoDB.

## Estructura del proyecto

```text
src/
├── app.js
├── server.js
├── config/
│   └── config.js
├── controllers/
│   ├── events.controller.js
│   └── sessions.controller.js
├── dao/
│   ├── events.dao.js
│   └── users.dao.js
├── middlewares/
├── models/
│   ├── Event.js
│   └── User.js
├── repositories/
│   ├── events.repository.js
│   └── users.repository.js
├── routes/
│   ├── events.routes.js
│   └── sessions.routes.js
├── services/
│   ├── events.service.js
│   └── sessions.service.js
└── utils/
    └── hash.js
```

## Endpoints

### GET /api/health

Comprueba que el servidor está funcionando.

**Respuesta HTTP 200:**

```json
{
  "status": "ok",
  "message": "Servidor activo"
}
```

### GET /api/events

Consulta los eventos almacenados en MongoDB.

**Respuesta HTTP 200 cuando no hay eventos:**

```json
{
  "status": "success",
  "payload": []
}
```

### GET /api/sessions

Endpoint inicial del módulo de sesiones.

**Respuesta HTTP 200:**

```json
{
  "status": "success",
  "message": "Módulo de sesiones en preparación"
}
```

### POST /api/sessions/register

Registra un nuevo usuario en MongoDB.

**Datos requeridos:**

```json
{
  "first_name": "Ana",
  "last_name": "Perez",
  "email": "ana@example.com",
  "password": "Prueba1234"
}
```

El registro realiza las siguientes operaciones:

- Verifica los campos obligatorios.
- Valida el formato del email.
- Exige una contraseña de al menos 8 caracteres.
- Normaliza el email a minúsculas.
- Comprueba que el email no esté registrado.
- Genera un hash de la contraseña mediante bcrypt.
- Guarda el usuario en MongoDB.
- Devuelve los datos públicos sin incluir la contraseña.

El rol asignado por defecto es `user`.

**Respuesta HTTP 201 — Registro exitoso:**

```json
{
  "status": "success",
  "payload": {
    "id": "ID_GENERADO_POR_MONGODB",
    "first_name": "Ana",
    "last_name": "Perez",
    "email": "ana@example.com",
    "role": "user"
  }
}
```

**Respuesta HTTP 400 — Campos faltantes:**

```json
{
  "status": "error",
  "message": "Faltan campos obligatorios"
}
```

**Respuesta HTTP 400 — Email inválido:**

```json
{
  "status": "error",
  "message": "Formato de email inválido"
}
```

**Respuesta HTTP 409 — Email duplicado:**

```json
{
  "status": "error",
  "message": "El email ya está registrado"
}
```

## Pruebas realizadas

Se verificaron los siguientes casos mediante solicitudes HTTP:

| Caso | Código esperado | Resultado |
|---|---|---|
| Registro correcto | 201 | Correcto |
| Email duplicado | 409 | Correcto |
| Campos obligatorios faltantes | 400 | Correcto |
| Email con formato inválido | 400 | Correcto |
| Consulta de eventos sin registros | 200 | Correcto |

También se comprobó en MongoDB Atlas que la contraseña se almacena como hash de bcrypt y que no se incluye en la respuesta del registro.

## Roles

El modelo de usuarios contempla tres roles:

- `user`: rol predeterminado.
- `organizer`: previsto para gestionar eventos.
- `admin`: previsto para administración general.

La autorización por roles todavía no está implementada.

## Estado del proyecto

**Segunda preentrega — Registro seguro de usuarios.**

Se implementaron la arquitectura por capas para la consulta de eventos, la conexión a MongoDB Atlas y el registro de usuarios con validaciones, control de emails duplicados y hash de contraseñas mediante bcrypt.

Quedan para futuras etapas el inicio de sesión, la autenticación, la autorización por roles y la gestión de inscripciones.