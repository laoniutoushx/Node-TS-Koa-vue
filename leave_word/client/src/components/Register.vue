<template>
  <div class="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">注册</h5>
          <button type="button" class="close">
            <span>&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <!-- 注册 -->
          <form>
            <div class="form-group row">
              <label for="username" class="col-md-3 col-form-label">用户名</label>
              <div class="col-md-9">
                <input type="text" class="form-control" id="username" placeholder="用户名">
              </div>
            </div>
            <div class="form-group row">
              <label for="password" class="col-md-3 col-form-label">密码</label>
              <div class="col-md-9">
                <input type="password" class="form-control" id="password" placeholder="密码">
              </div>
            </div>
            <div class="form-group row">
              <label for="repassword" class="col-md-3 col-form-label">重复密码</label>
              <div class="col-md-9">
                <input type="password" class="form-control" id="repassword" placeholder="重复密码">
              </div>
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-primary">注册</button>
          <button type="button" class="btn btn-secondary">取消</button>
          <a href>我有账号，立即登录</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
