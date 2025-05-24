import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useGetOrderHistoryQuery } from "../hooks/orderHook";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Button } from "react-bootstrap";


export default function OrderHistoryPage() {
    const navigate = useNavigate();
    const {data : orders , isLoading , error} = useGetOrderHistoryQuery();
  return (
    <div>
        <Helmet>
        <title>Order History</title>
        </Helmet>
        <h1>Order History</h1>
        {isLoading ? (
            <LoadingBox/>
        ) : error ? (
            <MessageBox variant="danger">Error in userOrderHistory</MessageBox>
        ) : (
            <table className="table">
                <thead>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th>ACTION</th>
                </thead>
                <tbody>
                   {orders?.map((order)=>(
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt.substring(0,10)}</td>
                        <td>{order.totalPrice.toFixed(2)}</td>
                        <td>{order.isPaid ? order.paidAt.substring(0,10) : 'No'}</td>
                        <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : 'No'}</td>
                        <td>
                            <Button type="button" variant="light" onClick={()=>navigate(`/order/${order._id}`)}>Details
                            </Button>
                        </td>
                    </tr>
                   ))}
                </tbody>
            </table>
        )}
    </div>
  )
}
