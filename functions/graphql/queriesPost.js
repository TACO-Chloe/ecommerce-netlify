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
            url(transformation: {
              image: { resize: { width: 200, height: 200, fit: clip } }
            })
            height
            width
          }
    }
  }
`

module.exports = {
  ProductDetail
}
