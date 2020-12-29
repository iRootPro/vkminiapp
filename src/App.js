import React, {useState, useEffect} from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Intro from './panels/Intro';
import Main from "./panels/Main";

const ROUTES = {
    HOME: 'home',
    INTRO: 'intro'
}

const App = () => {
    const [activePanel, setActivePanel] = useState(ROUTES.INTRO);
    const [fetchedUser, setUser] = useState(null);
    const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);
    const [skipShowIntro, setSkipShowIntro] = useState(false)

    useEffect(() => {
        bridge.subscribe(({detail: {type, data}}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                document.body.attributes.setNamedItem(schemeAttribute);
            }
        });

        async function fetchData() {
            const user = await bridge.send('VKWebAppGetUserInfo');
            setUser(user);
            setPopout(null);
        }

        fetchData();

        async function getSkipIntro() {
            const skipIntro = await bridge.send('VKWebAppStorageGet', {keys: ['skipIntro']})
            if (skipIntro.keys[0].value === 'skip') {
                setSkipShowIntro(true)
            }
        }

        getSkipIntro()
    }, []);

    const go = e => {
        setActivePanel(e.currentTarget.dataset.to);
    };
    if (!skipShowIntro) {
        return (
            <View activePanel={activePanel} popout={popout}>
                <Home id={ROUTES.HOME} fetchedUser={fetchedUser} go={go}/>
                <Intro id={ROUTES.INTRO} go={go}/>
            </View>
        )
    } else {
        return (
            <Main/>
        )
    }

}

export default App;

