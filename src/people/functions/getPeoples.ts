import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda'
import { PeopleController } from '../infrastructure/adapters/in/http/peopleController'
import { PeopleUseCase } from '../aplication/useCases/peopleUseCases'
import { DynamoDBPeopleRepository } from '../infrastructure/repositories/DynamoDBPeopleRepository'


const peopleController = new PeopleController(
    new PeopleUseCase(
        new DynamoDBPeopleRepository()
    )
)
export const handler = async (event: APIGatewayProxyEventV2, context: any): Promise<APIGatewayProxyStructuredResultV2> => {
    console.log(JSON.stringify(event), JSON.stringify(context), "awa")
    const response = await peopleController.exec(event)

    return {
        statusCode: 200,
        body: JSON.stringify(response),
    }

}