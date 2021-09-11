import { AxiosResponse } from "axios";
import axios from "axios";
import {
  Astronaut,
  AstronautSerialized,
  AstronautForm,

  transformAstronautSerializedToDeserialized
} from "./type/astronaut";

/**
 * Class containes methods for fetching data from server
 */
class HttpResource {
  /**
   * Method fetches all astronauts
   * @returns astronauts in Astronaut format
   */
  public static async getAstronauts(): Promise<Astronaut[]> {
    // const astronauts: AxiosResponse<AstronautSerialized[]> = await AxiosInstance.get<AstronautSerialized[]>("astronauts/");
    const astronauts: AxiosResponse<AstronautSerialized[]> = await axios.request<AstronautSerialized[]>({
      method: "GET",
      url: "http://localhost:3001/astronauts",

    })

    return astronauts.data.map(transformAstronautSerializedToDeserialized);
  }

  public static async getAstronautById() {

  }

  /**
   * Method sends request to create new astronaut by given data
   * @param astronaut are the astronaut data
   */
  public static async createAstronaut(astronaut: AstronautForm): Promise<void> {
    await axios.request({
      method: "POST",
      url: "http://localhost:3001/astronauts",
      data: astronaut
    })
  }

  /**
   * Method sends request to update astronaut by given id
   * @param astronautId is id of the updated astronaut
   * @param astronaut are the new data for the astronaut
   */
  public static async updateAstronaut(astronautId: number, astronaut: AstronautForm) {
    await axios.request({
      method: "PUT",
      url: `http://localhost:3001/astronauts/${astronautId}`,
      data: astronaut
    })
  }

  /**
   * Method sends request to remove astronaut by given id
   * @param astronautId is id of the astronaut that should be deleted
   */
  public static async deleteAstronaut(astronautId: number): Promise<void> {
    await axios.request({
      method: "DELETE",
      url: `http://localhost:3001/astronauts/${astronautId}`
    });
  }
}

export default HttpResource;