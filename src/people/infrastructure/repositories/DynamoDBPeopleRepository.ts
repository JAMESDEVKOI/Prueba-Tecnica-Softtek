import AWS from "aws-sdk";
import { v4 } from "uuid";
import { People } from "src/people/domain/models/People";
import { PeopleRepository } from "src/people/domain/service/repositories/PeopleRepositorie";

export class DynamoDBPeopleRepository implements PeopleRepository {
  async getPeopleList(): Promise<People[]> {

    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    const data = await dynamoDB
      .scan({
        TableName: "Sofftek",
      })
      .promise();
    const tasks = data.Items;

    return tasks as People[]
  }
  getPeople(id: string): Promise<People | void> {
    throw new Error("Method not implemented.");
  }
  async addPeople(people: People): Promise<People> {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    const id = v4();

    const { nombre, color_cabello, vehiculos, altura, peliculas, naves_estelares, masa, mundo_natal, editado, color_piel, especies, creado, color_ojos, anio_nacimiento, genero } = JSON.parse(people as any);

    const newPeople = {
      id,
      nombre, color_cabello, vehiculos, altura, peliculas, naves_estelares, masa, mundo_natal, editado, color_piel, especies, creado, color_ojos, anio_nacimiento, genero,
    };

    await dynamoDB
      .put({
        TableName: "Sofftek",
        Item: newPeople,
      })
      .promise();

    return newPeople as unknown as People
  }
  updatePeople(id: string, people: People): Promise<People | void> {
    throw new Error("Method not implemented.");
  }
  deletePeople(id: string): Promise<People | void> {
    throw new Error("Method not implemented.");
  }

  // async getPeople(id: string): Promise<People | void> {
  //   console.log('persistence', id)
  //   const surveys: People[] = [
  //     {
  //       id: '1',
  //       name: 'Survey 1',
  //       questions: [
  //         { id: '1', title: 'Question 1', type: 'radio', createdAt: '2024-01-01', updatedAt: '2024-01-01', description: '' },
  //         { id: '2', title: 'Question 2', type: 'text', createdAt: '2024-01-01', updatedAt: '2024-01-01', description: '' }
  //       ]
  //     },
  //     {
  //       id: '2',
  //       name: 'Survey 2',
  //       questions: [
  //         { id: '3', title: 'Question 1', type: 'radio', createdAt: '2024-01-01', updatedAt: '2024-01-01', description: '' },
  //         { id: '4', title: 'Question 2', type: 'text', createdAt: '2024-01-01', updatedAt: '2024-01-01', description: '' }
  //       ]
  //     }
  //   ]

  //   const survey = surveys.find(survey => survey.id === id)
  //   console.log('resp', survey)
  //   if (!survey) {
  //     throw new Error('Survey not found')
  //   }
  //   return survey
  // }
}