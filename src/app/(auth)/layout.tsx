import "@/app/globals.css";
import { ReactNode } from "react";
type Props = {
  children: ReactNode;
};
const AuthLayout = ({ children }: Props) => {
  return (
      <div className="flex min-h-screen bg-linear-to-r from-cyan-500 to-blue-500">
        <div className="w-3/5 flex flex-col items-center justify-center">
          <img
            src="/logoAuth.png"
            alt="logoAuth"
            className="h-28 w-auto mb-6"
          />
          <img
            src="/AuthWelcome.png"
            alt="AuthWelcome"
            className="h-60 w-auto"
          />
        </div>
        <div className="w-2/5 flex items-center justify-center">{children}</div>
      </div>
  );
};
export default AuthLayout;
