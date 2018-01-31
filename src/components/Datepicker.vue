<template>
  <div class="calendar__date-picker">
    <div class="calendar__change-day calendar__change-day--previous">
      <btn-icon
        @clickOnBtn="changeMonth('previous')"
        buttonClass="btn-icon--circle btn-icon--arrow"
        imgSvg="#arrow"
        iconClassModifier="btn-icon__icon btn-icon__icon--edit">
      </btn-icon>
    </div>
    <h2 class="calendar__picked-mounth">{{formatedMonth}}</h2>
    <div class="calendar__change-day calendar__change-day--next">
      <btn-icon
        @clickOnBtn="changeMonth('next')"
        buttonClass="btn-icon--circle btn-icon--arrow"
        imgSvg="#arrow"
        iconClassModifier="btn-icon__icon btn-icon__icon--edit">
      </btn-icon>
    </div>
    <ul class="calendar__weekdays">
      <li class="calendar__weekday">Пн</li>
      <li class="calendar__weekday">Вт</li>
      <li class="calendar__weekday">Ср</li>
      <li class="calendar__weekday">Чт</li>
      <li class="calendar__weekday">Пт</li>
      <li class="calendar__weekday">Сб</li>
      <li class="calendar__weekday">Вс</li>
    </ul>
    <ul class="calendar__days">
      <li v-for="n in days[0].dayOfWeek - 1" :key="n" class="calendar__day"></li>
      <li v-for="day in days"
        :key="day.timestamp"
        :class="['calendar__day', {'calendar__day--active': day.isToday}]">
          <a v-if="!day.isToday" href="#"
            @click.prevent="selectDay(day.timestamp)">
            {{day.date}}
          </a>
          <span v-if="day.isToday">{{day.date}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import BtnIcon from '@/components/BtnIcon'

export default {
  props: {
    currentDay: Number,
    currentDateWithoutTime: Number
  },
  data: function () {
    return {
      selectedDay: this.currentDay
    }
  },
  computed: {
    formatedMonth: function () {
      const month = new Date(this.selectedDay)

      return `${month.toLocaleString('ru', {month: 'long'})}`
    },
    days: function () {
      const d = new Date(this.selectedDay)
      let onlyDay = new Date(d.getFullYear(), d.getMonth(), 1)
      let dObj = new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes())
      let daysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
      let days = []
      let localDay = dObj.getDay()

      if (localDay === 0) {
        localDay = 7
      }

      for (let i = 0; i < daysInMonth; i++) {
        let localDay = dObj.getDay()

        if (localDay === 0) {
          localDay = 7
        }

        days.push({
          date: dObj.getDate(),
          timestamp: dObj.getTime(),
          dayOfWeek: localDay,
          isToday: onlyDay.getTime() === this.currentDateWithoutTime
        })

        onlyDay.setDate(onlyDay.getDate() + 1)
        dObj.setDate(dObj.getDate() + 1)
      }

      return days
    }
  },
  methods: {
    selectDay: function (day) {
      this.$emit('selectDay', day)
    },
    changeMonth: function (month) {
      const newDay = new Date(this.selectedDay)

      switch (month) {
        case 'next':
          this.selectedDay = newDay.setMonth(newDay.getMonth() + 1)
          break

        case 'previous':
          this.selectedDay = newDay.setMonth(newDay.getMonth() - 1)
          break

        default:
          break
      }
    }
  },
  components: {
    'btn-icon': BtnIcon
  }
}
</script>
