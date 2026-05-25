import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const base = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000').replace(/\/$/, '')
    const res = await fetch(`${base}/api/projects`, {
      // Revalidate periodically to keep projects fresh without blocking
      next: { revalidate: 60 },
      headers: { 'Accept': 'application/json' },
    })

    const data = await res.json().catch(() => ({}))
    return NextResponse.json(data, { status: res.status })
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    return NextResponse.json({ ok: false, error: `Proxy error: ${msg}` }, { status: 502 })
  }
}
