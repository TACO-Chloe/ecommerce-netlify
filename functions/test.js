// exports.handler = async (event, context) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       message: "Hi there Tacos",
//       event
//     })
//   }
// }

require("dotenv").config();

const { GraphQLClient, gql } = require('graphql-request');

const { Headers } = require('cross-fetch');

global.Headers = global.Headers || Headers;

//console.log("process.env.GRAPHCMS_ENDPOINT:"+process.env.GRAPHCMS_ENDPOINT);

//console.log("process.env.GRAPHCMS_TOKEN:"+process.env.GRAPHCMS_TOKEN);


exports.handler = async (event, context) => {

	console.log("EVENT: \n" + JSON.stringify(event, null, 2))
	console.log("CONTEXT: \n" + JSON.stringify(context, null, 2))
	console.log("HTTP-METHOD: \n" + JSON.stringify(event.httpMethod, null, 2))
	

	const endpoint = process.env.GRAPHCMS_ENDPOINT;
	const token = process.env.GRAPHCMS_TOKEN;
	// console.log("token:"+token);
	const headers = { authorization: `Bearer ${token}` };
	//console.log("headers:"+headers);

	const graphQLClient = new GraphQLClient(endpoint, { headers });
	
	const {ProductDetail} = require('./graphql/queries/queries.js');
	console.log("ProductDetail:"+ ProductDetail);
	
	const query = ProductDetail

	const {id} = {'id':'ckdu44mn40gxh010405uwgbtw'}
	console.log("info:1");
	console.log(JSON.stringify({id}, undefined, 2));
	const data = await graphQLClient.request(query,{id});
	console.log(JSON.stringify(data, undefined, 2));
	console.log("info:2");

	return {
	  statusCode: 200,
	  body: JSON.stringify(data, undefined, 2),
	  headers: {
        	"Access-Control-Allow-Origin": "*",
        	"Access-Control-Allow-Headers": "Content-Type",
        	"Access-Control-Allow-Methods": "GET, POST, OPTION",
		"Content-Type": "application/json; charset=utf-8"
      	  }
	};
};
