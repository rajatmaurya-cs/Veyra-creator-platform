import Client from "./StatsClient";
import { cookies } from "next/headers";

async function getAIStats() {
  try {
    const cookieStore = await cookies();
    const allowedCookies = ["accessToken", "refreshToken"];

    const cookieHeader = cookieStore
      .getAll()
      .filter((c) => allowedCookies.includes(c.name))
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/ai/ai-dashboard`;
    const res = await fetch(url, {
      method: "GET",
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error(`API Error ${res.status}:`, data);
      return { 
        error: data?.message || `API Error ${res.status}`,
        debugCookies: cookieHeader || "EMPTY"
      };
    }

    return data;
  } catch (err: any) {
    console.error("Fetch Error:", err);
    return { 
      error: err?.message || "Network Error",
      debugCookies: "Failed before reading cookies or fetching"
    };
  }
}

export default async function Page() {
  const data = await getAIStats();

  if (data?.error) {
    return (
      <div className="p-8 text-center border border-red-500 bg-red-500/10 rounded-xl mt-4">
        <h2 className="text-xl font-semibold text-red-500 mb-2">Error Loading AI Stats</h2>
        <p className="text-neutral-300">
          The server component encountered an error while fetching from your backend:
        </p>
        <code className="block mt-4 p-4 bg-black/50 rounded-lg text-sm text-red-400">
          {data.error}
        </code>
        <div className="mt-4">
          <p className="text-sm font-semibold text-white">Debug - Cookies Sent to Backend:</p>
          <code className="block mt-1 p-2 bg-black/50 rounded text-xs text-yellow-300 break-all">
            {data.debugCookies}
          </code>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full w-full">
      <Client data={data} />
    </div>
  );
}
