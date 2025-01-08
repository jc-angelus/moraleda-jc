
# Prueba Técnica Moraleda Backend - Johans Cuellar

El proyecto fue elaborado usando Node 23.1.0

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