# VS code 插件开发中文文档教程

这里我会演示几个实例给大家看：

- 一、状态栏显示 `md` 文件的总字数、状态栏显示全文件选中行数
- 二、显示网页视图 Cat Coding
- 三、完成正在键入的文本片段
- 四、不同的样式修饰不同类型的数字
- 五、进度条显示样式

## 一、状态栏 demo

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

### 1、来一个小 tip(弹框显示选中的文字)：

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

### 2、再来一个小 tip (状态栏显示选中多少行文本)

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

## 二、网页视图 Cat Coding

### 1、在面板中显示图片

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
            {
                enableScripts: true //用于运行脚本，如果不需要，请放空即可
            }  // Webview选项。
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

### 2、定时修改面板图片内容

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

 ### 3、只展示一个面板

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

### 4、同一个面板在不同的窗口中显示不同的图片

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

### 5、将消息从 插件 传递到 web 视图

我们在图片的下方设置一个每秒加1的数字，并新增一个命令，每当调用这个命令时，让数字减半。

`package.json` 的代码我就不写了，就照着 `catCoding` 的代码去照着写就行了。注意要激活新命令这样才能用。

新介绍一个命令：

`webview.postMessage()`: 发送数据到 web 视图。该方法可以将任何 `JSON` 可序列化数据发送到 `webview` 中。

在 web 视图中 通过 `window.addEventListener('message', event => { ... })` 收集数据。

在 `activate` 方法中增加一下的代码：

```ts
context.subscriptions.push({
    vscode.commands.registerCommand('catCoding.doRefactor',() => {
        if(!currentPanel){
            return ;
        }
        currentPanel.webview.postMessage({command: 'refactor'})
    })
})
```

在 `html` 的 `body` 代码中，新增以下代码：

```ts
<img src="${cats[cat]}" width="300" />
<h2 id='counter'>0</h2>
<script>
    const counter = document.getElementById('counter');
    let count  = 0;
    setInterval(() => {
        counter.textContent = count++;
    },1000);

    window.addEventListener('message',event =>{
        switch(event.data){
            case 'refactor': 
            count = Math.ceil(count * 0.5);
            counter.textContent = count;
            break;
        }
    })
</script>
```

### 6、将数据从 web 视图传递到 插件

现在我们将 定时增加的数据传递到插件中去，

在数字减半的方法中新增下面这段代码：

```ts
const vscode = acquireVsCodeApi();

window.addEventListener('message',event =>{
    switch(event.data){
        case 'refactor': 
        count = Math.ceil(count * 0.5);
        counter.textContent = count;
        vscode.postMessage({
            command: 'alert',
            text: ''+count,     // 这里请注意！一定要传递字符串，否则会报错！！！ 
        })
        break;
    }
})
```

现在我们去插件中接收我们的数据：

新介绍一个命令：

`.webview.onDidReceiveMessage(message =>{})` 当 web 内容发布消息时触发

在 `activate` 方法中，补上以下的代码：

```ts
currentPanel.webview.onDidReceiveMessage(message => {
    switch(message.command){
        case 'alert': 
            vscode.window.showErrorMessage(message.text);
    }
})
```

大功告成！

### 7、注意事项

`enableScripts: true`: 可以运行 `script` 脚本，如果不需要请不要将这行代码加进去。

`retainContextWhenHidden: true,` 放在跟上一行一起的位置。作用：当面板被隐藏式，不会销毁，而是在隐藏时继续执行(可以看计数器)。**但请记住，这具有很高的内存开销，并且只应在其他持久性技术不起作用时使用。**

## 三、完成正在键入的文本片段

联想功能能够再在我们编写代码时给予我们便捷。接下来，我们新建一个插件，尝试编写此项功能。

在 `registerCommand` 方法下编写函数，编写前，先要分享几个函数和方法：

`vscode.languages.registerCompletionItemProvider('',{...})`: 注册完成的 Provider。可以为一种语言注册多个提供者

`provideCompletionItems()`:完成项表示用于完成正在键入的文本的文本片段。括号中，还有参数，请直接参考 API。

具体格式如下：

```ts
const provider1 = vscode.languages.registerCompletionItemProvider('plaintext',{
    provideCompletionItems(document:vscode.TextDocument,position:vscode.Position,token:vscode.CancellationToken,context:vscode.CompletionContext){
        return [];
    }
})

context.subscriptions.push(provider1);
```

### 1、基本操作

上面的代码是个人认为的一个可以套用的格式，现在我们来补全代码：

