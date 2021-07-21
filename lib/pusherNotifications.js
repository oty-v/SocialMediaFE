import Pusher from "pusher-js";
import {toast} from "react-toastify";
import Link from "next/link";

const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
    cluster: process.env.PUSHER_APP_CLUSTER
});

const notificationContent = (data) => {
    return (
        <div className="d-flex flex-column">
            <h6 className="d-inline-flex">
                User
                <Link href={`/${data.author}`}>
                    <span className="btn-link mx-1">{`@${data.author}`}</span>
                </Link>
                mentioned you
            </h6>
            <Link href={`/${data.author}/posts/${data.postId}`}>
                <span className="btn-link align-self-center">View</span>
            </Link>
        </div>
    )
}

export const pusherNotifications = (username) => {
    const channel = pusher.subscribe(`mentioned-${username}`);
    channel.bind('mention', data => {
        toast(notificationContent(data))
    });
}