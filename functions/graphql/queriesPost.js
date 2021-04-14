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


const createSuUser = gql`
  mutation createSuUser($data: SuUserCreateInput!)
  {
    createSuUser(data: $data) {
      id
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
		id,
		userid,
		name
	  }
	}
`

module.exports = {
  ProductDetail,
  upsertSuUser
}
