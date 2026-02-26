"use client";

import { useState } from "react";
import apiClient from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await apiClient.post("/auth/register", { fullName, email, password });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data));
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.response?.data || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-slate-900 p-8 shadow-2xl border border-slate-800">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white">Create Account</h2>
                    <p className="mt-2 text-slate-400">Join us to manage your expenses</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                    {error && <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">{error}</div>}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300">Full Name</label>
                            <input
                                type="text"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="mt-1 block w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>
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
                            <label className="block text-sm font-medium text-slate-300">Password (min 6 chars)</label>
                            <input
                                type="password"
                                required
                                minLength={6}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white transition-all hover:bg-emerald-700 active:scale-[0.98] disabled:opacity-50"
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>
                </form>
                <p className="text-center text-sm text-slate-400">
                    Already have an account?{" "}
                    <Link href="/login" className="font-semibold text-emerald-400 hover:text-emerald-300">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
}
