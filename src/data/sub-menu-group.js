export const subMenuGroup = [
  {
    title: "博客管理",
    icon: "el-icon-notebook-1",
    menuItemGroup: [
      {
        title: "博客",
        children: [
          {
            route: "/blog/edit",
            title: "编辑博客"
          },
          {
            route: "/blog/list",
            title: "博客列表"
          }
        ]
      }
    ]
  },
  {
    title: "内容管理",
    icon: "el-icon-files",
    menuItemGroup: [
      {
        title: "物品",
        children: [
          {
            route: "/item/edit",
            title: "编辑物品"
          },
          {
            route: "/item/list",
            title: "物品列表"
          }
        ]
      },
      {
        title: "英雄",
        children: [
          {
            route: "/hero/edit",
            title: "编辑英雄"
          },
          {
            route: "/hero/list",
            title: "英雄列表"
          }
        ]
      },
      {
        title: "文章",
        children: [
          {
            route: "/article/edit",
            title: "编辑文章"
          },
          {
            route: "/article/list",
            title: "文章列表"
          }
        ]
      }
    ]
  },
  {
    title: "系统相关",
    icon: "el-icon-setting",
    menuItemGroup: [
      {
        title: "分类",
        children: [
          {
            route: "/category/edit",
            title: "编辑分类"
          },
          {
            route: "/category/list",
            title: "分类列表"
          }
        ]
      }
    ]
  }
]