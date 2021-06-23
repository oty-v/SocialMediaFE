import Head from "next/head";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";

import {withAuth} from "../../lib/withAuth";
import BackButton from "../../components/common/BackButton";
import {withRedux} from "../../lib/withRedux";
import {fetchUser} from "../../redux/users/action";
import Loader from "../../components/common/Loader";
import {useRouter} from "next/router";
import UserAvatar from "../../components/users/userAvatar";
import {useQuery} from "@redux-requests/react";
import {fetchProfile} from "../../redux/auth/action";
import {useCallback} from "react";

function Profile() {
    const router = useRouter();
    const {data} = useQuery({type: fetchProfile});
    const {data: user, loading} = useQuery({type: fetchUser});
    const authUser = data?.username;

    if (loading||!user) {
        return (
            <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
                <Loader/>
            </div>
        )
    }
    const handleClickEditProfile = useCallback(() => {
        router.push(`/settings/profile`);
    },[]);

    const editProfileBtn = (authUser === user.username) && (
        <button
            className="btn btn-outline-primary mb-2"
            onClick={handleClickEditProfile}
        >
            Edit profile
        </button>
    )

    return (
        <>
            <Head>
                <title>{user.username}</title>
            </Head>
            <div className="central-column">
                <div className="card-header central-column-header bg-transparent">
                    <BackButton/>
                    <div className="central-column-header-title">
                        <h3 className="mb-0">User</h3>
                        <span className="text-muted">{`@${user.username}`}</span>
                    </div>
                </div>
                <div className="card-body">
                    <div className="d-flex align-items-end justify-content-between mb-2">
                        <UserAvatar
                            userAvatar={user.avatar}
                            width={125}
                            height={125}
                        />
                        {editProfileBtn}
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

export const getServerSideProps = withRedux(withAuth(
    async (ctx, dispatch) => {
        const {error} = await dispatch(fetchUser(ctx.query.username));
        if (error?.response.status === 404) {
            return {
                notFound: true,
            }
        }
        return {
            props: {
                username: ctx.query.username
            }
        };
    }
))

export default Profile;