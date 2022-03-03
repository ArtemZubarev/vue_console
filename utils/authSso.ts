const authSso = () => {
  const domain = process.env.ssoUrl
  const hash = process.env.ssoHash

  let top = window.screen.height - 300
  top = top > 0 ? top / 2 : 0

  let left = window.screen.width - 400
  left = left > 0 ? left / 2 : 0

  window.open(
    `${domain}/?app=${hash}`,
    'targetWindow',
    `toolbar=no,
    location=no,
    status=no,
    menubar=no,
    scrollbars=yes,
    resizable=yes,
    width=400,
    height=500
    top=${top}
    left=${left}`
  )
  return false
}

export default authSso
