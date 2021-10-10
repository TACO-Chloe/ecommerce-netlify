require("dotenv").config();

const axios = require('axios');
const URL = require('url').URL;
const fetch = require("node-fetch");
const FormData = require('form-data');
const { Headers } = require('cross-fetch');
const unipay = require('@dcloudio/unipay');

global.Headers = global.Headers || Headers;

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
	console.log("User-Agent: \n" + JSON.stringify(event.multiValueHeaders.User-Agent[0], null, 2));
	console.log("EVEN.BODY:" + event.body);
	console.log( "* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *" );
	console.log( "* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *" );
	
	
	var myData = 'default';
	var agent = event.multiValueHeaders.User-Agent[0];
    var isMobile = !!agent.match(/(iPad)|(iPhone)|(iPod)|(android)/i);
	
	if (event.httpMethod === "GET") {
		console.log("httpMethod:"+ event.httpMethod);
		myData = event.httpMethod;
	}
	
	if (event.httpMethod === "POST") {
		console.log("httpMethod:"+ event.httpMethod);
			
		const postData = JSON.parse(event.body);

		let orderId=postData.orderId
		console.log("Data:"+postData.orderId);
		
		
	};



	return {
	  statusCode: 200,
	  //body: JSON.stringify(myData, undefined, 2),
	  body: myData,
	  headers:{
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers": "Content-Type",
		"Access-Control-Allow-Methods": "GET, POST, OPTION",
		"Content-Type": "application/json; charset=utf-8"
	  }
	};
};


