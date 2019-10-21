# yarn 官方文档

## 二、yarn 工作流

### 管理依赖

1、添加依赖

- yarn add [package]
- yarn add [package]@[version]
- yarn add [package]@[tag]

会自动将包添加到 `package.jsoon` 的依赖项中，还会更新 `yarn.lock` 文件以反映更改。

通过指定依赖项版本或标记，可以指定要安装的包版本。

2、 升级依赖

- yarn upgrade [package]
- yarn upgrade [package]@[version]
- yarn upgrade [package]@[tag]

同样也会升级你的 `package.json` 和 `yarn.lock` 文件

3、删除包

- yarn remove [package]

### 安装依赖

安装时会从 `package.json` 文件中检索，并存储在 `yarn.lock` 文件

什么时候我们要安装依赖呢：

- 当刚刚 `checkout` 依赖项，并且项目需要这个依赖项才能运行
- 别的开发者添加了新的依赖项，我们需要去获取它

#### 安装选项

- yarn : 安装全部依赖项
- yarn i --flat : 只安装一个版本的软件包
- yarn i --force : 强制重新下载所有软件包
- yarn i --production : 只安装生产上的包

- ～：代表最后一位非精确数字的上限和下限
- ^：允许不修改版本中的第一个非零位的更改

## 三、CLI 命令行

### yarn add 

不说了～

### yarn audit

对包进行漏洞审核

`yarn audit [--verbose] [--json]`

如果审核发现任何严重的问题，命令将以 `non-0` 退出。

支持 `--json` 标志，将以 `json` 格式输出问题的详细信息

### yarn autoclean

从包依赖项中清楚和移除不必要的文件

`yarn autoclean [-I/--init] [-F/--force]`

删除不必要的文件或文件夹来释放空间，减少模块的文件数。不建议使用，永久删除节点模块可能导致包停止工作。

如果要启动自自动清洁的功能，手动创建一个 `.yarnclean` 文件，或者运行 `yarn autoclean --init`

`-I/--init`: 如果不存在 `.yarnclean` 文件，并添加默认条目。尽量不要使用这个命令，因为这个命令会自动填充一些要删除的默认项。所以清楚前，先检查文件。

`-F/--force`: 如果存在上述文件将运行清楚过程，如果文件不存在，则什么也不做

### yarn bin

`yarn bin [<executable>]`

显示 yarn 文件夹的位置

当 yarn 被安装在可执行文件的文件夹中，`yarn bin` 将会打印出文件夹的位置

### yarn cache

打印出每个缓存包

`yarn cache list [--pattern]`

yarn 将每个包存储在文件系统用户目录中的全局缓存中。

更改 yarn 缓存位置

`yarn config set cache-folder <path>`

你还可以通过标志指定缓存目录

`yarn <command> --cache-folder <path>`

### yarn check

验证当前项目 `pachage.json` 中依赖项的版本是否与 `yarn.lock` 文件的版本匹配

`yarn check --integrity`: 验证 `package.json` 中包内容的版本和哈希值是否与 `yarn.lock` 的匹配。

`yarn check --verify-tree`: 递归的验证 `package.json` 与 `node_modules` 的版本是否一致，这个不考虑到 `yarn.lock`

### yarn config

管理 yarn 的配置文件

`yarn config set <key> <value> [-g|--global]`

如：yarn config set init-license BSD-2-Clause

`yarn config get <key>`

`yarn config list`

`yarn config delete <key>`

### yarn create

从任何 `create-*` 初学者工具包中创建新项目

`yarn create <starter-kit-package> [<args>]`

如：create-react-app

### yarn generate-lock-entry

生成锁定文件项

### yarn help

不说了～

### yarn import

npm 迁移到 yarn 上有时会比较麻烦。

参考官网吧～解释不清楚

### yarn info

显示有关包的信息

`yarn info <package> [<field>]`

信息将以树格式返回，如果加上 `--json` 将以 `json` 格式返回

一下有几种展示信息的内容和格式：

- yarn info react@15.3.0
- yarn info react description
- yarn info react versions
- yarn info react time
- yarn info react readme

### yarn init

创建或更新 `package.json` 文件

`yarn init --yes/-y`: 生成默认数据

`yarn init --private`: 私钥设置为 true,

### yarn install

`yarn install --check-files`: 验证节点模块中已安装的文件是否未被删除

`yarn install --flat`: 安装所有依赖项，第一次运行时，将会让您在多个版本范围内选择一个版本

`yarn install --force`: 

`yarn install --har`: 

### yarn licenses

展示许可证

`yarn licenses list`

`yarn licenses generate-disclaimer`

### yarn link

### yarn list 

列出所安装的包

### yarn outdated

检查过时的包依赖项

### yarn owner

管理包所有者

仓库中有权对包进行更改的用户。一个包可以有任意多个所有者。

`yarn owner list <package>`: 列出包的所有者

`yarn owner add <user> <package>`: 添加包的所有者

`yarn owner remove <user> <package>`: 删除包的所有者

### yarn pack

创建包依赖项的压缩 gizp 存档

`yarn pack --filename <filename>`: 给存档增加一个命名

### yarn remove

`yarn remove <package...>`: 直接删除 命名的包，更新 `package.json` 和 `yarn .lock` 文件

### yarn run

运行包中 `script` 中的脚本

如果只是输入 `yarn run`: run命令将列出可用于包运行额所有脚本

### yarn tags

用于标记包的 已发布的版本的一种方法，用户可以使用此标签，而不是版本号安装它。

```bath
yarn add your-package-name@stable
yarn add your-package-name@canary
```

- `latest`: 包的当前版本
- `stable`: 包的最新稳定版本，通常与最新版本相同
- `beta`: 在最新或者最稳定版本的前一个版本
- `canary`: 夜间测试版本
- `dev`: 不懂

- `yarn tag add <package>@<version> <tag>`
- `yarn tag remove <package> <tag>`
- `yarn tag list [<package>]`

### yarn team

管理团队成员的资格

`yarn team`: 管理组织中的团队

- `yarn team create <scope:team>`: 
- `yarn team destroy <scope:team>`: 
- `yarn team add <scope:team> <user>`
- `yarn team remove <scope:team> <user>`
- `yarn team list <scope>|<scope:team>`
















