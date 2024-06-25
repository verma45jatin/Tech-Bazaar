import AdminNav from "../components/admin/AdminNav";

export const metadata={
    title:"TechBazaar Admin",
    description: "TechBazaar Admin Dashboard",
};


const AdminLayout = ({children}:{children:React.ReactNode}) => {
    return ( 
        <div>
            <AdminNav/>
            {children}
        </div>
     );
}
 
export default AdminLayout;