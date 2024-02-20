const ProductManeger = require('../src/script');
const asyncConverse = async () => {
    const product = new ProductManeger("./productM.json");

    await product.addProduct("Aderezo", "producto prueba1", 10, "Imagen1", "abc121", 20);
    await product.addProduct("Consome", "producto prueba2", 15, "Imagen2", "abc122", 30);
    //!arrojar un error porque falta componente
    await product.addProduct("Crema para café", "producto prueba3", 13, "abc123", 40);
    await product.addProduct("Pure de tomate", "producto prueba4", 12, "Imagen3", "abc124", 40);
    //!arrojar un error porque el código estará repetido
    await product.addProduct("Alimento para bebe", "producto prueba5", 20, "Imagen4", "abc124", 10);

    await product.addProduct("Atole", "producto prueba5", 11, "Imagen5", "abc125", 10);
    await product.addProduct("Avena", "producto prueba6", 11, "Imagen6", "abc126", 15);
    await product.addProduct("Azúcar", "producto prueba7", 16, "Imagen7", "abc127", 34);
    await product.addProduct("Café", "producto prueba8", 12, "Imagen8", "abc128", 33);
    await product.addProduct("Cereales", "producto prueba9", 14, "Imagen9", "abc129", 23);
    await product.addProduct("Harina", "producto prueba10", 12, "Imagen10", "abc130", 25);
    await product.addProduct("Mole", "producto prueba11", 16, "Imagen11", "abc131", 18);
    await product.addProduct("Sal", "producto prueba12", 11, "Imagen12", "abc132", 10);
    await product.addProduct("Mayonesa", "producto prueba13", 13, "Imagen13", "abc133", 11);
    await product.addProduct("Leche condensada", "producto prueba14", 13, "Imagen14", "abc134", 36);
    await product.addProduct("Leche en polvo", "producto prueba15", 13, "Imagen15", "abc135", 78);
    await product.addProduct("Margarina", "producto prueba16", 14, "Imagen16", "abc136", 50);
    await product.addProduct("Pan dulce", "producto prueba17", 16, "Imagen17", "abc137", 29);
    await product.addProduct("Papas", "producto prueba18", 15, "Imagen18", "abc138", 56);
    await product.addProduct("Shampoo para ropa", "producto prueba19", 17, "Imagen19", "abc139", 31);
    await product.addProduct("Cerillos", "producto prueba20", 5, "Imagen20", "abc140", 31);
    await product.addProduct("Cloro para ropa", "producto prueba21", 10, "Imagen21", "abc141", 30);

    //?---------------buscando por id-------------
    //await product.getProductByID(2);
    //await product.updateProduct(1, 'id'); //error al tratar de actualizar ID
    //?---------------borrando id-----------------
    //await product.deleteProduct(3);
    //await product.deleteProduct(6); //id no hallado para borrar
    //?--------------modificando x id-------------
    //await product.updateProduct(2, 'title');
    //await product.updateProduct(1, 'id'); //error al tratar de actualizar ID

    console.log(await product.getProducts());
}

asyncConverse();

