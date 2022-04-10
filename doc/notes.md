## vue 项目结构
- @vue/compiler-sfc: 解析和处理 .vue 后缀文件
- @vue/compiler-dom 和 @vue/compiler-core: 处理 .vue 文件里的 template 内容，会将 template 里的内容编译成一个 runtime 函数
- @vue/runtime-dom 和 @vue/runtime-core: 处理运行时 dom 节点的逻辑，@vue/runtime-core 是整个 vue 的核心
- @vue/reactivity: 实现了 vue 的响应式  