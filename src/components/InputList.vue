<template>
  <ul class="list-items">
    <li
      class="list-items__item"
      v-for="item in filteredData"
      :key="item.id">
      <user-label v-bind="item" @deleteItem="deleteItem">
      </user-label>
    </li>
  </ul>
</template>

<script>
import UserLabel from '@/components/UserLabel'

export default {
  props: ['dataArr', 'pickedItems'],
  computed: {
    filteredData: function () {
      return this.dataArr.filter((item) => {
        if (this.pickedItems.indexOf(item.id) === -1) {
          return false
        }
        return true
      })
    }
  },
  methods: {
    deleteItem: function (id) {
      this.$emit('deleteItem', id)
    }
  },
  components: {
    'user-label': UserLabel
  }
}
</script>

