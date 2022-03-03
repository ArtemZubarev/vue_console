export default function ({ redirect, app }) {
  // If the user is not authenticated
  if (!app.$cookies.get('auth')) {
    return redirect('/auth')
  }
}
