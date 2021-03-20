//import gql from "graphql-tag";
const gql = require('graphql-tag');

const ProductList = gql`
	query ProductList {
		products {
		    id
		    name
		    description{}
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
		      url(transformation: {
              		image: { resize: { width: 200, height: 200, fit: clip } }
            		})
		    }
		}
	}
`;

module.exports = {
  ProductList
}
