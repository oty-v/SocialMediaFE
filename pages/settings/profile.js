import Head from "next/head";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";

import Loader from "../../components/common/Loader";
import ProfileForm from "../../components/profile/ProfileForm";
import {withRedux} from "../../lib/withRedux";
import {withAuth} from "../../lib/withAuth";
import {fetchProfile, updateProfile} from "../../redux/auth/action";
import {useMutation, useQuery} from "@redux-requests/react";
import CenterInScreen from "../../components/common/CenterInScreen";
import MainContent from "../../components/common/layout/content/MainContent";


function SettingsProfile() {
    const router = useRouter();
    const {data: profile} = useQuery({type: fetchProfile});
    const {loading} = useMutation({type: updateProfile});
    const dispatch = useDispatch();

    const handleProfileEdit = async (profileId, editProfile) => {
        await dispatch(updateProfile(profileId, editProfile));
        router.push(`/${profile.username}`);
    }
    if (!profile) {
        router.push(`/`)
        return (
            <CenterInScreen customClassName="vh-100">
                <Loader/>
            </CenterInScreen>
        )
    }

    return (
        <>
            <Head>
                <title>{profile.username}</title>
            </Head>
            <MainContent
                backBtn
                title="Settings"
                username={profile.username}
            >
                <MainContent.Body>
                    <MainContent.Item>
                        <ProfileForm
                            onSubmit={handleProfileEdit}
                            profile={profile}
                            loading={loading}
                        />
                    </MainContent.Item>
                </MainContent.Body>
            </MainContent>
        </>
    )
}

export const getServerSideProps = withRedux(withAuth())

export default SettingsProfile;