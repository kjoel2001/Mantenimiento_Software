import axios from 'axios'
import { SET_PRODUCTS_MUTATIONS } from './types'

export default {
  async getProducts (context, { text }) {
    const { data } = await axios.get('https://gist.githubusercontent.com/kjoel2001/0ac12e02b951ab154eb0e8499ff4e9c1/raw/cd0b2a946b648ccc0f81f86bb05539f0980aa06c/products.json')
    context.commit(SET_PRODUCTS_MUTATIONS, data)

    context.dispatch('log', text)

    // console.log(context.rootGetters['userName/name'])
    // console.log(context.rootState.userName.user.name)
    // context.dispatch('userName/userLog', null, { root: true })
    // context.commit('userName/SET_USER', null, { root: true })
  },
  log(ctx, payload) {
    console.log(payload)
  }
}