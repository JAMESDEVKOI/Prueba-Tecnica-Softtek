import AWS from "aws-sdk";
import { v4 } from "uuid";
import { People } from "src/people/domain/models/People";
import { PeopleRepository } from "src/people/domain/service/repositories/PeopleRepositorie";

export class DynamoDBPeopleRepository implements PeopleRepository {
  async getPeopleList(): Promise<People[]> {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    const data = await dynamoDB
      .scan({
        TableName: "Sofftekv2",
      })
      .promise();
    const tasks = data.Items;

    return tasks as People[];
  }
  async getPeople(id: string): Promise<People | void> {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    const data = await dynamoDB
      .get({
        TableName: "Sofftekv2",
        Key: {
          id,
        },
      })
      .promise();

    return data.Item as People;
  }
  async addPeople(people: People): Promise<People> {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    const id = v4();

    const {
      nombre,
      color_cabello,
      vehiculos,
      altura,
      peliculas,
      naves_estelares,
      masa,
      mundo_natal,
      editado,
      color_piel,
      especies,
      creado,
      color_ojos,
      anio_nacimiento,
      genero,
    } = JSON.parse(people as any);

    const newPeople = {
      id,
      nombre,
      color_cabello,
      vehiculos,
      altura,
      peliculas,
      naves_estelares,
      masa,
      mundo_natal,
      editado,
      color_piel,
      especies,
      creado,
      color_ojos,
      anio_nacimiento,
      genero,
    };

    await dynamoDB
      .put({
        TableName: "Sofftekv2",
        Item: newPeople,
      })
      .promise();

    return newPeople as unknown as People;
  }
  async updatePeople(
    id: string,
    people: People
  ): Promise<People | void | string> {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const {
      nombre,
      color_cabello,
      vehiculos,
      altura,
      peliculas,
      naves_estelares,
      masa,
      mundo_natal,
      editado,
      color_piel,
      especies,
      color_ojos,
      anio_nacimiento,
      genero,
    } = JSON.parse(people as any);

    await dynamoDB
      .update({
        TableName: "Sofftekv2",
        Key: { id },
        UpdateExpression:
          "set nombre = :nombre, color_cabello = :color_cabello, vehiculos = :vehiculos, altura = :altura,peliculas = :peliculas, naves_estelares = :naves_estelares, masa = :masa, mundo_natal = :mundo_natal, editado = :editado, color_piel = :color_piel, especies = :especies, color_ojos = :color_ojos, anio_nacimiento = :anio_nacimiento, genero = :genero",
        ExpressionAttributeValues: {
          ":nombre": nombre,
          ":color_cabello": color_cabello,
          ":vehiculos": vehiculos,
          ":altura": altura,
          ":peliculas": peliculas,
          ":naves_estelares": naves_estelares,
          ":masa": masa,
          ":mundo_natal": mundo_natal,
          ":editado": editado,
          ":color_piel": color_piel,
          ":especies": especies,
          ":color_ojos": color_ojos,
          ":anio_nacimiento": anio_nacimiento,
          ":genero": genero,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();

    return "Task updated successfully";
  }
  async deletePeople(id: string): Promise<People | void | string> {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    await dynamoDB
      .delete({
        TableName: "Sofftekv2",
        Key: {
          id,
        },
      })
      .promise();

    return "Task deleted successfully";
  }
}
