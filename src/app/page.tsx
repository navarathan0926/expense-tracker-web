import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-950">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex flex-col gap-8">
                <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                    Expense Tracker
                </h1>
                <p className="text-xl text-slate-400">Manage your finances professionally.</p>
                <div className="flex gap-4">
                    <Link
                        href="/login"
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all shadow-lg shadow-blue-500/20"
                    >
                        Login
                    </Link>
                    <Link
                        href="/register"
                        className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition-all border border-slate-700"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </main>
    );
}
