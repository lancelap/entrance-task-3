<template>
    <div class="calendar">
      <ul class="calendar__selected-day">
        <li class="calendar__change-day calendar__change-day--previous">
          <btn-icon
            @clickOnBtn="previousDay"
            buttonClass="btn-icon--circle"
            imgSvg="#arrow"
            iconClassModifier="btn-icon__icon btn-icon__icon--circle btn-icon__icon--edit">
          </btn-icon>
        </li>
        <li
          class="calendar__data"
          :class="{ 'calendar__data--pressed': isOpenDatapicker }">
          <a
            @click.stop.prevent="toggleDatapicker"
            href="#">{{dayAndMonth}}
            <span v-if="isToday" class="calendar__today">Сегодня</span>
          </a>
        </li>
        <li class="calendar__change-day calendar__change-day--next">
          <btn-icon
            @clickOnBtn="nextDay"
            buttonClass="btn-icon--circle"
            imgSvg="#arrow"
            iconClassModifier="btn-icon__icon btn-icon__icon--circle btn-icon__icon--edit">
          </btn-icon>
        </li>
      </ul>
    </div>
</template>


<script>
import BtnIcon from '@/components/BtnIcon'

export default {
  props: {
    currentDay: Number,
    isOpenDatapicker: Boolean
  },
  computed: {
    isToday: function () {
      const today = new Date()
      const currentDay = new Date(this.currentDay)

      if (currentDay.getDate() === today.getDate() &&
          currentDay.getMonth() === today.getMonth() &&
          currentDay.getYear() === today.getYear()) {
        return true
      }
      return false
    },
    dayAndMonth: function () {
      const currentDay = new Date(this.currentDay)
      const month = currentDay.getMonth()
      const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
      let sliceNum = 3
      if (!this.isToday) {
        sliceNum = months[month].length
      }
      return `${currentDay.getDate()} ${months[month].slice(0, sliceNum)}`
    }
  },
  methods: {
    toggleDatapicker: function () {
      this.$emit('toggleDatapicker')
    },
    nextDay: function () {
      this.$emit('nextDay')
    },
    previousDay: function () {
      this.$emit('previousDay')
    }
  },
  components: {
    'btn-icon': BtnIcon
  }
}
</script>

