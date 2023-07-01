// empleado.model.ts

export interface Empleado {
    rut: string;
    dv: string;
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    direccion: string;
    mail: string;
    estatus: number;
    id_cargo: number;
    id_conjunto: number;
    id_comuna: number;
    id_region: number;
  }
  
  export interface Cargo {
    id_cargo: number;
    cargo: string;
  }
  
  export interface Comuna {
    id_comuna: number;
    nombre_comuna: string;
    id_region: number;
  }
  
  export interface Region {
    id_region: number;
    nombre_region: string;
  }
  