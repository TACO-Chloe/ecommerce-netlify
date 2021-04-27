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

const getSuUser = gql`
	query getSuUser($userid: String!)
	{
	  suUser(where: {userid: $userid}) {
		id
		userid
		name
		snapshot{
					url
					id
				}
		gender
		birth
		mobile
		motto
		defaultAddress
		shippingAddresses(where: {suUser: {userid: $userid}}) {
		  id
		  name:receiver
		  province
		  city
		  county:area
		  address
		  tel:phone
		  state
		}
	  }
	}
`


const createSuUser = gql`
  mutation createSuUser($data: SuUserCreateInput!)
  {
    createSuUser(data: $data) {
      	id
		userid
		name
		snapshot{
					url
					id
				}
		gender
		birth
		mobile
		motto
    } 
  }
`


const updateSuUser = gql`
	mutation updateSuUser($userid: String!,$data: SuUserUpdateInput!)
	{
	  updateSuUser(where: {userid: $userid},data: $data){ 
			id
			userid
			name
			snapshot{
						url
						id
					}
			gender
			birth
			mobile
			motto
	  }
	}
`


const upsertSuUser = gql`
	mutation upsertSuUser($userid: String!,$name: String!,$snapshotid: ID!,$gender: String!,$birth: Date!,$mobile: String!,$email: String!, $state: String!, $level: String!, $motto: String!) 
	{
	  upsertSuUser(where: {userid: $userid},
		upsert: {
		  create: {
			userid:$userid,name:$name,gender:$gender,birth:$birth,mobile:$mobile,email:$email,state:$state,level:$level,motto:$motto
		  },
		  update: {		
			name:$name,snapshot:{connect:{id:$snapshotid}},gender:$gender,birth:$birth,mobile:$mobile,email:$email,state:$state,level:$level,motto:$motto
		  }
		})
	  {
		id
		name
		snapshot{
					url
					id
				}
		gender
		birth
		mobile
		motto
	  }
	}
`


const publishSuUser = gql`
	mutation publishSuUser($userid: String!)
	{
	  publishSuUser(where: {userid: $userid})
	  {
			id
			name
			snapshot{
						url
						id
					}
			gender
			birth
			mobile
			motto
	  }
	}
`


const updateShippingAddress = gql`
	mutation updateShippingAddress($id: ID!,$data: ShippingAddressUpdateInput!)
	{
	  updateShippingAddress(where: {id: $id}, data:$data){ 
		id
		name:receiver
		province
		city
		area
		address
		tel:phone
		state
		suUser
		{
		  id
		  userid
		  name
		  defaultAddress
		}
	  }
	}
`


const createShippingAddress = gql`
	mutation createShippingAddress($data: ShippingAddressCreateInput!)
	{
	  createShippingAddress(data:$data){ 
		id
		name:receiver
		province
		city
		area
		address
		tel:phone
		state
		suUser
		{
		  id
		  userid
		  name
		  defaultAddress
		}
	  }
	}
`



module.exports = {
  ProductDetail,
  getSuUser,
  createSuUser,
  updateSuUser,
  upsertSuUser,
  publishSuUser,
  createShippingAddress,
  updateShippingAddress
}
