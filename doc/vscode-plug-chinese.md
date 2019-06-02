# VS code 插件开发中文文档教程

这里我会演示几个实例给大家看：

- 状态栏显示 `md` 文件的总字数、状态栏显示全文件选中行数
- 显示网页视图 Cat Coding

## 状态栏 demo

用 `yo code` 创建一个 `Hello World` 插件。

我们使用的是 `typescript` 的项目

开始一个项目我们**第一件事就是应该先看 `package.json` 文件**。这里的内容不讲解。

找到 `extension.ts` 文件，在同级目录下先建一个 `WordCount.ts` 文件

开始编写代码：

```ts
// 导入 VS code 所需要用到的 API
import { window, StatusBarItem, StatusBarAlignment, TextDocument } from 'vscode';

export class WordCount {
    //:后面接的是变量的类型定义。弱类型定义。
    // StatusBarItem：VS code 最下面状态栏的东西
    private _statusBarItem:StatusBarItem;   

    public updateWordCount() {
        if(!_statusBarItem) {
            // 如果不存在，就创建一个，并且显示在左边
            this._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
        }
        // 获得当前文本编辑器
        let editor = window.activeTextEditor;
        if(!editor) {
            this._statusBarItem.hide();
            return ;
        }
        // 获取文本编辑器里的文字内容
        let doc = editor.document;
        // 判断一下文件类型
        if(doc.languageId === 'markdown') {
            // 自己创建一个方法，查询文字的个数。方法在下面
            let num = this._getWordCount(doc);
            // .text 为状态栏上显示的文字
            // $(octoface) 是一个图标，可以参考https://octicons.github.com/
            this._statusBarItem.text = num === 0 ? '目前还没有文字': '$(octoface)航帅帅已经输出 ${num} 个字拉！！！'
            this._statusBarItem.show();
        }else{
            this._statusBarItem.hide();
        }
    }
    // :number 为 _getWordCount 方法返回值得类型
    // TextDocument 为 入参 doc 的类型
    // 里面的操作不解释，需要的自行理解即可
    public _getWordCount(doc:TextDocument):number{
        let docContent = doc.getText();
		docContent = docContent.replace(/(< ([^>]+)<)/g, '').replace(/\s+/g, ' ');
		docContent = docContent.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		let word = 0;
		if(docContent != '') {
			word = docContent.split(' ').length;
		}
		return word;
    }
    // 销毁事件
    dispose() {
		this._statusBarItem.dispose();
	}
}
```

完成了功能的内容，接下来我们来演示下效果。

打开 `extension.ts` 文件，先来讲解一下该文件的内容

`activate`:当你的插件激活时第一时间会走到这个方法里面来。

`commands.registerCommand`:注册你的插件。

`context.subscriptions.push(disposable)`:我的理解是使用括号里的东西。这个我也不太懂。

`window.showInformationMessage`: 弹框消息。这个可以随意写。

接下来我们来修改 `extension.ts` 文件的内容：

```ts
// 导入我们刚写的方法
import { WordCount } from './WordCount';
import { window, commands, ExtensionContext,TextDocument } from 'vscode';
export function activate(context: ExtensionContext) {
    // 创建该项目
    let wordCount = new WordCount();
    let disposable = commands.registerCommand('extension.helloWorld', () => {
		wordCount.updateWordCount();
		window.showInformationMessage('该插件为显示 md 文档输出的字符，请看 vs Code 左下角~');
	});
    context.subscriptions.push(wordCount);
	context.subscriptions.push(disposable);
}
```

接下来我们来运行一下该插件看看效果。

在项目中创建一个 `md` 文档。在里面编辑一些文字(英文)。然后执行一下插件。你就会看到左下角的状态栏上有不一样的效果。

但是问题来了。该插件的效果显示的文字的个数并不会随着 `md` 文档的编辑而修改

每次要看文档的字数都要重新执行一下插件。效果非常的不好。

接下来我们就写一个订阅事件来监听。

在上面文件的同级目录下创建一个 `WordCounterController.ts` 文件。

