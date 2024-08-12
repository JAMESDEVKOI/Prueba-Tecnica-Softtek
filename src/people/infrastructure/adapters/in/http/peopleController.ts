import { APIGatewayProxyEventV2, Context } from 'aws-lambda'
import axios from 'axios';
import { MapKeysTranslate } from 'src/people/aplication/decorator/MapKeysTranslate';
import { englishToSpanishMapping } from 'src/people/aplication/defined/getAll/englishToSpanishMapping';

import { Handler } from 'src/people/aplication/port/in/http/handler'
import { PeopleUseCase } from 'src/people/aplication/useCases/peopleUseCases'


export class PeopleController implements Handler<APIGatewayProxyEventV2, Partial<Context>> {

	constructor(
		private readonly surveyUsecase: PeopleUseCase
	) { }


	@MapKeysTranslate(englishToSpanishMapping)
	async exec(event: APIGatewayProxyEventV2) {
		try {

			const peoplesList = await axios.get('https://swapi.py4e.com/api/people');
			const peoples = peoplesList.data.results

			const response = await this.surveyUsecase.getPeopleList() || []

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


	// async getPeople(event: APIGatewayProxyEventV2) {
	// 	try {
	// 		const { id } = event.pathParameters!
	// 		console.log(id)

	// 		const survey = await this.surveyUsecase.getPeople(id ?? '')

	// 		return survey

	// 	} catch (error) {
	// 		console.log(error)
	// 		return {
	// 			statusCode: 500,
	// 			body: JSON.stringify({ message: (error as Error).message }),
	// 		}
	// 	}
	// }

	// async getPeopleList(event: APIGatewayProxyEventV2) {
	// 	try {
	// 		const { id } = event.pathParameters!
	// 		console.log(id)

	// 		const survey = await this.surveyUsecase.getPeople(id ?? '')

	// 		return survey

	// 	} catch (error) {
	// 		console.log(error)
	// 		return {
	// 			statusCode: 500,
	// 			body: JSON.stringify({ message: (error as Error).message }),
	// 		}
	// 	}
	// }
}