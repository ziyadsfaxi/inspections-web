<template>
  <div class="content">
    <Calender
      ref="calender"
      is-expanded
      :columns="$screens({ default: 1, lg: 2 })"
      :available-dates="availableDates"
      :attributes="calenderAttributes"
      :selected-date="new Date()"
      @dayclick="dayClicked"
    >
      >
    </Calender>
    <table class="table table-bordered  table-hover">
      <caption>
        List of available slots
      </caption>
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(slot, index) of slots" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ new Date(slot.from).toDateString() }}</td>
          <td>{{ new Date(slot.from).toTimeString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Calender from "v-calendar/lib/components/calendar.umd";
import InspectionSlotsService from "../services/inspections.service";

export default {
  name: "InspectionSlotsList",
  components: {
    // DatePicker,
    Calender,
  },
  data () {
    return {
      calenderAttributes: [
        {
          key: "disabled-dates",
          dates: {},
          excludeDates: {
            start: new Date(),
            span: 21,
          },
          popover: {
            label: "This date is not available for booking.",
          },
        },
      ],
      availableDates: {
        start: new Date(),
        span: 21,
      },
      selectedDay: new Date(),
      slots: [],
    };
  },
  computed: {},
  async mounted () {
    const { calender } = this.$refs;

    await calender.focusDate(new Date());
  },
  methods: {
    dayClicked (day) {
      this.selectedDay = new Date(day.date);
      this.updateList();
    },

    async updateList () {
      const list = await InspectionSlotsService.getList(this.selectedDay);
      console.log(list[0]);
      this.slots = list;
    },
  },
};
</script>

<style>
.table {
  margin-top: 20px;
}
</style>
