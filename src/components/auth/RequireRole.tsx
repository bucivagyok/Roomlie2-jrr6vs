import { useGetMeQuery } from '@/store/roomlieApi';
import { type ReactNode } from 'react'

type RequireRoleProps = {
    children: ReactNode;
    roles: string[];
}

const RequireRole = ({roles, children}: RequireRoleProps) => {
    const {data: user} = useGetMeQuery()
    if (!roles.includes(user?.role ?? '')) return null

    return <>{children}</>
}

export default RequireRole