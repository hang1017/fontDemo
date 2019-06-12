# VS code 插件开发中文文档教程

这里我会演示几个实例给大家看：

- 一、状态栏显示 `md` 文件的总字数、状态栏显示全文件选中行数
- 二、显示网页视图 Cat Coding
- 三、完成正在键入的文本片段
- 四、不同的样式修饰不同类型的数字
- 五、进度条显示样式
- 六、创建工作区并添加、删除文件和文件夹
- 七、树视图
- 八、树视图-2(创建自己想要的 item)

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

## 六、创建工作区并添加、删除文件和文件夹

### 1、重识 `package.json`

这个 `demo` 有用到一些新的 `point`。所以以这个例子再补充几个 `package。json` 会用到的属性。

```json
"activationEvents": [
    // 这行代码：访问文件或文件夹时会触发激活事件。当然你可以不用
    "onFileSystem:hang",            
    "onCommand:hang.workspaceInit",     //创建工作区
    "onCommand:hang.fileInit",          //在工作区下创建文件或文件夹
    "onCommand:hang.fileDelete"         //删除在次工作区下的文件或文件夹
],
"contributes":{
    "commands":[                        //这里我把所有的命令都加进去了。小伙伴可以一个一个添加，一个一个尝试
        {
            "command": "hang.workspaceInit",
            "title": "set up workspace",
            "category": "Hang"
        },{
            "command": "hang.fileInit",
            "title": "create file",
            "category": "Hang"
        },{
            "command": "hang.fileDelete",
            "title": "delete file",
            "category": "Hang"
        }
    ],
    "menus": {
        "commandPalette": [                         //这个就是我们平时平时输入命令时，使用到的命令面板
            {
                "command": "hang.workspaceInit",
                "when": "workbenchState != workspace"   //这里指当不是工作区时，会存在这条命令
            },
            {
                "command": "hang.fileInit",
                "when": "workbenchState == workspace"   //这里指当是工作区时，会存在这条命令
            },
            {
                "command": "hang.fileDelete",
                "when": "workbenchState == workspace"
            }
        ]
    }
}                       
```

### 2、学习所需的属性和方法

开始编写项目之前，我们需要先导入一份 `fileSystemProvider.ts` 文件，这份文件在官网 `fsprovider-sample` demo 下有。

`vscode.workspace.updateWorkspaceFolders(0,0,{uri: vscode.Uri.parse('hang:/') ,name: ''});`: 增、删、改 工作区的文件夹

- 0  start: number 开始更新的工作空间的文件夹
- 0  deleteCount: number | undefined | null 要删除的可选工作空间文件夹数。
- `uri`: 路径
- `name`: 自行命名即可

`vscode.workspace.registerFileSystemProvider('',memFs,{isCaseSensitive: true,isReadonly:false})`: 

- 为给定方案注册文件系统提供程序. 我的理解使工作区能够创建文件和文件夹
- `isCaseSensitive`: 不敏感，可以置为 `true`,目前不懂要干嘛
- `isReadonly`: 设置为是否是只读文件

```ts
import * as vscode from 'vscode';
import { MemFS } from './fileSystemProvider';   //导入的那份文件

export function activate(context: vscode.ExtensionContext) {
    const memFs = new MemFS();
    let isWorkspaceExist = false;
    
    // 创建工作区
    context.subscriptions.push(vscode.commands.registerCommand('hang.workspaceInit',() => {
        vscode.workspace.updateWorkspaceFolders(0, 0, {uri: vscode.Uri.parse('hang:/'), name: 'fs-example'});
    }));

    // 文件和文件夹的创建
    context.subscriptions.push(vscode.commands.registerCommand('hang.fileInit',() => {
        if(isWorkspaceExist) { return; }
        // 创建文件夹前先做个判断。不能重复创建了吧
        isWorkspaceExist = true;
        // 这里的传参可以参考直接看我们导入的文件。
        // Buffer.from('这里的为文件的内容')
        memFs.writeFile(vscode.Uri.parse('hang:/test.md'), Buffer.from('this is aa'), {create: true, overwrite: true});
        // 创建文件夹
        memFs.createDirectory(vscode.Uri.parse('hang:/file/'));
        memFs.writeFile(vscode.Uri.parse('hang:/file/aa.txt'), Buffer.from('this is aa'), {create: true, overwrite: true});
    }));
}
```

