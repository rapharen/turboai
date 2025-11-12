"use client";

import PrivateRoute from '@/components/PrivateRoute';

export default function NotesLayout({ children }: { children: React.ReactNode }) {
    return (
        <PrivateRoute>
            {children}
        </PrivateRoute>
    );
}
