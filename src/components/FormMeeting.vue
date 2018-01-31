<template>
  <div>
    <form class="form-meeting" action="#">
      <div class="form-meeting__button-close-form">
        <btn-icon
          @clickOnBtn="closeForm"
          buttonClass="btn-icon--edit"
          imgSvg="#close"
          iconClassModifier="btn-icon__icon--edit">
        </btn-icon>
      </div>

      <h1 class="form-meeting__headline">
        {{eventId ? 'Редактирование встречи' : 'Новая встреча'}}
      </h1>

      <fieldset class="form-meeting__fieldset form-meeting__fieldset--theme-input">
        <input-with-icon
          v-model="themeInput"
          @clearInput="() => { themeInput = '' }"
          inputId="theme"
          inputName="theme"
          labelText="Тема"
          placehoderText="О чем будем говорить?">
        </input-with-icon>
      </fieldset>

      <fieldset class="form-meeting__fieldset form-meeting__fieldset--date-and-time">
        <input-date
          :value="timeInput"
          @input="value => { timeInput = value
            roomId = '' }"
          inputId="date-text"
          inputName="date-text"
          labelText="Дата"
          placehoderText="14 декабря, 2017"
          fieldClassModifier="input-field--date"
          inputClassModifier="input-field__input-with-icon--visible-icon">
        </input-date>

        <div class="input-field input-field--time">
          <input-label
            className="input-field__label input-field__label--time"
            inputId="time-start"
            labelText="Начало"/>
          <single-input
            :value="timeStart"
            @input="value => { timeStart = value
              roomId = '' }"
            classInput="input-field__input input-field__input--short"
            placehoderText="16:00"
            inputType="text"
            inputName="time-start"
            inputId="time-start">
          </single-input>
        </div>

        <span class="input-field__hyphen"></span>

        <div class="input-field input-field--time">
          <input-label
            className="input-field__label input-field__label--time"
            inputId="time-end"
            labelText="Конец"/>
          <single-input
            :value="timeEnd"
            @input="value => { timeEnd = value
              roomId = '' }"
            classInput="input-field__input input-field__input--short"
            placehoderText="16:30"
            inputType="text"
            inputName="time-end"
            inputId="time-end">
          </single-input>
        </div>
      </fieldset>

      <div class="form-meeting__offset"></div>

      <fieldset class="form-meeting__fieldset">
        <input-select
          :value="usersInput"
          @input="value => { usersInput = value }"
          :pickedItems="pickedUsers"
          @pickItem="itemId => pickedUsers.push(itemId)"
          @deleteItem="deleteItem"
          :dataArr="users"
          inputId="member"
          inputName="member"
          labelText="Участники"
          placehoderText="Например, Тор Одинович">
        </input-select>
      </fieldset>

      <div class="form-meeting__offset"></div>

      <fieldset class="form-meeting__fieldset form-meeting__fieldset--recommended">
        <div v-if="roomId">
        <legend class="form-meeting__legend">Ваша переговорка</legend>
          <peregovorka
            @deleteRoom="() => {this.roomId = null}"
            :id="roomId"
            :selectedRoom="roomId"
            :timeStart="timeStart"
            :timeEnd="timeEnd"
            :roomTitle="roomTitle"
            :floor="floor">
          </peregovorka>
        </div>
        <div v-if="!roomId">
          <legend class="form-meeting__legend">Рекомендованные переговорки</legend>
          <ul class="list-items list-items--no-margin">
            <li v-for="recomendation in recomendationRooms"
              :key="recomendation.room.id"
              class="list-items__item list-items__item--peregovorki">
              <peregovorka
                @pickRoom="pickRoom"
                :selectedRoom="roomId"
                :id="recomendation.room.id"
                :timeStart="timeStart"
                :timeEnd="timeEnd"
                :roomTitle="recomendation.room.title"
                :floor="recomendation.room.floor">
              </peregovorka>
            </li>
          </ul>
        </div>
      </fieldset>

      <div v-if="eventId === null" class="form-meeting__create-meeting-container">
        <p class="form-meeting__fixed-phrase">Выберите переговорку</p>
        <button-elem
          typeButton="button"
          @clickOnBtn="closeForm"
          buttonClass="btn btn--cancel-create">Отмена
        </button-elem>
        <button-elem
          @clickOnBtn="sendForm"
          typeButton="button"
          buttonClass="btn btn--form-meeting btn--primary">Создать встречу
        </button-elem>
      </div>

      <div v-if="eventId !== null" class="form-meeting__btn-container">
        <div class="form-meeting__offset"></div>
        <button-elem
          @clickOnBtn="() => { this.openModalDelete = true }"
          typeButton="button"
          buttonClass="btn btn--delete">Удалить встречу
        </button-elem>
        <div class="form-meeting__offset"></div>
        <button-elem
          typeButton="button"
          @clickOnBtn="closeForm"
          buttonClass="btn btn--cancel">Отмена
        </button-elem>
        <button-elem
          typeButton="button"
          @clickOnBtn="updateMeeting"
          buttonClass="btn btn--primary btn--save">Сохранить
        </button-elem>
      </div>
    </form>

    <modal-content
      v-if="openModalDelete"
      alert="Встреча будет удалена безвозвратно"
      @cancel="() => { this.openModalDelete = false }"
      @confirm="() => {
          this.deleteMeeting()
          this.closeForm()
        }">
    </modal-content>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { parse, format } from 'date-fns/esm'
