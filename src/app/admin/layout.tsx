import SideBarAdmin from "@/components/AdminComponents/SideBarAdmin";
import HeaderUser from "@/components/UserComponents/HeaderUser";

type LayoutAdminProp = {
  children: React.ReactNode;
};
const LayoutAdmin = ({ children }: LayoutAdminProp) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="fixed w-full z-20">
        <HeaderUser />
      </div>
      <div className="flex flex-1 pt-6">
        <div className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] z-10">
          <SideBarAdmin />
        </div>
        <main className="flex-1 ml-64 p-4 mt-10 ">{children}</main>
      </div>
    </div>
  );
};
export default LayoutAdmin;
