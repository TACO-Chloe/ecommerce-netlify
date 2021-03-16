import { GraphQLClient } from 'graphql-request';
require("dotenv").config();

const graphcmsEndpoint = process.env.GRAPHCMS_ENDPOINT;
const graphcmsToken = process.env.GRAPHCMS_TOKEN;

console.log("process.env.GRAPHCMS_ENDPOINT:"+process.env.GRAPHCMS_ENDPOINT);

console.log("process.env.GRAPHCMS_TOKEN:"+process.env.GRAPHCMS_TOKEN);

console.log("process.env.DEPLOY_URL:"+process.env.DEPLOY_URL);

const headers = { authorization: `Bearer ${graphcmsToken}` };
const graphcmsClient = new GraphQLClient(graphcmsEndpoint, { headers });


// const graphcmsClient = new GraphQLClient(
  // 'https://api-ap-northeast-1.graphcms.com/v2/ckm1b1lzcbj5801xu6yqlfh53/master'
// );


export default (_, inject) => {
  inject('graphcms', graphcmsClient);
};
