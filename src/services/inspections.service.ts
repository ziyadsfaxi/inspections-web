import IInspectionSlot from "../models/InspectionSlot";
import axios, { AxiosRequestConfig } from "axios";
import InspectionSlotsFactory from "../helpers/inspectionSlotsFactory.helper";

class InspectionSlotsService {
  // TODO: make a config file and store the base api URL there.
  private static apiUrl = "http://localhost:5000/api/inspection-slots";
  private static headers = {
    "Content-Type": "application/json",
  };

  /**
   * getList
   */
  public static async getList (day: Date): Promise<Array<IInspectionSlot>> {
    const notAvailableSlots: Array<IInspectionSlot> = await this.getNotAvailableList(day);

    const result: Array<IInspectionSlot> = await InspectionSlotsFactory.generate({ day, notAvailableSlots });

    return result;
  }

  /**
   * getNotAvailableList
   */
  public static async getNotAvailableList (day?: Date): Promise<Array<IInspectionSlot>> {
    const options: AxiosRequestConfig = {
      headers: this.headers,
      params: { day },
    };
    const url = `${this.apiUrl}/not-available`;
    const result = await axios.get(url, options);

    // TODO: add proper error handeling.

    return result.data.data as Array<IInspectionSlot>;
  }
}

export default InspectionSlotsService;
