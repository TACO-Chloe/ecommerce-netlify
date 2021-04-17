import { GraphQLClient } from 'graphql-request';

const graphcmsEndpoint = process.env.GRAPHCMS_ENDPOINT;
const graphcmsToken = process.env.GRAPHCMS_TOKEN;

//console.log("process.env.GRAPHCMS_ENDPOINT:"+process.env.GRAPHCMS_ENDPOINT);

//console.log("process.env.GRAPHCMS_TOKEN:"+process.env.GRAPHCMS_TOKEN);

//console.log("process.env.DEPLOY_URL:"+process.env.DEPLOY_URL);

const headers = { authorization: `Bearer ${graphcmsToken}` };
const graphcmsClient = new GraphQLClient(graphcmsEndpoint, { headers });



export default (_, inject) => {
  inject('graphcms', graphcmsClient);
};
