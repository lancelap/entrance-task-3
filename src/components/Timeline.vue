<template>
  <div>
    <span
      class="timetable__timeline timetable__timeline--now"
      :style="{left: offsetTimeline + 'px', display: this.displayTimeLine}">
    </span>
    <span
      class="timetable__item-hour timetable__item-hour--now"
      :style="{left: offsetTimeline + 'px', display: this.displayTimeLine}">
      {{currentTime}}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    currentDay: Number
  },
  computed: {
    hourAndMin: function () {
      const newDate = new Date(this.currentDay)
      let objTime = {}
      objTime = {
        hour: newDate.getHours(),
        minutes: newDate.getMinutes()
      }
      return objTime
    },
    currentTime: function () {
      let minutes
      if (this.hourAndMin.minutes < 10) {
        minutes = '0' + this.hourAndMin.minutes
      } else {
        minutes = this.hourAndMin.minutes
      }
      return `${this.hourAndMin.hour}:${minutes}`
    },
    offsetTimeline: function () {
      return 52 + 1.1 * 60 * (this.hourAndMin.hour - 8) + this.hourAndMin.minutes
    },
    displayTimeLine: function () {
      if (this.hourAndMin.hour > 23 || this.hourAndMin.hour < 8) {
        return 'none'
      }
      return 'block'
    }
  }
}
</script>

