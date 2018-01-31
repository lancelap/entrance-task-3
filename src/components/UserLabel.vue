<template>
  <div class="user-label">
    <p class="user-label__name">{{login}}</p>
    <button @click.prevent="deleteUser(id)" class="btn-icon btn-icon--user">
      <svg class="btn-icon__icon btn-icon__icon">
        <use xlink:href="#close"></use>
      </svg>
    </button>
    <img class="user-label__avatar" :src="avatarUrl" :alt="login">
  </div>
</template>

<script>
export default {
  props: ['id', 'login', 'avatarUrl'],
  methods: {
    deleteUser: function (id) {
      this.$emit('deleteItem', id)
    }
  }
}
</script>
