import Cookies from 'js-cookie'

export default function ({ $axios }: any, inject: any) {
  // Create a custom axios instance
  const api = $axios.create({
    baseURL: process.env.baseUrl,
    headers: {
      'Content-Type': 'application/json'
    },
    transformRequest: [
      (data: any) => {
        const payload = {
          ...(data ? JSON.parse(data) : {}),
          auth: Cookies.get('auth')
        }

        return JSON.stringify(payload)
      },
      ...$axios.defaults.transformRequest
    ]
  })

  // Inject to context as $api
  inject('api', api)
}
