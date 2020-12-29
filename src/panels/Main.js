import React, {useEffect, useState} from 'react';
import bridge from "@vkontakte/vk-bridge"
import {Panel, PanelHeader, Tabs, TabsItem} from "@vkontakte/vkui";
import PersonCountRating from "./PersonCountRating";
import Content1 from "./Content1";
import {api} from "../api/api";
import Secret from "./Secret";


const Main = () => {
    const [activeTab, setActiveTab] = useState('person')
    const [coin, setCoin] = useState(0)

    useEffect(() => {
        async function getUserInfo() {
            try {
                const userVk = await bridge.send('VKWebAppGetUserInfo')
                if (!userVk.error_type) {
                    api.getInfo(userVk.id)
                        .then(res => {
                            setCoin(res.data.coin)
                        })
                }
            } catch (e) {
                console.log(e)
            }
        }
        getUserInfo()
    }, [])


    return (
        <Panel id={'Main'}>
            <PanelHeader>VkMini App</PanelHeader>
            <Tabs>
                <TabsItem
                    onClick={() => setActiveTab('person')}
                    selected={activeTab === 'person'}
                >Личный счет и рейтинг</TabsItem>
                <TabsItem
                    onClick={() => setActiveTab('content')}
                    selected={activeTab === 'content'}
                >Контент</TabsItem>
                {coin >= 3 ? <TabsItem
                    onClick={() => setActiveTab('secret')}
                    selected={activeTab === 'secret'}>
                    Секрет
                </TabsItem> : ''}
            </Tabs>
            {activeTab === 'person' ? <PersonCountRating/> : ''}
            {activeTab === 'content' ? <Content1 text={coin >= 3 ? 'Контент 2': 'Контент 1'}/> : ''}
            {activeTab === 'secret' ? <Secret/> : ''}

        </Panel>
    );
};

export default Main;
