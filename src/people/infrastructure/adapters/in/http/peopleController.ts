import { APIGatewayProxyEventV2, Context } from 'aws-lambda'
import axios from 'axios';
import { MapKeysTranslate } from 'src/people/aplication/decorator/MapKeysTranslate';
import { englishToSpanishMapping } from 'src/people/aplication/defined/getAll/englishToSpanishMapping';

import { Handler } from 'src/people/aplication/port/in/http/handler'
import { PeopleUseCase } from 'src/people/aplication/useCases/peopleUseCases'
import { People } from 'src/people/domain/models/People';


export class PeopleController implements Handler<APIGatewayProxyEventV2, Partial<Context>> {

	constructor(
		private readonly peopleUseCase: PeopleUseCase
	) { }



	@MapKeysTranslate(englishToSpanishMapping)
	async getPeopleList(_: APIGatewayProxyEventV2) {
		try {

			const peoplesList = await axios.get('https://swapi.py4e.com/api/people');
			const peoples = peoplesList.data.results

			const response = await this.peopleUseCase.getPeopleList() || []

			const results = [
				...peoples,
				...response
			];

			return {
				statusCode: 200,
				body: results,
			};
		} catch (error) {
			console.log(error)
			return {
				statusCode: 500,
				body: JSON.stringify({ message: (error as Error).message }),
			}
		}
	}

	async getPeople(event: APIGatewayProxyEventV2, context: Partial<Context>) {
		try {

			const { id } = event.pathParameters!

			const response = await this.peopleUseCase.getPeople(id as string)

			return {
				statusCode: 200,
				body: response,
			};
		} catch (error) {
			console.log(error)
			return {
				statusCode: 500,
				body: JSON.stringify({ message: (error as Error).message }),
			}
		}
	};
	async createPeople(event: APIGatewayProxyEventV2, context?: Partial<Context>) {
		try {


			const response = await this.peopleUseCase.addPeople(event.body as unknown as People)

			return {
				statusCode: 200,
				body: response,
			};
		} catch (error) {
			console.log(error)
			return {
				statusCode: 500,
				body: JSON.stringify({ message: (error as Error).message }),
			}
		}
	};
	updatePeople: (event: APIGatewayProxyEventV2, context: Partial<Context>) => Promise<unknown>;
	deletePeople: (event: APIGatewayProxyEventV2, context: Partial<Context>) => Promise<unknown>;


}