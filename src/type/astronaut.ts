/** Core astronaut data that are always same type */
interface AstronautCore {
  name: string;
  surname: string;
  superpower: string;
};

/** Interface for astronaut form */
export interface AstronautForm extends AstronautCore {
  birthdate: Date;
};

/** 
 * Interface representing serialized Astroant's data
 * Used for data that comes from server
 */
export interface AstronautSerialized extends AstronautCore {
  id: string;
  birthdate: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
};

/** Interface representing deserialized astronaut's data */
export interface Astronaut extends AstronautCore {
  id: number;
  birthdate: Date;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
};

/**
 * Function transforms astronauts serialized data into deserialized format
 * @param data are the serialized data
 * @returns deserialized data
 */
export const transformAstronautSerializedToDeserialized = (
  data: AstronautSerialized
): Astronaut => ({
  ...data,
  id: parseInt(data.id),
  birthdate: new Date(data.birthdate),
  createdAt: new Date(data.createdAt),
  updatedAt: new Date(data.updatedAt)
})