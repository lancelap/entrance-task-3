<template>
  <li class="timetable__list-rooms-item">
    <div
      :class="[
        'room-elem',
        {'room-elem--hover': hoverRoom === id && availableTime,
        'room-elem--disabled': !availableTime,
        'room-elem--compact': compactRoom}]">
      <p class="room-elem__name">{{title}}</p>
      <p class="room-elem__capacity">{{capacity}} человек</p>
    </div>
    <slot-list
      @goToForm="goToForm"
      @toggleElement="toggleElement"
      @changeVacancy="changeVacancy"
      @toggleTooltip="toggleTooltip"
      :floor="floor"
      :roomId="id"
      :roomTitle="title"
      :currentEvents="currentEvents"
      :currentDateWithoutTime="currentDateWithoutTime"
      :idActiveTooltip="idActiveTooltip"
      @handlerHoverRoom="handlerHoverRoom"
      :hoverRoom="hoverRoom"/>
  </li>
</template>

<script>
import SlotList from '@/components/SlotList'

export default {
  props: {
    id: String,
    title: String,
    capacity: Number,
    floor: Number,
    events: Array,
    currentDateWithoutTime: Number,
    compactRoom: Boolean,
    idActiveTooltip: String,
    hoverRoom: String
  },
  data: function () {
    return {
      isHover: false,
      availableTime: false
    }
  },
  computed: {
    currentEvents: function () {
      if (Array.isArray(this.events)) {
        return this.events.filter(event => {
          if (Date.parse(event.dateStart) > this.currentDateWithoutTime &&
              Date.parse(event.dateEnd) < this.currentDateWithoutTime + 3600 * 24 * 1000) {
            return true
          }
          return false
        })
      }
      return []
    }
  },
  methods: {
    toggleElement: function (isHover) {
      this.isHover = isHover
    },
    changeVacancy: function (availableTime) {
      this.availableTime = availableTime
    },
    goToForm: function (data) {
      this.$emit('goToForm', data)
    },
    toggleTooltip: function (id) {
      this.$emit('toggleTooltip', id)
    },
    handlerHoverRoom: function (id) {
      this.$emit('handlerHoverRoom', id)
    }
  },
  components: {
    'slot-list': SlotList
  }
}
</script>
