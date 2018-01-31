/**
 * @typedef {Object} Person
 * @property {String} login Идентификатор сотрудника.
 * @property {Number} floor "Домашний" этаж сотрудника.
 * @property {String} avatar Ссылка на аватар.
 */

/**
 * @typedef {Object} Room
 * @property {Number} id Идентификатор переговорки.
 * @property {String} title Название переговорки.
 * @property {Number} capacity Вместимость (количество человек).
 * @property {Number} floor Этаж, на котором расположена переговорка.
 */

/**
 * @typedef {Object} EventDate
 * @property {Number} start Timestamp начала встречи.
 * @property {Number} end Timestamp окончания встречи.
 */

/**
 * @typedef {Object} Event
 * @property {String} id Идентификатор встречи.
 * @property {String} title Название встречи.
 * @property {String[]} members Логины участников встречи.
 * @property {EventDate} date Дата и время проведения встречи.
 * @property {Number} room Идентификатор переговорки.
 */

/**
 * @typedef {Object} RoomsSwap
 * @property {string} event Идентификатор встречи.
 * @property {String} room Новый идентификатор переговорки.
 */

/**
 * @typedef {Object} Recommendation
 * @property {EventDate} date Дата и время проведения встречи.
 * @property {String} room Идентификатор переговорки.
 * @property {RoomsSwap[]} [swap] Необходимые замены переговорк для реализации рекомендации.
 */

/**
 * @param {EventDate} date Дата планируемой встречи.
 * @param {Person[]} members Участники планируемой встречи.
 * @param {Object} db
 * @param {Event[]} db.events Список все встреч.
 * @param {Room[]} db.rooms Список всех переговорок.
 * @param {Person[]} db.persons Список всех сотрудников.
 * @returns {Recommendation[]}
 */

function getRecommendation (date, members, db) {
  if (date.dateStart === 'Invalid Date' ||
      date.dateEnd === 'Invalid Date') return []
  const rooms = getAccessibleRooms(members, db.rooms)
  const scoreRooms = getScoreRooms(members, rooms)
  const sortedRooms = getSortedRoomsByScore(scoreRooms)
  const busyRooms = getBusyRooms(date, db.events)
  // Не реализована замена для реализации рекомендации.
  let recommendation = []
  sortedRooms.forEach((room) => {
    if (busyRooms.indexOf(room.id) !== -1) return
    recommendation.push({
      date: date,
      room: room
    })
  })
  return recommendation
}

function getAccessibleRooms (members, rooms) {
  const numberMembers = members.length
  return rooms.filter((room) => {
    return room.capacity > numberMembers
  })
}

function getScoreRooms (members, rooms) {
  return rooms.map((room) => {
    let score = 0
    members.forEach(member => {
      score += Math.abs(room.floor - member.homeFloor)
    })
    return Object.assign({}, room, {score: score})
  })
}

function getSortedRoomsByScore (rooms) {
  return rooms.sort((a, b) => {
    if (a.score > b.score) return 1
    if (a.score < b.score) return -1
  })
}

function getBusyRooms (date, events) {
  const dS = date.dateStart
  const dE = date.dateEnd
  let busyRooms = []

  events.forEach((event) => {
    const eventStart = new Date(event.dateStart)
    const eventEnd = new Date(event.dateEnd)
    if ((dS <= eventStart && dE <= eventStart) || (dS >= eventEnd && dE >= eventEnd)) {
      return
    }

    busyRooms.push(event.room.id)
  })

  return busyRooms
}
export default getRecommendation
