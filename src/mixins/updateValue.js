const updateValue = {
  methods: {
    updateValue: function (value) {
      this.$emit('input', value)
    }
  }
}

export default updateValue
