import Head from "next/head";
import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {useRouter} from "next/router";
import "react-toastify/dist/ReactToastify.css";

import BackButton from "../../components/common/BackButton";
import Loader from "../../components/common/Loader";
import ProfileForm from "../../components/profile/ProfileForm";
import {withRedux} from "../../lib/withRedux";
import {withAuth} from "../../lib/withAuth";
import {fetchProfile, updateProfile} from "../../redux/auth/action";
import {useMutation, useQuery} from "@redux-requests/react";
import {CenterInScreen} from "../../components/common/CenterInScreen";


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
            <div className="central-column">
                <div className="card-header central-column-header bg-transparent">
                    <BackButton/>
                    <div className="central-column-header-title">
                        <h3 className="mb-0">Settings</h3>
                        <span className="text-muted">{`@${profile.username}`}</span>
                    </div>
                </div>
                <div className="card-body">
                    <ProfileForm
                        onSubmit={handleProfileEdit}
                        profile={profile}
                        loading={loading}
                    />
                </div>
            </div>
        </>)
}

export const getServerSideProps = withRedux(withAuth())

export default SettingsProfile;