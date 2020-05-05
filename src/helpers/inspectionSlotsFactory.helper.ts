import IInspectionSlot from "../models/InspectionSlot";

class InspectionSlotsFactory {
  public static async generate(
    { day, notAvailableSlots }: { day: Date; notAvailableSlots: Array<IInspectionSlot> },
  ): Promise<Array<IInspectionSlot>> {
    const generated: Array<IInspectionSlot> = [];

    let date = new Date(day);
    date.setHours(9);
    console.log("init: ", date);

    for (let index = 0; index < 18; index++) {
      console.log("canBook?", date);

      const canBook = await this.canBook({ time: date, notAvailableSlots });
      if (canBook) {
        generated.push(
          {
            from: date,
          } as IInspectionSlot,
        );
      }

      date = new Date(date.getTime() + 1800000);
    }
    return generated;
  }

  public static async canBook({ time, notAvailableSlots }: { time: Date; notAvailableSlots: Array<IInspectionSlot> }): Promise<boolean> {
    const currentDate = new Date();
    // check if time is in 30 mins format.
    const allowedMinutesInterval = [0, 30];
    if (!allowedMinutesInterval.includes(time.getMinutes())) {
      return false;
    }

    // zero being Sunday.
    const officeOffDays = [0];
    if (officeOffDays.includes(time.getDay())) {
      return false;
    }

    const officeWorkingHours = { from: 9, to: 18 };
    if (time.getHours() < officeWorkingHours.from || time.getHours() >= officeWorkingHours.to) {
      return false;
    }

    // check if inspection is within 3 weeks.
    if (time.getTime() - currentDate.getTime() > 1814400000) {
      return false;
    }

    // check if inspection is within the same hour.
    if (time.getTime() - currentDate.getTime() <= 3600000) {
      return false;
    }

    if (!notAvailableSlots.length) {
      return true;
    }

    time.setSeconds(0);
    time.setMilliseconds(0);
    const bookings = notAvailableSlots.filter((slot: IInspectionSlot) => new Date(slot.from).getTime() === time.getTime());

    // cehck which weekday.
    const maxBookingsPerTime = time.getDay() === 6 ? 4 : 2;

    // cehck number of bookings available.
    if (bookings.length >= maxBookingsPerTime) {
      return false;
    }

    return true;
  }
}

export default InspectionSlotsFactory;
