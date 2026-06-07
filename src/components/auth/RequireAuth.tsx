import { setCredentials } from "@/store/authSlice"
import { useAppDispatch } from "@/store/hooks"
import { useGetMeQuery, useLoginMutation } from "@/store/roomlieApi"
import React, { useState, type ReactNode } from "react"

function LoginForm() {
  const dispatch = useAppDispatch()
  const [login, {isLoading, error}] = useLoginMutation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const result = await login({ email, password }).unwrap()
      dispatch(setCredentials({ token: result.token, user: result.user}))
    } catch {

    }
  }

  return (
    <main className="max-w-sm mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-6">Admin bejelentkezés</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.dev"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Jelszó</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            required
          />
        </div>
        {error && <p className="text-sm text-destructive">Hibás email vagy jelszó.</p>}
        <button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Bejelentkezés...' : 'Bejelentkezés'}
        </button>
      </form>
    </main>
  )
}

const RequireAuth = ({ children }: { children: ReactNode}) => {
  const {data: user, isLoading} = useGetMeQuery()

  console.log(user);

  if (isLoading) return <main className="max-w-sm mx-auto px-4 py-16"><p className="text-muted-foreground">Ellenőrzés...</p></main>

  if (!user) return <LoginForm />

  return <>
  {children}
  </>
}

export default RequireAuth;