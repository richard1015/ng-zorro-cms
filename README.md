#------------------------项目说明-------------------------

#默认打包 (体积会增大)
ng build 
#打包指令（压缩包，用户加载更快）
ng build --prod --no-extract-license
#项目启动
npm start 
#配置自定义端口，和启动代理请求时， 修改package.json中 start 文件
scripts.start: "ng serve --host 127.0.0.1 --port 4201 --proxy-config proxy.conf.json"
#自定义代理配置
根目录 proxy.conf.json 


#---------------------------以下为自动生成说明-------------



# NgZorroCms

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
