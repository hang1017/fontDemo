# VS Code 推荐设置和推荐安装插件

## 设置

```json
{
  "gitlens.advanced.messages": {
    "suppressShowKeyBindingsNotice": true
  },
  "javascript.implicitProjectConfig.experimentalDecorators": true,
  "window.zoomLevel": 0,
  "[markdown]": {
    "editor.wordWrap": "on",
    "editor.quickSuggestions": true
  },
  "javascript.updateImportsOnFileMove.enabled": "never",
  "diffEditor.ignoreTrimWhitespace": false,
  "dart.flutterSdkPath": "/Users/xiaohuoni/Downloads/flutter",
  "prettier.singleQuote": true,
  "prettier.trailingComma": "es5",
  "prettier.printWidth": 120,
  "[javascript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "[typescript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "vscode-i18n-linter.i18nFilesPattern": "**/src/**/*.+(js*|html|ts*)",
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.minimap.showSlider": "always",
  "editor.minimap.renderCharacters": false,
  "editor.minimap.maxColumn": 200,
  "editor.renderWhitespace": "all",
  "editor.smoothScrolling": true,
  "editor.cursorBlinking": "phase",
  "editor.cursorSmoothCaretAnimation": true,
  "files.insertFinalNewline": true,
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "files.associations": {
    "*.js": "javascriptreact"
  },
  "workbench.editor.enablePreviewFromQuickOpen": false,
  "breadcrumbs.enabled": true,
  "explorer.openEditors.visible": 0,
  "window.title": "${dirty} ${activeEditorMedium}${separator}${rootName}",
  "files.trimTrailingWhitespace": true,
  "telemetry.enableCrashReporter": false,
  "telemetry.enableTelemetry": false,
  "workbench.settings.enableNaturalLanguageSearch": false,
  "workbench.statusBar.feedback.visible": false
}
```

## 插件

- Babel JavaScript / 把各种javascript千奇百怪的语言统统专为浏览器可以认识的语言
- Bracket Pair Colorizer / 为代码中的括号们添上一抹亮色
- Color Highlight / 颜色代码高亮插件
- Debugger for Chrome / 启动 Chrome 控制台
- DotENV / 支持.env文件语法高亮，在你使用Node时会非常有用
- EditorConfig for VS Code /  保持编码风格的一致
- ES7 React/Redux/GraphQL/React-Native snippets / 使用简写命令，生成基础代码片段
- ESLint / 代码规范插件
- Git History / 
- gitignore / 忽略不想提交的文件
- GitLens — Git supercharged / 显示当前行commit信息
- Guides / 显示代码对齐辅助线
- HTML CSS Support / 让 html 标签上写class 智能提示当前项目所支持的样式
- Image preview / 图片预览，这个在代码里就知道自己引用了哪个图片
- LintLens — ESLint rules made easier / 
- Markdown All in One / 提供了常用操作便利的快捷键 ctrl+shift+F
- Markdown Preview Github Styling
- MDTools
- npm / 此扩展支持运行package.json文件中定义的NPM脚本，并根据package.json中定义的依赖项验证已安装的模块。
- React Native Tools
- Settings Sync
- Sort JSON objects
- Sort lines
- TODO Highlight / 能够在你的代码中标记出所有的 TODO 注释，以便更容易追踪任何未完成的业务。
- Version Lens / 可以及时看到package.json内部版本的变动，很实用
- Visual Studio IntelliCode - Preview
- vscode-icons / 侧栏的图标 
- vscode-styled-jsx
