import {useRouter} from 'next/router';

import {deleteData} from '../../api';

function DelBtn({route, elementID}) {
    const router = useRouter()
    const removePost = async () => {
        const res = await deleteData(route, elementID);
        if (!res.error) router.push(route);
    }
    return <button onClick={() => {
        removePost()
    }}>
        Remove
    </button>
}

export default DelBtn;