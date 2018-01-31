<template>
  <div class="timetable">
    <div class="timetable__calendar">
      <timetable-calendar
        :currentDay="currentDay"
        :isOpenDatapicker="isOpenDatapicker"
        @toggleDatapicker="toggleDatapicker"
        @nextDay="nextDay"
        @previousDay="previousDay"
        @selectDay="selectDay"/>
      <datepicker
        v-if="isOpenDatapicker"
        :currentDateWithoutTime="currentDateWithoutTime"
        v-click-outside="outside"
        :currentDay="currentDay"
        @selectDay="selectDay"/>
    </div>
    <timetable-table
      @goToForm="goToForm"
      :currentDay="currentDay"
      :currentDateWithoutTime="currentDateWithoutTime"/>
  </div>
</template>

<script>
import Calendar from '@/components/Calendar'
import Datepicker from '@/components/Datepicker'
import TimetableTable from '@/components/TimetableTable'

export default {
  data: function () {
    return {
      currentDay: null,
      isOpenDatapicker: false
    }
  },
  created: function () {
    this.currentDay = new Date().getTime()
    setInterval(this.updateDateTime, 30000)
  },
  computed: {
    currentDateWithoutTime: function () {
      const date = new Date(this.currentDay)
      const dateWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate())
      return dateWithoutTime.getTime()
    }
  },
  methods: {
    updateDateTime: function () {
      let date = new Date(this.currentDay)
      const now = new Date()
      date.setHours(now.getHours(), now.getMinutes())
      this.currentDay = date.getTime()
    },
    nextDay: function () {
      let nextDay = new Date(this.currentDay)
      nextDay.setDate(nextDay.getDate() + 1)
      this.currentDay = nextDay.getTime()
    },
    previousDay: function () {
      let previousDay = new Date(this.currentDay)
      previousDay.setDate(previousDay.getDate() - 1)
      this.currentDay = previousDay.getTime()
    },
    selectDay: function (time) {
      this.currentDay = time
    },
    outside: function () {
      if (this.isOpenDatapicker === true) {
        this.toggleDatapicker()
      }
    },
    toggleDatapicker: function () {
      this.isOpenDatapicker = !this.isOpenDatapicker
    },
    goToForm: function (data) {
      this.$emit('goToForm', data)
    }
  },
  components: {
    'timetable-calendar': Calendar,
    'datepicker': Datepicker,
    'timetable-table': TimetableTable
  }
}
</script>
