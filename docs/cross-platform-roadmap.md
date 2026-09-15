# Cross-platform implementation roadmap

This document outlines the strategy for porting MDRealtime to macOS and Windows.

## Current architecture on Linux

The Linux version relies on three layers:

1. Python backend. Runs a local HTTP daemon using Python's standard `http.server`, manages file polling at 150ms intervals, sets file permissions with `os.chmod`, and maintains Server-Sent Events connections.
2. Chromium application mode. Launches Chrome, Chromium, or Brave with `--app=http://127.0.0.1:19842` and `--class=mdrealtime`, isolating session data in a dedicated temporary profile.
3. Window manager communication. Focuses or closes windows through Hyprland commands (`hyprctl dispatch`).

## Phase 1: Python portable runner

The first cross-platform milestone maintains the Python daemon while replacing Linux-specific desktop integration with cross-platform equivalents.

### macOS adjustments

- Browser launch: Invoke the default browser or Chrome using macOS command line flags:
  ```bash
  open -na "Google Chrome" --args --app=http://127.0.0.1:19842
  ```
  If Chrome is not installed, the launcher falls back to Safari via default URL open or a WebKit webview.
- Window management: Replace `hyprctl` with AppleScript commands executed through `/usr/bin/osascript`:
  ```applescript
  tell application "Google Chrome" to activate
  ```
- File permissions: macOS supports standard POSIX permissions (`chmod 0444` and `0644`), matching the Linux behavior directly.
- Application bundle: Package the Python script and assets inside a standard `MDRealtime.app` directory structure with `Contents/MacOS` and `Contents/Resources`.

### Windows adjustments

- Browser launch: Locate Google Chrome, Microsoft Edge, or Brave via the Windows Registry or known Program Files directories, then start the process:
  ```cmd
  msedge.exe --app=http://127.0.0.1:19842
  ```
  Edge is pre-installed on modern Windows 10 and 11 systems, eliminating external browser dependencies.
- Window management: Use `win32gui` or PowerShell calls to locate the window handle by title and bring it to the foreground (`SetForegroundWindow`).
- File permissions: NTFS handles read-only flags differently from POSIX systems. `os.chmod(path, 0o444)` sets the Windows read-only file attribute, which successfully prevents unintended overwrites by background scripts.
- Packaging: Create an executable with PyInstaller or Inno Setup installer for distribution.

## Phase 2: Native desktop application using Tauri 2.0

Phase 2 replaces the external browser dependency and Python interpreter with a single compiled binary using Tauri 2.0 and Rust.

### Motivation

- Smaller installation size: Tauri binaries typically measure under 15 megabytes, compared to bundled Python runtimes or Electron distributions.
- Native webviews: Uses WKWebView on macOS, Microsoft WebView2 on Windows, and WebKitGTK on Linux.
- Memory efficiency: Eliminates the overhead of separate Chrome profiles and background daemon processes.
- Native file system events: Replaces polling loops with kernel-level file watchers using Rust's `notify` crate (FSEvents on macOS, ReadDirectoryChangesW on Windows, inotify on Linux).
- Native system menus and keybindings: Standard window frames, menu bars, and system tray integration across all platforms.

### Target architecture

```
+-------------------------------------------------------------+
|                     Tauri Frontend                          |
|  (reader.js, reader.css, marked.js, diff.js, turndown.js)   |
+-------------------------------------------------------------+
                              |
                     IPC Commands / Events
                              |
+-------------------------------------------------------------+
|                      Rust Core Backend                      |
|  - File watcher (notify crate)                              |
|  - Read / Write / Backup engine                             |
|  - Concurrency lock manager (file permissions + .ai-locked) |
|  - Native window and menu controller                        |
+-------------------------------------------------------------+
```

### Migration steps

1. Initialize Tauri project in a separate branch or submodule:
   ```bash
   npm create tauri-app@latest
   ```
2. Move `static/` and `vendor/` assets into the Tauri frontend directory.
3. Replace HTTP/SSE endpoints with Tauri IPC commands (`invoke('save_file')`, `invoke('lock_file')`, `listen('file_changed')`).
4. Implement the file watcher and permission manager in Rust.
5. Configure GitHub Actions workflows to build signed binaries for macOS (.dmg), Windows (.msi / .exe), and Linux (.deb / AppImage).
