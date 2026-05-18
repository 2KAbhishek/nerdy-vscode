<div align = "center">

<h1><a href="https://github.com/2kabhishek/nerdy-vscode">nerdy-vscode</a></h1>

<a href="https://github.com/2KAbhishek/nerdy-vscode/blob/main/LICENSE">
<img alt="License" src="https://img.shields.io/github/license/2kabhishek/nerdy-vscode?style=flat&color=eee&label="> </a>

<a href="https://github.com/2KAbhishek/nerdy-vscode/graphs/contributors">
<img alt="People" src="https://img.shields.io/github/contributors/2kabhishek/nerdy-vscode?style=flat&color=ffaaf2&label=People"> </a>

<a href="https://github.com/2KAbhishek/nerdy-vscode/stargazers">
<img alt="Stars" src="https://img.shields.io/github/stars/2kabhishek/nerdy-vscode?style=flat&color=98c379&label=Stars"></a>

<a href="https://github.com/2KAbhishek/nerdy-vscode/network/members">
<img alt="Forks" src="https://img.shields.io/github/forks/2kabhishek/nerdy-vscode?style=flat&color=66a8e0&label=Forks"> </a>

<a href="https://github.com/2KAbhishek/nerdy-vscode/watchers">
<img alt="Watches" src="https://img.shields.io/github/watchers/2kabhishek/nerdy-vscode?style=flat&color=f5d08b&label=Watches"> </a>

<a href="https://github.com/2KAbhishek/nerdy-vscode/pulse">
<img alt="Last Updated" src="https://img.shields.io/github/last-commit/2kabhishek/nerdy-vscode?style=flat&color=e06c75&label="> </a>

<h3>Nerd Font glyphs at your fingertips 🎇🎉</h3>

<figure>
  <img src="docs/images/screenshot.png" alt="nerdy-vscode in action">
  <br/>
  <figcaption>nerdy-vscode in action</figcaption>
</figure>

</div>

nerdy-vscode is a VS Code extension that allows developers to quickly search and insert Nerd Font glyphs into their code.

## ✨ Features

- Search from thousands of Nerd Font icons.
- Instant insertion into the active editor.
- **Recently Used:** Quick access to your most frequently used icons.
- **Automatic Clipboard Copy:** Selected icons are automatically copied to your clipboard.
- **High Performance:** Optimized data caching and SVG rendering for smooth UI.

## ⚡ Setup

### ⚙️ Requirements

- VS Code version 1.96.0 or higher.
- A Nerd Font installed and configured in VS Code for proper icon rendering.

### 🔡 Recommended Fonts

To see the icons correctly, you **must** have a Nerd Font installed on your system. We recommend:

- **[FiraCode Nerd Font](https://github.com/ryanoasis/nerd-fonts/tree/master/patched-fonts/FiraCode)** (Highly Recommended)
- [JetBrainsMono Nerd Font](https://github.com/ryanoasis/nerd-fonts/tree/master/patched-fonts/JetBrainsMono)
- [Hack Nerd Font](https://github.com/ryanoasis/nerd-fonts/tree/master/patched-fonts/Hack)

After installing, make sure to update your VS Code settings:
```json
"editor.fontFamily": "'FiraCode Nerd Font', 'FiraCode Nerd Font Mono', monospace"
```

### 💻 Installation

#### Marketplace

Search for "nerdy-vscode" in the VS Code Extension Marketplace and click **Install**.

#### Local Installation (for development)

If you'd like to run the extension from source:

1. Clone the repository:
   ```bash
   git clone https://github.com/2kabhishek/nerdy-vscode
   cd nerdy-vscode
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Open the project in VS Code:
   ```bash
   code .
   ```
4. Press `F5` to start a new VS Code window with the extension enabled.

#### Developer Commands

- `pnpm run update-glyphs`: Updates the `glyphnames.json` data file from the official Nerd Fonts repository.

## 🚀 Usage

### Insert Icon

1. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`).
2. Type **"Nerdy: Insert Icon"** and press Enter.
3. Search for the icon you want and select it to insert.

### Insert Recent Icon

1. Open the Command Palette.
2. Type **"Nerdy: Insert Recent Icon"** and press Enter.
3. Select from your recently used icons for even faster access.

## 🏗️ What's Next

- You tell me! :)

## 🧑‍💻 Behind The Code

### 🌈 Inspiration

nerdy-vscode was born out of the need for a quick and easy way to find and insert Nerd Font glyphs without leaving the editor or searching through external websites.

### 💡 Challenges/Learnings

- **Performance:** Handling thousands of glyphs efficiently in VS Code's QuickPick required implementing a caching layer to avoid redundant disk I/O.
- **VS Code API:** Learned the nuances of the `showQuickPick` API and how to handle asynchronous user selections effectively.

### 🧰 Tooling

- [dots2k](https://github.com/2kabhishek/dots2k) — Dev Environment
- [nvim2k](https://github.com/2kabhishek/nvim2k) — Personalized Editor
- [sway2k](https://github.com/2kabhishek/sway2k) — Desktop Environment
- [qute2k](https://github.com/2kabhishek/qute2k) — Personalized Browser

### 🔍 More Info

- [nerdy.nvim](https://github.com/2kabhishek/nerdy.nvim) — Nerdy for Neovim

<hr>

<div align="center">

<strong>⭐ hit the star button if you found this useful ⭐</strong><br>

<a href="https://github.com/2KAbhishek/nerdy-vscode">Source</a>
| <a href="https://2kabhishek.github.io/blog" target="_blank">Blog </a>
| <a href="https://twitter.com/2kabhishek" target="_blank">Twitter </a>
| <a href="https://linkedin.com/in/2kabhishek" target="_blank">LinkedIn </a>
| <a href="https://2kabhishek.github.io/links" target="_blank">More Links </a>
| <a href="https://2kabhishek.github.io/projects" target="_blank">Other Projects </a>

</div>
