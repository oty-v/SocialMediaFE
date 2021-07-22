import Head from 'next/head';

import UserList from "../../components/users/usersList";
import {withRedux} from "../../lib/withRedux";
import {withAuth} from "../../lib/withAuth";
import {useQuery} from "@redux-requests/react";
import MainContent from "../../components/common/layout/content/MainContent";
import {fetchUserFollowings} from "../../redux/users/action";

const FollowingPage = ({username}) => {
    const {data, loading} = useQuery({type: fetchUserFollowings, requestKey: username});

    return (
        <>
            <Head>
                <title>Following</title>
            </Head>
            <MainContent
                title='Following List'
                username={username}
                backBtn
            >
                <MainContent.Body>
                    <MainContent.Item>
                        <UserList
                            users={data}
                            loading={loading}
                        />
                    </MainContent.Item>
                </MainContent.Body>
            </MainContent>
        </>
    )
}

export const getServerSideProps = withRedux(withAuth(
    async (ctx, dispatch) => {
        const {error} = await dispatch(fetchUserFollowings(ctx.query.username));
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

export default FollowingPage;