# rentHouse 租房系统前端 HavenRent
## 上线地址 http://115.159.222.245 或 www.52xu.top
### 后端项目地址 https://github.com/xzboss/rentHouseService
# umi@4 + ts + antd + leaflet + less + modal + axios
- 响应式布局兼容移动端
- antd组件二次封装，
  - 日历组件：动态选择日期，动态禁止日期，样式重组
- 自定义组件封装
  - 按钮：颜色自定，事件自定，可选及加载状态的显示
  - 输入框：是否错误提示，是否满足传入正则，显示何种提示
  - 其他
- dayjs进行日期处理
- 使用leaflet轻量级地图并封装成组件
- 弹窗组件的合理利用
- 精确搜索：包含在类型之上进行二次过滤，或者在精确搜索后以类型进行二次过滤
- 动态路由菜单
- 路由鉴权：umi自带wrappers
- 表单验证
- 防止重复提交
- 基于token验证
  - 接口token限制
  - 自动登录
- 全局状态管理：modal
- 主要功能：主要在后端进行
  - 收藏
  - 取消收藏
  - 发布房源
    - 房源图片上传
    - 指定允许租赁期间（含一组起始，结束）
  - 删除房源：同时更新与房源相关一切预定信息，收藏信息及用户信息
  - 预定
    - 不可预定同一房源已预定区间
    - 禁止选择房东允许范围外
  - 房东可取消顾客的预定
  - 保留弹窗进度
    - 搜索进度
    - 房源编辑进度
 
  - 第三方登录支持
    - github


## 示例图
![image](https://github.com/xzboss/rentHouse/assets/90434394/abd40907-8e89-472f-91a9-07406bc32cd9)
![image](https://github.com/xzboss/rentHouse/assets/90434394/8d41a3e3-b5b6-441e-8ea2-f7f5f5d5d14b)


> pnpm install
> pnpm start









