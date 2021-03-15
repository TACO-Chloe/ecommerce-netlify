import gql from "graphql-tag";


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
