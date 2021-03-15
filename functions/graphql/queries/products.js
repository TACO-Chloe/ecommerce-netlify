//import gql from "graphql-tag";
const { gql } = require('graphql-tag');

exports const ProductList = gql`
  query ProductList {
	{
	  products {
		name
		id
	  }
	}
  }
`;
