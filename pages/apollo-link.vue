<template>
  <div id="app">
	<button @click="test">
		start
	</button>
	<button @click="clear">
		clear
	</button>
    <div>
		{{name}}
	</div>
  </div>
	
</template>

<script>
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloLink, HttpLink, from, split, execute } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import { gql } from '@apollo/client';

export default {
  data() {
    return {
      name: '',
    };
  },
  methods : {
	test() {		
		console.log('start')
		
		var key = ["FLOTID","FName","FNumber","FMATERIALID","FUseOrgId","Inventory","MATERIAL"]
	
		const restLink = new RestLink({
		  uri: 'http://127.0.0.1:5000/k3/',
		  customFetch: fetch,
		  headers: {
			'Content-Type': 'application/json',
		  },
		  responseTransformer: async response => response.json().then(json => this.arrToObject(key,json)),
		});

		const client = new ApolloClient({
		  cache: new InMemoryCache(),
		  link: restLink,
		});

		const getMateralQuery = gql`
		  query Me($input: Payload!,$email: String!) {
			  BatchMainFile(input: $input) @rest(type: "BatchMainFile", method: "POST", path: "ExecuteBillQuery/Pass") {
				  FLOTID @export(as: "l_id")
				  FName  
				  FNumber 
				  FMATERIALID @export(as: "m_id")
				  FUseOrgId 
				  Inventory(FormName: "STK_Inventory",FieldKeys: "FID,FMaterialId,FStockOrgId,FLot",FieldName: "FLot",input: {}) @rest(type: "Inventory", method: "POST", path: "ExecuteBillQuery/Pass/{exportVariables.l_id}?{args}") {
					Result
				  }
				  MATERIAL(input: {}) @rest(type: "MATERIAL", method: "POST", path: "View/BD_MATERIAL/{exportVariables.m_id}") {
					Result {
						Result
					}
				  }
			}
		  }
		`;
		const payload = {
			"FormId": "BD_BatchMainFile",
			"FieldKeys": "FLOTID,FName,FNumber,FMATERIALID,FUseOrgId",
			"FilterString": [{"Left":"(","FieldName":"FNumber","Compare":"=","Value":"鲁源210903002","Right":")","Logic":""}],
			"TopRowCount": 0,
			"StartRow": 0,
			"Limit": 100
		};
		
		const payload1 = {
				"Id": ""
		};

		client.query({ query: getMateralQuery, variables: { input: payload } }).then((res) => {
		  console.log(res);
		  this.name = res.data.BatchMainFile;
		});
		
		console.log('end')
		
	},
	arrToObject (key,arr){
		//assuming header
		var keys = key;
		
		console.log("array",arr)
		
		if (Array.isArray(arr)) {

			var formatted = [],
			data = arr,
			cols = keys,
			l = cols.length;
			for (var i=0; i<data.length; i++) {
					var d = data[i],
							o = {};
					for (var j=0; j<l; j++)
							o[cols[j]] = d[j];
					formatted.push(o);
			}
			return formatted;
		}
		else {
			return arr
		};
	},
	clear (){
		this.name = '';
	}
  }
};



</script>