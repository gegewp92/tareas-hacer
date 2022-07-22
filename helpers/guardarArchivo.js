//const fs = require('fs');

//Se podria renombrar el file para que sea por ej: utilidadesArchivo.js , tareasArchivo.js ..
import fs from 'fs';

const dataPath = './db/data.json';

const guardarDB = (data) => {

    fs.writeFileSync(dataPath, JSON.stringify(data));

}


const leerDB = () => {

    // verifico que exista el archivo que quiero leer
    if (!fs.existsSync(dataPath))
        return 'No existe el file';

    const info = fs.readFileSync(dataPath, { encoding: 'utf-8' }); // el segundo argumento es el encoding porque si no lo devolveria en bytes.
    const data = JSON.parse(info); //info devuelve un string. Para que devuelva un objeto hay que desearealizar o parsear (proceso opueso al stringify() )

    return data;

    /**
     *  console.log(data);
     *  data = 
     * 
     * [
        {
            id: 'a65b1edc-f989-46bb-ab35-8dc466343744',
            desc: 'Recolectar las piedras del infinito',
            completadoEn: null
        }
       ]

     * 
     */
}

export { guardarDB, leerDB };