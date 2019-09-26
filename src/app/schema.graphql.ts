
import gql from 'graphql-tag';


export const typeDefs = gql`

        type Nav {
                id: ID!
                menu: Boolean
                arrow_back: Boolean
                side_bar: Boolean
                component: String
        }

        type Query {
               nav: Nav
        }
`;
//    type productparent(id: ID!): ProductParentNode
//
//
//    type allProductparents(
//        after: String
//        before: String
//        first: Int
//        last: Int
//        parentSn: Float
//        parentSn_Icontains: Float
//        parentSn_Istartswith: Float
//        ): ProductParentNodeConnection
//
//    type productcategory(id: ID!): ProductCategoryNode
//
//
//    type allProductcategory(
//        after: String
//        before: String
//        catId: Float
//        catName: String
//        first: Int
//        last: Int
//        level: Float
//        parentId: Float
//        ): ProductCategoryNodeConnection
//
//    type product(id: ID!): ProductNode
//
//    type allProducts(
//        after: String
//        before: String
//        cat_CatId_In: String
//        first: Int
//        last: Int
//        ): ProductNodeConnection
//
//    type warehouse(id: ID!): ProductWarehouseNode
//
//    type allWarehouses(
//        after: String
//        before: String
//        first: Int
//        last: Int
//        warehouse: String
//        ): ProductWarehouseNodeConnection
//
//
//    type originalImg(id: ID!): ProductOriginalImgNode
//
//    type allOriginalImgs(
//        after: String
//        before: String
//        first: Int
//        last: Int
//        originalImg: String
//        ): ProductOriginalImgNodeConnection
//
//    type descImg(id: ID!): ProductDescImgNode
//
//    type allDescImgs(
//        after: String
//        before: String
//        descImg: String
//        first: Int
//        last: Int
//        ): ProductDescImgNodeConnection
//
//    type shoppingCart(id: ID!): ShoppingCartNode
//
//    type allShoppingCart(
//        after: String
//        before: String
//        first: Int
//        last: Int
//        product_Sku: Float
//        product_Title: String
//        user_Id: ID
//        ): ShoppingCartNodeConnection
//
//
//
//
//
