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

        //Algun argumento faltante
        if (!(title && description && price && thumbnail && code && stock)) {
            console.log("ERROR: Faltan datos para agregar el producto");
            return;
        }

        let products = this.getProducts();

        //error porque CODE estará repetido----
        let codeExiste = products.find((codeValidator) => codeValidator.code === code);
        if (codeExiste) {
            console.log(`'Producto <<${code}>> existente, cambia code`);
            return;
        }

        //id generando automáticamente SIN REPETIRSE
        let id = 1
        if (products.length > 0) {
            id = Math.max(...products.map(p => p.id)) + 1;
        }

        products.push({id, title, description, price, thumbnail, code, stock});

        //Convirtiendo array en. Json
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

            return fs.writeFile('productM.json', JSON.stringify(arregloObjetos, null, 2),
                (err) => {
                if (err) {
                    console.error('Error al escribir el archivo:', err);
                } else {
                    console.log('Archivo actualizado correctamente.');
                }
            })
        })
    }

    //eliminando segun id
    deleteProduct(id) {
        fs.readFile('productM.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error al leer el archivo', + err);
            }
            const arregloObjetos = JSON.parse(data);
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
    }
}



//-------------------------Instance Objeto----------------
const product = new ProductManeger("./productM.json");

//======método “addProduct” con los campos, adicionando===================================
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

//arrojar un error porque falta componente------------------------
product.addProduct(
    "producto prueba2",
    "Este es un producto prueba3",
    200,
    "abc123",
    40
);


product.addProduct(
    "producto prueba3",
    "Este es un producto prueba4",
    200,
    "Sin Imagen",
    "abc124",
    50
);

//arrojar un error porque el código estará repetido---------------
product.addProduct(
    "producto prueba5",
    "Este es un producto prueba5",
    200,
    "Sin Imagen",
    "abc124",
    50
);

//==================Pruebas llamando a la funcion============
//console.log('---------------buscando por id----------------
//product.getProductByID(2); //buscar arreglo con id conincidente
//product.getProductByID(6); //id no coincide arroja error
//------------------------modificando id---------------------
//product.updateProduct(1, 'id'); //error al tratar de actualizar ID
//product.updateProduct(2, 'title');// actualization campo
//------------------------borrando id------------------------
//product.deleteProduct(6); //id no hallado para borrar
//product.deleteProduct(3); //eliminar product que tenga el id
//===========================================================
console.log('===============productos clase===============');
console.log(product.getProducts());
//==========================================================

