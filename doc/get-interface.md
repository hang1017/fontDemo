# 前端三层架构调取接口

## alita 操作方式

### 第一层：services 接口层

1、`services` 下进行一个 `.ts` 的文件

2、导入 `Alita` 调取接口的方式

```js
import { request } from 'alita';
```

3、调取接口

`request` 后接的是接口路径

```js
export async function query(): Promise<any> {
  return request('/api/hello');
}
```

### 第二层：models 层





## 以往的操作方式

### 第一层：services 接口层

1、`services` 下进行一个 `.js` 的文件

2、导入调取接口的文件

在和 `services` 同层下有一个 `utils` 包

```js
import request from '@/utils/http';
```

3、调取接口

```js
export async function exportStatsNewShare(params) {
    return request('statsNewShare/exportStatsNewShare', {
        method: 'POST',
        hideloading:true,
        body: {
            ...params,
        }
    })
}
```

### 第二层：models 层

1、在 `models` 下新建 `.js` 文件

2、导入需要用到的 `services` 接口

```js
import { getEsBrandList } from '@/services/addProduct';
```

3、编写文件架构

```js
export default {
    namespace: '',  //自己命名，一般情况和文件同名
    state: {},      //你调取的接口有需要获取的数据，一般和 page 页面的数据同名
    effects:{},     //异步调取接口
    reducers:{},    //对数据的操作方式
}
```

4、先来看 `reducers` 的编写方式

```js
aa(state,action) {
    const { searchParams } = state;
    return {
        ...state,
        searchParams: {...searchParams, ...action.payload},
        esBrand: action.payload,
    }
}
```

稍解释一下上面的代码:

`return` 里可以将获取到数据设置为 `state` 里的数据

5、来看 `effects` 的编写方式

```js
*addGoodsList({ payload }, { call, put }) {
    const response = yield call(1, payload);
    // console.log('addGoodsList', response )
    const { svcCont, topCont } = response;
    if (topCont.resultCode === 200) {
        message.success('添加商品成功！');
    }
    yield put({
        type: 'setGoodsList',
        payload: svcCont && topCont.resultCode === 200 ? svcCont : {},
    });
},
```

解释一下上面的代码：

1 的位置：为 `import` 导入的接口

`response` 为接口获取到的数据，命名随意

`yield put`: 将数据传输到页面中去

### 第三层：pages 页面层

1、先导入几个模块

```js
import { connect } from 'dva';
```

2、在 `class` 上面通过注释的形式编写代码：

```js
@connect(({ app }) => ({ app }))
```

3、调用方式

```js
const { dispatch } = this.props;

dispatch({
    type: 'goodsList/getSubTabs',   //models 的namespace/effects 名称
    payload: params                 //传入的数据
})
```
