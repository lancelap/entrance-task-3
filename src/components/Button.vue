<template>
  <button
    :type="typeButton"
    @click.prevent="clickOnBtn"
    :class="buttonClass">
    <slot>
      button
    </slot>
  </button>
</template>

<script>
export default {
  props: {
    buttonClass: {
      type: String,
      requre: true
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

