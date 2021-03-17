//import gql from "graphql-tag";
const gql = require('graphql-tag');

const ProductDetail = gql`
  query GetProduct($id: ID) {
    product(where: { id: $id }) {
      name
      description {markdown}
      price
      images {
            id
            url
            height
            width
          }
    }
  }
`

module.exports = {
  ProductDetail
}
