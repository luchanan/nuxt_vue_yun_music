import { nuxtCookie } from '@/utils/storage'
export const state = () => ({
  token: ''
})

export const mutations = {
  SET_TOKEN (state, token) {
    state.token = token
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit ({ commit }, { req, context }) {
    let token = nuxtCookie.get('__csrf', req)
    if (token) {
      commit('SET_TOKEN', token)
    }
  },
  async login ({ commit }, { username, password }) {
    try {
      const { data } = await this.$axios.post('/api/login', { username, password })
      commit('SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  }
}
