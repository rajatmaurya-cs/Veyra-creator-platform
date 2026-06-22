import LogClient from "./LogClient";
import { cookies } from "next/headers";

async function getAILogs() {
  const cookieStore = await cookies();
  const allowedCookies = ["accessToken", "refreshToken"];

  const cookieHeader = cookieStore
    .getAll()
    .filter((c) => allowedCookies.includes(c.name))
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/ai/ai-dashboard-logs`,
    {
      method: "GET",
      headers: {
        Cookie: cookieHeader,
      },
      next: {
        revalidate: 300, 
      },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export default async function LogServer() {
  const data = await getAILogs();

  return (
    <div className="min-h-full w-full">
      <LogClient data={data} />
    </div>
  );
}
