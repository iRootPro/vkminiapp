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

     getUserInfoFromVk(ratingUsers) {
        const users = []
        ratingUsers.map(async user => {
            const userRating = await bridge.send('VKWebAppGetUserInfo', {user_id: user.vkUserId})
            users.push({
                first_name: userRating.first_name,
                last_name: userRating.last_name,
                coin: user.coin,
                avatar: userRating.photo_100
            })
        })
        return users
    }

    render() {
        const collectUsers = this.getUserInfoFromVk(this.state.ratingUsers)
        return (
            <>
                <Div>
                    <Text weight="semibold">Монет: {this.state.coin}</Text>
                </Div>
                {this.state.ratingUsers.length > 1 ?
                    <Div>
                        <Text weight="semibold">Рейтинг TOP 10</Text>
                        {console.log(collectUsers)}
                    </Div>
                    : ''}
            </>
        );
    }
}


export default PersonCountRating;
