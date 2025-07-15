import { Outlet } from "react-router-dom"
import Header from "../components/Header"

const HomeLayout = () => {
  return (
    <section>
        <Header />
        <Outlet />
    </section>
  )
}
export default HomeLayout