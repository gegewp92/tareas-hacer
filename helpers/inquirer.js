//const inquirer = require('inquirer');
import inquirer from 'inquirer';
import colors from 'colors';

const preguntas = [{
    type: 'list',
    name: 'opcion',
    message: '¿Que desea hacer?',
    choices: [ // choices: ['1. Crear tarea', 'opt2', 'opt3']
        {
            value: '1',
            name: `${'1.'.green} Crear tarea`
        },
        {
            value: '2',
            name: `${'2.'.green} Listar tareas`
        },
        {
            value: '3',
            name: `${'3.'.green} Listar tareas completadas`
        },
        {
            value: '4',
            name: `${'4.'.green} Listar tareas pendientes`
        },
        {
            value: '5',
            name: `${'5.'.green} Completar tarea(s)`
        },
        {
            value: '6',
            name: `${'6.'.green} Borrar tarea(s)`
        },
        {
            value: '0',
            name: `${'0.'.green} Salir`
        }
    ]

}];


const inquirerMenu = async() => {

    console.clear();
    console.log("========================".green);
    console.log("  Seleccione una opcion".white);
    console.log("========================\n".green);

    const { opcion } = await inquirer.prompt(preguntas); //esto regresa un string -->  { opt: { opcion: '1. Crear tarea' } }  -- para devolver un valor ver la doc y usar value
    //{ opcion } destructurar solo para que devuelva el value que me interesa
    return opcion;

}

const pausa = async() => {

    const questions = [{
        type: 'input',
        name: 'enter',
        message: `\nPresione ${ "ENTER".green } para continuar..`
    }];

    console.log('\n');

    await inquirer.prompt(questions);

}

const leerInput = async(message) => {

    const question = [

        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0)
                    return 'Por favor ingrese un valor';

                return true;
            }
        }
    ]

    const { desc } = await inquirer.prompt(question); // esto devuelve un objeto pero al destructurar puedo devolver lo que me interesa

    return desc;

}


const listadoTareasBorrar = async(tareas = []) => {

    const choices = tareas.map((tarea, i) => { //map()  ---> metodo que devuelve un nuevo array con cada elemento separado para ser manipulado como sea.

        const index = `${i + 1}.`.green;

        return {
            value: tarea.id, // Solo me interesa el id
            name: `${ index } ${tarea.desc}`
        }    

    });

    choices.unshift(    //unshift --> agrega un nuevo elemento al ppio a mi array
        {
            value: '0',
            name: `${'0.'.green} Cancelar`
        }
    )

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);

    return id;

    /**
     * {
            value: tarea.id,
            name: `${'1.'.green} tarea.desc`
        }
     * 
     */
}

const confirmarBorrar = async() => {

    const question = [
        {
            type: 'confirm', //el tipo confirm devuelve un boolean
            name: 'ok',
            message: '¿Esta seguro?'
        }
    ]

    const { ok } = await inquirer.prompt(question);

    return ok;
}


const mostrarListadoChecklist = async(tareas = []) => {

    const choices = tareas.map((tarea, i) => { //map()  ---> metodo que devuelve un nuevo array con cada elemento separado para ser manipulado como sea.

        const index = `${i + 1}.`.green;

        return {
            value: tarea.id, // Solo me interesa el id
            name: `${ index } ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false // muestra como chequeado la tarea
        }    

    });

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones: ',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(preguntas);

    return ids;

    /**
     * {
            value: tarea.id,
            name: `${'1.'.green} tarea.desc`
        }
     * 
     */
}


export { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmarBorrar, mostrarListadoChecklist };