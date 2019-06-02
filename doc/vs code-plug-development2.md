# vs Code 插件开发官网 API

## 入门

### 一、安装和使用

```bath
cnpm install -g yo generator-code

yo code

code ./~
```

然后按 `F5`,将在 Extension Development Host 窗口中，编译和运行扩展。

该初始事件做了 3 件事：

- 1、注册**激活事件**：以便用户在运行命令时激活插件 `onCommand:extension.HelloWorld`

```js
"activationEvents": [
    "onCommand:extension.sayHello"
]
```

- 2、使用 **Contributes.commands** 在 Command Palette 中使命令可用。并绑定到命令ID
- 3、将函数绑定到已注册的命令ID上。

```js
let disposable = vscode.commands.registerCommand('extension.helloWorld', function () {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    const message = '航帅帅';
    vscode.window.showInformationMessage(message);
});
```

理解上面的三个概念：

- 1、激活事件：将分机变为活动状态
- 2、contribute point:为 vscode插件进行静态声明
- 3、可以在扩展代码中调用的一组JavaScript API。

### 二、文件结构：

```
.
├── .vscode
│   ├── launch.json     // 用于启动和调试插件的配置
│   └── tasks.json      // 编译 typescript 的生成任务的配置
├── .gitignore          // Ignore build output and node_modules
├── README.md           // 插件功能的可读描述
├── src
│   └── extension.ts    // 插件源代码
├── package.json        // 插件清单
├── tsconfig.json       // TypeScript 配置文件
```

## 使用插件程序

### 一、测试配置

#### 1、启动测试配置

打开 `.vscode\launch.json` 文件。看代码：

```js
{
  "name": "Extension Tests",
  "type": "extensionHost",
  "request": "launch",
  "runtimeExecutable": "${execPath}",
  "args": [
    //-----
    //  禁用其他插件程序
    "--disable-extensions",
    //-----
    //  将参数传递传递给插件开发组件
    //  在参数列表前面插入路径来设置测试实例应打开的文件和文件夹
    //-----
    "${workspaceFolder}/file or folder name",  //就这句
    //-----
    "--extensionDevelopmentPath=${workspaceFolder}",
    "--extensionTestsPath=${workspaceFolder}/out/test"
  ],
  "outFiles": ["${workspaceFolder}/out/test/**/*.js"]
}
```

#### 2、从扩展程序包中排除测试文件

`.vscodeignore` 允许在使用 `vsce` 发布工具时，排除测试文件。

默认情况下， `yo code` 生成的扩展项目会排除 `test` 和 `out/test` 文件夹。

```js
out/test/**
```

### 二、发布插件

#### 1、VSCE  'Visual Studio Code Extensions'

用于打包，发布和管理 VS Code 插件的命令行工具。

安装：`npm install -g vsce`

用法：

```bash
$ cd myExtension
$ vsce package
# myExtension.vsix generated
$ vsce publish
# <publisherID>.myExtension published to VS Code MarketPlace
```

#### 2、发布插件

