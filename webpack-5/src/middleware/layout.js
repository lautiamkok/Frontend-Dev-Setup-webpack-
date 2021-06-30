import axios from 'axios'

// Axios GET request with callbacks.
// export default function layout(to, from, next) {
//   axios.get(to.name + '.json').then(resp => {
//     to.meta.layout = resp.data.layout
//     return next()
//   })
// }

// Axios GET request with async/await.
export default async (to, from, next) => {
  const { data } = await axios.get('/static/' + to.name + '.json')
  to.meta.layout = data.layout
  return next()
}
