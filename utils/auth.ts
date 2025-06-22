
export async function loginUser({
    email,
    password
}:{
    email: string;
    password: string;
}) {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    })

    const data = await response.json()

    if (!response.ok) throw new Error(data.error || 'Login failed')

    // Store JWT in localStorage or cookie
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))

    return data
  } catch (error: any) {
    console.error('Login error:', error.message)
    throw error
  }
}

// export async function register() {
//     try {
//         const response = await fetch('/api/register', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         })
//         const data = await response.json()

//         if (!response.ok) throw new Error(data.error || 'Registration failed')
//             return data

//     } catch (error: any) {
//         console.error('Registration error:', error.message)
//         throw error
//     }
// }

export function getToken(): string | null {
  return localStorage.getItem('token')
}

export function logoutUser() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}
