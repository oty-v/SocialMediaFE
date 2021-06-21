import Head from "next/head";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {useState} from "react";
import {useRouter} from "next/router";

import BackButton from "../../components/common/BackButton";
import Loader from "../../components/common/Loader";
import ProfileForm from "../../components/profile/ProfileForm";
import {withRedux} from "../../lib/withRedux";
import {withAuth} from "../../lib/withAuth";
import {updateProfile} from "../../redux/auth/action";


function SettingsProfile() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const profile = useSelector((state) => state.auth.profile);
    const dispatch = useDispatch();
    const handleProfileEdit = async (profileId, editProfile) => {
        setLoading(true);
        try {
            await dispatch(updateProfile(profileId, editProfile));
            router.push(`/${profile.username}`);
        } catch (error) {
            toast.error(error.toString())
        }
        setLoading(false);
    }
    if (!profile) {
        return (
            <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
                <Loader/>
            </div>
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