import Head from "next/head";
import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {useRouter} from "next/router";

import Loader from "../../components/common/Loader";
import ProfileForm from "../../components/profile/ProfileForm";
import {withRedux} from "../../lib/withRedux";
import {withAuth} from "../../lib/withAuth";
import {fetchProfile, updateProfile} from "../../redux/auth/action";
import {useMutation, useQuery} from "@redux-requests/react";
import CenterInScreen from "../../components/common/CenterInScreen";
import MiddleContent from "../../components/common/layout/content/MiddleContent";


function SettingsProfile() {
    const router = useRouter();
    const {data: profile} = useQuery({type: fetchProfile});
    const {loading} = useMutation({type: updateProfile});
    const dispatch = useDispatch();

    const handleProfileEdit = useCallback(async (profileId, editProfile) => {
            await dispatch(updateProfile(profileId, editProfile));
            !loading && router.push(`/${profile.username}`);
        },
        [profile],
    )

    if (!profile) {
        return (
            <CenterInScreen additionalClassName={"vh-100"}>
                <Loader/>
            </CenterInScreen>
        )
    }

    return (
        <>
            <Head>
                <title>{profile.username}</title>
            </Head>
            <MiddleContent
                backBtn
                title={'Settings'}
                username={profile.username}
            >
                <MiddleContent.Body>
                    <MiddleContent.Item>
                        <ProfileForm
                            onSubmit={handleProfileEdit}
                            profile={profile}
                            loading={loading}
                        />
                    </MiddleContent.Item>
                </MiddleContent.Body>
            </MiddleContent>
        </>
    )
}

export const getServerSideProps = withRedux(withAuth())

export default SettingsProfile;