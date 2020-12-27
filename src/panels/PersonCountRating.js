import React from 'react';
import bridge from "@vkontakte/vk-bridge"
import {Div, List, Text} from "@vkontakte/vkui";
import {api} from "../api/api";
import RatingUser from "../components/RatingUser";


class PersonCountRating extends React.Component {
    state = {
        vkUserId: null,
        coin: 0,
        ratingUsers: []
    }

    componentDidMount = async () => {
        try {
            const userVk = await bridge.send('VKWebAppGetUserInfo')
            if (!userVk.error_type) {
                this.setState({vkUserId: userVk.id})
                api.getInfo(this.state.vkUserId)
                    .then(res => {
                        this.setState({
                            coin: res.data.coin
                        })
                    })
                api.getRating()
                    .then(res => {
                        this.setState({ratingUsers: res.data})
                    })
            }


        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <>
                <Div>
                    <Text weight="semibold">Монет: {this.state.coin}</Text>
                </Div>
                {this.state.ratingUsers.length > 1 ?
                    <Div>
                        <Text weight="semibold">Рейтинг TOP 10</Text>
                        {this.state.ratingUsers.map((user, index) => <RatingUser
                            key={user._id}
                            index={index+1}
                            firstName={user.first_name}
                            lastName={user.last_name}
                            coin={user.coin}
                            avatar={user.avatar}
                        />)}
                    </Div>
                    : ''}
            </>
        );
    }
}


export default PersonCountRating;
