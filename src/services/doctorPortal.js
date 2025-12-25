function safeJsonParse(value, fallback) {
  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

function loadArray(key) {
  if (typeof window === 'undefined') return []
  const raw = localStorage.getItem(key)
  const parsed = raw ? safeJsonParse(raw, []) : []
  return Array.isArray(parsed) ? parsed : []
}

function loadObject(key) {
  if (typeof window === 'undefined') return {}
  const raw = localStorage.getItem(key)
  const parsed = raw ? safeJsonParse(raw, {}) : {}
  return parsed && typeof parsed === 'object' ? parsed : {}
}

function hashPercent(seed) {
  // deterministic 0..99
  const s = String(seed || '')
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h % 100
}

export function getAuthData() {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem('auth') || sessionStorage.getItem('auth')
  return raw ? safeJsonParse(raw, null) : null
}

export function getAdminDoctors() {
  return loadArray('adminDoctors')
}

export function getCurrentDoctor(authData = getAuthData()) {
  const list = getAdminDoctors()
  if (!list.length) return null

  const email = String(authData?.email || '').toLowerCase()
  const name = String(authData?.name || '').toLowerCase()

  const byEmail = email ? list.find(d => String(d.email || '').toLowerCase() === email) : null
  if (byEmail) return byEmail

  const byName = name ? list.find(d => String(d.name || '').toLowerCase().includes(name)) : null
  if (byName) return byName

  return list.find(d => d.status !== 'Inactive') || list[0] || null
}

export function getRegisteredUsers() {
  return loadArray('registeredUsers')
}

export function getUserProfile(email) {
  const key = `userProfile:${String(email || '').toLowerCase()}`
  return loadObject(key)
}

export function normalizeGoal(goalRaw) {
  const g = String(goalRaw || '').toLowerCase()
  if (g.includes('loss')) return 'Weight Loss'
  if (g.includes('gain')) return 'Weight Gain'
  if (g.includes('maintain')) return 'Health Maintain'
  if (g.includes('improve')) return 'Health Improvement'
  return 'Health Improvement'
}

export function buildDoctorClients(doctor) {
  const users = getRegisteredUsers()
  const doctorKey = doctor?.id ?? doctor?.email ?? doctor?.name ?? 'doctor'

  return (users || []).map((u) => {
    const email = u?.email || ''
    const profile = getUserProfile(email)

    const name = u?.firstName && u?.lastName ? `${u.firstName} ${u.lastName}` : (u?.firstName || email || 'Client')
    const goal = normalizeGoal(profile?.goal || profile?.goalTitle || u?.goal)

    const currentWeight = Number(profile?.currentWeight ?? profile?.weight ?? 0) || 0
    const targetWeight = Number(profile?.targetWeight ?? 0) || 0
    const height = Number(profile?.height ?? 0) || 0
    const age = Number(profile?.age ?? 0) || 0

    const compliance = 40 + (hashPercent(`${doctorKey}|${email}`) % 56) // 40..95
    const progress = compliance
    const status = compliance >= 75 ? 'Compliant' : compliance >= 55 ? 'Needs Support' : 'At Risk'
    const progressColor = status === 'Compliant' ? '#22c55e' : status === 'Needs Support' ? '#f59e0b' : '#ef4444'
    const lastUpdate = `${(hashPercent(email) % 6) + 1} days ago`

    const clientId = encodeURIComponent(String(email || name))

    return {
      id: clientId,
      email,
      name,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=00c288&color=fff`,
      goal,
      age,
      height,
      currentWeight: currentWeight || 0,
      targetWeight: targetWeight || 0,
      weight: currentWeight || 0,
      progress,
      progressColor,
      status,
      compliance,
      lastUpdate,
      profile
    }
  })
}

export function getAppointments() {
  return loadArray('appointments_v1')
}

export function getDoctorAppointments(doctor) {
  const list = getAppointments()
  const docId = doctor?.id != null ? String(doctor.id) : ''
  const docName = String(doctor?.name || '').toLowerCase()

  if (!docId && !docName) return list

  return list.filter(a => {
    const aDocId = String(a?.doctorId || '')
    const aDocName = String(a?.doctorName || '').toLowerCase()
    return (docId && aDocId === docId) || (docName && aDocName === docName)
  })
}

export function isToday(dateStr) {
  const d = new Date()
  const today = d.toISOString().slice(0, 10)
  return String(dateStr || '') === today
}

export function getDoctorInboxKey(doctor) {
  return String(doctor?.id ?? doctor?.email ?? doctor?.name ?? 'doctor')
}

export function loadThread(doctor, clientId) {
  const dKey = getDoctorInboxKey(doctor)
  return loadArray(`doctor_inbox_v1:${dKey}:${clientId}`)
}

export function saveThread(doctor, clientId, messages) {
  if (typeof window === 'undefined') return
  const dKey = getDoctorInboxKey(doctor)
  localStorage.setItem(`doctor_inbox_v1:${dKey}:${clientId}`, JSON.stringify(messages || []))
}