```ts
import { window, Disposable } from 'vscode';
import { WordCount } from './WordCount';

export class WordCounterController {
    // 定义两个变量，并给他们规定一下变量的类型
    private _wordCount : WordCount;
    private _disposable : Disposable;
    // 初始化
    constructor(wordCount : WordCount) {
        this._wordCount = wordCount;
        this._wordCount.updateWordCount();
        // 订阅的一种记录吧，我这样理解的，可有可无
        let subscriptions:Disposable[] = [];
        // 当光标位置发生改变时触发这个函数
        window.onDidChangeTextEditorSelection(this._onEvent,this,subscriptions);
        // 当被激活的编辑器发生改变时触发这个函数
        window.onDidChangeActiveTextEditor(this._onEvent,this,subscriptions);
        // 执行方法，可注释
        this._wordCount.updateWordCount();
        // 将两个订阅事件创建成可释放的组合
        this._disposable = Disposable.from(...subscriptions);
    }
    private _onEvent() {
        this._wordCount.updateWordCount();
    }
    dispose() {
        this._disposable.dispose();
    }
}
```

那么至此，我们的订阅监听类就已经写完了。

快到 `extension.ts` 文件去引用吧。

下面的代码为伪代码：

```ts
import { WordCounterController } from './WordCounterController';

let wordCount = new WordCount();
let wordCounterController = new WordCounterController(wordCount);

context.subscriptions.push(wordCount);
context.subscriptions.push(wordCounterController);
```

完成了这些代码，满心欢喜的运行插件，测试发现。。。。。并不行！！

为什么？

因为我们是在 `onCommand` 去激活插件：通过特定的命令去执行该插件。所以无法一打开 `md` 文档就马上默认执行该插件。

到 `package.json` 文件中，找到 `activationEvents`,修改里面的代码：

```json
"activationEvents": [
	"onLanguage:markdown"
],
```

这个代码的含义：如果文件类型 `markdown` 就执行插件。

好的~ 可以秀一波了。

### 一、来一个小 tip(弹框显示选中的文字)：

如果想选中几个文字，然后执行插件时，弹出 `message` 显示文字 该怎么做呢？(这个不一定是 `md` 文档，所有的类型文件都可以)

```ts
// 获取当前文本编辑器
const editor = vscode.window.activeTextEditor;
// 获取文本编辑器选中项
const selection = editor.selection;
// 获取选中项中的内容   
const text = editor.document.getText(selection);
vscode.window.showInformationMessage(text);
```

### 二、再来一个小 tip (状态栏显示选中多少行文本)

只展示核心的代码

流程：将激活的文本编辑器传入到下面的函数中，函数返回多少行。

状态栏的显示上面的代码已经有了。忘记的小伙伴们请往上翻。

```ts
function updateStatusBarItem(editor: vscode.TextEditor | undefined): number {
	let lines = 0;
	if(editor) {
		lines = editor.selections.reduce((prev,curr) => prev + (curr.end.line - curr.start.line),0);
	}
	return lines;
}
```

## 网页视图 Cat Coding

### 一、在面板中显示图片

导入需要的头文件和全局变量

```ts
import * as vscode from 'vscode';

const cats = {
	'Coding Cat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
  	'Compiling Cat': 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif',
  	'Testing Cat': 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif'
};
```

来看实现的代码：

```ts
export function activate(context: vscode.ExtensionContext) {
    // 我修改了 commnd命令，小伙伴要修改的话去 package.json 记得要改 激活和 commands 两个地方
    let disposable = vscode.commands.registerCommand('catCoding.start' => {
        currentPanel = vscode.window.createWebviewPanel(
            'cat Coding',           // 标识webview的类型。在内部使用
            'Cat Coding-hangshuaishuai',    // 面板的标题显示给用户
            vscode.viewColumn.One,  //面板一共可以查分成3个，让此面板显示在第几个
            {}  // Webview选项。这个我也不太懂。可以自行查资料
        )
    })

    context.subscriptions.push(disposable);
}
```

好的，如果你现在运行插件的话，就会看到一个空的面板出来了。

接下来我们来补充一下面板的内容，把面板内容写在一个方法中.

在函数传参这块你可以先传，先写个固定的 `src` 测试一下效果。

