//Importando fs
const {log} = require('console');
const fs = require('fs');

class ProductManeger {
    constructor(rutaArchivo) {
        this.path = rutaArchivo;
    }

    //lectura de los productos
    async getProducts() {
        if (fs.existsSync(this.path)) {
            return await JSON.parse(fs.readFileSync(this.path, {encoding: "utf-8"}));
        } else {
            return [];
        }
    }

    //adicionando productos
    async addProduct(title, description, price, thumbnail, code, stock) {

        let products = await this.getProducts();

        //Algun argumento faltante
        if (!(title && description && price && thumbnail && code && stock)) {
            console.log("ERROR: Faltan datos para agregar el producto");
            return;
        }

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
    async getProductByID(id) {
        const busquedaId = await this.getProducts();
        const result = busquedaId.find((busId) => busId.id === id)
        console.log(result === undefined ? `id: ${id} No. Producto no hallado ◑﹏◐` : result);
    }

    //modificando campo segun id 
    async updateProduct(id, cam) {
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
    async deleteProduct(id) {
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

module.exports = ProductManeger;



