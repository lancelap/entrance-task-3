<template>
  <a
    @click="handlerClick"
    class="timetable__slot-button"
    :style="{left: slotButtonX + 'px'}">
    <svg slot="image" class="btn-icon__icon btn-icon__icon--edit btn-icon__icon--plus">
        <use xlink:href="#close"></use>
    </svg>
  </a>
</template>

<script>
export default {
  props: {
    slotButton: Boolean,
    slotButtonX: Number
  },
  methods: {
    handlerClick: function () {
      this.$emit('handlerClick')
    }
  }
}
</script>

