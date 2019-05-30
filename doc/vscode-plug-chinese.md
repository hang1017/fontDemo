# VS code 插件开发中文文档教程

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









