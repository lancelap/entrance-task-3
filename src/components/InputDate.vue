<template>
  <div :class="['input-field', fieldClassModifier]">
    <input-label
      className="input-field__label"
      classNameMobileText="input-field__text-time"
      mobileText="и время"
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
      :inputClassModifier="inputClassModifier"

      @clickOnBtn="clickOnBtn()"
      iconClassModifier=""
      buttonClass="btn-icon--grey"
      imgSvg="#calendar">
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
  // computed: {
  //   dateMeeting: function () {
  //     const format = 'dd LLLL, yyyy hh:mm'
  //     const locale = {locale: 'ru'}
  //     return {
  //       dateEnd: DateTime.fromFormat(`${this.date} ${this.timeEnd}`, format, locale),
  //       dateStart: DateTime.fromFormat(`${this.date} ${this.timeStart}`, format, locale)
  //     }
  //   }
  // },
  methods: {
    updateValue: function (value) {
      this.$emit('input', value)
    },
    clickOnBtn: function () {
    }
  },
  components: {
    'input-label': InputLabel,
    'single-input': SingleInput
  }
}
</script>
