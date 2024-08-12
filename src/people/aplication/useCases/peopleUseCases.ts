import { People } from "../../domain/models/People";
import { PeopleRepository } from "../../domain/service/repositories/PeopleRepositorie";



export class PeopleUseCase {
	constructor(
		private readonly peopleRepository: PeopleRepository
	) { }

	async getPeopleList(): Promise<People[]> {
		return this.peopleRepository.getPeopleList()
	}

	async addPeople(people: People): Promise<People | void> {
		return this.peopleRepository.addPeople(people)
	}

	async getPeople(id: string): Promise<People | void> {
		return this.peopleRepository.getPeople(id)
	}

	async updatePeople(id: string, people: People): Promise<People | void> {
		return this.peopleRepository.updatePeople(id, people)
	}

	async deletePeople(id: string): Promise<People | void> {
		return this.peopleRepository.deletePeople(id)
	}
}