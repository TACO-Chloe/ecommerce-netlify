//import gql from "graphql-tag";
const gql = require('graphql-tag');


const myGraphql = gql`
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
	myGraphql
}
