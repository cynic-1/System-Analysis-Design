# 实用Javascript代码

本文整理了一些实用的 JavaScript 单行代码，**非常好用**~~

------

# 获取浏览器Cookie的值

通过`document.cookie` 来查找`cookie`值

```javascript
const cookie = name => `; ${document.cookie}`.split(`; ${name}=`).pop().split(';').shift();
    
cookie('_ga');
// Result: "GA1.2.1929736587.1601974046"
```

# 颜色RGB转十六进制

```javascript
const rgbToHex = (r, g, b) => "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    
rgbToHex(0, 51, 255); 
// Result: #0033ff
```

# 复制到剪贴板

借助`navigator.clipboard.writeText`可以很容易的讲文本复制到剪贴板

> 规范要求在写入剪贴板之前使用 [Permissions API](https://link.segmentfault.com/?enc=QRyehBpHC9l3ksrnstiNbA%3D%3D.%2F7CLcLvh4Ts8VQi9jZDLH0hNwq9Nvd51gVjzpdugWYLM0ZL%2BSGxxme0BMPv1eozsB5qrHpGLLmU2ztrl%2B2DdtjRt9xRHEotl4ksl5DZ2Cp0%3D) 获取“剪贴板写入”权限。但是，不同浏览器的具体要求不同，因为这是一个新的API。有关详细信息，请查看[compatibility table](https://link.segmentfault.com/?enc=ufAV1lcczHLbJx5HyoFcXQ%3D%3D.5mmrg7KdQPMQ%2B22AZ6cAaw9gxO2oKOG7Tj3Sg859KqiC9HI9UV8px99JrgxopWf6PNGzzIoRaGbLLBjDn3AhTkDDo7e%2FZDcbbbv1WOfIcz1%2F6B6SoJGKkfSLBYrVEbr%2B) and[ Clipboard availability](https://link.segmentfault.com/?enc=fKq2MRRX0r2vVDbxAQS1rg%3D%3D.ErTGD1FZDmLdEaRWnkuEj60fMax0rvbYuiG76qVMqT23jnOoyEkNs37HUKr4EBcCkOUVHQFN8xBStYBNNlZx5y7aN%2FXTVZjCICorUmkbyCl3m6Bd9JfAgfIuKN8vNdwJ) in [Clipboard](https://link.segmentfault.com/?enc=mi2fasrmk6AB9exE03nSYw%3D%3D.T%2BFd5yF%2F%2B4D3uRpUtBnAOEVNbrYH11lG9WFTqaBGuboSFsgTspywAXKykhv82Jl25kZbqX5DAS0G35p1LHhbbQ%3D%3D)。

```javascript
const copyToClipboard = (text) => navigator.clipboard.writeText(text);
    
copyToClipboard("Hello World");
```

# 检查日期是否合法

使用以下代码段检查给定日期是否有效。

```javascript
const isDateValid = (...val) => !Number.isNaN(new Date(...val).valueOf());
    
isDateValid("December 17, 1995 03:24:00");
// Result: true
```

# 查找日期位于一年中的第几天

```javascript
const dayOfYear = (date) =>
      Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    
dayOfYear(new Date());
// Result: 272
```

# 英文字符串首字母大写

Javascript没有内置的首字母大写函数，因此我们可以使用以下代码。

```javascript
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)
    
capitalize("follow for more")
// Result: Follow for more
```

# 计算2个日期之间相差多少天

```javascript
const dayDif = (date1, date2) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000)
    
dayDif(new Date("2020-10-21"), new Date("2021-10-22"))
// Result: 366
```

# 清除全部Cookie

通过使用`document.cookie`访问cookie并将其清除，可以轻松清除网页中存储的所有cookie。

```javascript
const clearCookies = document.cookie.split(';').forEach(cookie => document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`));
```

# 生成随机十六进制颜色

可以使用 `Math.random` 和 `padEnd` 属性生成随机的十六进制颜色。

```javascript
const randomHex = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`;
    
 console.log(randomHex());
// Result: #92b008
```

# 数组去重

可以使用 JavaScript 中的`Set`轻松删除重复项

```javascript
const removeDuplicates = (arr) => [...new Set(arr)];
    
console.log(removeDuplicates([1, 2, 3, 3, 4, 4, 5, 5, 6]));
// Result: [ 1, 2, 3, 4, 5, 6 ]
```

# 从 URL 获取查询参数

可以通过传递 `window.location` 或原始 URL `goole.com?search=easy&page=3` 轻松地从 url 检索查询参数

```javascript
const getParameters = (URL) => {
  URL = JSON.parse(
    '{"' +
      decodeURI(URL.split("?")[1])
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
  return JSON.stringify(URL);
};

getParameters(window.location);
// Result: { search : "easy", page : 3 }
```

或者更为简单的：

```javascript
Object.fromEntries(new URLSearchParams(window.location.search))
// Result: { search : "easy", page : 3 }
```

# 时间处理

我们可以从给定日期以 `hour::minutes::seconds` 格式记录时间。

```javascript
const timeFromDate = date => date.toTimeString().slice(0, 8);
    
console.log(timeFromDate(new Date(2021, 0, 10, 17, 30, 0))); 
// Result: "17:30:00"
```

# 校验数字是奇数还是偶数

```dart
const isEven = num => num % 2 === 0;
    
console.log(isEven(2)); 
// Result: True
```

# 求数字的平均值

使用`reduce`方法找到多个数字之间的平均值。

```javascript
const average = (...args) => args.reduce((a, b) => a + b) / args.length;
    
average(1, 2, 3, 4);
// Result: 2.5
```

# 回到顶部

可以使用 `window.scrollTo(0, 0)` 方法自动滚动到顶部。 将 `x` 和 `y` 都设置为 0。

```javascript
const goToTop = () => window.scrollTo(0, 0);
    
goToTop();
```

# 翻转字符串

可以使用 `split`、`reverse` 和 `join` 方法轻松反转字符串。

```axapta
const reverse = str => str.split('').reverse().join('');
    
reverse('hello world');     
// Result: 'dlrow olleh'
```

# 校验数组是否为空

一行代码检查数组是否为空,将返回`true`或`false`

```reasonml
const isNotEmpty = arr => Array.isArray(arr) && arr.length > 0;
    
isNotEmpty([1, 2, 3]);
// Result: true
```

# 获取用户选择的文本

使用内置的`getSelection` 属性获取用户选择的文本。

```javascript
const getSelectedText = () => window.getSelection().toString();
    
getSelectedText();
```

# 打乱数组

可以使用`sort` 和 `random` 方法打乱数组

```javascript
const shuffleArray = (arr) => arr.sort(() => 0.5 - Math.random());
    
console.log(shuffleArray([1, 2, 3, 4]));
// Result: [ 1, 4, 3, 2 ]
```

# 检查用户的设备是否处于暗模式

使用以下代码检查用户的设备是否处于暗模式。

```javascript
const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    
console.log(isDarkMode) 
// Result: True or False
```

