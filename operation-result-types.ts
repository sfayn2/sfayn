

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllProducts
// ====================================================

export interface GetAllProducts_allProductparents_edges_node_parent2product_edges_node_originalImg_edges_node {
  id: string;  // The ID of the object.
  originalImg: string | null;
}

export interface GetAllProducts_allProductparents_edges_node_parent2product_edges_node_originalImg_edges {
  node: GetAllProducts_allProductparents_edges_node_parent2product_edges_node_originalImg_edges_node | null;  // The item at the end of the edge
}

export interface GetAllProducts_allProductparents_edges_node_parent2product_edges_node_originalImg {
  edges: (GetAllProducts_allProductparents_edges_node_parent2product_edges_node_originalImg_edges | null)[];  // Contains the nodes in this connection.
}

export interface GetAllProducts_allProductparents_edges_node_parent2product_edges_node_warehouse_edges_node {
  id: string;  // The ID of the object.
  warehouse: ProductWarehouseWarehouse | null;
  price: number | null;
  goodsState: string | null;
  goodsNumber: number | null;
}

export interface GetAllProducts_allProductparents_edges_node_parent2product_edges_node_warehouse_edges {
  node: GetAllProducts_allProductparents_edges_node_parent2product_edges_node_warehouse_edges_node | null;  // The item at the end of the edge
}

export interface GetAllProducts_allProductparents_edges_node_parent2product_edges_node_warehouse {
  edges: (GetAllProducts_allProductparents_edges_node_parent2product_edges_node_warehouse_edges | null)[];  // Contains the nodes in this connection.
}

export interface GetAllProducts_allProductparents_edges_node_parent2product_edges_node {
  id: string;  // The ID of the object.
  title: string | null;
  sku: number;
  parentId: number | null;
  color: string | null;
  originalImg: GetAllProducts_allProductparents_edges_node_parent2product_edges_node_originalImg | null;
  warehouse: GetAllProducts_allProductparents_edges_node_parent2product_edges_node_warehouse | null;
}

export interface GetAllProducts_allProductparents_edges_node_parent2product_edges {
  node: GetAllProducts_allProductparents_edges_node_parent2product_edges_node | null;  // The item at the end of the edge
}

export interface GetAllProducts_allProductparents_edges_node_parent2product {
  edges: (GetAllProducts_allProductparents_edges_node_parent2product_edges | null)[];  // Contains the nodes in this connection.
}

export interface GetAllProducts_allProductparents_edges_node {
  id: string;  // The ID of the object.
  parentSn: number;
  parent2product: GetAllProducts_allProductparents_edges_node_parent2product | null;
}

export interface GetAllProducts_allProductparents_edges {
  node: GetAllProducts_allProductparents_edges_node | null;  // The item at the end of the edge
}

export interface GetAllProducts_allProductparents {
  edges: (GetAllProducts_allProductparents_edges | null)[];  // Contains the nodes in this connection.
}

export interface GetAllProducts {
  allProductparents: GetAllProducts_allProductparents | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

// An enumeration.
export enum ProductWarehouseWarehouse {
  AU4PXHXY = "AU4PXHXY",
  ESTJWH = "ESTJWH",
  FCYWHQ = "FCYWHQ",
  FREDCGC = "FREDCGC",
  FXHKGCZY = "FXHKGCZY",
  FXJFKGC = "FXJFKGC",
  FXLAWH = "FXLAWH",
  FXLAWH2 = "FXLAWH2",
  FXQHBSWH = "FXQHBSWH",
  FXRUWJ = "FXRUWJ",
  GBYKDFX = "GBYKDFX",
  MXTJWH = "MXTJWH",
  UKCBWH = "UKCBWH",
  YB = "YB",
  ZQ01 = "ZQ01",
  ZQDZ01 = "ZQDZ01",
}

//==============================================================
// END Enums and Input Objects
//==============================================================