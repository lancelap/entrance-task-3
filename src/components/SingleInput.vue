<template>
  <div
    :class="[
        'input-field__input-with-icon',
        inputClassModifier,
        {'input-field__input-with-icon--pressed': pressedDown}
      ]">
    <input
      :value="value"
      @focus="toggleFocus()"
      @blur="toggleFocus()"
      @input="updateValue($event.target.value)"
      :class="classInput"
      :placeholder="placehoderText"
      :type="inputType"
      :name="inputName"
      :id="inputId">

    <btn-icon
      @clickOnBtn="clickOnBtn()"
      :buttonClass="buttonClass"
      :imgSvg="imgSvg"
      :iconClassModifier="iconClassModifier">
    </btn-icon>
  </div>
</template>

<script>
import BtnIcon from '@/components/BtnIcon'

export default {
  props: {
    pressedDown: {
      type: Boolean,
      required: false
    },
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
      required: false
    },
    inputName: {
      type: String,
      required: true
    },
    classInput: {
      type: String,
      required: true
    },
    buttonClass: {
      type: String,
      required: false
    },
    imgSvg: {
      type: String,
      required: false
    },
    iconClassModifier: {
      type: String,
      required: false
    },
    inputClassModifier: {
      type: String,
      required: false
    }
  },
  methods: {
    updateValue: function (value) {
      this.$emit('input', value)
    },
    clickOnBtn: function () {
      this.$emit('clickOnBtn')
    },
    toggleFocus: function () {
      this.$emit('toggleFocus')
    }
  },
  components: {
    'btn-icon': BtnIcon
  }
}
</script>


