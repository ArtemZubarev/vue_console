export default function ({ redirect, app }) {
  const techWorks = true

  const isTester = app.$cookies.get('forTests') === 'tester'
  const isTechWorksPage = app.router.currentRoute.path.includes('/tech-works')
  if (techWorks) {
    if (!isTester) {
      return redirect(app.localePath('/tech-works'))
    }
    if (isTechWorksPage) {
      return redirect(app.localePath('/'))
    }
  } else if (isTechWorksPage) {
    return redirect(app.localePath('/'))
  }
}
