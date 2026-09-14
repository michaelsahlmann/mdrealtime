# SymbioLive

Real-time interactive Markdown environment designed for concurrent human-AI collaboration.

SymbioLive pairs a live rendered Markdown editor with local file change monitoring. When an AI agent or background script writes to a document on disk, the view updates in place, preserves your current scroll offset, and highlights modified passages. When you edit the document directly, SymbioLive applies an operating system write lock and drops a companion indicator file so agents pause their file edits until you finish.

## Core capabilities

- Live synchronization via Server-Sent Events (SSE). File modifications made by background agents stream directly to the interface without page reloads.
- Visual difference highlighting. Added or changed paragraphs receive subtle background tinting in green or amber so you can inspect edits immediately.
- Concurrency protection. Entering edit mode marks the file read-only (0444) and generates a `.ai-locked` metadata file. Saving restores read-write permissions (0644) and removes the lock.
- Interactive task lists. Clicking a task checkbox immediately rewrites the corresponding `- [ ]` or `- [x]` markdown token on disk.
- In-place rich formatting. Includes heading levels, bold, italic, strikethrough, bullet lists, ordered lists, code blocks, and blockquotes.
- Local revision backups. Saving creates a timestamped copy in `~/.local/share/symbiolive/backups/` before writing new content.
- Multilingual spellchecking. Configured for Latin American Spanish, Brazilian Portuguese, and English dictionaries.

## Architecture

SymbioLive consists of two main pieces:

1. Local Python service (`bin/symbiolive`). A lightweight HTTP daemon built on Python's standard `http.server`. It hosts frontend assets, tracks file statistics (`mtime` and byte size) with a sub-second loop, manages file permissions, and streams SSE events to connected clients.
2. Web interface (`static/` and `vendor/`). A browser client rendered inside a standalone app window using Chromium or Google Chrome with `--app` and `--class=symbiolive`. Markdown parsing relies on `marked.js`, word-level difference calculations use `diff.js`, and HTML-to-Markdown conversion uses `turndown` with the GitHub Flavored Markdown plugin.

## Keyboard shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Space` or `R` | Clear diff highlights and reset baseline |
| `Ctrl+S` | Save current edits and release file lock |
| `Ctrl+Z` | Undo change |
| `Ctrl+Y` | Redo change |
| `Ctrl+R` | Reload from disk and resynchronize |
| `Ctrl+Q` | Close window |
| `T` | Cycle visual theme (Dark, Light, Sepia) |
| `H` | Cycle highlight color (Emerald, Amber) |
| `S` | Open typography and display settings |

## Installation on Linux

### Prerequisites

- Python 3.9 or higher.
- A Chromium-based browser (`google-chrome`, `chromium`, `brave`, or `microsoft-edge`).
- Linux desktop environment (Wayland or X11).

### Setup

Clone the repository and run the installation script:

```bash
git clone https://github.com/your-username/symbiolive.git
cd symbiolive
./install.sh
```

The script links `bin/symbiolive` into `~/.local/bin/symbiolive`, registers the application desktop file in `~/.local/share/applications/`, and installs the vector icon.

### Usage

Open any Markdown document:

```bash
symbiolive /path/to/document.md
```

If SymbioLive is already open, running the command again opens the new file in an adjacent tab within the existing window.

## Cross-platform roadmap

SymbioLive currently runs on Linux using Python and Chromium application mode. To support macOS and Windows, development will proceed in phases:

1. Python multiplatform launcher. Adapt window management and browser dispatch for macOS (`open -na "Google Chrome" --args --app=...`) and Windows (`chrome.exe --app=...` or `msedge.exe --app=...`).
2. Tauri 2.0 native packaging. Bundle the frontend with a Rust backend. This replaces the Chrome dependency with system webviews (WKWebView on macOS, WebView2 on Windows, WebKitGTK on Linux), provides native file system hooks, and produces a standalone binary under 15 megabytes.

Detailed implementation notes and platform-specific considerations are documented in [docs/cross-platform-roadmap.md](docs/cross-platform-roadmap.md).

## License

MIT License. See [LICENSE](LICENSE) for details.