import { ru } from 'date-fns/esm/locale'
import getRecommendation from '.././get-recomendation'
import InputWithIcon from '@/components/InputWithIcon'
import BtnIcon from '@/components/BtnIcon'
import InputSelect from '@/components/InputSelect'
import InputDate from '@/components/InputDate'
import InputLabel from '@/components/InputLabel'
import SingleInput from '@/components/SingleInput'
import Button from '@/components/Button'
import ModalContent from '@/components/ModalContent'
import Peregovorka from '@/components/Peregovorka'

export default {
  props: {
    initRoomId: {
      type: String,
      default: ''
    },
    initRoomTitle: {
      type: String,
      default: ''
    },
    initShortDateEvent: {
      type: String,
      default: ''
    },
    initDateEvent: {
      type: String,
      default: ''
    },
    initTimeStart: {
      type: String,
      default: ''
    },
    initTimeEnd: {
      type: String,
      default: ''
    },
    initEventId: {
      type: String,
      default: null
    },
    initEventTitle: {
      type: String,
      default: ''
    },
    initFloor: {
      type: Number,
      default: null
    },
    initUsers: {
      type: Array,
      default: () => []
    },
    confirmModal: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      openModalDelete: false,
      confirmDelete: false,
      themeInput: this.initEventTitle,
      eventId: this.initEventId,
      usersInput: '',
      timeInput: this.initDateEvent,
      timeStart: this.initTimeStart,
      timeEnd: this.initTimeEnd,
      pickedUsers: this.initUsers,
      roomId: this.initRoomId,
      roomTitle: this.initRoomTitle,
      floor: this.initFloor,
      users: [],
      floors: [],
      events: [],
      loading: 0
    }
  },
  computed: {
    dateMeeting: function () {
      const format = 'DD MMMM, YYYY HH:mm'
      const dateStart = parse(
          `${this.timeInput} ${this.timeStart}`,
          format,
          new Date(),
          {locale: ru}
        )
      const dateEnd = parse(
          `${this.timeInput} ${this.timeEnd}`,
          format,
          new Date(),
          {locale: ru}
        )

      return {
        dateStart: dateStart,
        dateEnd: dateEnd
      }
    },
    recomendationRooms: function () {
      if (!this.loading) {
        const timeObj = {
          dateStart: format(this.dateMeeting.dateStart, 'x'),
          dateEnd: format(this.dateMeeting.dateEnd, 'x')
        }
        const db = {
          events: this.events,
          rooms: this.rooms,
          users: this.users
        }
        const users = this.users.filter((item) => {
          if (this.pickedUsers.indexOf(item.id) === -1) {
            return false
          }
          return true
        })

        return getRecommendation(timeObj, users, db)
      }
    }
  },
  methods: {
    deleteItem: function (id) {
      const index = this.pickedUsers.indexOf(id)

      if (index > -1) {
        this.pickedUsers.splice(index, 1)
      }
    },
    closeForm: function () {
      this.$emit('toggle')
    },
    pickRoom: function (id, floor, roomTitle) {
      this.roomId = id
      this.floor = floor
      this.roomTitle = roomTitle
    },
    sendForm: function () {
      this.$apollo.mutate({
        mutation: gql`mutation createEvent($id: ID!, $input: EventInput!) {
          createEvent(roomId: $id, input: $input) {
            id
            title
            dateStart
            dateEnd
            users {
              id
            }
            room {
              id
            }
          }
        }`,
        variables: {
          id: this.roomId,
          input: {
            'title': this.themeInput,
            'dateStart': this.dateMeeting.dateStart,
            'dateEnd': this.dateMeeting.dateEnd,
            'usersIds': this.pickedUsers
          }
        }
      }).then((data) => {
        this.$emit(
          'showModal',
          {
            messageText: 'Встреча создана!',
            roomTitle: this.roomTitle,
            eventDate: this.timeInput,
            timeStart: this.timeStart,
            timeEnd: this.timeEnd,
            floor: this.floor
          }
        )
        this.$emit('toggle')
      }).catch((error) => {
        this.$emit('toggle')
        console.error(error)
      })
    },
    deleteMeeting: function () {
      this.$apollo.mutate({
        mutation: gql`mutation deleteEvent($id: ID!) {
          removeEvent(id: $id) {
            id
          }
        }`,
        variables: {
          id: this.eventId
        }
      }).then((data) => {
        this.$emit('toggle')
      }).catch((error) => {
        console.error(error)
      })
    },
    updateMeeting: function () {
      this.$apollo.mutate({
        mutation: gql`mutation updateEvent($id: ID!, $input: EventInput!) {
          updateEvent(id: $id, input: $input) {
            id
            title
            dateStart
            dateEnd
            users {
              id
              login
            }
            room {
              id
              title
            }
          }
        }`,
        variables: {
          id: this.eventId,
          input: {
            'title': this.themeInput,
            'dateStart': this.dateMeeting.dateStart,
            'dateEnd': this.dateMeeting.dateEnd,
            'usersIds': this.pickedUsers
          }
        }
      }).then((data) => {
        this.$emit('toggle')
      }).catch((error) => {
        console.error(error)
      })
      this.$apollo.mutate({
        mutation: gql`mutation changeEventRoom($id: ID!, $roomId: ID!) {
          changeEventRoom(id: $id, roomId: $roomId) {
            id
            title
            dateStart
            dateEnd
            users {
              id
              login
            }
            room {
              id
              title
            }
          }
        }`,
        variables: {
          id: this.eventId,
          roomId: this.roomId
        }
      }).then((data) => {
        this.$emit('toggle')
      }).catch((error) => {
        console.error(error)
      })
    }
  },
  components: {
    'input-with-icon': InputWithIcon,
    'btn-icon': BtnIcon,
    'input-select': InputSelect,
    'input-date': InputDate,
    'input-label': InputLabel,
    'single-input': SingleInput,
    'button-elem': Button,
    'peregovorka': Peregovorka,
    'modal-content': ModalContent
  },
  apollo: {
    users () {
      return {
        query: gql`query loadUsers {
          users {
            id,
            login,
            homeFloor,
            avatarUrl
          }
        }`
      }
    },
    rooms () {
      return {
        query: gql`query loadRooms{
          rooms {
            id
            title
            capacity
            floor
          }
        }`
      }
    },
    events () {
      return {
        query: gql`query loadEvents {
          events {
            id
            title
            dateStart
            dateEnd
            users {
              id
              login
            }
            room {
              id
            }
          }
        }`
      }
    }
  }
}
</script>
