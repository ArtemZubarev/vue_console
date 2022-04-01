export const techWorks = true

export default function ({ redirect, app }) {
  const isTester = app.$cookies.get('forTests') === 'tester'
  const isTechWorksPage = app.router.currentRoute.path.includes('/tech-works')
  console.log(isTester)
  console.log(isTechWorksPage)

  // if (!isTester) {
  //   if (techWorks && !isTechWorksPage) {
  //     return redirect(app.localePath('/tech-works'))
  //   }
  // }
}
