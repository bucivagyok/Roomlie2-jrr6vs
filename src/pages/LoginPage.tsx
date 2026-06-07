import { setCredentials } from '@/store/authSlice'
import { useAppDispatch } from '@/store/hooks'
import { useLoginMutation } from '@/store/roomlieApi'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button';

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [login, {isLoading, error}] = useLoginMutation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const result = await login({ email, password }).unwrap()
      dispatch(setCredentials({ token: result.token, user: result.user}))
      navigate('/')
    } catch {

    }
  }

  return (
    <main className="max-w-sm mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-6">Bejelentkezés</h1>
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
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Bejelentkezés...' : 'Bejelentkezés'}
        </Button>
      </form>
    </main>
  )
}

export default LoginPage