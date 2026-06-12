import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { supabase } from './supabaseClient';
import Cropper from 'react-easy-crop';
import { PageHeader, Card, CardHeader, Avatar, uploadImagemCelula, StatCard } from './ui';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import DetalhesMembro from './DetalhesMembro';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import Link from '@tiptap/extension-link';
import TiptapImage from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { mascaraTelefone } from './mascaras';

/* ─── Roboto via Google Fonts ─────────────────────────────────────────────── */
const RobotoStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400&display=swap');
    .agenda-root, .agenda-root * { font-family: 'Roboto', sans-serif !important; }

    /* ── SunEditor Definitivo Styles ── */
    .sun-editor-wrapper { margin-top: 8px; border-radius: 12px; overflow: hidden; border: 1.5px solid #e8edf5; background: #fff; min-height: 350px; }
    .sun-editor { border: none !important; font-family: 'Roboto', sans-serif !important; }
    .sun-editor .se-toolbar { background-color: #f8fafc !important; outline: 1px solid #e8edf5 !important; }
    .sun-editor .se-resizing-bar { background-color: #f8fafc !important; border-top: 1px solid #e8edf5 !important; }
    .sun-editor .se-wrapper-inner { min-height: 250px !important; }
    .sun-editor .se-btn-module-border { border-color: #f1f5f9 !important; }
    .sun-editor-editable { font-size: 14px !important; color: #334155 !important; line-height: 1.6 !important; }

    /* ── tokens ── */
    .agenda-root {
      --blue-900: #1e3a8a;
      --blue-700: #1d4ed8;
      --blue-500: #3b82f6;
      --blue-50:  #eff6ff;
      --teal:     #0f766e;
      --rose:     #e11d48;
      --slate-900:#0f172a;
      --slate-700:#334155;
      --slate-500:#64748b;
      --slate-300:#cbd5e1;
      --slate-100:#f1f5f9;
      --slate-50: #f8fafc;
      --white:    #ffffff;
      --radius-sm:8px;
      --radius:   14px;
      --radius-lg:20px;
      --shadow-sm:0 1px 3px rgba(0,0,0,.08),0 1px 2px rgba(0,0,0,.06);
      --shadow:   0 4px 16px rgba(30,58,138,.10);
      --shadow-lg:0 10px 40px rgba(30,58,138,.18);
    }

    /* ── btn-primary ── */
    .agenda-root .btn-primary {
      background: var(--blue-900);
      color: #fff;
      border: none;
      border-radius: var(--radius);
      font-weight: 700;
      font-size: 13px;
      letter-spacing: .04em;
      padding: 9px 20px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      box-shadow: var(--shadow);
      transition: background .18s, transform .14s, box-shadow .18s;
    }
    .agenda-root .btn-primary:hover  { background: var(--blue-700); box-shadow: var(--shadow-lg); transform: translateY(-1px); }
    .agenda-root .btn-primary:active  { transform: translateY(0); }
    .agenda-root .btn-primary:disabled{ background: var(--slate-300); color: var(--slate-500); cursor: not-allowed; transform: none; box-shadow: none; }

    .agenda-root .btn-ghost {
      background: transparent;
      color: var(--slate-700);
      border: 1.5px solid var(--slate-300);
      border-radius: var(--radius);
      font-weight: 600;
      font-size: 13px;
      padding: 8px 18px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: background .15s, border-color .15s;
    }
    .agenda-root .btn-ghost:hover { background: var(--slate-50); border-color: var(--blue-500); color: var(--blue-700); }

    .agenda-root .btn-danger {
      background: transparent;
      color: var(--rose);
      border: 1.5px solid #fecdd3;
      border-radius: var(--radius);
      font-weight: 600;
      font-size: 12px;
      padding: 6px 14px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: background .15s;
    }
    .agenda-root .btn-danger:hover { background: #fff1f2; }

    .agenda-root .btn-icon {
      width: 34px; height: 34px;
      border-radius: var(--radius-sm);
      border: 1.5px solid var(--slate-200);
      background: var(--white);
      display: inline-flex; align-items: center; justify-content: center;
      cursor: pointer;
      color: var(--slate-500);
      font-size: 14px;
      transition: background .15s, border-color .15s, color .15s;
      flex-shrink: 0;
    }
    .agenda-root .btn-icon:hover { background: var(--blue-50); border-color: var(--blue-500); color: var(--blue-700); }
    .agenda-root .btn-icon.danger:hover { background: #fff1f2; border-color: #fecdd3; color: var(--rose); }

    /* ── campo ── */
    .agenda-root .campo-label {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .08em;
      color: var(--slate-500);
      margin-bottom: 5px;
      display: block;
    }
    .agenda-root .campo-input {
      width: 100%;
      padding: 9px 12px;
      border: 1.5px solid var(--slate-300);
      border-radius: var(--radius-sm);
      font-size: 13px;
      font-weight: 500;
      color: var(--slate-900);
      background: var(--white);
      outline: none;
      transition: border-color .18s, box-shadow .18s;
      box-sizing: border-box;
    }
    .agenda-root .campo-input:focus { border-color: var(--blue-500); box-shadow: 0 0 0 3px rgba(59,130,246,.15); }
    .agenda-root .campo-input::placeholder { color: var(--slate-300); }

    /* ── card ── */
    .agenda-root .ag-card {
      background: var(--white);
      border-radius: var(--radius-lg);
      border: 1.5px solid #e8edf5;
      box-shadow: var(--shadow-sm);
      padding: 24px;
    }
    .agenda-root .ag-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .agenda-root .ag-card-title { font-size: 15px; font-weight: 700; color: var(--slate-900); }
    .agenda-root .ag-card-sub   { font-size: 12px; color: var(--slate-500); margin-top: 2px; }

    /* ── section title divider ── */
    .agenda-root .section-divider {
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--blue-900);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: .1em;
      text-transform: uppercase;
      margin-bottom: 18px;
    }
    .agenda-root .section-divider::after { content:''; flex:1; height:1px; background: linear-gradient(to right, #dbeafe, transparent); }

    /* ── Tiptap Editor Completo ── */
    .tiptap-wrapper { margin-top: 8px; border-radius: 12px; overflow: hidden; border: 1.5px solid #e8edf5; background: #fff; display: flex; flex-direction: column; }
    .tiptap-toolbar { display: flex; flex-wrap: wrap; align-items: center; gap: 2px; padding: 8px 10px; background: #f8fafc; border-bottom: 1.5px solid #e8edf5; }
    .tiptap-toolbar button { padding: 4px 9px; border: 1.5px solid transparent; border-radius: 6px; background: transparent; color: #334155; font-size: 12px; font-weight: 700; cursor: pointer; transition: background .15s, border-color .15s; font-family: 'Roboto', sans-serif; line-height: 1.4; }
    .tiptap-toolbar button:hover { background: #e8edf5; }
    .tiptap-toolbar button.is-active { background: #dbeafe; color: #1d4ed8; border-color: #bfdbfe; }
    .tiptap-sep { display: inline-block; width: 1px; height: 18px; background: #e8edf5; margin: 0 4px; vertical-align: middle; flex-shrink: 0; }
    .tiptap-content { flex: 1; padding: 16px; min-height: 300px; font-size: 14px; color: #334155; line-height: 1.6; }
    .tiptap-content .ProseMirror { min-height: 280px; outline: none; }
    .tiptap-content .ProseMirror p { margin: 0 0 8px; }
    .tiptap-content .ProseMirror h1 { font-size: 22px; font-weight: 800; margin: 14px 0 6px; color: #0f172a; }
    .tiptap-content .ProseMirror h2 { font-size: 18px; font-weight: 700; margin: 12px 0 5px; color: #1e293b; }
    .tiptap-content .ProseMirror h3 { font-size: 15px; font-weight: 700; margin: 10px 0 4px; color: #334155; }
    .tiptap-content .ProseMirror ul, .tiptap-content .ProseMirror ol { padding-left: 22px; margin: 6px 0; }
    .tiptap-content .ProseMirror li { margin: 3px 0; }
    .tiptap-content .ProseMirror blockquote { border-left: 3px solid #3b82f6; padding-left: 14px; color: #64748b; margin: 10px 0; font-style: italic; }
    .tiptap-content .ProseMirror a { color: #1d4ed8; text-decoration: underline; cursor: pointer; }
    .tiptap-content .ProseMirror img { max-width: 100%; border-radius: 8px; margin: 8px 0; display: block; }
    .tiptap-content .ProseMirror strong { font-weight: 700; }
    .tiptap-content .ProseMirror em { font-style: italic; }
    .tiptap-content .ProseMirror u { text-decoration: underline; }
    /* Tabela */
    .tiptap-content .ProseMirror table { border-collapse: collapse; width: 100%; margin: 12px 0; border-radius: 8px; overflow: hidden; }
    .tiptap-content .ProseMirror th { background: #f1f5f9; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: .04em; color: #475569; padding: 10px 14px; border: 1px solid #e2e8f0; text-align: left; }
    .tiptap-content .ProseMirror td { padding: 9px 14px; border: 1px solid #e2e8f0; font-size: 13px; color: #334155; vertical-align: top; }
    .tiptap-content .ProseMirror tr:nth-child(even) td { background: #f8fafc; }
    .tiptap-content .ProseMirror .selectedCell { background: #dbeafe !important; }
    /* YouTube */
    .tiptap-content .ProseMirror iframe { border-radius: 10px; max-width: 100%; margin: 10px 0; display: block; }


    /* ── tag/badge ── */
    .agenda-root .badge {
      font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em;
      padding: 3px 10px; border-radius: 999px;
      background: var(--blue-50); color: var(--blue-700);
    }

    /* ── toggle (Sim/Não) ── */
    .agenda-root .toggle-group {
      display: flex;
      background: var(--slate-100);
      border-radius: var(--radius-sm);
      padding: 3px;
      gap: 2px;
    }
    .agenda-root .toggle-btn {
      flex: 1; padding: 5px 8px; border: none; border-radius: 6px;
      font-size: 11px; font-weight: 700; cursor: pointer; transition: all .15s;
      background: transparent; color: var(--slate-500);
    }
    .agenda-root .toggle-btn.active { background: var(--white); color: var(--blue-700); box-shadow: var(--shadow-sm); }

    /* ── table ── */
    .agenda-root .ag-table { width: 100%; border-collapse: collapse; }
    .agenda-root .ag-table th { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; color: var(--slate-500); padding: 10px 16px; border-bottom: 1.5px solid var(--slate-100); text-align: left; }
    .agenda-root .ag-table td { padding: 12px 16px; font-size: 13px; color: var(--slate-700); border-bottom: 1px solid var(--slate-100); }
    .agenda-root .ag-table tr:last-child td { border-bottom: none; }
    .agenda-root .ag-table tr:hover td { background: var(--slate-50); }

    /* ── inscricao campo preview ── */
    .agenda-root .preview-field {
      border: 1.5px dashed var(--slate-300);
      border-radius: var(--radius-sm);
      padding: 8px 12px;
      background: var(--slate-50);
      font-size: 12px;
      color: var(--slate-500);
      margin-top: 6px;
    }

    /* ── opcao chip ── */
    .agenda-root .opcao-chip {
      display: flex; align-items: center; gap: 6px;
      background: var(--blue-50); border-radius: var(--radius-sm);
      padding: 5px 10px; font-size: 12px; color: var(--blue-700); font-weight: 500;
    }

    /* modal */
    .agenda-root .modal-overlay {
      position: fixed; inset: 0; z-index: 100;
      display: flex; align-items: center; justify-content: center;
      padding: 16px;
      background: rgba(15,23,42,.55);
      backdrop-filter: blur(4px);
    }
    .agenda-root .modal-box {
      background: var(--white);
      border-radius: var(--radius-lg);
      width: 100%; max-width: 520px;
      box-shadow: var(--shadow-lg);
      overflow: hidden;
      animation: zoomIn .18s ease;
    }
    @keyframes zoomIn { from { opacity:0; transform:scale(.95); } to { opacity:1; transform:scale(1); } }

    /* form grid */
    .agenda-root .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 20px;
    }

    /* pill tab */
    .agenda-root .tab-bar { display: flex; gap: 4px; background: var(--slate-100); padding: 4px; border-radius: var(--radius); }
    .agenda-root .tab-btn { flex:1; padding: 8px 14px; border:none; border-radius: var(--radius-sm); font-size: 13px; font-weight: 600; cursor: pointer; background: transparent; color: var(--slate-500); transition: all .15s; }
    .agenda-root .tab-btn.active { background: var(--white); color: var(--blue-700); box-shadow: var(--shadow-sm); }

    /* ── Horizontal Cards ── */
    .ag-horiz-card { display: flex; background: #fff; border-radius: var(--radius-lg); border: 1.5px solid #e8edf5; overflow: hidden; cursor: pointer; transition: transform .2s, box-shadow .2s; height: 190px; }
    .ag-horiz-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); border-color: var(--blue-300); }
    .ag-horiz-img { width: 145px; height: 100%; object-fit: cover; background: var(--slate-100); shrink: 0; }
    .ag-horiz-body { flex: 1; padding: 20px 24px; display: flex; flex-direction: column; justify-content: space-between; min-width: 0; }
    .ag-horiz-title { font-size: 19px; font-weight: 900; color: var(--slate-900); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 2px; }
    .ag-horiz-sub { font-size: 13px; color: var(--slate-500); line-height: 1.4; line-clamp: 2; display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden; }
    .ag-horiz-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 12px; border-top: 1px solid var(--slate-50); margin-top: 8px; }
  `}</style>
);

/* ─── SVG Icons ───────────────────────────────────────────────────────────── */
const Icon = {
  Plus:      () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Trash:     () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>,
  Back:      () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  Calendar:  () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  ChevL:     () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  ChevR:     () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  Close:     () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Edit:      () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Check:     () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Image:     () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  User:      () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  MapPin:    () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  ChevDown:  () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  PlusCircle:() => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
};

/* ─── helpers ─────────────────────────────────────────────────────────────── */
function Campo({ label, children }) {
  return (
    <div className="space-y-1" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {label && <span className="campo-label">{label}</span>}
      {children}
    </div>
  );
}

function InputField({ label, type = 'text', value, onChange, placeholder, required }) {
  return (
    <Campo label={label}>
      <input
        type={type} value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="campo-input"
      />
    </Campo>
  );
}

function SectionTitle({ children }) {
  return <div className="section-divider">{children}</div>;
}

/* ─── Tiptap Editor Completo ─── */
const FONT_FAMILIES = ['Roboto', 'Arial', 'Georgia', 'Times New Roman', 'Courier New', 'Verdana'];
const FONT_SIZES = ['12px', '14px', '16px', '18px', '20px', '24px', '32px', '48px'];

function TiptapMenuBar({ editor, onImageUpload }) {
  if (!editor) return null;

  const btn = (onClick, label, active, title) => (
    <button type="button" onClick={onClick} className={active ? 'is-active' : ''} title={title || label}>
      {label}
    </button>
  );

  return (
    <div className="tiptap-toolbar" style={{ flexWrap: 'wrap', gap: 2 }}>
      {/* Histórico */}
      {btn(() => editor.chain().focus().undo().run(), '↶', false, 'Desfazer')}
      {btn(() => editor.chain().focus().redo().run(), '↷', false, 'Refazer')}
      <span className="tiptap-sep" />

      {/* Fonte */}
      <select title="Fonte" style={{ fontSize: 11, padding: '3px 4px', border: '1.5px solid #e8edf5', borderRadius: 6, background: '#fff', color: '#334155', cursor: 'pointer' }}
        onChange={e => editor.chain().focus().setFontFamily(e.target.value).run()}>
        <option value="">Fonte</option>
        {FONT_FAMILIES.map(f => <option key={f} value={f}>{f}</option>)}
      </select>

      {/* Tamanho */}
      <select title="Tamanho" style={{ fontSize: 11, padding: '3px 4px', border: '1.5px solid #e8edf5', borderRadius: 6, background: '#fff', color: '#334155', cursor: 'pointer' }}
        onChange={e => {
          editor.chain().focus().setMark('textStyle', { fontSize: e.target.value }).run();
        }}>
        <option value="">Tamanho</option>
        {FONT_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      {/* Parágrafo */}
      <select title="Estilo" style={{ fontSize: 11, padding: '3px 4px', border: '1.5px solid #e8edf5', borderRadius: 6, background: '#fff', color: '#334155', cursor: 'pointer' }}
        onChange={e => {
          const v = e.target.value;
          if (v === 'paragraph') editor.chain().focus().setParagraph().run();
          else editor.chain().focus().toggleHeading({ level: parseInt(v) }).run();
        }}>
        <option value="paragraph">Parágrafo</option>
        <option value="1">Título 1</option>
        <option value="2">Título 2</option>
        <option value="3">Título 3</option>
      </select>
      <span className="tiptap-sep" />

      {/* Formatação */}
      {btn(() => editor.chain().focus().toggleBold().run(), 'N', editor.isActive('bold'), 'Negrito')}
      {btn(() => editor.chain().focus().toggleItalic().run(), 'I', editor.isActive('italic'), 'Itálico')}
      {btn(() => editor.chain().focus().toggleUnderline().run(), 'S', editor.isActive('underline'), 'Sublinhado')}
      {btn(() => editor.chain().focus().toggleStrike().run(), '✕', editor.isActive('strike'), 'Tachado')}
      <span className="tiptap-sep" />

      {/* Cor */}
      <label title="Cor do texto" style={{ position: 'relative', display:'inline-flex', alignItems:'center', justifyContent:'center', width:28, height:28, border:'1.5px solid #e8edf5', borderRadius:6, background:'#fff', cursor:'pointer', fontSize:12, fontWeight:700 }}>
        A
        <input type="color" style={{ position:'absolute', inset:0, opacity:0, cursor:'pointer', width:'100%', height:'100%' }}
          onChange={e => editor.chain().focus().setColor(e.target.value).run()} />
      </label>
      <span className="tiptap-sep" />

      {/* Alinhamento */}
      {btn(() => editor.chain().focus().setTextAlign('left').run(), '⬡L', editor.isActive({ textAlign: 'left' }), 'Alinhar à esquerda')}
      {btn(() => editor.chain().focus().setTextAlign('center').run(), '⬡C', editor.isActive({ textAlign: 'center' }), 'Centralizar')}
      {btn(() => editor.chain().focus().setTextAlign('right').run(), '⬡R', editor.isActive({ textAlign: 'right' }), 'Alinhar à direita')}
      {btn(() => editor.chain().focus().setTextAlign('justify').run(), '⬡J', editor.isActive({ textAlign: 'justify' }), 'Justificar')}
      <span className="tiptap-sep" />

      {/* Listas */}
      {btn(() => editor.chain().focus().toggleBulletList().run(), '• Lista', editor.isActive('bulletList'), 'Lista com marcadores')}
      {btn(() => editor.chain().focus().toggleOrderedList().run(), '1. Lista', editor.isActive('orderedList'), 'Lista numerada')}
      {btn(() => editor.chain().focus().toggleBlockquote().run(), '❝', editor.isActive('blockquote'), 'Citação')}
      <span className="tiptap-sep" />

      {/* Tabela */}
      {btn(() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(), '⊞ Tabela', false, 'Inserir tabela')}
      {editor.isActive('table') && <>
        {btn(() => editor.chain().focus().addColumnAfter().run(), '+Col', false, 'Adicionar coluna')}
        {btn(() => editor.chain().focus().addRowAfter().run(), '+Lin', false, 'Adicionar linha')}
        {btn(() => editor.chain().focus().deleteColumn().run(), '-Col', false, 'Remover coluna')}
        {btn(() => editor.chain().focus().deleteRow().run(), '-Lin', false, 'Remover linha')}
        {btn(() => editor.chain().focus().deleteTable().run(), '✕Tab', false, 'Remover tabela')}
      </>}
      <span className="tiptap-sep" />

      {/* Link */}
      <button type="button" className={editor.isActive('link') ? 'is-active' : ''} title="Inserir link"
        onClick={() => {
          if (editor.isActive('link')) { editor.chain().focus().unsetLink().run(); return; }
          const url = window.prompt('URL do link:');
          if (url) editor.chain().focus().setLink({ href: url, target: '_blank' }).run();
        }}>🔗</button>

      {/* Upload de imagem */}
      <label title="Upload de imagem" style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:28, height:28, border:'1.5px solid #e8edf5', borderRadius:6, background:'#fff', cursor:'pointer', fontSize:14 }}>
        🖼
        <input type="file" accept="image/*" style={{ display:'none' }} onChange={onImageUpload} />
      </label>

      {/* YouTube */}
      <button type="button" title="Incorporar YouTube"
        onClick={() => {
          const url = window.prompt('URL do vídeo YouTube:');
          if (url) editor.chain().focus().setYoutubeVideo({ src: url, width: 640, height: 360 }).run();
        }}>▶ YouTube</button>

      <span className="tiptap-sep" />
      {btn(() => editor.chain().focus().clearNodes().unsetAllMarks().run(), '✕ Limpar', false, 'Limpar formatação')}
    </div>
  );
}

function QuillEditorDetalhes({ value, onChange }) {
  const isInternalUpdate = React.useRef(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      FontFamily,
      Link.configure({ openOnClick: false }),
      TiptapImage.configure({ inline: false, allowBase64: true }),
      Youtube.configure({ controls: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      isInternalUpdate.current = true;
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (isInternalUpdate.current) { isInternalUpdate.current = false; return; }
    const currentHTML = editor.getHTML();
    const normalizedValue = value || '';
    const editorEmpty = currentHTML === '<p></p>' || currentHTML === '';
    const valueEmpty = normalizedValue === '' || normalizedValue === '<p></p>';
    if (editorEmpty && valueEmpty) return;
    if (normalizedValue !== currentHTML) {
      editor.commands.setContent(normalizedValue, false);
    }
  }, [value, editor]);

  // Upload de imagem para Supabase Storage
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !editor) return;
    try {
      const ext = file.name.split('.').pop();
      const path = `editor/${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from('agenda').upload(path, file, { upsert: true });
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from('agenda').getPublicUrl(path);
      editor.chain().focus().setImage({ src: publicUrl }).run();
    } catch (err) {
      alert('Erro ao fazer upload da imagem: ' + err.message);
    }
  };

  return (
    <div className="tiptap-wrapper">
      <TiptapMenuBar editor={editor} onImageUpload={handleImageUpload} />
      <EditorContent editor={editor} className="tiptap-content" />
    </div>
  );
}

/* ─── Main Export ─────────────────────────────────────────────────────────── */
export default function AgendaModulo({ submenu, onNavigate, membroLogado, pessoas = [] }) {
  const [eventos, setEventos] = useState([]);
  const [dataAtual, setDataAtual] = useState(new Date());
  const [carregando, setCarregando] = useState(false);
  const [modalEvento, setModalEvento] = useState({ aberto: false, dados: null });
  const [view, setView] = useState('lista'); // 'lista', 'form', 'dashboard'
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [membroParaVerId, setMembroParaVerId] = useState(null);

  const podeEditar = ['admin', 'pastor', 'secretaria'].includes(membroLogado?.permissao);

  const carregarEventos = async () => {
    setCarregando(true);
    try {
      const { data, error } = await supabase
        .from('agenda_eventos')
        .select('*')
        .order('data_inicio', { ascending: true });
      if (error) {
        if (error.code === 'PGRST116' || error.message.includes('does not exist')) {
          setEventos([]);
        } else throw error;
      } else setEventos(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => { carregarEventos(); }, []);
  useEffect(() => { setView('lista'); }, [submenu]);

  const mudarMes = (offset) => {
    setDataAtual(new Date(dataAtual.getFullYear(), dataAtual.getMonth() + offset, 1));
  };

  const handleSalvarEvento = async (e) => {
    e.preventDefault();
    const form = e.target;
    const novoEvento = {
      titulo: form.titulo.value,
      descricao: form.descricao.value,
      data_inicio: form.data_inicio.value,
      cor: form.cor.value,
      tipo: form.tipo.value
    };
    try {
      if (modalEvento.dados?.id) {
        const { error } = await supabase.from('agenda_eventos').update(novoEvento).eq('id', modalEvento.dados.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('agenda_eventos').insert([novoEvento]);
        if (error) throw error;
      }
      setModalEvento({ aberto: false, dados: null });
      carregarEventos();
    } catch (err) { alert("Erro ao salvar evento: " + err.message); }
  };

  const excluirEvento = async (id) => {
    if (!window.confirm("Deseja excluir este evento?")) return;
    const { error } = await supabase.from('agenda_eventos').delete().eq('id', id);
    if (error) alert(error.message);
    else { setModalEvento({ aberto: false, dados: null }); carregarEventos(); }
  };

  // Se estiver visualizando a ficha de um membro, renderiza o componente de detalhes
  if (membroParaVerId) {
    return (
      <DetalhesMembro 
        pessoaId={membroParaVerId} 
        onFechar={() => setMembroParaVerId(null)} 
        listaPessoas={pessoas}
        membroLogado={membroLogado}
      />
    );
  }

  return (
    <div className="agenda-root space-y-6">
      <RobotoStyle /> {/* Mantido para estilos internos */}
      <div className="hidden md:block">
        <PageHeader
          titulo="Agenda"
          breadcrumb={['Agenda', submenu === 'calendario' ? 'Calendário' : 'Lista de Eventos']}
          onNavigate={() => onNavigate('calendario')}
        />
      </div>

      {/* ── CALENDÁRIO ── */}
      {submenu === 'calendario' && (
        <div className="ag-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1.5px solid #e8edf5', background: '#f8fafc' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button className="btn-icon" onClick={() => mudarMes(-1)}><Icon.ChevL /></button>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', textTransform: 'capitalize', minWidth: 160, textAlign: 'center' }}>
                {dataAtual.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
              </h3>
              <button className="btn-icon" onClick={() => mudarMes(1)}><Icon.ChevR /></button>
            </div>
            {podeEditar && (
              <button
                className="btn-primary"
                onClick={() => setModalEvento({ aberto: true, dados: { data_inicio: new Date().toISOString().slice(0, 16) } })}
              >
                <Icon.Plus /> Novo Evento
              </button>
            )}
          </div>
          <CalendarioMensal
            data={dataAtual}
            eventos={eventos}
            onEditarEvento={(ev) => setModalEvento({ aberto: true, dados: ev })}
            podeEditar={podeEditar}
          />
        </div>
      )}

      {/* ── EVENTOS LISTA / FORM ── */}
      {submenu === 'eventos' && (
        {
          lista: (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="ag-card-title" style={{ fontSize: 20 }}>Eventos Publicados</h3>
                {podeEditar && (
                  <button className="btn-primary" onClick={() => setView('form')}>
                    <Icon.Plus /> Criar Novo Evento
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 gap-5">
                {eventos.length === 0 ? (
                  <div className="ag-card text-center py-24 text-slate-400 italic">Nenhum evento publicado.</div>
                ) : (
                  eventos.map(ev => (
                    <div key={ev.id} className="ag-horiz-card" onClick={() => { setEventoSelecionado(ev); setView('dashboard'); }}>
                      <img src={ev.capa_url || 'https://via.placeholder.com/145x190?text=Sem+Capa'} className="ag-horiz-img" alt={ev.titulo} />
                      <div className="ag-horiz-body">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="badge" style={{ background: ev.cor + '15', color: ev.cor }}>{ev.tipo}</span>
                            <span className={`text-[10px] font-black uppercase ${ev.valor_tipo === 'pago' ? 'text-rose-600' : 'text-emerald-600'}`}>
                              {ev.valor_tipo === 'pago' ? 'Evento Pago' : 'Gratuito'}
                            </span>
                          </div>
                          <h4 className="ag-horiz-title">{ev.titulo}</h4>
                          <p className="ag-horiz-sub">{ev.subtitulo || ev.descricao || 'Sem descrição definida.'}</p>
                        </div>
                        <div className="ag-horiz-footer">
                          <div className="flex items-center gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                            <span className="flex items-center gap-1.5">
                              <Icon.Calendar /> 
                              {ev.data_inicio ? 
                                `${ev.data_inicio.split('T')[0].split('-').reverse().join('/')}` : '—'}
                            </span>
                            {ev.local_nome && <span className="flex items-center gap-1.5"><Icon.MapPin /> {ev.local_nome}</span>}
                          </div>
                          <button className="btn-ghost" style={{ padding: '6px 12px', fontSize: 11, background: 'var(--blue-50)', color: 'var(--blue-900)', border: 'none' }} onClick={(e) => { e.stopPropagation(); window.open(`${window.location.origin}/inscricao-evento/${ev.id}`, '_blank'); }}>
                            Ficha de Inscrição ➔
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ),
          form: (
            <FormularioEvento
              onVoltar={() => { setView('lista'); setEventoSelecionado(null); }}
              onSucesso={() => { setView('lista'); setEventoSelecionado(null); carregarEventos(); }}
              eventoParaEditar={eventoSelecionado}
            />
          ),
          dashboard: (
            <DashboardEvento 
              evento={eventoSelecionado} 
              pessoas={pessoas}
              onVoltar={() => { setView('lista'); setEventoSelecionado(null); }}
              onEditar={() => setView('form')}
              onVerMembro={setMembroParaVerId}
            />
          )
        }[view]
      )}

      {/* ── MODAL EVENTO ── */}
      {modalEvento.aberto && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1.5px solid #e8edf5', background: '#f8fafc' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b' }}>
                {modalEvento.dados?.id ? 'Editar Evento' : 'Novo Evento'}
              </h3>
              <button className="btn-icon" onClick={() => setModalEvento({ aberto: false, dados: null })}>
                <Icon.Close />
              </button>
            </div>
            <form onSubmit={handleSalvarEvento} style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Campo label="Título do Evento">
                <input type="text" name="titulo" defaultValue={modalEvento.dados?.titulo} placeholder="Título" required className="campo-input" />
              </Campo>
              <Campo label="Descrição">
                <textarea name="descricao" defaultValue={modalEvento.dados?.descricao} placeholder="Breve descrição" rows="2" className="campo-input" style={{ resize: 'none' }} />
              </Campo>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <Campo label="Data e Hora">
                  <input type="datetime-local" name="data_inicio" defaultValue={modalEvento.dados?.data_inicio?.slice(0, 16)} required className="campo-input" />
                </Campo>
                <Campo label="Tipo">
                  <select name="tipo" defaultValue={modalEvento.dados?.tipo || 'evento'} className="campo-input">
                    <option value="culto">Culto</option>
                    <option value="reuniao">Reunião</option>
                    <option value="evento">Evento Especial</option>
                    <option value="feriado">Feriado / Outros</option>
                  </select>
                </Campo>
              </div>
              <Campo label="Cor no Calendário">
                <input type="color" name="cor" defaultValue={modalEvento.dados?.cor || '#1e3a8a'} className="campo-input" style={{ padding: 4, height: 42, cursor: 'pointer' }} />
              </Campo>
              <div style={{ display: 'flex', gap: 10, paddingTop: 4 }}>
                {podeEditar && modalEvento.dados?.id && (
                  <button type="button" className="btn-danger" onClick={() => excluirEvento(modalEvento.dados.id)}>
                    <Icon.Trash /> Excluir
                  </button>
                )}
                <button type="button" className="btn-ghost" style={{ flex: 1 }} onClick={() => setModalEvento({ aberto: false, dados: null })}>
                  Cancelar
                </button>
                {podeEditar && (
                  <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                    <Icon.Check /> Salvar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── DashboardEvento ──────────────────────────────────────────────────────── */
function DashboardEvento({ evento, pessoas, onVoltar, onEditar, onVerMembro }) {
  const [inscritos, setInscritos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [modalInscrito, setModalInscrito] = useState({ aberto: false, dados: null });

  useEffect(() => {
    async function carregarInscritos() {
      setCarregando(true);
      try {
        const { data, error } = await supabase
          .from('agenda_inscricoes')
          .select('*')
          .eq('evento_id', evento.id)
          .order('created_at', { ascending: false });
        if (!error) setInscritos(data || []);
      } catch (err) { console.error(err); }
      finally { setCarregando(false); }
    }
    carregarInscritos();
  }, [evento.id]);

  // Cálculos de Indicadores para o Dashboard
  const stats = useMemo(() => {
    const confirmados = inscritos.filter(i => i.status_pagamento === 'pago').length;
    const pendentes = inscritos.filter(i => i.status_pagamento === 'pendente' || !i.status_pagamento).length;
    const cancelados = inscritos.filter(i => i.status_pagamento === 'cancelado').length;
    
    // Vagas ocupadas (considerando pagos e pendentes como reserva de vaga)
    const ocupadas = confirmados + pendentes;
    const disponiveis = evento.vagas ? Math.max(0, evento.vagas - ocupadas) : '∞';
    
    // Total recebido (apenas dos confirmados)
    const totalRecebido = confirmados * (Number(evento.valor) || 0);

    return { confirmados, pendentes, cancelados, disponiveis, totalRecebido };
  }, [inscritos, evento]);

  // Processamento de dados para o gráfico de linha (Inscrições por dia)
  const chartData = useMemo(() => {
    const grupos = {};
    const sorted = [...inscritos].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    sorted.forEach(ins => {
      const data = new Date(ins.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      grupos[data] = (grupos[data] || 0) + 1;
    });
    return Object.entries(grupos).map(([name, value]) => ({ name, value }));
  }, [inscritos]);

  // Helper para encontrar valores no JSON dinâmico
  const findInJson = (obj, query) => {
    if (!obj) return null;
    const key = Object.keys(obj).find(k => k.toLowerCase().includes(query.toLowerCase()));
    return key ? obj[key] : null;
  };

  const formatarDataHoraExibicao = (iso) => {
    if (!iso) return '—';
    const [data, hora] = iso.split('T');
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano} ${hora ? hora.slice(0, 5) : '00:00'}`;
  };

  const handleUpdateStatus = async (id, novoStatus) => {
    const { error } = await supabase.from('agenda_inscricoes').update({ status_pagamento: novoStatus }).eq('id', id);
    if (!error) { carregarInscritos(); setModalInscrito({ aberto: false, dados: null }); }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between">
        <button className="btn-ghost" onClick={onVoltar}><Icon.Back /> Voltar para lista</button>
        <div className="flex gap-2">
          <button className="btn-ghost" onClick={() => window.print()}>🖨️ Imprimir Lista</button>
          <button className="btn-primary" onClick={onEditar}>✏️ Editar Evento</button>
        </div>
      </div>

      <div className="ag-card" style={{ padding: 32 }}>
        <div className="flex flex-col md:flex-row gap-10">
          <div style={{ width: 200, shrink: 0 }}>
            <img src={evento.capa_url || 'https://via.placeholder.com/200x270?text=Sem+Capa'} className="rounded-2xl shadow-xl border-4 border-white w-full object-cover" style={{ aspectRatio: '3/4' }} alt="Capa" />
          </div>
          <div className="flex-1 space-y-6">
            <div>
              <span className="badge" style={{ background: 'var(--blue-900)', color: '#fff' }}>{evento.tipo}</span>
              <h1 className="text-4xl font-black text-slate-800 mt-3 tracking-tight">{evento.titulo}</h1>
              <p className="text-slate-500 font-medium text-xl leading-snug">{evento.subtitulo}</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-slate-100">
              <div><span className="campo-label">Início do Evento</span><p className="text-sm font-black text-slate-700">{formatarDataHoraExibicao(evento.data_inicio)}</p></div>
              <div><span className="campo-label">Término</span><p className="text-sm font-black text-slate-700">{formatarDataHoraExibicao(evento.data_fim)}</p></div>
              <div><span className="campo-label">Confirmados</span><p className="text-sm font-black text-blue-600">{inscritos.length} inscritos</p></div>
              <div><span className="campo-label">Vagas Totais</span><p className="text-sm font-black text-slate-700">{evento.vagas || 'Sem limite'}</p></div>
            </div>
          </div>
        </div>
      </div>

      {/* LINHA DE INDICADORES RÁPIDOS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Confirmados" valor={stats.confirmados} detalhe="Inscrições pagas" icone="✅" />
        <StatCard label="Pendentes" valor={stats.pendentes} detalhe="Aguardando PG" icone="⏳" />
        <StatCard label="Cancelados" valor={stats.cancelados} detalhe="Desistentes" icone="🚫" />
        <StatCard label="Disponíveis" valor={stats.disponiveis} detalhe="Vagas abertas" icone="🎟️" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CARD TOTAL RECEBIDO DESTACADO */}
        <div 
          className="lg:col-span-1 p-8 rounded-[24px] shadow-xl flex flex-col justify-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)', color: '#ffffff' }}
        >
          <div className="absolute -right-6 -bottom-6 opacity-20 rotate-12">
            <svg width="140" height="140" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.15 0 2.25-.56 2.25-1.75 0-.94-.74-1.55-2.45-1.99-2.31-.6-4.14-1.48-4.14-3.8 0-2.09 1.63-3.41 3.27-3.79V3.2h2.67v1.88c1.37.31 2.82 1.13 2.97 3.21h-1.93c-.14-.94-.84-1.68-2.38-1.68-1.37 0-2.1.72-2.1 1.51 0 .97.94 1.48 2.84 1.95 2.5.62 4.14 1.7 4.14 3.93 0 2.38-1.63 3.66-3.66 3.89z"/></svg>
          </div>
          <h3 style={{ margin: 0, fontSize: 13, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.9 }}>
            Total Recebido
          </h3>
          <div style={{ fontSize: 44, fontWeight: 900, marginTop: 8, letterSpacing: '-0.02em', lineHeight: 1 }}>
            {stats.totalRecebido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </div>
          <p style={{ margin: '16px 0 0', fontSize: 11, fontWeight: 700, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {stats.confirmados} inscrições confirmadas
          </p>
        </div>

        {/* GRÁFICO DE INSCRIÇÕES POR PERÍODO */}
        <Card className="lg:col-span-2 p-0 overflow-hidden">
          <CardHeader titulo="Inscrições por Período" subtitulo="Tendência de novas adesões ao longo do tempo." />
          <div className="h-64 p-6 pt-2">
            {chartData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400 italic text-sm">Aguardando as primeiras inscrições...</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-lg)' }} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    name="Inscrições" 
                    stroke="var(--blue-900)" 
                    strokeWidth={4} 
                    dot={{ r: 4, fill: 'var(--blue-900)', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>
      </div>

      <div className="ag-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="ag-card-header" style={{ padding: '20px 24px', marginBottom: 0, borderBottom: '1.5px solid #f1f5f9', background: '#fcfcfd' }}>
          <div className="ag-card-title">Participantes Inscritos</div>
          <span className="badge" style={{ background: '#eff6ff', color: '#1e3a8a' }}>{inscritos.length} registros</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="ag-table">
            <thead>
              <tr><th>Data</th><th>Participante</th><th>E-mail / Telefone</th><th style={{ textAlign: 'right' }}>Status</th></tr>
            </thead>
            <tbody>
              {carregando ? (
                <tr><td colSpan="4" className="text-center py-10 animate-pulse text-slate-400">Processando lista...</td></tr>
              ) : inscritos.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-24 text-slate-400 italic">Nenhuma inscrição realizada para este evento.</td></tr>
              ) : inscritos.map(i => {
                const nome = findInJson(i.dados_inscricao, 'nome') || findInJson(i.dados_inscricao, 'completo') || 'Participante';
                const rawPhone = findInJson(i.dados_inscricao, 'telefone') || findInJson(i.dados_inscricao, 'celular') || findInJson(i.dados_inscricao, 'whatsapp') || findInJson(i.dados_inscricao, 'contato');
                const email = findInJson(i.dados_inscricao, 'email');
                const contato = rawPhone ? mascaraTelefone(rawPhone) : (email || '—');

                const membroFound = pessoas.find(p => 
                  (email && p.email?.toLowerCase() === email.toLowerCase()) || 
                  (nome && p.nome?.toLowerCase() === nome.toLowerCase())
                );

                return (
                  <tr key={i.id} className="cursor-pointer hover:bg-slate-50 transition" onClick={() => setModalInscrito({ aberto: true, dados: i })}>
                    <td className="text-xs font-bold text-slate-400">{new Date(i.created_at).toLocaleDateString('pt-BR')}</td>
                    <td className="font-bold text-slate-700">
                      {nome} {membroFound && <span className="ml-2 text-[9px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-100 font-black">MEMBRO</span>}
                    </td>
                    <td className="text-xs text-slate-500">{contato}</td>
                    <td style={{ textAlign: 'right' }}>
                      <span className={`badge ${i.status_pagamento === 'pago' ? 'bg-emerald-50 text-emerald-700' : i.status_pagamento === 'cancelado' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'}`}>
                        {i.status_pagamento || 'pendente'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DETALHES DO INSCRITO */}
      {modalInscrito.aberto && (
        <div className="modal-overlay px-2 py-4">
          <div className="modal-box" style={{ maxWidth: 600 }}>
            <div className="p-6 border-b bg-slate-50 flex justify-between items-center">
              <h3 className="font-black text-slate-800 uppercase tracking-tight">Detalhes da Inscrição</h3>
              <button className="btn-icon" onClick={() => setModalInscrito({ aberto: false, dados: null })}><Icon.Close /></button>
            </div>
            <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(modalInscrito.dados.dados_inscricao).map(([label, valor]) => {
                  const isPhone = ['telefone', 'celular', 'whatsapp', 'contato'].some(k => label.toLowerCase().includes(k));
                  const valorFormatado = (isPhone && typeof valor === 'string') ? mascaraTelefone(valor) : (Array.isArray(valor) ? valor.join(', ') : String(valor));
                  return (
                    <div key={label} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1">{label}</p>
                      <p className="text-sm font-bold text-slate-700">{valorFormatado}</p>
                    </div>
                  );
                })}
              </div>

              {/* Vínculo com Membro */}
              {(() => {
                const email = findInJson(modalInscrito.dados.dados_inscricao, 'email');
                const nome = findInJson(modalInscrito.dados.dados_inscricao, 'nome');
                const membro = pessoas.find(p => (email && p.email?.toLowerCase() === email.toLowerCase()) || (nome && p.nome?.toLowerCase() === nome.toLowerCase()));
                
                if (membro) {
                  return (
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">👤</div>
                        <div>
                          <p className="text-xs font-black text-blue-800 uppercase">Membro Identificado</p>
                          <p className="text-[11px] text-blue-600">Este inscrito consta na sua base de membros.</p>
                        </div>
                      </div>
                      <button className="btn-primary" style={{ fontSize: 11, padding: '6px 12px' }} onClick={() => onVerMembro(membro.id)}>Abrir Ficha ➔</button>
                    </div>
                  );
                }
                return null;
              })()}

              <div className="pt-4 border-t space-y-3">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Alterar Status de Pagamento</p>
                <div className="flex gap-2">
                  <button onClick={() => handleUpdateStatus(modalInscrito.dados.id, 'pago')} className="flex-1 py-3 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-emerald-100">Confirmar Pagamento</button>
                  <button onClick={() => handleUpdateStatus(modalInscrito.dados.id, 'pendente')} className="flex-1 py-3 bg-amber-500 text-white rounded-xl text-xs font-black uppercase tracking-wider">Deixar Pendente</button>
                  <button onClick={() => handleUpdateStatus(modalInscrito.dados.id, 'cancelado')} className="flex-1 py-3 bg-rose-600 text-white rounded-xl text-xs font-black uppercase tracking-wider">Cancelar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── FormularioEvento ─────────────────────────────────────────────────────── */
function FormularioEvento({ onVoltar, onSucesso, eventoParaEditar }) {
  const [enviando, setEnviando] = useState(false);
  const [capaPreview, setCapaPreview] = useState(eventoParaEditar?.capa_url || '');
  const [capaFile, setCapaFile] = useState(null);

  const [titulo, setTitulo] = useState(eventoParaEditar?.titulo || '');
  const [subtitulo, setSubtitulo] = useState(eventoParaEditar?.subtitulo || '');
  const [dataIni, setDataIni] = useState(eventoParaEditar?.data_inicio ? eventoParaEditar.data_inicio.slice(0, 16) : '');
  const [dataFim, setDataFim] = useState(eventoParaEditar?.data_fim ? eventoParaEditar.data_fim.slice(0, 16) : '');
  const [notifEmail, setNotifEmail] = useState(eventoParaEditar?.receber_notificacoes || false);
  const [emailAlerta, setEmailAlerta] = useState(eventoParaEditar?.email_notificacao || '');
  const [tipoValor, setTipoValor] = useState(eventoParaEditar?.valor_tipo || 'gratuito');
  const [vagas, setVagas] = useState(eventoParaEditar?.vagas || 0);
  const [valor, setValor] = useState(eventoParaEditar?.valor || 0);
  const [formasPagamento, setFormasPagamento] = useState(eventoParaEditar?.formas_pagamento || []);
  const [programacao, setProgramacao] = useState(eventoParaEditar?.programacao || []);
  const [camposInscricao, setCamposInscricao] = useState(eventoParaEditar?.campos_inscricao || []);
  const [detalhes, setDetalhes] = useState(eventoParaEditar?.detalhes_ricos || '');
  const [localNome, setLocalNome] = useState(eventoParaEditar?.local_nome || '');
  const [localUrl, setLocalUrl] = useState(eventoParaEditar?.local_url || '');
  const [palestrantes, setPalestrantes] = useState(eventoParaEditar?.palestrantes || []);

  // Estados para Recorte de Fotos (Palestrantes)
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [mostrarCortador, setMostrarCortador] = useState(false);
  const [palestranteIdxEdicao, setPalestranteIdxEdicao] = useState(null);

  const canSave = useMemo(() => titulo.trim() !== '' && dataIni && dataFim, [titulo, dataIni, dataFim]);

  const onCropComplete = useCallback((_, pixels) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const criarImagemRecortada = async () => {
    try {
      if (!imageSrc || !croppedAreaPixels) {
        console.warn("Recorte não pôde ser processado: dados de imagem ou área ausentes.");
        return;
      }

      const image = new window.Image();
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
        image.src = imageSrc;
      });

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;
      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );
      canvas.toBlob((blob) => {
        if (!blob || palestranteIdxEdicao === null) return;
        const n = [...palestrantes];
        n[palestranteIdxEdicao].foto = blob;
        n[palestranteIdxEdicao].preview = URL.createObjectURL(blob);
        n[palestranteIdxEdicao] = {
          ...n[palestranteIdxEdicao],
          foto: blob,
          preview: URL.createObjectURL(blob)
        };
        setPalestrantes(n);
        setMostrarCortador(false);
        setPalestranteIdxEdicao(null);
        setCroppedAreaPixels(null);
      }, 'image/jpeg');
    } catch (e) {
      console.error("Erro ao processar recorte:", e);
    }
  };

  const handleAddProgramacao = () => setProgramacao([...programacao, { id: Date.now(), titulo: '', data: '', horario: '' }]);
  const handleAddCampo = () => setCamposInscricao([...camposInscricao, { id: Date.now(), nome: '', obrigatorio: false, tipo: 'texto', opcoes: [] }]);
  const handleAddPalestrante = () => setPalestrantes([...palestrantes, { id: `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`, nome: '', descricao: '', foto: null, preview: '' }]);

  async function handleSalvarEvento() {
    if (!canSave) return;
    setEnviando(true);
    try {
      let capaUrl = eventoParaEditar?.capa_url || '';
      if (capaFile) capaUrl = await uploadImagemCelula(capaFile, 'capa-evento');

      // Upload de fotos de palestrantes (processa novos recortes)
      const palestrantesFinal = await Promise.all((palestrantes || []).map(async (p) => {
        if (p.foto instanceof Blob) {
          try {
            const url = await uploadImagemCelula(p.foto, `palestrante-${p.id}`);
            const { foto, ...rest } = p;
            return { ...rest, preview: url };
          } catch (err) {
            console.error("Erro ao subir foto de palestrante:", err);
            return p;
          }
        }
        return p;
      }));

      const payload = {
        titulo, subtitulo, data_inicio: dataIni, data_fim: dataFim,
        receber_notificacoes: notifEmail, email_notificacao: emailAlerta,
        valor_tipo: tipoValor, vagas: Number(vagas), valor: Number(valor),
        formas_pagamento: formasPagamento,
        programacao, campos_inscricao: camposInscricao,
        detalhes_ricos: detalhes, local_nome: localNome, local_url: localUrl,
        palestrantes: palestrantesFinal, capa_url: capaUrl, tipo: 'evento', cor: '#1e3a8a'
      };

      let resError;
      if (eventoParaEditar?.id) {
        const { error: err } = await supabase.from('agenda_eventos').update(payload).eq('id', eventoParaEditar.id);
        resError = err;
      } else {
        const { error: err } = await supabase.from('agenda_eventos').insert([payload]);
        resError = err;
      }

      if (resError) throw resError;
      onSucesso();
    } catch (err) {
      alert("Erro ao salvar: " + err.message);
    } finally {
      setEnviando(false);
    }
  }

  /* helper para atualizar campo de inscrição */
  const updateCampo = (idx, patch) => {
    const n = [...camposInscricao];
    n[idx] = { ...n[idx], ...patch };
    setCamposInscricao(n);
  };

  const addOpcaoCampo = (idx) => {
    const n = [...camposInscricao];
    n[idx].opcoes = [...(n[idx].opcoes || []), { id: Date.now(), label: '' }];
    setCamposInscricao(n);
  };

  const updateOpcao = (campoIdx, opcaoId, value) => {
    const n = [...camposInscricao];
    n[campoIdx].opcoes = n[campoIdx].opcoes.map(o => o.id === opcaoId ? { ...o, label: value } : o);
    setCamposInscricao(n);
  };

  const removeOpcao = (campoIdx, opcaoId) => {
    const n = [...camposInscricao];
    n[campoIdx].opcoes = n[campoIdx].opcoes.filter(o => o.id !== opcaoId);
    setCamposInscricao(n);
  };

  const tipoTemOpcoes = (tipo) => ['checkbox', 'radio', 'seleção'].includes(tipo);
  const tipoEhTexto = (tipo) => tipo === 'texto';
  const tipoEhArea = (tipo) => tipo === 'área de texto';

  return (
    <div className="agenda-root" style={{ maxWidth: 960, margin: '0 auto', paddingBottom: 60 }}>
      <RobotoStyle /> {/* Mantido para estilos internos */}

      {/* topbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <button className="btn-ghost" onClick={onVoltar}>
          <Icon.Back /> Voltar
        </button>
        <button
          className="btn-primary"
          onClick={handleSalvarEvento}
          disabled={!canSave || enviando}
          style={{ opacity: (!canSave || enviando) ? .5 : 1, cursor: (!canSave || enviando) ? 'not-allowed' : 'pointer' }}
        >
          {enviando ? 'Salvando...' : <><Icon.Check /> Publicar Evento</>}
        </button>
      </div>

      {/* ── GRID PRINCIPAL ── */}
      <div className="form-grid">

        {/* CARD 1 – INFORMAÇÕES BÁSICAS */}
        <div className="ag-card" style={{ gridColumn: '1 / -1' }}>
          <SectionTitle><Icon.Calendar /> Informações do Evento</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 24 }}>
            {/* capa */}
            <div>
              <span className="campo-label">Capa / Cartaz</span>
              <div style={{ aspectRatio: '3/4', borderRadius: 12, border: '2px dashed #cbd5e1', background: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }} className="group">
                {capaPreview
                  ? <img src={capaPreview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: '#94a3b8' }}>
                      <Icon.Image />
                      <span style={{ fontSize: 11, fontWeight: 600 }}>Clique para adicionar</span>
                    </div>
                }
                <label style={{ position: 'absolute', inset: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,.45)', opacity: 0, transition: 'opacity .2s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = 1}
                  onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                  <span style={{ color: '#fff', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>Alterar Imagem</span>
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => {
                    const f = e.target.files[0];
                    if (f) { setCapaFile(f); setCapaPreview(URL.createObjectURL(f)); }
                  }} />
                </label>
              </div>
            </div>

            {/* campos */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <InputField label="Título do Evento *" value={titulo} onChange={setTitulo} placeholder="Ex: Congresso de Mulheres 2024" />
              <InputField label="Subtítulo" value={subtitulo} onChange={setSubtitulo} placeholder="Ex: Uma jornada de fé e renovo" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <InputField label="Data Inicial *" type="datetime-local" value={dataIni} onChange={setDataIni} />
                <InputField label="Data Final *" type="datetime-local" value={dataFim} onChange={setDataFim} />
              </div>
              <div style={{ borderTop: '1.5px solid #f1f5f9', paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="checkbox" checked={notifEmail} onChange={e => setNotifEmail(e.target.checked)} style={{ accentColor: '#1e3a8a', width: 15, height: 15 }} />
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#334155' }}>Receber notificações por e-mail a cada inscrição</span>
                </label>
                {notifEmail && (
                  <InputField label="E-mail para alertas" type="email" value={emailAlerta} onChange={setEmailAlerta} placeholder="secretaria@igreja.com" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2 – INSCRIÇÃO E VAGAS */}
        <div className="ag-card">
          <SectionTitle>Inscrição e Vagas</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Campo label="Tipo de Evento">
              <div className="tab-bar">
                <button className={`tab-btn ${tipoValor === 'gratuito' ? 'active' : ''}`} onClick={() => setTipoValor('gratuito')}>Gratuito</button>
                <button className={`tab-btn ${tipoValor === 'pago' ? 'active' : ''}`} onClick={() => setTipoValor('pago')}>Pago</button>
              </div>
            </Campo>
            <InputField label="Quantidade de Vagas" type="number" value={vagas} onChange={setVagas} />
            {tipoValor === 'pago' && (
              <InputField label="Valor da Inscrição (R$)" type="number" value={valor} onChange={setValor} placeholder="0,00" />
            )}
            {tipoValor === 'pago' && (
              <div style={{ background: '#eff6ff', borderRadius: 12, border: '1.5px solid #bfdbfe', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span className="campo-label" style={{ color: '#2563eb' }}>Formas de Pagamento</span>
                {['Em espécie', 'Via Pix', 'Cartão de crédito', 'Local do evento'].map(f => (
                  <div key={f}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                      <input type="checkbox" checked={formasPagamento.some(i => i.tipo === f)}
                        onChange={e => e.target.checked
                          ? setFormasPagamento([...formasPagamento, { tipo: f, instrucao: '' }])
                          : setFormasPagamento(formasPagamento.filter(x => x.tipo !== f))}
                        style={{ accentColor: '#1e3a8a', width: 14, height: 14 }} />
                      <span style={{ fontSize: 13, fontWeight: 500, color: '#1e40af' }}>{f}</span>
                    </label>
                    {formasPagamento.some(i => i.tipo === f) && (
                      <textarea
                        placeholder={`Instruções para ${f}...`}
                        value={formasPagamento.find(x => x.tipo === f)?.instrucao || ''}
                        onChange={e => setFormasPagamento(formasPagamento.map(x => x.tipo === f ? { ...x, instrucao: e.target.value } : x))}
                        className="campo-input"
                        style={{ marginTop: 8, resize: 'none' }}
                        rows="2"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CARD 3 – PROGRAMAÇÃO */}
        <div className="ag-card">
          <div className="ag-card-header">
            <div>
              <div className="ag-card-title">Programação</div>
              <div className="ag-card-sub">Blocos e horários do evento</div>
            </div>
            <button className="btn-ghost" style={{ fontSize: 12, padding: '7px 14px' }} onClick={handleAddProgramacao}>
              <Icon.Plus /> Adicionar Bloco
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {programacao.length === 0 && (
              <div style={{ textAlign: 'center', padding: '24px 0', color: '#94a3b8', fontSize: 13 }}>Nenhum bloco adicionado ainda.</div>
            )}
            {programacao.map((p, idx) => (
              <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '1fr 130px 100px 34px', gap: 10, alignItems: 'end', background: '#f8fafc', borderRadius: 10, padding: 12, border: '1.5px solid #e8edf5' }}>
                <InputField label="Título" value={p.titulo} onChange={v => { const n = [...programacao]; n[idx].titulo = v; setProgramacao(n); }} />
                <InputField label="Data" type="date" value={p.data} onChange={v => { const n = [...programacao]; n[idx].data = v; setProgramacao(n); }} />
                <InputField label="Horário" type="time" value={p.horario} onChange={v => { const n = [...programacao]; n[idx].horario = v; setProgramacao(n); }} />
                <button className="btn-icon danger" onClick={() => setProgramacao(programacao.filter(x => x.id !== p.id))} title="Remover">
                  <Icon.Trash />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CARD 4 – CAMPOS DE INSCRIÇÃO */}
        <div className="ag-card" style={{ gridColumn: '1 / -1' }}>
          <div className="ag-card-header">
            <div>
              <div className="ag-card-title">Campos de Inscrição</div>
              <div className="ag-card-sub">Dados que o participante deve preencher no formulário</div>
            </div>
            <button className="btn-ghost" style={{ fontSize: 12, padding: '7px 14px' }} onClick={handleAddCampo}>
              <Icon.Plus /> Inserir Campo
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {camposInscricao.length === 0 && (
              <div style={{ textAlign: 'center', padding: '24px 0', color: '#94a3b8', fontSize: 13 }}>Nenhum campo adicionado. Clique em "Inserir Campo" para começar.</div>
            )}
            {camposInscricao.map((c, idx) => (
              <div key={c.id} style={{ background: '#f8fafc', border: '1.5px solid #e8edf5', borderRadius: 12, padding: 16 }}>
                {/* linha superior: nome, obrigatório, tipo, excluir */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 110px 160px 34px', gap: 12, alignItems: 'end' }}>
                  <InputField
                    label="Nome do Campo"
                    value={c.nome}
                    onChange={v => updateCampo(idx, { nome: v })}
                    placeholder="Ex: Nome completo"
                  />
                  <Campo label="Obrigatório">
                    <div className="toggle-group">
                      <button className={`toggle-btn ${c.obrigatorio ? 'active' : ''}`} onClick={() => updateCampo(idx, { obrigatorio: true })}>Sim</button>
                      <button className={`toggle-btn ${!c.obrigatorio ? 'active' : ''}`} onClick={() => updateCampo(idx, { obrigatorio: false })}>Não</button>
                    </div>
                  </Campo>
                  <Campo label="Tipo de Campo">
                    <select value={c.tipo} onChange={e => updateCampo(idx, { tipo: e.target.value, opcoes: [] })} className="campo-input">
                      <option value="texto">Texto curto</option>
                      <option value="área de texto">Área de texto</option>
                      <option value="checkbox">Checkbox</option>
                      <option value="radio">Radio</option>
                      <option value="seleção">Seleção (dropdown)</option>
                    </select>
                  </Campo>
                  <button className="btn-icon danger" onClick={() => setCamposInscricao(camposInscricao.filter(x => x.id !== c.id))} style={{ marginBottom: 0 }}>
                    <Icon.Trash />
                  </button>
                </div>

                {/* preview/configuração por tipo */}
                <div style={{ marginTop: 12 }}>
                  {tipoEhTexto(c.tipo) && (
                    <div>
                      <span className="campo-label" style={{ color: '#94a3b8' }}>Pré-visualização no formulário</span>
                      <input
                        type="text"
                        className="campo-input"
                        placeholder={c.nome || 'Campo de texto curto'}
                        readOnly
                        style={{ background: '#fff', cursor: 'default', borderStyle: 'dashed' }}
                      />
                    </div>
                  )}

                  {tipoEhArea(c.tipo) && (
                    <div>
                      <span className="campo-label" style={{ color: '#94a3b8' }}>Pré-visualização no formulário</span>
                      <textarea
                        className="campo-input"
                        placeholder={c.nome || 'Área de texto'}
                        readOnly rows={3}
                        style={{ background: '#fff', cursor: 'default', borderStyle: 'dashed', resize: 'none' }}
                      />
                    </div>
                  )}

                  {tipoTemOpcoes(c.tipo) && (
                    <div style={{ marginTop: 4 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span className="campo-label" style={{ color: '#64748b', marginBottom: 0 }}>
                          Opções disponíveis
                          {c.tipo === 'checkbox' && ' (múltipla escolha)'}
                          {c.tipo === 'radio' && ' (única escolha)'}
                          {c.tipo === 'seleção' && ' (dropdown)'}
                        </span>
                        <button
                          className="btn-ghost"
                          style={{ fontSize: 11, padding: '5px 10px', color: '#1e3a8a' }}
                          onClick={() => addOpcaoCampo(idx)}
                        >
                          <Icon.PlusCircle /> Adicionar opção
                        </button>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {(c.opcoes || []).map(op => (
                          <div key={op.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            {/* ícone visual de acordo com o tipo */}
                            {c.tipo === 'checkbox' && (
                              <div style={{ width: 16, height: 16, borderRadius: 4, border: '2px solid #94a3b8', flexShrink: 0 }} />
                            )}
                            {c.tipo === 'radio' && (
                              <div style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid #94a3b8', flexShrink: 0 }} />
                            )}
                            {c.tipo === 'seleção' && (
                              <span style={{ fontSize: 11, color: '#94a3b8', flexShrink: 0 }}>›</span>
                            )}
                            <input
                              type="text"
                              className="campo-input"
                              placeholder="Nome da opção"
                              value={op.label}
                              onChange={e => updateOpcao(idx, op.id, e.target.value)}
                              style={{ flex: 1, padding: '7px 10px' }}
                            />
                            <button className="btn-icon danger" style={{ width: 30, height: 30 }} onClick={() => removeOpcao(idx, op.id)}>
                              <Icon.Close />
                            </button>
                          </div>
                        ))}
                        {(c.opcoes || []).length === 0 && (
                          <div style={{ fontSize: 12, color: '#94a3b8', fontStyle: 'italic' }}>Clique em "Adicionar opção" para inserir as opções do campo.</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CARD 5 – DETALHES (CKEditor 5) */}
        <div className="ag-card" style={{ gridColumn: '1 / -1' }}>
          <div className="ag-card-header" style={{ marginBottom: 6 }}>
            <div>
              <div className="ag-card-title">Detalhes do Evento</div>
              <div className="ag-card-sub">Descrição completa e formatada para o público</div>
            </div>
          </div>
          <QuillEditorDetalhes value={detalhes} onChange={setDetalhes} />
        </div>

        {/* CARD 6 – LOCALIZAÇÃO */}
        <div className="ag-card">
          <SectionTitle><Icon.MapPin /> Localização</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <InputField label="Nome do Local" value={localNome} onChange={setLocalNome} placeholder="Ex: Auditório MIB Mundaú" />
            <InputField label="Link do Google Maps" value={localUrl} onChange={setLocalUrl} placeholder="https://maps.app.goo.gl/..." />
          </div>
        </div>

        {/* CARD 7 – PALESTRANTES */}
        <div className="ag-card" style={{ gridColumn: '1 / -1' }}>
          <div className="ag-card-header">
            <div>
              <div className="ag-card-title">Palestrantes / Convidados</div>
            </div>
            <button className="btn-ghost" style={{ fontSize: 12, padding: '7px 14px' }} onClick={handleAddPalestrante}>
              <Icon.Plus /> Adicionar Palestrante
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {palestrantes.length === 0 && (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '24px 0', color: '#94a3b8', fontSize: 13 }}>Nenhum palestrante adicionado ainda.</div>
            )}
            {palestrantes.map((p, idx) => (
              <div key={p.id} style={{ background: '#f8fafc', border: '1.5px solid #e8edf5', borderRadius: 14, padding: 16, display: 'flex', gap: 14, position: 'relative' }}>
                {/* foto */}
                <div style={{ width: 72, height: 72, borderRadius: 12, background: '#e2e8f0', flexShrink: 0, overflow: 'hidden', position: 'relative', border: '2px solid #e8edf5' }}>
                  {p.preview
                    ? <img src={p.preview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', color: '#94a3b8' }}><Icon.User /></div>
                  }
                  <label style={{ position: 'absolute', inset: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,.45)', opacity: 0, transition: 'opacity .2s' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = 1}
                    onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                    <span style={{ color: '#fff', fontSize: 9, fontWeight: 700, textTransform: 'uppercase' }}>Foto</span>
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => {
                      if (e.target.files?.length > 0) {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.addEventListener('load', () => {
                          setImageSrc(reader.result);
                          setPalestranteIdxEdicao(idx);
                          setMostrarCortador(true);
                        });
                        reader.readAsDataURL(file);
                      }
                    }} />
                  </label>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <InputField label="Nome Completo" value={p.nome} onChange={v => { const n = [...palestrantes]; n[idx].nome = v; setPalestrantes(n); }} />
                  <InputField label="Breve Descrição" value={p.descricao} onChange={v => { const n = [...palestrantes]; n[idx].descricao = v; setPalestrantes(n); }} />
                </div>
                <button className="btn-icon danger" style={{ position: 'absolute', top: 10, right: 10, width: 28, height: 28 }} onClick={() => setPalestrantes(palestrantes.filter(x => x.id !== p.id))}>
                  <Icon.Close />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* MODAL CORTADOR (PALESTRANTES) */}
        {mostrarCortador && (
          <div className="modal-overlay px-2 py-4" style={{ background: 'rgba(15,23,42,0.85)' }}>
            <div className="modal-box" style={{ maxWidth: 450 }}>
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Ajustar Foto do Palestrante</h3>
                <button type="button" className="btn-icon" onClick={() => setMostrarCortador(false)}><Icon.Close /></button>
              </div>
              <div className="relative h-64 w-full bg-slate-900">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  showGrid={false}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>
              <div className="p-4 bg-slate-50 flex gap-2">
                <button type="button" onClick={() => setMostrarCortador(false)} className="btn-ghost flex-1">Cancelar</button>
                <button type="button" onClick={criarImagemRecortada} className="btn-primary flex-1 justify-center">Confirmar Recorte</button>
              </div>
            </div>
          </div>
        )}

      </div>{/* end form-grid */}

      {/* btn publicar bottom */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 16 }}>
        <button
          className="btn-primary"
          onClick={handleSalvarEvento}
          disabled={!canSave || enviando}
          style={{ padding: '14px 60px', fontSize: 14, letterSpacing: '.06em', opacity: (!canSave || enviando) ? .5 : 1, cursor: (!canSave || enviando) ? 'not-allowed' : 'pointer' }}
        >
          {enviando ? 'Salvando...' : <><Icon.Check /> Publicar Evento</>}
        </button>
      </div>
    </div>
  );
}

/* ─── CampoSimple (usado por CalendarioMensal e outros) ────────────────────── */
function CampoSimple({ label, value, onChange, type = 'text', placeholder }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {label && <span className="campo-label">{label}</span>}
      <input
        type={type} value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="campo-input"
      />
    </div>
  );
}

/* ─── CalendarioMensal ─────────────────────────────────────────────────────── */
function CalendarioMensal({ data, eventos, onEditarEvento, podeEditar }) {
  const diasSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  const matriz = useMemo(() => {
    const ano = data.getFullYear();
    const mes = data.getMonth();
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    let start = primeiroDia.getDay();
    start = start === 0 ? 6 : start - 1;
    const dias = [];
    for (let i = 0; i < start; i++) dias.push(null);
    for (let d = 1; d <= ultimoDia.getDate(); d++) dias.push(new Date(ano, mes, d));
    return dias;
  }, [data]);

  return (
    <div style={{ padding: '8px 12px 12px' }} className="agenda-root">
      <RobotoStyle />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1.5px solid #f1f5f9', marginBottom: 4 }}>
        {diasSemana.map(d => (
          <div key={d} style={{ textAlign: 'center', padding: '8px 0', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: '#94a3b8' }}>{d}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, background: '#f1f5f9' }}>
        {matriz.map((dia, idx) => {
          if (!dia) return <div key={`e${idx}`} style={{ background: '#fff', minHeight: 90 }} />;
          const eventosDia = eventos.filter(ev => {
            if (!ev.data_inicio) return false;
            const [y, m, d] = ev.data_inicio.split('T')[0].split('-').map(Number);
            return y === dia.getFullYear() && (m - 1) === dia.getMonth() && d === dia.getDate();
          });
          const hoje = new Date();
          const isHoje = dia.getDate() === hoje.getDate() && dia.getMonth() === hoje.getMonth() && dia.getFullYear() === hoje.getFullYear();
          return (
            <div key={dia.toISOString()}
              onClick={() => podeEditar && onEditarEvento({ data_inicio: new Date(dia.setHours(19, 0)).toISOString().slice(0, 16) })}
              style={{ background: '#fff', minHeight: 90, padding: '6px 6px 4px', cursor: podeEditar ? 'pointer' : 'default', transition: 'background .15s' }}
              onMouseEnter={e => { if (podeEditar) e.currentTarget.style.background = '#f8fafc'; }}
              onMouseLeave={e => e.currentTarget.style.background = '#fff'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={isHoje ? { width: 22, height: 22, borderRadius: '50%', background: '#1e3a8a', color: '#fff', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' } : { fontSize: 11, fontWeight: 700, color: '#94a3b8' }}>
                  {dia.getDate()}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {eventosDia.map(ev => (
                  <button key={ev.id}
                    onClick={e => { e.stopPropagation(); onEditarEvento(ev); }}
                    style={{ width: '100%', textAlign: 'left', padding: '3px 6px', borderRadius: 4, fontSize: 10, fontWeight: 700, color: '#fff', background: ev.cor, border: 'none', cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    title={ev.titulo}
                  >
                    {ev.titulo}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}