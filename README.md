# 趣味测试前端-node_vue

#### 项目介绍
趣味测试的基于node的前端代码

软件架构
软件架构说明

安装教程

1. npm install
2. npm run dev  运行项目

2.1 如果是centos服务器，请按参考目录下的centos部署本vue项目的办法
2.2 centos 跑上线项目请用screen托管npm run dev窗口
2.3 

3. npm run build  生成静态页面

4. 访问静态目录 dist/index.html

使用说明

1. 在apache中配置httpd.conf，接口代理绑定8080端口并绑定域名，注意，域名绑定的是静态dist目录

Listen 80

加载转发模块
LoadModule proxy_module modules/mod_proxy.so

LoadModule proxy_http_module modules/mod_proxy_http.so

<VirtualHost 39.108.245.11:80>

     ServerName quwei.hhhh.com

     DocumentRoot "/usr/local/apache/htdocs/www/quwei/web/dist"

    <Directory "/usr/local/apache/htdocs/www/quwei/web/dist">
        Options Indexes FollowSymLinks ExecCGI Includes
        AllowOverride All
        Order allow,deny
        Allow from all
    </Directory>

   ProxyPass / http://localhost:8080/
   ProxyPassReverse / http://localhost:8080/

</VirtualHost>

2. 访问即可
