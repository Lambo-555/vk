import React from 'react';
import {Panel, PanelHeader, PanelHeaderBack} from "@vkontakte/vkui";

const QrList = props => (
	<Panel id={props.id}>
		<PanelHeader
			left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
		>
      QrList
		</PanelHeader>
    <h1>QrList</h1>
	</Panel>
);

export default QrList;