好了。那么现在完成了50%，可以去测试一下效果了。

成功的创建了工作空间，但是发现文件和文件夹一直没办法创建是不是？

不着急，因为这里我们需要用到 `registerFileSystemProvider` 提供文件和文件夹的创建

补全上面的代码：

```ts
context.subscriptions.push(vscode.workspace.registerFileSystemProvider('memFs',memFs,{isCaseSensitive: true,isReadonly:false}))

```

好了。那么现在就可以创建文件和文件夹了。

来操作最后一步：删除该工作空间的文件和文件夹

```ts
context.subscriptions.push(vscode.commands.registerCommand('hang.fileDelete',() => {
    for(const [name] of memFs.readDirectory(vscode.Uri.parse('hang:/'))){
        memFs.delete(vscode.Uri.parse(`hang:/${name}`));
    }
}))
```

完成！

## 七、树视图

`demo` 的案例比较复杂，所以我们可以先跟着官网教程一步一步走。

首先，我们先创建出一个视图容器，并将该视图显示出来。

开始之前。我们先将视图的图片导入进项目中。再官网 `demo` 中，有一个 `media` 和 `resources` 的包。

里面放着的就是官网显示的视图图片，我们可以直接先用它的，放的位置不变即可。

### 1、重识 `package.json`

这个 `demo` 有用到一些新的 `point`。所以以这个例子再补充几个 `package。json` 会用到的属性。

`contributes.viewsContainers`: 为自定义视图提供视图容器。并且只能把它提供给活动栏 `activitybar`

`contributes.views`: 可以向内置或提供的视图容器添加新视图

```json
"contributes": {
    "viewsContainers": {
        "activitybar": [
            {
                "id": "hang-explorer",          //视图容器的ID
                "title": "Hang-Explorer",       //视图容器的标题
                "icon": "media/dep.svg"         //图标
            }
        ]
    },
    "views": {
        "hang-explorer": [                      //上面创建的视图容器的 ID
            {
                "id": "hang-node",              //这才是视图的 ID
				"name": "Hang-Node"             //视图的名称，会显示在最上方
            }
        ]
    },
    "commands": [                               //这个我没有修改。
        {
            "command": "extension.helloWorld",
            "title": "Hello World"
        }
    ]
}
```

好的，如果你现在运行插件，你是看不到新的视图的。因为我们需要激活它。

`onView`: 只要展开指定的 ID 视图，就会激活感兴趣的插件。

```json
"activationEvents": [
    "onView:hang-node",                     // 激活创建的视图名称
]
```

### 2、基本操作

那么现在树视图的图标就会显示在视图容器上了。因为现在树视图还没有被注册，所以并没有内容。

现在我们还需要导入一份官网提供的文件 `nodeDependencies.ts` 将这份文件放在 `src` 下。官网树视图有提供代码，或者可以直接 copy demo 上的代码。

介绍一个命令

`registerTreeDataProvider()`: 为插件 `contributes` 注册的视图创建 `view`。将允许向 `treeView` 提供数据，并在数据更改时进行更新。

编辑 `extension.ts`  文件

```ts
import * as vscode  from 'vscode';
import { DepNodeProvider, Dependency } from './nodeDependencies';   //导入那份文件所需要的类

export function activate(context: vscode.ExtensionContext) {
    // vscode.workspace.rootPath: 在编辑器中打开的文件夹    如果出现报错，没关系。运行就可以了。
    const nodeDependenciesProvider = new DepNodeProvider(vscode.workspace.rootPath);
    // '' 里面的内容为 你 创建的 树视图的ID
    vscode.window.registerTreeDataProvider('hang-node',nodeDependenciesProvider);
}
```

好的。那么现在运行插件，随意打开之前创建过的插件文件，点击树视图。你会看到一些新的东西。

### 3、创建树视图的增、删、改、刷新图标和操作

#### 第一步：重识 `package.json`

