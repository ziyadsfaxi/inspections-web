class TimeHelper {
  /**
   * static async parseDateToTime
   */
  public static parseDateToTime(date: Date) {
    date = new Date(date);

    return `${date.getHours()}:${date.getMinutes()}`;
  }
}

export default TimeHelper;
