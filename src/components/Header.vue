<template>
  <div class="peregovorki-logo">
    <div class="peregovorki-container">
      <a href="/">
        <svg class="peregovorki-logo__img">
          <use xlink:href="#logo"></use>
        </svg>
      </a>
      <div v-if="isTimetable" class="peregovorki__btn-create">
        <button-elem
          @clickOnBtn="toggle"
          buttonClass="btn btn--primary">Создать встречу
        </button-elem>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button'

export default {
  props: {
    isTimetable: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    toggle: function () {
      this.$emit('toggle')
    }
  },
  components: {
    'button-elem': Button
  }
}
</script>

