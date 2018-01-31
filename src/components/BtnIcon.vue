<template>
  <!--
    #########TODO#########
    Решить проблему невидимых кнопок и их фокуса.
    Возможно стоит убрать tabindex и поправить стили
    для фокуса табом.
  -->
  <button
    :type="typeButton"
    @click.prevent="clickOnBtn"
    tabindex="-1"
    :class="['btn-icon', buttonClass]">
    <svg
      slot="image"
      :class="['btn-icon__icon', iconClassModifier]">
      <use :xlink:href="imgSvg"></use>
    </svg>
  </button>
</template>

<script>
export default {
  props: {
    buttonClass: {
      type: String,
      requre: true
    },
    imgSvg: {
      type: String,
      requre: true
    },
    iconClassModifier: {
      type: String,
      default: 'btn-icon__icon'
    },
    typeButton: {
      type: String,
      default: 'button'
    }
  },
  methods: {
    clickOnBtn: function () {
      this.$emit('clickOnBtn')
    }
  }
}
</script>