`package.json` 有新的知识需要认识和讲解。

添加增、删、改、刷新四条命令，小伙伴们页可以一条一条的添加这样效果会更加清楚。

```json
"commands"： [
    {
        "command": "hang-node.refreshEntry",
        "title": "Refresh-node",
        "category": "Hang",
        "icon": {
            "light": "resources/light/refresh.svg",
            "dark": "resources/dark/refresh.svg"
        }
    },
    {
        "command": "hang-node.addEntry",
        "title": "Add-node",
        "category": "Hang"
    },
    {
        "command": "hang-node.editEntry",
        "title": "Edit-node",
        "category": "Hang",
        "icon": {
            "light": "resources/light/edit.svg",
            "dark": "resources/dark/edit.svg"
        }
    },
    {
        "command": "hang-node.deleteEntry",
        "title": "Delete-node",
        "category": "Hang"
    }
],
// 上面只是创建了四个命令，接下来我们要在树视图菜单中将此显示出来。
"menus": {
    // 在视图标题中显示操作的位置
    "view/title":[
        {
            "command": "hang-node.refreshEntry",
            "when": "view == hang-node",
            "group": "navigation"                   //显示在第一条上
        },
        {
            "command": "hang-node.addEntry",
            "when": "view == hang-node"             //视图为 `hang-node` 的视图
        }
    ],
    // 显示树项的操作的位置。
    "view/item/context": [
        {
            "command": "resources/light/edit.svg",
            "when": "view == hang-node && viewItem == dependency",  //我的理解是当该项为节点的时候
            "group": "inline"                       //出现在每一项的边上
        },
        {
            "command": "hang-node.deleteEntry",
            "when": "view == hang-node && viewItem == dependency"
        }
    ]
}
```

好的。那么现在重新运行一下插件，你就会在树视图看到 增、删、改、刷新这四个图标。但是还并不能用，接下来我们来注册一下。

#### 第二步：注册图标命令

打开 `extension.ts` 文件，新增下面的代码：

```ts
vscode.commands.registerCommand('hang-node.refreshEntry', () => nodeDependenciesProvider.refresh());
	vscode.commands.registerCommand('hang-node.addEntry',() => vscode.window.showInformationMessage(`hang-node___add~`));
	vscode.commands.registerCommand('hang-node.editEntry',(node: Dependency) => vscode.window.showInformationMessage(`hang-node___edit:${node.label}~`));
	vscode.commands.registerCommand('hang-node.deleteEntry',(node: Dependency) => vscode.window.showInformationMessage(`hang-node___delete:${node.label}~`));
```

如果有心的小伙伴会打开看看 `nodeDependencies.ts` 文件是里面的内容有什么。你可能就会发现：不止有 `refresh()` 方法。

还有 `getTreeItem(node)`、`getChildren(node)` 的方法，小伙伴都可以尝试一下。

好了。现在去展示一下效果吧~

### 4、创建一个可以修改 `json` 文件的视图

首先先导入 demo 中的 `jsonOutline.ts` 文件。

这里一样需要两步来完成，第一步：重识 `package.json`、第二步：完成注册命令。

下面的代码为：补充代码，忽略了之前已经完成的代码，所以之前写完的代码别删了。

```json
"activationEvents":[
    "onView:hang-node",
    "onView:hang-jsonOutLine",              // 激活创建视图的名称
    "onLanguage:json",                      // 当文件为 json 时就激活插件，当然你不写也可以
    "onLanguage:jsonc"                      // 同上
],
"contributes": {
    "views": {
        "hang-explorer": [
            {
                "id": "hang-jsonOutLine",
                "name": "Hang-jsonOL",
                "when": "jsonOutlineEnabled"        // 当文件为 json 时才显示
            }
        ]
    }
}
```

编辑 `extension.ts` 文件：

```ts
// 导入文件
import { JsonOutlineProvider } from './jsonOutline';

const jsonOutlineProvider = new JsonOutlineProvider(context);
vscode.window.registerTreeDataProvider('hang-jsonOutLine',jsonOutlineProvider);
```

如果你现在去测试插件效果，你可能会**遇到 `缺少 modules 组件 jsonc-parser` 而报错**。

