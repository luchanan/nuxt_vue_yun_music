关于服务器处理的请求和代码，虽然终端打印代码console的东西，但是调试很不方便

### 使用vs code调试nuxt服务端

- nuxt-config.js 添加如下代码

```
build: {
    extend (config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    }
```


- 在vscode添加配置

Debug->Add Configuration自动生成launch.json, 复制一下代码到这个文件(nuxt我使用的是koa，所以启动命令需要注意)

```
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "server: nuxt",
      "args": ["dev"],
      "osx": {
        "program": "${workspaceFolder}\\server\\index.js"
      },
      "linux": {
        "program": "${workspaceFolder}\\server\\index.js"
      },
      "windows": {
        "program": "${workspaceFolder}\\server\\index.js"
      }
    }
  ]
}
```

F5启动调试模式, DEBUG CONSOLE会现这个(注意启动调试模式的话，就不要像平常那样在终端使用npm run dev来跑你的项目， 要使用下面的步骤来运行项目)

```
E:\Program Files\nodejs\node.exe --inspect-brk=32975 server\index.js dev 
Debugger listening on ws://127.0.0.1:32975/2f149ea4-d847-441b-8ee5-ba75f0005678
For help, see: https://nodejs.org/en/docs/inspector
Debugger attached.
```

然后在浏览器输入上面的地址： //127.0.0.1:32975, 此刻浏览器会返回

```
WebSockets request was expected
```

最后你在浏览器输入你项目的地址： localhost:8085，项目就会运行起来并且可以调试

案例： 在index.vue这里我debugger了一下

```
 try {
      (await $axios.get('http://localhost:8085/api/personalized', { params: { a: '1' } }))
    } catch (res) {
      debugger
      error({ statusCode: params.statusCode, message: 'Post not found' })
    }
}
```

之后vscode在左边会有个箭头指向debugger这里，那么就可以像平时调试谷歌浏览器那样调试了。


### 使用vs code调试chrome

首先需要安装Dubugger from chrome插件

launch.json配置

```

{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "client: chrome",
      "url": "http://localhost:8085",
      "webRoot": "${workspaceFolder}"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "server: nuxt",
      "args": ["dev"],
      "osx": {
        "program": "${workspaceFolder}\\server\\index.js"
      },
      "linux": {
        "program": "${workspaceFolder}\\server\\index.js"
      },
      "windows": {
        "program": "${workspaceFolder}\\server\\index.js"
      }
    }
  ],
  "compounds": [
    {
      "name": "fullstack: nuxt",
      "configurations": ["server: nuxt", "client: chrome"]
    }
  ]
}
```

终端输入

```
npm run dev
```

然后按F5调试选择client: chrome，在vscode代码设置断点，打开项目地址之后，当遇到断点vscode就会闪烁

[Debugging Nuxt.js with VS Code](https://medium.com/js-dojo/debugging-nuxt-js-with-vs-code-60a1a9e75cf6)

[Nuxt.js debugging in Visual Studio Code](https://medium.com/@justin.ramel/nuxt-js-debugging-in-visual-studio-code-822ff9d51c77)