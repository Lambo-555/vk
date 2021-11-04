import React from 'react';
import {Panel, PanelHeader, PanelHeaderBack} from "@vkontakte/vkui";

const QrCount = props => (
	<Panel id={props.id}>
		<PanelHeader
			left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
		>
      QrCount
		</PanelHeader>
	</Panel>
);

export default QrCount;
