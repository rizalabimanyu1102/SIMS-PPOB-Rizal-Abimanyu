import { Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate({ to: "/", replace: true });
    }
  }, [navigate]);

  return (
    <>
      <div className="font-mono">
        <Outlet />
      </div>
    </>
  );
};
