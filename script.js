class ProductManeger {
  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  addProduct( title = '', description = '', price = 0, thumbnail = '', code = 0, stock = '') {

    let id=1
    const n = this.products.length;
    if(n>0){
      id=this.products[n-1].id +1
    }

    const product = {id, title, description, price, thumbnail, code, stock}


    let codeExiste = this.products.find(codeVal => codeVal.code === code );
    if (!codeExiste) {
      return this.products.push(product);
    } else {
      console.log(`'Producto con <<code ${code}>> existente no admitido -> cambia code`);
    }
  }

  getProductByID(id) {
    const byId = this.products.find(busId => busId.id === id)
    const found = byId === undefined ? "Not found" : [byId];
    console.log(found);
  }
}

// Instancia Objeto------------------------------------------------------------
const product = new ProductManeger();
//=============================================================================
product.addProduct( 'producto prueba0','Este es un producto prueba1',
    200, 'Sin Imagen', 'abc123', 20);
product.addProduct('producto prueba1', 'Este es un producto prueba2',
    200, 'Sin Imagen', 'abc124', 30);
product.addProduct('producto prueba2', 'Este es un producto prueba3',
    200, 'Sin Imagen', 'abc125', 40);
product.addProduct('producto prueba3', 'Este es un producto prueba4',
    200, 'Sin Imagen', 'abc124', 50);
//=============================================================================
console.log(product.getProducts());
//=============================================================================
product.getProductByID(2);
product.getProductByID(6);