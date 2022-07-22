//require('colors');
//const { mostrarMenu, pausa } = require('./helpers/mensajes');
//const { inquirerMenu } = require('./helpers/inquirer');
import colors from 'colors';
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import { inquirerMenu, leerInput, pausa, listadoTareasBorrar, confirmarBorrar, mostrarListadoChecklist } from './helpers/inquirer.js';

import { Tareas } from './models/tareas.js';
//import { Tarea } from './models/tarea.js';
//const Tarea = require('./models/tarea');



console.clear();


const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        //Cargar tareas si existen para poder listar con la opcion 2
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        //opt = await mostrarMenu(); ---> mensajes.js
        //if (opt !== '0') await pausa(); --> mensajes.js
        opt = await inquirerMenu();
        //console.log({ opt }); // esto regresa un string -->  { opt: '0' }

        switch (opt) {

            //Crear tarea
            case '1':
                //tareas.crearTarea();
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
                break;

            case '2':
                //Listar tareas
                tareas.listadoCompleto();
                //console.log(tareas.listadoArr);
                break;

            case '3':
                //Listar tareas completadas
                tareas.listarPendientesCompletadas(true);
                break;

            case '4':
                //Listar tareas pendientes
                tareas.listarPendientesCompletadas(false);
                break;

            case '5':
                //Listar tareas pendientes
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletada(ids);
                //console.log(ids);
                break;

            case '6':
                //Borrar tareas
                const id = await listadoTareasBorrar(tareas.listadoArr);

                if( id !== '0'){
                    const estado = await confirmarBorrar(); // devuelve un boolean
                    if( estado )
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada.');
                }

                //console.log({ id });
                break;
        }

        guardarDB(tareas.listadoArr);

        //const tareas = new Tareas();
        //const tarea = new Tarea("La concha de tu hermana all boys ");
        //console.log(tareas);

        await pausa();

    } while (opt !== '0');

}

main();