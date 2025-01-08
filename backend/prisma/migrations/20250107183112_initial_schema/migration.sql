-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permissions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "Permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organizational_Units" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "project_id" INTEGER NOT NULL,

    CONSTRAINT "Organizational_Units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicles" (
    "id" SERIAL NOT NULL,
    "plate" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transfers" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "vehicle_id" INTEGER NOT NULL,
    "client_id" INTEGER NOT NULL,
    "transmitter_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,
    "organizational_unit_id" INTEGER NOT NULL,

    CONSTRAINT "Transfers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersProjects" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "projectId" INTEGER,

    CONSTRAINT "UsersProjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOrganizational_Units" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "organizational_unitId" INTEGER,

    CONSTRAINT "UsersOrganizational_Units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PermissionsRoles" (
    "id" SERIAL NOT NULL,
    "rolId" INTEGER,
    "permissionId" INTEGER,

    CONSTRAINT "PermissionsRoles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersRoles" (
    "id" SERIAL NOT NULL,
    "rolId" INTEGER,
    "userId" INTEGER,

    CONSTRAINT "UsersRoles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Roles_name_key" ON "Roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Permissions_name_key" ON "Permissions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Projects_name_key" ON "Projects"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Organizational_Units_name_key" ON "Organizational_Units"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Organizational_Units_project_id_key" ON "Organizational_Units"("project_id");

-- CreateIndex
CREATE UNIQUE INDEX "Transfers_vehicle_id_key" ON "Transfers"("vehicle_id");

-- CreateIndex
CREATE UNIQUE INDEX "Transfers_client_id_key" ON "Transfers"("client_id");

-- CreateIndex
CREATE UNIQUE INDEX "Transfers_transmitter_id_key" ON "Transfers"("transmitter_id");

-- CreateIndex
CREATE INDEX "UsersProjects_userId_projectId_idx" ON "UsersProjects"("userId", "projectId");

-- CreateIndex
CREATE INDEX "UsersOrganizational_Units_userId_organizational_unitId_idx" ON "UsersOrganizational_Units"("userId", "organizational_unitId");

-- CreateIndex
CREATE INDEX "PermissionsRoles_rolId_permissionId_idx" ON "PermissionsRoles"("rolId", "permissionId");

-- CreateIndex
CREATE INDEX "UsersRoles_rolId_userId_idx" ON "UsersRoles"("rolId", "userId");

-- AddForeignKey
ALTER TABLE "Organizational_Units" ADD CONSTRAINT "Organizational_Units_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfers" ADD CONSTRAINT "Transfers_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "Vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfers" ADD CONSTRAINT "Transfers_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfers" ADD CONSTRAINT "Transfers_transmitter_id_fkey" FOREIGN KEY ("transmitter_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersProjects" ADD CONSTRAINT "UsersProjects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersProjects" ADD CONSTRAINT "UsersProjects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOrganizational_Units" ADD CONSTRAINT "UsersOrganizational_Units_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOrganizational_Units" ADD CONSTRAINT "UsersOrganizational_Units_organizational_unitId_fkey" FOREIGN KEY ("organizational_unitId") REFERENCES "Organizational_Units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionsRoles" ADD CONSTRAINT "PermissionsRoles_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionsRoles" ADD CONSTRAINT "PermissionsRoles_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersRoles" ADD CONSTRAINT "UsersRoles_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersRoles" ADD CONSTRAINT "UsersRoles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
