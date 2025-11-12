import {useAuth} from '@/context/AuthContext';
import {useRouter} from 'next/navigation';
import {useEffect, ReactNode} from 'react';

const PrivateRoute = ({children}: { children: ReactNode }) => {
    const {user, loading} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return <div>Loading session...</div>;
    }

    if (user) {
        return <>{children}</>;
    }

    return null;
};

export default PrivateRoute;
