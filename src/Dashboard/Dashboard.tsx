
//import { Container } from "lucide-react";
import Users from "../Features/users/usersTable";
//import AddUserForm from "../Features/users/Adduser";
import VehicleSpecificationsForm from "../Features/cars_specifications/specForm";


function Dashboard() {
    return (
     <>
    {/* <AddUserForm onUserAdded={function (): void {
                   throw new Error("Function not implemented.");
              } }/> */}
              <VehicleSpecificationsForm/>
         <Users/>
         </>
    )
  }
  
  export default Dashboard