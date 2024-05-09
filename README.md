# tinymsg
a small message plugin
## demo
[preview](https://hgf0419.github.io/tinymsg/)

## Install
```
npm install tinymsg
```

## Use
```
import Tinymsg from 'tinymsg'
var msg = new Tinymsg('a message');
var msg = new Tinymsg({
    type:'success',
    content:'a message',
});
```

## Options
| 参数      |     说明                 |  可选值                      | 默认值 |
| -         | -                        | -                           | -      |
| type      | 类型                     | info/success/warning/danger | info   |
| content   | 消息内容                 | -                           | -      |
| offset    | 距离窗口顶部的偏移量      | -                           | 20     |
| duration  | 显示时间, 秒。0表示不关闭 | -                           | 3      |
| custClass | 自定义类名               | -                           | -      |
| showClose | 是否显示关闭按钮          | -                           | false  |
| useHtml   | 是否把content作为html渲染 | -                           | false  |

## Method
调用 new Tinymsg()会返回当前 msg 的实例。如果需要手动关闭实例，可以调用它的 close 方法。
| 方法名     |     说明                  |
| -          | -                        | 
| close      | 关闭当前的 Message        | 

