import 'antd/dist/antd.css';
import {Mentions} from 'antd';
import {useDispatch} from "react-redux";
import {fetchMentions} from "../../../../redux/users/action";
import {useQuery} from "@redux-requests/react";
import Mention from "./Mention";

const {Option} = Mentions;

const MentionsInput = ({value, onChange}) => {
    const {data: mentions, loading} = useQuery({type:fetchMentions});
    const dispatch = useDispatch();

    console.log(mentions)
    const handleSearch = (query) => {
        console.log(query)
        dispatch(fetchMentions(query))
    }
    return (
            <Mentions value={value} autoSize style={{width: '100%'}} loading={loading} onChange={onChange} onSearch={handleSearch}>
                {mentions.map((user) => (
                    <Option key={user.id} value={user.username} className="antd-demo-dynamic-option">
                        <Mention user={user}/>
                    </Option>
                ))}
            </Mentions>
    );
}

export default MentionsInput;