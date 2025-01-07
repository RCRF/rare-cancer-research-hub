import { useRouter } from 'next/router';
import Head from 'next/head';

export default function UnauthorizedPage() {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Unauthorized Access | Admin Panel</title>
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center animate-fade-in">
                    <div className="flex justify-center">
                        <div className="h-20 w-20 bg-red-50 rounded-full flex items-center justify-center">
                            <svg
                                className="h-10 w-10 text-red-500"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                        </div>
                    </div>

                    <h1 className="mt-6 text-3xl font-bold text-slate-900">
                        Access Restricted
                    </h1>

                    <p className="mt-4 text-slate-600 text-lg">
                        You don't have permission to access this area. This section requires administrator privileges.
                    </p>

                    <div className="mt-10 space-y-4">
                        <button
                            onClick={() => router.push('/')}
                            className="w-full px-6 py-3 text-base font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all duration-150 ease-in-out"
                        >
                            Return to Homepage
                        </button>

                        <button
                            onClick={() => router.push('/profile')}
                            className="w-full px-6 py-3 text-base font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all duration-150 ease-in-out"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
