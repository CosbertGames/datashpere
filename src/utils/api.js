// src/utils/api.js
const API_BASE = '/api/users'

export const api = {
  create: (user) =>
    fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    }).then((res) => {
      if (!res.ok) throw new Error('Failed to create')
      return res.json()
    }),

  getAll: () =>
    fetch(API_BASE).then((res) => {
      if (!res.ok) throw new Error('Failed to fetch')
      return res.json()
    }),

  getOne: (id) =>
    fetch(`${API_BASE}/${id}`).then((res) => {
      if (!res.ok) throw new Error('User not found')
      return res.json()
    }),

  update: (id, user) =>
    fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    }).then((res) => {
      if (!res.ok) throw new Error('Failed to update')
      return res.json()
    }),

  remove: (id) =>
    fetch(`${API_BASE}/${id}`, { method: 'DELETE' }).then((res) => {
      if (!res.ok) throw new Error('Failed to delete')
      return res.json()
    }),
}