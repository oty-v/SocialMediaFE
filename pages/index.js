import BasePage from "../components/basePage";
import PostForm from "../components/postForm";

export default function Home() {
    return (
        <BasePage pageTitle={'Home'}>
            <PostForm/>
        </BasePage>
    )
}