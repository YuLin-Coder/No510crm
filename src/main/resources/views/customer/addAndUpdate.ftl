<!DOCTYPE html>
<html>
    <head>
        <#include "../common.ftl">
    </head>
    <body class="childrenBody">
        <form class="layui-form" style="width:80%;">
            <#--客户信息id-->
            <input id="id" name="id" type="hidden" value="${(customer.id)!}"/>

            <#--客户级别-->
            <input id="level" type="hidden" value="${(customer.level)!}"/>

            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">客户名称</label>
                    <div class="layui-input-inline">
                        <input type="text" class="layui-input" lay-verify="required" name="name" value="${(customer.name)!}" placeholder="请输入客户名称">
                    </div>

                    <label class="layui-form-label">法人</label>
                    <div class="layui-input-inline">
                        <input type="text" class="layui-input" lay-verify="required" name="fr" value="${(customer.fr)!}" placeholder="请输入法人">
                    </div>
                </div>
            </div>

            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">区域</label>
                    <div class="layui-input-inline">
                        <input type="text" class="layui-input" name="area" value="${(customer.area)!}" placeholder="请输入区域">
                    </div>

                    <label class="layui-form-label">客户经理</label>
                    <div class="layui-input-inline">
                        <input type="text" class="layui-input" name="cusManager" value="${(customer.cusManager)!}" placeholder="请输入客户经理">
                    </div>
                </div>
            </div>

            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">客户级别</label>
                    <div class="layui-input-inline">
                        <select name="level"></select>
                    </div>

                    <label class="layui-form-label">信用度</label>
                    <div class="layui-input-inline">
                        <input type="text" class="layui-input" name="xyd" value="${(customer.xyd)!}" placeholder="请输入信用度">
                    </div>
                </div>
            </div>

            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">邮编</label>
                    <div class="layui-input-inline">
                        <input type="text" class="layui-input" name="postCode" value="${(customer.postCode)!}" placeholder="请输入邮编">
                    </div>

                    <label class="layui-form-label">联系电话</label>
                    <div class="layui-input-inline">
                        <input type="text" class="layui-input" lay-verify="required|phone" name="phone" value="${(customer.phone)!}" placeholder="请输入联系电话">
                    </div>
                </div>
            </div>

            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">客户地址</label>
                    <div class="layui-input-inline">
                        <input type="text" class="layui-input" name="address" value="${(customer.address)!}" placeholder="请输入客户地址">
                    </div>

                    <label class="layui-form-label">传真</label>
                    <div class="layui-input-inline">
                        <input type="text" class="layui-input" name="fax" value="${(customer.fax)!}" placeholder="请输入传真">
                    </div>
                </div>
            </div>

            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">网站</label>
                    <div class="layui-input-inline">
                        <input type="url" class="layui-input" name="webSite" value="${(customer.webSite)!}" placeholder="请输入网站">
                    </div>

                    <label class="layui-form-label">注册资金</label>
                    <div class="layui-input-inline">
                        <input type="number" class="layui-input" name="zczj" value="${(customer.zczj)!}" placeholder="请输入注册资金">
                    </div>
                </div>
            </div>

            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">开户行</label>
                    <div class="layui-input-inline">
                        <input type="text" class="layui-input" name="khyh" value="${(customer.khyh)!}" placeholder="请输入开户行">
                    </div>

                    <label class="layui-form-label">开户账号</label>
                    <div class="layui-input-inline">
                        <input type="text" class="layui-input" name="khzh" value="${(customer.khzh)!}" placeholder="请输入开户账号">
                    </div>
                </div>
            </div>

            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">国税</label>
                    <div class="layui-input-inline">
                        <input type="number" class="layui-input" name="gsdjh" value="${(customer.gsdjh)!}" placeholder="请输入国税">
                    </div>

                    <label class="layui-form-label">地税</label>
                    <div class="layui-input-inline">
                        <input type="number" class="layui-input" name="dsdjh" value="${(customer.dsdjh)!}" placeholder="请输入地税">
                    </div>
                </div>
            </div>

            <br/>

            <div class="layui-form-item layui-row layui-col-xs12">
                <div class="layui-input-block">
                    <button class="layui-btn layui-btn-lg" lay-submit="" lay-filter="addOrUpdateCustomer">确认</button>
                    <button class="layui-btn layui-btn-lg layui-btn-normal" id="closeBtn">取消</button>
                </div>
            </div>
        </form>

    <script type="text/javascript" src="js/customer/addAndUpdate.js"></script>
    </body>
</html>