import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {useSelector} from "react-redux";

import {withAuth} from "../../lib/withAuth";
import BackButton from "../../components/common/BackButton";
import {withRedux} from "../../lib/withRedux";
import {getUserAsync} from "../../redux/users/action";
import Loader from "../../components/common/Loader";
import ModalContainer from "../../components/common/ModalContainer";


function Profile() {
    const user = useSelector((state) => state.users.user);
    if (!user) {
        return (
            <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
                <Loader/>
            </div>
        )
    }
    return (
        <>
            <Head>
                <title>{user.username}</title>
            </Head>
            <div className="central-column">
                <div className="card-header central-column-header">
                    <BackButton/>
                    <div className="central-column-header-title">
                        <h3 className="mb-0">User</h3>
                        <span className="text-muted">{`@${user.username}`}</span>
                    </div>
                </div>
                <div className="card-body">
                    <div className="d-flex align-items-end justify-content-between mb-2">
                        <Image
                            src={user.avatar?.length ? user.avatar : '/default.png'}
                            alt="User avatar"
                            width={125}
                            height={125}
                        />
                        <button className="btn btn-outline-primary mb-2">Edit profile</button>
                    </div>
                    <h4 className="card-title">{user.name ? user.name : `ID: ${user.id}`}</h4>
                    <p className="card-text">Data registration: {user.created_at}</p>
                    <Link href={`/${user.username}/posts`}>
                        <span className="btn btn-outline-primary mb-1">{user.username} posts</span>
                    </Link>
                </div>
            </div>
        </>)
}

export const getServerSideProps = withRedux(withAuth(async (ctx, dispatch) => {
    try {
        await dispatch(getUserAsync(ctx.query.username));
        return {
            props: {
                username: ctx.query.username
            }
        };
    } catch (e) {
        if (e.response.status === 404) {
            return {
                notFound: true,
            }
        }
    }
}))

export default Profile;