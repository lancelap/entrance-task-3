<template>
  <div :class="['input-field', fieldClassModifier]">
    <input-label
      className="input-field__label"
      :inputId="inputId"
      :labelText="labelText"/>

    <single-input
      :value="value"
      @input="updateValue"
      classInput="input-field__input"
      :placehoderText="placehoderText"
      :inputType="inputType"
      :inputName="inputName"
      :inputId="inputId"

      @toggleFocus="toggleFocus()"
      :pressedDown="pressedDown"

      @clickOnBtn="clickOnBtn()"
      iconClassModifier="btn-icon__icon--edit"
      buttonClass="btn-icon--grey"
      imgSvg="#close">
    </single-input>

  </div>
</template>


<script>
import InputLabel from '@/components/InputLabel'
import SingleInput from '@/components/SingleInput'

export default {
  props: {
    value: {
      type: String,
      required: false
    },
    inputId: {
      type: String,
      required: true
    },
    inputType: {
      type: String,
      default: 'text'
    },
    placehoderText: {
      type: String,
      default: 'Введите текст'
    },
    inputName: {
      type: String,
      required: true
    },
    className: {
      type: String,
      required: false
    },
    labelText: {
      type: String,
      required: false
    },
    fieldClassModifier: {
      type: String,
      required: false
    },
    inputClassModifier: {
      type: String,
      required: false
    }
  },
  data: function () {
    return {
      pressedDown: false
    }
  },
  methods: {
    clickOnBtn: function () {
      this.$emit('clearInput')
    },
    updateValue: function (value) {
      this.$emit('input', value)
    },
    toggleFocus: function () {
      this.pressedDown = !this.pressedDown
    }
  },
  components: {
    'input-label': InputLabel,
    'single-input': SingleInput
  }
}
</script>
