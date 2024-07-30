import Error from "../components/Error";
import Billings from "../pages/dashboard/Billings";
import AddClient from "../pages/dashboard/Clients/AddClient";
import ClientList from "../pages/dashboard/Clients/ClientList";
import ConfirmedBooking from "../pages/dashboard/ConfirmedBooking";
import ECommerce from "../pages/dashboard/Dashboard/ECommerce";
import Payments from "../pages/dashboard/Payment";
import GenarateQuery from "../pages/dashboard/Query/GenarateQuery";
import QueryList from "../pages/dashboard/Query/QueryList";
import CabQuota from "../pages/dashboard/Quota/CabQuota";
import FlightQuota from "../pages/dashboard/Quota/FlightQuota";
import HotelQuota from "../pages/dashboard/Quota/HotelQuota";
import Role from "../pages/dashboard/Role";
import Sales from "../pages/dashboard/Sales";
import AddVendor from "../pages/dashboard/Vendors/AddVendor";
import VendorList from "../pages/dashboard/Vendors/VendorList";

export const RouteList=[
    {
        path:'/',
        component: ECommerce,
        

    },
    {
        path:'/add-client',
        component: AddClient,
        

    },
    {
        path:'/clients',
        component: ClientList,
    },
    {
        path:'/add-vendor',
        component: AddVendor,
    },
    {
        path:'/vendors',
        component: VendorList,
    },
    {
        path:'/genarate-query',
        component: GenarateQuery,
    },
    {
        path:'/query-list',
        component: QueryList,
    },
    {
        path:'/manage-quotation-flight',
        component: FlightQuota,
    },
    {
        path:'/manage-quotation-hotel',
        component: HotelQuota,
    },
    {
        path:'/manage-quotation-cab',
        component: CabQuota,
    },
    {
        path:'/confirmed-booking',
        component: ConfirmedBooking,
    },
    {
        path:'/payment',
        component: Payments,
    },
    {
        path:'/billings',
        component: Billings,
    },
    {
        path:'/roles',
        component: Role,
    },
    {
        path:'/sales',
        component: Sales,
    },{
        path:'/*',
        component: Error,
    }


]