如果遇到这种情况，不要着急。**打开终端：键入 `npm install jsonc-parser`。** 安装完成后。执行插件。

当你打开 `json` 文件，你就能看到你新创建的视图。但是现在这个视图还没办法进行任何操作。所以我们继续完成我们的代码。

接下来我们要继续编写 `package.json` 文件，完成 全局刷新、单个元素刷新、元素重命名 的命令

```json
"contributes": {
    "commands": [
        {
            "command": "hang-json.refresh",             // 全局刷新
            "title": "Refresh-json",
            "category": "Hang",
            "icon": {
                "light": "resources/light/refresh.svg",
                "dark": "resources/dark/refresh.svg"
            }
        },
        {
            "command": "hang-json.refreshNode",         // 刷新单个节点
            "title": "RefreshNode-json",
            "category": "Hang",
            "icon": {
                "light": "resources/light/refresh.svg",
                "dark": "resources/dark/refresh.svg"
            }
        },
        {
            "command": "hang-json.renameNode",          // 重命名节点
            "title": "RenameNode-json",
            "category": "Hang"
        }
    ],
    "menus": {                                          // 这里的内容应该上面已经说过了。忘记了请参考 1033 行
        "view/title": [
            {
                "command": "hang-json.refresh",
                "when": "view == hang-jsonOutLine",
                "group": "navigation"
            }
        ],
        "view/item/context": [
            {
                "command": "hang-json.refreshNode",
				"when": "view == hang-jsonOutLine",
				"group": "inline"
            },
            {
                "command": "hang-json.renameNode",
				"when": "view == hang-jsonOutLine",
				"group": "inline"
            }
        ]
    }
}
```

接下来注册一下这些命令：

```ts
vscode.commands.registerCommand('hang-json.refresh',() => jsonOutlineProvider.refresh());
vscode.commands.registerCommand('hang-json.refreshNode',(offset) => jsonOutlineProvider.refresh(offset));
vscode.commands.registerCommand('hang-json.renameNode',(offset) => jsonOutlineProvider.rename(offset));
```

好了。那么现在去尝试一下效果吧~

### 5、创建文件和文件夹的视图

现在我们来创建一个显示当前文件和文件夹的视图，就类似于我们的资源管理器里存放的文件。点击文件能够打开。

创建视图命令

```json
"activationEvents": [
    "onView:fileExplorer",
],
"contributes": {
    "views": {
        "hang-explorer": [
            {
                "id": "fileExplorer",               //这里我建议你，先用这个ID。后面我会告诉你为什么。
				"name": "Hang-fileExplorer"
            }
        ]
    },
    "commands": [
        {
            "command": "hang-file.refresh",
            "title": "Refresh-file",
            "category": "Hang",
            "icon": {
                "light": "resources/light/refresh.svg",
                "dark": "resources/dark/refresh.svg"
            }
        },
        {
            "command": "fileExplorer.openFile",     // 这里我也建议你使用该 ID,这可以省下你很多事情
            "title": "Open-file",
            "category": "Hang"
        }
    ],
    "menus": {
        "view/title": [
            {
                "command": "hang-file.refresh",
				"when": "view == fileExplorer"
            }
        ],
        "view/item/context": [
            {
                "command": "hang-file.refresh",
                "when": "view == fileExplorer && viewItem == file",     // 当选中项问文件时
                "group": "inline"
            }
        ]
    }
}
```

在官网 demo 中 `src` 下，你能找到 `fileExplorer.ts` 文件，将此文件导入到你的 `src` 下：

现在编辑 `extension.ts` 文件：

```ts
import { FileExplorer, FileSystemProvider } from './fileExplorer';

// 导入了上面的文件，你只要写下下面这行代码，那么你的 file 视图就能使用了。
new FileExplorer(context);
```

至于为什么呢，我们现在就打开 `fileExplorer.ts` 来一看究竟。

将文件拉到最下方，你就能看到这段代码： 

