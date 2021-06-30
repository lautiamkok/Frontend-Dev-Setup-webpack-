'use strict'

const getters = {
  countFiction: (state, getters) => {
    return getters.getFiction.length
  },

  getFiction: state => {
    return state.books.filter(book => book.type === 'fiction')
  },

  getBookById: (state, getters) => (id) => {
    return state.books.find(book => book.id === id)
  }
}

export default getters
