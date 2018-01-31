import Vue from 'vue'
import Router from 'vue-router'
import Timetable from '@/components/Timetable'
import FormMeeting from '@/components/FormMeeting'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Timetable
    },
    {
      path: '/form-meeting',
      component: FormMeeting,
      props: (route) => ({
        editEventId: route.query.editEventId,
        initRoomId: route.query.initRoomId,
        initDate: route.query.initDate,
        initTimeStart: route.query.initTimeStart,
        initTimeEnd: route.query.initTimeEnd
      })
    }
  ]
})
