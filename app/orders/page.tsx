import { getCurrentUser } from "@/actions/getCurrentUser";

import Container from "@/app/components/Container";

import NullData from "@/app/components/NullData";
import getOrders from "@/actions/getOrders";
import OrdersClient from "./OrderClient"
import getOrdersByuserId from "@/actions/getOrdersByUserId";

const Orders = async () => {

    const currentUser = await getCurrentUser()

    if(!currentUser ){
        return <NullData title="Oops! Access denied"/>
    }
    const orders = await getOrdersByuserId(currentUser.id)
    if(!orders  ){
        return <NullData title="No orders yet..."/>
    }
      
    return <div className="pt-8">
        <Container>
            <OrdersClient orders ={orders }/>
        </Container>

    </div>
}
 
export default Orders;