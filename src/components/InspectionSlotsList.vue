<template>
  <div class="content">
    <!-- start of notification -->
    <!-- env of notification -->
    <div class="calender-container">
      <Calender
        ref="calender"
        is-expanded
        :columns="$screens({ default: 1, lg: 2 })"
        :available-dates="availableDates"
        :attributes="calenderAttributes"
        :selected-date="new Date()"
        @dayclick="dayClicked"
      >
      </Calender>
    </div>
    <div v-if="!slots.length" class="card">
      <div class="card-body">
        Please select a valid date 👆 to show the available slots.
      </div>
    </div>
    <table v-if="slots.length" class="table table-bordered  table-hover">
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
        <tr v-for="(slot, index) of slots" :key="index" v-on:click="slotClicked(slot)">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ new Date(slot.from).toDateString() }}</td>
          <td>{{ new Date(slot.from).toTimeString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// TODO: seperate files.
import Calender from "v-calendar/lib/components/calendar.umd";
import InspectionSlotsService from "../services/inspections.service";
import TimeHelper from "../helpers/time.helper";
import Vue from "vue";

const errorMessage = "Unexpected Error, please try again 🥺😭";

export default {
  name: "InspectionSlotsList",
  components: {
    // DatePicker,
    Calender,
  },
  data() {
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
        weekdays: [2, 3, 4, 5, 6, 7],
      },
      selectedDay: new Date(),
      slots: [],
    };
  },
  computed: {},
  async mounted() {
    const { calender } = this.$refs;
    await calender.focusDate(new Date());
    this.updateList();
  },
  methods: {
    dayClicked(day) {
      this.selectedDay = new Date(day.date);
      this.updateList();
    },
    async slotClicked(slot) {
      try {
        this.$modal.show("dialog", {
          title: "Are you sure?",
          text: `Would you like to confirm your booking on ${TimeHelper.parseDateToTime(slot.from)} ${new Date(slot.from).toDateString()}?`,
          buttons: [
            {
              title: "Book ✅",
              handler: async () => {
                await InspectionSlotsService.bookSlot(slot);
                Vue.toasted.success("The slot is successfully booked ✅, we will be waiting for you 🥰");
                this.updateList();
                this.$modal.hide("dialog");
              },
            },
            {
              title: "Close",
            },
          ],
        });
        return;
      } catch (error) {
        Vue.toasted.error(errorMessage);
      }
    },
    async updateList() {
      try {
        const list = await InspectionSlotsService.getList(this.selectedDay);
        this.slots = list;
      } catch (error) {
        // TODO: add proper error handeling.
        Vue.toasted.error(errorMessage);
      }
    },
  },
};
</script>

<style>
.calender-container {
  margin-bottom: 20px;
}
</style>
