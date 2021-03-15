//import gql from "graphql-tag";
const { gql } = require('graphql-tag');


export const ProductList = gql`
  query ProductList {
	{
	  products {
		name
		id
	  }
	}
  }
`;
