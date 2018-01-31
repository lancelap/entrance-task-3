<template>
  <div class="modal-content">
    <div class="modal-content__window">
      <div v-if="alert">
        <svg class="modal-content__icon">
          <use width="45px" xlink:href="#emoji1"></use>
        </svg>
        <h2 class="modal-content__allert">
          {{alert}}
        </h2>
      </div>

      <div v-if="messageText">
        <svg class="modal-content__icon">
          <use width="45px" xlink:href="#emoji2"></use>
        </svg>
        <h2 class="modal-content__message">
          {{messageText}}
        </h2>
        <div class="modal-content__paragraph">
          <div class="modal-content__data">{{eventDate}}, {{timeStart}}—{{timeEnd}}</div>
          <div class="modal-content__place">{{roomTitle}}
            <span class="modal-content__floor">{{floor}} этаж</span>
          </div>
        </div>
      </div>

      <div class="modal-content__buttons">
        <button-elem
          v-if="alert"
          @clickOnBtn="cancel"
          buttonClass="btn btn--few-btn">Отмена
        </button-elem>
        <button-elem
          v-if="alert"
          @clickOnBtn="confirm"
          buttonClass="btn btn--few-btn">Удалить
        </button-elem>

        <button-elem
          v-if="messageText"
          @clickOnBtn="cancel"
          buttonClass="btn btn--primary btn--primary-big">Хорошо
        </button-elem>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button'

export default {
  props: {
    alert: {
      type: String,
      default: ''
    },
    messageText: {
      type: String,
      default: ''
    },
    roomTitle: {
      type: String,
      default: ''
    },
    eventDate: {
      type: String,
      default: ''
    },
    timeStart: {
      type: String,
      default: ''
    },
    timeEnd: {
      type: '',
      default: ''
    },
    floor: {
      type: Number,
      default: null
    }
  },
  methods: {
    cancel: function () {
      this.$emit('cancel')
    },
    confirm: function () {
      this.$emit('confirm')
    }
  },
  components: {
    'button-elem': Button
  }
}
</script>
