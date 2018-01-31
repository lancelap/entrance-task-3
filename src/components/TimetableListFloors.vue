<template>
    <ul class="timetable__list-floors">
      <li
        v-for="floor in sortArrFloor"
        :key="floor"
        class="timetable__list-floors-item">
        <div class="timetable__floor-container">
          <div class="timetable__floor-number">{{floor}} этаж</div>
        </div>
        <ul class="timetable__list-rooms">
          <li
            is="room-item"
            @goToForm="goToForm"
            @toggleTooltip="toggleTooltip"
            v-for="roomItem in objRooms[floor]"
            :key="roomItem.id"
            :id="roomItem.id"
            :title="roomItem.title"
            :capacity="roomItem.capacity"
            :floor="roomItem.floor"
            :currentDateWithoutTime="currentDateWithoutTime"
            :events="eventsByRooms[roomItem.id]"
            :compactRoom="compactRoom"
            :idActiveTooltip="idActiveTooltip"
            @handlerHoverRoom="handlerHoverRoom"
            :hoverRoom="hoverRoom">
          </li>
        </ul>
      </li>
      <div class="timetable__list-white-padding"></div>
    </ul>
</template>

<script>
import gql from 'graphql-tag'
import RoomItem from '@/components/RoomItem'

export default {
  props: {
    currentDay: Number,
    currentDateWithoutTime: Number,
    compactRoom: Boolean,
    idActiveTooltip: String
  },
  data: function () {
    return {
      rooms: [],
      events: [],
      hoverRoom: null
    }
  },
  computed: {
    objRooms: function () {
      const arr = this.rooms
      return arr.reduce((accumObj, room) => {
        if (!accumObj.hasOwnProperty(room.floor)) {
          accumObj[room.floor] = []
        }
        accumObj[room.floor].push(room)
        return accumObj
      }, {})
    },
    sortArrFloor: function () {
      return Object.keys(this.objRooms).sort((a, b) => b - a)
    },
    eventsByRooms: function () {
      return this.events.reduce((acc, event) => {
        if (!acc.hasOwnProperty(event.room.id)) {
          acc[event.room.id] = []
        }
        acc[event.room.id].push(event)
        return acc
      }, {})
    }
  },
  methods: {
    goToForm: function (data) {
      this.$emit('goToForm', data)
    },
    toggleTooltip: function (id) {
      this.$emit('toggleTooltip', id)
    },
    handlerHoverRoom: function (id) {
      this.hoverRoom = id
    }
  },
  components: {
    'room-item': RoomItem
  },
  apollo: {
    rooms: {
      query: gql`query loadRooms{
        rooms {
          id
          title
          capacity
          floor
        }
      }`
    },
    events: {
      query: gql`query loadEvents{
        events {
          id
          dateStart
          dateEnd
          room {
            id
          }
        }
      }`,
      pollInterval: 600
    }
  }
}
</script>

