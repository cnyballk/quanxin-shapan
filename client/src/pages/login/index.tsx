import "./index.less";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { message } from "antd";
import { useNavigate } from "umi";

export default function Login() {
  const navigate = useNavigate();

  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [autoLogin, setAutoLogin] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = useMemo(() => {
    return account.trim().length > 0 && password.length > 0 && !submitting;
  }, [account, password, submitting]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("login_auto");
      if (raw != null) setAutoLogin(raw === "1");
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("login_auto", autoLogin ? "1" : "0");
    } catch {
      // ignore
    }
  }, [autoLogin]);

  const validate = useCallback(() => {
    if (!account.trim()) {
      message.warning("请输入账号");
      return false;
    }
    if (!password) {
      message.warning("请输入密码");
      return false;
    }
    return true;
  }, [account, password]);

  const onSubmit = useCallback(async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      // TODO: 接入真实登录接口
      await new Promise((r) => setTimeout(r, 450));
      message.success("登录成功");
      navigate("/", { replace: true });
    } catch (e) {
      message.error("登录失败，请重试");
    } finally {
      setSubmitting(false);
    }
  }, [navigate, validate]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") onSubmit();
    },
    [onSubmit]
  );

  const inputStyle = useMemo<React.CSSProperties>(
    () => ({
      fontSize: 44,
      fontFamily: "HuaweiSans, Arial, sans-serif",
      fontWeight: 400,
    }),
    []
  );

  return (
    <div className="login-page">
      <div className="login-form" role="form" aria-label="用户登录">
        <div className="login-title">用户登录</div>

        <div className="login-field">
          <span className="login-icon" aria-hidden="true">
            <img src="/img/icon-user.png" alt="账号" />
          </span>
          <input
            className="login-input"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="请输入账号"
            autoComplete="off"
            spellCheck={false}
            style={inputStyle}
          />
        </div>

        <div className="login-field">
          <span className="login-icon" aria-hidden="true">
            <img src="/img/icon-password.png" alt="密码" />
          </span>
          <input
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="请输入密码"
            type="password"
            autoComplete="off"
            style={inputStyle}
          />
        </div>

        <div className="login-options">
          <label className="login-checkbox">
            <input type="checkbox" checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)} />
            <span>自动登录</span>
          </label>

          <button type="button" className="login-link" onClick={() => message.info("请联系管理员重置密码")}>
            忘记密码
          </button>
        </div>

        <button type="button" className="login-submit" disabled={!canSubmit} onClick={onSubmit}>
          {submitting ? "登录中…" : "登录"}
        </button>

        <button type="button" className="login-register" onClick={() => message.info("暂未开放注册")}>
          注册账号
        </button>
      </div>
    </div>
  );
}
