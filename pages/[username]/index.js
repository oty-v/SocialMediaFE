import Head from "next/head";
import Link from "next/link";

import {getUser} from "../../api/users";
import {withAuth} from "../../lib/withAuth";
import BackButton from "../../components/common/BackButton";
import {withRedux} from "../../lib/withRedux";


function Profile({profile}) {
    return (profile ? (
        <>
            <Head>
                <title>{profile.username}</title>
            </Head>
            <div className="card central-column">
                <div className="card-header central-column-header">
                    <BackButton/>
                    <div className="central-column-header-title">
                        <h3 className="mb-0">User</h3>
                        <span className="text-muted">{`@${profile.username}`}</span>
                    </div>
                </div>
                <div className="card-body">
                    <h4 className="card-title">ID: {profile.id}</h4>
                    <p className="card-text">Data registration: {profile.created_at}</p>
                    <Link href={`/${profile.username}/posts`}>
                        <span className="btn btn-primary">{profile.username} posts</span>
                    </Link>
                </div>
            </div>
        </>
    ) : (
        <span>Loading...</span>
    ))
}

export const getServerSideProps = withRedux(withAuth(async (ctx) => {
    try {
        const {data: {data: profile}} = await getUser(ctx.query.username);
        return {
            props: {
                profile
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