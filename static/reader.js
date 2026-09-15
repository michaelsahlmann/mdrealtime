(function() {
  'use strict';

  // Initialize Turndown for HTML-to-Markdown conversion
  let turndownService = null;
  if (typeof TurndownService !== 'undefined') {
    turndownService = new TurndownService({
      headingStyle: 'atx',
      hr: '---',
      bulletListMarker: '-',
      codeBlockStyle: 'fenced'
    });

    if (typeof turndownPluginGfm !== 'undefined' && turndownPluginGfm.gfm) {
      turndownService.use(turndownPluginGfm.gfm);
    }

    // Strip <mark> diff tags so they never pollute saved Markdown
    turndownService.addRule('stripMarks', {
      filter: ['mark'],
      replacement: function (content) { return content; }
    });
  }

  // Translations dictionary
  const I18N = {
    'es': {
      markRead: 'Marcar leído',
      markReadHint: 'Espacio',
      save: 'Guardar',
      settings: 'Ajustes',
      loading: 'Cargando...',
      connecting: 'Conectando...',
      upToDate: 'Al día',
      changeSingular: 'cambio',
      changePlural: 'cambios',
      lockedBadge: 'Bloqueado contra la IA',
      savedIndicator: 'Guardado',
      unsavedIndicator: 'Sin guardar',
      noDocs: 'Abre un archivo Markdown usando el botón <b>+</b>',
      openFilePrompt: 'Ruta absoluta del archivo Markdown a abrir:',
      toastEditing: 'Editando: Archivo protegido contra la IA',
      toastSaved: 'Guardado en disco. Desbloqueado para la IA.',
      toastRead: 'Marcado como leído. Base actualizada.',
      toastAiChanges: 'Cambios de la IA detectados en ',
      toastAiChangesTab: 'Cambios de la IA en ',
      toastAiDirtyWarning: 'Aviso: La IA actualizó el archivo mientras tenías cambios sin guardar',
      toastLockManualOn: 'Archivo bloqueado manualmente contra la IA',
      toastLockManualOff: 'Archivo desbloqueado para la IA',
      lblLang: 'Idioma y Diccionario',
      lblSpellcheck: 'Corrector ortográfico',
      lblFont: 'Tipografía',
      lblFontSize: 'Tamaño de letra',
      lblWidth: 'Ancho del documento',
      lblTheme: 'Tema visual',
      lblHighlight: 'Color de adiciones',
      lblAutosave: 'Autoguardado al editar',
      lblAutolock: 'Bloqueo automático anti-IA',
      themeDark: 'Oscuro',
      themeLight: 'Claro',
      themeSepia: 'Sepia',
      colorGreen: 'Verde',
      colorYellow: 'Amarillo',
      toastPathCopied: 'Ruta copiada para compartir con otras IA',
      wordSingular: 'palabra',
      wordPlural: 'palabras',
      lineSingular: 'línea',
      linePlural: 'líneas',
      toolChecklist: 'Tarea',
      toolBullet: 'Lista',
      toolOrdered: '1. Lista',
      toolQuote: 'Cita',
      toolCode: 'Código',
      toolHr: 'Línea',
      lastSavedAt: 'Último guardado a las',
      refreshTooltip: 'Recargar y sincronizar (Ctrl+R)',
      confirmDiscardRefresh: 'Tienes cambios sin guardar. ¿Deseas descartar y recargar?',
      toolUndo: 'Deshacer',
      toolRedo: 'Rehacer',
      undoAvailable: 'acciones para deshacer',
      toastUndo: 'Deshecho',
      toastRedo: 'Rehecho',
      closeApp: 'Cerrar',
      closeAppTooltip: 'Cerrar ventana (Ctrl+Q)',
      confirmDiscardClose: 'Tienes cambios sin guardar. ¿Deseas cerrar de todas formas?',
      placeholder: 'Escribe tu contenido aquí...'
    },
    'pt-BR': {
      markRead: 'Marcar como lido',
      markReadHint: 'Espaço',
      save: 'Salvar',
      settings: 'Configurações',
      loading: 'Carregando...',
      connecting: 'Conectando...',
      upToDate: 'Atualizado',
      changeSingular: 'alteração',
      changePlural: 'alterações',
      lockedBadge: 'Bloqueado contra a IA',
      savedIndicator: 'Salvo',
      unsavedIndicator: 'Não salvo',
      noDocs: 'Abra um arquivo Markdown usando o botão <b>+</b>',
      openFilePrompt: 'Caminho absoluto do arquivo Markdown a abrir:',
      toastEditing: 'Editando: Arquivo protegido contra a IA',
      toastSaved: 'Salvo no disco. Desbloqueado para a IA.',
      toastRead: 'Marcado como lido. Base sincronizada.',
      toastAiChanges: 'Alterações da IA detectadas em ',
      toastAiChangesTab: 'Alterações da IA em ',
      toastAiDirtyWarning: 'Aviso: A IA actualizou o arquivo enquanto você tinha alterações não salvas',
      toastLockManualOn: 'Arquivo bloqueado manualmente contra a IA',
      toastLockManualOff: 'Arquivo desbloqueado para a IA',
      lblLang: 'Idioma e Dicionário',
      lblSpellcheck: 'Corretor ortográfico',
      lblFont: 'Tipografia',
      lblFontSize: 'Tamanho da fonte',
      lblWidth: 'Largura do documento',
      lblTheme: 'Tema visual',
      lblHighlight: 'Cor das adições',
      lblAutosave: 'Salvamento automático ao editar',
      lblAutolock: 'Bloqueio automático anti-IA',
      themeDark: 'Escuro',
      themeLight: 'Claro',
      themeSepia: 'Sépia',
      colorGreen: 'Verde',
      colorYellow: 'Amarelo',
      toastPathCopied: 'Caminho copiado para compartilhar com outras IA',
      wordSingular: 'palavra',
      wordPlural: 'palavras',
      lineSingular: 'linha',
      linePlural: 'linhas',
      toolChecklist: 'Tarefa',
      toolBullet: 'Lista',
      toolOrdered: '1. Lista',
      toolQuote: 'Citação',
      toolCode: 'Código',
      toolHr: 'Linha',
      lastSavedAt: 'Salvo às',
      refreshTooltip: 'Recarregar e sincronizar (Ctrl+R)',
      confirmDiscardRefresh: 'Você tem alterações não salvas. Deseja descartar e recarregar?',
      toolUndo: 'Desfazer',
      toolRedo: 'Refazer',
      undoAvailable: 'ações para desfazer',
      toastUndo: 'Desfeito',
      toastRedo: 'Refeito',
      closeApp: 'Fechar',
      closeAppTooltip: 'Fechar janela (Ctrl+Q)',
      confirmDiscardClose: 'Você tem alterações não salvas. Deseja fechar mesmo assim?',
      placeholder: 'Comece a digitar aqui...'
    },
    'en-US': {
      markRead: 'Mark as read',
      markReadHint: 'Space',
      save: 'Save',
      settings: 'Settings',
      loading: 'Loading...',
      connecting: 'Connecting...',
      upToDate: 'Up to date',
      changeSingular: 'change',
      changePlural: 'changes',
      lockedBadge: 'Locked against AI',
      savedIndicator: 'Saved',
      unsavedIndicator: 'Unsaved',
      noDocs: 'Open a Markdown file using the <b>+</b> button',
      openFilePrompt: 'Absolute path of Markdown file to open:',
      toastEditing: 'Editing: File protected against AI',
      toastSaved: 'Saved to disk. Unlocked for AI.',
      toastRead: 'Marked as read. Baseline synced.',
      toastAiChanges: 'AI changes detected in ',
      toastAiChangesTab: 'AI changes in ',
      toastAiDirtyWarning: 'Warning: AI updated the file while you had unsaved changes',
      toastLockManualOn: 'File manually locked against AI',
      toastLockManualOff: 'File unlocked for AI',
      lblLang: 'Language & Dictionary',
      lblSpellcheck: 'Spellcheck',
      lblFont: 'Font Family',
      lblFontSize: 'Font Size',
      lblWidth: 'Document Width',
      lblTheme: 'Theme',
      lblHighlight: 'Highlight Color',
      lblAutosave: 'Autosave while editing',
      lblAutolock: 'Automatic anti-AI lock',
      themeDark: 'Dark',
      themeLight: 'Light',
      themeSepia: 'Sepia',
      colorGreen: 'Green',
      colorYellow: 'Yellow',
      toastPathCopied: 'Path copied to share with other AI',
      wordSingular: 'word',
      wordPlural: 'words',
      lineSingular: 'line',
      linePlural: 'lines',
      toolChecklist: 'Task',
      toolBullet: 'Bullet',
      toolOrdered: '1. List',
      toolQuote: 'Quote',
      toolCode: 'Code',
      toolHr: 'Divider',
      lastSavedAt: 'Last saved at',
      refreshTooltip: 'Reload and sync (Ctrl+R)',
      confirmDiscardRefresh: 'You have unsaved changes. Do you want to discard and reload?',
      toolUndo: 'Undo',
      toolRedo: 'Redo',
      undoAvailable: 'undo actions available',
      toastUndo: 'Undone',
      toastRedo: 'Redone',
      closeApp: 'Close',
      closeAppTooltip: 'Close window (Ctrl+Q)',
      confirmDiscardClose: 'You have unsaved changes. Do you want to close anyway?',
      placeholder: 'Start typing here...'
    }
  };

  // State
  // tabs[path] = { path, filename, baselineContent, currentContent, pendingCount, isDirty, isLocked }
  const tabs = {};
  let activePath = null;
  let sseSource = null;
  let autosaveTimer = null;

  // DOM Elements
  const tabBar = document.getElementById('tab-bar');
  const btnAddTab = document.getElementById('btn-add-tab');
  const docContainer = document.getElementById('markdown-content');
  const fileNameEl = document.getElementById('file-name');
  const pathChip = document.getElementById('path-chip');
  const pathChipText = document.getElementById('path-chip-text');
  const btnCopyChip = document.getElementById('btn-copy-chip');
  const copyChipIcon = document.getElementById('copy-chip-icon');
  const statusPill = document.getElementById('status-pill');
  const lockBadge = document.getElementById('lock-badge');
  const saveIndicator = document.getElementById('save-indicator');
  const saveTime = document.getElementById('save-time');
  const btnRefresh = document.getElementById('btn-refresh');
  const btnToolUndo = document.getElementById('tool-undo');
  const btnToolRedo = document.getElementById('tool-redo');
  const undoCounter = document.getElementById('undo-counter');
  const undoCounterNum = document.getElementById('undo-counter-num');
  const toolLabelUndo = document.getElementById('tool-label-undo');
  const markReadBtn = document.getElementById('btn-mark-read');
  const saveBtn = document.getElementById('btn-save');
  const settingsBtn = document.getElementById('btn-settings');
  const settingsMenu = document.getElementById('settings-menu');
  const btnCloseApp = document.getElementById('btn-close-app');
  const btnCloseAppText = document.getElementById('btn-close-app-text');
  const toastEl = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');

  // Preferences Elements
  const langSelect = document.getElementById('select-lang');
  const chkSpellcheck = document.getElementById('chk-spellcheck');
  const fontSelect = document.getElementById('select-font');
  const fontSizeSelect = document.getElementById('select-font-size');
  const widthSelect = document.getElementById('select-width');
  const themeBtns = document.querySelectorAll('.theme-btn');
  const colorBtns = document.querySelectorAll('.color-btn');
  const chkAutosave = document.getElementById('chk-autosave');
  const chkAutolock = document.getElementById('chk-autolock');

  // Labels for i18n
  const lblLang = document.getElementById('lbl-lang');
  const lblSpellcheck = document.getElementById('lbl-spellcheck');
  const lblFont = document.getElementById('lbl-font');
  const lblFontSize = document.getElementById('lbl-font-size');
  const lblWidth = document.getElementById('lbl-width');
  const lblTheme = document.getElementById('lbl-theme');
  const lblHighlight = document.getElementById('lbl-highlight');
  const lblAutosave = document.getElementById('lbl-autosave');
  const lblAutolock = document.getElementById('lbl-autolock');
  const btnThemeDark = document.getElementById('btn-theme-dark');
  const btnThemeLight = document.getElementById('btn-theme-light');
  const btnThemeSepia = document.getElementById('btn-theme-sepia');
  const btnColorGreen = document.getElementById('btn-color-green');
  const btnColorYellow = document.getElementById('btn-color-yellow');

  const prefs = {
    lang: localStorage.getItem('ai_md_lang') || 'es',
    spellcheck: localStorage.getItem('ai_md_spellcheck') !== 'false',
    font: localStorage.getItem('ai_md_font') || 'Literata',
    fontSize: localStorage.getItem('ai_md_font_size') || '18px',
    width: localStorage.getItem('ai_md_width') || '820px',
    theme: localStorage.getItem('ai_md_theme') || 'dark',
    highlightColor: localStorage.getItem('ai_md_highlight_color') || 'green',
    autosave: localStorage.getItem('ai_md_autosave') === 'true',
    autolock: localStorage.getItem('ai_md_autolock') !== 'false'
  };

  function t(key) {
    const langObj = I18N[prefs.lang] || I18N['es'];
    return langObj[key] || I18N['es'][key] || key;
  }

  // Live Document Word & Line Stats
  function updateDocumentStats() {
    const statsEl = document.getElementById('doc-stats');
    if (!statsEl) return;
    if (!activePath || !tabs[activePath]) {
      statsEl.textContent = `0 ${t('wordPlural')} • 0 ${t('linePlural')}`;
      return;
    }

    const text = docContainer ? docContainer.innerText : (tabs[activePath].currentContent || '');
    const cleanText = text.trim();

    const words = cleanText.length > 0 ? cleanText.split(/\s+/).filter(Boolean).length : 0;
    const lines = cleanText.length > 0 ? text.split(/\r\n|\r|\n/).length : 0;

    const wordLabel = words === 1 ? t('wordSingular') : t('wordPlural');
    const lineLabel = lines === 1 ? t('lineSingular') : t('linePlural');

    statsEl.textContent = `${words.toLocaleString()} ${wordLabel} • ${lines.toLocaleString()} ${lineLabel}`;
  }

  // Undo / Redo History Stack Engine
  let historyTimer = null;

  function recordHistorySnapshot(immediate = false) {
    if (!activePath || !tabs[activePath]) return;
    const tab = tabs[activePath];
    if (!tab.history) tab.history = [];
    if (tab.historyIndex === undefined || tab.historyIndex === null) tab.historyIndex = -1;

    const save = () => {
      const html = docContainer.innerHTML;
      if (tab.history.length > 0 && tab.history[tab.historyIndex] === html) {
        return;
      }
      // Truncate any redo steps ahead of current index
      tab.history = tab.history.slice(0, tab.historyIndex + 1);
      tab.history.push(html);
      if (tab.history.length > 50) {
        tab.history.shift();
      }
      tab.historyIndex = tab.history.length - 1;
      updateUndoRedoUI();
    };

    if (immediate) {
      clearTimeout(historyTimer);
      save();
    } else {
      clearTimeout(historyTimer);
      historyTimer = setTimeout(save, 400);
    }
  }

  function updateUndoRedoUI() {
    if (!btnToolUndo || !btnToolRedo) return;
    if (!activePath || !tabs[activePath]) {
      btnToolUndo.disabled = true;
      btnToolRedo.disabled = true;
      if (undoCounter) {
        undoCounter.style.display = 'none';
        if (undoCounterNum) undoCounterNum.textContent = '0';
      }
      return;
    }
    const tab = tabs[activePath];
    const undoCount = (tab.history && tab.historyIndex > 0) ? tab.historyIndex : 0;
    const redoCount = (tab.history && tab.historyIndex < tab.history.length - 1) ? (tab.history.length - 1 - tab.historyIndex) : 0;

    btnToolUndo.disabled = (undoCount === 0);
    btnToolRedo.disabled = (redoCount === 0);

    if (undoCounter) {
      if (undoCount > 0) {
        if (undoCounterNum) {
          undoCounterNum.textContent = undoCount;
        } else {
          undoCounter.textContent = undoCount;
        }
        undoCounter.style.display = 'inline-flex';
        btnToolUndo.title = `${t('toolUndo')} (Ctrl+Z) • ${undoCount} ${t('undoAvailable')}`;
      } else {
        if (undoCounterNum) {
          undoCounterNum.textContent = '0';
        } else {
          undoCounter.textContent = '0';
        }
        undoCounter.style.display = 'none';
        btnToolUndo.title = `${t('toolUndo')} (Ctrl+Z)`;
      }
    }

    btnToolRedo.title = redoCount > 0 ? `${t('toolRedo')} (Ctrl+Y) • ${redoCount}` : `${t('toolRedo')} (Ctrl+Y)`;
  }

  function handleUndo() {
    if (!activePath || !tabs[activePath]) return;
    const tab = tabs[activePath];
    if (!tab.history || tab.historyIndex <= 0) return;

    clearTimeout(historyTimer);
    tab.historyIndex--;
    docContainer.innerHTML = tab.history[tab.historyIndex];
    updateEmptyState();

    tab.isDirty = true;
    updateSaveIndicator();
    renderTabBar();
    updateDocumentStats();
    updateUndoRedoUI();
    showToast(t('toastUndo'));
  }

  function handleRedo() {
    if (!activePath || !tabs[activePath]) return;
    const tab = tabs[activePath];
    if (!tab.history || tab.historyIndex >= tab.history.length - 1) return;

    clearTimeout(historyTimer);
    tab.historyIndex++;
    docContainer.innerHTML = tab.history[tab.historyIndex];
    updateEmptyState();

    tab.isDirty = true;
    updateSaveIndicator();
    renderTabBar();
    updateDocumentStats();
    updateUndoRedoUI();
    showToast(t('toastRedo'));
  }

  function updateUILanguage() {
    document.documentElement.lang = prefs.lang;
    docContainer.setAttribute('lang', prefs.lang);
    docContainer.setAttribute('spellcheck', prefs.spellcheck ? 'true' : 'false');

    if (langSelect) langSelect.value = prefs.lang;
    if (chkSpellcheck) chkSpellcheck.checked = prefs.spellcheck;

    if (lblLang) lblLang.textContent = t('lblLang');
    if (lblSpellcheck) lblSpellcheck.textContent = t('lblSpellcheck');
    if (lblFont) lblFont.textContent = t('lblFont');
    if (lblFontSize) lblFontSize.textContent = t('lblFontSize');
    if (lblWidth) lblWidth.textContent = t('lblWidth');
    if (lblTheme) lblTheme.textContent = t('lblTheme');
    if (lblHighlight) lblHighlight.textContent = t('lblHighlight');
    if (lblAutosave) lblAutosave.textContent = t('lblAutosave');
    if (lblAutolock) lblAutolock.textContent = t('lblAutolock');

    if (btnThemeDark) btnThemeDark.textContent = t('themeDark');
    if (btnThemeLight) btnThemeLight.textContent = t('themeLight');
    if (btnThemeSepia) btnThemeSepia.textContent = t('themeSepia');
    if (btnColorGreen) btnColorGreen.textContent = t('colorGreen');
    if (btnColorYellow) btnColorYellow.textContent = t('colorYellow');

    const saveSpan = document.getElementById('btn-save-text');
    if (saveSpan) saveSpan.textContent = t('save');

    const settingsSpan = document.getElementById('btn-settings-text');
    if (settingsSpan) settingsSpan.textContent = t('settings');

    const markReadSpan = document.getElementById('btn-mark-read-text');
    if (markReadSpan) markReadSpan.textContent = t('markRead');
    if (markReadBtn) {
      const hint = markReadBtn.querySelector('.kbd-hint');
      if (hint) hint.textContent = t('markReadHint');
    }

    const lockBadgeText = document.getElementById('lock-badge-text');
    if (lockBadgeText) lockBadgeText.textContent = t('lockedBadge');

    const toolChecklist = document.getElementById('tool-label-checklist');
    if (toolChecklist) toolChecklist.textContent = t('toolChecklist');
    const toolBullet = document.getElementById('tool-label-bullet');
    if (toolBullet) toolBullet.textContent = t('toolBullet');
    const toolOrdered = document.getElementById('tool-label-ordered');
    if (toolOrdered) toolOrdered.textContent = t('toolOrdered');
    const toolQuote = document.getElementById('tool-label-quote');
    if (toolQuote) toolQuote.textContent = t('toolQuote');
    const toolCode = document.getElementById('tool-label-code');
    if (toolCode) toolCode.textContent = t('toolCode');
    const toolHr = document.getElementById('tool-label-hr');
    if (toolHr) toolHr.textContent = t('toolHr');

    if (toolLabelUndo) toolLabelUndo.textContent = t('toolUndo');
    if (btnRefresh) btnRefresh.title = t('refreshTooltip');
    if (btnCloseAppText) btnCloseAppText.textContent = t('closeApp');
    if (btnCloseApp) btnCloseApp.title = t('closeAppTooltip');

    updateSaveIndicator();
    updateDocumentStats();
    updateUndoRedoUI();
  }

  function applyPreferences() {
    document.documentElement.setAttribute('data-theme', prefs.theme);
    document.documentElement.setAttribute('data-highlight-color', prefs.highlightColor);
    document.documentElement.style.setProperty('--font-family', prefs.font === 'Literata' ? "'Literata', Georgia, serif" : prefs.font);
    document.documentElement.style.setProperty('--font-size', prefs.fontSize);
    document.documentElement.style.setProperty('--max-width', prefs.width);

    if (fontSelect) fontSelect.value = prefs.font;
    if (fontSizeSelect) fontSizeSelect.value = prefs.fontSize;
    if (widthSelect) widthSelect.value = prefs.width;
    if (chkAutosave) chkAutosave.checked = prefs.autosave;
    if (chkAutolock) chkAutolock.checked = prefs.autolock;

    themeBtns.forEach(b => b.classList.toggle('active', b.dataset.theme === prefs.theme));
    colorBtns.forEach(b => b.classList.toggle('active', b.dataset.color === prefs.highlightColor));

    updateUILanguage();
  }

  function savePref(key, val) {
    prefs[key] = val;
    localStorage.setItem('ai_md_' + key.replace(/([A-Z])/g, '_').toLowerCase(), val);
    applyPreferences();
  }

  // Toast System
  let toastTimer = null;
  function showToast(msg) {
    if (!toastEl) return;
    toastMsg.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2600);
  }

  // Smart Markdown Diff Rendering
  function renderMarkdownWithDiff(baseText, newText) {
    if (!newText || newText.trim() === '') {
      return { html: '<p><br></p>', count: 0 };
    }
    if (!baseText || baseText === newText || typeof Diff === 'undefined' || typeof marked === 'undefined') {
      const parsed = typeof marked !== 'undefined' ? marked.parse(newText || '') : newText;
      return { html: parsed && parsed.trim() ? parsed : '<p><br></p>', count: 0 };
    }

    const diff = Diff.diffLines(baseText, newText);
    let result = '';
    let inCodeBlock = false;
    let addedChunks = 0;

    for (const part of diff) {
      if (part.added) {
        addedChunks++;
        const lines = part.value.split('\n');
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];

          // Track and preserve raw fenced code blocks
          if (line.trim().startsWith('```') || line.trim().startsWith('~~~')) {
            result += line;
            inCodeBlock = !inCodeBlock;
          } else if (inCodeBlock) {
            result += line;
          } else if (line.trim().length === 0) {
            result += line;
          } else {
            // Check for block-level markdown prefixes: headings, quotes, lists, checklists
            const prefixMatch = line.match(/^(\s*(?:#{1,6}\s+|>\s*|[-*+]\s+(?:\[[ xX]\]\s+)?|\d+\.\s+)+)/);
            if (prefixMatch) {
              const prefix = prefixMatch[0];
              const content = line.slice(prefix.length);
              result += prefix + (content ? ('<mark class="ai-diff-added">' + content + '</mark>') : '');
            } else {
              result += '<mark class="ai-diff-added">' + line + '</mark>';
            }
          }
          if (i < lines.length - 1) result += '\n';
        }
      } else if (!part.removed) {
        const lines = part.value.split('\n');
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].trim().startsWith('```') || lines[i].trim().startsWith('~~~')) {
            inCodeBlock = !inCodeBlock;
          }
        }
        result += part.value;
      }
    }

    return { html: marked.parse(result), count: addedChunks };
  }

  // Tab System
  function renderTabBar() {
    const existingTabEls = tabBar.querySelectorAll('.tab');
    existingTabEls.forEach(el => el.remove());

    Object.keys(tabs).forEach(path => {
      const tabData = tabs[path];
      const tabEl = document.createElement('div');
      tabEl.className = 'tab ' + (path === activePath ? 'active' : '');

      const titleSpan = document.createElement('span');
      titleSpan.className = 'tab-title';
      titleSpan.textContent = tabData.filename;
      tabEl.appendChild(titleSpan);

      if (tabData.isDirty) {
        const dot = document.createElement('span');
        dot.className = 'tab-dot-dirty';
        dot.title = 'Cambios sin guardar';
        tabEl.appendChild(dot);
      }

      if (tabData.pendingCount > 0) {
        const badge = document.createElement('span');
        badge.className = 'tab-badge';
        badge.textContent = tabData.pendingCount;
        tabEl.appendChild(badge);
      }

      if (Object.keys(tabs).length > 1) {
        const closeSpan = document.createElement('span');
        closeSpan.className = 'tab-close';
        closeSpan.innerHTML = '&times;';
        closeSpan.title = 'Cerrar pestaña (Ctrl+W)';
        closeSpan.addEventListener('click', (e) => {
          e.stopPropagation();
          closeTab(path);
        });
        tabEl.appendChild(closeSpan);
      }

      tabEl.addEventListener('click', () => switchTab(path));
      tabBar.insertBefore(tabEl, btnAddTab);
    });
  }

  function switchTab(path) {
    if (!tabs[path]) return;

    activePath = path;
    localStorage.setItem('ai_md_active_tab', path);
    const tabData = tabs[path];

    fileNameEl.textContent = tabData.filename;
    document.title = tabData.filename + ' - MDRealtime';

    if (pathChipText) {
      pathChipText.textContent = path;
      pathChip.title = path + ' (Clic para copiar ruta)';
    }

    // Update lock badge for this tab
    lockBadge.style.display = tabData.isLocked ? 'inline-flex' : 'none';

    renderTabBar();
    renderActiveDocument(false);
    updateUndoRedoUI();
  }

  function closeTab(path) {
    if (tabs[path] && tabs[path].isLocked) {
      setFileLock(path, false);
    }

    fetch('/api/close', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path })
    }).catch(() => {});

    delete tabs[path];
    const remaining = Object.keys(tabs);
    if (remaining.length > 0) {
      switchTab(remaining[remaining.length - 1]);
    } else {
      fileNameEl.textContent = 'Sin documentos';
      if (pathChipText) pathChipText.textContent = '---';
      docContainer.innerHTML = '<p style="text-align: center; color: var(--text-muted); margin-top: 50px;">Abre un archivo Markdown usando el botón <b>+</b></p>';
      activePath = null;
      localStorage.removeItem('ai_md_active_tab');
      renderTabBar();
      updateSaveIndicator();
      updateDocumentStats();
    }
  }

  function addOrSwitchTab(path, filename, content) {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (!tabs[path]) {
      tabs[path] = {
        path,
        filename,
        baselineContent: content,
        currentContent: content,
        pendingCount: 0,
        isDirty: false,
        isLocked: false,
        lastSavedTime: timeStr
      };
    } else {
      tabs[path].currentContent = content;
      if (!tabs[path].lastSavedTime) {
        tabs[path].lastSavedTime = timeStr;
      }
    }

    const savedTab = localStorage.getItem('ai_md_active_tab');
    if (savedTab && tabs[savedTab]) {
      switchTab(savedTab);
    } else {
      switchTab(path);
    }
  }

  // Handle empty document state & placeholder
  function updateEmptyState() {
    if (!docContainer) return;
    const text = docContainer.innerText.replace(/\n/g, '').trim();
    const hasElements = docContainer.querySelector('img, hr, table, pre, code, ul, ol, blockquote, h1, h2, h3, h4, h5, h6');
    if (!text && !hasElements) {
      docContainer.classList.add('is-empty');
      docContainer.setAttribute('data-placeholder', t('placeholder'));
      if (!docContainer.innerHTML || docContainer.innerHTML.trim() === '' || docContainer.innerHTML === '<br>') {
        docContainer.innerHTML = '<p><br></p>';
      }
    } else {
      docContainer.classList.remove('is-empty');
      docContainer.removeAttribute('data-placeholder');
    }
  }

  // Render Document View (Always Visual & Directly Editable)
  function renderActiveDocument(preserveScroll = true) {
    if (!activePath || !tabs[activePath]) return;
    const tab = tabs[activePath];

    const scrollRatio = window.scrollY / (document.body.scrollHeight || 1);
    const result = renderMarkdownWithDiff(tab.baselineContent, tab.currentContent);

    docContainer.innerHTML = (result.html && result.html.trim()) ? result.html : '<p><br></p>';
    tab.pendingCount = result.count;
    updateEmptyState();

    // Enable interactive checkboxes rendered by marked
    docContainer.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.removeAttribute('disabled');
      cb.setAttribute('contenteditable', 'false');
      if (cb.parentElement && cb.parentElement.tagName === 'LI') {
        cb.parentElement.classList.add('task-list-item');
      }
    });

    if (preserveScroll) {
      window.scrollTo({
        top: scrollRatio * document.body.scrollHeight,
        behavior: 'instant'
      });
    }

    // Status Pill
    if (tab.pendingCount > 0) {
      const word = tab.pendingCount > 1 ? t('changePlural') : t('changeSingular');
      statusPill.innerHTML = '<span class="pill-dot"></span> <b>' + tab.pendingCount + '</b> ' + word;
      statusPill.classList.add('has-changes');
      markReadBtn.style.display = 'inline-flex';
    } else {
      statusPill.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> <span>' + t('upToDate') + '</span>';
      statusPill.classList.remove('has-changes');
      markReadBtn.style.display = 'none';
    }

    if (!tab.history || tab.history.length === 0) {
      tab.history = [docContainer.innerHTML];
      tab.historyIndex = 0;
    } else if (tab.history[tab.historyIndex] !== docContainer.innerHTML) {
      tab.history = tab.history.slice(0, tab.historyIndex + 1);
      tab.history.push(docContainer.innerHTML);
      if (tab.history.length > 50) tab.history.shift();
      tab.historyIndex = tab.history.length - 1;
    }

    updateSaveIndicator();
    renderTabBar();
    updateDocumentStats();
    updateUndoRedoUI();
  }

  const SAVE_CHECK_SVG = '<svg class="save-check-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
  const SAVE_DIRTY_SVG = '<svg class="save-check-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5"/></svg>';

  function updateSaveIndicator() {
    const saveText = document.getElementById('save-indicator-text');
    const saveTime = document.getElementById('save-time');
    const lockText = document.getElementById('lock-badge-text');
    const saveIcon = saveIndicator ? saveIndicator.querySelector('svg') : null;

    if (!activePath || !tabs[activePath]) {
      if (saveIndicator) {
        saveIndicator.className = 'save-indicator saved';
        saveIndicator.title = t('savedIndicator');
      }
      if (saveText) saveText.textContent = t('savedIndicator');
      if (saveTime) {
        saveTime.textContent = '';
        saveTime.style.display = 'none';
      }
      if (saveIcon) saveIcon.outerHTML = SAVE_CHECK_SVG;
      if (saveBtn) saveBtn.style.display = 'none';
      if (lockBadge) lockBadge.style.display = 'none';
      return;
    }
    const tab = tabs[activePath];

    if (tab.isDirty) {
      if (saveIndicator) {
        saveIndicator.className = 'save-indicator dirty';
        saveIndicator.title = tab.lastSavedTime ? (t('unsavedIndicator') + ' (' + t('lastSavedAt') + ' ' + tab.lastSavedTime + ')') : t('unsavedIndicator');
      }
      if (saveText) saveText.textContent = t('unsavedIndicator');
      if (saveTime) {
        saveTime.textContent = '';
        saveTime.style.display = 'none';
      }
      if (saveIcon) saveIcon.outerHTML = SAVE_DIRTY_SVG;
      if (saveBtn) saveBtn.style.display = 'inline-flex';
    } else {
      if (saveIndicator) {
        saveIndicator.className = 'save-indicator saved';
        saveIndicator.title = tab.lastSavedTime ? (t('lastSavedAt') + ' ' + tab.lastSavedTime) : t('savedIndicator');
      }
      if (saveText) saveText.textContent = t('savedIndicator');
      if (saveTime) {
        if (tab.lastSavedTime) {
          saveTime.textContent = tab.lastSavedTime;
          saveTime.style.display = 'inline';
        } else {
          saveTime.textContent = '';
          saveTime.style.display = 'none';
        }
      }
      if (saveIcon) saveIcon.outerHTML = SAVE_CHECK_SVG;
      if (saveBtn) saveBtn.style.display = 'none';
    }

    if (lockText) lockText.textContent = t('lockedBadge');
    if (lockBadge) lockBadge.style.display = tab.isLocked ? 'inline-flex' : 'none';
  }

  // Mark Read / Clear Highlights
  function markAsRead() {
    if (!activePath || !tabs[activePath]) return;
    const tab = tabs[activePath];

    // Safety guard: if user has unsaved edits, saving them is the safest and cleanest action
    if (tab.isDirty) {
      saveCurrentDocument();
      return;
    }

    const marks = docContainer.querySelectorAll('mark.ai-diff-added');
    marks.forEach(m => m.classList.add('ai-diff-cleared'));

    setTimeout(() => {
      tab.baselineContent = tab.currentContent;
      tab.pendingCount = 0;
      renderActiveDocument();
      showToast(t('toastRead'));
    }, 180);
  }

  // File Lock API (Protection against rogue AI overwrites)
  function setFileLock(path, lock) {
    if (!path || !tabs[path]) return;
    fetch(lock ? '/api/lock' : '/api/unlock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path })
    })
    .then(r => r.json())
    .then(d => {
      if (d.status === 'ok') {
        tabs[path].isLocked = lock;
        if (path === activePath) {
          lockBadge.style.display = lock ? 'inline-flex' : 'none';
        }
      }
    })
    .catch(() => {});
  }

  // Direct In-Place Visual Input Listener
  docContainer.addEventListener('input', () => {
    if (!activePath || !tabs[activePath]) return;
    const tab = tabs[activePath];

    updateEmptyState();
    tab.isDirty = true;
    updateSaveIndicator();
    renderTabBar();
    updateDocumentStats();
    recordHistorySnapshot(false);

    // Auto-lock against AI on first edit keystroke
    if (prefs.autolock && !tab.isLocked) {
      setFileLock(activePath, true);
      showToast(t('toastEditing'));
    }

    // Optional autosave with debounce
    if (prefs.autosave) {
      clearTimeout(autosaveTimer);
      autosaveTimer = setTimeout(() => {
        if (tab.isDirty) saveCurrentDocument();
      }, 1500);
    }
  });

  // Save Document Function: Serializes Visual DOM -> Markdown, saves to disk, and unlocks AI
  function saveCurrentDocument() {
    if (!activePath || !tabs[activePath] || !turndownService) return;
    const tab = tabs[activePath];

    // Ensure all checkboxes in docContainer have their HTML 'checked' attribute in sync
    docContainer.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      if (cb.checked) {
        cb.setAttribute('checked', 'checked');
      } else {
        cb.removeAttribute('checked');
      }
    });

    // Safely unwrap any <mark> tags so inner content is 100% preserved
    let htmlContent = docContainer.innerHTML;
    htmlContent = htmlContent.replace(/<\/?mark[^>]*>/gi, '');
    const newMarkdown = turndownService.turndown(htmlContent);

    fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: activePath, content: newMarkdown })
    })
    .then(r => r.json())
    .then(data => {
      if (data.status === 'ok') {
        tab.currentContent = newMarkdown;
        tab.baselineContent = newMarkdown; // User's own edits become the new baseline
        tab.pendingCount = 0;
        tab.isDirty = false;
        tab.isLocked = false;
        tab.lastSavedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Visually unwrap any leftover <mark> tags in the live DOM
        const marks = docContainer.querySelectorAll('mark.ai-diff-added');
        marks.forEach(m => {
          const parent = m.parentNode;
          if (parent) {
            while (m.firstChild) parent.insertBefore(m.firstChild, m);
            parent.removeChild(m);
          }
        });

        // Hide "Marcar como leído" and update status pill to "Al día"
        if (markReadBtn) markReadBtn.style.display = 'none';
        if (statusPill) {
          statusPill.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> <span>' + t('upToDate') + '</span>';
          statusPill.classList.remove('has-changes');
        }

        updateSaveIndicator();
        renderTabBar();
        showToast(t('toastSaved'));
      } else {
        showToast('Error al guardar: ' + (data.error || 'Desconocido'));
      }
    })
    .catch(err => {
      showToast('Error de conexión al guardar: ' + err);
    });
  }

  // Plus Button (Open File)
  btnAddTab.addEventListener('click', () => {
    const inputPath = prompt(t('openFilePrompt'));
    if (inputPath && inputPath.trim()) {
      fetch('/api/open', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: inputPath.trim() })
      })
      .then(r => r.json())
      .then(data => {
        if (data.status !== 'ok') showToast(data.error || 'No se pudo abrir');
      });
    }
  });

  // Drag and drop Markdown files
  window.addEventListener('dragover', (e) => e.preventDefault());
  window.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.path) {
        fetch('/api/open', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path: file.path })
        });
      }
    }
  });

  // Toggle lock manually by clicking lock badge
  lockBadge.addEventListener('click', () => {
    if (!activePath || !tabs[activePath]) return;
    const tab = tabs[activePath];
    const newLockState = !tab.isLocked;
    setFileLock(activePath, newLockState);
    showToast(newLockState ? t('toastLockManualOn') : t('toastLockManualOff'));
  });

  const CLIPBOARD_SVG = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>';
  const CHECK_SVG = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  // Copy active file path to clipboard (for sharing with other AIs)
  function copyActivePath() {
    if (!activePath) return;
    navigator.clipboard.writeText(activePath).then(() => {
      if (copyChipIcon) {
        copyChipIcon.innerHTML = CHECK_SVG;
        copyChipIcon.style.color = '#4ade80';
        setTimeout(() => {
          copyChipIcon.innerHTML = CLIPBOARD_SVG;
          copyChipIcon.style.color = '';
        }, 1600);
      }
      showToast(t('toastPathCopied'));
    }).catch(() => {
      showToast(activePath);
    });
  }

  if (pathChip) pathChip.addEventListener('click', copyActivePath);
  if (btnCopyChip) {
    btnCopyChip.addEventListener('click', (e) => {
      e.stopPropagation();
      copyActivePath();
    });
  }

  // Connect Server-Sent Events (SSE) for Real-Time File Sync
  function initSSE() {
    if (sseSource) sseSource.close();
    sseSource = new EventSource('/events');

    sseSource.onmessage = function(e) {
      try {
        const data = JSON.parse(e.data);
        if (data.type === 'file_loaded' || data.type === 'open_tab') {
          addOrSwitchTab(data.path, data.filename, data.content);
        } else if (data.type === 'file_update') {
          if (tabs[data.path]) {
            const tab = tabs[data.path];

            if (data.path === activePath) {
              if (tab.isDirty) {
                // User has active unwritten changes
                showToast(t('toastAiDirtyWarning'));
              } else {
                tab.currentContent = data.content;
                tab.lastSavedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                renderActiveDocument(true);
                showToast(t('toastAiChanges') + tab.filename);
              }
            } else {
              tab.currentContent = data.content;
              const diffRes = renderMarkdownWithDiff(tab.baselineContent, data.content);
              tab.pendingCount = diffRes.count;
              renderTabBar();
              showToast(t('toastAiChangesTab') + '[' + tab.filename + ']');
            }
          }
        }
      } catch (err) {
        console.error('Error SSE:', err);
      }
    };

    sseSource.onerror = function() {
      statusPill.textContent = 'Reconectando...';
    };
  }

  // Refresh & Re-sync Button (Replaces Ctrl+R)
  function refreshApp() {
    if (activePath && tabs[activePath] && tabs[activePath].isDirty) {
      if (!confirm(t('confirmDiscardRefresh'))) {
        return;
      }
    }

    if (btnRefresh) {
      btnRefresh.classList.add('rotating');
    }

    if (activePath) {
      localStorage.setItem('ai_md_active_tab', activePath);
      fetch('/api/open', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: activePath })
      }).catch(() => {}).finally(() => {
        setTimeout(() => {
          window.location.reload();
        }, 100);
      });
    } else {
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  }

  // Close App Window Action
  function closeApp() {
    const hasDirty = Object.values(tabs).some(tab => tab.isDirty);
    if (hasDirty) {
      if (!confirm(t('confirmDiscardClose'))) {
        return;
      }
    }

    Object.keys(tabs).forEach(p => {
      if (tabs[p] && tabs[p].isLocked) {
        setFileLock(p, false);
      }
    });

    fetch('/api/exit', { method: 'POST' }).catch(() => {});
    window.close();
  }

  // Button Listeners
  markReadBtn.addEventListener('click', markAsRead);
  saveBtn.addEventListener('click', saveCurrentDocument);
  if (btnRefresh) btnRefresh.addEventListener('click', refreshApp);
  if (btnCloseApp) btnCloseApp.addEventListener('click', closeApp);

  settingsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    settingsMenu.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!settingsMenu.contains(e.target) && e.target !== settingsBtn) {
      settingsMenu.classList.remove('open');
    }
  });

  // Settings
  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      savePref('lang', e.target.value);
    });
  }

  if (chkSpellcheck) {
    chkSpellcheck.addEventListener('change', (e) => {
      savePref('spellcheck', e.target.checked);
    });
  }

  if (fontSelect) fontSelect.addEventListener('change', (e) => savePref('font', e.target.value));
  if (fontSizeSelect) fontSizeSelect.addEventListener('change', (e) => savePref('fontSize', e.target.value));
  if (widthSelect) widthSelect.value = prefs.width;
  if (widthSelect) widthSelect.addEventListener('change', (e) => savePref('width', e.target.value));
  if (chkAutosave) chkAutosave.addEventListener('change', (e) => savePref('autosave', e.target.checked));
  if (chkAutolock) chkAutolock.addEventListener('change', (e) => savePref('autolock', e.target.checked));

  // Checkbox toggle listener
  docContainer.addEventListener('change', (e) => {
    if (e.target && e.target.type === 'checkbox') {
      if (!activePath || !tabs[activePath]) return;
      const tab = tabs[activePath];

      if (e.target.checked) {
        e.target.setAttribute('checked', 'checked');
      } else {
        e.target.removeAttribute('checked');
      }

      tab.isDirty = true;
      updateSaveIndicator();
      renderTabBar();
      recordHistorySnapshot(true);

      if (prefs.autolock && !tab.isLocked) {
        setFileLock(activePath, true);
        showToast(t('toastEditing'));
      }

      // Checkbox state changes always auto-save immediately
      clearTimeout(autosaveTimer);
      autosaveTimer = setTimeout(() => {
        saveCurrentDocument();
      }, 300);
    }
  });

  // 80/20 Formatting Toolbar Actions
  function execFormat(command, value = null) {
    docContainer.focus();
    if (!docContainer.innerHTML || docContainer.innerHTML.trim() === '' || docContainer.innerHTML === '<br>') {
      docContainer.innerHTML = '<p><br></p>';
      const p = docContainer.querySelector('p');
      if (p) {
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(p);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
    document.execCommand(command, false, value);
    updateEmptyState();
    if (!activePath || !tabs[activePath]) return;
    const tab = tabs[activePath];
    tab.isDirty = true;
    updateSaveIndicator();
    renderTabBar();
    updateDocumentStats();
    recordHistorySnapshot(true);
    if (prefs.autolock && !tab.isLocked) {
      setFileLock(activePath, true);
      showToast(t('toastEditing'));
    }
  }

  function insertChecklist() {
    docContainer.focus();
    if (!docContainer.innerHTML || docContainer.innerHTML.trim() === '' || docContainer.innerHTML === '<br>') {
      docContainer.innerHTML = '<p><br></p>';
    }
    const sel = window.getSelection();
    const text = (sel && sel.toString().trim()) || 'Nueva tarea';
    const html = `<ul class="task-list"><li class="task-list-item"><input type="checkbox" contenteditable="false"> ${text}</li></ul><p></p>`;
    document.execCommand('insertHTML', false, html);
    updateEmptyState();
    if (!activePath || !tabs[activePath]) return;
    const tab = tabs[activePath];
    tab.isDirty = true;
    updateSaveIndicator();
    renderTabBar();
    updateDocumentStats();
    recordHistorySnapshot(true);
    if (prefs.autolock && !tab.isLocked) {
      setFileLock(activePath, true);
      showToast(t('toastEditing'));
    }
  }

  function insertCodeBlock() {
    docContainer.focus();
    if (!docContainer.innerHTML || docContainer.innerHTML.trim() === '' || docContainer.innerHTML === '<br>') {
      docContainer.innerHTML = '<p><br></p>';
    }
    const sel = window.getSelection();
    const text = (sel && sel.toString()) || 'código';
    if (text.includes('\n')) {
      document.execCommand('insertHTML', false, `<pre><code>${text}</code></pre><p></p>`);
    } else {
      document.execCommand('insertHTML', false, `<code>${text}</code>`);
    }
    updateEmptyState();
    if (!activePath || !tabs[activePath]) return;
    const tab = tabs[activePath];
    tab.isDirty = true;
    updateSaveIndicator();
    renderTabBar();
    updateDocumentStats();
    recordHistorySnapshot(true);
    if (prefs.autolock && !tab.isLocked) {
      setFileLock(activePath, true);
      showToast(t('toastEditing'));
    }
  }

  // Ensure empty editor has paragraph and placeholder on focus
  docContainer.addEventListener('focus', () => {
    if (!docContainer.innerHTML || docContainer.innerHTML.trim() === '' || docContainer.innerHTML === '<br>') {
      docContainer.innerHTML = '<p><br></p>';
      updateEmptyState();
    }
  });

  // Delegate clicks on outer container margins to focus the editor
  const mainContainer = document.querySelector('.container');
  if (mainContainer) {
    mainContainer.addEventListener('click', (e) => {
      if (e.target === mainContainer) {
        docContainer.focus();
        if (!docContainer.innerText.trim()) {
          if (!docContainer.querySelector('p')) {
            docContainer.innerHTML = '<p><br></p>';
          }
          const p = docContainer.querySelector('p');
          if (p) {
            const range = document.createRange();
            const sel = window.getSelection();
            range.selectNodeContents(p);
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
      }
    });
  }

  // Smart inline markdown checklist shortcut when typing [ ] or - [ ] followed by space
  docContainer.addEventListener('keyup', (e) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      updateEmptyState();
    }
    if (e.key === ' ' || e.key === 'Spacebar') {
      const sel = window.getSelection();
      if (!sel || !sel.anchorNode) return;
      const node = sel.anchorNode;
      const text = node.textContent || '';
      const match = text.match(/^(\s*)(-\s*\[\s*\]|\[\s*\])\s/);
      if (match) {
        const remaining = text.slice(match[0].length);
        const li = node.parentElement ? node.parentElement.closest('li, p, div') : null;
        if (li && li !== docContainer) {
          li.outerHTML = `<ul class="task-list"><li class="task-list-item"><input type="checkbox" contenteditable="false"> ${remaining || '&nbsp;'}</li></ul>`;
          if (activePath && tabs[activePath]) {
            tabs[activePath].isDirty = true;
            updateSaveIndicator();
            renderTabBar();
            updateDocumentStats();
            recordHistorySnapshot(true);
          }
        }
      }
    }
  });

  const btnToolBold = document.getElementById('tool-bold');
  const btnToolItalic = document.getElementById('tool-italic');
  const btnToolStrike = document.getElementById('tool-strike');
  const btnToolH1 = document.getElementById('tool-h1');
  const btnToolH2 = document.getElementById('tool-h2');
  const btnToolH3 = document.getElementById('tool-h3');
  const btnToolP = document.getElementById('tool-p');
  const btnToolChecklist = document.getElementById('tool-checklist');
  const btnToolBullet = document.getElementById('tool-bullet');
  const btnToolOrdered = document.getElementById('tool-ordered');
  const btnToolQuote = document.getElementById('tool-quote');
  const btnToolCode = document.getElementById('tool-code');
  const btnToolHr = document.getElementById('tool-hr');

  if (btnToolUndo) btnToolUndo.addEventListener('click', handleUndo);
  if (btnToolRedo) btnToolRedo.addEventListener('click', handleRedo);
  if (btnToolBold) btnToolBold.addEventListener('click', () => execFormat('bold'));
  if (btnToolItalic) btnToolItalic.addEventListener('click', () => execFormat('italic'));
  if (btnToolStrike) btnToolStrike.addEventListener('click', () => execFormat('strikeThrough'));
  if (btnToolH1) btnToolH1.addEventListener('click', () => execFormat('formatBlock', '<h1>'));
  if (btnToolH2) btnToolH2.addEventListener('click', () => execFormat('formatBlock', '<h2>'));
  if (btnToolH3) btnToolH3.addEventListener('click', () => execFormat('formatBlock', '<h3>'));
  if (btnToolP) btnToolP.addEventListener('click', () => execFormat('formatBlock', '<p>'));
  if (btnToolChecklist) btnToolChecklist.addEventListener('click', insertChecklist);
  if (btnToolBullet) btnToolBullet.addEventListener('click', () => execFormat('insertUnorderedList'));
  if (btnToolOrdered) btnToolOrdered.addEventListener('click', () => execFormat('insertOrderedList'));
  if (btnToolQuote) btnToolQuote.addEventListener('click', () => execFormat('formatBlock', '<blockquote>'));
  if (btnToolCode) btnToolCode.addEventListener('click', insertCodeBlock);
  if (btnToolHr) btnToolHr.addEventListener('click', () => execFormat('insertHorizontalRule'));

  // Handle interactive checkboxes & prevent accidental link navigation
  docContainer.addEventListener('click', (e) => {
    if (e.target && e.target.type === 'checkbox') {
      if (e.target.checked) {
        e.target.setAttribute('checked', 'checked');
      } else {
        e.target.removeAttribute('checked');
      }
      if (activePath && tabs[activePath]) {
        tabs[activePath].isDirty = true;
        updateSaveIndicator();
        renderTabBar();
        recordHistorySnapshot(true);
        clearTimeout(autosaveTimer);
        autosaveTimer = setTimeout(() => {
          saveCurrentDocument();
        }, 300);
      }
      return;
    }

    const anchor = e.target.closest('a');
    if (anchor) {
      if (!e.ctrlKey) {
        e.preventDefault();
      }
    }
  });

  // Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    // 1. Always active shortcuts with Ctrl/Cmd
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
      e.preventDefault();
      saveCurrentDocument();
      return;
    }

    if (((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'r') || e.key === 'F5') {
      e.preventDefault();
      refreshApp();
      return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'w') {
      if (activePath && Object.keys(tabs).length > 1) {
        e.preventDefault();
        closeTab(activePath);
        return;
      }
    }

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'q') {
      e.preventDefault();
      closeApp();
      return;
    }

    // Undo / Redo keyboard shortcuts (Ctrl+Z, Ctrl+Shift+Z, Ctrl+Y)
    const isFormControl = document.activeElement && ['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName);
    if (!isFormControl) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
        return;
      }
    }

    // 2. If user is actively typing inside text or inputs, ignore single-character shortcuts
    const isTyping = (
      document.activeElement === docContainer ||
      docContainer.contains(document.activeElement) ||
      ['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)
    );

    if (isTyping) {
      if (e.key === 'Escape') {
        document.activeElement.blur();
      }
      return;
    }

    // 3. Reader shortcuts when not typing
    if (e.key === 'Escape') {
      settingsMenu.classList.remove('open');
    } else if (e.code === 'Space' && tabs[activePath] && tabs[activePath].pendingCount > 0) {
      e.preventDefault();
      markAsRead();
    } else if ((e.key === 'r' || e.key === 'R') && tabs[activePath] && tabs[activePath].pendingCount > 0) {
      markAsRead();
    } else if (e.key === 't' || e.key === 'T') {
      const themes = ['dark', 'light', 'sepia'];
      const nextTheme = themes[(themes.indexOf(prefs.theme) + 1) % themes.length];
      savePref('theme', nextTheme);
      showToast('Tema: ' + nextTheme);
    } else if (e.key === 'h' || e.key === 'H') {
      const nextColor = prefs.highlightColor === 'green' ? 'yellow' : 'green';
      savePref('highlightColor', nextColor);
      showToast('Resaltador: ' + (nextColor === 'green' ? 'Verde' : 'Amarillo'));
    } else if (e.key === 's' || e.key === 'S') {
      settingsMenu.classList.toggle('open');
    }
  });

  // Clean unlock on window close / unload
  window.addEventListener('beforeunload', () => {
    if (activePath && tabs[activePath] && tabs[activePath].isLocked) {
      navigator.sendBeacon('/api/unlock', JSON.stringify({ path: activePath }));
    }
  });

  // Init
  applyPreferences();
  initSSE();

  if (typeof marked !== 'undefined') {
    marked.setOptions({ gfm: true, breaks: true });
  }

})();
