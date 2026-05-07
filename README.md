# Nicer Gmail Chrome Extension

A small Chrome extension for making Gmail calmer to use.

It adds a single settings button inside Gmail with two controls:

- Theme: Light, System, or Dark.
- Sidebar simplifier: choose which Gmail sidebar items stay visible.

Hidden sidebar items are shown again when Gmail's native **More** menu is expanded. The extension also hides Gmail's separate label-section **More** control while sidebar simplification is enabled, so there is only one sidebar expansion point.

## Features

- Dark mode toggle using a Gmail-wide visual filter.
- Image, video, and canvas re-inversion so media keeps its original colors.
- Newsletter background cleanup for better dark mode readability.
- Configurable Gmail sidebar:
  - Inbox
  - Sent
  - Drafts
  - Starred
  - Snoozed
  - Important
  - Spam
  - Trash
  - Categories
  - Labels
- Settings are saved with `chrome.storage.sync`.

## Install Locally

1. Open Chrome and go to `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select this project folder.
5. Open or reload Gmail.

## Usage

Open Gmail and click the extension settings button in the Gmail header.

From there you can:

- select the theme mode
- enable or disable sidebar simplification
- choose which sidebar items stay visible while Gmail's native **More** menu is collapsed
- reset the sidebar defaults

The default visible sidebar items are:

- Inbox
- Sent
- Drafts

## Development Notes

This extension runs as a content script on `https://mail.google.com/*`.

Gmail changes its DOM often, so the sidebar logic avoids relying only on Gmail CSS class names. It primarily detects navigation links by their hash routes, such as `#inbox`, `#sent`, `#drafts`, `#spam`, `#trash`, `#category/...`, and `#label/...`.

## Files

- `manifest.json`: Chrome extension manifest.
- `content.js`: Gmail UI injection, theme handling, and sidebar simplification.
