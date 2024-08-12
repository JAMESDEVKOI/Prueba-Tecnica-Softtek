

import { APIGatewayProxyStructuredResultV2 } from "aws-lambda"
import { eventGenerator } from "../__mocks__/request/eventGenerator"
import { contextMock } from "../__mocks__/request/httpMock"
import { handler } from "src/people/functions/getPeoples"

describe('Handler should be return  a valid response', () => {
  test('It should return a valid response', async () => {

    const event = eventGenerator({})
    const context = contextMock

    const response: APIGatewayProxyStructuredResultV2 = await handler(event, context)

    expect(response.statusCode).toBe(200)
  })
}) 