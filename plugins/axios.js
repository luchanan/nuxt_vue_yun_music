export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    console.log('--------------------------------Making request to ' + JSON.stringify(config))
  })
  $axios.onError((error) => {
    console.error(error)
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
