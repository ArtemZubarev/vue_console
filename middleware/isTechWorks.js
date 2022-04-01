export const techWorks = true

export default function ({ redirect, app }) {
  const isTester = app.$cookies.get('forTests') === 'tester'

  if (!isTester) {
    if (techWorks) {
      return redirect(app.localePath('/tech-works'))
    }
    // if (!techWorks && isTechWorksPage) {
    //   return redirect(app.localePath('/'))
    // }
  }
}
