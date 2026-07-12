import LogClient from "./LogClient";
import { cookies } from "next/headers";

async function getAILogs() {
  try {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    const rawCookies = allCookies.map((c) => `${c.name}=${c.value}`).join("; ");

    const allowedCookies = ["accessToken", "refreshToken"];
    const cookieHeader = allCookies
      .filter((c) => allowedCookies.includes(c.name))
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/ai/ai-dashboard-logs`;
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
        debugCookies: cookieHeader || "EMPTY",
        rawCookies: rawCookies || "EMPTY"
      };
    }

    return data;
  } catch (err: any) {
    console.error("Fetch Error:", err);
    return { 
      error: err?.message || "Network Error",
      debugCookies: "Failed before reading cookies",
      rawCookies: "Failed before reading cookies"
    };
  }
}

export default async function LogServer() {
  const data = await getAILogs();

  if (data?.error) {
    return (
      <div className="p-8 text-center border border-red-500 bg-red-500/10 rounded-xl mt-4">
        <h2 className="text-xl font-semibold text-red-500 mb-2">Error Loading AI Logs</h2>
        <div className="mt-4">
          <p className="text-sm font-semibold text-white">Debug - Filtered Cookies Sent:</p>
          <code className="block mt-1 p-2 bg-black/50 rounded text-xs text-yellow-300 break-all">
            {data.debugCookies}
          </code>
        </div>
        <div className="mt-4">
          <p className="text-sm font-semibold text-white">Debug - ALL Raw Cookies Received by Server Component:</p>
          <code className="block mt-1 p-2 bg-black/50 rounded text-xs text-blue-300 break-all">
            {data.rawCookies}
          </code>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full w-full">
      <LogClient data={data} />
    </div>
  );
}
