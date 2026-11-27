import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { supabase } from './supabaseClient';
import Cropper from 'react-easy-crop';
import { PageHeader, Card, CardHeader, Avatar, uploadImagemCelula, StatCard } from './ui';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useEditor, EditorContent } from '@tiptap/react';
import LeitorQRCodeEvento from './LeitorQRCodeEvento';
import CarneGenerator from './CarneGenerator';
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
import { mascaraTelefone, mascaraCPF } from './mascaras';
import { faixasEtarias, faixaDaIdade } from './churchUtils';
import { findInJsonGlobal, parseMoeda, extrairValorInscricao, extrairParcelasInscricao, gerarMensagemInscricaoEvento } from './eventoInscricaoUtils';
import ModalExportarInscritos from './ModalExportarInscritos';
import ModalReciboQuitacao from './ModalReciboQuitacao';
import { dispararReciboQuitacaoAutomatico } from './services/whatsappServerService';

/* ─── Roboto via Google Fonts ─────────────────────────────────────────────── */
const RobotoStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400&display=swap');
    .agenda-root, .agenda-root * { font-family: 'Roboto', sans-serif !important; }

    @page {
      size: A4 portrait;
      margin: 12mm 12mm 12mm 12mm;
    }

    @media print {
      html, body {
        background: white !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      main {
        padding: 0 !important;
        margin: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
      }
      aside, header, nav, .print\\:hidden {
        display: none !important;
      }
      .agenda-root, .space-y-6, .ag-card {
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
      }
      .ag-table {
        width: 100% !important;
      }
      tr { page-break-inside: avoid; }
      thead { display: table-header-group; }
    }

    /* ── tokens claros ── */
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
      --slate-200:#e2e8f0;
      --slate-100:#f1f5f9;
      --slate-50: #f8fafc;
      --white:    #ffffff;
      --card-bg:  #ffffff;
      --card-border: #e8edf5;
      --radius-sm:8px;
      --radius:   14px;
      --radius-lg:20px;
      --shadow-sm:0 1px 3px rgba(0,0,0,.08),0 1px 2px rgba(0,0,0,.06);
      --shadow:   0 4px 16px rgba(30,58,138,.10);
      --shadow-lg:0 10px 40px rgba(30,58,138,.18);
    }

    /* ── tokens escuros (Dark Mode) ── */
    html.dark .agenda-root, .dark .agenda-root, .dark.agenda-root {
      --blue-900: #3b82f6;
      --blue-700: #60a5fa;
      --blue-500: #93c5fd;
      --blue-50:  rgba(59, 130, 246, 0.18);
      --teal:     #14b8a6;
      --rose:     #fb7185;
      --slate-900:#f8fafc;
      --slate-700:#cbd5e1;
      --slate-500:#94a3b8;
      --slate-300:#334155;
      --slate-200:#1e293b;
      --slate-100:#1e293b;
      --slate-50: #0b1329;
      --white:    #0f172a;
      --card-bg:  #0f172a;
      --card-border: #1e293b;
      --shadow-sm:0 1px 3px rgba(0,0,0,.4),0 1px 2px rgba(0,0,0,.3);
      --shadow:   0 4px 16px rgba(0,0,0,.45);
      --shadow-lg:0 10px 40px rgba(0,0,0,.65);
    }

    /* ── SunEditor Styles ── */
    .sun-editor-wrapper { margin-top: 8px; border-radius: 12px; overflow: hidden; border: 1.5px solid var(--card-border); background: var(--white); min-height: 350px; }
    .sun-editor { border: none !important; font-family: 'Roboto', sans-serif !important; }
    .sun-editor .se-toolbar { background-color: var(--slate-50) !important; outline: 1px solid var(--card-border) !important; }
    .sun-editor .se-resizing-bar { background-color: var(--slate-50) !important; border-top: 1px solid var(--card-border) !important; }
    .sun-editor .se-wrapper-inner { min-height: 250px !important; }
    .sun-editor .se-btn-module-border { border-color: var(--card-border) !important; }
    .sun-editor-editable { font-size: 14px !important; color: var(--slate-700) !important; background-color: var(--white) !important; line-height: 1.6 !important; }

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
      transition: background .15s, border-color .15s, color .15s;
    }
    .agenda-root .btn-ghost:hover { background: var(--slate-100); border-color: var(--blue-500); color: var(--blue-700); }

    .agenda-root .btn-danger {
      background: transparent;
      color: var(--rose);
      border: 1.5px solid rgba(225, 29, 72, 0.3);
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
    .agenda-root .btn-danger:hover { background: rgba(225, 29, 72, 0.12); }

    .agenda-root .btn-icon {
      width: 34px; height: 34px;
      border-radius: var(--radius-sm);
      border: 1.5px solid var(--slate-300);
      background: var(--white);
      display: inline-flex; align-items: center; justify-content: center;
      cursor: pointer;
      color: var(--slate-500);
      font-size: 14px;
      transition: background .15s, border-color .15s, color .15s;
      flex-shrink: 0;
    }
    .agenda-root .btn-icon:hover { background: var(--blue-50); border-color: var(--blue-500); color: var(--blue-700); }
    .agenda-root .btn-icon.danger:hover { background: rgba(225, 29, 72, 0.12); border-color: rgba(225, 29, 72, 0.3); color: var(--rose); }

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
    .agenda-root .campo-input:focus { border-color: var(--blue-500); box-shadow: 0 0 0 3px rgba(59,130,246,.2); }
    .agenda-root .campo-input::placeholder { color: var(--slate-500); }

    /* ── card ── */
    .agenda-root .ag-card {
      background: var(--card-bg);
      border-radius: var(--radius-lg);
      border: 1.5px solid var(--card-border);
      box-shadow: var(--shadow-sm);
      padding: 24px;
      color: var(--slate-900);
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
      color: var(--blue-700);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: .1em;
      text-transform: uppercase;
      margin-bottom: 18px;
    }
    .agenda-root .section-divider::after { content:''; flex:1; height:1px; background: linear-gradient(to right, var(--slate-300), transparent); }

    /* ── Tiptap Editor Completo ── */
    .tiptap-wrapper { margin-top: 8px; border-radius: 12px; overflow: hidden; border: 1.5px solid var(--card-border); background: var(--white); display: flex; flex-direction: column; }
    .tiptap-toolbar { display: flex; flex-wrap: wrap; align-items: center; gap: 2px; padding: 8px 10px; background: var(--slate-50); border-bottom: 1.5px solid var(--card-border); }
    .tiptap-toolbar button { padding: 4px 9px; border: 1.5px solid transparent; border-radius: 6px; background: transparent; color: var(--slate-700); font-size: 12px; font-weight: 700; cursor: pointer; transition: background .15s, border-color .15s; font-family: 'Roboto', sans-serif; line-height: 1.4; }
    .tiptap-toolbar button:hover { background: var(--slate-100); }
    .tiptap-toolbar button.is-active { background: var(--blue-50); color: var(--blue-700); border-color: var(--blue-500); }
    .tiptap-sep { display: inline-block; width: 1px; height: 18px; background: var(--card-border); margin: 0 4px; vertical-align: middle; flex-shrink: 0; }
    .tiptap-content { flex: 1; padding: 16px; min-height: 300px; font-size: 14px; color: var(--slate-700); line-height: 1.6; }
    .tiptap-content .ProseMirror { min-height: 280px; outline: none; }
    .tiptap-content .ProseMirror p { margin: 0 0 8px; }
    .tiptap-content .ProseMirror h1 { font-size: 22px; font-weight: 800; margin: 14px 0 6px; color: var(--slate-900); }
    .tiptap-content .ProseMirror h2 { font-size: 18px; font-weight: 700; margin: 12px 0 5px; color: var(--slate-900); }
    .tiptap-content .ProseMirror h3 { font-size: 15px; font-weight: 700; margin: 10px 0 4px; color: var(--slate-900); }
    .tiptap-content .ProseMirror ul, .tiptap-content .ProseMirror ol { padding-left: 22px; margin: 6px 0; }
    .tiptap-content .ProseMirror li { margin: 3px 0; }
    .tiptap-content .ProseMirror blockquote { border-left: 3px solid var(--blue-500); padding-left: 14px; color: var(--slate-500); margin: 10px 0; font-style: italic; }
    .tiptap-content .ProseMirror a { color: var(--blue-700); text-decoration: underline; cursor: pointer; }
    .tiptap-content .ProseMirror img { max-width: 100%; border-radius: 8px; margin: 8px 0; display: block; }
    .tiptap-content .ProseMirror strong { font-weight: 700; }
    .tiptap-content .ProseMirror em { font-style: italic; }
    .tiptap-content .ProseMirror u { text-decoration: underline; }
    /* Tabela */
    .tiptap-content .ProseMirror table { border-collapse: collapse; width: 100%; margin: 12px 0; border-radius: 8px; overflow: hidden; }
    .tiptap-content .ProseMirror th { background: var(--slate-100); font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: .04em; color: var(--slate-700); padding: 10px 14px; border: 1px solid var(--slate-300); text-align: left; }
    .tiptap-content .ProseMirror td { padding: 9px 14px; border: 1px solid var(--slate-300); font-size: 13px; color: var(--slate-700); vertical-align: top; }
    .tiptap-content .ProseMirror tr:nth-child(even) td { background: var(--slate-50); }
    .tiptap-content .ProseMirror .selectedCell { background: var(--blue-50) !important; }
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
    .agenda-root .ag-table th { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; color: var(--slate-500); padding: 10px 16px; border-bottom: 1.5px solid var(--card-border); text-align: left; background: var(--slate-50); }
    .agenda-root .ag-table td { padding: 12px 16px; font-size: 13px; color: var(--slate-700); border-bottom: 1px solid var(--card-border); }
    .agenda-root .ag-table tr:last-child td { border-bottom: none; }
    .agenda-root .ag-table tr:hover td { background: var(--slate-100); }

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
      background: rgba(0,0,0,.75);
      backdrop-filter: blur(4px);
    }
    .agenda-root .modal-box {
      background: var(--white);
      border-radius: var(--radius-lg);
      border: 1.5px solid var(--card-border);
      width: 100%; max-width: 520px;
      box-shadow: var(--shadow-lg);
      overflow: hidden;
      animation: zoomIn .18s ease;
      color: var(--slate-900);
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
    .ag-horiz-card { display: flex; background: var(--card-bg); border-radius: var(--radius-lg); border: 1.5px solid var(--card-border); overflow: hidden; cursor: pointer; transition: transform .2s, box-shadow .2s; height: 190px; }
    .ag-horiz-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); border-color: var(--blue-500); }
    .ag-horiz-img { width: 145px; height: 100%; object-fit: cover; background: var(--slate-100); shrink: 0; }
    .ag-horiz-body { flex: 1; padding: 20px 24px; display: flex; flex-direction: column; justify-content: space-between; min-width: 0; }
    .ag-horiz-title { font-size: 19px; font-weight: 900; color: var(--slate-900); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 2px; }
    .ag-horiz-sub { font-size: 13px; color: var(--slate-500); line-height: 1.4; line-clamp: 2; display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden; }
    .ag-horiz-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 12px; border-top: 1px solid var(--card-border); margin-top: 8px; }
  `}</style>
);

/* ─── SVG Icons ───────────────────────────────────────────────────────────── */
const Icon = {
  Plus: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
  Trash: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" /></svg>,
  Back: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>,
  Calendar: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
  ChevL: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>,
  ChevR: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>,
  Close: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
  Check: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
  Image: () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>,
  User: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  MapPin: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  ChevDown: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>,
  PlusCircle: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>,
  ChevUp: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>,
  Link: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>,
  FileText: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
  Printer: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 0-2-2v-5a2 2 0 0 0 2-2h16a2 2 0 0 0 2 2v5a2 2 0 0 0-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg>,
  Edit: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
  Mural: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>,
  Carne: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M8 14h.01M12 14h.01M16 14h.01" />
      <path d="M8 18h.01M12 18h.01M16 18h.01" />
    </svg>
  ),
  Download: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Recibo: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
      <path d="M16 8h-8" />
      <path d="M16 12h-8" />
      <path d="M11 16h-3" />
    </svg>
  ),
};

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
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
      <select title="Fonte" style={{ fontSize: 11, padding: '3px 4px', border: '1.5px solid var(--card-border)', borderRadius: 6, background: 'var(--white)', color: 'var(--slate-700)', cursor: 'pointer' }}
        onChange={e => editor.chain().focus().setFontFamily(e.target.value).run()}>
        <option value="">Fonte</option>
        {FONT_FAMILIES.map(f => <option key={f} value={f}>{f}</option>)}
      </select>

      {/* Tamanho */}
      <select title="Tamanho" style={{ fontSize: 11, padding: '3px 4px', border: '1.5px solid var(--card-border)', borderRadius: 6, background: 'var(--white)', color: 'var(--slate-700)', cursor: 'pointer' }}
        onChange={e => {
          editor.chain().focus().setMark('textStyle', { fontSize: e.target.value }).run();
        }}>
        <option value="">Tamanho</option>
        {FONT_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      {/* Parágrafo */}
      <select title="Estilo" style={{ fontSize: 11, padding: '3px 4px', border: '1.5px solid var(--card-border)', borderRadius: 6, background: 'var(--white)', color: 'var(--slate-700)', cursor: 'pointer' }}
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
      <label title="Cor do texto" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, border: '1.5px solid var(--card-border)', borderRadius: 6, background: 'var(--white)', color: 'var(--slate-700)', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>
        A
        <input type="color" style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }}
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
      <label title="Upload de imagem" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, border: '1.5px solid var(--card-border)', borderRadius: 6, background: 'var(--white)', color: 'var(--slate-700)', cursor: 'pointer', fontSize: 14 }}>
        🖼
        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={onImageUpload} />
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

  // Upload de imagem para Supabase Storage (mesmo bucket das capas e fotos de membros)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !editor) return;
    try {
      const publicUrl = await uploadImagemCelula(file, 'agenda-editor');
      if (publicUrl) {
        editor.chain().focus().setImage({ src: publicUrl }).run();
      }
    } catch (err) {
      alert('Erro ao fazer upload da imagem: ' + err.message);
    } finally {
      e.target.value = '';
    }
  };

  return (
    <div className="tiptap-wrapper">
      <TiptapMenuBar editor={editor} onImageUpload={handleImageUpload} />
      <EditorContent editor={editor} className="tiptap-content" />
    </div>
  );
}

// Helpers de manipulação financeira de inscrições importados de eventoInscricaoUtils.js:
// findInJsonGlobal, parseMoeda, extrairValorInscricao, extrairParcelasInscricao

// Cache em memória do Módulo de Agenda para abertura instantânea de Eventos, Calendário, Mural e Dashboard do Evento
const cacheAgenda = {
  eventos: null,
  avisos: null,
  inscritosPorEvento: {}
};

/* ─── Main Export ─────────────────────────────────────────────────────────── */
export default function AgendaModulo({ submenu, onNavigate, membroLogado, hasAccess, pessoas = [], zonas = [] }) {
  const [eventos, setEventos] = useState(() => cacheAgenda.eventos || []);
  const [dataAtual, setDataAtual] = useState(new Date());
  const [carregando, setCarregando] = useState(() => !cacheAgenda.eventos);
  const [modalEvento, setModalEvento] = useState({ aberto: false, dados: null });
  const [view, setView] = useState('lista'); // 'lista', 'form', 'dashboard'
  const [subView, setSubView] = useState(null);
  const [inscritoParaCarne, setInscritoParaCarne] = useState(null);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [membroParaVerId, setMembroParaVerId] = useState(null);

  const podeEditar = hasAccess('Agenda', 'Eventos', 'editar');
  const eventosExibidos = eventos.filter(ev => podeEditar || ev.publicado !== false);

  const carregarEventos = async () => {
    if (!cacheAgenda.eventos) {
      setCarregando(true);
    }
    try {
      const { data, error } = await supabase
        .from('agenda_eventos')
        .select('*')
        .order('data_inicio', { ascending: true });
      if (error) {
        if (error.code === 'PGRST116' || error.message.includes('does not exist')) {
          cacheAgenda.eventos = [];
          setEventos([]);
        } else throw error;
      } else {
        const lista = data || [];
        cacheAgenda.eventos = lista;
        setEventos(lista);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => { carregarEventos(); }, []);

  useEffect(() => {
    setView('lista');
    setSubView(null);
    setInscritoParaCarne(null);
    window.scrollTo(0, 0);
  }, [submenu]);

  // Reset de scroll para navegação interna de eventos (Dashboard, Formulários, etc)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, subView, inscritoParaCarne, membroParaVerId]);

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
    if (!(await window.confirmModal('Excluir Evento', 'Deseja excluir este evento?'))) return;
    const { error } = await supabase.from('agenda_eventos').delete().eq('id', id);
    if (error) alert(error.message);
    else {
      setModalEvento({ aberto: false, dados: null });
      if (eventoSelecionado?.id === id) {
        setEventoSelecionado(null);
        setView('lista');
      }
      carregarEventos();
    }
  };

  const alternarPublicacaoEvento = async (id, publicadoAtual) => {
    const novoEstado = !publicadoAtual;
    const { error } = await supabase
      .from('agenda_eventos')
      .update({ publicado: novoEstado })
      .eq('id', id);
    if (error) {
      alert("Erro ao alterar status de publicação: " + error.message);
    } else {
      if (eventoSelecionado?.id === id) {
        setEventoSelecionado(prev => prev && prev.id === id ? { ...prev, publicado: novoEstado } : prev);
      }
      carregarEventos();
    }
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

  // Leitor de QR Code para check-in/presença (Recibo) e baixa de parcelas (Carnê)
  if (subView === 'leitor') {
    return (
      <LeitorQRCodeEvento
        eventoId={eventoSelecionado?.id}
        onBaixaRealizada={() => {
          if (eventoSelecionado?.id) {
            delete cacheAgenda.inscritosPorEvento[eventoSelecionado.id];
          }
        }}
        onVoltar={() => setSubView(null)}
      />
    );
  }

  // Gerador de carnê para o inscrito selecionado
  if (subView === 'carne') {
    return (
      <CarneGenerator
        pessoaIdInicial={inscritoParaCarne?.pessoaId}
        inscricaoIdInicial={inscritoParaCarne?.inscricaoId}
        onVoltar={() => { setSubView(null); setInscritoParaCarne(null); }}
      />
    );
  }

  const podeVerCalendario = hasAccess('Agenda', 'Calendário');
  const podeVerEventos = hasAccess('Agenda', 'Eventos');
  const podeVerMural = hasAccess('Agenda', 'Mural de Avisos');
  const mostrarColunaLateral = submenu === 'calendario' || submenu === 'mural' || (submenu === 'eventos' && view === 'lista');

  return (
    <div className="agenda-root space-y-5">
      <RobotoStyle /> {/* Mantido para estilos internos */}
      <div className="print:hidden">
        <PageHeader
          titulo={
            submenu === 'calendario'
              ? 'Calendário'
              : submenu === 'mural'
                ? 'Mural de Avisos'
                : view === 'form'
                  ? (eventoSelecionado ? 'Editar Evento' : 'Novo Evento')
                  : view === 'dashboard'
                    ? 'Painel do Evento'
                    : 'Eventos'
          }
          breadcrumb={
            submenu === 'calendario'
              ? ['Agenda', 'Calendário']
              : submenu === 'mural'
                ? ['Agenda', 'Mural']
                : view === 'form'
                  ? ['Agenda', 'Eventos', eventoSelecionado ? 'Editar' : 'Novo']
                  : view === 'dashboard'
                    ? ['Agenda', 'Eventos', 'Painel']
                    : ['Agenda', 'Lista de Eventos']
          }
          onNavigate={(target) => {
            const dest = target.toLowerCase();
            if (dest === 'calendário' || dest === 'calendario' || dest === 'agenda') {
              onNavigate('calendario');
            } else if (dest === 'lista de eventos' || dest === 'eventos') {
              onNavigate('eventos');
            } else if (dest === 'mural') {
              onNavigate('mural');
            }
          }}
        />
      </div>

      {/* Atalhos rápidos compactos no Mobile / Tablet */}
      {mostrarColunaLateral && (podeVerEventos || podeVerMural || podeVerCalendario) && (
        <div className="flex flex-wrap gap-2 lg:hidden print:hidden">
          {podeVerCalendario && (
            <button
              type="button"
              onClick={() => onNavigate('calendario')}
              className={`flex-1 min-w-[100px] px-3 py-2 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer ${
                submenu === 'calendario'
                  ? 'bg-[#1e3a8a] dark:bg-blue-600 text-white border-transparent shadow-sm'
                  : 'bg-white dark:bg-[#17223b] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-[#2b3954]'
              }`}
            >
              <Icon.Calendar />
              <span>Calendário</span>
            </button>
          )}
          {podeVerEventos && (
            <button
              type="button"
              onClick={() => { setView('lista'); setEventoSelecionado(null); onNavigate('eventos'); }}
              className={`flex-1 min-w-[100px] px-3 py-2 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer ${
                submenu === 'eventos'
                  ? 'bg-[#1e3a8a] dark:bg-blue-600 text-white border-transparent shadow-sm'
                  : 'bg-white dark:bg-[#17223b] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-[#2b3954]'
              }`}
            >
              <Icon.Calendar />
              <span>Eventos</span>
            </button>
          )}
          {podeVerMural && (
            <button
              type="button"
              onClick={() => onNavigate('mural')}
              className={`flex-1 min-w-[120px] px-3 py-2 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer ${
                submenu === 'mural'
                  ? 'bg-[#1e3a8a] dark:bg-blue-600 text-white border-transparent shadow-sm'
                  : 'bg-white dark:bg-[#17223b] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-[#2b3954]'
              }`}
            >
              <Icon.Mural />
              <span>Mural</span>
            </button>
          )}
        </div>
      )}

      <div className={mostrarColunaLateral ? 'lg:grid lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_320px] lg:items-start gap-6' : ''}>
        <div className="min-w-0">

      {/* ── CALENDÁRIO ── */}
      {submenu === 'calendario' && (() => {
        const eventosNoMes = eventosExibidos.filter(ev => {
          if (!ev.data_inicio) return false;
          const [y, m] = ev.data_inicio.split('T')[0].split('-').map(Number);
          return y === dataAtual.getFullYear() && (m - 1) === dataAtual.getMonth();
        }).length;
        const hojeRef = new Date();
        const estaNoMesAtual = dataAtual.getMonth() === hojeRef.getMonth() && dataAtual.getFullYear() === hojeRef.getFullYear();

        return (
          <Card className="p-0 overflow-hidden bg-white dark:bg-[#17223b] border border-slate-200/80 dark:border-[#2b3954] shadow-sm">
            {/* Cabeçalho moderno do Calendário */}
            <div className="px-4 sm:px-6 py-4 border-b border-slate-200/80 dark:border-[#2b3954] bg-gradient-to-r from-[#1e3a8a]/5 via-white to-blue-50/50 dark:from-[#1c2b4a] dark:via-[#17223b] dark:to-blue-950/40 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="inline-flex items-center bg-slate-100/90 dark:bg-[#0f172a] border border-slate-200/90 dark:border-[#2b3954] rounded-xl p-1 gap-1 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => mudarMes(-1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-[#1c2b4a] hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
                    title="Mês anterior"
                  >
                    <Icon.ChevL />
                  </button>
                  <h3 className="text-sm sm:text-base font-black text-slate-800 dark:text-white capitalize min-w-[148px] sm:min-w-[175px] text-center tracking-tight px-1">
                    {dataAtual.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
                  </h3>
                  <button
                    type="button"
                    onClick={() => mudarMes(1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-[#1c2b4a] hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
                    title="Próximo mês"
                  >
                    <Icon.ChevR />
                  </button>
                </div>

                {!estaNoMesAtual && (
                  <button
                    type="button"
                    onClick={() => setDataAtual(new Date())}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-700/60 hover:bg-blue-100 dark:hover:bg-blue-900/70 transition cursor-pointer"
                  >
                    Hoje
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2.5">
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-extrabold bg-slate-100 dark:bg-[#0f172a] text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-[#2b3954]">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  {eventosNoMes} {eventosNoMes === 1 ? 'evento' : 'eventos'}
                </span>
                {podeEditar && (
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#1e3a8a] via-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-500 text-white text-xs font-black uppercase tracking-wider shadow-md shadow-blue-600/25 transition-all active:scale-95 cursor-pointer"
                    onClick={() => setModalEvento({ aberto: true, dados: { data_inicio: new Date().toISOString().slice(0, 16) } })}
                  >
                    <Icon.Plus /> Novo Evento
                  </button>
                )}
              </div>
            </div>

            <CalendarioMensal
              data={dataAtual}
              eventos={eventosExibidos}
              onEditarEvento={(ev) => setModalEvento({ aberto: true, dados: ev })}
              podeEditar={podeEditar}
            />
          </Card>
        );
      })()}


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
                {eventosExibidos.length === 0 ? (
                  carregando ? null : <div className="ag-card text-center py-24 text-slate-400 italic">Nenhum evento publicado.</div>
                ) : (
                  eventosExibidos.map(ev => (
                    <div key={ev.id} className="ag-horiz-card" style={ev.publicado === false ? { opacity: 0.75 } : {}} onClick={() => { setEventoSelecionado(ev); setView('dashboard'); }}>
                      <img src={ev.capa_url || 'https://via.placeholder.com/145x190?text=Sem+Capa'} className="ag-horiz-img" alt={ev.titulo} />
                      <div className="ag-horiz-body">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="badge" style={{ background: ev.cor + '15', color: ev.cor }}>{ev.tipo}</span>
                              {ev.publicado === false && (
                                <span className="badge" style={{ background: '#f1f5f9', color: '#64748b', border: '1px solid #cbd5e1' }}>Despublicado</span>
                              )}
                            </div>
                            <span className={`text-[10px] font-black uppercase ${ev.valor_tipo === 'pago' ? 'text-rose-600' : 'text-emerald-600'}`}>
                              {ev.valor_tipo === 'pago' ? 'Evento Pago' : 'Gratuito'}
                            </span>
                          </div>
                          <h4 className="ag-horiz-title">{ev.titulo}</h4>
                          <p className="ag-horiz-sub">{ev.subtitulo || ev.descricao || 'Sem descrição definida.'}</p>
                        </div>
                        <div className="ag-horiz-footer">
                          <div className="flex items-center gap-2 sm:gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-tight overflow-hidden">
                            <span className="flex items-center gap-1.5">
                              <Icon.Calendar />
                              {ev.data_inicio ?
                                `${ev.data_inicio.split('T')[0].split('-').reverse().join('/')}` : '—'}
                            </span>
                            {ev.local_nome && <span className="hidden sm:flex items-center gap-1.5 truncate"><Icon.MapPin /> {ev.local_nome}</span>}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              className="btn-ghost"
                              style={{ padding: '4px 10px', fontSize: 10, background: 'var(--blue-50)', color: 'var(--blue-900)', border: 'none', fontWeight: 'bold', minHeight: '34px' }}
                              onClick={(e) => {
                                e.stopPropagation();
                                const url = `${window.location.origin}/inscricao-evento/${ev.id}`;
                                navigator.clipboard?.writeText?.(url);
                                const msgWhatsapp = gerarMensagemInscricaoEvento(ev, url);
                                if (window.modalLinkCopiado) {
                                  window.modalLinkCopiado({
                                    url,
                                    tipo: 'evento',
                                    titulo: 'Link de Inscrição Copiado!',
                                    subtitulo: `Link público de inscrição para "${ev.titulo || 'o evento'}".`,
                                    mensagemWhatsapp: msgWhatsapp,
                                    nomeEvento: ev.titulo,
                                    evento: ev,
                                    dicaSeguranca: 'Este formulário permite a inscrição segura de participantes sem expor dados de outros inscritos.'
                                  });
                                } else {
                                  alert('Link do formulário copiado!');
                                }
                              }}
                              title="Copiar Link de Inscrição"
                            >
                              <Icon.Link />
                              <span className="hidden sm:inline ml-1">Copiar Link</span>
                            </button>
                            <button className="btn-ghost" style={{ padding: '4px 10px', fontSize: 10, background: 'var(--blue-50)', color: 'var(--blue-900)', border: 'none', fontWeight: 'bold', minHeight: '34px' }} onClick={(e) => { e.stopPropagation(); window.open(`${window.location.origin}/inscricao-evento/${ev.id}`, '_blank'); }}>
                              <div className="sm:hidden text-center leading-tight flex flex-col justify-center">
                                <span>Ficha de</span>
                                <span>Inscrição</span>
                              </div>
                              <span className="hidden sm:inline">Ficha de Inscrição</span>
                            </button>
                          </div>
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
              zonas={zonas}
              membroLogado={membroLogado}
              podeEditar={podeEditar}
              onVoltar={() => { setView('lista'); setEventoSelecionado(null); }}
              onEditar={() => setView('form')}
              onExcluir={excluirEvento}
              onAlternarPublicacao={alternarPublicacaoEvento}
              onVerMembro={setMembroParaVerId}
              onAbrirLeitor={() => setSubView('leitor')}
              onGerarCarne={(dados) => { setInscritoParaCarne(dados); setSubView('carne'); }}
            />
          )
        }[view]
      )}

      {/* ── MODAL EVENTO ── */}
      {modalEvento.aberto && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1.5px solid var(--card-border)', background: 'var(--slate-50)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--slate-900)' }}>
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


      {/* ── MURAL DE AVISOS ── */}
      {submenu === 'mural' && (
        <GerenciadorMural
          onVoltar={() => onNavigate('calendario')}
          membroLogado={membroLogado}
        />
      )}
        </div>

        {/* Coluna Direita (Desktop): Atalhos para Eventos, Mural de Eventos e Calendário */}
        {mostrarColunaLateral && (podeVerEventos || podeVerMural || podeVerCalendario) && (
          <aside className="hidden lg:block lg:sticky lg:top-6 print:hidden">
            <Card className="p-0 overflow-hidden bg-white dark:bg-[#17223b] border border-slate-200/80 dark:border-[#2b3954] shadow-sm">
              <div className="px-5 py-4 border-b border-slate-100 dark:border-[#2b3954] bg-gradient-to-r from-[#1e3a8a]/5 via-transparent to-indigo-500/5 dark:from-blue-500/10 dark:to-indigo-500/10 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Icon.Calendar />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-100">
                    Atalhos da Agenda
                  </h3>
                  <p className="text-[10px] font-semibold text-slate-400">
                    Acesso rápido aos painéis
                  </p>
                </div>
              </div>

              <div className="p-3.5 space-y-2.5">
                {podeVerEventos && (
                  <button
                    type="button"
                    onClick={() => { setView('lista'); setEventoSelecionado(null); onNavigate('eventos'); }}
                    className={`w-full group rounded-2xl border p-3.5 text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 active:scale-[0.98] ${
                      submenu === 'eventos'
                        ? 'bg-gradient-to-br from-[#1e3a8a] via-blue-600 to-indigo-600 border-blue-400/60 text-white shadow-md shadow-blue-600/25'
                        : 'bg-slate-50/70 dark:bg-slate-900/50 border-slate-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-blue-300 dark:hover:border-blue-500/50 hover:bg-blue-50/40 dark:hover:bg-[#1c2b4a]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                        submenu === 'eventos'
                          ? 'bg-white/15 text-white'
                          : 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/60'
                      }`}>
                        <Icon.Calendar />
                      </div>
                      <div className="min-w-0">
                        <p className={`text-sm font-extrabold leading-tight truncate ${submenu === 'eventos' ? 'text-white' : 'text-slate-800 dark:text-slate-100'}`}>
                          Eventos
                        </p>
                        <p className={`text-[11px] mt-0.5 truncate ${submenu === 'eventos' ? 'text-blue-100/90' : 'text-slate-400'}`}>
                          Inscrições e programação
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-black shrink-0 ${
                      submenu === 'eventos'
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}>
                      {eventosExibidos.length}
                    </span>
                  </button>
                )}

                {podeVerMural && (
                  <button
                    type="button"
                    onClick={() => onNavigate('mural')}
                    className={`w-full group rounded-2xl border p-3.5 text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 active:scale-[0.98] ${
                      submenu === 'mural'
                        ? 'bg-gradient-to-br from-[#1e3a8a] via-blue-600 to-indigo-600 border-blue-400/60 text-white shadow-md shadow-blue-600/25'
                        : 'bg-slate-50/70 dark:bg-slate-900/50 border-slate-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-blue-300 dark:hover:border-blue-500/50 hover:bg-blue-50/40 dark:hover:bg-[#1c2b4a]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                        submenu === 'mural'
                          ? 'bg-white/15 text-white'
                          : 'bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-800/60'
                      }`}>
                        <Icon.Mural />
                      </div>
                      <div className="min-w-0">
                        <p className={`text-sm font-extrabold leading-tight truncate ${submenu === 'mural' ? 'text-white' : 'text-slate-800 dark:text-slate-100'}`}>
                          Mural de Eventos
                        </p>
                        <p className={`text-[11px] mt-0.5 truncate ${submenu === 'mural' ? 'text-blue-100/90' : 'text-slate-400'}`}>
                          Avisos e banners da home
                        </p>
                      </div>
                    </div>
                    <span className={`shrink-0 ${submenu === 'mural' ? 'text-white/80' : 'text-slate-400 group-hover:text-blue-500'}`}>
                      <Icon.ChevR />
                    </span>
                  </button>
                )}

                {podeVerCalendario && (
                  <button
                    type="button"
                    onClick={() => onNavigate('calendario')}
                    className={`w-full group rounded-2xl border p-3.5 text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 active:scale-[0.98] ${
                      submenu === 'calendario'
                        ? 'bg-gradient-to-br from-[#1e3a8a] via-blue-600 to-indigo-600 border-blue-400/60 text-white shadow-md shadow-blue-600/25'
                        : 'bg-slate-50/70 dark:bg-slate-900/50 border-slate-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-blue-300 dark:hover:border-blue-500/50 hover:bg-blue-50/40 dark:hover:bg-[#1c2b4a]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                        submenu === 'calendario'
                          ? 'bg-white/15 text-white'
                          : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/60'
                      }`}>
                        <Icon.Calendar />
                      </div>
                      <div className="min-w-0">
                        <p className={`text-sm font-extrabold leading-tight truncate ${submenu === 'calendario' ? 'text-white' : 'text-slate-800 dark:text-slate-100'}`}>
                          Calendário
                        </p>
                        <p className={`text-[11px] mt-0.5 truncate ${submenu === 'calendario' ? 'text-blue-100/90' : 'text-slate-400'}`}>
                          Visão mensal da agenda
                        </p>
                      </div>
                    </div>
                    <span className={`shrink-0 ${submenu === 'calendario' ? 'text-white/80' : 'text-slate-400 group-hover:text-blue-500'}`}>
                      <Icon.ChevR />
                    </span>
                  </button>
                )}
              </div>
            </Card>
          </aside>
        )}
      </div>

    </div>
  );
}

/* ─── Gerenciador de Mural ────────────────────────────────────────────────── */
function GerenciadorMural({ onVoltar, membroLogado }) {
  const [avisos, setAvisos] = useState(() => cacheAgenda.avisos || []);
  const [carregando, setCarregando] = useState(() => !cacheAgenda.avisos);
  const [editando, setEditando] = useState(null);
  const [view, setView] = useState('lista'); // 'lista' ou 'form'

  const carregarAvisos = useCallback(async () => {
    if (!cacheAgenda.avisos) {
      setCarregando(true);
    }
    try {
      const { data } = await supabase.from('mural_avisos').select('*').order('created_at', { ascending: false });
      const lista = data || [];
      cacheAgenda.avisos = lista;
      setAvisos(lista);
    } catch (err) { console.error(err); }
    finally { setCarregando(false); }
  }, []);

  useEffect(() => { carregarAvisos(); }, [carregarAvisos]);

  const handleExcluir = async (id) => {
    if (!(await window.confirmModal('Excluir Aviso', 'Remover este aviso do mural?'))) return;
    await supabase.from('mural_avisos').delete().eq('id', id);
    carregarAvisos();
  };

  if (view === 'form') {
    return (
      <FormularioAviso
        aviso={editando}
        onSucesso={() => { setView('lista'); setEditando(null); carregarAvisos(); }}
        onCancelar={() => { setView('lista'); setEditando(null); }}
      />
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-5 h-5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center shadow-inner">
            <Icon.Mural />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight leading-tight">Gerenciar Mural</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Anúncios da Página Inicial</p>
          </div>
        </div>
        <button className="btn-primary" onClick={() => { setEditando(null); setView('form'); }}>
          <Icon.Plus /> Novo Aviso
        </button>
      </div>

      <Card className="p-0 overflow-hidden dark:bg-slate-900 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="ag-table">
            <thead>
              <tr>
                <th>Aviso</th>
                <th>Status</th>
                <th>Prioridade</th>
                <th className="text-right pr-6">Ações</th>
              </tr>
            </thead>
            <tbody>
              {carregando ? (
                <tr><td colSpan="4" className="text-center py-10 animate-pulse text-slate-400">Carregando mural...</td></tr>
              ) : avisos.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-16 text-slate-400 italic">Nenhum aviso cadastrado no momento.</td></tr>
              ) : (
                avisos.map(av => (
                  <tr key={av.id}>
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        {av.imagem_url && <img src={av.imagem_url} className="w-12 h-12 rounded-lg object-cover border border-slate-100 dark:border-slate-800" alt="" />}
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-100">{av.titulo}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{av.subtitulo || 'Sem subtítulo'}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${av.ativo ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                        {av.ativo ? 'Visível' : 'Oculto'}
                      </span>
                    </td>
                    <td>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{av.prioridade || 0}</span>
                    </td>
                    <td className="text-right pr-6 whitespace-nowrap">
                      <div className="inline-flex items-center justify-end gap-2">
                        <button type="button" className="btn-icon" onClick={() => { setEditando(av); setView('form'); }} title="Editar aviso"><Icon.Edit /></button>
                        <button type="button" className="btn-icon danger" onClick={() => handleExcluir(av.id)} title="Excluir aviso"><Icon.Trash /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function FormularioAviso({ aviso, onSucesso, onCancelar }) {
  const [titulo, setTitulo] = useState(aviso?.titulo || '');
  const [subtitulo, setSubtitulo] = useState(aviso?.subtitulo || '');
  const [prioridade, setPrioridade] = useState(aviso?.prioridade || 0);
  const [dataExp, setDataExp] = useState(aviso?.data_expiracao || '');
  const [linkExterno, setLinkExterno] = useState(aviso?.link_externo || '');
  const [ativo, setAtivo] = useState(aviso?.ativo ?? true);
  const [formato, setFormato] = useState(aviso?.formato || 'retrato');
  const [conteudo, setConteudo] = useState(aviso?.conteudo_html || '');
  const [imagemPreview, setImagemPreview] = useState(aviso?.imagem_url || '');
  const [imagemFile, setImagemFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [mostrarCortador, setMostrarCortador] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const onCropComplete = useCallback((_, pixels) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const aspect = formato === 'retrato' ? 4 / 5 : formato === 'paisagem' ? 16 / 9 : 1;

  const criarImagemRecortadaAviso = async () => {
    try {
      const image = new Image();
      image.src = imageSrc;
      await new Promise((resolve) => (image.onload = resolve));
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
        if (!blob) return;
        setImagemFile(blob);
        setImagemPreview(URL.createObjectURL(blob));
        setMostrarCortador(false);
      }, 'image/jpeg');
    } catch (e) {
      console.error(e);
    }
  };

  async function handleSalvar() {
    setEnviando(true);
    try {
      let url = imagemPreview;
      if (imagemFile) url = await uploadImagemCelula(imagemFile, 'mural');

      const payload = {
        titulo, subtitulo, ativo, prioridade, formato, link_externo: linkExterno, conteudo_html: conteudo,
        data_expiracao: dataExp || null,
        imagem_url: url
      };

      if (aviso?.id) {
        await supabase.from('mural_avisos').update(payload).eq('id', aviso.id);
      } else {
        await supabase.from('mural_avisos').insert([payload]);
      }
      onSucesso();
    } catch (err) { alert(err.message); }
    finally { setEnviando(false); }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight">
          {aviso ? 'Editar Aviso' : 'Novo Aviso'}
        </h2>
        <div className="flex gap-2">
          <button className="btn-ghost" onClick={onCancelar}>Cancelar</button>
          <button className="btn-primary" onClick={handleSalvar} disabled={enviando || !titulo}>
            {enviando ? 'Salvando...' : 'Publicar no Mural'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-6 space-y-4 dark:bg-slate-900 dark:border-slate-800">
            <InputField label="Título do Aviso *" value={titulo} onChange={setTitulo} placeholder="Ex: Grande Vigília de Adoração" />
            <InputField label="Subtítulo / Chamada" value={subtitulo} onChange={setSubtitulo} placeholder="Ex: Nesta sexta-feira, às 22h" />
            <InputField label="Link de Destino (Opcional)" value={linkExterno} onChange={setLinkExterno} placeholder="https://exemplo.com/inscricao" />
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Data de Expiração" type="date" value={dataExp} onChange={setDataExp} />
              <Campo label="Prioridade (0-10)">
                <input type="number" value={prioridade} onChange={e => setPrioridade(parseInt(e.target.value))} className="campo-input" />
              </Campo>
            </div>
          </Card>
          <div className="ag-card">
            <label className="campo-label">Descrição Detalhada (Opcional)</label>
            <QuillEditorDetalhes value={conteudo} onChange={setConteudo} />
          </div>
        </div>

        <div className="space-y-4">
          <Card className="p-0 overflow-hidden dark:bg-slate-900 dark:border-slate-800">
            <CardHeader titulo="Imagem do Cartaz" />
            <div className="p-4 border-b border-slate-50 dark:border-slate-800">
              <Campo label="Formato do Cartaz">
                <div className="tab-bar">
                  <button type="button" className={`tab-btn ${formato === 'retrato' ? 'active' : ''}`} onClick={() => setFormato('retrato')}>Retrato (4:5)</button>
                  <button type="button" className={`tab-btn ${formato === 'paisagem' ? 'active' : ''}`} onClick={() => setFormato('paisagem')}>Paisagem</button>
                  <button type="button" className={`tab-btn ${formato === 'quadrado' ? 'active' : ''}`} onClick={() => setFormato('quadrado')}>1:1</button>
                </div>
              </Campo>
            </div>
            <div className="p-4 space-y-4">
              <div
                className="bg-slate-100 dark:bg-slate-800 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center overflow-hidden relative group"
                style={{ aspectRatio: aspect }}
              >
                {imagemPreview ? (
                  <img src={imagemPreview} className="w-full h-full object-cover" alt="" />
                ) : (
                  <div className="text-center p-6 text-slate-400">
                    <Icon.Image />
                    <p className="text-[10px] font-bold uppercase mt-2">Fazer Upload</p>
                  </div>
                )}
                <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => {
                  const f = e.target.files[0];
                  if (f) {
                    const reader = new FileReader();
                    reader.addEventListener('load', () => {
                      setImageSrc(reader.result);
                      setMostrarCortador(true);
                    });
                    reader.readAsDataURL(f);
                  }
                }} />
              </div>
              <p className="text-[9px] text-slate-400 text-center uppercase font-bold tracking-widest">
                {formato === 'retrato' ? 'Ideal para artes verticais' : formato === 'paisagem' ? 'Ideal para fotos amplas' : 'Formato padrão Instagram'}
              </p>
            </div>
          </Card>
        </div>
      </div>

      {mostrarCortador && (
        <div className="modal-overlay px-2 py-4" style={{ zIndex: 200 }}>
          <div className="modal-box" style={{ maxWidth: 500 }}>
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-tight">Ajustar Cartaz</h3>
              <button type="button" className="btn-icon" onClick={() => setMostrarCortador(false)}><Icon.Close /></button>
            </div>
            <div className="relative h-80 w-full bg-slate-900">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <button type="button" onClick={() => setMostrarCortador(false)} className="btn-ghost flex-1">Cancelar</button>
              <button type="button" onClick={criarImagemRecortadaAviso} className="btn-primary flex-1 justify-center">Confirmar Recorte</button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}

/* ─── RoscaGraficoCard ─────────────────────────────────────────────────────── */
function RoscaGraficoCard({ titulo, subtitulo, dados = [], onSliceClick, totalLabel = "Participantes" }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const total = useMemo(() => dados.reduce((sum, d) => sum + (Number(d.value) || 0), 0), [dados]);

  return (
    <Card className="p-0 overflow-hidden dark:bg-slate-900 dark:border-slate-800 flex flex-col justify-between">
      <div>
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          <div>
            <h4 className="text-xs font-black uppercase text-slate-800 dark:text-slate-100 tracking-wider flex items-center gap-2">
              {titulo}
            </h4>
            {subtitulo && <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{subtitulo}</p>}
          </div>
          <span className="text-[9px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
            <span>👆</span><span>Filtrar</span>
          </span>
        </div>

        <div className="p-4 sm:p-6 flex flex-col items-center">
          {dados.length === 0 || total === 0 ? (
            <p className="text-xs text-slate-400 italic text-center py-12">Nenhum dado registrado para este gráfico.</p>
          ) : (
            <div className="w-full space-y-4">
              <div className="relative w-full h-52 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart style={{ outline: 'none' }}>
                    <Pie
                      data={dados}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                      onMouseEnter={(_, index) => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(-1)}
                      onClick={(entry) => onSliceClick && onSliceClick(entry)}
                      style={{ cursor: 'pointer', outline: 'none' }}
                    >
                      {dados.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          stroke={activeIndex === index ? '#ffffff' : 'transparent'}
                          strokeWidth={activeIndex === index ? 3 : 1}
                          style={{
                            cursor: 'pointer',
                            outline: 'none',
                            transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
                            transformOrigin: 'center center',
                            transition: 'all 0.2s ease-in-out'
                          }}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val, name) => [`${val} (${total > 0 ? Math.round((val / total) * 100) : 0}%) • Clique para ver detalhes`, name]}
                      contentStyle={{
                        borderRadius: 12,
                        backgroundColor: '#0f172a',
                        borderColor: '#334155',
                        color: '#f8fafc',
                        fontSize: 11,
                        fontWeight: 700
                      }}
                      itemStyle={{ color: '#f8fafc' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Texto Central da Rosca */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-black text-slate-800 dark:text-slate-100 leading-none">{total}</span>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{totalLabel}</span>
                </div>
              </div>

              {/* Lista / Legenda Clicável */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 max-h-48 overflow-y-auto">
                {dados.map((d, index) => {
                  const pct = total > 0 ? Math.round((d.value / total) * 100) : 0;
                  const isHover = activeIndex === index;
                  return (
                    <div
                      key={d.name}
                      onClick={() => onSliceClick && onSliceClick(d)}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(-1)}
                      className={`flex items-center justify-between p-2 rounded-xl text-xs font-bold transition cursor-pointer ${isHover ? 'bg-blue-50/70 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
                      title={`Clique para visualizar os inscritos de ${d.name}`}
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: d.color }} />
                        <span className="truncate">{d.name}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-slate-900 dark:text-slate-100 font-black">{d.value}</span>
                        <span className="text-[10px] text-slate-400 font-medium w-8 text-right">({pct}%)</span>
                        <span className="text-xs text-blue-500 opacity-60">➔</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

