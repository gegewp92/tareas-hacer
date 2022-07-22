// const { v4: uuidv4 } = require('uuid'); // renombrar la funcion v4 --> uuidv4
import { v4 as uuidv4 } from 'uuid';

class Tarea {

    id = '';
    desc = '';
    completadoEn = null;

    constructor(desc) {

        this.id = uuidv4(); // uuidv4() devuelve un identificador a nivel global. ver doc
        this.desc = desc;
        this.completadoEn = null;

    }
}


export { Tarea };
//module.exports = Tarea;





/**
 * 
 * Presione ENTER para continuar..
Tarea {
  id: 'de034f4b-44fa-4456-bf79-83aa07b33149',
  desc: 'La concha de tu hermana all boys ',
  completadoEn: null
}

 */