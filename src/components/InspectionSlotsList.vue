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
      <!-- <caption>
        List of available slots
      </caption> -->
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-end">
        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">Next</a></li>
      </ul>
    </nav>
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
      console.table(list);
    },
  },
};
</script>

<style>
.table {
  margin-top: 20px;
}
</style>
