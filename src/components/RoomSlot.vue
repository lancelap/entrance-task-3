<template>
    <div
      @click.self="activate"
      @mousemove="followTheCursor"
      @mouseenter="handlerHoverRoom(roomId)"
      @mouseleave="handlerHoverRoom(null)"
      :class="['timetable__slot-room',
        {'timetable__slot-room--active': idActiveTooltip === eventId && eventId,
         'timetable__slot-room--no-vacancy': eventId}]"
      :style="{left: style.left + 'px', width: style.width + 'px'}">
      <tooltip
        @handlerClick="activate"
        @goToForm="goToForm"
        v-if="idActiveTooltip === eventId && eventId"
        :floor="floor"
        :roomId="roomId"
        :roomTitle="roomTitle"
        :eventId="eventId"
        :shortDateEvent="shortDateEvent"
        :dateEvent="dateEvent"
        :timeStart="timeStart"
        :timeEnd="timeEnd"
        :users="event.users"
        :eventTitle="event.title"
        v-bind="coordinates"/>
      <slot-button
        @handlerClick="activate"
        v-show="desktop && !eventId && isHover"
        :slotButton="slotButton"
        :slotButtonX="slotButtonX"/>
    </div>
</template>

<script>
import { format } from 'date-fns/esm'
import { ru } from 'date-fns/esm/locale'
import gql from 'graphql-tag'
import Tooltip from '@/components/Tooltip'
import SlotButton from '@/components/SlotButton'
import { convertDate, throttle } from '.././utils'

export default {
  props: {
    roomId: String,
    roomTitle: String,
    dateStart: Date,
    dateEnd: Date,
    eventId: String,
    floor: Number,
    idActiveTooltip: String,
    hoverRoom: String
  },
  data: function () {
    return {
      isHover: false,
      slotButton: false,
      slotButtonX: 0,
      desktop: false,
      event: null,
      coordinates: {}
    }
  },
  computed: {
    style: function () {
      return {
        left: convertDate(this.dateStart),
        width: convertDate(this.dateEnd) - convertDate(this.dateStart)
      }
    },
    shortDateEvent: function () {
      return format(this.dateStart, 'DD MMMM', {locale: ru})
    },
    dateEvent: function () {
      return format(this.dateStart, 'DD MMMM, YYYY', {locale: ru})
    },
    timeStart: function () {
      return format(this.dateStart, 'HH:mm', {locale: ru})
    },
    timeEnd: function () {
      return format(this.dateEnd, 'HH:mm', {locale: ru})
    }
  },
  methods: {
    activate: function (event) {
      if (this.eventId) {
        if (this.idActiveTooltip === this.eventId) {
          this.$emit('toggleTooltip', null)
          return
        }
        const {bottom} = event.target.getBoundingClientRect()
        this.coordinates = { mouseClickX: event.clientX, bottom }
        this.$emit('toggleTooltip', this.eventId)
      } else {
        this.goToForm({
          initDateEvent: this.dateEvent,
          initTimeStart: this.timeStart,
          initTimeEnd: this.timeEnd,
          initRoomId: this.roomId,
          initRoomTitle: this.roomTitle,
          initFloor: this.floor
        })
      }
    },
    followTheCursor: throttle(function (event) {
      if (this.desktop) {
        let btnLeft = event.clientX - this.$el.getBoundingClientRect().left
        if (btnLeft > this.style.width - 27) {
          this.slotButtonX = this.style.width - 27
          return
        }
        if (this.style.left === 0 && btnLeft < 55) {
          this.slotButtonX = 50
          return
        } else if (btnLeft < 28) {
          this.slotButtonX = 28
          return
        } else if (btnLeft < 28) {
          this.slotButtonX = 28
          return
        } else if (btnLeft > this.style.width - 72) {
          this.slotButtonX = this.style.width - 72
          return
        }
        this.slotButtonX = btnLeft
      }
    }, 100),
    goToForm: function (data) {
      this.$emit('toggleTooltip', null)
      this.$emit('goToForm', data)
    },
    handlerHoverRoom: function (id) {
      this.isHover = !this.isHover
      this.$emit('handlerHoverRoom', id)
    }
  },
  apollo: {
    event: {
      query: gql`query loadEvent($id: ID!) {
        event(id: $id) {
          id
          title
          users {
            id
            login
            avatarUrl
          }
        }
      }`,
      skip: function () {
        return !this.eventId
      },
      variables: function () {
        return {
          id: this.eventId
        }
      }
    }
  },
  mounted: function () {
    if (window.innerWidth >= 1280) {
      this.desktop = true
    }
  },
  components: {
    'tooltip': Tooltip,
    'slot-button': SlotButton
  }
}
</script>

