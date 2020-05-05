import IInspectionSlot from "../models/InspectionSlot";
import axios, { AxiosRequestConfig } from "axios";
import InspectionSlotsFactory from "../helpers/inspectionSlotsFactory.helper";

class InspectionSlotsService {
  // TODO: make a config file and store the base api URL there.
  private static apiUrl = "https://carsome-api.herokuapp.com/api/inspection-slots";
  private static headers = {
    "Content-Type": "application/json",
  };

  /**
   * getList
   */
  public static async getList(day: Date): Promise<Array<IInspectionSlot>> {
    const notAvailableSlots: Array<IInspectionSlot> = await this.getNotAvailableList(day);

    const result: Array<IInspectionSlot> = await InspectionSlotsFactory.generate({ day, notAvailableSlots });

    return result;
  }

  /**
   * getNotAvailableList
   */
  public static async getNotAvailableList(day?: Date): Promise<Array<IInspectionSlot>> {
    const options: AxiosRequestConfig = {
      headers: this.headers,
      params: { day: day!.toLocaleString("en-US", { timeZone: "Asia/Kuala_Lumpur" }) },
    };
    const url = `${this.apiUrl}/not-available`;
    const result = await axios.get(url, options);

    if (result.data.code !== "0000") {
      // TODO: add proper error handeling.
      throw new Error();
    }

    return result.data.data as Array<IInspectionSlot>;
  }

  /**
   * bookSlot
   */
  public static async bookSlot(slot: IInspectionSlot): Promise<boolean> {
    const options: AxiosRequestConfig = {
      headers: this.headers,
    };

    const body = {
      from: slot.from.toLocaleString("en-US", { timeZone: "Asia/Kuala_Lumpur" }),
    };

    const result = await axios.post(this.apiUrl, body, options);

    if (result.data.code !== "0000") {
      // TODO: add proper error handeling.
      throw new Error();
    }

    return true;
  }
}

export default InspectionSlotsService;
