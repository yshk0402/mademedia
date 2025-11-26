'use client';

import { FormEvent, useMemo, useState } from 'react';

const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function WaitlistCard() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  );
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [touchedName, setTouchedName] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);

  const validName = name.trim().length > 0;
  const validEmail = emailPattern.test(email.trim().toLowerCase());

  const canSubmit = useMemo(
    () => validName && validEmail && status !== 'loading',
    [validEmail, validName, status],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouchedName(true);
    setTouchedEmail(true);

    if (!canSubmit) {
      setError('名前とメールアドレスを入力してください。');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setError('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        setError(payload?.error || '登録に失敗しました。時間を置いて再度お試しください。');
        setStatus('error');
        return;
      }

      setStatus('success');
      setShowForm(false);
    } catch (fetchError) {
      console.error(fetchError);
      setError('ネットワークエラーです。接続を確認して再度お試しください。');
      setStatus('error');
    }
  };

  return (
    <div className="waitlist-card" id="waitlist">
      <p className="waitlist-heading">Founders Dream is Coming Soon...!</p>

      {!showForm && status !== 'success' && (
        <button
          className="button js-show-form"
          type="button"
          onClick={() => {
            setShowForm(true);
            setError('');
          }}
        >
          ウェイトリストに登録する。
        </button>
      )}

      {showForm && status !== 'success' && (
        <form className="form js-form" onSubmit={handleSubmit}>
          <div className="form-container">
            <input
              type="text"
              placeholder="Full Name"
              className="input js-input-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              onBlur={() => setTouchedName(true)}
              disabled={status === 'loading'}
              required
            />
            {touchedName && !validName && (
              <div className="name-error">Please enter a valid name</div>
            )}
          </div>
          <div className="form-container">
            <input
              type="email"
              placeholder="Email"
              className="input js-input-email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onBlur={() => setTouchedEmail(true)}
              disabled={status === 'loading'}
              required
            />
            {touchedEmail && !validEmail && (
              <div className="email-error">Please enter a valid email</div>
            )}
          </div>
          <div className="form-container">
            <input
              type="submit"
              value={status === 'loading' ? '送信中...' : '登録'}
              className="button js-submit-form"
              disabled={!canSubmit}
            />
          </div>
        </form>
      )}

      {status === 'success' && (
        <div className="success-message js-success" role="status">
          You have successfully joined the waitlist!
        </div>
      )}

      {error && status !== 'success' && (
        <div className="error-box" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
