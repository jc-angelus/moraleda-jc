
# Prueba Técnica Moraleda Backend - Johans Cuellar

El proyecto fue elaborado usando Node 23.1.0

Clonar el repositorio usando comando "git clone https://github.com/jc-angelus/moraleda-jc"

## 1. Pasos para instalar el proyecto

### 1.1 Paquetes NPM

Instalar los paquetes NPM para el proyecto

```sh
- Comando: npm install
```
### 1.2 Migración con las tablas

Crear las tablas y relaciones del prisma ORM

```sh
- Comando: npx prisma migrate dev --name "Initial Schema"
```

### 1.3 Ejecutar el seeder 

El seeder tiene los datos pre cargados (Roles, Projectos, etc)

```sh
- Comando: npm run seed
```

## 2. Autenticación de Usuario

Usuario Admin:

```sh
p1@correo.com
123456
```

## 3. Json de ejemplos para crear y modificar

Crear tranferencia:

```sh
{
  "type": "Tipo B",
  "vehicle_id": 2,
  "client_id": 2,
  "transmitter_id": 2,
  "project_id": 2,
  "organizational_unit_id": 1
}
```

Modificar tranferencia:

```sh
{
  "id": 1,	
  "type": "Tipo B",
  "vehicle_id": 2,
  "client_id": 2,
  "transmitter_id": 2,
  "project_id": 2,
  "organizational_unit_id": 1
}
```

## 4. Comandos de inicio de proyecto

The NPM commands below are already included with this template and can be used to quickly run, build and test your project.

```sh
npm run start
npm run dev
```

## 5. Descripción de Rutas y Funcionalidad

GET /transfers:

```sh
/api/v1/transfers

- Devuelve solo las transferencias asociadas al proyecto y unidades organizativas del usuario autenticado.
- Requiere:
    - Token de autenticación válido.
    - Acceso al proyecto.
    - Permisos para el módulo.
    - Pertenencia a la unidad organizativa.
```

POST/transfers:

```sh
/api/v1/transfers

- Crea una nueva transferencia.
- Requiere que el cliente envíe explícitamente el `projectId` y el `organizationalUnitId`.
- El backend valida que el usuario tiene acceso tanto al proyecto como a la unidad organizativa especificada.
```

PUT /transfers/:id:

```sh
/api/v1/transfers

- Permite editar transferencias existentes.
- Requiere que el cliente envíe explícitamente el `projectId` y el `organizationalUnitId`.
- El backend valida que el usuario tiene acceso tanto al proyecto como a la unidad organizativa especificada.

```

DELETE /transfers/:id:

```sh
/api/v1/transfers/{id}
- Permite eliminar una transferencia.
- Solo si el usuario tiene permisos y pertenece a la unidad organizativa de la transferencia.

```

## 5. Variables de entorno

Para las variables de entorno usar el archivo env.template como base para el env del proyecto