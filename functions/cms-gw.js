require("dotenv").config();

const { GraphQLClient } = require('graphql-request');

//console.log("process.env.GRAPHCMS_ENDPOINT:"+process.env.GRAPHCMS_ENDPOINT);

//console.log("process.env.GRAPHCMS_TOKEN:"+process.env.GRAPHCMS_TOKEN);
const endpoint = process.env.GRAPHCMS_ENDPOINT;
const token = process.env.GRAPHCMS_TOKEN;

const graphQLClient = new GraphQLClient(endpoint, {
headers: {
  authorization: `Bearer ${token}`,
},
});

const query = GraphQLClient`
{
  {
	  products {
		name
		id
	  }
  }
}
`


exports.handler = async (event, context) => {

  console.log("EVENT: \n" + JSON.stringify(event, null, 2))
	
  const data = await graphQLClient.request(query);
  console.log(JSON.stringify(data, undefined, 2));

  return {
	  statusCode: 200,
	  //headers,
	  body: 'test'
	  //body: JSON.stringify(data, undefined, 2)
  };
};
