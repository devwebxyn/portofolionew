import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const base = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000').replace(/\/$/, '')
    const res = await fetch(`${base}/api/projects`, {
      cache: 'no-store',
      headers: { 'Accept': 'application/json' },
    })

    const data = await res.json().catch(() => ({}))
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Karya sedang tidak tersedia untuk sementara' },
      { status: 503 },
    )
  }
}
