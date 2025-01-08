import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';

/*
Developer: Johans Cuellar
Created: 01/07/2025
*/

const prisma = new PrismaClient();

async function main() {
    
    const bcpass = bcryptjs.hashSync('123456', 10);
    
    await prisma.usersRoles.deleteMany();
    await prisma.usersOrganizational_Units.deleteMany();
    await prisma.transfers.deleteMany();
    await prisma.vehicles.deleteMany();
    await prisma.organizational_Units.deleteMany();    
    await prisma.projects.deleteMany();
    await prisma.permissionsRoles.deleteMany();
    await prisma.permissions.deleteMany();
    await prisma.users.deleteMany();
    await prisma.roles.deleteMany();    
    
    await prisma.users.createMany({
        data: [
          { 
              username: 'admin',
              email: 'p1@correo.com',
              password_hash: bcpass                
          },
          { 
              username: 'user',
              email: 'p2@correo.com',
              password_hash: bcpass                
          },
        ],
    });    

    await prisma.roles.createMany({
      data: [
          { 
              name: 'Admin',
              descripcion: 'Rol Admistrador',
          },
          { 
            name: 'User',
            descripcion: 'Rol usuario',                          
        },
      ],
    });

    await prisma.permissions.createMany({
      data: [
          { 
              name: 'Create_Transfers',
              descripcion: 'Permiso de crear',
          },
          { 
            name: 'View_Transfers',
            descripcion: 'Permiso de leer',                          
          },
          { 
            name: 'Update_Transfers',
            descripcion: 'Permiso de modificar',                          
          },
          { 
            name: 'Delete_Transfers',
            descripcion: 'Permiso de eliminar',                          
          }
      ],
    }); 
    

  await prisma.permissionsRoles.createMany({
    data: [
        { 
          rolId: 1, 
          permissionId: 1
        },
        { 
          rolId: 1, 
          permissionId: 2
        },
        { 
          rolId: 1, 
          permissionId: 3
        },
        { 
          rolId: 1, 
          permissionId: 4
        },
        { 
          rolId: 2, 
          permissionId: 1
        }        
    ],
  });

  await prisma.projects.createMany({
    data: [
        { 
          name: "Proyecto A",
          descripcion: "Proyecto A de Transferencias",                                                
        },
        { 
          name: "Proyecto B",
          descripcion: "Proyecto B de Transferencias"                                           
        }        
    ],
  });      

  await prisma.organizational_Units.createMany({
    data: [
        { 
          name: "Unidad Organizativa A",
          project_id: 1
        },
        { 
          name: "Unidad Organizativa B",
          project_id: 2
        }
                
    ],
  });      

  await prisma.vehicles.createMany({
    data: [
        { 
          plate: "ABCD",
          service: "Servicio A"
        },
        { 
          plate: "EFGH",
          service: "Servicio B"
        }                
    ],
  });      


  await prisma.transfers.createMany({
    data: [
        { 
          type: "Tipo A",
          vehicle_id: 1,
          client_id: 1,
          transmitter_id: 1,
          organizational_unit_id : 1,
          project_id: 1
        }        
    ],
  }); 

  await prisma.usersRoles.createMany({
    data: [
        { 
          rolId: 1, 
          userId: 1    
        },
        { 
          rolId: 2, 
          userId: 2
        }
    ],
  });    

  await prisma.usersProjects.createMany({
    data: [
        { 
          projectId: 1,
          userId: 1
        },
        { 
          projectId: 1,
          userId: 2
        }        
    ],
  }); 

  await prisma.usersOrganizational_Units.createMany({
    data: [
        { 
          organizational_unitId: 1,
          userId: 1
        },
        { 
          organizational_unitId: 2,
          userId: 1
        },
        { 
          organizational_unitId: 1,
          userId: 2
        }       
    ],
  }); 

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {    
    await prisma.$disconnect();
  });
