
const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLSchema, GraphQLScalarType } = require('graphql');
const { getAllProductos, getNombreProducto } = require('./resolver.js');

const ProductoType = new GraphQLObjectType({
    name: 'Producto',
    fields: () => ({
        nombre: { type: GraphQLString },
        descripcion: { type: GraphQLString },
        precio: { type: GraphQLFloat },
        foto: { type: GraphQLString},
        stock: { type: GraphQLInt}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getProductos: {
            type: new GraphQLList(ProductoType),
            resolve: getAllProductos
        },
        getProducto: {
            type: ProductoType,
            args: {
                prodName: { type: GraphQLString }
            },
            resolve: (parent, args) => getNombreProducto(args.prodName)
        },
        
    }
});




module.exports = new GraphQLSchema({
    query: RootQuery
});