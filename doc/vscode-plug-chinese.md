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
}
```





