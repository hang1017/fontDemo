# TypeScript 学习文档

## 安装

```bash
npm install -g typescript   //安装

tsc --version               //检查版本
```

## 师傅翻译教程

创建 `helloworld.ts`,键入

```ts
let message : string = "Hello World";
console.log(message);
```

创建 `tsconfig.json`,键入

```json
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "outDir": "out",        //为编译器指定输出目录
        "sourceMap": true,       //可以在构建期创建源映射
        "allowJs": true,    //接受JavaScript文件作为输入（with allowJs）。
    }
}
```

在终端上键入

```bash
tsc         //会生成 `helloworld.js` 文件，被放在 `out` 目录中。

node helloworld.js      //会输出效果
```

## 官网文档

### 一、教程

#### 1、注释和规范

```js
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
```

#### 2、tsconfig.json

```json
{
    "compilerOptions": {
        "outDir": "./built",
        "target": "es5"
    },
    "include": [
        "./src/**/*"
    ]
}
```

#### 3、从 javaScript 中迁移

```bash
npm install -S @types/lodash    //获取声明文件
```

无法在创建对象后添加属性。只能在创建时，或

```ts
interface Options { color: string; volume: number }

let options = {} as Options;
options.color = "red";
options.volume = 11;
```

#### 4、React 和 WebPack

看下目录结构：

```
proj/
├─ dist/
└─ src/
   └─ components/
```

```bash
npm init            //初始化项目，将项目变成一个 `npm` 包：

npm install -g webpack     //安装 webpack

//将 React和React-DOM 及其文件作为依赖添加到 package.json 中
npm install --save react react-dom @types/react @types/react-dom

//awesome-typescript-loader使用TypeScript的标准配置文件帮助Webpack编译TypeScript代码`tsconfig.json`
//source-map-loader使用TypeScript的任何源映射输出，在生成自己的源映射时通知webpack
npm install --save-dev typescript awesome-typescript-loader source-map-loader
```

```json
{
    "compilerOptions": {
        "outDir": "./dist/",
        "sourceMap": true,
        "noImplicitAny": true,
        "module": "commonjs",
        "target": "es6",
        "jsx": "react"
    },
    "include": [
        "./src/**/*"
    ]
}
```

来写一些代码,一下两个实例代码请放在 `src/components` 中：

```js
import * as React from 'react';

export interface HelloProps { compiler: string; framework: string; }

export const Hello = (props: HelloProps) => <h1>Hello from {props.compiler} and {props.framework}!</h1>;
```

或者

```js
import * as React from 'react';

export interface HelloProps { compiler: string; framework: string; }

export class Hello extends React.Component<HelloProps, {}> {
    render() {
        return (
            <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>
        )
    }
}
```

在 `src` 下创建 `index.tsx`

```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Hello } from "./components/Hello";

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />
    document.getElementById("example")
)
```