```ts
export class FileExplorer {

	private fileExplorer: vscode.TreeView<Entry>;
	constructor(context: vscode.ExtensionContext) {
		const treeDataProvider = new FileSystemProvider();
		this.fileExplorer = vscode.window.createTreeView('fileExplorer', { treeDataProvider });
		vscode.commands.registerCommand('fileExplorer.openFile', (resource) => this.openResource(resource));
	}
	private openResource(resource: vscode.Uri): void {
		vscode.window.showTextDocument(resource);
	}
}
```

细心的小伙伴就会明白为什么刚才在 `package.json` 文件中叫你不要修改 ID。因为 `constructor()` 初始化函数都帮你写好了。

那么现在我们注释掉 `new FileExplorer(context);` 这段代码，我们来重新写一个。

这里就需要用到我们刚刚从 `fileExplorer.ts` 文件中导入的 `FileSystemProvider` 了。

```ts
const treeDataProvider = new FileSystemProvider();
// 'fileExplorer' 为你创建的视图 ID
vscode.window.createTreeView('fileExplorer',{ treeDataProvider });
// 'fileExplorer.openFile' 这里的命令名称不要改，改了就不能用了，打不开文件了
// 我也不知道为什么，研究了半天，你可以尝试一下
vscode.commands.registerCommand('fileExplorer.openFile', (resource) => {
    vscode.window.showInformationMessage('open file');
	vscode.window.showTextDocument(resource);
})
vscode.commands.registerCommand('hang-file.refresh', () => {
    // 这里我没有找到 refresh 函数，所以就只是弹个框，你们可以自己去找找。
    vscode.window.showInformationMessage('refresh file');
});
```

## 八、树视图-2(创建自己想要的 item)

### 1、创建自己想要的子项

要想创建自己想要的项，就要用到 `TreeItem`。自己构造函数。

