import React from 'react';
import PropTypes from 'prop-types';
import {Button, Group, Cell} from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import bridge from "@vkontakte/vk-bridge"

import './Intro.css';


const Intro = props => {
	const handleClickIntro = async () => {
		try {
			await bridge.send("VKWebAppAllowMessagesFromGroup", {group_id: 201388377})
			await bridge.send("VKWebAppStorageSet", {key: 'skipIntro', value: 'skip'})
		}
		catch (e) {
			console.log(e)
		}


	}
	return (
		<Panel id={props.id}>
			<PanelHeader>
				Добро пожаловать, это ваш первый вход в приложение!
			</PanelHeader>
			<Group>
				<Cell><Button onClick={handleClickIntro}>Понятно, далее</Button></Cell>
			</Group>

		</Panel>
	)
}



Intro.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Intro;
