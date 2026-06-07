import Topbar from "@/components/Topbar"
import Summary from "@/components/Summary"
import Room from "@/components/Room"
import { useState } from "react"
import type { Size } from "../types"
import EditPanel from "@/components/EditPanel"
import RequireRole from "@/components/auth/RequireRole"
import ReservePanel from "@/components/ReservePanel"

export function RoomPage() {
  const [size, setSize] = useState<Size>({x: 780, y: 500});

  return (
    <div className="p-6">
      <RequireRole roles={['admin']}>
        <Topbar size={size} setSize={setSize}/>
      </RequireRole>
      <div className="flex flex-wrap items-start">
        <div className="overflow-auto">
          <Room size={size}/>
        </div>

        <RequireRole roles={['admin']}>
          <EditPanel/>
        </RequireRole>

        <RequireRole roles={['user']}>
          <ReservePanel/>
        </RequireRole>
      </div>
      <Summary/>
    </div>
  )
}

export default RoomPage