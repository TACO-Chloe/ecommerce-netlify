<template>
  <div id="app" @click="test">
  123{{name}}
  </div>
</template>

<script>

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import { gql } from '@apollo/client';

export default {
  data() {
    return {
      name: '',
      webrtcurl: 'http://172.18.2.10:8010/',
    };
  },
  methods : {
	test() {
		// Set `RestLink` with your endpoint
		const restLink = new RestLink({ uri: "https://swapi.dev/api/" });

		// Setup your client
		const client = new ApolloClient({
		  cache: new InMemoryCache(),
		  link: restLink
		});


		const query = gql`
		  query Luke {
			person @rest(type: "Person", path: "people/1/") {
			  name
			}
		  }
		`;

		// Invoke the query and log the person's name
		client.query({ query }).then(response => {
		  this.name = response.data.person.name;
		  console.log(response);
		  console.log(response.data.person.name);
		});
		
		console.log('123456')
		
	}
  }
};



</script>