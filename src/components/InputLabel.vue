<template>
  <label :class="className" :for="inputId">
    {{labelText}}
    <span :class="classNameMobileText" v-if="mobileText" >{{mobileText}}</span>
  </label>
</template>

<script>
export default {
  props: {
    labelText: {
      type: String,
      required: false
    },
    mobileText: {
      type: String,
      required: false
    },
    inputId: {
      type: String,
      required: true
    },
    className: {
      type: String,
      required: false
    },
    classNameMobileText: {
      type: String,
      required: false
    }
  }
}
</script>

