class ProductManeger {
  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  addProduct( title = '', description = '', price = 0, thumbnail = '', code = 0, stock = '') {

    //id generado automáticamente SIN REPETIRSE
    let id=1
    const n = this.products.length;
    if(n>0){
      id=this.products[n-1].id +1
    }

    const product = {id, title, description, price, thumbnail, code, stock}

    const arr = [product]

    //Campos Obligatorios------
    for (const arrElement of arr) {
      for (const arrElementKey in arrElement) {
        if (arrElement[arrElementKey] === '' || arrElement[arrElementKey] === 0) {
          console.log(`componente <<${arrElementKey}>> no ingresado, completar componente`);
          console.log('--------------------------------------------------------------')
          return;
        }
      }
    }

    //error porque CODE estará repetido----
    let codeExiste = this.products.find(codeVal => codeVal.code === code );
    if (!codeExiste) {
      return this.products.push(product);
    } else {
      console.log(`'Producto <<code ${code}>> existente no admitido -> cambia code`);
      console.log('----------------------------------------------------------------')
    }
  }

  //metodo buscar ID
  getProductByID(id) {
    const byId = this.products.find(busId => busId.id === id)
    const found = byId === undefined ? "Not found" : [byId];
    console.log(found);
  }
}

// Instancia Objeto------------------------------------------------------------
const product = new ProductManeger();
//======retorno array [] vació===========
console.log(product.getProducts());
//======método “addProduct” con los campos===================================
product.addProduct( 'producto prueba0','Este es un producto prueba1',
    200, 'Sin Imagen', 'abc123', 20);

product.addProduct('producto prueba0','Este es un producto prueba2',
    200, 'Sin Imagen', 'abc124', 30);

product.addProduct('producto prueba2', 'Este es un producto prueba3',
    200, 'Sin Imagen', 'abc125', 40);

//arrojar un error porque el código estará repetido---------------
product.addProduct('producto prueba3', 'Este es un producto prueba4',
    200, 'Sin Imagen', 'abc124', 50);

//arrojar un error porque falta componente------------------------
product.addProduct( 'Este es un producto prueba4',
    200, 'Sin Imagen', 'abc126', 50);
//==========================================================================
console.log(product.getProducts()); //debe aparecer el producto recién agregado
//===========================================================================
product.getProductByID(2); //buscar arreglo con id conincidente
product.getProductByID(6); //id no coincide arroja error