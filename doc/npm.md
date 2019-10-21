# npm 官网文档

## npm 是什么

Node Package Manager

 思路大概是这个样子(百度)：

 - 买个服务器作为代码仓库，在里面放所有需要被共享的代码
 - 发邮件告诉 `jQuery`、`Bootstrap` 等作者告诉他们把代码 `npm publish` 到 仓库上
 - 社区的人想使用代码就把这些写到 `package.json` 中，然后运行 `npm i`, `npm` 就会帮他下载代码
 - 下载完的代码在 `node_modules` 中，就可以随意使用了。



### npm 有什么用

- 根据应用程序调整软件包，或按原样合并它们
- 下载可以立即使用的独立工具
- 不使用npx下载就运行包
- 在任何地方与任何npm用户共享代码
- 将代码限制为特定的开发人员
- 组建虚拟团队（ORG）
- 管理多个版本的代码和代码依赖项
- 更新底层代码时轻松更新应用程序
- 发现解决同一难题的多种方法
- 找到其他正在处理类似问题的开发人员

### 如何查找包

- 节点模块，可以在服务器端使用
- 添加命令以便在命令行中使用的包
- 可在网站前端使用的包

## 如何安装 npm 并管理

安装最新版本的 `npm`: `npm install npm@latest -g`

安装最新的官方测试版本：`npm install npm@next -g`

## 如何防止权限错误

- 使用版本管理器重新安装NPM（推荐）
- 手动更改NPM的默认目录

## 如何安装本地包

`npm install <package_name>`

## 使用 `package.json`

在 `package.json` 文件中：

- 列出项目所以来的包
- 允许您使用语义版本控制规则指定项目可以使用的包的版本
- 是您的构建可复制，因此更容易与其他开发人员共享

### `package.json` 包中的东西

- `name`: 项目名称
- `version`: 版本号
- `author`: 作者
- `main`: 指定加载的入口文件
- `config`: 用来添加命令行的环境变量
- `scripts`: 指定了运行脚本命令的npm命令行缩写
- `dependencies`: 指定了项目运行所依赖的模块
- `devDependencies`: 指定了项目开发所需要的模块

### 创建 `package.json` 的两种方法

- 通过 CLI 创建调查表

`npm init`

启动一个命令行调查表，会在目录中创建一个 `package.json` 

- 创建默认的 `package.json`

`npm init --yes`

从当前目录中提取信息生成默认的 `package.json`

### 指定依赖项

- `dependencies`: 生产中的应用程序需要这些包
- `devdependencies`: 这些包仅用于开发和测试

- `npm install <package_name> --save`: 向 `dependencies` 中添加 `.json` 的依赖项
- `npm install <package_name> --save-dev`: 向 `devdependencies` 中添加 `.json` 的依赖项

## 如何更新本地安装包

在 `package.json` 文件所在的目录中执行 `npm update` 命令

执行 `npm outdated` 命令。不应该有任何输出 用于检查模块是否已经过时

## 如何卸载本地安装的包

- npm uninstall package(卸载node_modules目录下的包)
- npm uninstall --save package(卸载 `package.json` 中的生产环境上的参数)
- npm uninstall --save-dev package(卸载 `package.json` 中的开发测试环境上的参数)

## 如何安装全局的包

`npm install -g jshint`

## 如何更新全局安装的包

- `npm update -g jshint`: 更新某个包
- `npm outdated -g --depth=0.`: 查看某个包是否过时
- `npm update -g`: 更新全部的包
- `npm install npm@latest -g.`: 更新至最新版本的包

## 如何卸载全局安装的包

`npm uninstall -g jshint`

## 如何创建 node.js 模块

这个自行百度

## 如何发布和更新你的包

如何更新版本号

`npm version <update_type>`

## 如何使用语义化版本

`1.0 || 1.0.x || ~1.0.4`: 补丁版本

`1 || 1.x || ^1.0.4`: 次要版本

`* || x`: 主要版本

## 如何使用作用域

作用域将相关的包分组在一起，并为 `npm` 模块创建一个命名空间

如果包以 `@` 开头，则代表这是一个作用域包，范围是 `@` 和斜线之间的所有内容

`@scope/project-name`

### 如何初始化作用域包

创建作用域的包，只需使用以作用域开头的包名称

```json
{
  "name": "@username/project-name"
}
```

如果你一直使用相同的作用域，则可以在 `.npmrc` 文件中设置下面的选项

`npm config set scope username`

### 发布作用域包

私有作用域是要付费的。

如果要发布公共作用域模块，请在发布时设置访问选项，此将保留为后续发布设置：

`npm publish --access=public`

## 使用作用域包

要使用作用域的包，只要在使用包名称的任何位置包含作用域即可


```json
{
  "@username/proj name": "^1.0.0"
}
```

```bath
npm install @username/project-name --save
```

```js
var projectName = require('@/username/project name');
```

## 如何使用 dist 标签标记软件包

`dist-tags`: 分发标记有什么用？

组织和标记不同的版本，除了比 semver 编号更具可读性以外，标记还允许发布者更有效的分发其包

要将包添加到特定版本：

```bath
npm dist-tag add <pkg>@<version> [<tag>]
```

### 发布 tags

默认情况下，npm publish 将用最新的 tag 来标记包，如果使用 `--tag`，则可以指定要使用的另一个标记,如：下面将发布带有 `beta` 标记的包。

`npm publish --tag beta`

### 用标签安装

