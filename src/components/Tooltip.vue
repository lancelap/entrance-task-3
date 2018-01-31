<template>
  <div class="tooltip">
      <div class="tooltip__arrow"
        @click="handlerClick"
        v-bind:style="styleBody.arrow"></div>
        <portal to="destination">
      <div
        class="tooltip__body"
        ref="tooltip__body"
        v-bind:style="styleBody.body">
        <btn-icon
          @clickOnBtn="clickOnBtn({
              initDateEvent: dateEvent,
              initTimeStart: timeStart,
              initTimeEnd: timeEnd,
              initRoomId: roomId,
              initRoomTitle: roomTitle,
              initShortDateEvent: shortDateEvent,
              initEventId: eventId,
              initEventTitle: eventTitle,
              initUsers: usersArr,
              initFloor: floor
            })"
          buttonClass="btn-icon--edit"
          imgSvg="#edit"
          iconClassModifier="btn-icon__icon--edit">
        </btn-icon>

        <h2 class="tooltip__headline">{{eventTitle}}</h2>
        <p class="tooltip__place-and-data-info">
          {{shortDateEvent}}, {{timeStart}}‒{{timeEnd}}
          <span class="tooltip__place-text">{{roomTitle}}</span>
        </p>
        <div class="tooltip__list-members">
          <img class="tooltip__member-img" :src="users[0].avatarUrl">
          <p class="tooltip__members">
            <span class="tooltip__name-member">{{nameGeneralMember}}</span>
            <span class="tooltip__other-members">{{otherMembers}}</span>
          </p>
        </div>
      </div>
    </portal>
  </div>
</template>

<script>
import BtnIcon from '@/components/BtnIcon'

export default {
  props: {
    roomId: String,
    roomTitle: String,
    eventId: String,
    shortDateEvent: String,
    dateEvent: String,
    timeStart: String,
    timeEnd: String,
    users: Array,
    eventTitle: String,
    floor: Number,
    mouseClickX: Number,
    bottom: Number
  },
  components: {
    'btn-icon': BtnIcon
  },
  computed: {
    nameGeneralMember: function () {
      const name = this.users[0].login
      return name[0].toUpperCase() + name.substring(1)
    },
    otherMembers: function () {
      const membersNum = this.users.length
      if (membersNum === 2) {
        return 'и 1 участник'
      } else if (membersNum > 2) {
        return `и ${membersNum - 1} участников`
      }
    },
    usersArr: function () {
      return this.users.map((user) => {
        return user.id
      })
    },
    styleBody: function () {
      const documentWidth = document.documentElement.clientWidth
      const halfElWidth = 180
      let bodyLeft = this.mouseClickX + 'px'
      let bodyRight = 'unset'
      let arrowLeft = this.mouseClickX

      if (documentWidth - this.mouseClickX < halfElWidth) {
        bodyLeft = 'unset'
        bodyRight = 0 + 'px'
        arrowLeft = this.mouseClickX < documentWidth - 14 ? this.mouseClickX : documentWidth - 14
      }
      if (this.mouseClickX < halfElWidth) {
        bodyLeft = halfElWidth + 'px'
        bodyRight = 'unset'
        arrowLeft = this.mouseClickX > 14 ? this.mouseClickX : 14
      }

      return {
        body: {
          left: bodyLeft,
          right: bodyRight,
          top: this.bottom + 'px'
        },
        arrow: {
          top: this.bottom + 'px',
          left: arrowLeft + 'px'
        }
      }
    }
  },
  methods: {
    clickOnBtn: function (data) {
      this.$emit('goToForm', data)
    },
    handlerClick: function () {
      this.$emit('handlerClick')
    }
  }
}
</script>

