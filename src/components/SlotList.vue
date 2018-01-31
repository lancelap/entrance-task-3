<template>
  <div>
    <room-slot
      v-for="slot in slots"
      @goToForm="goToForm"
      @toggleElement="toggleElement"
      @toggleTooltip="toggleTooltip"
      :floor="floor"
      :roomId="roomId"
      :roomTitle="roomTitle"
      :dateStart="slot.dateStart"
      :dateEnd="slot.dateEnd"
      :eventId="slot.id"
      :idActiveTooltip="idActiveTooltip"
      :key="slot.id"
      @handlerHoverRoom="handlerHoverRoom"
      :hoverRoom="hoverRoom"/>
  </div>
</template>

<script>
import RoomSlot from '@/components/RoomSlot'

export default {
  props: {
    roomId: String,
    roomTitle: String,
    currentEvents: Array,
    currentDateWithoutTime: Number,
    floor: Number,
    idActiveTooltip: String,
    hoverRoom: String
  },
  computed: {
    slots: function () {
      const date = new Date(this.currentDateWithoutTime)
      const minStartDate = returnNewDateWithTime(7, 14)
      const maxEndDate = returnNewDateWithTime(23, 57)
      let slots = []

      if (this.currentEvents.length === 0) {
        this.changeVacancy(true)
        slots.push(
          {
            dateStart: minStartDate,
            dateEnd: maxEndDate,
            timestamp: minStartDate - maxEndDate
          }
        )
        return slots
      }

      const events = sortEvents(this.currentEvents)
      slots = events.reduce((acc, event, index, array) => {
        let eventDateStart = new Date(event.dateStart)
        let eventDateEnd = new Date(event.dateEnd)

        if (eventDateEnd - eventDateStart < 0) {
          let buf
          buf = eventDateStart
          eventDateStart = eventDateEnd
          eventDateEnd = buf
        }

        if (acc.length === 0) {
          if (eventDateStart !== minStartDate) {
            this.changeVacancy(true)
            acc.push(
              {
                dateStart: minStartDate,
                dateEnd: eventDateStart
              }
            )
          }

          acc.push(
            {
              dateStart: eventDateStart,
              dateEnd: eventDateEnd,
              id: event.id
            }
          )

          return acc
        }

        const lastElement = acc[acc.length - 1]
        if (eventDateStart !== lastElement.dateEnd) {
          this.changeVacancy(true)
          acc.push(
            {
              dateStart: lastElement.dateEnd,
              dateEnd: eventDateStart
            }
          )
        }

        acc.push(
          {
            dateStart: eventDateStart,
            dateEnd: eventDateEnd,
            id: event.id
          }
        )
        return acc
      }, [])

      // добавляем последний слот
      const lastSlot = slots[slots.length - 1]
      if (lastSlot.dateEnd < maxEndDate) {
        this.changeVacancy(true)
        slots.push(
          {
            dateStart: lastSlot.dateEnd,
            dateEnd: maxEndDate
          }
        )
      }

      return slots

      function returnNewDateWithTime (hour, minutes) {
        return new Date(date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          hour,
          minutes)
      }
      function sortEvents (events) {
        return events.concat().sort((a, b) => {
          return Date.parse(a.dateStart) - Date.parse(b.dateStart)
        })
      }
    }
  },
  methods: {
    toggleElement: function (isHover) {
      this.$emit('toggleElement', isHover)
    },
    changeVacancy: function (availableTime) {
      this.$emit('changeVacancy', availableTime)
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
    'room-slot': RoomSlot
  }
}
</script>