```ts
// plaintext：txt文件。
const provider1 = vscode.languages.registerCompletionItemProvider('plaintext',{
    // 讲解一下这里的参数
    // 1、document:vscode.TextDocument          调用命令的文档
    // 2、position:vscode.Position              调用命令的位置
    // 3、token:vscode.CancellationToken        取消令牌
    // 4、context:vscode.CompletionContext      如何触发完成
    provideCompletionItems(document:vscode.TextDocument,position:vscode.Position,token:vscode.CancellationToken,context:vscode.CompletionContext){

        // 1、先输出一个简单的文字
        // 将属性写到 return 中，那么现在你就可以去启动插件，检测以下这个最简单的效果了。
        const simpleCompletion = new vscode.CompletionItem('this is a simple completion');

        // 2、选择插入文本片段
        // 当你输入`my name` 系统就会显示联想，并且能够在${}地方让你选择，你想要的文字
        const snipetCompletion = new vscode.CompletionItem("my name is ~");
        snipetCompletion.insertText = new vscode.SnippetString('my name is ${1|hang1,hang2,hang3|},hi ${1},mice to meet you !');

        // 3、当我们键入某键时，编辑器能够完成 command 命令的操作
        // 当我键入 `new` 时，补全 `new~` 并且执行一条命令，弹出信息
        const commandCompletion = new vscode.CompletionItem('new');
        commandCompletion.insertText = 'new~';
        // 这个完成项目的种类。根据类型，编辑器选择一个图标
        commandCompletion.kind = vscode.CompletionItemKind.Keyword;
        // 执行这条命令，命令请小伙伴们自己编写，记得激活就行。
        commandCompletion.command = {command: 'extension.sayHello',title: 'sayHello'};

        return [
            simpleCompletion,
            snipetCompletion,
            commandCompletion,
        ];
    }
})

context.subscriptions.push(provider1);
```

好了那么现在启动插件，创建一个 `.txt` 的文件，去尝试一下联想的功能吧。

### 2、弹出联想，助于快速编写代码

举个最简单的例子，当我们在 js 文件中，输入 `console.`时，是不是会弹出 `log()` 的联想提示。

现在我们就在 `.txt` 文件中来实现这个功能。

我们可以继续在上面的代码中编写一下的代码：

```ts
const provider1 = vscode.languages.registerCompletionItemProvider('plaintext',{
    provideCompletionItems(document:vscode.TextDocument,position:vscode.Position,token:vscode.CancellationToken,context:vscode.CompletionContext){
        // 4、键入  `cons..` 时，直接输入 `.` 会自动帮我们补全代码为 `console.` 
        const commitCharacterCompletion = new vscode.CompletionItem('console');
        commitCharacterCompletion.commitCharacters = ['.'];
        return [
            commitCharacterCompletion,
        ];
    })
})
context.subscriptions.push(provider1);
```

完成了以上的代码，还不能够使我们 `.` 出 `log`、`error` 等文字。

我们还需要继续补全代码(再创建一个 `provider`)：

```ts
const provider2 = vscode.languages.registerCompletionItemProvider('plaintext',{
    provideCompletionItems(document:vscode.TextDocument,position:vscode.Position) {
        // 获取你当前输入的文字内容
        const linePrefix = document.lineAt(position).text.substring(0,postion.character);
        if(!linePrefix.endWith('console.')){
            return undefined;
        }
        return [
            new vscode.CompletionItem('log()',vscode.CompletionItemKind.Method),
            new vscode.CompletionItem('error()',vscode.CompletionItemKind.Method),
            new vscode.CompletionItem('111',vscode.CompletionItemKind.Method),
        ];
    }
    // 这里请一定要补充这个代码，否则执行 `.` 时，将不会显示出来。
},'.')

context.subscriptions.push(provider2);
```

好的。那么现在去测试一下效果吧。

## 四、不同的样式修饰不同类型的数字

来编写一个插件：当数字 `<1000` 时，给数字加上边框，当数字 `>1000` 时，给数字加上背景颜色。

新创建一个插件项目，在 `activate` 方法中，编写下面的代码：

### 1、编写两中数字样式

`vscode.window.createTextEditorDecorationType`: 用于向文本编辑器添加修饰

```ts
const smallNumberDecorationType = vscode.window.createTextEditorDecorationType({
    borderWidth: '1px',
    borderStyle: 'solid',
    // vscode 最右边会显示颜色，代码你当前的文字位置，不是必填项
    overviewRulerColor: 'red',
})

const bigNumberDecorationType = vdcode.window.createTextDecorationType({
    // 背景颜色
    backgroundColor: `blue`,
    // 覆盖时光标样式 crosshair：十字架。这个可以自行百度选择自己要的样式
	cursor: 'crosshair',
})
```

