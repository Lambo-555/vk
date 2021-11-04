import React from 'react';
import {Panel, PanelHeader, Button, Div, Group, Cell, Header, Headline} from "@vkontakte/vkui";
import {Icon28ListOutline, Icon24Camera, Icon28CubeBoxOutline} from '@vkontakte/icons';
import bridge from "@vkontakte/vk-bridge";

const QrMain = props => {
  const onScan = () => {
    try {
      bridge.send("VKWebAppOpenCodeReader")
          .then(reader => {
            let validLink = reader.code_data;
            bridge.send("VKWebAppCallAPIMethod",
                {
                  "method": "utils.checkLink",
                  "params": {
                    "url": validLink,
                    "access_token": "bd1687a8bd1687a8bd1687a89bbd6f7089bbd16bd1687a8dc9284b62d1339845a7cbe2d"
                  }
                })
                .then(data => {
                  if (data.response.status === 'not_banned') {
                    console.log(data.response.status);
                    bridge.send("VKWebAppStorageSet", {
                      "key": reader.code_data.replace(/[^\w@-]/g, ''),
                      "value": ` ${reader.code_data} `
                    })
                        .then(data => {
                          console.log(data);
                        })
                        .catch(error => console.log("storage set RESULT: ", error));
                  }
                })
                .catch(error => {
                  console.log(error);
                });
          })
          .catch(error => console.log(error));

    } catch (error) {
      console.log('SCAN ERROR', error)
    }
  };

  return (
      <Panel id={props.id}>
        <PanelHeader>QR-сканер</PanelHeader>

        <Group>
          <Div>
            <Headline weight="regular" style={{marginBottom: 16}}>Приложение сканирует QR-коды. Ссылки валидируются
              через VK API (utils.checkLink)</Headline>
          </Div>
        </Group>

        <Div style={{display: 'flex'}}>
          <Button
              onClick={onScan}
              before={<Icon24Camera/>}
              stretched size="l"
          >Сканировать QR-код</Button>
        </Div>

        <Group header={<Header mode="secondary">Меню</Header>}>
          <Cell before={<Icon28ListOutline/>} onClick={props.go} data-to={"QrList"}>
            Лист QR-кодов
          </Cell>
          <Cell before={<Icon28CubeBoxOutline/>} onClick={props.go} data-to={"QrCount"}>
            Количество QR-кодов
          </Cell>
        </Group>
      </Panel>
  )
};


export default QrMain;
