import { useAppDispatch } from "@/store/hooks"
import { roomlieApi, useGetMeQuery, useLogoutUserMutation } from "@/store/roomlieApi";
import { Link } from "react-router-dom"
import { logout } from "@/store/authSlice"
import RequireRole from "./auth/RequireRole";
import { useTheme } from "./theme-provider";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutUserMutation();
  const {data: user} = useGetMeQuery()
  const {theme, setTheme} = useTheme()

  async function handleLogout() {
    await logoutUser();
    dispatch(logout());
    dispatch(roomlieApi.util.resetApiState());
  }

  return (
    <header className="sticky top-0 z-20 border-b bg-background">
        <div className="mx-auto flex h-16 items-center px-4 gap-4">
            <div className="font-bold text-lg">Roomlie</div>

            <Link to="/">Terem</Link>

            <RequireRole roles={['user']}>
              <Link to="/reservations">Foglalásaim</Link>
            </RequireRole>

            <RequireRole roles={['admin']}>
              <Link to="/reservations">Beérkezett foglalások</Link>
            </RequireRole>

            <div className="flex-1" />

            <RequireRole roles={['']}>
              <Link to="/login">Bejelentkezés</Link>
              <Link to="/register">Regisztráció</Link>
            </RequireRole>
            
            <RequireRole roles={['user', 'admin']}>
              <div>{(user?.name ?? '') + (user?.role === 'admin' ? ' Admin' : '')}</div>
              <div onClick={handleLogout} className="cursor-pointer">Kijelentkezés</div>
            </RequireRole>

            <button className='cursor-pointer' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
        </div>
    </header>
  )
}

export default Navbar