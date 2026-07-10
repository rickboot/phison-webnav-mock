"use client";

import { useState } from "react";
import { useNavVersion } from "./NavVersionProvider";
import type { ParseError } from "@/lib/nav-outline";

function NavEditorForm({ initialOutline }: { initialOutline: string }) {
  const { applyOutline, getShareUrl, setEditorOpen, versionId } = useNavVersion();
  const [draft, setDraft] = useState(initialOutline);
  const [errors, setErrors] = useState<ParseError[]>([]);
  const [shareNote, setShareNote] = useState<string | null>(null);

  const onApply = () => {
    setShareNote(null);
    const result = applyOutline(draft);
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }
    setErrors([]);
  };

  const onCopyShare = async () => {
    setShareNote(null);
    const result = applyOutline(draft);
    if (!result.ok) {
      setErrors(result.errors);
      setShareNote("Fix errors before sharing");
      return;
    }
    setErrors([]);
    const url = getShareUrl(draft);
    try {
      await navigator.clipboard.writeText(url);
      setShareNote("Share link copied");
    } catch {
      setShareNote(url);
    }
  };

  return (
    <div className="nav-editor-panel" role="region" aria-label="Custom navigation editor">
      <div className="nav-editor-inner">
        <div className="nav-editor-toolbar">
          <div className="nav-editor-title-block">
            <p className="nav-editor-title">Custom nav outline</p>
            <p className="nav-editor-hint">
              4-space indent · 3 levels max · # for comments · Apply to preview as Custom
              {versionId === "custom" ? " · showing Custom" : ""}
            </p>
          </div>
          <div className="nav-editor-actions">
            <button type="button" className="nav-editor-btn" onClick={onApply}>
              Apply
            </button>
            <button type="button" className="nav-editor-btn nav-editor-btn-secondary" onClick={onCopyShare}>
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

        <textarea
          className="nav-editor-textarea"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
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
        {shareNote && <p className="nav-editor-share-note">{shareNote}</p>}
      </div>
    </div>
  );
}

export default function NavEditorPanel() {
  const { outline, editorOpen } = useNavVersion();
  if (!editorOpen) return null;
  return <NavEditorForm key={outline} initialOutline={outline} />;
}
