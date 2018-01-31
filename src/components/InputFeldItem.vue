<template>
    <li
      class="input-field__list-item">
      <a @click.prevent="pickItem(id)" href="#">
        <img class="input-field__item-avatar" :src="avatarUrl" :alt="login">
        <span class="input-field__name">{{login}}</span>
        <span class="input-field__floor">{{homeFloor}} этаж</span>
      </a>
    </li>
</template>

<script>
export default {
  props: {
    avatarUrl: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    login: {
      type: String,
      required: true
    },
    homeFloor: {
      type: Number,
      required: true
    }
  },
  methods: {
    pickItem: function (itemId) {
      this.$emit('pickItem', itemId)
    }
  }
}
</script>

