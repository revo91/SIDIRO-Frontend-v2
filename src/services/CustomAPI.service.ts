const getCookie = (name: string) => {
  if (!document.cookie) {
    return '';
  }

  const xsrfCookies = document.cookie.split(';')
    .map(c => c.trim())
    .filter(c => c.startsWith(name + '='));

  if (xsrfCookies.length === 0) {
    return '';
  }
  return decodeURIComponent(xsrfCookies[0].split('=')[1]);
}

export const fetchMe = async () => {
  const response = await fetch('/customApi/config/me')
  const data = await response.json()
  return data
}

export const fetchPowermonitor = async (plantName: string) => {
  const response = await fetch(`/customApi/service/me/${plantName}`)
  const data = await response.json()
  return data
}

export const modifyPowerMonitorConfig = async (plantName: string, powermonitorId: string, body: object) => {
  const response = await fetch(`/customApi/service/me/${plantName}/${powermonitorId}`, {
    method: 'PUT',
    headers: {
      'credentials': 'include',
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
    },
    body: JSON.stringify(body)
  })
  if (response.status === 200) {
    const res = await response.json()
    return {
      status: response.status,
      response: res
    }
  }
  else {
    return { status: response.status }
  }
}

export const subscribeToNotification = async (plantName: string, powermonitorId: string, body: object) => {
  const response = await fetch(`/customApi/subscription/me/${plantName}/${powermonitorId}`, {
    method: 'POST',
    headers: {
      'credentials': 'include',
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
    },
    body: JSON.stringify(body)
  })
  const res = await response.text()
  return res
}

export const unsubscribeToNotification = async (plantName: string, powermonitorId: string, body: object) => {
  const response = await fetch(`/customApi/subscription/me/${plantName}/${powermonitorId}`, {
    method: 'DELETE',
    headers: {
      'credentials': 'include',
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
    },
    body: JSON.stringify(body)
  })
    const res = await response.text()
    return res
}

export const checkSubscribed = async (plantName: string, powermonitorId: string, body: object) => {
  const response = await fetch(`/customApi/subscription/isRegistered/${plantName}/${powermonitorId}`, {
    method: 'POST',
    headers: {
      'credentials': 'include',
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
    },
    body: JSON.stringify(body)
  })
    const res = await response.json()
    return res
}