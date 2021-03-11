import { GraphQLClient, gql } from 'graphql-request'

require("dotenv").config();

async function main() {
  const endpoint = process.env.GRAPHCMS_ENDPOINT
  const token = process.env.GRAPHCMS_TOKEN

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })

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

  const data = await graphQLClient.request(query)
  console.log(JSON.stringify(data, undefined, 2))
}

main().catch((error) => console.error(error))