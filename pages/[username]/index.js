import Head from "next/head";
import Link from "next/link";

import {withAuth} from "../../lib/withAuth";
import {withRedux} from "../../lib/withRedux";
import {fetchUser, fetchUserFollowers, fetchUserFollowings, followUser, unfollowUser} from "../../redux/users/action";
import Loader from "../../components/common/Loader";
import {useRouter} from "next/router";
import {useQuery} from "@redux-requests/react";
import {fetchProfile} from "../../redux/auth/action";
import MainContent from "../../components/common/layout/content/MainContent";
import ProfileCard from "../../components/profile/ProfileCard";
import CenterInScreen from "../../components/common/CenterInScreen";
import FollowButton from "../../components/common/buttons/FollowButton";
import {useDispatch} from "react-redux";

function Profile({username}) {
    const router = useRouter();
    const {data: authUser} = useQuery({type: fetchProfile});
    const {data: user} = useQuery({type: fetchUser, requestKey: username});
    const {data: followings} = useQuery({type: fetchUserFollowings, requestKey: username});
    const {data: followers} = useQuery({type: fetchUserFollowers, requestKey: username});
    const dispatch = useDispatch();

    const handleClickEditProfile = () => {
        router.push(`/settings/profile`);
    };

    if (!user) {
        router.push(`/`)
        return (
            <CenterInScreen customClassName="vh-100">
                <Loader/>
            </CenterInScreen>
        )
    }

    const following = followers && followers.some(user => user.id === authUser?.id);

    const handleClickFollow = () => {
        dispatch(followUser(username, authUser))
    }

    const handleClickUnfollow = () => {
        dispatch(unfollowUser(username, authUser.username))
    }

    const profileBtn = (authUser?.username === user.username) ? (
        <button
            className="btn btn-outline-primary mb-2"
            onClick={handleClickEditProfile}
        >
            Edit profile
        </button>
    ) : (
        <FollowButton onClick={following ? handleClickUnfollow : handleClickFollow} following={following}/>
    )

    return (
        <>
            <Head>
                <title>{user.username}</title>
            </Head>
            <MainContent
                backBtn
                title="User"
                username={user.username}
            >
                <MainContent.Body>
                    <MainContent.Item>
                        <ProfileCard user={user}>
                            {profileBtn}
                        </ProfileCard>
                        <Link href={`/${user.username}/following`}>
                            <span className="btn btn-link mb-1">{`${followings.length} following`}</span>
                        </Link>
                        <Link href={`/${user.username}/followers`}>
                            <span className="btn btn-link mb-1">{`${followers.length} followers`}</span>
                        </Link>
                    </MainContent.Item>
                    <Link href={`/${user.username}/posts`}>
                        <span className="btn btn-outline-primary mb-1">{`${user.username} posts`}</span>
                    </Link>
                </MainContent.Body>
            </MainContent>
        </>
    )
}

export const getServerSideProps = withRedux(withAuth(
    async (ctx, dispatch) => {
        const {error: errorUser} = await dispatch(fetchUser(ctx.query.username));
        const {error: errorUserFollowings} = await dispatch(fetchUserFollowings(ctx.query.username));
        const {error: errorUserFollowers} = await dispatch(fetchUserFollowers(ctx.query.username));
        const error = errorUser || errorUserFollowings || errorUserFollowers;
        if (error?.response.status === 404) {
            return {
                notFound: true,
            }
        }
        return {
            props: {
                username: ctx.query.username,
            }
        };
    }
))

export default Profile;