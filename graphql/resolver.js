
const { Product } = require("../models/product");

const getAllProductos = async () => {
    let sortedProducts;
    try {
        sortedProducts = await Product.find({});
    } catch (error) {
        // productos.push({ error: "Mensaje de Error" });
    }
    return sortedProducts;
};


const getNombreProducto = async (prodName) => {
    let sortedProducts;
    try {
        sortedProducts = await Product.findOne({nombre: prodName});
    } catch (error) {
        // productos.push({ error: "Mensaje de Error" });
    }
    return sortedProducts;
};





// const updateProductosStock = async (prodName, newStock) => {
//     let sortedProducts;
//     try {
//         const filter = { name: prodName };
//         const updateDoc = { $set: {stock: newStock} };

//         sortedProducts = await Product.updateOne(filter, updateDoc);

//     } catch (error) {
//         // productos.push({ error: "Mensaje de Error" });
//     }
//     return sortedProducts;
// };




module.exports = {
    getAllProductos,
    getNombreProducto,
    // updateProductosStock,
};

// const MutationType = new GraphQLObjectType({
//     name: 'Mutation',
//     fields: {
//         actualizarProducto: {
//         type: ProductoType,
//         args: {
//             id: { type: GraphQLInt },
//             nombre: { type: GraphQLString },
//             descripcion: { type: GraphQLString }
//         },
//         resolve: (parent, args) => {
//           // Lógica para actualizar un producto en una base de datos u otra fuente de datos.
//           // En este ejemplo, se supone que hay una matriz de objetos que representan productos.
//             const index = productos.findIndex(producto => producto.id === args.id);
//             if (index !== -1) {
//             const productoActualizado = {
//                 ...productos[index],
//                 nombre: args.nombre || productos[index].nombre,
//                 descripcion: args.descripcion || productos[index].descripcion
//             };
//             productos[index] = productoActualizado;
//             return productoActualizado;
//             }
//             return null;
//         }
//         }
//     }
//     });

//     const schema = new GraphQLSchema({
//     query: RootQuery,
//     mutation: MutationType
//   });
  
//   module.exports = schema;