打开[官网 API](https://code.visualstudio.com/api/references/vscode-api),全局搜索 `TreeItem`。

找到 `CONSTRUCTORS` 翻译成中文就是 `构造函数`。

有两个方法，我们用第一个来构造一个函数。

在 `src` 下创建一个 `.ts` 文件。如：`HangItemProvider.ts`. 最好(建议)以 `Provider` 作为后缀。

我们先来完成构造函数：

```ts
import * as vscode from 'vscode';
import * as path from 'path';

export class MenuItemNode extends vscode.TreeItem {
    // 这里就是写初始化参数传递的地方
    constructor (
        // 这是官网上需要传递的两个函数
        public readonly label: string,
        // TreeItemCollapsibleState: 树项的可折叠状态
        // 有 Collapsed、Expanded、None 这三种属性，官网里可以找到
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        // 这里是因为我们需要给每个 Item 加 命令
        public readonly command?: vscode.Command
    ){
        // 这里我不懂为什么照抄就行了
        super(label, collapsibleState);
    }
}
```

官网上 `PROPERTIES` 属性，小伙伴们有需要都可以往构造函数里加。

那么构造函数就被我们完成了。是不是很简单。

接下来。我们就来创建刚刚构造的树视图的 `TreeDataProvider`.

开始编写代码前，先熟悉一下详细熟悉一下几个文字：

`TreeDataProvider`: 为程序提供树视图的数据。

`onDidChangeTreeData`: 用于表示元素或根已更改的可选事件

下面是方法：

`getChildren (element ：T)`: 获取孩子节点

`getTreeItem (element ：T)`: 获取下面的项，和上面的差不多。但是有所不同



将下面的代码补充在 `HangItemProvider.ts` 下

```ts
// 当你输入下面的代码， className 会报错。点击快速修复会自动帮你补全 onDidChangeTreeData、getChildren、getTreeItem
export class HangItemProvider implements vscode.TreeDataProvider<MenuItemNode> {
    onDidChangeTreeData?: vscode.Event<MenuItemNode | null | undefined> | undefined;  

    // 修改这里的代码，将树视图下的所有项显示出来(我是这样理解的)
    getTreeItem(element: MenuItemNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
        // throw new Error("Method not implemented.");
        return element;
    }

    // 在这里你就可以添加你想要的子项。
    getChildren(element?: MenuItemNode | undefined): vscode.ProviderResult<MenuItemNode[]> {
        let trees = [];
        let menuItemList = [
            {"command":"hang-item.Projects","icon": "","label": "Projects"},
            {"command":"hang-item.Settings","icon": "","label": "Settings"},
        ]
        // 如果不存在，才创建项
        if(element === null || element === undefined) {
            for(let i = 0; i<menuItemList.length; i++) {
                // 构造函数，传递命令，标题
                let treeItem = new MenuItemNode(menuItemList[i].label, vscode.TreeItemCollapsibleState.None, {
                    command: menuItemList[i].command,
                    title: menuItemList[i].command
                })
                trees.push(treeItem);
            }
            return trees;
        }
        return null;
    }
}
```

好了。那么至此，我们就创建了一个我们自己想要的视图和项

如果小伙伴有详细看我 `七、树视图` 的话，那么应该知道接下来我们就要去创建、激活和注册这些项了。

首先补充 `package.json` :

```json
"activationEvents": [
    "onView:hang-item",
],
"contributes": {
    "views": {
        "hang-explorer": [
            {
                "id": "hang-item",
                "name": "Hang-TreeItem"
            }
        ]
    },
    "commands": [                           // 给两个项都补充上命令
        {
            "command": "hang-item.Projects",
            "title": "Projects",
            "category": "Hang"
        },
        {
            "command": "hang-item.Settings",
            "title": "Settings",
            "category": "Hang"
        }
    ]
}
```

最后一步：去 `extension.ts` 注册：

```ts
import { HangItemProvider,MenuItemNode } from './HangItemProvider';

const hangItemProvider = new HangItemProvider();
// ''里放的是 package.json 里的 id
vscode.window.registerTreeDataProvider('hang-item',hangItemProvider);
// 完善一下两个点击事件呗~
vscode.commands.registerCommand('hang-item.Projects', () => {
    vscode.window.showInformationMessage('show Projects Item');
});
vscode.commands.registerCommand('hang-item.Settings', () => {
    vscode.window.showInformationMessage('show Settings Item');
});
```

好了。可以展示一波骚操作了~

### 2、创建自己想要的文件夹

其实思路和上面的差不多，就是多加了一些类型的判断。写了那么多 `package.json` 注册命令，这里我就不再重复了。忘记的小伙伴们自行翻找上面的文章就行。

现在在 `src` 的目录下创建一个 `.ts` 文件，命名随意，如： `HangFileProvider.ts` 

```ts
import * as vscode from 'vscode';

// 这里创建一个枚举，用来做判断节点的类型
export enum myTreeKind {
    MR,                 // 这里可以理解为 目录
    file,               // 这里可以理解为 文件夹
    comment,            // 这里可以理解为 节点和命令
    catatory,           // 目前没有用到，可删除
    issue,              // 目前没有用到，可删除
}

// 这里创建一个用来存放改节点下的文件或文件夹的接口
export interface myTreeFilesNode {
    fileName: string;
}

// 接下来就是熟悉的： 创建构造函数
export class myTreeNode extends vscode.TreeItem {
    constructor(
        // 创建一个命名，标识
        public readonly label: string,
        // 创建一个 面板折叠的状态判断 
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        // 用来存放文件和文件夹的，如果无，传参可传 []
        public readonly myFiles: myTreeFilesNode[],
        // 判断节点类型 
        public readonly kind: myTreeKind,
        // 节点的命令，可不传，因为带？ 所以是非必传项
        public readonly command?: vscode.Command,
    ){
        super(label, collapsibleState);
    }
}

// 剩下最后一步了不是嘛？
export class HangFileProvider implements vscode.TreeDataProvider<myTreeNode> {
    // 这是一个图标参数，我页不知道路径，这行代码复制了就可以用了。一个文件夹总需要打开和关闭的图标吧
    public static iconName = "C:\\Users\\Desktop\\code-1227\\WeCodeForVSCode\\code\\media\\image\\unHandle.png";

    // 创建一个树，这里不知道怎么解释，就是理解成一个属性就行了，看看下面 `getChildren()` 里的代码应该就知道了。
    public static tree: myTreeNode[] = [];

    constructor(){}

    onDidChangeTreeData?: vscode.Event<myTreeNode | null | undefined> | undefined;
    getTreeItem(element: myTreeNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }
    getChildren(element?: myTreeNode | undefined): vscode.ProviderResult<myTreeNode[]> {
        let trees: myTreeNode[] = [];

        if(element === undefined || element === null) {
            // 如果存在就添加进去，在初始化是，将 tree 创建和传递进来
            if(HangFileProvider.tree !== undefined) {
                // 循环遍历 tree,将他们都添加到 视图中
                for(let i = 0; i<HangFileProvider.tree.length; i++) {
                    let currentElement = HangFileProvider.tree[i];
                    if(currentElement.label === 'hangFile1') {
                        // 创建一个节点 节点里添加两个节点
                        // 这里详细讲解一下传递参数的内容
                        // label : 节点的名称，标识
                        // TreeItemCollapsibleState： 开关
                        // {} ： 在该节点下创建两个节点
                        // myTreeKind.MR： 设置节点类型的判断
                        let myTree = new myTreeNode(currentElement.label, vscode.TreeItemCollapsibleState.Expanded, [{ fileName: "test1.cpp" }, { fileName: "test2.cpp" }], myTreeKind.MR,{
                            // 命令可有可无
                            command: "hangFile1",
                            title: "hangFile1"
                        });
                        myTree.contextValue = 'hangFile1';  //没啥，命名相同即可
                        myTree.tooltip = 'hangFile1';       // 覆盖节点时的一个小气泡
                        myTree.iconPath = currentElement.iconPath;  //图标的路径
                        trees.push(myTree);
                    }
                }
            }
        }
    }
    // 有了上面的代码，我们现在至少能展示到一层
    // 现在来初始化一下数据看看效果吧
    // 下面的代码应该不难理解了。
    public static initHangFileTreeList() {
        const hangFileProvider = new HangFileProvider();
        vscode.window.registerTreeDataProvider('hang-file', hangFileProvider);
        // label : 节点的名称，标识
        // TreeItemCollapsibleState： 开关
        // {} ： 在该节点下创建两个节点
        // myTreeKind.MR： 设置节点类型的判断
        HangFileProvider.tree.push(new myTreeNode(
            "hangFile1", 
            vscode.TreeItemCollapsibleState.Collapsed, 
            [],
            myTreeKind.MR
        ));
    }
}
```

接下来我们打开 `extension.ts` 文件来使用一下插件吧

```ts
import { HangFileProvider } from './HangFileProvider';
HangFileProvider.initHangFileTreeList();
```

就是这么简单。小伙伴们打开插件不能用不要着急，请检查两个地方：

- `package.json` 都注册了嘛？`activationEvents` 和 `views` 都添加了嘛？
- 运行插件的时候有没有报错了，比如：提示 `no found` 可能是你代码写快啦，拼错啦。仔细检查哈。

但是现在只是创建了一个文件夹，文件夹下的内容并没有显示出来。我们来补充完整，继续补充 `HangFileProvider.ts`

```ts
getChildren(element?: myTreeNode | undefined): vscode.ProviderResult<myTreeNode[]> {
    let trees: myTreeNode[] = [];
    if(element === undefined || element === null) {
        // 这里的代码上面有，已忽略
    } else {
        if(element.kind === myTreeKind.MR) {
            // 遍历你存放进来的文件夹
            for(let i = 0; i<element.myFiles.length; i++) {
                // 获取每一个文件对象
                let currentElement = element.myFiles[i];
                // 第一个参数其实就是 label
                // 2、面板状态
                // 3、内容的数组，你可以为空，在下面那么判断条件里加也可以
                // 4、节点类型
                // 5、命令。非必填
                let currentNode = new myTreeNode(currentElement.fileName, vscode.TreeItemCollapsibleState.Collapsed, [],  myTreeKind.file);
                trees.push(currentNode);
            }
        } else if(element.kind == myTreeKind.file) {
            let mrissue_node = new myTreeNode('comment', vscode.TreeItemCollapsibleState.None, [], myTreeKind.comment);
            trees.push(mrissue_node);
        }
    }
}
```

好了。去尝试一下效果吧~











