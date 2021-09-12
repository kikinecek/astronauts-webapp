import { AxiosResponse } from "axios";
import axios from "axios";
import config from "./config";
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
      url: `${config.API_BASE_URL}/astronauts`

    })

    return astronauts.data.map(transformAstronautSerializedToDeserialized);
  }

  /**
   * Method sends request to create new astronaut by given data
   * @param astronaut are the astronaut data
   */
  public static async createAstronaut(astronaut: AstronautForm): Promise<void> {
    await axios.request({
      method: "POST",
      url: `${config.API_BASE_URL}/astronauts`,
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
      url: `${config.API_BASE_URL}/astronauts/${astronautId}`,
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
      url: `${config.API_BASE_URL}/astronauts/${astronautId}`,
    });
  }
}

export default HttpResource;