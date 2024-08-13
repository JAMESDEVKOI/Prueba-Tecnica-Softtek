import { People } from "../../models/People";

export interface PeopleRepository {
  getPeopleList(): Promise<People[]>;
  getPeople(id: string): Promise<People | void>;
  addPeople(people: People): Promise<People | void>;
  updatePeople(id: string, people: People): Promise<People | void | string>;
  deletePeople(id: string): Promise<People | void | string>;
}
