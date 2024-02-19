//Importando fs
const {log} = require('console');
const fs = require('fs');

class ProductManeger {
    constructor(rutaArchivo) {
        this.path = rutaArchivo;
    }

    //lectura de los productos
    getProducts() {
        if (fs.existsSync(this.path)) {
            return JSON.parse(fs.readFileSync(this.path, {encoding: "utf-8"}));
        } else {
            return [];
        }
    }

    //adicionando productos
    addProduct(title, description, price, thumbnail, code, stock) {
        let products = this.getProducts();

        let codeExiste = products.find((codeValidator) => codeValidator.code === code);
        if (codeExiste) {
            console.log(`'Producto <<${code}>> existente, cambia code`);
            return;
        }

        //error porque CODE estará repetido----

        //id generando automáticamente SIN REPETIRSE
        let id = 1
        if (products.length > 0) {
            id = Math.max(...products.map(p => p.id)) + 1;
        }

        products.push({id, title, description, price, thumbnail, code, stock});

        //Convirtiendo array en Json
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    }

    //methods buscar ID
    getProductByID(id) {
        const byId = this.getProducts().find((busId) => busId.id === id);
        const found = byId === undefined ?
            `id: ${id} No. Producto no hallado ◑﹏◐` : [byId];
        console.log(found);
    }

    //modificando campo segun id 
    updateProduct(id, cam) {
        fs.readFile('productM.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error al leer el archivo', + err);
            }
            const arregloObjetos = JSON.parse(data);

            const objetoModificar = arregloObjetos.find(objeto => objeto.id === id);
            if ('id' !== cam) {
                objetoModificar[cam] = 'titulo modificado';
            } else {
                console.error('Error al leer el archivo', + err)
            }

            fs.writeFile('productM.json', JSON.stringify(arregloObjetos, null, 2),
                (err) => {
                if (err) {
                    console.error('Error al escribir el archivo:', err);
                } else {
                    console.log('Archivo actualizado correctamente.');
                }
            })
        })

        /*const byId = this.getProducts().find((busId) => busId.id === id);
        if ('id' !== cam) {
            byId[cam] = 'titulo modificado'; //para modificar
            fs.writeFileSync(this.path, JSON.stringify(this.getProducts(), null, 2));
        } else {
            console.log(`id: ${id} no mutable (•_•)`);
        }*/
    }

    //eliminando segun id
    deleteProduct(id) {
        fs.readFile('productM.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error al leer el archivo', + err);
            }
            let arregloObjetos = JSON.parse(data);
            //---------
            const objetoEliminar = arregloObjetos.findIndex(objeto => objeto.id === id);
            if (objetoEliminar !== -1) {
                arregloObjetos.splice(objetoEliminar, 1);
            } else {
                console.log(`id: ${id} No valido, no eliminar... X_X `);
            }
            //---------
            fs.writeFile('productM.json', JSON.stringify(arregloObjetos, null, 2),
                (err) => {
                    if (err) {
                        console.error('Error al escribir el archivo:', err);
                    } else {
                        console.log('Archivo eliminado correctamente.');
                    }
                })
        })

        /*
        const index = this.getProducts().findIndex(product => product.id === id);
        if (index !== -1) {
            this.getProducts().splice(index, 1);
        } else {
            console.log(`id: ${id} No valido, no eliminar... X_X `);
        }
        */
    }
}


// Instanciando Objeto----------------
const product = new ProductManeger("./productM.json");

product.addProduct(
    "producto prueba0",
    "Este es un producto prueba1",
    200,
    "Sin Imagen",
    "abc121",
    20
);

product.addProduct(
    "producto prueba1",
    "Este es un producto prueba2",
    200,
    "Sin Imagen",
    "abc122",
    30
);

product.addProduct(
    "producto prueba2",
    "Este es un producto prueba3",
    200,
    "Sin Imagen",
    "abc123",
    40
);

//arrojar un error porque el código estará repetido---------------
product.addProduct(
    "producto prueba3",
    "Este es un producto prueba4",
    200,
    "Sin Imagen",
    "abc124",
    50
);

//arrojar un error porque falta componente------------------------
product.addProduct(
    "producto prueba5",
    "Este es un producto prueba5",
    200,
    "Sin Imagen",
    "abc124",
    50
);


//====================================

//======método “addProduct” con los campos, adicionando===================================
console.log('===========productos clase=============');
console.log(product.getProducts()); //debe aparecer el producto recién agregado
//==================Pruebas llamando a la funcion============
//console.log('---------------buscando por id-------------------')
//product.getProductByID(2); //buscar arreglo con id conincidente
//product.getProductByID(6); //id no coincide arroja error
console.log('----------------modificando id---------------------')
//product.updateProduct(1, 'id'); //error al tratar de actualizar ID
product.updateProduct(3, 'title');// actualization campo
//------------------------------------------------------------
//product.deleteProduct(6); //id no hallado para borrar
//product.deleteProduct(4); //eliminar product que tenga el id
//==========================================================

//==========================================================
/*
//!Persistencia en memoria =================================


//Convirtiendo array en Json
fs.writeFileSync(rutaProductArchivo, JSON.stringify(product.getProducts(), null, 2));

console.log('========lectura archivo, productos fs=========');
//Lectura, metodo inverso del archivo productManager.json
let fsProductLeido = JSON.parse(fs.readFileSync(rutaProductArchivo));
//console.log(fsProductLeido);

//Operaciones con el JSON parse
/!*
console.log('========operando con Objeto JSON devuelto ========')
console.log(fsProductLeido.map(function(product) {
    return product.title;
}));*!/
*/
