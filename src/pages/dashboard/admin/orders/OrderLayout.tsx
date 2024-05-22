import { Outlet } from "react-router-dom";
import { useMiddleware } from "@/features/common/hooks";

export default function OrderLayout()
{
    useMiddleware('admin')

    return (
        <Outlet />
    )
}