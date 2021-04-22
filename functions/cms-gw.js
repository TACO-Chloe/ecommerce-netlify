require("dotenv").config();

const axios = require('axios');

const Buffer = require( "buffer" ).Buffer;

const fs = require("fs");

const FormData = require('form-data');

const { GraphQLClient, gql } = require('graphql-request');

const { Headers } = require('cross-fetch');

global.Headers = global.Headers || Headers;

//console.log("process.env.GRAPHCMS_ENDPOINT:"+process.env.GRAPHCMS_ENDPOINT);

//console.log("process.env.GRAPHCMS_TOKEN:"+process.env.GRAPHCMS_TOKEN);

headers = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers": "Content-Type",
};

exports.handler = async (event, context) => {
	var corsHeaders = {
		"Access-Control-Allow-Origin" : process.env.NETLIFY_ACCESS_CONTROL_ALLOW_ORIGIN,
		"Access-Control-Allow-Headers": "*",
		"Access-Control-Allow-Methods": "*"
	};
	
	if (event.httpMethod === "OPTIONS") {
		return {
			statusCode: 200,
			headers
		};
	}

	console.log( "* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *" );
	console.log( "* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *" );
	console.log("EVENT: \n" + JSON.stringify(event, null, 2));
	console.log("CONTEXT: \n" + JSON.stringify(context, null, 2));
	console.log("HTTP-METHOD: \n" + JSON.stringify(event.httpMethod, null, 2));
	console.log("EVEN.BODY:" + event.body);
	console.log( "* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *" );
	console.log( "* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *" );
	
	if (event.httpMethod === "GET") {
// 		const { ProductList } = require('./graphql/queries/products.js');
// 		console.log("ProductList:"+ JSON.stringify(ProductList));
// 		console.log("{ProductList}:"+ {ProductList});
// 		console.log("String-{ProductList}:"+ JSON.stringify({ProductList}));
		
// 		myData = await graphqlRequest(ProductList,'');
		
		const GLQuery = require('./graphql/queriesGet.js');
		console.log("GLQuery:"+ GLQuery);
		console.log("GLQuery:"+ JSON.stringify(GLQuery.ProductList));
		
		myData = await graphqlRequest(GLQuery.ProductList,'');
	}
	
	if (event.httpMethod === "POST") {
		if (event.path === "/.netlify/functions/cms-gw/upload") {
			const uploadUrl = `${process.env.GRAPHCMS_ENDPOINT}/upload`
			const buff = Buffer.from(event.body, 'base64');
			console.log("Buffer:" + buff);
			
			//const file = new Blob([buff], { type: "image/jpeg" })
			//console.log("File:" + file);
			//fs.writeFileSync("new-path.jpg", buff);
			const formData = new FormData()
			formData.append('fileUpload', fs.createReadStream(buff));
			myData = await axios.post(uploadUrl, formData, {headers: {'Content-Type': 'multipart/form-data'}})
				.then(result => {
					console.log('Upload-result',result);

				}).catch(error => {
					console.error(error);
				})
		} else {

	// 		const {ProductDetail} = require('./graphql/queries/queries.js');
	// 		console.log("ProductDetail:"+ ProductDetail);
			
			const postData = JSON.parse(event.body);
			console.log("Data:"+postData);
			gltype = postData.gltype;
			
			//const GLQuery = require(`../api/graphql/queriesPost${gltype}`).myGraphql;
			const GLQuery = require('./graphql/queriesPost')[gltype];
			console.log("GLQuery:"+ JSON.stringify(GLQuery));
			
			// switch (postData.gltype) {
			  // case 'ProductDetail':
				// Query = GLQuery.ProductDetail;
				// console.log('ProductDetail');
				// break;
			  // case 'upsertSuUser':
				// Query = GLQuery.upsertSuUser;
				// console.log('UpdateUserSetting');
				// break;
			  // case 'Other':
				// console.log('Other');
				// break;
			  // default:
				// console.log(`Sorry, we are out of ${expr}.`);
			// }
			
			// myData = await graphqlRequest(Query,postData);
			myData = await graphqlRequest(GLQuery,postData);
		}
	};



	return {
	  statusCode: 200,
	  body: JSON.stringify(myData, undefined, 2),
	  headers:{
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers": "Content-Type",
		"Access-Control-Allow-Methods": "GET, POST, OPTION",
		"Content-Type": "application/json; charset=utf-8"
	  }
	};
};

async function graphqlRequest(GLQuery, postData) {
	const endPoint = process.env.GRAPHCMS_ENDPOINT;
	const token = process.env.GRAPHCMS_TOKEN;
	// console.log("token:"+token);
	const headers = { authorization: `Bearer ${token}` };
	//console.log("headers:"+headers);

	const graphQLClient = new GraphQLClient(endPoint, { headers });
	
	query = GLQuery ;
	console.log("info:1");
	console.log({postData});
	console.log("postData:"+postData);
	
	if (postData) { 
	data = await graphQLClient.request(query,postData).catch((error) => {console.error(error);return error;});
		console.log("Data:"+JSON.stringify(data, undefined, 2));
		console.log("info:2");
	} 
	else {
	data = await graphQLClient.request(query).catch((error) => {console.error(error);return error;});
		console.log("Data:"+JSON.stringify(data, undefined, 2));
		console.log("info:3");
	}
	
	//console.log(JSON.stringify(data, undefined, 2));
	console.log("info:4");
	
	return data
}
