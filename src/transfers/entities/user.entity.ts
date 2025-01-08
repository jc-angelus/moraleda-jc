import { Role } from './role.entity';
import { Project } from './project.entity';
import { Organizational_Units } from './organizational_units.entity';

/*
Developer: Johans Cuellar
Created: 01/07/2025
*/

export class User {        
    id: number;    
    email: string;        
    role: Role[];       
    projects: Project[]; 
    organizational_units: Organizational_Units[];
}