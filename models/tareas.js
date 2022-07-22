/**
 *  _listado:
 * 
 *   { 'uuid-13412-412342-2: { id:12, desc:'asda', completadoEn } }
 * 
 */

import { Tarea } from './tarea.js';

class Tareas {

    _listado = {};

    constructor() {

        this._listado = {};
    }

    // Manejo mi _listado de objetos dentro de un array
    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    crearTarea(desc = '') {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea; // lo estamos manejando como un objeto no como un array (Si fuera un array tendriamos que manejarlo con push para agregar elementos al vector)
    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });

    }

    listadoCompleto() {

        //console.log(this._listado);
        //console.log(this.listadoArr);
        // 1: en verde
        // Completada: en verde
        // Pendiente: en rojo  

        // 1. Alma :: Completada | Pendiente

        console.log();
        this.listadoArr.forEach((tarea, index) => {

            index = `${1 + index}`.green;
            const { desc, completadoEn } = tarea; //desestructuracion
            //console.log(completadoEn); --> null
            const estado = (completadoEn) ?
                'Completada'.green :
                'Pendiente'.red;

            console.log(`${index} ${ desc } :: ${estado}`);

        });
    }


    listarPendientesCompletadas(completada = true) {

        console.log();
        let cont = 0;
        this.listadoArr.forEach((tarea) => {

            const { desc, completadoEn } = tarea; //desestructuracion
            //console.log(completadoEn); --> null
            const estado = (completadoEn) ?
                'Completada'.green :
                'Pendiente'.red;

            if (completada) {
                if (completadoEn) {
                    cont += 1;
                    console.log(`${(cont + '.').green} ${ desc } :: ${completadoEn.green}`);
                }
            } else {
                if (!completadoEn) {
                    cont += 1;
                    console.log(`${(cont + '.').green} ${ desc } :: ${estado}`);
                }

            }

        });

    }

    // Para borrar deberia recibir el id de la tarea que quiero borrar
    borrarTarea(id = '') {

        //verifico que exista la tarea que quiero borrar
        if (this._listado[id])
            delete this._listado[id];

    }


    //creo un metodo que reciba mi array de tareas( mostrarListadoChecklist() ) y hacer el procedimiento para establecer si estan completados o no
    toggleCompletada( ids = [] ){

        ids.forEach( id => {

            const tarea = this._listado[id];

            if( !tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        })

        this.listadoArr.forEach( tarea => {

            if( !ids.includes(tarea.id)){
                const tareaa = this._listado[tarea.id];
                tareaa.completadoEn = null;
            }
        })

    }
}

export { Tareas };