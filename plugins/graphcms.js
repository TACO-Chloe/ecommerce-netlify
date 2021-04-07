import { GraphQLClient } from 'graphql-request';

const graphcmsEndpoint = 'https://api-ap-northeast-1.graphcms.com/v2/ckm1b1lzcbj5801xu6yqlfh53/master';
const graphcmsToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MTUzNDY0NjYsImF1ZCI6WyJodHRwczovL2FwaS1hcC1ub3J0aGVhc3QtMS5ncmFwaGNtcy5jb20vdjIvY2ttMWIxbHpjYmo1ODAxeHU2eXFsZmg1My9tYXN0ZXIiXSwiaXNzIjoiaHR0cHM6Ly9tYW5hZ2VtZW50LmdyYXBoY21zLmNvbS8iLCJzdWIiOiI2ZWM5MzFlYy1iMjgzLTRlZWQtYWRmZS1lZWQwZWE3NzQ0N2YiLCJqdGkiOiJja20ydmt1ajV0bGE4MDF6NWdkdTZmbDRqIn0.TrTCFPMG_hWfOi2rLX0jBCRAW_y0J_h_WPjGiXvVrE3qKmNWZ5zoXwFNwS-b6fvlq1bHKuKqRhSZG7-Xu-nje1qTsZXqW6vqEWHkpMBwsgUD0OekEvWFAYE6LHJ87R8hKKpLAowjrQw3w7jTAIWkPQri5T4lvLPhIotA6QErKkJrT3wHF1T-CznmmUAJf6XcU9NC4rB1yj-zExkfG64eVwDSlh4ysdYriCguKGX84yeN9eB234YC7OJnKiZkZ7SrxJzEj_nOPG-dXfA22KgQzqk9k9nixF5Ox48-eehA5msDVmf2KjnvdpyY8eeTQU28Ccmi_jsYQa7OcJuFXIS9aZhrEGDYMryhmrVBsQCYpn-e53JTIaLZ4HabBn5NR9yYRjBVvWRHx4PLJbYfzl0Pr2UCdmjNKZiz8BfLFdf5l4cUfossDgGRnhde7FuM_KStezniglS7m3crr96QuJlUzLS5xv1RhbpUGyzo2T3Pj8OSNsx8cZ4ptHqcdcYf1rJxpTpKh9r724BZd9IHbkInyR6E2Eko4-ZKKwLttMTnJN_Apt5rnWtrdoSvJR-i0NkjOY4dQmMx_I9axgt4qQLJb9_q662kB3hVMbIMFkAiQDWJHY11YhzZDocdxqWSXPg4k_F6nBGg_pLRyCAAiYjS8uQ_W0lmBtSQ5luAeyXnc60';

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