### 2、基本操作

```ts
export function activate(context: vscode.ExtensionContext) {
    let editor = vscode.window.activateTextEditor;

    context.subscriptions.push(
        vscode.commands.registerCommand('extension.decorationNumber',() => {
            // 写在下面的方法
            updateDecoration();
        })
    )

    function updateDecoration() {
        vscode.window.showInformationMessage('显示文字样式');
        if(!editor) { return ; }

        const regEx = /\d+/g;
        const doc = editor.document.getText();

        // 定义两个 vscode.DecorationOptions 类型的数组，来存放需要加样式的数字的位置
        const smallNumbers: vscode.DecorationOptions[] = [];
		const largeNumbers: vscode.DecorationOptions[] = [];

        let match;
        while(match = regEx.exec(doc)) {
            // 下面的两行代码：获取开始和结束的位置
            const startPos = editor.document.positionAt(match.index);
            const endPos = editor.document.positionAt(match.index+match[0].length); 

            const decoration = {
                range: new vscode.Range(startPos,endPos),
                // 覆盖数字时，弹出气泡显示
                hoverMessage: 'Number **'+match[0]+'**';
            };
            if(match[0].length<3) {
                smallNumbers.push(decoration);
            }else{
                largeNumbers.push(decoration);
            }
        }
        editor.setDecorations(smallNumberDecorationType,smallNumbers);
        editor.setDecorations(bigNumberDecorationType,largeNumbers);
    }
}
```

好了。那么现在只要执行插件，就能马上看到数字添加样式的效果。

### 3、订阅监听

但是每次写一个数字都要执行一次插件，效果非常的不好。

这里我们就需要用到订阅的知识。

回顾一下，我们之前用到的几个函数方法：

`vscode.window.onDidChangeActiveTextEditor`: 当被激活的编辑器发生改变时触发这个事件

`vscode.workspace.onDidChangeTextDocument`: 当文本改变时发出的事件，通常发生在内容发生变化时，也发生在脏状态情况下

```ts
vsocede.window.onDidChangeActiveTextEditor(editor => {
    if(editor) { updateDecoration(); }
})

vscode.workspace.onDidChangeTextDocument(event => {
    if (activeEditor && event.document === activeEditor.document) {
        updateDecoration();
    }
})
```

好的。那么现在你就可以愉快的测试了。

### 4、做个定时器

如果你不想判断那么频繁，可以做个 `setTimeout`.

自行补充一下代码，如果看不懂、不知道补哪里，可以直接忽略。

```ts
let timeout = NodeJS.Timer | undefined = undefined;

function triggerUpdateDecorations() {
    if(timeout) {
        clearTimeout(timeout);
        timeout = undefined;
    }
    timeout = setTimeout(updateDecorations, 500);
}

vsocede.window.onDidChangeActiveTextEditor(editor => {
    if(editor) { triggerUpdateDecorations(); }
})

vscode.workspace.onDidChangeTextDocument(event => {
    if (activeEditor && event.document === activeEditor.document) {
        triggerUpdateDecorations();
    }
})
```

## 五、进度条显示样式

先展示一下新的命令：

`window.withProgress({location,title,cancellable},(progress, token) => {需要返回一个Promise})`: 在编辑器中显示进度(我将一些参数都放了进去)。

- location: 进度条展示的位置。一般为：`vscode.ProgressLocation.Notification`
- title: 标题栏
- cancellable:是否可以取消，`ture` or `false`
- progress：进度条
- token: 令牌

因为比较简单，所以直接展示代码：

```ts
window.withProgress({
    location: vscode.ProgressLocation.Notification,
    title: 'this is a progress',
    cancellable: true,
},(progress,token) => {
    token.onCancellationRequested(() => {
        console.log('用户取消了长时间运行的操作');
    })
    progress.report({ increment: 0 });

    // increment：进度
    // message：消息
    setTimeout(() => {
        progress.report({ increment: 10, message: "I am long running! - still going..." });
    }, 1000);

    setTimeout(() => {
        progress.report({ increment: 40, message: "I am long running! - still going even more..." });
    }, 2000);

    // 这里用来返回，我把它理解成固定写法
    var p = new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 5000);
    })
    return p;
})
```

测试效果即可。






