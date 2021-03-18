//import gql from "graphql-tag";
const gql = require('graphql-tag');

const ProductList = gql`
	query ProductList {
		products {
		    id
		    name
		    description{markdown}
		    slug
		    category {
		      name
		    }
		    price
		    reviews {
		      name
		      email
		      headline
		      message
		      rating
		      product{name}
		    }
		    images {
		      url
		    }
		}
	}
`;

module.exports = {
  ProductList
}