`npm i` 默认使用最新的包，如果要带标记,如安装带 `beta` 版本的 `somepkg` 包：

`npm install somepkg@beta`

### 警告

由于 `dist` 标记和 `semver` 共享同一名称空间，请避免使用可能导致冲突的标记名。

最佳做法：避免使用以数字或者 `V` 开头的标记

## 学习包和模块

`node.js` 和 `npm` 对和模块有非常具体的定义，讨论这些定义，使他们不同，并解释为什么某些默认文件的命名方式是这个样子

### 快速摘要

`包`是由 `package.json` 描述的文件或目录

`模块` 是可以从 `Node.js` 下载到的任何文件和目录。

### 什么是包：

- 包含 `package.json` 文件，描述程序的文件夹
- 包含上述文件夹的格式化的原始码
- 解析上面原始码的 url
- 通过上面的url，将 `<name>@<version>` 发布上仓库
- 能够通过 `<name>@<version>` 来进行引入
- 通过引入，能够成为一个标签

### 什么是模块

- 包含 `package.json` 文件，且包含主字段的文件夹
- 包含 `index.js` 文件的文件夹
- 一个 `javascript` 的文件

### 大多数 `npm` 包都是模块

通常， `node.js` 程序中使用的 `npm` 包都通过 `require` 加载。但是没有要求 `npm包` 一定要是个模块。

有些包，比如 `cli` 包，只包含一个可执行的命令行界面，不提供 `node.js` 程序的主字段，这些包不是模块

### node.js 和 npm 生态系统中的文件和目录名

`package.json` 定义包

`Node.js` 通过 `node_modules` 查找模块的位置

如果在 `node_modules` 中创建一个 `foo.js` 文件，执行 `var f = require('foo.js')` 的程序，它将加载该模块，但是因为 `foo.js` 不是 `pachage`，因为没有 `package.json` 文件。

或者如果存在 `package.json` 的文件中没有 `index.js` 或者 `main` 字段，则它也不是模块。即使安装了 `node_modules` 也不能作为 `require()` 的参数。


## npm 用法

### npm-coding-style

npm 的编码风格有点不传统，这是精心设计的，减少视觉上的混乱

- 保持 `Line Length` 于80个字符
- 缩进使用两个空格
- 尽量不使用分号，除非不得已
- 逗号放在下一行的开头
- 字符串使用单引号，避免被转义
- `ballBack` 始终是列表中的最后一个参数，第一个参数应该是 error, null

### npm-config

关于 npm 配置的更多信息


















-----------------

## 命令行

### npm-access

用于设置已发布包的访问级别

#### 将包设置为可访问或者受限制的

- npm access public [`<package>`]
- npm access restricted [`<package>`]

#### 添加或删除用户或者团队对包具有只读或者读写访问权限的功能

- npm access grant <`read-only|read-write`> <`scope:team`> [`package`]
- npm access revoke <`scope: team`> [`package`]

#### 配置包是否要求发布包的任何人在其账户上启用涮因素身份验证

- npm access 2fa-required [`package`]
- npm access 2fa-not-required [`package`]

#### 显示用户或团队能够访问的所有包以及访问级别，只读公共包除外

- npm access ls-packages [`<user>|<scope>|<scope: team>`]

#### 显示包的所有访问权限，将只显示对您至少具有读取权限的包的权限

- npm access ls-collaborators [`<package>` [`user`]]

#### 使用 `$editor` 立即设置包的访问权限 

- npm access edit [`<package>`]

#### 详情

`npm access` 始终在当前仓库上运行，可以使用 `--registry=<registry url>` 从命令行进行配置

作用域包默认为 `restricted`，但可以使用 `npm publish --access=public` 将其发布为 `public`, 或者在初始发布之后使用 `npm access public` 将其访问设置为 `public`

以下为具有设置包访问权限的权限

- 您是非作用域或者作用域包的所有者 
- 您是该作用域包的团队成员
- 您已经被赋予读写权限，可以作为团队，也可以直接作为所有者

如果启动了双因素身份验证，则进行访问更改时，必须传入带有 `--otp`

如果账户没有付费。则要使用 `--access=public`

### npm-adduser

添加仓库用户

- npm adduser `[--registry=url] [--scope=@orgname] [--always-auth] [--auth-type=legacy]`

aliases: login, add-user

在指定的仓库中创建的用户，将凭据保存到 `.npmrc` 文件中。如果未指定仓库，则将使用默认的仓库

npm包仓库是基础 url, 如果指定了作用域，该仓库将仅用于该作用域的包，作用域默认为当前所在项目目录的作用域

例如：

```bath
npm adduser --registry=http://myregistry.example.com --scope=@myco

npm adduser --registry=http://private-registry.example.com --always-auth
```

###  npm-audit

运行安全审核

```bath
npm audit [--json|--parseable]
npm audit fix [--force|--package-lock-only|--dry-run|--production|--only=dev]
```

`npm audit fix`: 

扫描项目中的漏洞，并自动安装对易受攻击依赖项的任何兼容更新

`$ npm audit fix --package-lock-only`:

在不修改 `node_modules`下，运行 `fix`，但是仍然更新 `pkglock`

`$ npm audit fix --only=prod`:

跳过更新 `devDependencies`.

`$ npm audit fix --force`: 

让 `audit fix` 将 `semver-marjor` 更新安装到顶层依赖项。而不仅仅是与 `server` 兼容的依赖项





