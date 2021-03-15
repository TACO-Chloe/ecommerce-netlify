//import gql from "graphql-tag";
const gql = require('graphql-tag');

const ProductList = gql`
	{
	  products {
		name
		id
	  }
	}
`;

module.exports = {
  ProductList
}
