import {
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2,
} from "aws-lambda";
import { PeopleController } from "../infrastructure/adapters/in/http/peopleController";
import { PeopleUseCase } from "../aplication/useCases/peopleUseCases";
import { DynamoDBPeopleRepository } from "../infrastructure/repositories/DynamoDBPeopleRepository";

const peopleController = new PeopleController(
  new PeopleUseCase(new DynamoDBPeopleRepository())
);
export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyStructuredResultV2> => {
  const response = await peopleController.updatePeople(event);

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
