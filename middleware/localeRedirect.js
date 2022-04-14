import availableLangs from '@/utils/availableLangs'

export default function ({ app }) {
  const currentLocaleIsAvailable = availableLangs.includes(app.i18n.locale)

  if (!currentLocaleIsAvailable) {
    app.i18n.setLocale('en')
  }
}
