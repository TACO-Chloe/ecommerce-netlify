require("dotenv").config();

const axios = require('axios');
const URL = require('url').URL;
const fetch = require("node-fetch");
const FormData = require('form-data');
const { Headers } = require('cross-fetch');
const alipaySdk = require('./alipay/alipayUtil');
const AlipayFormData = require('alipay-sdk/lib/form').default;

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
	console.log("EVEN.BODY:" + event.body);
	console.log( "* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *" );
	console.log( "* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *" );
	
	
	// let weblist = ['subangbang.netlify.app','localhost:3000'];
	// let domain = (new URL(event.headers['referer']));
	
	// console.log('domain',domain)
	
	// if (!weblist.includes(domain.host)) {
		// return {
			// statusCode: 404,
			// headers
		// };
	// }
	
	var myData = '';
	
	if (event.httpMethod === "GET") {
		console.log("httpMethod:"+ event.httpMethod);
		myData = event.httpMethod;
	}
	
	if (event.httpMethod === "POST") {
		console.log("httpMethod:"+ event.httpMethod);
			
		const postData = JSON.parse(event.body);

		let orderId=postData.orderId
		console.log("Data:"+postData.orderId);
		// * 添加购物车支付支付宝 */
		// 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
		const formData = new AlipayFormData();
		console.log("new AlipayFormData");
		formData.setMethod('get');
		// 通过 addField 增加参数
		// 在用户支付完成之后，支付宝服务器会根据传入的 notify_url，以 POST 请求的形式将支付结果作为参数通知到商户系统。
		formData.addField('notifyUrl', 'https://www.xuexiluxian.cn'); // 支付成功回调地址，必须为可以直接访问的地址，不能带参数
		formData.addField('bizContent', {
			outTradeNo: orderId, // 商户订单号,64个字符以内、可包含字母、数字、下划线,且不能重复
			productCode: 'FAST_INSTANT_TRADE_PAY', // 销售产品码，与支付宝签约的产品码名称,仅支持FAST_INSTANT_TRADE_PAY
			totalAmount: '0.01', // 订单总金额，单位为元，精确到小数点后两位
			subject: '商品', // 订单标题
			body: '商品详情', // 订单描述

		});
		formData.addField('returnUrl', 'https://opendocs.alipay.com');//加在这里才有效果,不是加在bizContent 里面
		// 如果需要支付后跳转到商户界面，可以增加属性"returnUrl"
		console.log("formData END");
		result =  alipaySdk.exec(  // result 为可以跳转到支付链接的 url
							//'alipay.trade.wap.pay',
							'alipay.trade.page.pay', // 统一收单下单并支付页面接口
							{}, // api 请求的参数（包含“公共请求参数”和“业务参数”）
							{ formData: formData },
						);
						
		console.log("result:",result);
		
		myData = result.then((res) => { 
						// axios.post(result,
							// {
								// "success": true,
								// "message": "success",
								// "code": 200,
								// "timestamp": (new Date()).getTime(),
								// "result": myData
							// }
						// )
						return res
				};

		console.log("myData:",myData);
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


