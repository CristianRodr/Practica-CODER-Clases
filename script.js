//Importando fs
const { log } = require('console');
const fs = require('fs');

class ProductManeger {
    constructor() {
        this.products = [];
    }

    getProducts() {
        return this.products;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        //id generando automáticamente SIN REPETIRSE
        let id = 1;
        const n = this.products.length;
        if (n > 0) {
            id = this.products[n - 1].id + 1;
        }

        //error porque CODE estará repetido----
        let codeExiste = this.products.find((codeVal) => codeVal.code === code);

        if (codeExiste) {
            console.log(`'Producto <<code ${code}>> existente, cambia code ╰（‵□′）╯`);
            return;
        }

        const product = {id, title, description, price, thumbnail, code, stock};

        const campo = Object.values(product);

        this.products.push(product);
    }

    //methods buscar ID
    getProductByID(id) {
        const byId = this.products.find((busId) => busId.id === id);
        const found = byId === undefined ?
            `id: ${id} No. Producto no hallado ◑﹏◐` : [byId];
        console.log(found);
    }

    updateProduct(id, cam) {
        const byId = this.products.find((busId) => busId.id === id);
        if ('id' !== cam) {
            byId[cam] = 'title modify';
        } else {
            console.log('ID no mutable (•_•)');
        }
    }

    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
        } else {
            console.log(`id: ${id} No valido, no eliminar... X_X `);
        }
    }
}

// Instancia Objeto------------------------------------------------------------
const product = new ProductManeger();
//======retorno array [] vació===========
//console.log(product.getProducts());
//======método “addProduct” con los campos===================================
product.addProduct(
    "producto prueba0",
    "Este es un producto prueba1",
    200,
    "Sin Imagen",
    "abc123",
    20
);

product.addProduct(
    "producto prueba1",
    "Este es un producto prueba2",
    200,
    "Sin Imagen",
    "abc124",
    30
);

product.addProduct(
    "producto prueba2",
    "Este es un producto prueba3",
    200,
    "Sin Imagen",
    "abc125",
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
    200,
    "Sin Imagen",
    "abc126",
    50
);
//======================Pruebas====================================
product.getProductByID(2); //buscar arreglo con id conincidente
product.getProductByID(6); //id no coincide arroja error
//------
product.updateProduct(1, 'id'); //error al tratar de actualizar ID
product.updateProduct(1, 'title');// actualization campo
//-----
product.deleteProduct(6); //id no hallado para borrar
product.deleteProduct(1); //eliminar product que tenga el id
//===================================================================
console.log('===========productos clase=============');
console.log(product.getProducts()); //debe aparecer el producto recién agregado
//===================================================================

//Persistencia en memoria
let rutaProductArchivo = "productManager.json";

//Convirtiendo array en Json
fs.writeFileSync(rutaProductArchivo, JSON.stringify(product.getProducts(), null, 2));

console.log('========lectura archivo, productos fs=========');
//Lectura, metodo inverso
let fsProductLeido = JSON.parse(fs.readFileSync(rutaProductArchivo));
console.log(fsProductLeido);

//Operaciones
console.log('=============operando con Objeto JSON devuelto ===================')
console.log(fsProductLeido.map(function(product) { 
    return product.title;
}));