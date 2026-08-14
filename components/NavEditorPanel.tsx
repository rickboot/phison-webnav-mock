"use client";

import { useState } from "react";
import { useNavVersion } from "./NavVersionProvider";
import type { ParseError } from "@/lib/nav-outline";

function NavEditorForm({ initialOutline }: { initialOutline: string }) {
  const {
    applyOutline,
    getShareUrl,
    setEditorOpen,
    versionId,
    saveSharedNav,
    sharedConfigured,
  } = useNavVersion();
  const [draft, setDraft] = useState(initialOutline);
  const [errors, setErrors] = useState<ParseError[]>([]);
  const [note, setNote] = useState<string | null>(null);
  const [saveName, setSaveName] = useState("");
  const [saving, setSaving] = useState(false);
  const [showSaveAs, setShowSaveAs] = useState(false);

  const onApply = () => {
    setNote(null);
    const result = applyOutline(draft);
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }
    setErrors([]);
    setNote("Applied as local Custom");
  };

  const onCopyShare = async () => {
    setNote(null);
    const result = applyOutline(draft);
    if (!result.ok) {
      setErrors(result.errors);
      setNote("Fix errors before sharing");
      return;
    }
    setErrors([]);
    const url = getShareUrl(draft);
    try {
      await navigator.clipboard.writeText(url);
      setNote("One-off share link copied (URL hash)");
    } catch {
      setNote(url);
    }
  };

  const onSaveAs = async () => {
    setNote(null);
    setSaving(true);
    try {
      const result = await saveSharedNav(saveName, draft);
      if (!result.ok) {
        setNote(result.message);
        return;
      }
      setErrors([]);
      setShowSaveAs(false);
      setSaveName("");
      setNote(`Saved “${saveName.trim()}” for everyone`);
      setEditorOpen(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="nav-editor-panel" role="region" aria-label="Custom navigation editor">
      <div className="nav-editor-inner">
        <div className="nav-editor-toolbar">
          <div className="nav-editor-title-block">
            <p className="nav-editor-title">Custom nav outline</p>
            <p className="nav-editor-hint">
              Tab to indent · Apply = local preview · Save as… = shared library for everyone
              {versionId === "custom" ? " · editing Custom" : ""}
              {!sharedConfigured
                ? " · shared storage not configured (set Upstash env)"
                : ""}
            </p>
          </div>
          <div className="nav-editor-actions">
            <button type="button" className="nav-editor-btn" onClick={onApply}>
              Apply
            </button>
            <button
              type="button"
              className="nav-editor-btn"
              onClick={() => {
                setShowSaveAs((v) => !v);
                setNote(null);
              }}
            >
              Save as…
            </button>
            <button
              type="button"
              className="nav-editor-btn nav-editor-btn-secondary"
              onClick={onCopyShare}
            >
              Copy share link
            </button>
            <button
              type="button"
              className="nav-editor-btn nav-editor-btn-ghost"
              onClick={() => setEditorOpen(false)}
            >
              Close
            </button>
          </div>
        </div>

        {showSaveAs && (
          <div className="nav-editor-save-as">
            <label className="nav-editor-save-label" htmlFor="shared-nav-name">
              Name for shared library (create-only; cannot overwrite)
            </label>
            <input
              id="shared-nav-name"
              className="nav-editor-save-input"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              placeholder="e.g. Sally AI draft"
              maxLength={60}
              disabled={saving}
              autoComplete="off"
            />
            <button
              type="button"
              className="nav-editor-btn nav-editor-save-submit"
              disabled={saving || !saveName.trim()}
              onClick={() => void onSaveAs()}
            >
              {saving ? "Saving…" : "Save to library"}
            </button>
          </div>
        )}

        <textarea
          className="nav-editor-textarea"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== "Tab") return;
            e.preventDefault();
            const el = e.currentTarget;
            const start = el.selectionStart;
            const end = el.selectionEnd;
            const next = draft.slice(0, start) + "\t" + draft.slice(end);
            setDraft(next);
            requestAnimationFrame(() => {
              el.selectionStart = el.selectionEnd = start + 1;
            });
          }}
          spellCheck={false}
          aria-label="Navigation outline"
          rows={12}
        />

        {errors.length > 0 && (
          <ul className="nav-editor-errors">
            {errors.map((err) => (
              <li key={`${err.line}-${err.message}`}>
                Line {err.line}: {err.message}
              </li>
            ))}
          </ul>
        )}
        {note && <p className="nav-editor-share-note">{note}</p>}
      </div>
    </div>
  );
}

export default function NavEditorPanel() {
  const { outline, editorOpen } = useNavVersion();
  if (!editorOpen) return null;
  return <NavEditorForm key={outline} initialOutline={outline} />;
}
