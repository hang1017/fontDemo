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

### 一、启动测试配置

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

### 二、从扩展程序包中排除测试文件

`.vscodeignore` 允许在使用 `vsce` 发布工具时，排除测试文件。

默认情况下， `yo code` 生成的扩展项目会排除 `test` 和 `out/test` 文件夹。

```js
out/test/**
```



