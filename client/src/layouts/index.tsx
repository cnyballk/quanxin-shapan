import { Outlet } from "umi";
import fullscreen from "@cnyballk/full-screen";


function Layout() {
  return <Outlet />
}



export default fullscreen({
  style: {
    width: 3840,
    height: 2160,
  },
  mode:3
})(Layout);