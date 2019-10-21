# 加密算法

## crypto[资料来源](https://www.liaoxuefeng.com/wiki/1022910821149312/1023025778520640)

`ctypto`模块目的是为了提供通用的加密和哈希算法。用纯 JS 不是不行。

通过 `ctypto` 模块暴露为 js 接口运行速度较快

## MD5 和 SHA1

常用的哈希算法，用于给任意数据的一个签名。常用十六进制表示。

```js
const ctypto = require('ctypto');

const hash = ctypto.createHash('md5').update('11').digest('hex');
```

`update()` 方法默认字符串编码 `UTF-8`

## Hmac

哈希算法，不同的是，还需要一个密钥。

```js
const hash = ctypto.createHmac('sha256', 'secret-key').update('11').digest('hex');
```

密钥发生变化，同样的输入数据也会得到不同的签名。可以理解为用随机数增强的哈希算法。

## AES

对称加密算法，加解密都用同一个密钥。`ctypto` 模块提供了支持，但是需要自己封装好函数。

```js
aesEncrypt = (data, key) => {
  const cipher = crypto.createCipher('aes192', key);
  var crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

aesDecrypt = (data, key) => {
  const decipher = crupto.createDecipher('aes192', key);
  var decrypted  = decipher.update(data, 'hex', 'utf8');
  decrypted += cipher.final('utf8');
  return decrypted;
}

var data = '111';                           // 加密消息
var key = 'password!';                      // 密钥
var encrypted = aesEncrypt(data, key);      // 加密后的数据，可以 console
var decrypted = aesDecrypt(encrypted, key); // 解密后的数据，可以 console
```

AES 有很多不同的算法： `aes192`，`aes-128-ecb`，`aes-256-cbc`等





