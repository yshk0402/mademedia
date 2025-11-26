'use client';

import { useMemo, useState } from 'react';
import type { WaitlistEntry } from '@/lib/supabase';

const formatDate = (value?: string) => {
  if (!value) return '-';
  const date = new Date(value);
  return date.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
};

export default function AdminPanel() {
  const [token, setToken] = useState('');
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const tokenReady = token.trim().length > 0;

  const fetchEntries = async () => {
    if (!tokenReady) return;

    setLoading(true);
    setError('');
    setMessage('');

    const response = await fetch('/api/waitlist', {
      headers: {
        'x-admin-token': token.trim(),
      },
    });

    const payload = (await response.json().catch(() => ({}))) as {
      entries?: WaitlistEntry[];
      error?: string;
    };

    if (!response.ok) {
      setError(payload?.error || '取得に失敗しました。トークンを確認してください。');
      setLoading(false);
      return;
    }

    setEntries(payload.entries || []);
    setMessage(`${(payload.entries || []).length} 件の登録を取得しました。`);
    setLoading(false);
  };

  const deleteEntry = async (id: string) => {
    if (!tokenReady) return;
    setLoading(true);
    setError('');
    setMessage('');

    const response = await fetch(`/api/waitlist?id=${id}`, {
      method: 'DELETE',
      headers: {
        'x-admin-token': token.trim(),
      },
    });

    const payload = (await response.json().catch(() => ({}))) as {
      error?: string;
    };

    if (!response.ok) {
      setError(payload?.error || '削除に失敗しました。');
      setLoading(false);
      return;
    }

    setEntries((prev) => prev.filter((entry) => entry.id !== id));
    setMessage('削除しました。');
    setLoading(false);
  };

  const csv = useMemo(() => {
    if (!entries.length) return '';
    const header = 'id,name,email,created_at';
    const rows = entries.map((entry) =>
      [entry.id, entry.name, entry.email, entry.created_at ?? ''].join(','),
    );
    return [header, ...rows].join('\n');
  }, [entries]);

  const downloadCsv = () => {
    if (!csv) return;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'waitlist.csv';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card admin-shell">
      <div>
        <h1 className="headline" style={{ fontSize: 28, marginBottom: 8 }}>
          Waitlist Admin
        </h1>
        <p className="subhead">
          管理トークン (ADMIN_TOKEN) を入力して一覧を取得・削除できます。
        </p>
      </div>

      <div className="admin-controls">
        <input
          className="input"
          placeholder="ADMIN_TOKEN"
          value={token}
          onChange={(event) => setToken(event.target.value)}
          type="password"
          style={{ maxWidth: 240 }}
        />
        <button
          className="btn secondary"
          onClick={fetchEntries}
          disabled={!tokenReady || loading}
        >
          {loading ? '処理中...' : '一覧を取得'}
        </button>
        <button
          className="ghost-button"
          onClick={downloadCsv}
          disabled={!entries.length}
        >
          CSV をダウンロード
        </button>
      </div>

      {message && <div className="success-box">{message}</div>}
      {error && <div className="error-box">{error}</div>}

      <div className="admin-grid">
        <table className="table">
          <thead>
            <tr>
              <th>名前</th>
              <th>メール</th>
              <th>登録日時</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 && (
              <tr>
                <td className="empty" colSpan={4}>
                  データがありません。トークンを入力して「一覧を取得」を押してください。
                </td>
              </tr>
            )}
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.name}</td>
                <td>{entry.email}</td>
                <td>
                  <span className="pill-small">{formatDate(entry.created_at)}</span>
                </td>
                <td>
                  <button
                    className="ghost-button danger-button"
                    onClick={() => deleteEntry(entry.id)}
                    disabled={loading}
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