```ts
function getWebviewContent(cat: keyof typeof cats){
	return (`
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta chatset="UTF-8">
			<meta name="viewport" content="width=device-width,initial-scale=1.0">
			<title>Cat Coding</title>
		</head>
		<body>
			<img src="${cats[cat]}" width="300" />
		</body>
		</html>
	`)
}
```

接下来我们继续修补 `activate` 方法，将面板的内容导入到面板中。

这里调用 `getWebviewContent` 可以先不传值去测试效果。

```ts
const cat = 'Coding Cat';
currentPanel.webview.html = getWebviewContent(cat);
```

好了。现在运行一下插件，你就会发现面板上多了一种图片。

### 二、定时修改面板图片内容

继续在 `activate` 方法中补充代码

```ts
let time = 0;
const updateImg = () => {
    const cat = time++ % 2 ? 'Compiling Cat' : 'Coding Cat';
    currentPanel.title = cat;
    // 这里的方法就要通过动态的传递了，不能在写死了
    // 写死的话你只能看到 title 的改变，没办法看到图片的改变
    currentPanel.webview.html = getWebviewContent(cat);
}
// 一秒钟调用一次
const changePanel = setInterval(updateImg,1000);

```

 现在运行一下插件。是不是一秒钟变化一次面板的内容和标题了呢？

 ### 三、只展示一个面板

 这里我们先把前面写的关于**定时器的代码注释掉！！！！！**

 好了，如果小伙伴们多次运行命令会不会发现，面板一个接着一个的出现。

 这个样子可不好。我希望的效果是：如果面板选中，则不再新增新的面板。

 如果面板未被选中，则跳转到该面板上来。

 如果面板已经被销毁，才再次新增一个面板。

 总之。我只要一个面板再即可。

首先全局定义一个变量：`let currentPanel: vscode.WebviewPanel | undefined = undefined`

接下来我们来修改 `activate` 方法的内容。

```ts
export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('catCoding.start', () => {
        // 判断是否存在当前的面板
        const columnToShowIn = vscode.window.activeTextEditor
                            ?vscode.window.activeTextEditor.viewColumn
                            :undefind;

        if(currentPanel){
            // reveal() 将面板置于前台
            currentPanel.reveal(columnToShowIn);
        }else {
            // 之前的代码不变
            currentPanel = vscode.window.createWebviewPanel(
				'cat Coding', // 标识webview的类型。在内部使用
				'Cat Coding-hangshuaishuai', // 面板的标题显示给用户
				vscode.ViewColumn.One, // 编辑列显示新的webview面板。
				{} // Webview选项。稍后将详细介绍这些。
			)
			const cat = 'Coding Cat';
			currentPanel.webview.html = getWebviewContent(cat);
        }
    }

    // 这段代码很重要！！！！！
    // 这段代码很重要！！！！！
    // 这段代码很重要！！！！！
    // 当你面板关闭时，如果不销毁 currentPanel，你就无法重新打开新面板。
    currentPanel.onDidPispose(() => {
        currentPanel = undefind;
    })
    context.subscriptions.push(disposable);
}
```

好了。那么现在在测试一下效果。是不是发现永远都只显示一个面板。

### 四、同一个面板在不同的窗口中显示不同的图片

我们可以在 vscode 上创建三个窗口，将唯一的面板在三个窗口中拖动。并且每个窗口都是显示不同的图片

在写一个方法用作改变图片

```ts
function updateWebviewForCat(panel:vscode.WebViewPanel,catName: keyof typeof cats){
    panel.title = catName;
    panel.webwebview.html = getWebviewContent(catName);
}
```

`onDidChangeViewState`: 面板的视图状态发生变化时触发。

接下来我们就要用到上面的这个函数：

```ts
currentPanel.onDidChangeViewState(e => {
    // Webview面板的视图状态已更改
    const panel = e.webviewPanel;

    switch(panel: panel.viewColumn) {
        case vscode.viewCloumn.One:
            updateWebviewForCat(panel, 'Coding Cat');
            return ;
        case vscode.viewCloumn.Two:
            updateWebviewForCat(panel, 'Compiling Cat');
            return ;
        case vscode.viewCloumn.Three:
            updateWebviewForCat(panel, 'Testing Cat');
            return ;
    }
})
```

好的。请开始你的表演。









