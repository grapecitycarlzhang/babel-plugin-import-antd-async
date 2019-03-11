# Welcome to babel-plugin-import-antd-async!

The plugin aims to async loading antd components on demand.
Thanks to **[antd](https://ant.design/)** and **[babel-plugin-import](https://github.com/ant-design/babel-plugin-import)**.

## Install
```sh
npm i babel-plugin-import-antd-async --save-dev
yarn add babel-plugin-import-antd-async -D
```
## Guide
The plugin has same options as **[babel-plugin-import](https://github.com/ant-design/babel-plugin-import)**, however just support antd for now.

### Comment Annotation
Default to async loading components, however add comments for controlling more:
```js
import {
//default to async loading
Button,

//async loading select and select.option
/* async-react:Select.Option*/
Select,

//could async loading multi components separated by commas
/* async-react:Input.TextArea,Input.Password*/
Input,

//notification is not a react component,it just an object for functions
/* async-func:notification.open */
notification,

//Form component is not only a react component, but also a object for functions
/* async-react:Form.Item,Form.create */
Form,

//if you want to sync load some components
/* sync-react */
Row,

/* sync-func */
message,

//recommand to sync loading LocaleProvider, if you used it
/* sync-react */
LocaleProvider

} from  'antd';
```
