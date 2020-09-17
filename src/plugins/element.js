import Vue from 'vue'
import {
  Card,
  Button,
  Rate,

  Form,
  FormItem,
  Input,
  Select,
  Option,
  Upload,
  DatePicker,

  Tabs,
  TabPane,

  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,

  Table,
  TableColumn,

  Message,
  MessageBox,
} from 'element-ui'

Vue.use(Card)
Vue.use(Button)
Vue.use(Rate)

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Upload)
Vue.use(DatePicker)

Vue.use(Table)
Vue.use(TableColumn)

Vue.use(Tabs)
Vue.use(TabPane)

Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)


Vue.prototype.$message = Message
Vue.prototype.$msgBox = MessageBox