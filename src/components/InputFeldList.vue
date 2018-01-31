<template>
  <ul
    v-if="pressedDown"
    class="input-field__list">
    <li
      v-for="item in filteredData"
      @pickItem="pickItem"
      :key="item.id"
      v-bind="item"
      is="input-feld-item">
    </li>
  </ul>
</template>

<script>
import InputFeldItem from '@/components/InputFeldItem'

export default {
  props: {
    dataArr: {
      type: Array,
      required: true
    },
    inputValue: {
      type: String,
      default: ''
    },
    pickedItems: {
      type: Array,
      required: false
    },
    pressedDown: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    filteredData: function () {
      return this.dataArr.filter((item) => {
        if (item.login.indexOf(this.inputValue) === -1) {
          return false
        }
        if (this.pickedItems.indexOf(item.id) !== -1) {
          return false
        }
        return true
      }
      )
    }
  },
  methods: {
    pickItem: function (itemId) {
      this.$emit('pickItem', itemId)
    }
  },
  components: {
    'input-feld-item': InputFeldItem
  }
}
</script>
