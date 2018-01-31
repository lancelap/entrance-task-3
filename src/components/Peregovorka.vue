<template>
  <div
    @click="pickRoom"
    :class="['peregovorka', {'peregovorka--selected': selectedRoom === id}]">
    <span class="peregovorka__time">{{timeStart}}—{{timeEnd}}</span>
    <div class="peregovorka__place">
      <span class="peregovorka__name">{{roomTitle}}</span>
      <span class="peregovorka__floor">{{floor}} этаж</span>
    </div>
    <btn-icon
        @clickOnBtn="handlerClick"
        imgSvg="#close"
        iconClassModifier="btn-icon__icon">
    </btn-icon>
  </div>
</template>

<script>
import BtnIcon from '@/components/BtnIcon'

export default {
  props: {
    timeStart: String,
    timeEnd: String,
    roomTitle: String,
    floor: Number,
    selectedRoom: String,
    id: String
  },
  methods: {
    handlerClick: function () {
      this.$emit('deleteRoom')
    },
    pickRoom: function () {
      this.$emit('pickRoom', this.id, this.floor, this.roomTitle)
    }
  },
  components: {
    'btn-icon': BtnIcon
  }
}
</script>