/* ─── DashboardEvento ──────────────────────────────────────────────────────── */
function DashboardEvento({ evento, pessoas = [], zonas = [], onVoltar, onEditar, onExcluir, onAlternarPublicacao, podeEditar, onVerMembro, onAbrirLeitor, onGerarCarne, membroLogado }) {
  const isGratuito = evento?.valor_tipo !== 'pago';
  const temTransporte = Number(evento?.valor_transporte) > 0;
  const [inscritos, setInscritos] = useState(() => (
    evento?.id && cacheAgenda.inscritosPorEvento[evento.id] ? cacheAgenda.inscritosPorEvento[evento.id] : []
  ));
  const [carregando, setCarregando] = useState(() => !(evento?.id && cacheAgenda.inscritosPorEvento[evento.id]));
  const [modalInscrito, setModalInscrito] = useState({ aberto: false, dados: null });
  const [modalFiltroGrafico, setModalFiltroGrafico] = useState({
    aberto: false,
    titulo: '',
    tipo: '',
    chave: '',
    participantes: []
  });
  const [filtroStatusModal, setFiltroStatusModal] = useState('todos');
  const [buscaModal, setBuscaModal] = useState('');
  const [listaZonas, setListaZonas] = useState(zonas || []);
  const [modalExportarAberto, setModalExportarAberto] = useState(false);
  const [formatoExportarInicial, setFormatoExportarInicial] = useState('pdf');
  const [incluirTransporteNoTotal, setIncluirTransporteNoTotal] = useState(true);
  const [modalRecibo, setModalRecibo] = useState({ aberto: false, inscrito: null });
  const [toastWhatsApp, setToastWhatsApp] = useState(null);
  const sincronizadosDemogRef = useRef(new Set());

  const notificarWhatsApp = useCallback((type, msg, duracaoMs = 6500) => {
    setToastWhatsApp({ type, msg });
    if (duracaoMs > 0) {
      setTimeout(() => {
        setToastWhatsApp((atual) => (atual?.msg === msg ? null : atual));
      }, duracaoMs);
    }
  }, []);

  useEffect(() => {
    sincronizadosDemogRef.current.clear();
  }, [evento?.id]);

  useEffect(() => {
    if (zonas && zonas.length > 0) {
      setListaZonas(zonas);
    } else {
      supabase.from('zonas_moradia').select('*').order('nome').then(({ data }) => {
        if (data && data.length > 0) setListaZonas(data);
      });
    }
  }, [zonas]);

  useEffect(() => {
    const cached = evento?.id ? cacheAgenda.inscritosPorEvento[evento.id] : null;
    if (cached) {
      setInscritos(cached);
      setCarregando(false);
    }
    async function carregarInscritos() {
      if (!cached) {
        setCarregando(true);
      }
      try {
        const { data, error } = await supabase
          .from('agenda_inscricoes')
          .select('*')
          .eq('evento_id', evento.id)
          .order('created_at', { ascending: false });
        if (!error) {
          const lista = data || [];
          cacheAgenda.inscritosPorEvento[evento.id] = lista;
          setInscritos(lista);
        }
      } catch (err) { console.error(err); }
      finally { setCarregando(false); }
    }
    carregarInscritos();
  }, [evento.id]);

  // Cálculos de Indicadores para o Dashboard
  const stats = useMemo(() => {
    let confirmados = 0;
    let pendentes = 0;
    let cancelados = 0;
    let totalArrecadadoComTransporte = 0;
    let totalArrecadadoSemTransporte = 0;

    let transporteSim = 0;
    let transporteNao = 0;
    const formasPagamento = {};

    inscritos.forEach(i => {
      const dados = i.dados_inscricao || {};
      const incluiTransporte = findInJsonGlobal(dados, 'transporte')?.toString().toLowerCase().startsWith('sim');
      const valorInscricaoTotal = extrairValorInscricao(dados, evento);

      let valorTransporteItem = 0;
      if (dados.valor_transporte !== undefined && dados.valor_transporte !== null && dados.valor_transporte !== '') {
        valorTransporteItem = Number(dados.valor_transporte) || 0;
      } else if (incluiTransporte) {
        valorTransporteItem = Number(evento?.valor_transporte) || 0;
      }
      const valorInscricaoBase = Math.max(0, valorInscricaoTotal - valorTransporteItem);

      const totalParcelas = Number(findInJsonGlobal(dados, 'parcelas')) || 1;
      const pagas = dados.parcelas_pagas || [];

      if (i.status_pagamento === 'pago') {
        confirmados++;
        totalArrecadadoComTransporte += valorInscricaoTotal;
        totalArrecadadoSemTransporte += valorInscricaoBase;
      } else if (i.status_pagamento === 'cancelado') {
        cancelados++;
      } else {
        pendentes++;
        if (pagas.length > 0) {
          const proporcao = totalParcelas > 0 ? (pagas.length / totalParcelas) : 0;
          totalArrecadadoComTransporte += valorInscricaoTotal * proporcao;
          totalArrecadadoSemTransporte += valorInscricaoBase * proporcao;
        }
      }

      // Estatísticas apenas de inscritos ativos (não cancelados)
      if (i.status_pagamento !== 'cancelado') {
        if (incluiTransporte) transporteSim++;
        else transporteNao++;

        const forma = findInJsonGlobal(dados, 'pagamento')?.toString() || 'Não especificada';
        formasPagamento[forma] = (formasPagamento[forma] || 0) + 1;
      }
    });

    // Vagas ocupadas (considerando pagos e pendentes como reserva de vaga)
    const ocupadas = confirmados + pendentes;
    const disponiveis = evento.vagas ? Math.max(0, evento.vagas - ocupadas) : '∞';
    const totalTransporteArrecadado = Math.max(0, totalArrecadadoComTransporte - totalArrecadadoSemTransporte);

    return {
      confirmados,
      pendentes,
      cancelados,
      disponiveis,
      totalComTransporte: totalArrecadadoComTransporte,
      totalSemTransporte: totalArrecadadoSemTransporte,
      totalTransporteArrecadado,
      totalRecebido: totalArrecadadoComTransporte,
      transporteSim,
      transporteNao,
      formasPagamento
    };
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

  // Helper robusto para cruzar inscrito com a base de membros (CPF, E-mail, Telefone/WhatsApp ou Nome)
  const encontrarMembroDoInscrito = useCallback((ins) => {
    if (!ins || !pessoas.length) return null;
    const dados = ins.dados_inscricao || {};

    const normalizarTexto = (s) =>
      String(s || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim();

    const normalizarCPF = (v) => {
      const d = String(v || '').replace(/\D/g, '');
      return d.length === 11 ? d : '';
    };

    const normalizarTel = (v) => {
      const d = String(v || '').replace(/\D/g, '');
      if (d.length < 10) return '';
      return d.startsWith('55') && d.length >= 12 ? d.slice(2) : d;
    };

    const cpfIns = normalizarCPF(findInJsonGlobal(dados, ['cpf', 'documento']));
    if (cpfIns) {
      const porCpf = pessoas.find(p => normalizarCPF(p.cpf) === cpfIns);
      if (porCpf) return porCpf;
    }

    const emailIns = String(findInJsonGlobal(dados, ['email', 'e-mail']) || '').toLowerCase().trim();
    if (emailIns && emailIns.includes('@')) {
      const porEmail = pessoas.find(p => p.email && p.email.toLowerCase().trim() === emailIns);
      if (porEmail) return porEmail;
    }

    const telIns = normalizarTel(findInJsonGlobal(dados, ['telefone', 'celular', 'whatsapp', 'contato']));
    if (telIns) {
      const porTel = pessoas.find(p => {
        const telP = normalizarTel(p.telefone);
        return telP && (telP === telIns || telP.slice(-10) === telIns.slice(-10));
      });
      if (porTel) return porTel;
    }

    const nomeIns = normalizarTexto(findInJsonGlobal(dados, ['nome', 'nome completo', 'completo']));
    if (nomeIns) {
      const porNomeExato = pessoas.find(p => normalizarTexto(p.nome) === nomeIns);
      if (porNomeExato) return porNomeExato;

      const preposicoes = new Set(['de', 'da', 'do', 'dos', 'das', 'e']);
      const palavrasIns = nomeIns.split(' ').filter(w => w.length > 1 && !preposicoes.has(w));
      if (palavrasIns.length >= 2) {
        const porNomeParcial = pessoas.find(p => {
          const palavrasMembro = normalizarTexto(p.nome).split(' ').filter(w => w.length > 1 && !preposicoes.has(w));
          if (palavrasMembro.length < 2) return false;
          if (palavrasIns[0] !== palavrasMembro[0]) return false;
          const matches = palavrasIns.filter(w => palavrasMembro.includes(w));
          return (matches.length / palavrasIns.length) >= 0.7;
        });
        if (porNomeParcial) return porNomeParcial;
      }
    }

    return null;
  }, [pessoas]);

  // Cruzamento automático: identifica membros e preenche dados demográficos ausentes na inscrição
  useEffect(() => {
    if (!inscritos.length || !pessoas.length) return;

    const zonasProntas = listaZonas.length > 0;
    const atualizacoes = [];

    inscritos.forEach((ins) => {
      const chaveSync = `${ins.id}:${zonasProntas ? 'z1' : 'z0'}`;
      if (sincronizadosDemogRef.current.has(chaveSync)) return;
      sincronizadosDemogRef.current.add(chaveSync);

      const membro = encontrarMembroDoInscrito(ins);
      if (!membro) return;

      const dados = ins.dados_inscricao || {};
      const novosCampos = {};

      // 1. Data de Nascimento
      const temNasc = findInJsonGlobal(dados, ['data_nascimento', 'data de nascimento', 'nascimento', 'idade']);
      if ((!temNasc || !String(temNasc).trim()) && membro.data_nascimento) {
        const raw = String(membro.data_nascimento).trim();
        const matchIso = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
        novosCampos['Data de Nascimento'] = matchIso ? `${matchIso[3]}/${matchIso[2]}/${matchIso[1]}` : raw;
      }

      // 2. Gênero
      const temGenero = findInJsonGlobal(dados, ['genero', 'gênero', 'sexo']);
      if ((!temGenero || !String(temGenero).trim()) && membro.genero) {
        novosCampos['Gênero'] = String(membro.genero).trim();
      }

      // 3. Estado Civil
      const temEstadoCivil = findInJsonGlobal(dados, ['estado civil', 'estado_civil', 'estadocivil']);
      if ((!temEstadoCivil || !String(temEstadoCivil).trim()) && membro.estado_civil) {
        novosCampos['Estado Civil'] = String(membro.estado_civil).trim();
      }

      // 4. Zona de Moradia
      const temZona = findInJsonGlobal(dados, ['zona de moradia', 'zona moradia', 'zona', 'regiao', 'região']);
      if (!temZona || !String(temZona).trim()) {
        if (membro.zona_id && zonasProntas) {
          const z = listaZonas.find(item => String(item.id) === String(membro.zona_id));
          if (z?.nome) novosCampos['Zona de Moradia'] = z.nome;
        } else if (!membro.zona_id && membro.bairro) {
          novosCampos['Zona de Moradia'] = `Bairro ${String(membro.bairro).trim()}`;
        }
      }

      if (Object.keys(novosCampos).length > 0) {
        atualizacoes.push({
          id: ins.id,
          novosDados: { ...dados, ...novosCampos }
        });
      }
    });

    if (atualizacoes.length === 0) return;

    const mapaAtualizacoes = new Map(atualizacoes.map(a => [a.id, a.novosDados]));

    setInscritos(prev => prev.map(item =>
      mapaAtualizacoes.has(item.id)
        ? { ...item, dados_inscricao: mapaAtualizacoes.get(item.id) }
        : item
    ));

    setModalInscrito(prev =>
      prev.aberto && prev.dados && mapaAtualizacoes.has(prev.dados.id)
        ? { ...prev, dados: { ...prev.dados, dados_inscricao: mapaAtualizacoes.get(prev.dados.id) } }
        : prev
    );

    if (podeEditar) {
      Promise.all(
        atualizacoes.map(({ id, novosDados }) =>
          supabase.from('agenda_inscricoes').update({ dados_inscricao: novosDados }).eq('id', id)
        )
      ).catch(err => console.error('Erro ao preencher dados demográficos do membro:', err));
    }
  }, [inscritos, pessoas, listaZonas, encontrarMembroDoInscrito, podeEditar]);

  // Mapeia a zona de moradia do participante (via formulário ou cadastro de membro)
  const obterZonaParticipante = useCallback((inscrito) => {
    const dados = inscrito.dados_inscricao || {};

    // 1. Campo de formulário de inscrição
    const zonaForm = findInJsonGlobal(dados, ['zona de moradia', 'zona moradia', 'zona', 'regiao', 'região']);
    if (zonaForm && typeof zonaForm === 'string' && zonaForm.trim()) {
      const zEncontrada = listaZonas.find(z => String(z.id) === String(zonaForm).trim() || z.nome.toLowerCase() === zonaForm.trim().toLowerCase());
      if (zEncontrada) return zEncontrada.nome;
      return zonaForm.trim();
    }

    // 2. Vínculo com membro na base
    const membro = encontrarMembroDoInscrito(inscrito);

    if (membro) {
      if (membro.zona_id) {
        const z = listaZonas.find(item => String(item.id) === String(membro.zona_id));
        if (z) return z.nome;
      }
      if (membro.bairro) return `Bairro ${membro.bairro}`;
    }

    // 3. Campo Bairro no formulário
    const bairroForm = findInJsonGlobal(dados, ['bairro', 'bairro/cidade']);
    if (bairroForm && typeof bairroForm === 'string' && bairroForm.trim()) {
      return `Bairro ${bairroForm.trim()}`;
    }

    return 'Não informada';
  }, [encontrarMembroDoInscrito, listaZonas]);

  // Dados para o Gráfico Rosca de Opção de Transporte
  const dadosTransporteRosca = useMemo(() => {
    const ativos = inscritos.filter(i => i.status_pagamento !== 'cancelado');
    const comTransp = ativos.filter(i => {
      const dados = i.dados_inscricao || {};
      return findInJsonGlobal(dados, 'transporte')?.toString().toLowerCase().startsWith('sim');
    });
    const semTransp = ativos.filter(i => {
      const dados = i.dados_inscricao || {};
      return !findInJsonGlobal(dados, 'transporte')?.toString().toLowerCase().startsWith('sim');
    });

    const itens = [];
    if (comTransp.length > 0) {
      itens.push({
        name: 'Com Transporte (🚌)',
        value: comTransp.length,
        color: '#10b981',
        tipo: 'transporte',
        chave: 'sim',
        participantes: comTransp
      });
    }
    if (semTransp.length > 0) {
      itens.push({
        name: 'Sem Transporte (🚶)',
        value: semTransp.length,
        color: '#64748b',
        tipo: 'transporte',
        chave: 'nao',
        participantes: semTransp
      });
    }
    return itens;
  }, [inscritos]);

  // Dados para o Gráfico Rosca de Zona de Moradia
  const dadosZonasRosca = useMemo(() => {
    const ativos = inscritos.filter(i => i.status_pagamento !== 'cancelado');
    const grupos = {};

    ativos.forEach(i => {
      const zona = obterZonaParticipante(i);
      if (!grupos[zona]) grupos[zona] = [];
      grupos[zona].push(i);
    });

    const PALETA_ZONAS = [
      '#2563eb', // blue
      '#10b981', // emerald
      '#f59e0b', // amber
      '#8b5cf6', // purple
      '#ec4899', // pink
      '#06b6d4', // cyan
      '#f97316', // orange
      '#64748b', // slate
      '#14b8a6', // teal
      '#6366f1', // indigo
      '#84cc16', // lime
      '#d946ef'  // fuchsia
    ];

    return Object.entries(grupos)
      .sort((a, b) => b[1].length - a[1].length)
      .map(([nome, lista], idx) => ({
        name: nome,
        value: lista.length,
        color: PALETA_ZONAS[idx % PALETA_ZONAS.length],
        tipo: 'zona',
        chave: nome,
        participantes: lista
      }));
  }, [inscritos, obterZonaParticipante]);

  // Extrai Faixa Etária (dos dados da inscrição ou do cadastro de membro)
  const obterFaixaEtariaParticipante = useCallback((ins) => {
    const dados = ins?.dados_inscricao || {};
    const membro = encontrarMembroDoInscrito(ins);
    let dataNasc = findInJsonGlobal(dados, ['data_nascimento', 'data de nascimento', 'nascimento']) || membro?.data_nascimento || '';

    if (dataNasc && typeof dataNasc === 'string') {
      const limpo = dataNasc.trim();
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(limpo)) {
        const [d, m, y] = limpo.split('/');
        dataNasc = `${y}-${m}-${d}`;
      }
      const faixaId = faixaDaIdade(dataNasc);
      const faixaObj = faixasEtarias.find(f => f.id === faixaId);
      if (faixaObj) return faixaObj.curto;
    }

    const idadeRaw = findInJsonGlobal(dados, ['idade']);
    if (idadeRaw !== undefined && idadeRaw !== null && idadeRaw !== '') {
      const idadeNum = parseInt(String(idadeRaw).replace(/\D/g, ''), 10);
      if (!Number.isNaN(idadeNum)) {
        const faixaObj = faixasEtarias.find(f => idadeNum >= f.min && idadeNum <= f.max);
        if (faixaObj) return faixaObj.curto;
      }
    }

    return 'Não informada';
  }, [encontrarMembroDoInscrito]);

  // Extrai Gênero (da inscrição ou do cadastro de membro)
  const obterGeneroParticipante = useCallback((ins) => {
    const dados = ins?.dados_inscricao || {};
    const membro = encontrarMembroDoInscrito(ins);
    const raw = findInJsonGlobal(dados, ['genero', 'gênero', 'sexo']) || membro?.genero || '';
    const norm = String(raw).trim().toLowerCase();
    if (!norm) return 'Não informado';
    if (norm === 'm' || norm.startsWith('masc')) return 'Masculino';
    if (norm === 'f' || norm.startsWith('fem')) return 'Feminino';
    return String(raw).trim();
  }, [encontrarMembroDoInscrito]);

  // Extrai Estado Civil (da inscrição ou do cadastro de membro)
  const obterEstadoCivilParticipante = useCallback((ins) => {
    const dados = ins?.dados_inscricao || {};
    const membro = encontrarMembroDoInscrito(ins);
    const raw = findInJsonGlobal(dados, ['estado civil', 'estado_civil', 'estadocivil']) || membro?.estado_civil || '';
    const str = String(raw).trim();
    if (!str) return 'Não informado';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }, [encontrarMembroDoInscrito]);

  // Dados para Gráfico Rosca: Faixa Etária
  const dadosFaixaEtariaRosca = useMemo(() => {
    const ativos = inscritos.filter(i => i.status_pagamento !== 'cancelado');
    const grupos = {};
    ativos.forEach(i => {
      const faixa = obterFaixaEtariaParticipante(i);
      if (!grupos[faixa]) grupos[faixa] = [];
      grupos[faixa].push(i);
    });

    const PALETA_FAIXAS = ['#6366f1', '#2563eb', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#94a3b8'];
    return Object.entries(grupos)
      .sort((a, b) => b[1].length - a[1].length)
      .map(([nome, lista], idx) => ({
        name: nome,
        value: lista.length,
        color: nome === 'Não informada' ? '#94a3b8' : PALETA_FAIXAS[idx % PALETA_FAIXAS.length],
        tipo: 'faixa_etaria',
        chave: nome,
        participantes: lista
      }));
  }, [inscritos, obterFaixaEtariaParticipante]);

  // Dados para Gráfico Rosca: Gênero
  const dadosGeneroRosca = useMemo(() => {
    const ativos = inscritos.filter(i => i.status_pagamento !== 'cancelado');
    const grupos = {};
    ativos.forEach(i => {
      const gen = obterGeneroParticipante(i);
      if (!grupos[gen]) grupos[gen] = [];
      grupos[gen].push(i);
    });

    const corGenero = (g) => {
      if (g === 'Masculino') return '#2563eb';
      if (g === 'Feminino') return '#ec4899';
      if (g === 'Não informado') return '#94a3b8';
      return '#8b5cf6';
    };

    return Object.entries(grupos)
      .sort((a, b) => b[1].length - a[1].length)
      .map(([nome, lista]) => ({
        name: nome,
        value: lista.length,
        color: corGenero(nome),
        tipo: 'genero',
        chave: nome,
        participantes: lista
      }));
  }, [inscritos, obterGeneroParticipante]);

  // Dados para Gráfico Rosca: Estado Civil
  const dadosEstadoCivilRosca = useMemo(() => {
    const ativos = inscritos.filter(i => i.status_pagamento !== 'cancelado');
    const grupos = {};
    ativos.forEach(i => {
      const ec = obterEstadoCivilParticipante(i);
      if (!grupos[ec]) grupos[ec] = [];
      grupos[ec].push(i);
    });

    const PALETA_EC = ['#14b8a6', '#f59e0b', '#8b5cf6', '#ef4444', '#2563eb', '#ec4899', '#94a3b8'];
    return Object.entries(grupos)
      .sort((a, b) => b[1].length - a[1].length)
      .map(([nome, lista], idx) => ({
        name: nome,
        value: lista.length,
        color: nome === 'Não informado' ? '#94a3b8' : PALETA_EC[idx % PALETA_EC.length],
        tipo: 'estado_civil',
        chave: nome,
        participantes: lista
      }));
  }, [inscritos, obterEstadoCivilParticipante]);

  // Abertura do modal ao clicar nas divisões/fatias do gráfico
  const handleAbrirModalGrafico = useCallback((entry) => {
    if (!entry) return;
    setFiltroStatusModal('todos');
    setBuscaModal('');
    setModalFiltroGrafico({
      aberto: true,
      titulo: entry.name,
      tipo: entry.tipo || 'filtro',
      chave: entry.chave,
      participantes: entry.participantes || []
    });
  }, []);

  const formatarDataHoraExibicao = (iso) => {
    if (!iso) return '—';
    const [data, hora] = iso.split('T');
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano} ${hora ? hora.slice(0, 5) : '00:00'}`;
  };

  const executarEnvioReciboAuto = useCallback(async (inscAtualizado) => {
    if (!inscAtualizado) return;
    notificarWhatsApp('loading', 'Enviando Recibo Especial (PDF) no WhatsApp...', 0);
    try {
      const res = await dispararReciboQuitacaoAutomatico({
        evento,
        inscrito: inscAtualizado,
        pessoas,
        obterZonaParticipante
      });
      if (res?.ok) {
        notificarWhatsApp('success', `Recibo Especial em PDF enviado no WhatsApp de ${res.nome || 'participante'}!`, 6500);
      } else if (res?.skipped) {
        notificarWhatsApp('warning', `Recibo não enviado: ${res.reason}`, 7500);
      }
    } catch (err) {
      console.warn('[WhatsApp Auto] Recibo não enviado automaticamente:', err?.message);
      notificarWhatsApp('error', `WhatsApp automático: ${err?.message || 'servidor indisponível.'}`, 8500);
    }
  }, [evento, pessoas, obterZonaParticipante, notificarWhatsApp]);

  const handleUpdateStatus = async (id, novoStatus) => {
    const insc = inscritos.find(i => i.id === id);
    const dados = insc?.dados_inscricao || {};
    const totalParc = Number(findInJsonGlobal(dados, 'parcelas')) || extrairParcelasInscricao(dados) || 1;
    const valorHistorico = extrairValorInscricao(dados, evento);

    const novosDados = {
      ...dados,
      valor_total_numerico: valorHistorico,
      "Valor Total": dados["Valor Total"] || `R$ ${valorHistorico.toFixed(2).replace('.', ',')}`
    };
    if (novoStatus === 'pago' && totalParc > 1) {
      novosDados.parcelas_pagas = Array.from({ length: totalParc }, (_, i) => i + 1);
    }

    const patch = { status_pagamento: novoStatus, dados_inscricao: novosDados };

    const { error } = await supabase.from('agenda_inscricoes').update(patch).eq('id', id);
    if (!error) {
      const inscAtualizado = insc ? { ...insc, ...patch } : null;
      setInscritos(prev => {
        const atualizados = prev.map(ins => ins.id === id ? { ...ins, ...patch } : ins);
        if (evento?.id) cacheAgenda.inscritosPorEvento[evento.id] = atualizados;
        return atualizados;
      });
      setModalInscrito({ aberto: false, dados: null });

      // Disparo automático do Recibo Especial em PDF via Servidor WhatsApp ao quitar inscrição paga
      if (!isGratuito && novoStatus === 'pago' && insc?.status_pagamento !== 'pago' && inscAtualizado) {
        executarEnvioReciboAuto(inscAtualizado);
      }
    }
  };

  const handleToggleParcela = async (num) => {
    const insc = modalInscrito.dados;
    if (!insc) return;

    const dados = insc.dados_inscricao || {};
    const pagas = dados.parcelas_pagas || [];
    const totalParc = Number(findInJsonGlobal(dados, 'parcelas')) || extrairParcelasInscricao(dados) || 1;
    const valorHistorico = extrairValorInscricao(dados, evento);

    const novasPagas = pagas.includes(num)
      ? pagas.filter(p => p !== num)
      : [...pagas, num].sort((a, b) => Number(a) - Number(b));

    const novoStatus = novasPagas.length >= totalParc ? 'pago' : 'pendente';
    const novosDadosInscricao = {
      ...dados,
      parcelas_pagas: novasPagas,
      valor_total_numerico: valorHistorico,
      "Valor Total": dados["Valor Total"] || `R$ ${valorHistorico.toFixed(2).replace('.', ',')}`
    };

    const { error } = await supabase
      .from('agenda_inscricoes')
      .update({
        status_pagamento: novoStatus,
        dados_inscricao: novosDadosInscricao
      })
      .eq('id', insc.id);

    if (!error) {
      const inscAtualizado = { ...insc, status_pagamento: novoStatus, dados_inscricao: novosDadosInscricao };
      setInscritos(prev => {
        const atualizados = prev.map(item => item.id === insc.id ? { ...item, status_pagamento: novoStatus, dados_inscricao: novosDadosInscricao } : item);
        if (evento?.id) cacheAgenda.inscritosPorEvento[evento.id] = atualizados;
        return atualizados;
      });
      setModalInscrito(prev => ({ ...prev, dados: { ...prev.dados, status_pagamento: novoStatus, dados_inscricao: novosDadosInscricao } }));

      // Se a última parcela acabou de ser quitada, dispara o Recibo Especial em PDF automaticamente
      if (!isGratuito && novoStatus === 'pago' && insc.status_pagamento !== 'pago') {
        executarEnvioReciboAuto(inscAtualizado);
      }
    }
  };

  const handleExcluirInscricao = async (e, id) => {
    e.stopPropagation();
    if (!(await window.confirmModal('Excluir Inscrição', 'Deseja realmente excluir esta inscrição? Esta ação não pode ser desfeita.'))) return;

    // Adicionamos .select() para validar se a linha foi realmente removida no servidor
    const { data, error } = await supabase.from('agenda_inscricoes').delete().eq('id', id).select();

    if (!error && data && data.length > 0) {
      setInscritos(prev => prev.filter(ins => ins.id !== id));
      if (modalInscrito.dados?.id === id) setModalInscrito({ aberto: false, dados: null });
    } else if (!error && (!data || data.length === 0)) {
      alert("A exclusão falhou no servidor. Isso geralmente acontece porque não existe uma política (RLS) que permita o seu perfil excluir registros nesta tabela.");
    } else {
      alert("Erro ao excluir: " + error.message);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {toastWhatsApp && (
        <div
          className={`fixed bottom-5 right-5 z-[300] max-w-sm px-4 py-3 rounded-2xl shadow-2xl border text-xs font-bold flex items-center gap-2.5 animate-in slide-in-from-bottom-3 duration-200 print:hidden ${
            toastWhatsApp.type === 'success'
              ? 'bg-emerald-600 text-white border-emerald-400/40'
              : toastWhatsApp.type === 'warning'
                ? 'bg-amber-500 text-white border-amber-300/40'
                : toastWhatsApp.type === 'error'
                  ? 'bg-rose-600 text-white border-rose-400/40'
                  : 'bg-slate-900 text-white border-slate-700'
          }`}
        >
          <span>
            {toastWhatsApp.type === 'success' ? '✅' : toastWhatsApp.type === 'warning' ? '⚠️' : toastWhatsApp.type === 'error' ? '❌' : '⏳'}
          </span>
          <span className="flex-1 leading-snug">{toastWhatsApp.msg}</span>
          <button
            type="button"
            onClick={() => setToastWhatsApp(null)}
            className="text-white/80 hover:text-white font-black ml-1 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
      <div className="flex items-center justify-between flex-wrap gap-y-4 print:hidden">
        <button className="btn-ghost !rounded-md text-xs sm:text-sm p-2 sm:px-4 sm:py-2" onClick={onVoltar}>
          <Icon.Back />
          <span className="hidden sm:inline">Voltar para lista</span>
          <span className="sm:hidden">Voltar</span>
        </button>
        <div className="flex items-center justify-end gap-1 sm:gap-2 flex-wrap">
          {['admin', 'pastor', 'tesouraria', 'financeiro', 'secretaria', 'secretario'].includes((membroLogado?.permissao || '').toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '')) && (
            <button
              className="btn-ghost !rounded-md p-2.5 sm:px-4 sm:py-2 text-blue-600 border-blue-200 bg-blue-50 font-bold"
              onClick={onAbrirLeitor}
              title="Leitor de Baixa (QR)"
            >
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.0} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
              </svg>

              <span className="hidden sm:inline ml-1">Leitor QRCode</span>
            </button>
          )}
          <button
            className="btn-ghost !rounded-md p-2.5 sm:px-4 sm:py-2"
            onClick={() => {
              const url = `${window.location.origin}/inscricao-evento/${evento.id}`;
              navigator.clipboard?.writeText?.(url);
              const msgWhatsapp = gerarMensagemInscricaoEvento(evento, url);
              if (window.modalLinkCopiado) {
                window.modalLinkCopiado({
                  url,
                  tipo: 'evento',
                  titulo: 'Link de Inscrição Copiado!',
                  subtitulo: `Link público de inscrição para "${evento.titulo || 'o evento'}".`,
                  mensagemWhatsapp: msgWhatsapp,
                  nomeEvento: evento.titulo,
                  evento,
                  dicaSeguranca: 'Este formulário permite a inscrição segura de participantes sem expor dados de outros inscritos.'
                });
              } else {
                alert('Link do formulário copiado!');
              }
            }}
            title="Copiar Link"
          >
            <Icon.Link />
            <span className="hidden sm:inline ml-1">Copiar Link</span>
          </button>
          <button
            className="btn-ghost !rounded-md p-2.5 sm:px-4 sm:py-2"
            onClick={() => window.open(`${window.location.origin}/inscricao-evento/${evento.id}`, '_blank')}
            title="Ver Form"
          >
            <Icon.FileText />
            <span className="hidden sm:inline ml-1">Ver Form</span>
          </button>
          <button
            className="btn-ghost !rounded-md p-2.5 sm:px-4 sm:py-2"
            onClick={() => {
              setFormatoExportarInicial('pdf');
              setModalExportarAberto(true);
            }}
            title="Imprimir ou Salvar Lista em PDF com opções personalizadas"
          >
            <Icon.Printer />
            <span className="hidden sm:inline ml-1">Imprimir / PDF</span>
          </button>
          <button
            className="btn-ghost !rounded-md p-2.5 sm:px-4 sm:py-2 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 font-bold"
            onClick={() => {
              setFormatoExportarInicial('xlsx');
              setModalExportarAberto(true);
            }}
            title="Exportar Lista (PDF, Excel ou CSV)"
          >
            <Icon.Download />
            <span className="hidden sm:inline ml-1">Exportar Lista</span>
          </button>
          {podeEditar && (
            <>
              <button
                className={`btn-ghost !rounded-md p-2.5 sm:px-4 sm:py-2 font-bold ${evento.publicado === false
                  ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'
                  : 'text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200'
                  }`}
                onClick={() => onAlternarPublicacao(evento.id, evento.publicado !== false)}
                title={evento.publicado === false ? 'Publicar Evento' : 'Despublicar Evento'}
              >
                {evento.publicado === false ? '🟢 Publicar' : '🟡 Despublicar'}
              </button>
              <button
                className="btn-ghost !rounded-md p-2.5 sm:px-4 sm:py-2 text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 font-bold"
                onClick={() => onExcluir(evento.id)}
                title="Excluir Evento"
              >
                <Icon.Trash />
                <span className="hidden sm:inline ml-1">Excluir Evento</span>
              </button>
            </>
          )}
          <button
            className="btn-primary !rounded-md p-2.5 sm:px-4 sm:py-2"
            onClick={onEditar}
            title="Editar Evento"
          >
            <Icon.Edit />
            <span className="hidden sm:inline ml-1">Editar Evento</span>
          </button>
        </div>
      </div>

      <div className="ag-card print:hidden" style={{ padding: 32 }}>
        <div className="flex flex-col md:flex-row gap-10">
          <div style={{ width: 200, shrink: 0 }}>
            <img src={evento.capa_url || 'https://via.placeholder.com/200x270?text=Sem+Capa'} className="rounded-2xl shadow-xl border-4 border-white w-full object-cover" style={{ aspectRatio: '3/4' }} alt="Capa" />
          </div>
          <div className="flex-1 space-y-6">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="badge" style={{ background: 'var(--blue-900)', color: '#fff' }}>{evento.tipo}</span>
                {evento.publicado === false && (
                  <span className="badge" style={{ background: 'var(--slate-100)', color: 'var(--slate-500)', border: '1px solid var(--slate-300)' }}>Despublicado</span>
                )}
              </div>
              <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mt-3 tracking-tight">{evento.titulo}</h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-xl leading-snug">{evento.subtitulo}</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-slate-100 dark:border-slate-800">
              <div><span className="campo-label">Início do Evento</span><p className="text-sm font-black text-slate-700 dark:text-slate-200">{formatarDataHoraExibicao(evento.data_inicio)}</p></div>
              <div><span className="campo-label">Término</span><p className="text-sm font-black text-slate-700 dark:text-slate-200">{formatarDataHoraExibicao(evento.data_fim)}</p></div>
              <div><span className="campo-label">Confirmados</span><p className="text-sm font-black text-blue-600 dark:text-blue-400">{inscritos.length} inscritos</p></div>
              <div><span className="campo-label">Vagas Totais</span><p className="text-sm font-black text-slate-700 dark:text-slate-200">{evento.vagas || 'Sem limite'}</p></div>
            </div>
          </div>
        </div>
      </div>

      {/* LINHA DE INDICADORES RÁPIDOS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 print:hidden">
        <StatCard
          label={isGratuito ? 'Presentes' : 'Confirmados'}
          valor={stats.confirmados}
          detalhe={isGratuito ? 'Presença confirmada' : 'Inscrições pagas'}
          icone="✅"
        />
        <StatCard
          label={isGratuito ? 'Ausentes' : 'Pendentes'}
          valor={stats.pendentes}
          detalhe={isGratuito ? 'Ainda não confirmou' : 'Aguardando PG'}
          icone="⏳"
        />
        <StatCard label="Cancelados" valor={stats.cancelados} detalhe="Desistentes" icone="🚫" />
        <StatCard label="Disponíveis" valor={stats.disponiveis} detalhe="Vagas abertas" icone="🎟️" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 print:hidden">
        {/* CARD TOTAL RECEBIDO DESTACADO (Apenas para eventos pagos) */}
        {!isGratuito && (
        <div
          className="lg:col-span-1 p-7 sm:p-8 rounded-[24px] shadow-xl flex flex-col justify-between relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)', color: '#ffffff' }}
        >
          <div className="absolute -right-6 -bottom-6 opacity-20 rotate-12">
            <svg width="140" height="140" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.15 0 2.25-.56 2.25-1.75 0-.94-.74-1.55-2.45-1.99-2.31-.6-4.14-1.48-4.14-3.8 0-2.09 1.63-3.41 3.27-3.79V3.2h2.67v1.88c1.37.31 2.82 1.13 2.97 3.21h-1.93c-.14-.94-.84-1.68-2.38-1.68-1.37 0-2.1.72-2.1 1.51 0 .97.94 1.48 2.84 1.95 2.5.62 4.14 1.7 4.14 3.93 0 2.38-1.63 3.66-3.66 3.89z" /></svg>
          </div>
          <div>
            <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
              <h3 style={{ margin: 0, fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.9 }}>
                Total Recebido
              </h3>
              {/* Alternador com / sem transporte (apenas quando cobrança de transporte está ativa) */}
              {temTransporte && (
              <div className="inline-flex items-center bg-black/20 p-0.5 rounded-xl backdrop-blur-xs text-[10px] font-bold">
                <button
                  type="button"
                  onClick={() => setIncluirTransporteNoTotal(true)}
                  className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                    incluirTransporteNoTotal
                      ? 'bg-white text-emerald-900 shadow-sm font-black'
                      : 'text-white/80 hover:text-white'
                  }`}
                  title="Total somando ingressos + taxas de transporte"
                >
                  Com Transp.
                </button>
                <button
                  type="button"
                  onClick={() => setIncluirTransporteNoTotal(false)}
                  className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                    !incluirTransporteNoTotal
                      ? 'bg-white text-emerald-900 shadow-sm font-black'
                      : 'text-white/80 hover:text-white'
                  }`}
                  title="Total apenas dos ingressos do evento (sem transporte)"
                >
                  Sem Transp.
                </button>
              </div>
              )}
            </div>
            <div style={{ fontSize: 38, fontWeight: 900, marginTop: 4, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              {(temTransporte && incluirTransporteNoTotal ? stats.totalComTransporte : stats.totalSemTransporte).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-[11px] font-bold opacity-90">
            <span>{stats.confirmados} confirmações</span>
            {temTransporte && (
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-md">
                {incluirTransporteNoTotal
                  ? (stats.totalTransporteArrecadado > 0 ? `🚌 + ${stats.totalTransporteArrecadado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} transporte` : '🚌 Sem taxa extra')
                  : '🎟️ Apenas Ingressos'}
              </span>
            )}
          </div>
        </div>
        )}

        {/* GRÁFICO DE INSCRIÇÕES POR PERÍODO */}
        <Card className={`${isGratuito ? 'lg:col-span-3' : 'lg:col-span-2'} p-0 overflow-hidden`}>
          <CardHeader titulo="Inscrições por Período" subtitulo="Tendência de novas adesões ao longo do tempo." />
          <div className="h-64 p-6 pt-2 min-w-0">
            {chartData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400 italic text-sm">Aguardando as primeiras inscrições...</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={180}>
                <LineChart data={chartData} style={{ outline: 'none' }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--card-border)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 700, fill: 'var(--slate-500)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fontWeight: 700, fill: 'var(--slate-500)' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid var(--card-border)', background: 'var(--card-bg)', color: 'var(--slate-900)', boxShadow: 'var(--shadow-lg)' }} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    name="Inscrições"
                    stroke="var(--blue-900)"
                    strokeWidth={4}
                    dot={{ r: 4, fill: 'var(--blue-900)', strokeWidth: 2, stroke: 'var(--card-bg)' }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>
      </div>

      {/* SEÇÃO DE ESTATÍSTICAS E GRÁFICOS INTERATIVOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 print:hidden">
        {/* Card Formas de Pagamento (apenas para eventos pagos) */}
        {evento.valor_tipo === 'pago' && (
          <Card className="p-0 overflow-hidden dark:bg-slate-900 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <CardHeader titulo="Formas de Pagamento" subtitulo="Distribuição dos métodos escolhidos pelos inscritos ativos." />
              <div className="p-6 space-y-4">
                {Object.keys(stats.formasPagamento).length === 0 ? (
                  <p className="text-sm text-slate-400 italic text-center py-4">Nenhuma forma de pagamento registrada ainda.</p>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(stats.formasPagamento).map(([metodo, qtd]) => {
                      const ativosCount = inscritos.length - stats.cancelados;
                      const porcentagem = ativosCount > 0 ? Math.round((qtd / ativosCount) * 100) : 0;
                      return (
                        <div key={metodo} className="space-y-1.5">
                          <div className="flex justify-between items-center text-xs font-bold">
                            <span className="text-slate-600 dark:text-slate-400 uppercase tracking-wider">{metodo}</span>
                            <span className="text-slate-800 dark:text-slate-200">{qtd} {qtd === 1 ? 'optante' : 'optantes'} ({porcentagem}%)</span>
                          </div>
                          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: `${porcentagem}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Card Opção de Transporte (Gráfico Tipo Rosca Clicável — apenas se cobrança de transporte estiver ativa) */}
        {temTransporte && (
          <RoscaGraficoCard
            titulo="Opção de Transporte"
            subtitulo="Adesão ao transporte oferecido para o evento."
            dados={dadosTransporteRosca}
            onSliceClick={handleAbrirModalGrafico}
            totalLabel="Participantes"
          />
        )}

        {/* Card Zona de Moradia (Gráfico Tipo Rosca Clicável) */}
        <RoscaGraficoCard
          titulo="Zona de Moradia"
          subtitulo="Distribuição geográfica de residência dos participantes."
          dados={dadosZonasRosca}
          onSliceClick={handleAbrirModalGrafico}
          totalLabel="Residentes"
        />

        {/* Card Faixa Etária (Gráfico Tipo Rosca Clicável) */}
        <RoscaGraficoCard
          titulo="Faixa Etária"
          subtitulo="Clique em uma faixa para filtrar os participantes."
          dados={dadosFaixaEtariaRosca}
          onSliceClick={handleAbrirModalGrafico}
          totalLabel="Inscritos"
        />

        {/* Card Gênero (Gráfico Tipo Rosca Clicável) */}
        <RoscaGraficoCard
          titulo="Gênero"
          subtitulo="Distribuição por gênero entre os inscritos ativos."
          dados={dadosGeneroRosca}
          onSliceClick={handleAbrirModalGrafico}
          totalLabel="Inscritos"
        />

        {/* Card Estado Civil (Gráfico Tipo Rosca Clicável) */}
        <RoscaGraficoCard
          titulo="Estado Civil"
          subtitulo="Clique para visualizar os inscritos por estado civil."
          dados={dadosEstadoCivilRosca}
          onSliceClick={handleAbrirModalGrafico}
          totalLabel="Inscritos"
        />
      </div>

      {/* CABEÇALHO DE IMPRESSÃO - Visível apenas no papel */}
      <div className="hidden print:block mb-8 border-b-2 border-slate-900 pb-6">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black uppercase text-slate-900 leading-tight">{evento.titulo}</h1>
            <p className="text-sm font-bold text-slate-500">{evento.subtitulo || 'Relatório de Participantes Inscritos'}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Extraído em</p>
            <p className="text-xs font-bold text-slate-700">{new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-8">
          <div className="border border-slate-200 p-4 rounded-2xl">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-1 tracking-wider">{isGratuito ? 'Presentes' : 'Confirmados'}</p>
            <p className="text-2xl font-black text-emerald-600 leading-none">{stats.confirmados}</p>
          </div>
          <div className="border border-slate-200 p-4 rounded-2xl">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-1 tracking-wider">{isGratuito ? 'Ausentes' : 'Pendentes'}</p>
            <p className="text-2xl font-black text-amber-600 leading-none">{stats.pendentes}</p>
          </div>
          {isGratuito ? (
            <div className="border border-slate-200 p-4 rounded-2xl">
              <p className="text-[10px] font-black uppercase text-slate-400 mb-1 tracking-wider">Cancelados</p>
              <p className="text-2xl font-black text-rose-600 leading-none">{stats.cancelados}</p>
            </div>
          ) : (
            <div className="border border-slate-200 p-4 rounded-2xl">
              <p className="text-[10px] font-black uppercase text-slate-400 mb-1 tracking-wider">
                Arrecadado {incluirTransporteNoTotal ? '(Com Transp.)' : '(Sem Transp.)'}
              </p>
              <p className="text-2xl font-black text-slate-800 leading-none">
                {(incluirTransporteNoTotal ? stats.totalComTransporte : stats.totalSemTransporte).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
          )}
          <div className="border border-slate-200 p-4 rounded-2xl">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-1 tracking-wider">Total Geral</p>
            <p className="text-2xl font-black text-blue-600 leading-none">{inscritos.length}</p>
          </div>
        </div>
      </div>

      <div className="ag-card print:border-none print:shadow-none print:p-0" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="ag-card-header print:hidden flex items-center justify-between flex-wrap gap-2" style={{ padding: '20px 24px', marginBottom: 0, borderBottom: '1.5px solid var(--card-border)', background: 'var(--slate-50)' }}>
          <div className="flex items-center gap-3">
            <div className="ag-card-title">Participantes Inscritos</div>
            <span className="badge" style={{ background: 'var(--blue-50)', color: 'var(--blue-900)' }}>{inscritos.length} registros</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setFormatoExportarInicial('pdf');
              setModalExportarAberto(true);
            }}
            className="btn-ghost !rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-2 flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition"
            title="Exportar dados dos participantes para PDF, Excel ou CSV"
          >
            <Icon.Download />
            <span>Exportar / PDF</span>
          </button>
        </div>
        <div style={{ overflowX: 'auto' }} className="print:overflow-visible">
          {carregando ? (
            <div className="text-center py-10 animate-pulse text-slate-400">Processando lista...</div>
          ) : inscritos.length === 0 ? (
            <div className="text-center py-24 text-slate-400 italic">Nenhuma inscrição realizada para este evento.</div>
          ) : (
            <>
              {/* Tabela Desktop (sm+) */}
              <table className="ag-table hidden sm:table">
                <thead>
                  <tr><th>Data</th><th>Participante</th><th>E-mail / Telefone</th><th style={{ textAlign: 'right' }}>Status</th><th style={{ textAlign: 'right', paddingRight: '24px' }} className="print:hidden">Ações</th></tr>
                </thead>
                <tbody>
                  {inscritos.map(i => {
                    const nome = findInJsonGlobal(i.dados_inscricao, 'nome') || findInJsonGlobal(i.dados_inscricao, 'completo') || 'Participante';
                    const rawPhone = findInJsonGlobal(i.dados_inscricao, 'telefone') || findInJsonGlobal(i.dados_inscricao, 'celular') || findInJsonGlobal(i.dados_inscricao, 'whatsapp') || findInJsonGlobal(i.dados_inscricao, 'contato');
                    const email = findInJsonGlobal(i.dados_inscricao, 'email');
                    const contato = rawPhone ? mascaraTelefone(rawPhone) : (email || '—');
                    const membroFound = encontrarMembroDoInscrito(i);
                    const totalParcelas = Number(findInJsonGlobal(i.dados_inscricao, 'parcelas')) || 1;
                    const pagas = i.dados_inscricao?.parcelas_pagas || [];

                    return (
                      <tr key={i.id} className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition" onClick={() => setModalInscrito({ aberto: true, dados: i })}>
                        <td className="text-xs font-bold text-slate-400">{new Date(i.created_at).toLocaleDateString('pt-BR')}</td>
                        <td className="font-bold text-slate-700 dark:text-slate-200">
                          {nome} {membroFound && <span className="ml-2 text-[9px] bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded border border-blue-100 dark:border-blue-800 font-black">MEMBRO</span>}
                        </td>
                        <td className="text-xs text-slate-500 dark:text-slate-400">{contato}</td>
                        <td style={{ textAlign: 'right' }}>
                          <div className="inline-flex items-center justify-end gap-1.5 flex-wrap">
                            {!isGratuito && i.dados_inscricao?.presenca_confirmada && (
                              <span
                                className="badge bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800/60"
                                title={i.dados_inscricao?.presenca_em ? `Check-in em ${new Date(i.dados_inscricao.presenca_em).toLocaleString('pt-BR')}` : 'Presença confirmada via QR Code'}
                              >
                                ✓ Presente
                              </span>
                            )}
                            {i.status_pagamento === 'pago' ? (
                              <span className="badge bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300">
                                {isGratuito ? 'presente' : 'pago'}
                              </span>
                            ) : i.status_pagamento === 'cancelado' ? (
                              <span className="badge bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300">cancelado</span>
                            ) : (!isGratuito && totalParcelas > 1 && pagas.length > 0) ? (
                              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-800 whitespace-nowrap">
                                {pagas.length}/{totalParcelas} Parc.
                              </span>
                            ) : (
                              <span className="badge bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300">
                                {isGratuito ? 'ausente' : 'pendente'}
                              </span>
                            )}
                          </div>
                        </td>
                        <td style={{ textAlign: 'right', paddingRight: '24px' }} className="print:hidden">
                          <div className="flex justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                            {!isGratuito && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => setModalRecibo({ aberto: true, inscrito: i })}
                                  className="text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 transition p-1.5 rounded-lg cursor-pointer"
                                  title="Recibo Especial de Quitação"
                                >
                                  <Icon.Recibo />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => onGerarCarne({ inscricaoId: i.id, pessoaId: membroFound?.id || null })}
                                  className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition p-1.5 rounded-lg cursor-pointer"
                                  title="Gerar Carnê"
                                >
                                  <Icon.Carne />
                                </button>
                              </>
                            )}
                            <button
                              type="button"
                              onClick={(e) => handleExcluirInscricao(e, i.id)}
                              className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition p-1.5 rounded-lg cursor-pointer"
                              title="Excluir Inscrição"
                            >
                              <Icon.Trash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Lista Mobile (max-sm) */}
              <div className="sm:hidden divide-y divide-slate-100 dark:divide-slate-800">
                {inscritos.map(i => {
                  const nome = findInJsonGlobal(i.dados_inscricao, 'nome') || findInJsonGlobal(i.dados_inscricao, 'completo') || 'Participante';
                  const email = findInJsonGlobal(i.dados_inscricao, 'email');
                  const rawPhone = findInJsonGlobal(i.dados_inscricao, 'telefone') || findInJsonGlobal(i.dados_inscricao, 'celular') || findInJsonGlobal(i.dados_inscricao, 'whatsapp') || findInJsonGlobal(i.dados_inscricao, 'contato');
                  const contato = rawPhone ? mascaraTelefone(rawPhone) : (email || '—');
                  const membroFound = encontrarMembroDoInscrito(i);
                  const totalParcelas = Number(findInJsonGlobal(i.dados_inscricao, 'parcelas')) || 1;
                  const pagas = i.dados_inscricao?.parcelas_pagas || [];

                  return (
                    <div key={i.id} className="p-4 flex flex-col gap-2 active:bg-slate-50 dark:active:bg-slate-800 transition" onClick={() => setModalInscrito({ aberto: true, dados: i })}>
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{new Date(i.created_at).toLocaleDateString('pt-BR')}</span>
                        <div className="flex items-center gap-1.5 flex-wrap justify-end">
                          {!isGratuito && i.dados_inscricao?.presenca_confirmada && (
                            <span
                              className="badge bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800/60"
                              title={i.dados_inscricao?.presenca_em ? `Check-in em ${new Date(i.dados_inscricao.presenca_em).toLocaleString('pt-BR')}` : 'Presença confirmada via QR Code'}
                            >
                              ✓ Presente
                            </span>
                          )}
                          {i.status_pagamento === 'pago' ? (
                            <span className="badge bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300">
                              {isGratuito ? 'presente' : 'pago'}
                            </span>
                          ) : i.status_pagamento === 'cancelado' ? (
                            <span className="badge bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300">cancelado</span>
                          ) : (!isGratuito && totalParcelas > 1 && pagas.length > 0) ? (
                            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-800 whitespace-nowrap">
                              {pagas.length}/{totalParcelas} Parc.
                            </span>
                          ) : (
                            <span className="badge bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300">
                              {isGratuito ? 'ausente' : 'pendente'}
                            </span>
                          )}
                          <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                            {!isGratuito && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => setModalRecibo({ aberto: true, inscrito: i })}
                                  className="p-1.5 text-emerald-600 active:scale-95 cursor-pointer print:hidden"
                                  title="Recibo Especial de Quitação"
                                >
                                  <Icon.Recibo />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => onGerarCarne({ inscricaoId: i.id, pessoaId: membroFound?.id || null })}
                                  className="p-1.5 text-blue-600 active:scale-95 cursor-pointer print:hidden"
                                  title="Gerar Carnê"
                                >
                                  <Icon.Carne />
                                </button>
                              </>
                            )}
                            <button
                              type="button"
                              onClick={(e) => handleExcluirInscricao(e, i.id)}
                              className="p-1.5 text-rose-500 active:scale-95 cursor-pointer print:hidden"
                            >
                              <Icon.Trash />
                            </button>
                          </div>
                        </div>
                      </div>
                      <p className="font-bold text-slate-800 dark:text-slate-100 leading-tight">{nome} {membroFound && <span className="ml-1 text-[8px] bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded border border-blue-100 dark:border-blue-800 font-black">MEMBRO</span>}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">{contato}</p>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* MODAL DETALHES DO INSCRITO */}
      {modalInscrito.aberto && (
        <div className="modal-overlay px-2 py-4">
          <div className="modal-box" style={{ maxWidth: 600 }}>
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center">
              <h3 className="font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight">Detalhes da Inscrição</h3>
              <button className="btn-icon" onClick={() => setModalInscrito({ aberto: false, dados: null })}><Icon.Close /></button>
            </div>
            <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
              {/* Resumo Financeiro da Inscrição (Apenas para eventos pagos) */}
              {!isGratuito && (() => {
                const dados = modalInscrito.dados.dados_inscricao || {};
                const valorTotal = extrairValorInscricao(dados, evento);
                const totalParc = Number(findInJsonGlobal(dados, 'parcelas')) || extrairParcelasInscricao(dados) || 1;
                const pagas = dados.parcelas_pagas || [];
                const valorParcela = totalParc > 0 ? (valorTotal / totalParc) : valorTotal;
                const valorPago = valorParcela * (modalInscrito.dados.status_pagamento === 'pago' ? totalParc : pagas.length);
                const saldoDevedor = Math.max(0, valorTotal - valorPago);

                return (
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-2xl flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Valor da Inscrição (Lote da Inscrição)</p>
                      <p className="text-xl font-black text-slate-800 dark:text-slate-100">
                        {valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        {totalParc > 1 && (
                          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-2">
                            ({totalParc}x de {valorParcela.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <p className="text-[9px] font-black text-emerald-600 uppercase tracking-wider">Total Pago</p>
                        <p className="text-sm font-extrabold text-emerald-600">{valorPago.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-rose-500 uppercase tracking-wider">Saldo Restante</p>
                        <p className="text-sm font-extrabold text-rose-500">{saldoDevedor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                      </div>
                    </div>
                  </div>
                );
              })()}

              <div className="grid grid-cols-2 gap-4">
                {Object.entries(modalInscrito.dados.dados_inscricao || {})
                  .filter(([label]) => !['parcelas_pagas', 'valor_total_numerico', 'valor_base_lote', 'valor_transporte', 'valor_parcela'].includes(label.toLowerCase()))
                  .map(([label, valor]) => {
                    const isPhone = ['telefone', 'celular', 'whatsapp', 'contato'].some(k => label.toLowerCase().includes(k));
                    const isCPF = label.toLowerCase().includes('cpf');
                    const valorFormatado = (isPhone && typeof valor === 'string')
                      ? mascaraTelefone(valor)
                      : (isCPF && typeof valor === 'string')
                        ? mascaraCPF(valor)
                        : (Array.isArray(valor) ? valor.join(', ') : String(valor));
                    return (
                      <div key={label} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700">
                        <p className="text-[10px] font-black text-slate-400 uppercase mb-1">{label}</p>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{valorFormatado}</p>
                      </div>
                    );
                  })}
              </div>

              {/* Vínculo com Membro */}
              {(() => {
                const membro = encontrarMembroDoInscrito(modalInscrito.dados);

                if (membro) {
                  return (
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 rounded-2xl flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">👤</div>
                        <div>
                          <p className="text-xs font-black text-blue-800 dark:text-blue-200 uppercase">Membro Identificado</p>
                          <p className="text-[11px] text-blue-600 dark:text-blue-400">
                            Vínculo com <strong className="font-bold">{membro.nome}</strong>. Dados demográficos ausentes foram sincronizados automaticamente do cadastro.
                          </p>
                        </div>
                      </div>
                      <button className="btn-primary shrink-0" style={{ fontSize: 11, padding: '6px 12px' }} onClick={() => onVerMembro(membro.id)}>Abrir Ficha ➔</button>
                    </div>
                  );
                }
                return null;
              })()}

              {/* Controle de Parcelas Manuais (Apenas para eventos pagos) */}
              {!isGratuito && (() => {
                const dados = modalInscrito.dados.dados_inscricao || {};
                const totalParc = Number(findInJsonGlobal(dados, 'parcelas')) || extrairParcelasInscricao(dados) || 1;
                if (totalParc <= 1) return null;

                const valorTotal = extrairValorInscricao(dados, evento);
                const pagas = dados.parcelas_pagas || [];
                const valorParcela = totalParc > 0 ? (valorTotal / totalParc) : valorTotal;
                const valorPago = valorParcela * (modalInscrito.dados.status_pagamento === 'pago' ? totalParc : pagas.length);
                const saldoDevedor = Math.max(0, valorTotal - valorPago);

                return (
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Controle de Parcelas</p>
                        <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300 mt-0.5">
                          {totalParc}x de R$ {valorParcela.toFixed(2)} (Total: R$ {valorTotal.toFixed(2)})
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-[10px] font-bold text-emerald-600">Pago: R$ {valorPago.toFixed(2)}</span>
                        <span className="text-[10px] font-bold text-rose-500">Saldo: R$ {saldoDevedor.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: totalParc }, (_, i) => i + 1).map(num => {
                        const isPago = modalInscrito.dados.status_pagamento === 'pago' || pagas.includes(num);
                        return (
                          <button key={num} onClick={() => handleToggleParcela(num)} className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${isPago ? 'bg-emerald-600 border-emerald-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-300'}`}>
                            {num}ª Parcela (R$ {valorParcela.toFixed(2)}) {isPago ? '✓' : ''}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  {isGratuito ? 'Alterar Status de Presença' : 'Alterar Status de Pagamento'}
                </p>
                <div className="flex gap-2">
                  <button onClick={() => handleUpdateStatus(modalInscrito.dados.id, 'pago')} className="flex-1 py-3 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-emerald-100 cursor-pointer">
                    {isGratuito ? 'Marcar Presente' : 'Confirmar Pagamento'}
                  </button>
                  <button onClick={() => handleUpdateStatus(modalInscrito.dados.id, 'pendente')} className="flex-1 py-3 bg-amber-500 text-white rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer">
                    {isGratuito ? 'Marcar Ausente' : 'Deixar Pendente'}
                  </button>
                  <button onClick={() => handleUpdateStatus(modalInscrito.dados.id, 'cancelado')} className="flex-1 py-3 bg-rose-600 text-white rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer">
                    Cancelar
                  </button>
                </div>
              </div>

              {!isGratuito && (
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Geração de Documentos</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setModalRecibo({ aberto: true, inscrito: modalInscrito.dados });
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-700/20 active:scale-95 transition cursor-pointer"
                  >
                    <Icon.Recibo /> Recibo Especial de Quitação
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const email = findInJsonGlobal(modalInscrito.dados.dados_inscricao, 'email');
                      const nome = findInJsonGlobal(modalInscrito.dados.dados_inscricao, 'nome') || findInJsonGlobal(modalInscrito.dados.dados_inscricao, 'completo') || 'Participante';
                      const membro = pessoas.find(p => (email && p.email?.toLowerCase() === email.toLowerCase()) || (nome && p.nome?.toLowerCase() === nome.toLowerCase()));
                      onGerarCarne({
                        inscricaoId: modalInscrito.dados.id,
                        pessoaId: membro?.id || null
                      });
                      setModalInscrito({ aberto: false, dados: null });
                    }}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-blue-100 active:scale-95 transition cursor-pointer"
                  >
                    <Icon.Carne /> Gerar Carnê do Inscrito
                  </button>
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE FILTRO DO GRÁFICO (TRANSPORTE / ZONA DE MORADIA) */}
      {modalFiltroGrafico.aberto && (
        <div className="modal-overlay px-2 py-4" style={{ zIndex: 150 }}>
          <div className="modal-box" style={{ maxWidth: 760 }}>
            <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-start gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                  <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    Filtro Aplicado
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {modalFiltroGrafico.tipo === 'transporte'
                      ? '🚌 Transporte'
                      : modalFiltroGrafico.tipo === 'faixa_etaria'
                        ? '🎂 Faixa Etária'
                        : modalFiltroGrafico.tipo === 'genero'
                          ? '⚧ Gênero'
                          : modalFiltroGrafico.tipo === 'estado_civil'
                            ? '💍 Estado Civil'
                            : '📍 Zona de Moradia'}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight">
                  {modalFiltroGrafico.titulo}
                </h3>
              </div>
              <button
                type="button"
                className="btn-icon"
                onClick={() => setModalFiltroGrafico({ aberto: false, titulo: '', tipo: '', chave: '', participantes: [] })}
              >
                <Icon.Close />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-6 overflow-y-auto max-h-[75vh]">
              {/* KPIs do Filtro */}
              {(() => {
                const lista = modalFiltroGrafico.participantes || [];
                const totalQtd = lista.length;
                const valorTotalFiltro = lista.reduce((acc, i) => acc + extrairValorInscricao(i.dados_inscricao, evento), 0);
                const pagosQtd = lista.filter(i => i.status_pagamento === 'pago').length;
                const pendentesQtd = lista.filter(i => i.status_pagamento === 'pendente').length;

                return (
                  <div className={`grid grid-cols-2 ${isGratuito ? 'sm:grid-cols-3' : 'sm:grid-cols-4'} gap-3`}>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700/80 rounded-2xl">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Quantidade</p>
                      <p className="text-xl font-black text-slate-800 dark:text-slate-100 mt-0.5">{totalQtd}</p>
                      <p className="text-[10px] text-slate-400 font-bold">{totalQtd === 1 ? 'participante' : 'participantes'}</p>
                    </div>
                    {!isGratuito && (
                    <div className="p-3 bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-2xl">
                      <p className="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider">Valor Total</p>
                      <p className="text-xl font-black text-blue-700 dark:text-blue-300 mt-0.5">
                        {valorTotalFiltro.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                      <p className="text-[10px] text-blue-500 font-bold">Lote da inscrição</p>
                    </div>
                    )}
                    <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl">
                      <p className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">{isGratuito ? 'Presentes' : 'Confirmados'}</p>
                      <p className="text-xl font-black text-emerald-700 dark:text-emerald-300 mt-0.5">{pagosQtd}</p>
                      <p className="text-[10px] text-emerald-600 font-bold">{isGratuito ? 'Presença confirmada' : 'Status Pago'}</p>
                    </div>
                    <div className="p-3 bg-amber-50/60 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 rounded-2xl">
                      <p className="text-[9px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider">{isGratuito ? 'Ausentes' : 'Pendentes'}</p>
                      <p className="text-xl font-black text-amber-700 dark:text-amber-300 mt-0.5">{pendentesQtd}</p>
                      <p className="text-[10px] text-amber-600 font-bold">{isGratuito ? 'Ainda não confirmou' : 'Aguardando baixa'}</p>
                    </div>
                  </div>
                );
              })()}

              {/* Controles de Busca e Abas de Status */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Buscar participante, telefone ou e-mail..."
                    value={buscaModal}
                    onChange={(e) => setBuscaModal(e.target.value)}
                    className="campo-input text-xs w-full pl-8"
                  />
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
                  {buscaModal && (
                    <button
                      type="button"
                      onClick={() => setBuscaModal('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shrink-0 overflow-x-auto">
                  {['todos', 'pago', 'pendente', 'cancelado'].map(st => {
                    const label = st === 'todos'
                      ? 'Todos'
                      : st === 'pago'
                        ? (isGratuito ? 'Presentes' : 'Pagos')
                        : st === 'pendente'
                          ? (isGratuito ? 'Ausentes' : 'Pendentes')
                          : 'Cancelados';
                    const ativo = filtroStatusModal === st;
                    return (
                      <button
                        type="button"
                        key={st}
                        onClick={() => setFiltroStatusModal(st)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition ${ativo ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Lista e Tabela de Participantes */}
              {(() => {
                const participantes = (modalFiltroGrafico.participantes || []).filter(i => {
                  if (filtroStatusModal !== 'todos' && i.status_pagamento !== filtroStatusModal) return false;
                  if (!buscaModal.trim()) return true;
                  const termo = buscaModal.toLowerCase().trim();
                  const nome = (findInJsonGlobal(i.dados_inscricao, ['nome', 'nome completo', 'completo']) || '').toLowerCase();
                  const tel = (findInJsonGlobal(i.dados_inscricao, ['telefone', 'celular', 'whatsapp', 'contato']) || '').toLowerCase();
                  const email = (findInJsonGlobal(i.dados_inscricao, 'email') || '').toLowerCase();
                  return nome.includes(termo) || tel.includes(termo) || email.includes(termo);
                });

                if (participantes.length === 0) {
                  return (
                    <div className="text-center py-12 text-slate-400 text-xs italic">
                      Nenhum participante encontrado para os filtros selecionados.
                    </div>
                  );
                }

                return (
                  <div>
                    {/* Tabela Desktop */}
                    <div className="hidden sm:block border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden">
                      <table className="ag-table w-full text-xs">
                        <thead>
                          <tr>
                            <th>Participante</th>
                            <th>Zona de Moradia</th>
                            {temTransporte && <th>Transporte</th>}
                            {!isGratuito && <th style={{ textAlign: 'right' }}>Valor</th>}
                            <th style={{ textAlign: 'center' }}>Status</th>
                            <th style={{ textAlign: 'right', paddingRight: '16px' }}>Ação</th>
                          </tr>
                        </thead>
                        <tbody>
                          {participantes.map(i => {
                            const dados = i.dados_inscricao || {};
                            const nome = findInJsonGlobal(dados, ['nome', 'nome completo', 'completo']) || 'Participante';
                            const email = findInJsonGlobal(dados, 'email');
                            const tel = findInJsonGlobal(dados, ['telefone', 'celular', 'whatsapp', 'contato']);
                            const contato = tel ? mascaraTelefone(tel) : (email || '—');
                            const membroFound = encontrarMembroDoInscrito(i);
                            const valorReal = extrairValorInscricao(dados, evento);
                            const totalParc = Number(findInJsonGlobal(dados, 'parcelas')) || extrairParcelasInscricao(dados) || 1;
                            const pagas = dados.parcelas_pagas || [];
                            const comTransp = findInJsonGlobal(dados, 'transporte')?.toString().toLowerCase().startsWith('sim');
                            const zonaNome = obterZonaParticipante(i);

                            return (
                              <tr key={i.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition">
                                <td>
                                  <div className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                                    <span>{nome}</span>
                                    {membroFound && (
                                      <span className="text-[8px] bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded border border-blue-100 dark:border-blue-800 font-black">
                                        MEMBRO
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[11px] text-slate-400 font-medium">{contato}</div>
                                </td>
                                <td className="text-slate-600 dark:text-slate-300 font-medium">
                                  {zonaNome}
                                </td>
                                {temTransporte && (
                                <td>
                                  {comTransp ? (
                                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-800">
                                      🚌 Sim
                                    </span>
                                  ) : (
                                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                                      🚶 Não
                                    </span>
                                  )}
                                </td>
                                )}
                                {!isGratuito && (
                                <td style={{ textAlign: 'right' }} className="font-black text-slate-800 dark:text-slate-100 whitespace-nowrap">
                                  {valorReal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                  {totalParc > 1 && (
                                    <div className="text-[10px] font-bold text-slate-400">
                                      {i.status_pagamento === 'pago' ? `${totalParc}/${totalParc}` : `${pagas.length}/${totalParc}`} Parc.
                                    </div>
                                  )}
                                </td>
                                )}
                                <td style={{ textAlign: 'center' }}>
                                  {i.status_pagamento === 'pago' ? (
                                    <span className="badge bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300">
                                      {isGratuito ? 'presente' : 'pago'}
                                    </span>
                                  ) : i.status_pagamento === 'cancelado' ? (
                                    <span className="badge bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300">cancelado</span>
                                  ) : (
                                    <span className="badge bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300">
                                      {isGratuito ? 'ausente' : 'pendente'}
                                    </span>
                                  )}
                                </td>
                                <td style={{ textAlign: 'right', paddingRight: '16px' }}>
                                  <button
                                    type="button"
                                    onClick={() => setModalInscrito({ aberto: true, dados: i })}
                                    className="btn-ghost"
                                    style={{ fontSize: 11, padding: '4px 10px' }}
                                  >
                                    Ver Ficha ➔
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Lista Mobile */}
                    <div className="sm:hidden divide-y divide-slate-100 dark:divide-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden">
                      {participantes.map(i => {
                        const dados = i.dados_inscricao || {};
                        const nome = findInJsonGlobal(dados, ['nome', 'nome completo', 'completo']) || 'Participante';
                        const email = findInJsonGlobal(dados, 'email');
                        const tel = findInJsonGlobal(dados, ['telefone', 'celular', 'whatsapp', 'contato']);
                        const contato = tel ? mascaraTelefone(tel) : (email || '—');
                        const membroFound = encontrarMembroDoInscrito(i);
                        const valorReal = extrairValorInscricao(dados, evento);
                        const totalParc = Number(findInJsonGlobal(dados, 'parcelas')) || extrairParcelasInscricao(dados) || 1;
                        const pagas = dados.parcelas_pagas || [];
                        const comTransp = findInJsonGlobal(dados, 'transporte')?.toString().toLowerCase().startsWith('sim');
                        const zonaNome = obterZonaParticipante(i);

                        return (
                          <div
                            key={i.id}
                            className="p-3.5 space-y-2 active:bg-slate-50 dark:active:bg-slate-800 transition"
                            onClick={() => setModalInscrito({ aberto: true, dados: i })}
                          >
                            <div className="flex justify-between items-start gap-2">
                              <div>
                                <p className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                                  {nome} {membroFound && <span className="ml-1 text-[8px] bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 px-1 py-0.5 rounded font-black">MEMBRO</span>}
                                </p>
                                <p className="text-[11px] text-slate-400">{contato}</p>
                              </div>
                              <div>
                                {i.status_pagamento === 'pago' ? (
                                  <span className="badge bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300">
                                    {isGratuito ? 'presente' : 'pago'}
                                  </span>
                                ) : i.status_pagamento === 'cancelado' ? (
                                  <span className="badge bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300">cancelado</span>
                                ) : (
                                  <span className="badge bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300">
                                    {isGratuito ? 'ausente' : 'pendente'}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-50 dark:border-slate-800/60">
                              <span className="truncate">📍 {zonaNome}</span>
                              {temTransporte && <span className="shrink-0">{comTransp ? '🚌 Com Transporte' : '🚶 Sem Transporte'}</span>}
                            </div>

                            <div className="flex items-center justify-between pt-1">
                              {!isGratuito ? (
                                <span className="text-xs font-black text-slate-800 dark:text-slate-200">
                                  {valorReal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                  {totalParc > 1 && (
                                    <span className="text-[10px] text-slate-400 ml-1 font-normal">
                                      ({pagas.length}/{totalParc}x)
                                    </span>
                                  )}
                                </span>
                              ) : (
                                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">Evento Gratuito</span>
                              )}
                              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                                Detalhes ➔
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setModalFiltroGrafico({ aberto: false, titulo: '', tipo: '', chave: '', participantes: [] })}
                className="btn-primary"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE EXPORTAÇÃO PERSONALIZADA (PDF / EXCEL / CSV) */}
      <ModalExportarInscritos
        aberto={modalExportarAberto}
        onFechar={() => setModalExportarAberto(false)}
        evento={evento}
        inscritos={inscritos}
        pessoas={pessoas}
        obterZonaParticipante={obterZonaParticipante}
        formatoInicial={formatoExportarInicial}
        modoTransporteInicial={incluirTransporteNoTotal ? 'com_transporte' : 'sem_transporte'}
      />

      {/* MODAL RECIBO ESPECIAL DE QUITAÇÃO (Apenas para eventos pagos) */}
      {!isGratuito && (
      <ModalReciboQuitacao
        aberto={modalRecibo.aberto}
        onFechar={() => setModalRecibo({ aberto: false, inscrito: null })}
        evento={evento}
        inscrito={modalRecibo.inscrito}
        pessoas={pessoas}
        obterZonaParticipante={obterZonaParticipante}
      />
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
  const [cobrarTransporte, setCobrarTransporte] = useState(Number(eventoParaEditar?.valor_transporte || 0) > 0);
  const [valorTransporte, setValorTransporte] = useState(eventoParaEditar?.valor_transporte || 0);
  const [formasDisponiveis, setFormasDisponiveis] = useState([]);
  const [formasPagamento, setFormasPagamento] = useState(eventoParaEditar?.formas_pagamento || []);
  const [programacao, setProgramacao] = useState(eventoParaEditar?.programacao || []);
  const [camposInscricao, setCamposInscricao] = useState(eventoParaEditar?.campos_inscricao || []);
  const [detalhes, setDetalhes] = useState(eventoParaEditar?.detalhes_ricos || '');
  const [localNome, setLocalNome] = useState(eventoParaEditar?.local_nome || '');
  const [localUrl, setLocalUrl] = useState(eventoParaEditar?.local_url || '');
  const [palestrantes, setPalestrantes] = useState(eventoParaEditar?.palestrantes || []);
  // Estados para o Modal de Nova Forma de Pagamento
  const [isModalNovaFormaAberta, setIsModalNovaFormaAberta] = useState(false);
  const [novaFormaNome, setNovaFormaNome] = useState('');
  const [novaFormaDesc, setNovaFormaDesc] = useState('');
  const [novaFormaIsCarne, setNovaFormaIsCarne] = useState(false);
  const [novaFormaMaxParcelas, setNovaFormaMaxParcelas] = useState(1);

  // Estados para Recorte de Fotos (Palestrantes)
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [mostrarCortador, setMostrarCortador] = useState(false);
  const [palestranteIdxEdicao, setPalestranteIdxEdicao] = useState(null);

  const canSave = useMemo(() => titulo.trim() !== '' && dataIni && dataFim, [titulo, dataIni, dataFim]);

  const carregarFormasDisponiveis = useCallback(async () => {
    const { data } = await supabase.from('formas_pagamento_disponiveis').select('*').order('nome');
    if (data) {
      setFormasDisponiveis(data);
    } else {
      setFormasDisponiveis([
        { nome: 'Em espécie', permite_parcelamento: false },
        { nome: 'Via Pix', permite_parcelamento: false },
        { nome: 'Cartão de crédito', permite_parcelamento: true, max_parcelas: 12 },
        { nome: 'Local do evento', permite_parcelamento: false }
      ]);
    }
  }, []);

  useEffect(() => {
    carregarFormasDisponiveis();
  }, [carregarFormasDisponiveis]);

  const onCropComplete = useCallback((_, pixels) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleAddNovaFormaGlobal = () => {
    setNovaFormaNome('');
    setNovaFormaDesc('');
    setNovaFormaIsCarne(false);
    setNovaFormaMaxParcelas(1);
    setIsModalNovaFormaAberta(true);
  };

  const handleSalvarNovaForma = async (e) => {
    e.preventDefault();
    if (!novaFormaNome.trim()) return;

    setEnviando(true);
    try {
      const { error } = await supabase.from('formas_pagamento_disponiveis').insert([{
        nome: novaFormaNome.trim(),
        descricao: novaFormaDesc.trim(),
        permite_parcelamento: novaFormaIsCarne,
        max_parcelas: novaFormaIsCarne ? novaFormaMaxParcelas : 1
      }]);

      if (error) throw error;

      await carregarFormasDisponiveis();
      setIsModalNovaFormaAberta(false);
    } catch (err) {
      alert("Erro ao criar forma de pagamento: " + err.message);
    } finally {
      setEnviando(false);
    }
  };

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
        valor_tipo: tipoValor, vagas: Number(vagas), valor: tipoValor === 'pago' ? Number(valor) : 0,
        valor_transporte: cobrarTransporte ? (Number(valorTransporte) || 0) : 0,
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

  const handleMoveCampoUp = (index) => {
    if (index === 0) return;
    const newCampos = [...camposInscricao];
    const [movedItem] = newCampos.splice(index, 1);
    newCampos.splice(index - 1, 0, movedItem);
    setCamposInscricao(newCampos);
  };

  const handleMoveCampoDown = (index) => {
    if (index === camposInscricao.length - 1) return;
    const newCampos = [...camposInscricao];
    const [movedItem] = newCampos.splice(index, 1);
    newCampos.splice(index + 1, 0, movedItem);
    setCamposInscricao(newCampos);
  };



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
              <div style={{ aspectRatio: '3/4', borderRadius: 12, border: '2px dashed var(--slate-300)', background: 'var(--slate-50)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }} className="group">
                {capaPreview
                  ? <img src={capaPreview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: 'var(--slate-500)' }}>
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
              <div style={{ borderTop: '1.5px solid var(--card-border)', paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="checkbox" checked={notifEmail} onChange={e => setNotifEmail(e.target.checked)} style={{ accentColor: 'var(--blue-900)', width: 15, height: 15 }} />
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--slate-700)' }}>Receber notificações por e-mail a cada inscrição</span>
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
            <div style={{ display: 'grid', gridTemplateColumns: tipoValor === 'pago' ? '1fr 1fr' : '1fr', gap: 14 }}>
              <InputField label="Quantidade de Vagas" type="number" value={vagas} onChange={setVagas} />
              {tipoValor === 'pago' && <InputField label="Valor Base (R$)" type="number" value={valor} onChange={setValor} placeholder="0,00" />}
            </div>

            {/* Opção de Ativar / Desativar Cobrança de Transporte (disponível para eventos gratuitos e pagos) */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-900/50 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                    <span>🚌</span> Cobrança de Transporte (Opcional)
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {cobrarTransporte
                      ? 'Ativado — o participante poderá optar pelo transporte na inscrição.'
                      : 'Desativado — nenhuma opção de transporte será exibida nos detalhes do evento.'}
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={cobrarTransporte}
                  onClick={() => {
                    const proximo = !cobrarTransporte;
                    setCobrarTransporte(proximo);
                    if (!proximo) setValorTransporte(0);
                  }}
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
                    cobrarTransporte ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                      cobrarTransporte ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              {cobrarTransporte && (
                <InputField
                  label="Valor do Transporte (R$)"
                  type="number"
                  value={valorTransporte}
                  onChange={setValorTransporte}
                  placeholder="0,00"
                />
              )}
            </div>
            {tipoValor === 'pago' && (
              <div style={{ background: 'var(--blue-50)', borderRadius: 12, border: '1.5px solid var(--blue-700)', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="campo-label" style={{ color: 'var(--blue-900)', marginBottom: 0 }}>Formas de Pagamento Aceitas</span>
                  <button type="button" onClick={handleAddNovaFormaGlobal} className="btn-ghost" style={{ fontSize: 10, padding: '4px 10px', color: 'var(--blue-900)', background: 'var(--white)' }}>
                    + Novo Tipo
                  </button>
                </div>

                {formasDisponiveis.map(f => {
                  const nomeForma = typeof f === 'object' ? f.nome : f;
                  return (
                    <div key={nomeForma} style={{ background: 'var(--white)', padding: '10px 12px', borderRadius: 10, border: '1px solid var(--card-border)' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                        <input type="checkbox" checked={formasPagamento.some(i => i.tipo === nomeForma)}
                          onChange={e => e.target.checked
                            ? setFormasPagamento([...formasPagamento, { tipo: nomeForma, instrucao: '', permite_parcelas: f.permite_parcelamento, max_parcelas: f.max_parcelas || 1 }])
                            : setFormasPagamento(formasPagamento.filter(x => x.tipo !== nomeForma))}
                          style={{ accentColor: 'var(--blue-900)', width: 14, height: 14 }} />
                        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--slate-900)' }}>
                          {nomeForma}
                          {f.permite_parcelamento && <span style={{ fontSize: 10, marginLeft: 6, opacity: 0.6 }}>(Carnê/Parcelado até {f.max_parcelas}x)</span>}
                        </span>
                      </label>
                      {formasPagamento.some(i => i.tipo === nomeForma) && (
                        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
                          {typeof f === 'object' && f.permite_parcelamento && (
                            <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase">Número Máximo de Parcelas para este Evento</label>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                                <input
                                  type="number"
                                  min="1"
                                  max="100"
                                  value={formasPagamento.find(x => x.tipo === nomeForma)?.max_parcelas || (typeof f === 'object' ? (f.max_parcelas || 1) : 1)}
                                  onChange={e => {
                                    const val = Math.max(1, parseInt(e.target.value) || 1);
                                    setFormasPagamento(formasPagamento.map(x => x.tipo === nomeForma ? { ...x, max_parcelas: val } : x));
                                  }}
                                  className="campo-input"
                                  style={{ width: '80px', padding: '6px 10px', fontSize: '13px' }}
                                />
                                <span className="text-xs text-slate-500 font-medium">parcelas</span>
                              </div>
                            </div>
                          )}

                          {nomeForma.toLowerCase().includes('cartão') ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                              <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase">URL da Plataforma (Link de Pagamento)</label>
                                <input
                                  type="url"
                                  placeholder="https://pagamento.com/seu-link"
                                  value={formasPagamento.find(x => x.tipo === nomeForma)?.link_pagamento || ''}
                                  onChange={e => setFormasPagamento(formasPagamento.map(x => x.tipo === nomeForma ? { ...x, link_pagamento: e.target.value } : x))}
                                  className="campo-input"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase">Instruções Adicionais</label>
                                <textarea
                                  placeholder="Ex: Após o pagamento, envie o comprovante..."
                                  value={formasPagamento.find(x => x.tipo === nomeForma)?.instrucao || ''}
                                  onChange={e => setFormasPagamento(formasPagamento.map(x => x.tipo === nomeForma ? { ...x, instrucao: e.target.value } : x))}
                                  className="campo-input"
                                  style={{ resize: 'none' }}
                                  rows="2"
                                />
                              </div>
                            </div>
                          ) : (
                            <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase">Instruções Adicionais</label>
                              <textarea
                                placeholder={`Instruções para ${nomeForma} (Ex: Chave Pix ou dados bancários)...`}
                                value={formasPagamento.find(x => x.tipo === nomeForma)?.instrucao || ''}
                                onChange={e => setFormasPagamento(formasPagamento.map(x => x.tipo === nomeForma ? { ...x, instrucao: e.target.value } : x))}
                                className="campo-input"
                                style={{ resize: 'none' }}
                                rows="2"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
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
              <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '1fr 130px 100px 34px', gap: 10, alignItems: 'end', background: 'var(--slate-50)', borderRadius: 10, padding: 12, border: '1.5px solid var(--card-border)' }}>
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
            {camposInscricao.map((c, idx) => ( // Changed to use map directly
              <div key={c.id} style={{ background: 'var(--slate-50)', border: '1.5px solid var(--card-border)', borderRadius: 12, padding: 16 }}>
                {/* linha superior: ordenação, nome, obrigatório, tipo, excluir */}
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 110px 160px auto', gap: 12, alignItems: 'end' }}>
                  {/* Controles de Ordenação */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 2 }}>
                    <button type="button" className="btn-icon" style={{ height: 22, width: 30, borderRadius: 6 }}
                      onClick={() => handleMoveCampoUp(idx)} disabled={idx === 0} title="Mover para cima"><Icon.ChevUp /></button>
                    <button type="button" className="btn-icon" style={{ height: 22, width: 30, borderRadius: 6 }}
                      onClick={() => handleMoveCampoDown(idx)} disabled={idx === camposInscricao.length - 1} title="Mover para baixo"><Icon.ChevDown /></button>
                  </div>

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
                      <span className="campo-label" style={{ color: 'var(--slate-500)' }}>Pré-visualização no formulário</span>
                      <input
                        type="text"
                        className="campo-input"
                        placeholder={c.nome || 'Campo de texto curto'}
                        readOnly
                        style={{ background: 'var(--white)', cursor: 'default', borderStyle: 'dashed' }}
                      />
                    </div>
                  )}

                  {tipoEhArea(c.tipo) && (
                    <div>
                      <span className="campo-label" style={{ color: 'var(--slate-500)' }}>Pré-visualização no formulário</span>
                      <textarea
                        className="campo-input"
                        placeholder={c.nome || 'Área de texto'}
                        readOnly rows={3}
                        style={{ background: 'var(--white)', cursor: 'default', borderStyle: 'dashed', resize: 'none' }}
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
              <div key={p.id} style={{ background: 'var(--slate-50)', border: '1.5px solid var(--card-border)', borderRadius: 14, padding: 16, display: 'flex', gap: 14, position: 'relative' }}>
                {/* foto */}
                <div style={{ width: 72, height: 72, borderRadius: 12, background: 'var(--slate-100)', flexShrink: 0, overflow: 'hidden', position: 'relative', border: '2px solid var(--card-border)' }}>
                  {p.preview
                    ? <img src={p.preview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', color: 'var(--slate-500)' }}><Icon.User /></div>
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
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-tight">Ajustar Foto do Palestrante</h3>
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
              <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                <button type="button" onClick={() => setMostrarCortador(false)} className="btn-ghost flex-1">Cancelar</button>
                <button type="button" onClick={criarImagemRecortada} className="btn-primary flex-1 justify-center">Confirmar Recorte</button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL CRIAR NOVA FORMA DE PAGAMENTO */}
        {isModalNovaFormaAberta && (
          <div className="modal-overlay px-2 py-4">
            <div className="modal-box" style={{ maxWidth: 450 }}>
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center">
                <div>
                  <h3 className="font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight text-sm">Nova Forma de Pagamento</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Configuração Global</p>
                </div>
                <button type="button" className="btn-icon" onClick={() => setIsModalNovaFormaAberta(false)}><Icon.Close /></button>
              </div>
              <form onSubmit={handleSalvarNovaForma} className="p-6 space-y-4">
                <InputField label="Nome da Forma" value={novaFormaNome} onChange={setNovaFormaNome} placeholder="Ex: Carnê, Boleto..." required />
                <Campo label="Tipo de Recebimento">
                  <div className="toggle-group">
                    <button type="button" className={`toggle-btn ${!novaFormaIsCarne ? 'active' : ''}`} onClick={() => setNovaFormaIsCarne(false)}>À Vista</button>
                    <button type="button" className={`toggle-btn ${novaFormaIsCarne ? 'active' : ''}`} onClick={() => setNovaFormaIsCarne(true)}>Carnê / Parcelado</button>
                  </div>
                </Campo>
                {novaFormaIsCarne && (
                  <InputField label="Máximo de Parcelas" type="number" value={novaFormaMaxParcelas} onChange={setNovaFormaMaxParcelas} />
                )}
                <InputField label="Descrição Interna" value={novaFormaDesc} onChange={setNovaFormaDesc} placeholder="Notas sobre esta forma..." />

                <div className="flex gap-2 pt-2">
                  <button type="button" className="btn-ghost flex-1" onClick={() => setIsModalNovaFormaAberta(false)}>Cancelar</button>
                  <button type="submit" disabled={enviando} className="btn-primary flex-1 justify-center">
                    {enviando ? 'Criando...' : 'Salvar Tipo'}
                  </button>
                </div>
              </form>
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
  const diasSemana = [
    { label: 'Seg', weekend: false },
    { label: 'Ter', weekend: false },
    { label: 'Qua', weekend: false },
    { label: 'Qui', weekend: false },
    { label: 'Sex', weekend: false },
    { label: 'Sáb', weekend: true },
    { label: 'Dom', weekend: true },
  ];

  const matriz = useMemo(() => {
    const ano = data.getFullYear();
    const mes = data.getMonth();
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    let start = primeiroDia.getDay();
    start = start === 0 ? 6 : start - 1;

    const celulas = [];
    // Dias finais do mês anterior para preencher a primeira semana
    for (let i = start - 1; i >= 0; i--) {
      celulas.push({ date: new Date(ano, mes, -i), outroMes: true });
    }
    // Dias do mês atual
    for (let d = 1; d <= ultimoDia.getDate(); d++) {
      celulas.push({ date: new Date(ano, mes, d), outroMes: false });
    }
    // Dias iniciais do próximo mês para fechar a última semana em múltiplos de 7
    const restante = (7 - (celulas.length % 7)) % 7;
    for (let d = 1; d <= restante; d++) {
      celulas.push({ date: new Date(ano, mes + 1, d), outroMes: true });
    }
    return celulas;
  }, [data]);

  const hoje = new Date();

  const extrairHoraEvento = (dataInicio) => {
    if (!dataInicio || !String(dataInicio).includes('T')) return '';
    const parteHora = String(dataInicio).split('T')[1];
    return parteHora ? parteHora.slice(0, 5) : '';
  };

  const formatarLocalDateTime = (diaDate) => {
    const y = diaDate.getFullYear();
    const m = String(diaDate.getMonth() + 1).padStart(2, '0');
    const d = String(diaDate.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}T19:00`;
  };

  return (
    <div className="agenda-root">
      {/* Cabeçalho dos dias da semana com alto contraste */}
      <div className="grid grid-cols-7 bg-slate-100/90 dark:bg-[#0f172a] border-b border-slate-200 dark:border-[#2b3954]">
        {diasSemana.map((d) => (
          <div
            key={d.label}
            className={`text-center py-2.5 text-[11px] font-black uppercase tracking-widest ${
              d.weekend
                ? 'text-blue-700 dark:text-blue-400'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            {d.label}
          </div>
        ))}
      </div>

      {/* Grade do calendário com divisórias nítidas e contraste elevado */}
      <div className="grid grid-cols-7 gap-px bg-slate-200 dark:bg-[#2b3954]">
        {matriz.map(({ date: dia, outroMes }, idx) => {
          const isFimDeSemana = idx % 7 === 5 || idx % 7 === 6;
          const isHoje =
            dia.getDate() === hoje.getDate() &&
            dia.getMonth() === hoje.getMonth() &&
            dia.getFullYear() === hoje.getFullYear();

          const eventosDia = eventos.filter((ev) => {
            if (!ev.data_inicio) return false;
            const [y, m, d] = ev.data_inicio.split('T')[0].split('-').map(Number);
            return y === dia.getFullYear() && m - 1 === dia.getMonth() && d === dia.getDate();
          });

          return (
            <div
              key={`${dia.getFullYear()}-${dia.getMonth()}-${dia.getDate()}`}
              onClick={() => podeEditar && onEditarEvento({ data_inicio: formatarLocalDateTime(dia) })}
              className={`group relative min-h-[88px] sm:min-h-[112px] p-1.5 sm:p-2 transition-colors flex flex-col ${
                podeEditar ? 'cursor-pointer' : 'cursor-default'
              } ${
                isHoje
                  ? 'bg-blue-50/90 dark:bg-blue-950/50 ring-2 ring-inset ring-blue-500/80 dark:ring-blue-400/80'
                  : outroMes
                    ? 'bg-slate-50/90 dark:bg-[#0b1222]/90'
                    : isFimDeSemana
                      ? 'bg-slate-50/70 dark:bg-[#0f182d] hover:bg-blue-50/40 dark:hover:bg-[#1c2b4a]/80'
                      : 'bg-white dark:bg-[#141f38] hover:bg-blue-50/40 dark:hover:bg-[#1c2b4a]/80'
              }`}
            >
              {/* Topo do dia: número + badge Hoje / botão + no hover */}
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span
                  className={
                    isHoje
                      ? 'w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-xs font-black flex items-center justify-center shadow-sm shadow-blue-500/40'
                      : `text-xs font-extrabold px-1 leading-6 ${
                          outroMes
                            ? 'text-slate-400/70 dark:text-slate-600'
                            : isFimDeSemana
                              ? 'text-blue-700 dark:text-blue-400'
                              : 'text-slate-700 dark:text-slate-200'
                        }`
                  }
                >
                  {dia.getDate()}
                </span>

                {isHoje ? (
                  <span className="hidden sm:inline-block text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-blue-600/15 dark:bg-blue-400/20 text-blue-700 dark:text-blue-300">
                    Hoje
                  </span>
                ) : podeEditar ? (
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs font-black leading-none">
                    +
                  </span>
                ) : null}
              </div>

              {/* Lista de eventos do dia com pílulas vibrantes */}
              <div className="flex flex-col gap-1 flex-1">
                {eventosDia.map((ev) => {
                  const hora = extrairHoraEvento(ev.data_inicio);
                  const cor = ev.cor || '#2563eb';
                  return (
                    <button
                      key={ev.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditarEvento(ev);
                      }}
                      style={{ backgroundColor: cor }}
                      className="w-full text-left px-1.5 sm:px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold text-white shadow-xs hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer truncate flex items-center gap-1 border border-white/15"
                      title={`${hora ? `${hora} • ` : ''}${ev.titulo}`}
                    >
                      {hora && (
                        <span className="hidden sm:inline text-[9px] font-black opacity-90 shrink-0 bg-black/20 px-1 rounded">
                          {hora}
                        </span>
                      )}
                      <span className="truncate">{ev.titulo}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Rodapé de legenda sutil */}
      <div className="px-4 py-2.5 bg-slate-50/90 dark:bg-[#0f172a] border-t border-slate-200/80 dark:border-[#2b3954] flex flex-wrap items-center justify-between gap-2 text-[10px] font-bold text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            Dia atual
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-blue-500/20 border border-blue-500/50" />
            Fim de semana
          </span>
        </div>
        {podeEditar && (
          <span className="text-slate-400 dark:text-slate-500">
            Clique em qualquer dia para agendar um evento
          </span>
        )}
      </div>
    </div>
  );
}