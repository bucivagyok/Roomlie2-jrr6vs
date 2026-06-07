import { useRegisterMutation } from '@/store/roomlieApi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

const RegisterPage = () => {
    const navigate = useNavigate()
    const [register, {isLoading, error}] = useRegisterMutation()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        await(register({ name, email, password}))
        navigate('/login')
    }

    return (
        <main className="max-w-sm mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-6">Admin bejelentkezés</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Név</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="janedoe@example.com"
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
          {isLoading ? 'Regisztrálás...' : 'Regisztrálás'}
        </Button>
      </form>
    </main>
    )
}

export default RegisterPage