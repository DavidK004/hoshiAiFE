import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import IndexPage from "../pages/IndexPage/IndexPage";
import QuestionsPage from "../pages/QuestionsPage/QuestionsPage";

const router = createBrowserRouter ([
    {
        path:'/',
        element: <MainLayout/>,
        children: [
            {
                index:true,
                element: <IndexPage/>
            },
            {
                path: "/questions",
                element: <QuestionsPage/>
            }
        ]
    }
])

export default router;