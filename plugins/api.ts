import Cookies from 'js-cookie'

export default function ({ $axios, $toast }: any, inject: any) {
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
    ],
    transformResponse: [
      (res: any) => {
        if (res.code !== 0) {
          if (!process.server && res.message && res.message.text) {
            $toast.error(res.message.text)
          }
        }
        return res
      }
    ]
  })

  // Inject to context as $api
  inject('api', api)
}