vs Code 利用 [Azure DevOps](https://azure.microsoft.com/zh-cn/services/devops/) 进行市场服务

vsce 只能使用[个人访问令牌](https://docs.microsoft.com/zh-cn/azure/devops/integrate/get-started/authentication/pats?view=azure-devops)发布插件，所以至少需要创建一个。

- 获取个人访问令牌

具体操作请看[此链接](https://code.visualstudio.com/api/working-with-extensions/publishing-extension).

首先，确保拥有 Azure DevOps 组织。

组织的名称是 `vscode`。从组织主页 `https://dev.azure.com/vscode` 中选中头像，选择 `Security` 

选择 `Personal access tokens` 点击 -> `new Token`.

- 创建发布者

获得个人令牌后，可以使用 `vsce` 命令创建新的发布者：

```bash
vsce create-publisher (publisher name)
```

- 登录发布商

```bash
vsce login (publisher name)
```

`vsce` 将询问您的个人访问令牌并记住他以供将来的命令使用。

在使用可选参数发布时，输入个人访问令牌 `-p <token>`

```bash
vsce publish -p <token>
```

#### 3、自动递增扩展版本

发布插件的版本号递增，可以使用 `major`、`minor`、`patch`。

例如：1.0.0 -> 1.1.0

```bash
vsce publish minor
```

或者直接输入命令：

```bash
vsce publish 2.0.1
```

#### 4、取消发布扩展命令

```bash
vsce unpublish (publisher name).(extension name)
```

#### 5、打包插件

`vsce` 可将插件打包到一个 `VSIX` 文件中。

```bash
vsce package
```

别人若要安装你打包发送的文件夹:

```bash
code --install-extension my-extension-0.0.1.vsix
```

下面这段代码放在 `package.json` 文件中。描述了 vs Code 本身的兼容性。

```bash
{
  "engines": {
    "vscode": "^1.8.0"
  }
}
```

### 三、捆绑插件

加载100个小文件比加载一个大文件慢得多。这就是我们推荐捆绑的原因。捆绑是将多个小型源文件合并到一个文件中的过程。

#### 1、使用 webpack

```bash
npm i --save-dev webpack webpack-cli
```

`webpack` 是 JavaScript 的捆绑器。但是很多插件都是用 typescript 编写的。`ts-loader` 可以使 `webpack` 理解 typescript。

```bash
npm i --save-dev ts-loader
```

还有其他的捆绑和持续集成的内容请直接移步[官网](https://code.visualstudio.com/api/working-with-extensions/continuous-integration)


## 扩展指南

### 一、命令

`executeCommand`:执行命令

`editor.action.addCommentLine`:活动文本编辑器中注释当前选定的行

来看一个 **执行命令URI** 的操作：

```js
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  vscode.languages.registerHoverProvider(
    'javascript',
    new class implements vscode.HoverProvider {
      provideHover(
        _document: vscode.TextDocument,
        _position: vscode.Position,
        _token: vscode.CancellationToken
      ): vscode.ProviderResult<vscode.Hover> {
        const commentCommandUri = vscode.Uri.parse(`command:editor.action.addCommentLine`);
        const contents = new vscode.MarkdownString(`[Add comment](${commentCommandUri})`);

        // 若要在 md 内容中启用命令uri，必须设置“istrusted”标志。
        // 创建受信任的 md 字符串时，请确保正确清理所有
        // 输入内容，以便只能执行预期的命令uri
        contents.isTrusted = true;

        return new vscode.Hover(contents);
      }
    }()
  );
}
```

#### 1、创建命令三步骤

第一步 写下注册命令

`registerCommand`:将命令ID绑定到扩展中的处理函数

```js
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const command = 'myExtension.sayHello';

  const commandHandler = (name?: string = 'world') => {
    console.log(`Hello ${name}!!!`);
  };

  context.subscriptions.push(vscode.commands.registerCommand(command, commandHandler));
}
```

第二步：创建面向用户的命令

```js
{
  "contributes": {
    "commands": [
      {
        "command": "myExtension.sayHello",
        "title": "Say Hello"
      }
    ],
    //控制何时再命令选项版中显示命令
    "menus": {
      "commandPalette": [
        {
          "command": "myExtension.sayHello",
          "when": "editorLangId == markdown"
        }
      ]
    }
  }
}
```

第三步： 激活命令

```js
{
  "activationEvents": ["onCommand:myExtension.sayHello"]
}
```

#### 2、一些常用命令

`vscode.window.createOutputChannel`: vscode通过创建OutputChannel来输出自己的日志信息

- `vscode.window.createTerminal({name: "xmake"});`
- `terminal.show(true);`
- `terminal.sendText("xmake");`

三个一起为创建一个label名为xmake的独立终端，然后发送命令：`xmake`。

- `vscode.workspace.getConfiguration('xmake');`
- `config.get("buildDirectory");`

读取 `package.json` 文件

`document: vscode.TextDocument`:文本内容

`position: vscode.Position`: 文本位置

`class ~ implements vscode.CompletionItemProvider`: 输入文件的提示内容

- vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 4.5)
- debugButton.command = 'xmake.onDebug';
- debugButton.text = `$(bug)`;
- debugButton.tooltip = "Debug the given target";
- debugButton.show();

创建状态栏，`command`：为点击按钮，执行什么命令

`onDidChangeTextEditorSelection`: 当光标位置改变时触发这个函数

`onDidChangeActiveTextEditor`: 当被激活的编辑器发生改变时触发这个事件

`window.activeTextEditor`: 获得当前文本的编辑器

`vscode.window.createTextEditorDecorationType`: 用于向文本编辑器添加修饰

`overviewRulerColor`: 描述标尺中装饰的颜色，配合上面的代码一起使用。

`overviewRulerLane`: 描述标尺中应该呈现的位置，配合上面的代码一起使用。

`vscode.window.activeTextEditor.setDecorations(DecorationType,Numbers)`: 向文本中添加修饰: 修饰的样式，所有的字段数组

`Numbers.push(decoration)`: 向上面的数组添加数据，符合条件的数据

`decoration:{range: new Range(start,end),hoverMessage: '覆盖的文字'}`: 向上面的修饰添加修饰的内容

`vscode.workspace.onDidChangeTextDocument`: 当文本改变时发出的事件。通常发生在内容发生变化时，也发生在脏状态的情况。

`onDidChangeViewState`: 面板的视图状态发生变化时触发。









