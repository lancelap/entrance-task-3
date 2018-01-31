<template>
  <div
    @scroll="scrollTable"
    class="timetable__table" id="time-table">
    <div class="timetable__time">

      <ul class="timetable__list-hours">
        <li v-for="hourItem in hourList"
          :key="hourItem.index"
          :class="['timetable__item-hour', {'timetable__item-hour--next': hourItem.isNextHour}]">
          <span>{{hourItem.value}}</span>
        </li>
      </ul>

      <time-line :currentDay="currentDay" :currentHour="currentHour"/>
    </div>
    <timetable-list-floors
      @toggleTooltip="toggleTooltip"
      @goToForm="goToForm"
      :idActiveTooltip="idActiveTooltip"
      :compactRoom="compactRoom"
      :currentDay="currentDay"
      :currentDateWithoutTime="currentDateWithoutTime"/>
  </div>
</template>

<script>
import Timeline from '@/components/Timeline'
import TimetableListFloors from '@/components/TimetableListFloors'
import { throttle } from '.././utils'

export default {
  props: {
    currentDay: Number,
    currentDateWithoutTime: Number
  },
  data: function () {
    return {
      compactRoom: false,
      idActiveTooltip: null
    }
  },
  computed: {
    currentHour: function () {
      const hour = new Date(this.currentDay)
      return hour.getHours()
    },
    hourList: function () {
      let hours = []

      for (let index = 0; index < 16; index++) {
        const hour = {
          value: index + 8,
          index: index,
          isNextHour: index + 8 > this.currentHour
        }
        hours.push(hour)
      }

      return hours
    }
  },
  methods: {
    goToForm: function (data) {
      this.$emit('goToForm', data)
    },
    scrollTable: throttle(function (event) {
      if (event.target.scrollLeft >= 181) {
        this.compactRoom = true
      } else {
        this.compactRoom = false
      }
      this.idActiveTooltip = null
    }, 100),
    toggleTooltip: function (id) {
      this.idActiveTooltip = id
    },
    handleScroll: throttle(function () {
      this.idActiveTooltip = null
    }, 100)
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  components: {
    'time-line': Timeline,
    'timetable-list-floors': TimetableListFloors
  }
}
</script>
