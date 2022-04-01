export default function ({ redirect, app }) {
  const techWorks = true

  const isTester = app.$cookies.get('forTests') === 'tester'
  const isTechWorksPage = app.router.currentRoute.path.includes('/tech-works')

  if (!isTester) {
    if (techWorks && !isTechWorksPage) {
      return redirect(app.localePath('/tech-works'))
    }
    if (!techWorks && isTechWorksPage) {
      return redirect(app.localePath('/'))
    }
  }
}
