require("dotenv").config();

const { GraphQLClient, gql } = require('graphql-request');

const { Headers } = require('cross-fetch');

global.Headers = global.Headers || Headers;

//console.log("process.env.GRAPHCMS_ENDPOINT:"+process.env.GRAPHCMS_ENDPOINT);

//console.log("process.env.GRAPHCMS_TOKEN:"+process.env.GRAPHCMS_TOKEN);


exports.handler = async (event, context) => {

	console.log("EVENT: \n" + JSON.stringify(event, null, 2))

	const endpoint = process.env.GRAPHCMS_ENDPOINT;
	const token = process.env.GRAPHCMS_TOKEN;
	console.log("token:"+token);
	const headers = { authorization: `Bearer ${token}` };
	//const headers = { authorization: 'Bearer 1234' };
	console.log("headers:"+headers);

	const graphQLClient = new GraphQLClient(endpoint, { headers });

	const query = gql`
	{
	  {
		  products {
			name
			id
		  }
	  }
	}
	`
	
	const data = await graphQLClient.request(query);
	//console.log(JSON.stringify(data, undefined, 2));

	return {
	  statusCode: 200,
	  //headers,
	  body: 'test'
	  //body: JSON.stringify(data, undefined, 2)
	};
};
