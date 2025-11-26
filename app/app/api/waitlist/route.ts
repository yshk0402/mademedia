import { NextResponse } from 'next/server';
import {
  addWaitlistEntry,
  adminToken,
  deleteWaitlistEntry,
  fetchWaitlistEntries,
} from '@/lib/supabase';

function extractAdminToken(request: Request) {
  const headerToken =
    request.headers.get('x-admin-token') ||
    request.headers.get('authorization')?.replace(/Bearer\s+/i, '') ||
    '';

  if (!adminToken) {
    return { status: 500, error: 'ADMIN_TOKEN が設定されていません。' };
  }

  if (headerToken !== adminToken) {
    return { status: 401, error: '管理者トークンが不正です。' };
  }

  return { status: 200 };
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const name = (body?.name as string | undefined)?.trim();
  const email = (body?.email as string | undefined)?.trim();

  if (!name || !email) {
    return NextResponse.json(
      { error: 'name と email は必須です。' },
      { status: 400 },
    );
  }

  const result = await addWaitlistEntry(name, email.toLowerCase());
  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json(
    { ok: true, entry: result.entry },
    { status: 201, statusText: 'Created' },
  );
}

export async function GET(request: Request) {
  const auth = extractAdminToken(request);
  if (auth.status !== 200) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const result = await fetchWaitlistEntries();
  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ entries: result.entries });
}

export async function DELETE(request: Request) {
  const auth = extractAdminToken(request);
  if (auth.status !== 200) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'id が必要です。' }, { status: 400 });
  }

  const result = await deleteWaitlistEntry(id);
  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
