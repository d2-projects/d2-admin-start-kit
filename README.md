# CVICSE Admin

![GitHub package version](https://img.shields.io/github/package-json/v/han-feng/cvicse-admin-start-kit.svg)
[![Build Status](https://travis-ci.org/han-feng/cvicse-admin-start-kit.svg?branch=master)](https://travis-ci.org/han-feng/cvicse-admin-start-kit)
[![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=cvicse-admin-start-kit&metric=alert_status)](https://sonarcloud.io/dashboard?id=cvicse-admin-start-kit)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/han-feng/cvicse-admin-start-kit.svg)
![GitHub language count](https://img.shields.io/github/languages/count/han-feng/cvicse-admin-start-kit.svg)
![GitHub top language](https://img.shields.io/github/languages/top/han-feng/cvicse-admin-start-kit.svg)

基于 [D2Admin](https://github.com/d2-projects/d2-admin) 简化版定制的企业级应用前端模板。

[预览](https://han-feng.github.io/cvicse-admin-start-kit) | [Github](https://github.com/han-feng/cvicse-admin-start-kit) | [码云镜像](https://gitee.com/han_feng/cvicse-admin-start-kit)

---

## 使用 nodejs 开发

安装依赖
```
npm install
```

开发调试运行，支持热更新
```
npm run serve
```

编译打包生产版本，包含 Mock 测试数据
```
npm run build
```

运行 build 命令产生的版本，
```
npm run start
```

## 使用 Maven 构建打包

在项目根目录下，执行下面命令即可进行构建：
```
mvn install
```
自动下载安装 nodejs、npm 等相关工具，编译、打包形成可以在 java web 项目中直接使用的 jar 包，该版本不包含 Mock 测试数据。

---

<a href="https://github.com/d2-projects/d2-admin" target="_blank"><img src="https://raw.githubusercontent.com/FairyEver/d2-admin/master/doc/image/d2-admin@2x.png" width="200"></a>
