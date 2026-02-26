"use client";

import { useState } from "react";
import apiClient from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await apiClient.post("/auth/login", { email, password });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data));
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.response?.data || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-slate-900 p-8 shadow-2xl border border-slate-800">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
                    <p className="mt-2 text-slate-400">Sign in to your account</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    {error && <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">{error}</div>}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition-all hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
                <p className="text-center text-sm text-slate-400">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="font-semibold text-blue-400 hover:text-blue-300">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}
