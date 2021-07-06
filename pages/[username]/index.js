import Head from "next/head";
import Link from "next/link";

import {withAuth} from "../../lib/withAuth";
import {withRedux} from "../../lib/withRedux";
import {fetchUser} from "../../redux/users/action";
import Loader from "../../components/common/Loader";
import {useRouter} from "next/router";
import {useQuery} from "@redux-requests/react";
import {fetchProfile} from "../../redux/auth/action";
import {useCallback} from "react";
import MiddleContent from "../../components/common/layout/content/MiddleContent";
import ProfileCard from "../../components/profile/ProfileCard";
import CenterInScreen from "../../components/common/CenterInScreen";

function Profile({username}) {
    const router = useRouter();
    const {data} = useQuery({type: fetchProfile});
    const {data: user, loading} = useQuery({type: fetchUser, requestKey: username});
    const authUser = data?.username;

    const handleClickEditProfile = useCallback(() => {
        router.push(`/settings/profile`);
    }, []);

    if (loading || !user) {
        return (
            <CenterInScreen additionalClassName={"vh-100"}>
                <Loader/>
            </CenterInScreen>
        )
    }

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
            <MiddleContent
                backBtn
                title={'User'}
                username={user.username}
            >
                <MiddleContent.Body>
                    <MiddleContent.Item>
                        <ProfileCard user={user} profileBtn={editProfileBtn}/>
                    </MiddleContent.Item>
                    <Link href={`/${user.username}/posts`}>
                        <span className="btn btn-outline-primary mb-1">{user.username} posts</span>
                    </Link>
                </MiddleContent.Body>
            </MiddleContent>
        </>
    )
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