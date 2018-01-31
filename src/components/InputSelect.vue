<template>
  <div v-click-outside="clickOutside" :class="['input-field', fieldClassModifier]">
    <input-label
      className="input-field__label"
      :inputId="inputId"
      :labelText="labelText">
    </input-label>

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

      @clickOnBtn="clickOnBtn"
      buttonClass="btn-icon--grey"
      imgSvg="#arrow"
      iconClassModifier="btn-icon__icon--black-arrow">
    </single-input>

    <input-feld-list
      @pickItem="pickItem"
      :pressedDown="pressedDown"
      :inputValue="value"
      :pickedItems="pickedItems"
      :dataArr="dataArr">
    </input-feld-list>

    <input-list
      @deleteItem="deleteItem"
      :dataArr="dataArr"
      :pickedItems="pickedItems">
    </input-list>
  </div>
</template>

<script>
import InputFeldList from '@/components/InputFeldList'
import InputLabel from '@/components/InputLabel'
import InputList from '@/components/InputList'
import SingleInput from '@/components/SingleInput'

export default {
  props: {
    value: {
      type: String,
      required: false
    },
    dataArr: {
      type: Array,
      required: true
    },
    pickedItems: {
      type: Array,
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
    labelText: {
      type: String,
      required: true
    },
    placehoderText: {
      type: String,
      required: false
    },
    inputName: {
      type: String,
      required: true
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
      pressedDown: false,
      outside: false
    }
  },
  methods: {
    pickItem: function (itemId) {
      this.$emit('pickItem', itemId)
    },
    updateValue: function (value) {
      this.$emit('input', value)
    },
    toggleFocus: function () {
      this.pressedDown = true
    },
    clickOutside: function () {
      this.pressedDown = false
    },
    deleteItem: function (id) {
      this.$emit('deleteItem', id)
    },
    clickOnBtn: function () {
      this.pressedDown = false
    }
  },
  components: {
    'input-label': InputLabel,
    'input-feld-list': InputFeldList,
    'input-list': InputList,
    'single-input': SingleInput
  }
}
</script>
