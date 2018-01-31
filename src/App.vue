<template>
  <div id="app">
    <symbols-svg/>

    <header-component
      @toggle="toggle"
      :isTimetable="isTimetable">
    </header-component>

    <time-table
      v-show="isTimetable"
      @toggle="toggle"
      @goToForm="goToForm">
    </time-table>

    <form-meeting
      v-if="!isTimetable"
      @toggle="toggle"
      @showModal="showModal"
      v-bind="initFormData">
    </form-meeting>

    <modal-content
      v-if="openModal"
      v-bind="modalMessage"
      @cancel="() => { this.openModal = false }"
      @confirm="() => { this.confirmModal = true }">
    </modal-content>

    <portal-target v-if="isTimetable" name="destination" style="z-index: 9000; position: fixed">
    </portal-target>
  </div>
</template>

<script>
import Header from '@/components/Header'
import SymbolSVG from '@/components/SymbolSVG'
import FormMeeting from '@/components/FormMeeting'
import Timetable from '@/components/Timetable'
import ModalContent from '@/components/ModalContent'

export default {
  name: 'app',
  data: function () {
    return {
      isTimetable: true,
      initFormData: null,
      openModal: false,
      modalMessage: null
    }
  },
  methods: {
    toggle: function () {
      this.initFormData = null
      this.isTimetable = !this.isTimetable
    },
    goToForm: function (data) {
      this.initFormData = data
      this.isTimetable = false
    },
    showModal: function (data) {
      this.modalMessage = data
      this.openModal = true
    }
  },
  components: {
    'header-component': Header,
    'symbols-svg': SymbolSVG,
    'form-meeting': FormMeeting,
    'time-table': Timetable,
    'modal-content': ModalContent
  }
}
</script>

<style lang="scss">
  @import "./assets/styles/style.min.css";
</style>
