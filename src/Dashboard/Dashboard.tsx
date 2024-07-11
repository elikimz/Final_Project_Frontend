
//import { Container } from "lucide-react";
import Users from "../Features/users/usersTable";
import AddUserForm from "../Features/users/Adduser";


function Dashboard() {
    return (
     <>
    <AddUserForm onUserAdded={function (): void {
                   throw new Error("Function not implemented.");
              } }/>
         <Users/>
         </>
    )
  }
  
  export default Dashboard