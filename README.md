# NTStore — Next.js + Shopify 独立店铺前端

基于 Next.js、React 和 Tailwind CSS 构建的电商网站，通过 Shopify Storefront GraphQL API 读取商品与分类，使用 Cart API 管理购物车，并跳转到 Shopify 结账页面完成购买流程。

- **线上地址**：[访问 Fridacai](https://next-shopify-starter-main-kappa.vercel.app)
- **当前店铺**：`fridacai-csan4grc.myshopify.com`
- **联系邮箱**：`info@fridacai.io`

项目采用 Pages Router，是部署在 Vercel 上的独立前端，通过 API 连接 Shopify Partner 开发店铺。它不是 Shopify 主题，也不是可安装的 Shopify 应用。网站界面目前为英文，本文件为中文使用说明。

## 已有功能

- 首页主视觉、分类入口、精选商品与帮助入口。
- 全部商品、分类总览，以及根据 Shopify 商品集合生成的分类详情页。
- 商品详情、变体选择、加入购物车、修改数量和移除商品。
- 使用 `localStorage` 保存购物车，并监听其他标签页的购物车变化。
- 关于我们、联系我们、常见问题、配送说明和退换货说明。
- 适配手机的展开菜单、分组页脚和统一页面边距。
- 商品缺图占位、页面元信息和 PWA 配置。

配送与退换货页面目前为示例咨询指引，尚未填写具体运费、配送时效、退货期限等正式政策。正式经营前请替换为实际内容；支付和结账能力也取决于 Shopify 店铺配置与开发店铺限制。

## 技术栈

| 技术 | 用途 |
| --- | --- |
| Next.js 15 / React 18 | 页面渲染、静态生成与增量更新 |
| Tailwind CSS 2 | 页面样式和响应式布局 |
| Shopify Storefront API `2026-07` | 商品、集合与购物车数据 |
| Shopify Cart API | 创建和更新购物车，获取结账地址 |
| next-pwa / Font Awesome | PWA 支持与图标 |
| Vercel | 构建和生产部署 |

具体依赖版本见 `package.json` 和 `package-lock.json`。

## 本地运行

准备 Node.js、npm，以及可用的 Shopify 店铺和公开 Storefront token。

### 1. 安装依赖

在项目根目录运行：

```bash
npm ci
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env.local`。Windows PowerShell 可以运行：

```powershell
Copy-Item .env.example .env.local
```

配置内容如下：

```dotenv
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=fridacai-csan4grc.myshopify.com
NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN=填写公开StorefrontToken
NEXT_PUBLIC_SHOPIFY_COLLECTION=
NEXT_PUBLIC_LOCAL_STORAGE_NAME=fridacai-cart-v2
```

| 变量 | 说明 |
| --- | --- |
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | Shopify 店铺域名，不包含 `https://` 或路径 |
| `NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN` | Storefront API 的 **Public access token** |
| `NEXT_PUBLIC_SHOPIFY_COLLECTION` | 首页商品来源集合的 handle；留空时从全部商品中选取 |
| `NEXT_PUBLIC_LOCAL_STORAGE_NAME` | 浏览器保存购物车的键名；不同店铺建议使用不同名称 |

集合 handle 是 URL 中的标识，例如 `automated-collection`，不是后台显示名称。`/shop` 始终展示全部商品，分类页按对应集合获取商品，不受首页集合变量限制。

`NEXT_PUBLIC_` 变量会进入浏览器代码，因此这里仅能填写公开 Storefront token。不要填写 `shpat_` 开头的 Admin API token、私有 Storefront token 或应用密钥。真实凭证保存在 `.env.local`，不要提交到代码仓库。

### 3. 获取 Shopify token

1. 进入目标店铺的 Shopify 后台。
2. 搜索并打开 Shopify 官方 **Headless** 销售渠道；未安装时先安装。
3. 点击 **Add storefront**，或打开已有店面。
4. 在 **Storefront API** 管理页面复制 **Public access token**。
5. 将商品发布到 Headless 渠道，并填写上述环境变量。

参考：[Shopify 官方 Headless 接入说明](https://shopify.dev/docs/storefronts/headless/bring-your-own-stack)。

### 4. 启动开发服务

```bash
npm run dev
```

浏览器访问 [http://localhost:3000](http://localhost:3000)。修改环境变量后需要重新启动开发服务。

## 页面与路由

| 路由 | 页面 |
| --- | --- |
| `/` | 首页 |
| `/shop` | 全部商品 |
| `/collections` | 分类总览 |
| `/collections/[collection]` | 指定集合的分类详情 |
| `/products/[product]` | 指定商品的详情 |
| `/cart` | 购物车 |
| `/about` | 关于我们 |
| `/contact` | 联系我们 |
| `/faq` | 常见问题 |
| `/shipping` | 配送说明 |
| `/returns` | 退换货说明 |

首页、商品和分类页面配置了 60 秒增量更新间隔。缓存过期后由访问请求触发重新生成，后台改动不会立即推送到已打开的页面。新增商品或集合可以通过动态路由按需生成页面。

当前数据查询未实现游标分页：最多读取 250 件商品、250 个集合，以及每件商品的前 250 个变体和图片。目录超过此规模时，需要在 `lib/shopify.js` 中补充分页。

## 检查与生产构建

```bash
node scripts/check-shopify.mjs
npm run build
```

`check-shopify.mjs` 使用模拟响应检查商品格式、分类取图回退、缺失数据、购物车更新和 API 错误处理，不需要真实 token，也不会修改店铺数据。

生产构建会请求真实 Shopify 数据来生成页面，需要有效的店铺配置和网络连接。构建通过后，可在本地运行生产服务：

```bash
npm run start
```

## 部署到 Vercel

项目当前关联 `fridacai-team/next-shopify-starter-main`。生产域名为：

[https://next-shopify-starter-main-kappa.vercel.app](https://next-shopify-starter-main-kappa.vercel.app)

首次部署或在新的机器上部署时：

```bash
npx vercel login
npx vercel link
```

在 Vercel 项目的 **Settings → Environment Variables** 中添加环境变量，并选择 **Production**：

- `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`
- `NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN`
- `NEXT_PUBLIC_LOCAL_STORAGE_NAME`
- `NEXT_PUBLIC_SHOPIFY_COLLECTION`：可选，使用指定首页集合时填写。

公开 Storefront token 可以按 Config 类型保存；变量名称虽包含 `TOKEN`，其用途仍是浏览器端公开访问，不能用管理令牌替代。

完成配置后发布：

```bash
npx vercel --prod
```

Vercel 会安装依赖并执行生产构建。更改生产环境变量后需要重新部署。当前项目将登录保护设置为仅预览部署，生产链接公开；创建新项目时应检查 Deployment Protection 的范围。

本地 `.env.local` 不会自动成为 Vercel 生产环境配置。当前项目也没有配置 Git 自动部署，代码修改后需要手动发布，或另外连接 Git 仓库。

## 常用修改位置

| 文件或目录 | 修改内容 |
| --- | --- |
| `pages/index.js`、`components/StoreHeading.js` | 首页区块与主视觉 |
| `components/Nav.js`、`components/Footer.js` | 菜单、页脚、客服邮箱 |
| `components/Layout.js` | 共享页面宽度和边距 |
| `components/ProductCard.js` | 商品卡片 |
| `components/CollectionListings.js` | 分类卡片 |
| `pages/` | 信息页面和路由 |
| `lib/shopify.js` | Shopify 查询、购物车操作和 API 版本 |
| `context/Store.js`、`utils/helpers.js` | 购物车状态和本地存储 |
| `next.config.js` | 网站名称、简介、域名和图片域名配置 |
| `tailwind.config.js`、`styles/globals.css` | 颜色、字体和全局样式 |
| `public/manifest.json`、`public/icons/` | PWA 名称和图标 |

## 常见问题

**Shopify 返回 HTTP 401**

检查 token 是否为目标店铺 Headless 渠道生成的 Public access token，并确认复制完整。应用 API key 和 Admin API token 不能替代它。

**页面没有商品或分类**

检查商品和集合是否对 Headless 渠道可见；使用首页集合变量时，确认 handle 正确。缺图商品会显示占位图，不会因此被隐藏。

**生产构建失败，但开发服务能启动**

开发服务启动不代表所有页面都已生成。生产构建需要访问真实商品和集合，请检查环境变量、网络，以及终端中的 Shopify 错误。

**Vercel 登录出现 `fetch failed`**

先检查终端能否连接 Vercel API，以及 `HTTP_PROXY`、`HTTPS_PROXY` 等代理设置。该项目部署过程中曾遇到 CLI 代理连接问题，在单次命令中临时禁用代理后成功登录；是否适用仍取决于本机网络。

**修改后页面仍显示旧内容**

确认生产部署已完成，刷新浏览器，并考虑增量更新间隔或 PWA 缓存的影响。仅修改本地文件不会更新线上站点。

## 来源与许可

项目基于 [btahir/next-shopify-starter](https://github.com/btahir/next-shopify-starter) 扩展，原始模板也参考了 Gatsby Swag Store。

采用 MIT 许可证，详见 [LICENSE](LICENSE)。
