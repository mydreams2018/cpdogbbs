import React from 'react';

/*创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件，
这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值。

只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。
此默认值有助于在不使用 Provider 包装组件的情况下对组件进行测试。注意：
将 undefined 传递给 Provider 的 value 时，消费组件的 defaultValue 不会生效。
每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。

<MyContext.Provider value={x}>

Provider 接收一个 value 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。
多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。

当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。
从 Provider 到其内部 consumer 组件（包括 .contextType 和 useContext）
的传播不受制于 shouldComponentUpdate 函数，因此当 consumer
组件在其祖先组件跳过更新的情况下也能更新。

*/
export default React.createContext("userToken");