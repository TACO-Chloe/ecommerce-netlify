//import gql from "graphql-tag";
const { gql } = require('graphql-tag');

exports.ProductList = function () { gql`
  query ProductList {
	{
	  products {
		name
		id
	  }
	}
  }
`
};
